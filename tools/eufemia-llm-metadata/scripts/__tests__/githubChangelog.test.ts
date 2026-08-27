import { describe, expect, it } from 'vitest'
import { createGitHubChangelogExtension } from '../../src/extensions/mdx/githubChangelog.ts'

describe('GitHubChangelog MDX extension', () => {
  it('replaces the component with the release archive link', () => {
    const extension = createGitHubChangelogExtension()

    expect(
      extension.replace('<GitHubChangelog releases={releases} />')
    ).toBe(
      '[View all Eufemia releases on GitHub](https://github.com/dnbexperience/eufemia/releases)'
    )
  })
})
