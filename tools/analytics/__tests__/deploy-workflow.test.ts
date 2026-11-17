import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const workflow = readFileSync(
  new URL('../ghe-deploy-workflow.yml', import.meta.url),
  'utf8'
)
const publishStep = workflow
  .split(/^ {6}- name: /m)
  .find((step) => step.startsWith('Publish dashboard\n'))
const [assetsSync, rootSync] =
  publishStep
    ?.split(/^\s+aws s3 sync /m)
    .slice(1)
    .map((command) => command.split('\n\n')[0]) ?? []

describe('GHE deploy workflow', () => {
  it('lets browsers keep the hashed dashboard assets', () => {
    expect(assetsSync).toMatch(/^\.\.\/dashboard\/assets /)
    expect(assetsSync).toContain(
      "--cache-control 'public,max-age=31536000,immutable'"
    )
  })

  it('revalidates index.html and config.json on every visit', () => {
    expect(rootSync).toMatch(/^\.\.\/dashboard /)
    expect(rootSync).toContain("--exclude 'assets/*'")
    expect(rootSync).toContain("--cache-control 'no-cache'")
  })
})
