/**
 * Re-materialise the semantic-release configuration in the credentialed publish
 * job from the trusted source package.json.
 *
 * The build artifact carries a `.releaserc.json` written by the low-privilege
 * build job (see prepareForRelease.js). Rewriting it here — in the job that
 * holds npm OIDC and GitHub write authority — from the freshly checked-out
 * source package.json keeps a tampered artifact from changing how the release
 * is published (registry, plugins, branches).
 *
 * Writing the trusted file is not sufficient on its own. semantic-release finds
 * its configuration with cosmiconfig, which returns the FIRST match from an
 * ordered list of places and searches `package.json` (the `release` field) and
 * `.releaserc` BEFORE `.releaserc.json`. An artifact that carried either of
 * those would silently win over the trusted file — and because a plugin
 * identifier is resolved relative to the publish working directory, a config we
 * do not control can load and execute a file from the artifact inside the job
 * that holds the npm and GitHub credentials. So this script also asserts that no
 * competing configuration source exists in the build directory, and refuses to
 * publish if one does: in normal operation prepareForRelease strips the `release`
 * field and writes only `.releaserc.json`, so anything else is unexpected and
 * must stop the release rather than be quietly cleaned up.
 *
 * The same job also refuses to publish if the artifact carries a path that
 * changes how this credentialed job behaves but that package-content validation
 * cannot be relied on to reveal. The publish runs with the restored `build/` as
 * its working directory, so a file dropped there is read — or run — as if we had
 * put it there ourselves:
 *
 * - `.npmrc` — npm reads a project-level config from the directory it
 *   publishes from and applies its `https-proxy`, `strict-ssl`, `cafile`/`ca`
 *   and `registry` settings, so a tampered artifact could route this publish
 *   through an attacker-controlled proxy with certificate checking disabled.
 * - `node_modules` — semantic-release invokes npm through execa with
 *   `preferLocal`, which puts `<cwd>/node_modules/.bin` first on PATH. A
 *   `node_modules/.bin/npm` on the artifact would therefore run in place of
 *   npm, inside the job that holds the npm OIDC authority and the GitHub
 *   token.
 * - `.git` — the changelog commit and tag are made from the same working
 *   directory, and a repository carried on the artifact would shadow the
 *   trusted checkout's.
 * - `.env` — publish-release.sh runs `cd ./build` and then `dotenv
 *   semantic-release`, and dotenv-cli's default path list is exactly `.env`,
 *   resolved against that working directory. It does not overwrite a variable
 *   the workflow already set, but it does add ones the workflow leaves unset:
 *   a `NODE_OPTIONS=--require ./file.cjs` runs arbitrary code inside the
 *   semantic-release process, which holds the GitHub token and the OIDC
 *   token-request credentials, and `NPM_CONFIG_HTTPS_PROXY` /
 *   `NPM_CONFIG_STRICT_SSL` reach the publish the same way a tampered `.npmrc`
 *   would.
 *
 * The first three are structurally invisible to a content check: npm
 * force-excludes them from every tarball, so `npm pack` can never report them.
 * `.env` is different — a packed one IS rejected by the content deny-list — but
 * an `.npmignore` carried on the same artifact removes it from the pack listing
 * (and is itself excluded from that listing), so the content check cannot be
 * depended on for it either. Checking the filesystem covers both cases.
 *
 * prepareForRelease writes none of them, so any of them is unexpected and must
 * stop the release.
 *
 * The artifact's own `package.json` needs the same scrutiny, and it cannot
 * simply be rejected — it is the manifest being published. Rather than
 * allow-list the individual fields that change how npm publishes and risk
 * missing one, the whole manifest is compared against the one a faithful build
 * produces from the trusted source. prepareForRelease derives that manifest
 * deterministically — it deletes `release`, `scripts`, `devDependencies`,
 * `resolutions` and `volta`, and sets `type: "module"` (see
 * RELEASE_STRIPPED_FIELDS and expectedReleaseManifest, pinned to the real
 * producer by a drift test) — and the version is not
 * bumped until semantic-release runs later, so a faithful artifact manifest is
 * exactly that transform of the source. Any deviation is refused. Comparing the
 * complete manifest closes every publish-affecting field at once, including
 * several a field-by-field check missed:
 *
 * - `scripts` / `publishConfig` — npm applies every `publishConfig` key as
 *   configuration at publish time and `publishConfig` outranks the environment,
 *   so a `{"ignore-scripts": false}` defeats the `NPM_CONFIG_IGNORE_SCRIPTS` the
 *   release step sets and a re-added `scripts` entry then runs in this
 *   credentialed job.
 * - `repository` — when the release config does not pin `repositoryUrl`,
 *   semantic-release derives it from this field and embeds the release GitHub
 *   token into the authenticated git push URL, leaking it to an attacker host.
 *   `repositoryUrl` is pinned in the trusted config as the primary defence; the
 *   comparison rejects a mismatch as defence in depth.
 * - `tag` — libnpmpublish resolves the dist-tag as `manifest.tag || defaultTag`,
 *   so a top-level `tag` overrides the `--tag` semantic-release passes and can
 *   route a prerelease onto the `latest` channel every consumer installs.
 * - `private` — `@semantic-release/npm` skips publishing entirely when it is
 *   true, so the tag and changelog are pushed but the npm version never ships,
 *   leaving a permanent gap the release queue cannot recover from.
 * - `name`, `dependencies`, `bin`, and the rest — a redirected package name or
 *   an injected dependency changes what consumers install; none were covered by
 *   the earlier per-field checks.
 *
 * Usage: node ./scripts/postbuild/writeReleaseConfig.mjs <sourcePackageJson> <buildDir>
 */

