#!/usr/bin/env node

import { realpathSync } from 'node:fs'
import path from 'node:path'
import { runAgentSkillsCli } from './agentSkills.js'

const packageRoot = path.resolve(
  path.dirname(realpathSync(process.argv[1])),
  '..'
)

runAgentSkillsCli({
  args: process.argv.slice(2),
  packageRoot,
})
  .then((exitCode) => {
    process.exitCode = exitCode
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
