import { describe, it, expect } from 'vitest'
import {
  validateSkillInstalls,
  buildSkillInstallRecord,
} from '../src/records/skill-install.js'

describe('validateSkillInstalls', () => {
  it('accepts a single event and a batch', () => {
    const event = {
      action: 'install',
      target: '.claude/skills',
      env: 'prod',
      eufemiaVersion: '11.19.0',
      timestamp: '2026-11-26T09:00:00.000Z',
    }

    expect(validateSkillInstalls(event)).toEqual({
      ok: true,
      value: [event],
    })
    expect(
      validateSkillInstalls([
        { action: 'update', target: '.github/skills' },
        { action: 'uninstall', target: '.agents/skills' },
      ])
    ).toEqual({
      ok: true,
      value: [
        { action: 'update', target: '.github/skills' },
        { action: 'uninstall', target: '.agents/skills' },
      ],
    })
  })

  it.each([
    { action: 'reinstall', target: '.claude/skills' },
    { action: 'install' },
    { action: 'install', target: 42 },
    {
      action: 'install',
      target: '.claude/skills',
      eufemiaVersion: 'latest',
    },
    { action: 'install', target: '.claude/skills', timestamp: 'today' },
  ])('rejects %j', (event) => {
    expect(validateSkillInstalls(event).ok).toBe(false)
  })

  it('stores a custom target as custom and drops an unknown env', () => {
    expect(
      validateSkillInstalls({
        action: 'install',
        target: '/home/jane/acme/skills',
        env: 'staging',
      })
    ).toEqual({
      ok: true,
      value: [{ action: 'install', target: 'custom' }],
    })
  })
})

describe('buildSkillInstallRecord', () => {
  it('defaults every absent field', () => {
    const createdAt = '2026-11-26T09:00:00.000Z'

    expect(
      buildSkillInstallRecord(
        { action: 'install', target: '.claude/skills' },
        createdAt
      )
    ).toEqual({
      action: 'install',
      target: '.claude/skills',
      env: 'unknown',
      eufemia_version: 'unknown',
      timestamp: createdAt,
      created_at: createdAt,
    })
  })
})