import {
  existsSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// The configuration file this script writes, and the only one the publish job
// may rely on.
export const TRUSTED_CONFIG_FILE = '.releaserc.json'

// Every other place cosmiconfig looks for a semantic-release configuration,
// relative to the publish working directory. Only `package.json` and
// `.releaserc` currently outrank the trusted file, but the whole list is
// rejected so the guarantee does not depend on the search order staying put.
export const COMPETING_CONFIG_FILES = [
  '.releaserc',
  '.releaserc.yaml',
  '.releaserc.yml',
  '.releaserc.js',
  '.releaserc.ts',
  '.releaserc.cjs',
  '.releaserc.mjs',
  '.config/releaserc',
  '.config/releaserc.json',
  '.config/releaserc.yaml',
  '.config/releaserc.yml',
  '.config/releaserc.js',
  '.config/releaserc.ts',
  '.config/releaserc.cjs',
  '.config/releaserc.mjs',
  'release.config.js',
  'release.config.ts',
  'release.config.cjs',
  'release.config.mjs',
]

// Paths that must never travel on the build artifact into the credentialed
// publish job, even though they are not semantic-release configuration. Each
// one changes how this job publishes — the registry and TLS settings npm reads,
// the binaries it resolves from the working directory, the git repository the
// changelog commit uses, and the environment dotenv injects into the publish
// (see the header comment) — and package-content validation cannot be relied on
// to reveal them: npm force-excludes the first three from every tarball, and an
// `.npmignore` on the same artifact hides `.env` from the pack listing. Entries
// may be a file or a directory. prepareForRelease writes none of them, so any
// of them must stop the release.
export const FORBIDDEN_ARTIFACT_FILES = [
  '.npmrc',
  'node_modules',
  '.git',
  '.env',
]

/**
 * Extract the semantic-release configuration from a parsed package.json
 * manifest. Throws when it is absent so a misconfigured release fails loudly
 * instead of publishing with semantic-release's defaults. Pure function — no
 * I/O — so it is easy to unit test.
 */
export function extractReleaseConfig(manifest) {
  if (
    !manifest ||
    typeof manifest !== 'object' ||
    !manifest.release ||
    typeof manifest.release !== 'object' ||
    Array.isArray(manifest.release)
  ) {
    throw new Error(
      'No "release" configuration found in the source package.json'
    )
  }

  return manifest.release
}

/**
 * Report whether a parsed manifest declares a `release` field at all. Used to
 * detect a build package.json that would outrank the trusted config file —
 * prepareForRelease deletes this field, so its presence on the artifact is
 * unexpected. Pure function — no I/O.
 */
export function manifestDeclaresRelease(manifest) {
  return Boolean(
    manifest &&
    typeof manifest === 'object' &&
    !Array.isArray(manifest) &&
    'release' in manifest
  )
}

/**
 * Read and parse the build directory's package.json, or return undefined when
 * it is absent. Throws when it exists but cannot be parsed, so a corrupt
 * artifact stops the release instead of silently skipping the manifest checks.
 */
function readBuildManifest(buildDir) {
  const manifestPath = path.join(buildDir, 'package.json')

  if (!existsSync(manifestPath)) {
    return undefined
  }

  try {
    return JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch (error) {
    throw new Error(`Could not read ${manifestPath}: ${error.message}`, {
      cause: error,
    })
  }
}

/**
 * Return a list of semantic-release configuration sources present in the build
 * directory other than the trusted `.releaserc.json`. An empty list means the
 * trusted file is the only configuration semantic-release can find there.
 */
export function findCompetingConfigSources(
  buildDir,
  competingFiles = COMPETING_CONFIG_FILES
) {
  const found = []

  const manifest = readBuildManifest(buildDir)
  if (manifest && manifestDeclaresRelease(manifest)) {
    found.push('package.json ("release" field)')
  }

  for (const file of competingFiles) {
    if (existsSync(path.join(buildDir, file))) {
      found.push(file)
    }
  }

  return found
}

/**
 * Serialise a value structurally, independent of object key order, so that a
 * harmless reordering of a manifest field never fails a release.
 */
function stableSerialize(value) {
  if (value === undefined) {
    return 'undefined'
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableSerialize).join(',')}]`
  }

  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map(
        (key) => `${JSON.stringify(key)}:${stableSerialize(value[key])}`
      )
      .join(',')}}`
  }

  return JSON.stringify(value)
}

