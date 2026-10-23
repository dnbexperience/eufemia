import { execFile } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { expect, it, vi } from 'vitest'
import { checkTokenExpiry } from '../../monitoring/token-expiry.ts'

const now = Date.parse('2026-10-23T06:23:00Z')

function respond(response: Response) {
  return vi.fn(
    async (_url: string | URL | Request, _init?: RequestInit) => response
  )
}

function expiringIn(days: number) {
  const expiry = new Date(now + days * 86_400_000 + 3_600_000)
  return respond(
    new Response('{}', {
      headers: {
        'GitHub-Authentication-Token-Expiration': expiry
          .toISOString()
          .replace('T', ' ')
          .replace(/\.\d+Z$/, ' UTC'),
      },
    })
  )
}

it('sends the token only to the GHE API', async () => {
  const request = expiringIn(30)
  await checkTokenExpiry('TOKEN', 'secret', { now, request })

  const [url, init] = request.mock.calls[0]
  expect(url).toBe('https://api.dnb.ghe.com/rate_limit')
  expect(new Headers(init?.headers).get('Authorization')).toBe(
    'Bearer secret'
  )
})

it.each([
  [30, false],
  [14, true],
  [13, false],
  [7, true],
  [3, true],
  [2, false],
  [1, true],
  [0, false],
])('%i days before expiry notifies: %s', async (days, notify) => {
  await expect(
    checkTokenExpiry('TOKEN', 'secret', { now, request: expiringIn(days) })
  ).resolves.toMatchObject({ notify })
})

it('names the token and the expiry date', async () => {
  await expect(
    checkTokenExpiry('GHE_DEPLOY_PAT', 'secret', {
      now,
      request: expiringIn(7),
    })
  ).resolves.toEqual({
    message: 'GHE_DEPLOY_PAT expires in 7 days (2026-10-30)',
    notify: true,
  })
})

it('warns when the token has expired or was revoked', async () => {
  await expect(
    checkTokenExpiry('TOKEN', 'secret', {
      now,
      request: respond(new Response('{}', { status: 401 })),
    })
  ).resolves.toEqual({
    message: 'TOKEN has expired or was revoked',
    notify: true,
  })
})

it('stays quiet when the token is not set or never expires', async () => {
  const request = respond(new Response('{}'))

  await expect(
    checkTokenExpiry('TOKEN', '', { now, request })
  ).resolves.toEqual({ message: 'TOKEN is not set', notify: false })
  expect(request).not.toHaveBeenCalled()

  await expect(
    checkTokenExpiry('TOKEN', 'secret', { now, request })
  ).resolves.toEqual({
    message: 'TOKEN has no expiry date',
    notify: false,
  })
})

it('fails without exposing the token when GHE cannot be checked', async () => {
  const check = checkTokenExpiry('TOKEN', 'secret', {
    now,
    request: respond(new Response('{}', { status: 503 })),
  })

  await expect(check).rejects.toThrow(
    /^TOKEN could not be checked: HTTP 503$/
  )
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
          process.stdout.write('SLACK ' + JSON.parse(options.body).text)
          return new Response('ok')
        }
        const auth = new Headers(options.headers).get('Authorization')
        if (auth === 'Bearer expired') return new Response('{}', { status: 401 })
        const expiry = new Date(Date.now() + 3 * 86400000 + 3600000)
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
      { env }
    )
  } finally {
    await rm(root, { recursive: true, force: true })
  }
}

it('posts one Slack message for all tokens that need renewal', async () => {
  const { stdout } = await runAlert({
    GHE_DEPLOY_PAT: 'valid',
    GHE_MONITOR_PAT: 'expired',
    TOKEN_EXPIRY_WEBHOOK: 'https://hooks.slack.com/services/T/B/X',
    GITHUB_SERVER_URL: 'https://github.com',
    GITHUB_REPOSITORY: 'dnbexperience/eufemia',
  })

  expect(stdout).toMatch(
    /SLACK GHE access tokens need renewal:\n• GHE_DEPLOY_PAT expires in 3 days \(\d{4}-\d{2}-\d{2}\)\n• GHE_MONITOR_PAT has expired or was revoked\nUpdate the secrets: https:\/\/github\.com\/dnbexperience\/eufemia\/settings\/secrets\/actions$/
  )
})

it('fails when a warning is due but no webhook is set', async () => {
  await expect(
    runAlert({ GHE_MONITOR_PAT: 'expired' })
  ).rejects.toMatchObject({
    code: 1,
    stderr: expect.stringContaining(
      'TOKEN_EXPIRY_WEBHOOK is not set, so the warnings were not sent to Slack'
    ),
  })
})
