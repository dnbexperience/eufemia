/**
 * Consumer smoke test: production-build a fixture app against the exact packed
 * @dnb/eufemia tarball, to catch broken exports, CSS imports, types or
 * tree-shaking regressions before a release reaches consumers.
 *
 * Usage: node smoke/run-smoke.mjs <fixture...> [--tarball <path>] [--keep]
 *   <fixture>   directory under smoke/ to build (e.g. "vite"); give several
 *               to build them in parallel (e.g. "vite nextjs")
 *   --tarball   path to a prebuilt .tgz; if omitted, packs packages/dnb-eufemia/build
 *   --keep      keep the temporary consumer directory (for debugging)
 */
import { execFileSync, spawn } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  statSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'

const smokeRoot = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(smokeRoot, '..')
const buildDir = path.resolve(repoRoot, 'packages/dnb-eufemia/build')

function run(command, args, cwd) {
  execFileSync(command, args, { cwd, stdio: 'inherit' })
}

function packLibrary() {
  if (!existsSync(path.join(buildDir, 'package.json'))) {
    throw new Error(
      `No built package at ${buildDir}. Run "yarn workspace @dnb/eufemia build" first.`
    )
  }
  // Pack into a temp dir so no tarball is left in build/ (a stray tarball would
  // otherwise be swept into a subsequent pack). Small output = just the filename.
  const destination = mkdtempSync(path.join(tmpdir(), 'eufemia-pack-'))
  const output = execFileSync(
    'npm',
    ['pack', '--ignore-scripts', '--pack-destination', destination],
    {
      cwd: buildDir,
      encoding: 'utf8',
      maxBuffer: 128 * 1024 * 1024,
    }
  )
  const filename = output.trim().split('\n').pop().trim()
  return path.join(destination, filename)
}

function listFilesRecursively(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...listFilesRecursively(full))
    } else {
      files.push(full)
    }
  }
  return files
}

function toKB(bytes) {
  return `${Math.round(bytes / 1024)} KB`
}

// Share of the full library ESM the consumer bundle is allowed to reach. The
// fixture imports a handful of exports (Button and P from the main entry, Form
// and Field from the forms extension), so a correctly tree-shaken build lands
// far below the whole library: measured at 35% both locally (585 KB of 1662 KB)
// and in CI (608 KB of 1713 KB). The budget is set at half, which leaves
// comfortable headroom for normal growth while still failing on a partial
// regression — a plain "smaller than the whole library" check would only catch a
// total tree-shaking failure, since the bundle would have to grow almost
// threefold to trip it. Raise this only alongside a deliberate change to what
// the fixture imports.
const TREE_SHAKING_BUDGET_RATIO = 0.5

// Verify the bundler tree-shook the package: a consumer that imports only part
// of @dnb/eufemia must not end up bundling the whole library. Compare the
// consumer's emitted JS against the installed package's full ESM barrels (main +
// extensions). Vite emits a single readable bundle, so the budget is checked
// there; Next.js splits its output across server and client chunks, which are
// not comparable to a single barrel.
function assertTreeShaking(fixture, workDir, built) {
  if (fixture !== 'vite') {
    return
  }

  const esmDir = path.join(workDir, 'node_modules/@dnb/eufemia/esm')
  const barrels = ['dnb-ui-lib.min.mjs', 'dnb-ui-extensions.min.mjs'].map(
    (file) => path.join(esmDir, file)
  )
  if (!barrels.every((file) => existsSync(file))) {
    throw new Error(
      'Tree-shaking check could not run: installed @dnb/eufemia ESM barrels not found'
    )
  }

  const fullLibraryBytes = barrels.reduce(
    (sum, file) => sum + statSync(file).size,
    0
  )
  const consumerJsBytes = built
    .filter((file) => file.endsWith('.js'))
    .reduce((sum, file) => sum + statSync(file).size, 0)

  const budgetBytes = fullLibraryBytes * TREE_SHAKING_BUDGET_RATIO
  const share = Math.round((consumerJsBytes / fullLibraryBytes) * 100)

  if (consumerJsBytes > budgetBytes) {
    throw new Error(
      `Tree-shaking regression: consumer JS is ${toKB(consumerJsBytes)} — ${share}% of the ${toKB(fullLibraryBytes)} full library ESM, over the ${Math.round(TREE_SHAKING_BUDGET_RATIO * 100)}% budget (${toKB(budgetBytes)}). Unused exports were not dropped.`
    )
  }

  console.log(
    `Tree-shaking OK: consumer JS ${toKB(consumerJsBytes)} is ${share}% of the ${toKB(fullLibraryBytes)} full library ESM (budget ${Math.round(TREE_SHAKING_BUDGET_RATIO * 100)}%, ${toKB(budgetBytes)}).`
  )
}

const USAGE =
  'Usage: node smoke/run-smoke.mjs <fixture...> [--tarball <path>] [--keep]'

