import { appendFileSync } from 'node:fs'
import { postSlack } from './report-incident.ts'
import { checkTokenExpiry } from './token-expiry.ts'

const TOKENS = [
  'GHE_DEPLOY_PAT',
  'GHE_MONITOR_PAT',
  'GHE_MONITORING_DEPLOY_PAT',
]

async function main() {
  const results = await Promise.all(
    TOKENS.map((name) =>
      checkTokenExpiry(name, process.env[name]).catch((error: Error) => {
        process.exitCode = 1
        return { message: error.message, notify: false }
      })
    )
  )

  const summary = results.map((result) => result.message).join('\n')
  process.stdout.write(summary + '\n')
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n')
  }

  const warnings = results.filter((result) => result.notify)
  if (warnings.length === 0) {
    return
  }

  const webhook = process.env.TOKEN_EXPIRY_WEBHOOK
  if (!webhook) {
    throw new Error(
      'TOKEN_EXPIRY_WEBHOOK is not set, so the warnings were not sent to Slack'
    )
  }
  await postSlack(
    webhook,
    [
      'GHE access tokens need renewal:',
      ...warnings.map((result) => '• ' + result.message),
      `Update the secrets: ${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/settings/secrets/actions`,
    ].join('\n')
  )
}

main()
