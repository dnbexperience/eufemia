/**
 * Validate the contents of the npm package before publishing.
 *
 * Runs `npm pack --dry-run --ignore-scripts --json` against the built package
 * and fails if the tarball would contain files that must never ship (tests,
 * stories, env files, npmrc, node_modules, editor/OS junk), is missing a
 * required core file, or looks suspiciously empty. This is a security-focused
 * deny-list plus a core-file/size sanity check — it catches leaked sources,
 * secrets and other unexpected files without the churn of a full committed
 * allowlist.
 *
 * It also asserts the package still exposes the entry points consumers rely on:
 * the `main`, `module`, `types` and `exports` targets declared in the built
 * package.json, plus the essential CSS bundles, must all be present in the
 * packed files — so a build that silently drops `index.js`, `index.d.ts` or the
 * style bundles fails the release instead of publishing a broken package.
 *
 * Usage: node ./scripts/postbuild/validatePackageContents.mjs [packageDir]
 * (packageDir defaults to "build").
 */

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// Files that must always be present in the published package.
export const REQUIRED_FILES = ['package.json']

// A published tarball with fewer than this many files is almost certainly
// broken. The floor has to clear the smallest build that legitimately runs this
// check, so it is deliberately well below a full release: a full CI build
// (release.yml, consumer-smoke.yml, verify.yml) packs ~27,000 files, while a
// local `yarn build` — the build `build:pack` validates — packs ~9,500, having
// no `cjs/`, `es/`, `docs/` or bundles. `build:mini` sits between the two. Keep
// this under the local figure; raising it further would break `build:pack`.
// Because a legitimate build can be a third of a release, this catches a build
// that collapsed, not one missing a single output target.
export const MIN_FILE_COUNT = 5000

// Generous sanity ceilings that flag accidental bloat — a source or
// node_modules leak, or a stray large asset — without tripping on normal
// growth. The current release is ~27.6k files / ~125 MB unpacked; raise these
// if the package legitimately grows past them.
export const MAX_FILE_COUNT = 60000
export const MAX_UNPACKED_SIZE = 300 * 1024 * 1024 // 300 MB

// Consumer-facing CSS bundles that must always ship. Consumers import these
// directly (and the consumer smoke tests exercise them), and they are not
// referenced from package.json, so they are checked explicitly.
export const REQUIRED_CSS_FILES = [
  'style/dnb-ui-basis.min.css',
  'style/dnb-ui-core.min.css',
  'style/dnb-ui-components.min.css',
]

