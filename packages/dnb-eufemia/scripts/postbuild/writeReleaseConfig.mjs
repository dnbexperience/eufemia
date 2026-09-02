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
 * simply be rejected — it is the manifest being published. Two of its fields
 * change how npm behaves at publish time: npm applies every `publishConfig`
 * key as configuration, and `publishConfig` outranks the environment. A
 * `publishConfig` of `{"ignore-scripts": false}` therefore defeats the
 * `NPM_CONFIG_IGNORE_SCRIPTS` the release step sets, and a re-added `scripts`
 * entry would then run inside this credentialed job. prepareForRelease deletes
 * `scripts` and copies `publishConfig` verbatim, so both are asserted against
 * the trusted source manifest rather than allow-listed.
 *
 * The manifest's `repository` field gets the same treatment. When the release
 * config does not pin `repositoryUrl`, semantic-release derives it from
 * `package.json`'s `repository` and embeds the release GitHub token into the
 * authenticated git push URL — so a tampered `repository` on the artifact would
 * send that token to an attacker-controlled host after a Basic-auth challenge.
 * `repositoryUrl` is pinned in the trusted release config as the primary
 * defence (it outranks `package.json`'s field); this comparison rejects a
 * mismatched `repository` outright as defence in depth.
 *
 * Usage: node ./scripts/postbuild/writeReleaseConfig.mjs <sourcePackageJson> <buildDir>
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
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
 * Return the ways the build manifest would change how npm publishes, compared
 * with the trusted source manifest: a `scripts` field that prepareForRelease
 * should have deleted, or a `publishConfig` that does not match source. npm
 * applies every `publishConfig` key as configuration at publish time and
 * `publishConfig` outranks the environment, so this is what keeps the release
 * step's NPM_CONFIG_IGNORE_SCRIPTS from being switched off by the artifact it
 * is meant to contain. Pure function — no I/O — so it is easy to unit test.
 */
export function findManifestPublishOverrides(
  buildManifest,
  sourceManifest
) {
  const built =
    buildManifest && typeof buildManifest === 'object' ? buildManifest : {}
  const trusted =
    sourceManifest && typeof sourceManifest === 'object'
      ? sourceManifest
      : {}

  const overrides = []

  if ('scripts' in built) {
    overrides.push(
      'a "scripts" field, which prepareForRelease deletes before release'
    )
  }

  if (
    stableSerialize(built.publishConfig) !==
    stableSerialize(trusted.publishConfig)
  ) {
    overrides.push(
      `a "publishConfig" that does not match the trusted source manifest ` +
        `(${JSON.stringify(built.publishConfig ?? null)} instead of ` +
        `${JSON.stringify(trusted.publishConfig ?? null)})`
    )
  }

  return overrides
}

/**
 * Return the ways the build manifest's `repository` differs from the trusted
 * source manifest. semantic-release derives `repositoryUrl` from this field when
 * it is not pinned in the release config, then embeds the release GitHub token
 * into the authenticated git push URL — so a tampered `repository` would send
 * that token to an attacker-controlled host. `repositoryUrl` is pinned in the
 * trusted config as the primary defence; this rejects a mismatched field as
 * defence in depth. prepareForRelease copies `repository` verbatim, so it is
 * asserted against the trusted source rather than allow-listed. Pure function —
 * no I/O — so it is easy to unit test.
 */
export function findRepositoryMismatch(buildManifest, sourceManifest) {
  const built =
    buildManifest && typeof buildManifest === 'object' ? buildManifest : {}
  const trusted =
    sourceManifest && typeof sourceManifest === 'object'
      ? sourceManifest
      : {}

  if (
    stableSerialize(built.repository) ===
    stableSerialize(trusted.repository)
  ) {
    return []
  }

  return [
    `a "repository" that does not match the trusted source manifest ` +
      `(${JSON.stringify(built.repository ?? null)} instead of ` +
      `${JSON.stringify(trusted.repository ?? null)})`,
  ]
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

  const overrides = findManifestPublishOverrides(buildManifest, manifest)
  if (overrides.length > 0) {
    throw new Error(
      `Refusing to publish: the build package.json carries ` +
        `${overrides.join(', and ')}. npm applies every publishConfig key as ` +
        `configuration at publish time, and publishConfig outranks the ` +
        `environment — so a tampered manifest can switch off the ` +
        `NPM_CONFIG_IGNORE_SCRIPTS the release step sets and run a lifecycle ` +
        `script in this credentialed job. prepareForRelease deletes scripts ` +
        `and copies publishConfig verbatim, so treat the build artifact as ` +
        `untrusted.`
    )
  }

  const repositoryMismatch = findRepositoryMismatch(
    buildManifest,
    manifest
  )
  if (repositoryMismatch.length > 0) {
    throw new Error(
      `Refusing to publish: the build package.json carries ` +
        `${repositoryMismatch.join(', and ')}. semantic-release derives ` +
        `repositoryUrl from this field and embeds the release GitHub token in ` +
        `the authenticated git push URL, so a tampered repository would leak ` +
        `that token to an attacker-controlled host. repositoryUrl is pinned in ` +
        `the trusted release config, and prepareForRelease copies repository ` +
        `verbatim, so treat the build artifact as untrusted.`
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
if (invokedPath && import.meta.url === pathToFileURL(invokedPath).href) {
  main()
}
