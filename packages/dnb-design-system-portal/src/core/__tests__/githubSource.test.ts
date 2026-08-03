import { describe, expect, it } from 'vitest'
import { getGitHubEditTitle, getGitHubEditUrl } from '../githubSource'

const sourcePath =
  'packages/dnb-design-system-portal/src/docs/uilib/components/button/info.mdx'

describe('getGitHubEditUrl', () => {
  it('uses the provided pull request source repository and branch', () => {
    const source = {
      repository: 'contributor/eufemia',
      editRef: 'fix/button-docs',
      commitSha: 'abc123456789',
    }

    expect(getGitHubEditUrl(sourcePath, source)).toBe(
      `https://github.com/contributor/eufemia/edit/fix/button-docs/${sourcePath}`
    )
    expect(getGitHubEditTitle(source)).toBe(
      'Edit source from preview commit abc1234 on GitHub'
    )
  })

  it('omits the preview title without a commit', () => {
    expect(
      getGitHubEditTitle({
        repository: 'dnbexperience/eufemia',
        editRef: 'main',
        commitSha: '',
      })
    ).toBeUndefined()
  })
})
