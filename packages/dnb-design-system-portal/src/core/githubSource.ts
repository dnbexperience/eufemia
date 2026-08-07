export type GitHubSource = {
  repository: string
  editRef: string
  commitSha: string
}

export const githubSource: GitHubSource = {
  repository:
    import.meta.env.VITE_GITHUB_REPOSITORY || 'dnbexperience/eufemia',
  editRef: import.meta.env.VITE_GITHUB_EDIT_REF || 'main',
  commitSha: import.meta.env.VITE_GITHUB_COMMIT_SHA || '',
}

export function getGitHubEditUrl(
  sourcePath: string,
  source = githubSource
): string {
  return `https://github.com/${source.repository}/edit/${source.editRef}/${sourcePath}`
}

export function getGitHubEditTitle(
  source = githubSource
): string | undefined {
  if (!source.commitSha) {
    return undefined
  }

  return `Edit source from preview commit ${source.commitSha.slice(0, 7)} on GitHub`
}