function parseArgs(args) {
  const tarballIndex = args.indexOf('--tarball')
  const tarballValueIndex = tarballIndex === -1 ? -1 : tarballIndex + 1
  const tarballValue = args[tarballValueIndex]
  if (
    tarballIndex !== -1 &&
    (!tarballValue || tarballValue.startsWith('--'))
  ) {
    throw new Error(USAGE)
  }
  return {
    fixtures: args.filter(
      (arg, index) => index !== tarballValueIndex && !arg.startsWith('--')
    ),
    tarball: tarballIndex === -1 ? null : path.resolve(tarballValue),
    keep: args.includes('--keep'),
  }
}

function smokeTest(fixture, tarball, keep) {
  const fixtureDir = path.join(smokeRoot, fixture)
  console.log(`Using tarball: ${tarball}`)

  const workDir = mkdtempSync(
    path.join(tmpdir(), `eufemia-smoke-${fixture}-`)
  )
  try {
    cpSync(fixtureDir, workDir, {
      recursive: true,
      filter: (src) => !/(^|\/)(node_modules|dist)(\/|$)/.test(src),
    })

    // Install the fixture's pinned toolchain from its committed lockfile
    // (`npm ci` is exact and reproducible), then add the packed @dnb/eufemia
    // tarball with --no-save so it never rewrites the lockfile — the toolchain
    // that drives the bundler stays deterministic across runs.
    run('npm', ['ci', '--no-audit', '--no-fund'], workDir)
    run(
      'npm',
      ['install', '--no-audit', '--no-fund', '--no-save', tarball],
      workDir
    )
    run('npm', ['run', 'build'], workDir)

    // Different bundlers emit to different folders (Vite -> dist, Next -> .next).
    const outputDirs = ['dist', '.next', 'out', 'build']
      .map((dir) => path.join(workDir, dir))
      .filter((dir) => existsSync(dir))
    if (outputDirs.length === 0) {
      throw new Error('Build produced no known output directory')
    }

    const built = outputDirs.flatMap(listFilesRecursively)
    if (!built.some((file) => file.endsWith('.css'))) {
      throw new Error(
        'No CSS emitted — the Eufemia CSS import was not bundled'
      )
    }

    assertTreeShaking(fixture, workDir, built)

    console.log(
      `\nSmoke test passed for "${fixture}": ${built.length} build artifacts, CSS bundled.`
    )
  } finally {
    if (keep) {
      console.log(`Kept work dir: ${workDir}`)
    } else {
      rmSync(workDir, { recursive: true, force: true })
    }
  }
}

// Several fixtures run at once, each in its own process that runs this script
// for one fixture. Most of a run is `npm install` of the 28,000-file tarball.
// Two of those slow each other down, but on GitHub runners Vite and Next.js
// together took 48-66 s, against 39 + 51 s in turn. Each output line starts
// with its fixture name, because the processes write at the same time.
function smokeTestInParallel(fixtures, tarball, keep) {
  const script = fileURLToPath(import.meta.url)
  return Promise.all(
    fixtures.map(
      (fixture) =>
        new Promise((resolve) => {
          const started = Date.now()
          const child = spawn(
            process.execPath,
            [
              script,
              fixture,
              '--tarball',
              tarball,
              ...(keep ? ['--keep'] : []),
            ],
            { stdio: ['ignore', 'pipe', 'pipe'] }
          )
          createInterface({ input: child.stdout }).on('line', (line) =>
            console.log(`[${fixture}] ${line}`)
          )
          createInterface({ input: child.stderr }).on('line', (line) =>
            console.error(`[${fixture}] ${line}`)
          )
          const finish = (passed) =>
            resolve({
              fixture,
              passed,
              seconds: Math.round((Date.now() - started) / 1000),
            })
          child.on('error', (error) => {
            console.error(`[${fixture}] ${error.message}`)
            finish(false)
          })
          child.on('close', (code) => finish(code === 0))
        })
    )
  )
}

async function main() {
  const { fixtures, tarball, keep } = parseArgs(process.argv.slice(2))
  if (fixtures.length === 0) {
    throw new Error(USAGE)
  }
  for (const fixture of fixtures) {
    const fixtureDir = path.join(smokeRoot, fixture)
    if (!existsSync(fixtureDir)) {
      throw new Error(`Unknown fixture: ${fixtureDir}`)
    }
  }

  // Pack once, so every fixture installs the same tarball.
  const tarballPath = tarball ?? packLibrary()
  if (fixtures.length === 1) {
    smokeTest(fixtures[0], tarballPath, keep)
    return
  }

  const results = await smokeTestInParallel(fixtures, tarballPath, keep)
  for (const { fixture, passed, seconds } of results) {
    console.log(
      `${passed ? 'Passed' : 'FAILED'}: ${fixture} (${seconds} s)`
    )
  }
  const failed = results.filter((result) => !result.passed)
  if (failed.length > 0) {
    // Set the exit code instead of throwing, so the output of the fixtures is
    // fully written before the process exits.
    console.error(
      `Smoke test failed for: ${failed.map((result) => result.fixture).join(', ')}`
    )
    process.exitCode = 1
  }
}

await main()
