import { runAgentSkillsCli } from './agentSkills.js'

export type RunEufemiaCliOptions = {
  args: string[]
  packageRoot: string
  cwd?: string
  output?: (message: string) => void
}

const HELP = `Usage: eufemia <command>

Commands:
  skills <command>  Manage official Eufemia Agent Skills

Run "eufemia skills --help" for skills commands and options.`

export async function runEufemiaCli({
  args,
  packageRoot,
  cwd = process.cwd(),
  output = console.log,
}: RunEufemiaCliOptions) {
  const command = args[0] ?? 'help'

  if (command === 'help' || command === '--help' || command === '-h') {
    output(HELP)
    return 0
  }

  if (
    command === 'version' ||
    command === '--version' ||
    command === '-v'
  ) {
    return runAgentSkillsCli({
      args: ['version'],
      packageRoot,
      cwd,
      output,
    })
  }

  if (command === 'skills') {
    return runAgentSkillsCli({
      args: args.slice(1),
      packageRoot,
      cwd,
      output,
    })
  }

  throw new Error(`Unknown command: ${command}\n\n${HELP}`)
}
