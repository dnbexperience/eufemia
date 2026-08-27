import type { Plugin } from 'vite'

const VIRTUAL_MODULE_ID = 'virtual:github-releases'
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`
const changelogUrl =
  'https://raw.githubusercontent.com/dnbexperience/eufemia/release/packages/dnb-eufemia/build/CHANGELOG.md'

export type GitHubRelease = {
  body: string
  name: string
  prerelease: boolean
  publishedAt: string
  tagName: string
}

const releaseHeading =
  /^## \[([^\]]+)\]\([^\n]+\) \((\d{4}-\d{2}-\d{2})\)\s*$/gm

export function parseGitHubChangelog(changelog: string) {
  const headings = Array.from(changelog.matchAll(releaseHeading))
  const versions = new Set<string>()

  return headings.flatMap((heading, index): GitHubRelease[] => {
    const version = heading[1]
    if (versions.has(version)) {
      return []
    }
    versions.add(version)

    const bodyStart = heading.index + heading[0].length
    const bodyEnd = headings[index + 1]?.index ?? changelog.length

    return [
      {
        body: changelog.slice(bodyStart, bodyEnd).trim(),
        name: `v${version}`,
        prerelease: version.includes('-'),
        publishedAt: `${heading[2]}T00:00:00Z`,
        tagName: `v${version}`,
      },
    ]
  })
}

export async function fetchGitHubReleases(
  fetchImplementation: typeof fetch = fetch
): Promise<GitHubRelease[]> {
  const response = await fetchImplementation(changelogUrl)

  if (!response.ok) {
    throw new Error(
      `Unable to load GitHub changelog (${response.status} ${response.statusText})`
    )
  }

  return parseGitHubChangelog(await response.text())
}

export default function githubReleasesPlugin(): Plugin {
  let releasesPromise: Promise<GitHubRelease[]> | undefined

  return {
    name: 'vite-plugin-github-releases',

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    async load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        releasesPromise ||= fetchGitHubReleases()
        const releases = await releasesPromise

        return `export const releases = ${JSON.stringify(releases)}`
      }
    },
  }
}
