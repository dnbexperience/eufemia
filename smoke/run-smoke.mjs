/**
 * Consumer smoke test: production-build a fixture app against the exact packed
 * @dnb/eufemia tarball, to catch broken exports, CSS imports or types before a
 * release reaches consumers.
 *
 * Usage: node smoke/run-smoke.mjs <fixture> [--tarball <path>] [--keep]
 *   <fixture>   directory under smoke/ to build (e.g. "vite")
 *   --tarball   path to a prebuilt .tgz; if omitted, packs packages/dnb-eufemia/build
 *   --keep      keep the temporary consumer directory (for debugging)
 */
import { execFileSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  rmSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
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
    ['pack', '--pack-destination', destination],
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

function main() {
  const args = process.argv.slice(2)
  const fixture = args.find((arg) => !arg.startsWith('--'))
  const keep = args.includes('--keep')
  const tarballIndex = args.indexOf('--tarball')

  if (!fixture) {
    throw new Error(
      'Usage: node smoke/run-smoke.mjs <fixture> [--tarball <path>] [--keep]'
    )
  }

  const fixtureDir = path.join(smokeRoot, fixture)
  if (!existsSync(fixtureDir)) {
    throw new Error(`Unknown fixture: ${fixtureDir}`)
  }

  const tarball =
    tarballIndex !== -1
      ? path.resolve(args[tarballIndex + 1])
      : packLibrary()
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
    run('npm', ['install', '--no-audit', '--no-fund', '--no-save', tarball], workDir)
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

main()