// Patterns that must never appear in a published tarball.
export const FORBIDDEN_PATTERNS = [
  {
    label: 'test files',
    test: (p) =>
      /(^|\/)__tests__\//.test(p) ||
      /\.(test|spec)\.[cm]?[jt]sx?$/.test(p),
  },
  {
    label: 'story files',
    test: (p) => /\.stories\.[cm]?[jt]sx?$/.test(p),
  },
  { label: 'env files', test: (p) => /(^|\/)\.env(\.|$)/.test(p) },
  { label: 'npmrc files', test: (p) => /(^|\/)\.npmrc$/.test(p) },
  { label: 'node_modules', test: (p) => /(^|\/)node_modules\//.test(p) },
  {
    label: 'editor/OS junk',
    test: (p) => /(^|\/)(\.DS_Store|Thumbs\.db)$/.test(p),
  },
]

// Normalise a packed or manifest path for comparison: strip a leading "./" and
// use forward slashes so "./"-prefixed and Windows-style paths match.
function normalizePath(value) {
  return String(value).replace(/^\.\//, '').replace(/\\/g, '/')
}

// Format a byte count as human-readable megabytes for size messages.
function formatMegabytes(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Return a list of human-readable violation messages for a set of packed file
 * paths. Pure function — no I/O — so it is easy to unit test.
 */
export function findPackageContentViolations(files, options = {}) {
  const requiredFiles = options.requiredFiles || REQUIRED_FILES
  const forbidden = options.forbiddenPatterns || FORBIDDEN_PATTERNS
  const minFileCount = options.minFileCount ?? MIN_FILE_COUNT
  const maxFileCount = options.maxFileCount ?? MAX_FILE_COUNT

  const paths = files.map(normalizePath)

  const errors = []

  for (const rule of forbidden) {
    const hits = paths.filter((p) => rule.test(p))
    if (hits.length > 0) {
      const preview = hits.slice(0, 20).join(', ')
      const extra = hits.length > 20 ? ` (+${hits.length - 20} more)` : ''
      errors.push(`Forbidden ${rule.label}: ${preview}${extra}`)
    }
  }

  for (const required of requiredFiles) {
    if (!paths.includes(required)) {
      errors.push(`Missing required file: ${required}`)
    }
  }

  if (paths.length < minFileCount) {
    errors.push(
      `Suspiciously few files packed: ${paths.length} (expected at least ${minFileCount})`
    )
  }

  if (paths.length > maxFileCount) {
    errors.push(
      `Suspiciously many files packed: ${paths.length} (expected at most ${maxFileCount})`
    )
  }

  return errors
}

/**
 * Return violation messages when the packed package is unexpectedly large — a
 * signal of accidental bloat (leaked sources or node_modules, or a stray large
 * asset). `unpackedSize` comes from `npm pack --json`; when it is unavailable
 * the check is skipped. Pure function — no I/O.
 */
export function findSizeViolations(unpackedSize, options = {}) {
  const maxUnpackedSize = options.maxUnpackedSize ?? MAX_UNPACKED_SIZE

  const errors = []

  if (
    typeof unpackedSize === 'number' &&
    Number.isFinite(unpackedSize) &&
    unpackedSize > maxUnpackedSize
  ) {
    errors.push(
      `Suspiciously large package: ${formatMegabytes(unpackedSize)} unpacked (expected at most ${formatMegabytes(maxUnpackedSize)})`
    )
  }

  return errors
}

/**
 * Collect the concrete file targets a package manifest points consumers at:
 * `main`, `module`, `types` and every string target in the `exports` map
 * (walking nested condition objects). Wildcard subpath patterns (containing
 * `*`) are skipped because they do not name a single concrete file. Pure
 * function — no I/O — so it is easy to unit test.
 */
export function collectManifestEntryPoints(manifest) {
  const targets = new Set()

  const add = (value) => {
    if (
      typeof value === 'string' &&
      value !== '' &&
      !value.includes('*')
    ) {
      targets.add(normalizePath(value))
    }
  }

  const walkExports = (node) => {
    if (typeof node === 'string') {
      add(node)
    } else if (node && typeof node === 'object') {
      for (const value of Object.values(node)) {
        walkExports(value)
      }
    }
  }

  if (manifest && typeof manifest === 'object') {
    add(manifest.main)
    add(manifest.module)
    add(manifest.types)
    if (manifest.exports) {
      walkExports(manifest.exports)
    }
  }

  return [...targets]
}

/**
 * Return violation messages for entry points a valid package must expose: the
 * manifest's main/module/types/exports targets and the essential CSS bundles
 * must all be present in the packed file list. Pure function — no I/O.
 */
export function findMissingEntryPoints(files, options = {}) {
  const requiredCssFiles = options.requiredCssFiles || REQUIRED_CSS_FILES

  const paths = new Set(files.map(normalizePath))

  const errors = []

  const missingEntryPoints = collectManifestEntryPoints(
    options.manifest
  ).filter((target) => !paths.has(target))
  if (missingEntryPoints.length > 0) {
    errors.push(
      `Missing package entry point(s) declared in package.json: ${missingEntryPoints.join(', ')}`
    )
  }

  const missingCss = requiredCssFiles.filter((file) => !paths.has(file))
  if (missingCss.length > 0) {
    errors.push(`Missing required CSS bundle(s): ${missingCss.join(', ')}`)
  }

  return errors
}

/**
 * Resolve what `npm pack` would include for the package in `cwd`: the list of
 * file paths plus the reported unpacked size in bytes (undefined if npm does
 * not report it).
 */
export function getPackedFiles(cwd) {
  // `--ignore-scripts` keeps validation side-effect free (npm runs prepack /
  // postpack even on `--dry-run`) and matches the release and smoke pack steps.
  const output = execFileSync(
    'npm',
    ['pack', '--dry-run', '--ignore-scripts', '--json'],
    {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
      // The file list for a large package is several MB — well over the 1 MB default.
      maxBuffer: 128 * 1024 * 1024,
    }
  )

  const start = output.indexOf('[')
  if (start === -1) {
    throw new Error('Could not parse `npm pack --json` output')
  }

  const data = JSON.parse(output.slice(start))
  const entry = Array.isArray(data) ? data[0] : data
  if (!entry || !Array.isArray(entry.files)) {
    throw new Error('Unexpected `npm pack --json` output shape')
  }

  return {
    files: entry.files.map((file) => file.path),
    unpackedSize:
      typeof entry.unpackedSize === 'number'
        ? entry.unpackedSize
        : undefined,
  }
}

function main() {
  const target = process.argv[2] || 'build'
  const cwd = path.resolve(process.cwd(), target)

  let packed
  try {
    packed = getPackedFiles(cwd)
  } catch (error) {
    console.error(
      `Package content validation could not run: ${error.message}`
    )
    process.exit(1)
  }

  const { files, unpackedSize } = packed

  let manifest
  try {
    manifest = JSON.parse(
      readFileSync(path.join(cwd, 'package.json'), 'utf8')
    )
  } catch (error) {
    console.error(
      `Package content validation could not read package.json: ${error.message}`
    )
    process.exit(1)
  }

  const errors = [
    ...findPackageContentViolations(files),
    ...findMissingEntryPoints(files, { manifest }),
    ...findSizeViolations(unpackedSize),
  ]

  if (errors.length > 0) {
    console.error(
      `\nPackage content validation FAILED (${errors.length} issue(s)):`
    )
    for (const error of errors) {
      console.error(`  - ${error}`)
    }
    process.exit(1)
  }

  const sizeSummary =
    typeof unpackedSize === 'number'
      ? `, ${formatMegabytes(unpackedSize)} unpacked`
      : ''
  console.log(
    `Package content validation passed: ${files.length} files${sizeSummary}; entry points and CSS bundles present, size within bounds, no forbidden entries.`
  )
}

const invokedPath = process.argv[1]
if (invokedPath && import.meta.url === pathToFileURL(invokedPath).href) {
  main()
}
