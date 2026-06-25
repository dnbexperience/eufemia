import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

import {
  buildPrefixIndex,
  deriveDirectDependencies,
} from '../src/deriveDependencies.ts'

describe('buildPrefixIndex', () => {
  it('sorts prefixes longest-first so the most specific block wins', () => {
    const index = buildPrefixIndex(['form', 'form-status', 'button'])

    expect(index.map((entry) => entry.name)).toEqual([
      'form-status',
      'button',
      'form',
    ])
    expect(index[0].prefix).toBe('dnb-form-status')
  })
})

describe('deriveDirectDependencies', () => {
  let styleDir: string
  const names = ['button', 'form', 'form-status', 'icon', 'tooltip']
  const prefixIndex = buildPrefixIndex(names)

  beforeAll(() => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'derive-deps-'))
    styleDir = path.join(root, 'style')
    fs.mkdirSync(styleDir)

    fs.writeFileSync(
      path.join(styleDir, 'dnb-button.scss'),
      [
        '.dnb-button {',
        '  .dnb-icon { color: red; }',
        '  .dnb-form-status__text { color: blue; }',
        '  &.dnb-button-row { display: flex; }',
        '}',
        '.dnb-form { margin: 0; }',
      ].join('\n')
    )

    // deps.scss must be ignored entirely.
    fs.writeFileSync(
      path.join(styleDir, 'deps.scss'),
      "@use '../../tooltip/style/deps.scss';"
    )
  })

  afterAll(() => {
    fs.rmSync(path.dirname(styleDir), { recursive: true, force: true })
  })

  it('maps dnb-* selectors to their owning component', () => {
    const deps = deriveDirectDependencies({
      styleDir,
      name: 'button',
      prefixIndex,
    })

    expect(deps).toContain('icon')
    expect(deps).toContain('form-status')
  })

  it('respects BEM boundaries (dnb-button does not match dnb-button-row)', () => {
    const deps = deriveDirectDependencies({
      styleDir,
      name: 'button',
      prefixIndex,
    })

    // `dnb-form-status__text` resolves to `form-status`, never to `form`.
    expect(deps).toContain('form-status')

    // `.dnb-form` (a standalone block) still resolves to `form`.
    expect(deps).toContain('form')
  })

  it('never lists the component itself, and ignores deps.scss', () => {
    const deps = deriveDirectDependencies({
      styleDir,
      name: 'button',
      prefixIndex,
    })

    expect(deps).not.toContain('button')
    expect(deps).not.toContain('tooltip')
  })

  it('returns an empty array when the style directory is missing', () => {
    const deps = deriveDirectDependencies({
      styleDir: path.join(styleDir, 'does-not-exist'),
      name: 'button',
      prefixIndex,
    })

    expect(deps).toEqual([])
  })
})
