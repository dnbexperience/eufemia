import fs from 'node:fs/promises'
import path from 'node:path'
import { validateAgentSkills } from '../../src/cli/agentSkills'

const PACKAGE_ROOT = path.resolve(__dirname, '../..')

export async function copyAgentSkills({
  sourceRoot = path.join(PACKAGE_ROOT, 'agent-skills'),
  buildRoot = path.join(PACKAGE_ROOT, 'build'),
} = {}) {
  await validateAgentSkills(sourceRoot)

  const destination = path.join(buildRoot, 'agent-skills')
  await fs.rm(destination, { recursive: true, force: true })
  await fs.cp(sourceRoot, destination, { recursive: true })
}

if (require.main === module) {
  copyAgentSkills().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
