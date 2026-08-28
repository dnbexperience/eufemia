import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import GitHubChangelog, {
  getReleaseType,
  prepareReleaseNotes,
} from '../../../docs/uilib/changelog/GitHubChangelog'
import type { GitHubRelease } from '../../../../vite/client/plugins/github-releases'

beforeEach(() => resetLevels(2))
afterEach(cleanup)

const releases: GitHubRelease[] = Array.from(
  { length: 11 },
  (_, index) => ({
    body: `## [11.${index}.0](https://example.com) (2026-08-25)\n\n### :sparkles: Features\n\n* A release change`,
    name: `v11.${index}.0`,
    prerelease: false,
    publishedAt: '2026-08-25T10:56:24Z',
    tagName: `v11.${index}.0`,
  })
)

describe('GitHubChangelog', () => {
  it('reveals releases in batches', () => {
    render(
      <MemoryRouter>
        <GitHubChangelog releases={releases} />
      </MemoryRouter>
    )

    expect(document.querySelectorAll('article')).toHaveLength(10)

    fireEvent.click(document.querySelector('button') as HTMLButtonElement)

    expect(document.querySelectorAll('article')).toHaveLength(11)
    expect(document.querySelector('button')).toBeNull()
  })

  it('prepares GitHub release notes for the portal', () => {
    expect(prepareReleaseNotes(releases[0].body)).toBe(
      '### Features\n\n* A release change'
    )
    expect(getReleaseType(releases[0])).toBe('Feature release')
    expect(getReleaseType({ ...releases[0], tagName: 'v11.0.1' })).toBe(
      'Patch release'
    )
  })
})
