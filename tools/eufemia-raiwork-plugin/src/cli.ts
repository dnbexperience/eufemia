import { buildRaiworkBundle, validateRaiworkBundle } from './bundle.ts'
import { defaultPaths } from './paths.ts'
import { verifyHostedMcp } from './remote.ts'

const formatBytes = (bytes: number) => `${(bytes / 1024).toFixed(1)} KiB`
const writeLine = (message = '') => process.stdout.write(`${message}\n`)
const writeWarning = (message: string) =>
  process.stderr.write(`${message}\n`)

const printBuildReport = (
  report: Awaited<ReturnType<typeof buildRaiworkBundle>>
) => {
  writeLine(`RAIWork plugin: ${report.bundleRoot}`)
  writeLine(`Skills: ${report.skillCount}`)
  writeLine(`Files: ${report.fileCount}`)
  writeLine(`Size: ${formatBytes(report.totalBytes)}`)
}

const printRemoteReport = (
  report: Awaited<ReturnType<typeof verifyHostedMcp>>
) => {
  writeLine(`Hosted MCP: ${report.endpointUrl}`)
  writeLine(`Required tools: ${report.requiredTools.join(', ')}`)
  if (report.missingOptionalTools.length > 0) {
    writeWarning(
      `Optional tools not deployed yet: ${report.missingOptionalTools.join(', ')}`
    )
  }
}

const command = process.argv[2] ?? 'help'

try {
  switch (command) {
    case 'build':
      printBuildReport(await buildRaiworkBundle(defaultPaths))
      break
    case 'validate':
      printBuildReport(await validateRaiworkBundle(defaultPaths))
      break
    case 'verify-remote':
      printRemoteReport(await verifyHostedMcp(defaultPaths))
      break
    case 'release-check':
      printBuildReport(await buildRaiworkBundle(defaultPaths))
      printRemoteReport(await verifyHostedMcp(defaultPaths))
      break
    default:
      writeLine(`Usage: yarn workspace eufemia-raiwork-plugin <command>

Commands:
  build          Generate and validate dist/dnb-eufemia-web
  validate       Validate the existing generated bundle
  verify:remote  Verify required tools on the hosted Eufemia MCP
  release:check  Build, validate, and verify the hosted MCP`)
  }
} catch (error) {
  writeWarning(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
}
