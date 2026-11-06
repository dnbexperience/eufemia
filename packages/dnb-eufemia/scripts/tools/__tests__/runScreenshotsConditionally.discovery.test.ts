import {
  collectChangedEntityNames,
  findCompositionImpactedTests,
  findPortalDocsImpactedTests,
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
  it.each([
    'web/forms',
    'web/layout-and-typography',
    'web/patterns-and-extensions',
  ])('maps %s screenshot URLs to their docs', (section) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portal-routes-'))
    try {
      const docsRoot = path.join(root, 'docs')
      fs.mkdirSync(path.join(docsRoot, section, 'example'), {
        recursive: true,
      })
      fs.writeFileSync(
        path.join(docsRoot, section, 'example/Examples.tsx'),
        '<Badge />'
      )
      fs.writeFileSync(
        path.join(root, 'Example.screenshot.test.ts'),
        'const page = { url: "/' + section + '/example/demos" }'
      )
      const context = {
        packageRoot: root,
        portalDocsRoot: docsRoot,
      } as RunnerContext
      expect(
        findCompositionImpactedTests(
          context,
          ['src/components/badge/Badge.tsx'],
          ['Example.screenshot.test.ts']
        )
      ).toEqual(['Example.screenshot.test.ts'])
    } finally {
      fs.rmSync(root, { recursive: true, force: true })
    }
  })

  it.each([
    [
      'a URL constant',
      "const url = '/web/forms/Wizard/Container/demos/'\nmakeScreenshot({ url })",
      'web/forms/Wizard/Container/Examples.tsx',
    ],
    [
      'a URL with a query string',
      "makeScreenshot({ url: '/web/components/table/demos/?skeleton' })",
      'web/components/table/Examples.tsx',
    ],
    [
      'a page file instead of a demos folder',
      "makeScreenshot({ url: '/web/components/button/visual-tests/' })",
      'web/components/button/visual-tests.mdx',
    ],
  ])(
    'selects the screenshot test when its docs change, for %s',
    (_, testContent, docsFile) => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portal-docs-'))
      try {
        const docsRoot = path.join(root, 'docs')
        fs.mkdirSync(path.dirname(path.join(docsRoot, docsFile)), {
          recursive: true,
        })
        fs.writeFileSync(path.join(docsRoot, docsFile), '')
        fs.writeFileSync(
          path.join(root, 'Example.screenshot.test.ts'),
          testContent
        )
        const context = {
          packageRoot: root,
          portalDocsRoot: docsRoot,
        } as RunnerContext

        expect(
          findPortalDocsImpactedTests(
            context,
            [`packages/dnb-design-system-portal/src/docs/${docsFile}`],
            ['Example.screenshot.test.ts']
          )
        ).toEqual(['Example.screenshot.test.ts'])
      } finally {
        fs.rmSync(root, { recursive: true, force: true })
      }
    }
  )

  it('extracts entity names from components and extensions paths', () => {
    const names = collectChangedEntityNames([
      'src/components/badge/style/dnb-badge.scss',
      'src/extensions/forms/Form/Snapshot/Snapshot.tsx',
    ])

    expect(Array.from(names).sort((a, b) => a.localeCompare(b))).toEqual([
      'Badge',
      'Form.Snapshot',
    ])
  })

  it('names forms components with their namespace', () => {
    const names = collectChangedEntityNames([
      'src/extensions/forms/Field/String/String.tsx',
      'src/extensions/forms/Value/Date/style/dnb-value-date.scss',
      'src/extensions/forms/FieldBlock/FieldBlock.tsx',
      'src/extensions/forms/hooks/useFieldProps.ts',
    ])

    expect(Array.from(names).sort((a, b) => a.localeCompare(b))).toEqual([
      'Field.String',
      'FieldBlock',
      'Value.Date',
    ])
  })

  it('uses the namespace for files that its components share', () => {
    const names = collectChangedEntityNames([
      'src/extensions/forms/Field/style/dnb-field.scss',
      'src/extensions/forms/Wizard/hooks/useStep.ts',
    ])

    expect(Array.from(names).sort((a, b) => a.localeCompare(b))).toEqual([
      'Field',
      'Wizard',
    ])
  })

  it('selects only the demos that use the changed forms component', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portal-forms-'))
    try {
      const docsRoot = path.join(root, 'docs')
      for (const [name, content] of [
        [
          'composition',
          '<Field.Composition><Field.String /></Field.Composition>',
        ],
        ['number', '<Field.Number /> uses the same Field props'],
      ]) {
        fs.mkdirSync(path.join(docsRoot, 'web/forms', name), {
          recursive: true,
        })
        fs.writeFileSync(
          path.join(docsRoot, 'web/forms', name, 'Examples.tsx'),
          content
        )
        fs.writeFileSync(
          path.join(root, `${name}.screenshot.test.ts`),
          `makeScreenshot({ url: '/web/forms/${name}/demos' })`
        )
      }
      const context = {
        packageRoot: root,
        portalDocsRoot: docsRoot,
      } as RunnerContext

      expect(
        findCompositionImpactedTests(
          context,
          ['src/extensions/forms/Field/String/String.tsx'],
          ['composition.screenshot.test.ts', 'number.screenshot.test.ts']
        )
      ).toEqual(['composition.screenshot.test.ts'])
    } finally {
      fs.rmSync(root, { recursive: true, force: true })
    }
  })

  it.each([
    ['src/components/[id]/Item.tsx', '<Card id="d" />'],
    ['src/components/legacy(/Legacy.tsx', '<Legacy />'],
  ])(
    'matches the entity name of %s as plain text in the docs',
    (sourcePath, docsContent) => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portal-escape-'))
      try {
        const docsRoot = path.join(root, 'docs')
        fs.mkdirSync(path.join(docsRoot, 'web/components/card'), {
          recursive: true,
        })
        fs.writeFileSync(
          path.join(docsRoot, 'web/components/card/Examples.tsx'),
          docsContent
        )
        fs.writeFileSync(
          path.join(root, 'Card.screenshot.test.ts'),
          "makeScreenshot({ url: '/web/components/card/demos' })"
        )
        const context = {
          packageRoot: root,
          portalDocsRoot: docsRoot,
        } as RunnerContext

        expect(
          findCompositionImpactedTests(
            context,
            [sourcePath],
            ['Card.screenshot.test.ts']
          )
        ).toEqual([])
      } finally {
        fs.rmSync(root, { recursive: true, force: true })
      }
    }
  )

  it('ignores non-src and technical folder segments', () => {
    const names = collectChangedEntityNames([
      'packages/dnb-eufemia/scripts/tools/runScreenshotsConditionally/runner.ts',
      'src/extensions/forms/style/dnb-forms.scss',
      'src/extensions/forms/__tests__/Form.test.tsx',
    ])

    expect(Array.from(names)).toEqual([])
  })
})
