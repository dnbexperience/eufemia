import { readFileSync, readdirSync } from 'node:fs'

const workflowFiles = readdirSync('.github/workflows').filter(
  (filename) =>
    filename.startsWith('automation-') &&
    filename.endsWith('.yml') &&
    filename !== 'automation-run.yml'
)

for (const workflowFile of workflowFiles) {
  const workflow = readFileSync(
    `.github/workflows/${workflowFile}`,
    'utf8'
  )
  const promptMatches = workflow.matchAll(
    /prompt-file:\s*([a-z0-9-]+\.md)/g
  )

  for (const [, promptFile] of promptMatches) {
    readFileSync(`.github/automations/prompts/${promptFile}`, 'utf8')
  }
}

const mcpContract = JSON.parse(
  readFileSync('.github/automations/mcp-contract.json', 'utf8')
)
const codexConfig = readFileSync('.github/automations/config.toml', 'utf8')
const runnerWorkflow = readFileSync(
  '.github/workflows/automation-run.yml',
  'utf8'
)
const notifierWorkflow = readFileSync(
  '.github/workflows/automation-notify.yml',
  'utf8'
)

if (!codexConfig.includes(`url = "${mcpContract.endpoint}"`)) {
  throw new Error(
    'MCP endpoint differs between config.toml and mcp-contract.json'
  )
}

for (const tool of mcpContract.requiredTools) {
  if (!codexConfig.includes(`"${tool}"`)) {
    throw new Error(
      `Required MCP tool is missing from config.toml: ${tool}`
    )
  }
}

if (runnerWorkflow.includes('secrets: inherit')) {
  throw new Error(
    'Automation workflows must not inherit repository secrets'
  )
}

if (
  runnerWorkflow.includes('checkout-ref') ||
  runnerWorkflow.includes('inputs.checkout-ref')
) {
  throw new Error(
    'The secret-bearing runner must not check out event-controlled revisions'
  )
}

if (!runnerWorkflow.includes('environment: automation')) {
  throw new Error(
    'The runner must use the protected automation environment'
  )
}

if (!notifierWorkflow.includes('issues: write')) {
  throw new Error('The notifier must declare its issue-comment permission')
}
if (runnerWorkflow.includes('issues: write')) {
  throw new Error('The secret-bearing runner must remain read-only')
}

console.log('automation configuration tests passed')