/**
 * The fields the build removes from the manifest before publishing (see
 * prepareForRelease.js -> cleanupPackage, the single definition of that
 * transform). Kept here so the guard can recreate the exact manifest a faithful
 * build produces and compare the whole thing, rather than allow-listing
 * individual publish-affecting fields and missing the next one. A drift test
 * runs the real producer and compares its output with this reconstruction, so a
 * change to either side fails until both are back in sync.
 */
export const RELEASE_STRIPPED_FIELDS = [
  'release',
  'scripts',
  'devDependencies',
  'resolutions',
  'volta',
]

/**
 * Recreate the package.json a faithful build publishes from the trusted source
 * manifest: strip RELEASE_STRIPPED_FIELDS and set `type: "module"`, exactly as
 * cleanupPackage does. The version is intentionally left untouched — it is
 * not bumped until semantic-release runs, which is after this guard — so for a
 * faithful artifact this is byte-for-byte (structurally) the published manifest.
 * Pure function — no I/O — so it is easy to unit test.
 */
export function expectedReleaseManifest(sourceManifest) {
  const source =
    sourceManifest &&
    typeof sourceManifest === 'object' &&
    !Array.isArray(sourceManifest)
      ? sourceManifest
      : {}

  const expected = { ...source }
  for (const field of RELEASE_STRIPPED_FIELDS) {
    delete expected[field]
  }
  expected.type = 'module'

  return expected
}

/**
 * Compare the build directory's package.json against the manifest a faithful
 * build produces from the trusted source, and return a human-readable list of
 * every field that differs. An empty list means the artifact manifest is
 * structurally identical to that transform, so it cannot change what npm
 * publishes or how.
 *
 * This replaces earlier per-field checks (scripts, publishConfig, repository):
 * comparing the whole manifest catches those and every other publish-affecting
 * field at once — a top-level `tag` that libnpmpublish honours over the `--tag`
 * flag, a `private: true` that makes @semantic-release/npm skip publication, a
 * redirected `name`, injected `dependencies`, and so on. Key order is
 * normalised, so a harmless reordering never fails a release. Pure function —
 * no I/O — so it is easy to unit test.
 */
export function findManifestMismatch(buildManifest, sourceManifest) {
  const built =
    buildManifest &&
    typeof buildManifest === 'object' &&
    !Array.isArray(buildManifest)
      ? buildManifest
      : {}
  const expected = expectedReleaseManifest(sourceManifest)

  const keys = [
    ...new Set([...Object.keys(expected), ...Object.keys(built)]),
  ].sort()

  const differences = []
  for (const key of keys) {
    const inExpected = key in expected
    const inBuilt = key in built

    if (inExpected && !inBuilt) {
      differences.push(
        `a missing "${key}" (the trusted source publishes ` +
          `${JSON.stringify(expected[key])})`
      )
    } else if (!inExpected && inBuilt) {
      differences.push(
        `an unexpected "${key}" (${JSON.stringify(built[key])}), which a ` +
          `faithful build does not publish`
      )
    } else if (
      stableSerialize(built[key]) !== stableSerialize(expected[key])
    ) {
      differences.push(
        `a "${key}" that does not match the trusted source ` +
          `(${JSON.stringify(built[key])} instead of ` +
          `${JSON.stringify(expected[key])})`
      )
    }
  }

  return differences
}

/**
 * Return the FORBIDDEN_ARTIFACT_FILES present in the build directory, whether
 * they are files or directories. These are not semantic-release configuration,
 * but they change how `npm publish` and the release commit behave from the
 * build directory, and package-content validation cannot be relied on to see
 * them (`npm pack` strips three of them outright, and an artifact-supplied
 * `.npmignore` hides `.env`), so they are asserted here on the filesystem.
 */
