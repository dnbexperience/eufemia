import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { collectMarkdownPaths, getMdPath } from '../../prod/md-paths.mts'

describe('getMdPath', () => {
  // The markdown copies the generator actually wrote.
  const mdPaths = new Set([
    '/uilib.md',
    '/uilib/components.md',
    '/uilib/components/button.md',
    '/uilib/layout.md',
    '/quickguide-designer.md',
  ])

  it('returns the .md path for a page with its own copy', () => {
    expect(getMdPath('/uilib/components/button/', mdPaths)).toBe(
      '/uilib/components/button.md'
    )
  })

  it('resolves tab pages to their entry copy', () => {
    for (const tab of ['info', 'demos', 'properties', 'events']) {
      expect(getMdPath(`/uilib/components/button/${tab}/`, mdPaths)).toBe(
        '/uilib/components/button.md'
      )
    }
  })

  it('does not let a page borrow a copy that is not its tab entry', () => {
    // Icon Primary is a component in its own right, not a view of the
    // Components overview, and a visual-test route is not documentation at
    // all. An over-broad target is as wrong as a dead one.
    expect(
      getMdPath('/uilib/components/icon-primary/', mdPaths)
    ).toBeNull()
    expect(
      getMdPath('/uilib/components/button/visual-tests/', mdPaths)
    ).toBeNull()
  })

  it('advertises nothing when no copy was generated', () => {
    // The generator skips drafts, files such as properties.mdx that are not
    // entries, and anything robots.txt disallows.
    expect(
      getMdPath('/uilib/extensions/payment-card/', mdPaths)
    ).toBeNull()
    expect(
      getMdPath('/uilib/extensions/payment-card/demos/', mdPaths)
    ).toBeNull()
    expect(getMdPath('/uilib/unknown/page/', mdPaths)).toBeNull()
  })

  it('leaves pages outside uilib alone, even when a copy exists', () => {
    expect(getMdPath('/quickguide-designer/', mdPaths)).toBeNull()
  })

  it('handles URLs without trailing slashes', () => {
    expect(getMdPath('/uilib/components/button', mdPaths)).toBe(
      '/uilib/components/button.md'
    )
  })

  it('handles top-level uilib entries', () => {
    expect(getMdPath('/uilib/layout/', mdPaths)).toBe('/uilib/layout.md')
  })
})

describe('collectMarkdownPaths', () => {
  let outDir: string

  beforeAll(() => {
    outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'md-paths-'))

    for (const file of [
      'llms.txt',
      'uilib.md',
      'uilib/components/button.md',
      'uilib/components/button/index.html',
      'server/entry-server.js',
      'server/notes.md',
      '.vite/manifest.md',
    ]) {
      const target = path.join(outDir, file)
      fs.mkdirSync(path.dirname(target), { recursive: true })
      fs.writeFileSync(target, '')
    }
  })

  afterAll(() => {
    fs.rmSync(outDir, { recursive: true, force: true })
  })

  it('collects the markdown copies as URL paths', () => {
    expect(collectMarkdownPaths(outDir)).toEqual(
      new Set(['/uilib.md', '/uilib/components/button.md'])
    )
  })

  it('returns nothing when the output does not exist', () => {
    expect(collectMarkdownPaths(path.join(outDir, 'absent')).size).toBe(0)
  })
})
