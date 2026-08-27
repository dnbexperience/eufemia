import { describe, expect, it, vi } from 'vitest'
import githubReleasesPlugin, {
  fetchGitHubReleases,
  parseGitHubChangelog,
} from '../../client/plugins/github-releases'

const changelog = `# Changelog

## [11.11.0](https://github.com/dnbexperience/eufemia/compare/v11.10.1...v11.11.0) (2026-08-25)

### :sparkles: Features

* A release change

## [11.10.1-beta.1](https://github.com/dnbexperience/eufemia/compare/v11.10.0...v11.10.1-beta.1) (2026-08-17)

### :bug: Bug Fixes

* Another release change

## [11.11.0](https://github.com/dnbexperience/eufemia/compare/v11.10.1...v11.11.0) (2026-08-25)

* Duplicate release entry
`

describe('github-releases plugin', () => {
  it('parses the generated GitHub changelog', () => {
    expect(parseGitHubChangelog(changelog)).toEqual([
      {
        body: '### :sparkles: Features\n\n* A release change',
        name: 'v11.11.0',
        prerelease: false,
        publishedAt: '2026-08-25T00:00:00Z',
        tagName: 'v11.11.0',
      },
      {
        body: '### :bug: Bug Fixes\n\n* Another release change',
        name: 'v11.10.1-beta.1',
        prerelease: true,
        publishedAt: '2026-08-17T00:00:00Z',
        tagName: 'v11.10.1-beta.1',
      },
    ])
  })

  it('fetches the generated changelog from the release branch', async () => {
    const fetchImplementation = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => changelog,
    } as Response)

    await expect(
      fetchGitHubReleases(fetchImplementation)
    ).resolves.toEqual(parseGitHubChangelog(changelog))
    expect(fetchImplementation).toHaveBeenCalledWith(
      expect.stringContaining(
        '/release/packages/dnb-eufemia/build/CHANGELOG.md'
      )
    )
  })

  it('resolves only its virtual module', () => {
    const plugin = githubReleasesPlugin()
    const resolveId = plugin.resolveId as (
      id: string
    ) => string | undefined

    expect(resolveId('virtual:github-releases')).toBe(
      '\0virtual:github-releases'
    )
    expect(resolveId('other-module')).toBeUndefined()
  })
})
