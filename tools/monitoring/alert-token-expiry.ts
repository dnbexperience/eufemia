import { appendFileSync } from 'node:fs'
import type { Check } from './report-incident.ts'
import { daysUntilExpiry, tokenExpiryCheck } from './token-expiry.ts'

const TOKENS = ['GHE_DEPLOY_PAT', 'GHE_MONITORING_DEPLOY_PAT']
const ALERT_DAYS = [14, 7, 3, 1, 0]

async function checkToken(
  name: string
): Promise<Check & { daysLeft?: number }> {
  const token = process.env[name]
  if (!token) {
    return { name, ok: false, detail: 'secret is not set' }
  }

  try {
    const response = await fetch('https://api.dnb.ghe.com/rate_limit', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      signal: AbortSignal.timeout(15_000),
      redirect: 'error',
    })
    if (response.status === 401) {
      return { name, ok: false, detail: 'expired or revoked' }
    }
    if (!response.ok) {
      return {
        name,
        ok: false,
        detail: `HTTP ${response.status} from GHE`,
      }
    }
    return {
      ...tokenExpiryCheck(name, response.headers),
      daysLeft: daysUntilExpiry(response.headers),
    }
  } catch {
    return { name, ok: false, detail: 'GHE could not be reached' }
  }
}

async function main() {
  const checks = await Promise.all(TOKENS.map(checkToken))
  const summary =
    checks
      .map(
        (check) =>
          `${check.ok ? 'PASS' : 'FAIL'} ${check.name}: ${check.detail}`
      )
      .join('\n') + '\n'
  process.stdout.write(summary)
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary)
  }

  // Other failures have no expiry date, so they alert every day.
  const alerts = checks.filter(
    (check) =>
      !check.ok &&
      (check.daysLeft === undefined || ALERT_DAYS.includes(check.daysLeft))
  )
  if (alerts.length === 0) {
    return
  }

  const webhook = process.env.TOKEN_EXPIRY_WEBHOOK ?? ''
  if (!/^https:\/\/hooks\.slack\.com\/services\//.test(webhook)) {
    throw new Error(
      'TOKEN_EXPIRY_WEBHOOK must be a Slack incoming webhook URL'
    )
  }
  // Request errors can contain the secret webhook URL.
  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: [
        'GHE access tokens need attention:',
        ...alerts.map((check) => `• ${check.name}: ${check.detail}`),
        `Update the secrets: ${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/settings/secrets/actions`,
      ].join('\n'),
      unfurl_links: false,
    }),
    signal: AbortSignal.timeout(15_000),
    redirect: 'error',
  }).catch(() => undefined)
  if (!response?.ok || (await response.text()) !== 'ok') {
    throw new Error('Slack notification could not be delivered')
  }
}

main()
