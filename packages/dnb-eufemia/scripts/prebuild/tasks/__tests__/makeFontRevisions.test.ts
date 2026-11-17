import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { getFontRevisions } from '../makeFontRevisions'
import revisions from '../../../../src/plugins/postcss-isolated-style-scope/font-revisions.js'

describe('font revisions', () => {
  it('discovers new families and nested font files from the source', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'font-revisions-'))
    try {
      fs.mkdirSync(path.join(root, 'src/new-brand'), { recursive: true })
      fs.mkdirSync(path.join(root, 'assets/fonts/new-brand/nested'), {
        recursive: true,
      })
      fs.writeFileSync(
        path.join(root, 'assets/fonts/new-brand/nested/New.woff2'),
        'new font bytes'
      )
      fs.writeFileSync(
        path.join(root, 'src/new-brand/fonts.scss'),
        `@font-face {
          font-family: 'New Family';
          font-weight: 400;
          src: url('../../../assets/fonts/new-brand/nested/New.woff2');
        }`
      )
      const discovered = getFontRevisions(undefined, root)
      expect(Object.keys(discovered.families)).toEqual(['New Family'])
      expect(discovered.families['New Family']).toMatch(
        /^New Family-[a-f0-9]{16}$/
      )
      expect(Object.keys(discovered.files)).toEqual([
        'new-brand/nested/New.woff2',
      ])
    } finally {
      fs.rmSync(root, { recursive: true, force: true })
    }
  })

  it('keeps the shipped manifest aligned with every bundled font face', () => {
    expect(getFontRevisions()).toEqual(revisions)
  })

  it('changes only the affected family when font bytes change', () => {
    const updated = getFontRevisions((file) =>
      path.basename(file) === 'DNBSansText-Regular.woff2'
        ? Buffer.from('new font revision')
        : fs.readFileSync(file)
    )
    expect(updated.families.DNB).not.toBe(revisions.families.DNB)
    expect(updated.families.DNBMono).toBe(revisions.families.DNBMono)
    expect(updated.families['DNB Sans Display']).toBe(
      revisions.families['DNB Sans Display']
    )
    expect(updated.files['dnb/DNBSansText-Regular.woff2']).not.toBe(
      revisions.files['dnb/DNBSansText-Regular.woff2']
    )
  })
})
