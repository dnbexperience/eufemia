import { execFileSync } from 'node:child_process'
import { appendFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

// Tools that neither the library nor the portal is built from, with their
// yarn workspace name and their own workflows
export const STANDALONE_TOOLS = {
  'tools/analytics': {
    name: 'eufemia-analytics',
    workflows: ['analytics-lambda.yml'],
  },
  'tools/analytics/dashboard': {
    name: 'eufemia-analytics-dashboard',
    workflows: [],
  },
  'tools/assets': {
    name: 'eufemia-assets-hosting',
    workflows: ['assets.yml'],
  },
  'tools/eufemia-raiwork-plugin': {
    name: 'eufemia-raiwork-plugin',
    workflows: ['eufemia-marketplace-artifacts.yml'],
  },
  'tools/mcp-lambda': {
    name: 'eufemia-mcp-lambda',
    workflows: ['mcp-lambda.yml'],
  },
  'tools/mcp-legacy-proxy': {
    name: '@dnb/eufemia-mcp-legacy-proxy',
    workflows: ['mcp-legacy-proxy-deploy.yml'],
  },
  'tools/monitoring': { name: null, workflows: [] },
  'tools/service-monitoring': {
    name: 'eufemia-service-monitoring',
    workflows: ['ghe-token-expiry.yml', 'service-monitoring.yml'],
  },
  'tools/usage-ingest': { name: 'eufemia-usage-ingest', workflows: [] },
}

// Each standalone tool and the standalone tools that import, depend on or read
// files from it
export const USED_BY = {
  'tools/analytics': ['tools/mcp-lambda', 'tools/service-monitoring'],
  'tools/assets': ['tools/service-monitoring'],
  'tools/mcp-lambda': ['tools/service-monitoring'],
  'tools/monitoring': [
    'tools/analytics',
    'tools/assets',
    'tools/mcp-lambda',
    'tools/service-monitoring',
  ],
  'tools/usage-ingest': ['tools/analytics', 'tools/mcp-lambda'],
}

const STANDALONE_WORKFLOWS = new Map(
  Object.entries(STANDALONE_TOOLS).flatMap(([dir, { workflows }]) =>
    workflows.map((file) => [`.github/workflows/${file}`, dir])
  )
)

const UNIT_TEST_PATTERN =
  /(^|\/)__tests__\/(.+\/)?([^/]+\.test\.[cm]?[jt]sx?|__snapshots__\/[^/]+\.snap)$/

// Visual tests, and tests that only the build or E2E jobs run
const TESTS_RUN_ELSEWHERE_PATTERNS = [
  /\.screenshot\.test\./,
  /^packages\/dnb-eufemia\/scripts\/postbuild\//,
  /^packages\/dnb-design-system-portal\/scripts\//,
]

export function findStandaloneToolDir(path) {
  return (
    STANDALONE_WORKFLOWS.get(path) ??
    Object.keys(STANDALONE_TOOLS)
      .filter((dir) => path.startsWith(`${dir}/`))
      .sort((a, b) => b.length - a.length)[0]
  )
}

export function isRunTestsOnlyPath(path) {
  return (
    UNIT_TEST_PATTERN.test(path) &&
    !TESTS_RUN_ELSEWHERE_PATTERNS.some((pattern) => pattern.test(path))
  )
}

export function classifyChanges(files) {
  const hasFiles = files.length > 0
  const standaloneToolsOnly =
    hasFiles && files.every(findStandaloneToolDir)
  const testsOnly = hasFiles && files.every(isRunTestsOnlyPath)

  return {
    standaloneToolsOnly,
    testsOnly,
    packagesUnaffected: standaloneToolsOnly || testsOnly,
  }
}

// The changed standalone tools and the tools that use them, or null when every
// workspace is affected
export function listAffectedWorkspaces(files) {
  if (!classifyChanges(files).standaloneToolsOnly) {
    return null
  }

  const dirs = new Set(files.map(findStandaloneToolDir))
  for (const dir of dirs) {
    USED_BY[dir]?.forEach((user) => dirs.add(user))
  }

  return [...dirs]
    .map((dir) => STANDALONE_TOOLS[dir].name)
    .filter(Boolean)
    .sort()
}

// Main, release branches and other events always run every job
export function isComparedWithMain({
  GITHUB_EVENT_NAME,
  GITHUB_REF_NAME,
  GITHUB_BASE_REF,
}) {
  if (GITHUB_EVENT_NAME === 'push') {
    return !/^(main|v)|^(release|beta|alpha|next)$|\.x$/.test(
      GITHUB_REF_NAME
    )
  }

  return GITHUB_EVENT_NAME === 'pull_request' && GITHUB_BASE_REF === 'main'
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const files = isComparedWithMain(process.env)
    ? execFileSync(
        'git',
        ['diff', '--name-only', '--no-renames', 'origin/main...HEAD'],
        { encoding: 'utf8' }
      )
        .split('\n')
        .filter(Boolean)
    : []

  const { standaloneToolsOnly, testsOnly, packagesUnaffected } =
    classifyChanges(files)
  const affectedWorkspaces = listAffectedWorkspaces(files)
  const outputs = [
    `standalone-tools-only=${standaloneToolsOnly}`,
    `tests-only=${testsOnly}`,
    `packages-unaffected=${packagesUnaffected}`,
    `affected-workspaces=${affectedWorkspaces?.join(' ') ?? 'all'}`,
    '',
  ].join('\n')

  console.log(outputs)
  appendFileSync(process.env.GITHUB_OUTPUT, outputs)
}
