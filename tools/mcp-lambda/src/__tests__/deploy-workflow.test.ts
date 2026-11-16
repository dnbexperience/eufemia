import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const workflow = readFileSync(
  new URL('../../ghe-deploy-workflow.yml', import.meta.url),
  'utf8'
)
const steps = workflow.split(/^ {6}- name: /m).slice(1)
const stepIndex = (name: string) =>
  steps.findIndex((step) => step.startsWith(`${name}\n`))
const smokeTest = steps[stepIndex('Smoke test')]

describe('GHE deploy workflow', () => {
  it('smoke tests both protocols on the public endpoint after terraform apply', () => {
    expect(stepIndex('Deploy')).not.toBe(-1)
    expect(stepIndex('Smoke test')).toBeGreaterThan(stepIndex('Deploy'))
    expect(smokeTest).toContain('https://server.eufemia.dnb.no/mcp/web')
    expect(smokeTest).toMatch(/^\s+check 2025-11-25 initialize /m)
    expect(smokeTest).toMatch(/^\s+check 2025-11-25 tools\/list /m)
    expect(smokeTest).toMatch(/^\s+check 2026-07-28 server\/discover /m)
  })

  it('fails the deploy when the smoke test fails', () => {
    expect(smokeTest).not.toMatch(/^\s+(if|continue-on-error):/m)
  })

  it('never calls a tool, so the smoke test adds no web usage', () => {
    expect(smokeTest).not.toContain('tools/call')
  })
})
