import { collectChangedEntityNames } from '../runScreenshotsConditionally/discovery'

describe('runScreenshotsConditionally discovery', () => {
  it('extracts entity names from components and extensions paths', () => {
    const names = collectChangedEntityNames([
      'src/components/badge/style/dnb-badge.scss',
      'src/extensions/forms/Form/Snapshot/Snapshot.tsx',
    ])

    expect(Array.from(names).sort((a, b) => a.localeCompare(b))).toEqual([
      'Badge',
      'Form',
      'Forms',
      'Snapshot',
    ])
  })

  it('ignores non-src and technical folder segments', () => {
    const names = collectChangedEntityNames([
      'packages/dnb-eufemia/scripts/tools/runScreenshotsConditionally/runner.ts',
      'src/extensions/forms/style/dnb-forms.scss',
      'src/extensions/forms/__tests__/Form.test.tsx',
    ])

    expect(Array.from(names).sort((a, b) => a.localeCompare(b))).toEqual([
      'Forms',
    ])
  })
})
