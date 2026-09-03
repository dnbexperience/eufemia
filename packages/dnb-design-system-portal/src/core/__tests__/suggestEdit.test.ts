import { describe, expect, it } from 'vitest'
import { createSuggestEditPrompt, getSuggestEditUrl } from '../suggestEdit'

describe('suggestEdit', () => {
  const source = {
    repository: 'dnbexperience/eufemia',
    editRef: 'main',
    commitSha: 'abcdef123456',
  }

  it('creates a link with the page, anchor and source path', () => {
    expect(
      getSuggestEditUrl(
        '/uilib/components/button/#events',
        'packages/dnb-design-system-portal/src/docs/uilib/components/button/info.mdx'
      )
    ).toBe(
      '/contribute/suggest-edit/?page=%2Fuilib%2Fcomponents%2Fbutton%2F%23events&source=packages%2Fdnb-design-system-portal%2Fsrc%2Fdocs%2Fuilib%2Fcomponents%2Fbutton%2Finfo.mdx'
    )
  })

  it('creates a complete portal-content prompt', () => {
    expect(
      createSuggestEditPrompt({
        pageUrl: 'https://eufemia.dnb.no/uilib/components/button/#events',
        sourcePath:
          'packages/dnb-design-system-portal/src/docs/uilib/components/button/info.mdx',
        requestedChange: 'Clarify when the click event fires.',
        proposedWording: 'The event fires after activation.',
        includeInReleaseNotes: false,
        deployment: 'regular',
        source,
      })
    )
      .toBe(`Use the eufemia-portal-content skill to update this Eufemia portal page and create or update the pull request. If the skill is not available, follow the instructions below directly. Use the Eufemia MCP server for current documentation if it is configured.

Page: https://eufemia.dnb.no/uilib/components/button/#events
Source: https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-design-system-portal/src/docs/uilib/components/button/info.mdx

Requested change:
Clarify when the click event fires.

Proposed wording:
The event fires after activation.

Release notes: Do not include this change in the next release notes.
Deployment: This can wait for the next regular release.

Keep the change focused, preserve the page's MDX structure and formatting, run or inspect the appropriate checks, and give me the pull request and exact page preview. Do not merge it.`)
  })

  it('includes portal-only deployment details', () => {
    const prompt = createSuggestEditPrompt({
      pageUrl: 'https://eufemia.dnb.no/design-system/about/',
      sourcePath:
        'packages/dnb-design-system-portal/src/docs/design-system/about.mdx',
      requestedChange: 'Correct the team list.',
      proposedWording: '',
      includeInReleaseNotes: true,
      deployment: 'portal-only',
      deadline: '2026-09-04',
      urgencyReason: 'The published names are outdated.',
      source,
    })

    expect(prompt).toContain(
      'This needs a portal-only deployment by 2026-09-04 because The published names are outdated.'
    )
  })
})
