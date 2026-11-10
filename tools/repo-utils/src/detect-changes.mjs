import { execFileSync } from 'node:child_process'
import { appendFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

// Tools that neither the library nor the portal is built from
const STANDALONE_TOOL_PATTERNS = [
  /^tools\/analytics\//,
  /^tools\/assets\//,
  /^tools\/eufemia-raiwork-plugin\//,
  /^tools\/mcp-lambda\//,
  /^tools\/mcp-legacy-proxy\//,
  /^tools\/monitoring\//,
  /^tools\/service-monitoring\//,
  /^tools\/usage-ingest\//,
  /^\.github\/workflows\/analytics-lambda\.yml$/,
  /^\.github\/workflows\/assets\.yml$/,
  /^\.github\/workflows\/eufemia-marketplace-artifacts\.yml$/,
  /^\.github\/workflows\/ghe-token-expiry\.yml$/,
  /^\.github\/workflows\/mcp-lambda\.yml$/,
  /^\.github\/workflows\/mcp-legacy-proxy-deploy\.yml$/,
  /^\.github\/workflows\/service-monitoring\.yml$/,
]

const UNIT_TEST_PATTERN =
  /(^|\/)__tests__\/(.+\/)?([^/]+\.test\.[cm]?[jt]sx?|__snapshots__\/[^/]+\.snap)$/

// Visual tests, and tests that only the build or E2E jobs run
const TESTS_RUN_ELSEWHERE_PATTERNS = [
  /\.screenshot\.test\./,
  /^packages\/dnb-eufemia\/scripts\/postbuild\//,
  /^packages\/dnb-design-system-portal\/scripts\//,
]

function isStandaloneToolPath(path) {
  return STANDALONE_TOOL_PATTERNS.some((pattern) => pattern.test(path))
}

export function isRunTestsOnlyPath(path) {
  return (
    UNIT_TEST_PATTERN.test(path) &&
    !TESTS_RUN_ELSEWHERE_PATTERNS.some((pattern) => pattern.test(path))
  )
}

export function classifyChanges(files) {
  const hasFiles = files.length > 0
  const standaloneToolsOnly = hasFiles && files.every(isStandaloneToolPath)
  const testsOnly = hasFiles && files.every(isRunTestsOnlyPath)

  return {
    standaloneToolsOnly,
    testsOnly,
    packagesUnaffected: standaloneToolsOnly || testsOnly,
  }
}

// Main, release branches and other events always run every job
export function isComparedWithMain({
  GITHUB_EVENT_NAME,
  GITHUB_REF_NAME,
  GITHUB_BASE_REF,
}) {
  if (GITHUB_EVENT_NAME === 'push') {
    return !/^(main|v)/.test(GITHUB_REF_NAME)
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
  const outputs = [
    `standalone-tools-only=${standaloneToolsOnly}`,
    `tests-only=${testsOnly}`,
    `packages-unaffected=${packagesUnaffected}`,
    '',
  ].join('\n')

  console.log(outputs)
  appendFileSync(process.env.GITHUB_OUTPUT, outputs)
}
