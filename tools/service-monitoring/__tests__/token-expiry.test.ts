import { execFile } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { expect, it } from 'vitest'
import {
  daysUntilExpiry,
  tokenExpiryCheck,
} from '../../monitoring/token-expiry.ts'

const now = Date.parse('2026-10-23T06:23:00Z')

function expiringIn(days: number) {
  const expiry = new Date(now + days * 86_400_000 + 3_600_000)
  return new Headers({
    'GitHub-Authentication-Token-Expiration': expiry
      .toISOString()
      .replace('T', ' ')
      .replace(/\.\d+Z$/, ' UTC'),
  })
}

it.each([
  [30, true],
  [15, true],
  [14, false],
  [7, false],
  [1, false],
  [0, false],
])('%i days before expiry is ok: %s', (days, ok) => {
  expect(tokenExpiryCheck('TOKEN', expiringIn(days), now).ok).toBe(ok)
})

it.each([
  [14, 'expires in 14 days (2026-11-06)'],
  [1, 'expires in 1 day (2026-10-24)'],
  [0, 'expires today (2026-10-23)'],
])('describes %i days before expiry', (days, detail) => {
  expect(
    tokenExpiryCheck('GHE token expiry', expiringIn(days), now)
  ).toEqual({ name: 'GHE token expiry', ok: false, detail })
})

it('is ok when no expiry date is reported', () => {
  expect(tokenExpiryCheck('TOKEN', new Headers(), now)).toEqual({
    name: 'TOKEN',
    ok: true,
    detail: 'no expiry date reported',
  })
})

it('fails on an unreadable expiry date', () => {
  const headers = new Headers({
    'GitHub-Authentication-Token-Expiration': 'soon',
  })

  expect(tokenExpiryCheck('TOKEN', headers, now)).toEqual({
    name: 'TOKEN',
    ok: false,
    detail: 'unreadable expiry date',
  })
})

it('counts whole days until expiry', () => {
  expect(daysUntilExpiry(expiringIn(7), now)).toBe(7)
  expect(daysUntilExpiry(expiringIn(0), now)).toBe(0)
  expect(daysUntilExpiry(new Headers(), now)).toBeUndefined()
})

async function runAlert(env: Record<string, string>) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'token-expiry-cli-'))
  try {
    const preload = path.join(root, 'fixture.mjs')
    await writeFile(
      preload,
      `
      globalThis.fetch = async (input, options) => {
        const url = new URL(input)
        if (url.hostname === 'hooks.slack.com') {
          process.stdout.write('SLACK ' + JSON.parse(options.body).text + '\\n')
          return new Response('ok')
        }
        if (url.hostname !== 'api.dnb.ghe.com') throw new Error('Unexpected request')
        const auth = new Headers(options.headers).get('Authorization')
        if (auth === 'Bearer expired') return new Response('{}', { status: 401 })
        if (auth === 'Bearer unavailable') return new Response('{}', { status: 503 })
        if (auth === 'Bearer unreachable') throw new TypeError('fetch failed')
        const days = Number(auth.match(/^Bearer days-(\\d+)$/)?.[1] ?? 30)
        const expiry = new Date(Date.now() + days * 86400000 + 3600000)
        return new Response('{}', { headers: {
          'GitHub-Authentication-Token-Expiration': expiry.toISOString().replace('T', ' ').replace(/\\.\\d+Z$/, ' UTC'),
        } })
      }
    `
    )
    return await promisify(execFile)(
      process.execPath,
      [
        '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON',
        '--import',
        preload,
        path.resolve(
          import.meta.dirname,
          '../../monitoring/alert-token-expiry.ts'
        ),
      ],
      {
        env: {
          GITHUB_REPOSITORY: 'dnbexperience/eufemia',
          GITHUB_SERVER_URL: 'https://github.com',
          ...env,
        },
      }
    )
  } finally {
    await rm(root, { recursive: true, force: true })
  }
}

const webhook = 'https://hooks.slack.com/services/T/B/X'

it('posts one Slack message for expired and missing tokens', async () => {
  const { stdout } = await runAlert({
    GHE_DEPLOY_PAT: 'expired',
    TOKEN_EXPIRY_WEBHOOK: webhook,
  })

  expect(stdout).toContain(
    [
      'SLACK GHE access tokens need attention:',
      '• GHE_DEPLOY_PAT: expired or revoked',
      '• GHE_MONITORING_DEPLOY_PAT: secret is not set',
      'Update the secrets: https://github.com/dnbexperience/eufemia/settings/secrets/actions',
    ].join('\n')
  )
})

it('leaves out the secrets link when only GHE is unavailable', async () => {
  const { stdout } = await runAlert({
    GHE_DEPLOY_PAT: 'unavailable',
    GHE_MONITORING_DEPLOY_PAT: 'unreachable',
    TOKEN_EXPIRY_WEBHOOK: webhook,
  })

  expect(stdout).toContain(
    [
      'SLACK GHE access tokens need attention:',
      '• GHE_DEPLOY_PAT: HTTP 503 from GHE',
      '• GHE_MONITORING_DEPLOY_PAT: GHE could not be reached',
    ].join('\n') + '\n'
  )
  expect(stdout).not.toContain('Update the secrets')
})

it('stays quiet while both tokens are far from expiry', async () => {
  const { stdout } = await runAlert({
    GHE_DEPLOY_PAT: 'valid',
    GHE_MONITORING_DEPLOY_PAT: 'valid',
    TOKEN_EXPIRY_WEBHOOK: webhook,
  })

  expect(stdout).toMatch(/PASS GHE_DEPLOY_PAT: expires in 30 days/)
  expect(stdout).not.toContain('SLACK')
})

it.each([
  [14, true],
  [13, false],
  [7, true],
  [3, true],
  [2, false],
  [1, true],
  [0, true],
])('%i days before expiry posts to Slack: %s', async (days, posts) => {
  const { stdout } = await runAlert({
    GHE_DEPLOY_PAT: `days-${days}`,
    GHE_MONITORING_DEPLOY_PAT: 'valid',
    TOKEN_EXPIRY_WEBHOOK: webhook,
  })

  expect(stdout).toContain('FAIL GHE_DEPLOY_PAT: expires')
  expect(stdout.includes('SLACK')).toBe(posts)
})

it('fails when a warning is due but no webhook is set', async () => {
  await expect(
    runAlert({
      GHE_DEPLOY_PAT: 'expired',
      GHE_MONITORING_DEPLOY_PAT: 'valid',
    })
  ).rejects.toMatchObject({
    code: 1,
    stderr: expect.stringContaining(
      'TOKEN_EXPIRY_WEBHOOK must be a Slack incoming webhook URL'
    ),
  })
})
