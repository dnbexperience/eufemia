/**
 * Test the patched success step of @semantic-release/github.
 *
 * GitHub stops a GraphQL request after 10 seconds, and asking about the pull
 * requests of 100 commits at once took longer, so releases with that many
 * commits failed after they were published. See .yarn/patches.
 */

import { success } from '@semantic-release/github'

describe('@semantic-release/github success step', () => {
  it('asks GitHub about 25 commits per request, one request at a time', async () => {
    const commitsPerRequest: Array<number> = []
    let pendingRequests = 0
    let maxPendingRequests = 0

    class GitHubClient {
      async request(route: string) {
        if (route === 'GET /repos/{owner}/{repo}') {
          return {
            data: {
              full_name: 'dnbexperience/eufemia',
              clone_url: 'https://github.com/dnbexperience/eufemia.git',
              permissions: { push: true },
            },
          }
        }

        throw new Error(`Unexpected request: ${route}`)
      }

      async graphql(query: string) {
        if (query.includes('query getSRIssues(')) {
          return { repository: { issues: { nodes: [] } } }
        }

        if (!query.includes('query getAssociatedPRs(')) {
          throw new Error(`Unexpected query: ${query}`)
        }

        commitsPerRequest.push(query.match(/oid: "/g).length)

        pendingRequests++
        maxPendingRequests = Math.max(maxPendingRequests, pendingRequests)
        await new Promise((resolve) => setTimeout(resolve, 1))
        pendingRequests--

        return { repository: {} }
      }
    }

    await success(
      {},
      {
        env: { GH_TOKEN: 'token' },
        options: {
          repositoryUrl: 'https://github.com/dnbexperience/eufemia.git',
        },
        commits: Array.from({ length: 105 }, (_, index) => ({
          hash: String(index),
          message: `fix: change ${index}`,
        })),
        nextRelease: { version: '11.16.1' },
        releases: [],
        logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() },
      },
      { Octokit: GitHubClient }
    )

    expect(commitsPerRequest).toEqual([25, 25, 25, 25, 5])
    expect(maxPendingRequests).toBe(1)
  })
})
