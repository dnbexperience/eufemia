/**
 * Vite plugin that provides portal build information via a virtual module.
 *
 * (`buildVersion`, `releaseVersion`, `changelogVersion`) via
 * scripts/version.js before the build.
 *
 * In the Vite pipeline the plugin computes these values at build time:
 *
 * - `releaseVersion` — read from package.json (set by `build:version` on CI)
 * - `buildVersion` — generated as current date/time in `nb-NO` locale
 * - `changelogVersion` — extracted from the first heading in the changelog
 *
 * Components import from `virtual:build-info` to access these values.
 */

import { type Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const VIRTUAL_MODULE_ID = 'virtual:build-info'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

export type BuildInfo = {
  releaseVersion: string
  buildVersion: string
  changelogVersion: string
}

const portalRoot = path.resolve(__dirname, '..', '..', '..')

export function getBuildInfo({
  packageJsonPath = path.resolve(portalRoot, 'package.json'),
  changelogPath = path.resolve(
    portalRoot,
    'src/docs/EUFEMIA_CHANGELOG.mdx'
  ),
}: {
  packageJsonPath?: string
  changelogPath?: string
} = {}): BuildInfo {
  let releaseVersion = '[LOCAL BUILD]'
  let changelogVersion = '[LOCAL BUILD]'

  // Release version from package.json (set by build:version on CI)
  try {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    if (pkg.releaseVersion && pkg.releaseVersion !== '[LOCAL BUILD]') {
      releaseVersion = pkg.releaseVersion
    }
  } catch {
    // Ignore — use default
  }

  // Changelog version from the first heading in the changelog file
  try {
    const content = fs.readFileSync(changelogPath, 'utf-8')
    const match = /^#+\s+(.*)\n/m.exec(content)
    if (match) {
      changelogVersion = match[1].trim()
    }
  } catch {
    // Ignore — use default
  }

  // Build timestamp in Norwegian locale
  const buildVersion = new Date().toLocaleString('nb-NO', {
    timeZone: 'Europe/Oslo',
  })

  return { releaseVersion, buildVersion, changelogVersion }
}

export default function buildInfoPlugin(): Plugin {
  const buildInfoFile = path.resolve(portalRoot, 'src/shared/buildInfo.ts')

  return {
    name: 'portal-build-info',

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    load(id) {
      if (
        id === RESOLVED_VIRTUAL_MODULE_ID ||
        id === buildInfoFile ||
        id.replace(/\?.*$/, '') === buildInfoFile
      ) {
        const info = getBuildInfo()
        return [
          `export const releaseVersion = ${JSON.stringify(info.releaseVersion)}`,
          `export const buildVersion = ${JSON.stringify(info.buildVersion)}`,
          `export const changelogVersion = ${JSON.stringify(info.changelogVersion)}`,
        ].join('\n')
      }
    },
  }
}
