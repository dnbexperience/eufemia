import type { SpecialMdxComponentRenderer } from './types.ts'

export function createGitHubChangelogExtension(): SpecialMdxComponentRenderer {
  return {
    name: 'GitHubChangelog',
    replace: (content) =>
      content.replace(
        /<GitHubChangelog\b[^>]*\/>/g,
        '[View all Eufemia releases on GitHub](https://github.com/dnbexperience/eufemia/releases)'
      ),
  }
}
