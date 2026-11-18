import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const workflow = readFileSync(
  new URL('../ghe-deploy-workflow.yml', import.meta.url),
  'utf8'
)
const publishStep = workflow
  .split(/^ {6}- name: /m)
  .find((step) => step.startsWith('Publish dashboard\n'))
const [assetsSync, rootSync, invalidation, pruneSync] =
  publishStep
    ?.split(/^\s+aws /m)
    .slice(1)
    .map((command) => command.split('\n\n')[0]) ?? []
const immutableCache =
  "--cache-control 'public,max-age=31536000,immutable'"

describe('GHE deploy workflow', () => {
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
