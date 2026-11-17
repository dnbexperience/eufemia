import fs from 'node:fs'
import path from 'node:path'
import { getFontRevisions } from '../makeFontRevisions'
import revisions from '../../../../src/plugins/postcss-isolated-style-scope/font-revisions.js'

describe('font revisions', () => {
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