export function findForbiddenArtifactFiles(
  buildDir,
  forbiddenFiles = FORBIDDEN_ARTIFACT_FILES
) {
  return forbiddenFiles.filter((file) =>
    existsSync(path.join(buildDir, file))
  )
}

/**
 * Read the trusted source package.json, extract its semantic-release config and
 * write it as `.releaserc.json` in the build directory, replacing any copy that
 * travelled on the build artifact. Throws when the build directory also carries
 * a configuration source that would take precedence. Returns the path written.
 */
export function writeReleaseConfig(sourcePackageJsonPath, buildDir) {
  const manifest = JSON.parse(readFileSync(sourcePackageJsonPath, 'utf8'))
  const releaseConfig = extractReleaseConfig(manifest)

  const competing = findCompetingConfigSources(buildDir)
  if (competing.length > 0) {
    throw new Error(
      `Refusing to publish: the build directory carries semantic-release ` +
        `configuration that would take precedence over the trusted ` +
        `${TRUSTED_CONFIG_FILE}: ${competing.join(', ')}. ` +
        `prepareForRelease writes only ${TRUSTED_CONFIG_FILE}, so this ` +
        `should never happen — treat the build artifact as untrusted.`
    )
  }

  const forbidden = findForbiddenArtifactFiles(buildDir)
  if (forbidden.length > 0) {
    throw new Error(
      `Refusing to publish: the build directory carries ${forbidden.join(', ')}. ` +
        `These change how this job publishes — the registry and TLS settings ` +
        `npm reads, the binaries it resolves from the working directory, the ` +
        `git repository the release commit uses, and the environment dotenv ` +
        `injects into the publish — and package-content validation cannot be ` +
        `relied on to see them, because npm pack strips some of them from the ` +
        `tarball and an .npmignore can hide a .env. prepareForRelease writes ` +
        `none of them, so treat the build artifact as untrusted.`
    )
  }

  const destination = path.join(buildDir, TRUSTED_CONFIG_FILE)

  const buildManifest = readBuildManifest(buildDir)
  if (!buildManifest) {
    throw new Error(
      `Refusing to publish: ${path.join(buildDir, 'package.json')} is ` +
        `missing, so the manifest npm would publish cannot be checked.`
    )
  }

  const mismatch = findManifestMismatch(buildManifest, manifest)
  if (mismatch.length > 0) {
    throw new Error(
      `Refusing to publish: the build package.json does not match the ` +
        `manifest a faithful build produces from the trusted source. It ` +
        `carries ${mismatch.join(', and ')}. npm publishes this manifest and ` +
        `applies fields such as publishConfig, tag, private, name, ` +
        `dependencies and repository directly at publish time, so any ` +
        `deviation can change what is published or how — a publishConfig ` +
        `re-enabling lifecycle scripts, a top-level tag overriding the release ` +
        `channel, a private:true skipping publication, or a repository leaking ` +
        `the release token. prepareForRelease derives the manifest from the ` +
        `trusted source deterministically, so treat a mismatch as an untrusted ` +
        `build artifact.`
    )
  }

  writeFileSync(destination, `${JSON.stringify(releaseConfig, null, 2)}\n`)

  return destination
}

function main() {
  const sourcePackageJsonPath = process.argv[2]
  const buildDir = process.argv[3]

  if (!sourcePackageJsonPath || !buildDir) {
    console.error(
      'Usage: node ./scripts/postbuild/writeReleaseConfig.mjs <sourcePackageJson> <buildDir>'
    )
    process.exit(1)
  }

  let destination
  try {
    destination = writeReleaseConfig(sourcePackageJsonPath, buildDir)
  } catch (error) {
    console.error(`Could not write the release config: ${error.message}`)
    process.exit(1)
  }

  console.log(`Wrote trusted release config to ${destination}`)
}

const invokedPath = process.argv[1]
// Resolve the invoked path before comparing: Node already reports a
// symlink-resolved `import.meta.url`, so an invocation through a symlinked path
// (a symlinked checkout, a temp dir such as macOS `/tmp` -> `/private/tmp`)
// would not match and main() would silently not run — leaving a guard that
// exits 0 without checking anything and without rewriting the trusted config.
// Failing closed matters more here than the cost of one extra syscall.
if (
  invokedPath &&
  import.meta.url === pathToFileURL(realpathSync(invokedPath)).href
) {
  main()
}
