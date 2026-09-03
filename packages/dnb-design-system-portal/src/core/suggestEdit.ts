import type { GitHubSource } from './githubSource'
import { githubSource } from './githubSource'

export type SuggestEditDeployment = 'regular' | 'portal-only'

export function getSuggestEditUrl(
  page: string,
  sourcePath: string
): string {
  const params = new URLSearchParams({ page, source: sourcePath })

  return `/contribute/suggest-edit/?${params}`
}

type SuggestEditPrompt = {
  pageUrl: string
  sourcePath: string
  requestedChange: string
  proposedWording: string
  includeInReleaseNotes: boolean
  deployment: SuggestEditDeployment
  deadline?: string
  urgencyReason?: string
  source?: GitHubSource
}

export function createSuggestEditPrompt({
  pageUrl,
  sourcePath,
  requestedChange,
  proposedWording,
  includeInReleaseNotes,
  deployment,
  deadline,
  urgencyReason,
  source = githubSource,
}: SuggestEditPrompt): string {
  const sourceUrl = `https://github.com/${source.repository}/blob/${source.editRef}/${sourcePath}`
  const proposedWordingSection = proposedWording.trim()
    ? `\n\nProposed wording:\n${proposedWording.trim()}`
    : ''
  const deploymentText =
    deployment === 'portal-only'
      ? `This needs a portal-only deployment by ${
          deadline || '[desired date]'
        } because ${urgencyReason?.trim() || '[reason]'}.`
      : 'This can wait for the next regular release.'

  return `Use the eufemia-portal-content skill to update this Eufemia portal page and create or update the pull request. If the skill is not available, follow the instructions below directly. Use the Eufemia MCP server for current documentation if it is configured.

Page: ${pageUrl}
Source: ${sourceUrl}

Requested change:
${requestedChange.trim() || '[Describe the change]'}${proposedWordingSection}

Release notes: ${
    includeInReleaseNotes
      ? 'Include this change in the next release notes.'
      : 'Do not include this change in the next release notes.'
  }
Deployment: ${deploymentText}

Keep the change focused, preserve the page's MDX structure and formatting, run or inspect the appropriate checks, and give me the pull request and exact page preview. Do not merge it.`
}
