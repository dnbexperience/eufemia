import fs from 'node:fs/promises'
import { parseArgs } from 'node:util'
import {
  githubIssueApi,
  reportPortalHydration,
} from './report-portal-hydration.ts'
import type { HydrationReport } from './portal-hydration.ts'

const { values } = parseArgs({
  options: {
    output: { type: 'string', default: 'portal-hydration-report.json' },
  },
})
const report: HydrationReport = JSON.parse(
  await fs.readFile(values.output, 'utf8')
)
const { GITHUB_REPOSITORY, GH_TOKEN, GITHUB_RUN_ID } = process.env
if (!GITHUB_REPOSITORY || !GH_TOKEN || !GITHUB_RUN_ID) {
  throw new Error('Missing GitHub issue reporting configuration')
}
console.log(
  await reportPortalHydration(
    report,
    githubIssueApi(GITHUB_REPOSITORY, GH_TOKEN),
    'https://github.com/' +
      GITHUB_REPOSITORY +
      '/actions/runs/' +
      GITHUB_RUN_ID
  )
)
