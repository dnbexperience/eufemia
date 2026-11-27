import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const workflow = readFileSync(
  new URL('../ghe-deploy-workflow.yml', import.meta.url),
  'utf8'
)
const steps = workflow.split(/^ {6}- name: /m)
const deployStep = steps.find((step) => step.startsWith('Deploy\n'))
const publishStep = steps.find((step) =>
  step.startsWith('Publish dashboard\n')
)
const [assetsSync, rootSync, invalidation, pruneSync] =
  publishStep
    ?.split(/^\s+aws /m)
    .slice(1)
    .map((command) => command.split('\n\n')[0]) ?? []
const immutableCache =
  "--cache-control 'public,max-age=31536000,immutable'"
const recipientGuard = deployStep?.match(/^ +if \[ -z [\s\S]*?^ +fi$/m)

const runRecipientGuard = (emails: string) =>
  spawnSync(
    'bash',
    ['-euo', 'pipefail', '-c', recipientGuard?.[0] ?? ''],
    {
      env: { ...process.env, TF_VAR_snapshot_alert_emails: emails },
    }
  ).status

describe('GHE deploy workflow', () => {
  it('checks the alert recipients before terraform apply', () => {
    expect(recipientGuard?.index).toBeLessThan(
      deployStep?.indexOf('terraform apply') ?? -1
    )
  })

  it.each(['', ' ', ',', ' , ,', ' ,\t, ', '\n'])(
    'stops the deploy when %j holds no address',
    (emails) => {
      expect(runRecipientGuard(emails)).toBe(1)
    }
  )

  it('lets the deploy continue when one address remains', () => {
    expect(runRecipientGuard(' , a@example.com,')).toBe(0)
  })

  it('lets browsers keep the hashed dashboard assets', () => {
    expect(assetsSync).toMatch(/^s3 sync \.\.\/dashboard\/assets /)
    expect(assetsSync).toContain(immutableCache)
  })

  it('revalidates index.html and config.json on every visit', () => {
    expect(rootSync).toMatch(/^s3 sync \.\.\/dashboard /)
    expect(rootSync).toContain("--exclude 'assets/*'")
    expect(rootSync).toContain("--cache-control 'no-cache'")
  })

  it('removes old assets only after the new index.html is live', () => {
    expect(assetsSync).not.toContain('--delete')
    expect(invalidation).toMatch(/^cloudfront create-invalidation /)
    expect(pruneSync).toMatch(/^s3 sync \.\.\/dashboard\/assets /)
    expect(pruneSync).toContain('--delete')
    expect(pruneSync).toContain(immutableCache)
  })
})
