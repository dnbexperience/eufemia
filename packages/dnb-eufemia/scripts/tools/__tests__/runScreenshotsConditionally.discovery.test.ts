import {
  collectChangedEntityNames,
  findCompositionImpactedTests,
} from '../runScreenshotsConditionally/discovery'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import type { RunnerContext } from '../runScreenshotsConditionally/types'

describe('runScreenshotsConditionally discovery', () => {
  it('maps legacy screenshot URLs to the current web documentation directory', () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), 'portal-screenshots-')
    )
    try {
      const docsRoot = path.join(root, 'docs')
      fs.mkdirSync(path.join(docsRoot, 'web/components/tabs'), {
        recursive: true,
      })
      fs.writeFileSync(
        path.join(docsRoot, 'web/components/tabs/Examples.tsx'),
        '<Badge />'
      )
      fs.writeFileSync(
        path.join(root, 'Tabs.screenshot.test.ts'),
        'const page = { url: "/uilib/components/tabs/demos" }'
      )
      const context = {
        packageRoot: root,
        portalDocsRoot: docsRoot,
      } as RunnerContext
      expect(
        findCompositionImpactedTests(
          context,
          ['src/components/badge/Badge.tsx'],
          ['Tabs.screenshot.test.ts']
        )
      ).toEqual(['Tabs.screenshot.test.ts'])
    } finally {
      fs.rmSync(root, { recursive: true, force: true })
    }
  })
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
