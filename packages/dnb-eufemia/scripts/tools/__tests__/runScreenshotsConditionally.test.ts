import { existsSync } from 'node:fs'
import path from 'node:path'
import { GLOBAL_VISUAL_PORTAL_FILES } from '../runScreenshotsConditionally/config'
import {
  buildDependencyMap,
  buildScssDependencyMap,
} from '../runScreenshotsConditionally/dependencyMaps'
import {
  analyzeSelection,
  isGlobalVisualImpact,
  toPackageRelativePath,
} from '../runScreenshotsConditionally/selection'
import type { SelectionInput } from '../runScreenshotsConditionally/types'

describe('runScreenshotsConditionally', () => {
  const allScreenshotTests = [
    'src/components/button/__tests__/Button.screenshot.test.ts',
    'src/components/badge/__tests__/Badge.screenshot.test.ts',
    'src/components/icon/__tests__/Icon.screenshot.test.ts',
    'src/components/input/__tests__/Input.screenshot.test.ts',
    'src/components/tag/__tests__/Tag.screenshot.test.ts',
    'src/components/tabs/__tests__/Tabs.screenshot.test.ts',
    'src/components/modal/__tests__/Modal.screenshot.test.ts',
  ]

  function select(
    input: Omit<SelectionInput, 'allScreenshotTests' | 'dependencyMap'> &
      Partial<Pick<SelectionInput, 'dependencyMap'>>
  ) {
    return analyzeSelection({
      allScreenshotTests,
      dependencyMap: new Map<string, string[]>(),
      ...input,
    }).selection
  }

  it('skips when no relevant visual source files changed', () => {
    const selection = select({
      changedRepoFiles: [
        'README.md',
        'packages/dnb-design-system-portal/src/docs/web/contribute/faq.mdx',
      ],
    })

    expect(selection.mode).toBe('skip')
  })

  it('skips when only MCP server source changed', () => {
    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/mcp/mcp-docs-server.ts',
        'packages/dnb-eufemia/src/mcp/__tests__/mcp-docs-server.test.ts',
      ],
    })

    expect(selection.mode).toBe('skip')
  })

  it('still selects tests for other source changes next to MCP changes', () => {
    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/mcp/mcp-docs-server.ts',
        'packages/dnb-eufemia/src/core/test-utils/testSetup.ts',
      ],
    })

    expect(selection.mode).toBe('all')
  })

  it('runs all tests when global style paths are changed', () => {
    const selection = select({
      changedRepoFiles: ['packages/dnb-eufemia/src/style/core/base.scss'],
    })

    expect(selection.mode).toBe('all')
    expect(selection.reason).toMatch(/Global visual impact detected/i)
  })

  it('runs all tests when theme selection changes', () => {
    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/core/vitest-screenshots/themeSelection.client.ts',
      ],
    })

    expect(selection.mode).toBe('all')
    expect(selection.reason).toMatch(/Global visual impact detected/i)
  })

  it('runs all tests when the portal styles around every demo change', () => {
    const selection = select({
      changedRepoFiles: [
        'packages/dnb-design-system-portal/src/core/PortalLayout.module.scss',
      ],
    })

    expect(selection.mode).toBe('all')
    expect(selection.reason).toMatch(
      /Portal file around every demo changed/
    )
  })

  it('skips for other portal files outside the docs', () => {
    const selection = select({
      changedRepoFiles: [
        'packages/dnb-design-system-portal/src/shared/menu/PortalToolsMenu.tsx',
      ],
    })

    expect(selection.mode).toBe('skip')
  })

  it('does not treat unrelated core jest helpers as global visual impact', () => {
    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/core/test-utils/testSetup.ts',
      ],
    })

    expect(selection.mode).toBe('all')
    expect(selection.reason).toMatch(/no impacted screenshot tests/i)
  })

  it('runs partial tests based on reverse dependencies', () => {
    const dependencyMap = buildDependencyMap([
      {
        source: 'src/components/button/Button.js',
        dependents: ['src/components/input/Input.js'],
      },
      {
        source: 'src/components/input/Input.js',
        dependents: ['src/components/tag/Tag.tsx'],
      },
      {
        source: 'src/components/tag/Tag.tsx',
        dependents: [],
      },
    ])

    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/components/button/Button.js',
      ],
      dependencyMap,
      impactedThreshold: 1,
    })

    expect(selection.mode).toBe('partial')
    expect(selection.tests).toEqual([
      'src/components/button/__tests__/Button.screenshot.test.ts',
      'src/components/input/__tests__/Input.screenshot.test.ts',
      'src/components/tag/__tests__/Tag.screenshot.test.ts',
    ])
  })

  it('runs all tests when source files changed but no test ownership could be matched', () => {
    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/components/new/New.tsx',
      ],
    })

    expect(selection.mode).toBe('all')
    expect(selection.reason).toMatch(/no impacted screenshot tests/i)
  })

  it('runs all tests when impacted ratio crosses the threshold', () => {
    const dependencyMap = buildDependencyMap([
      {
        source: 'src/components/button/Button.js',
        dependents: ['src/components/input/Input.js'],
      },
      {
        source: 'src/components/input/Input.js',
        dependents: [],
      },
    ])

    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/components/button/Button.js',
      ],
      dependencyMap,
      impactedThreshold: 0.25,
    })

    expect(selection.mode).toBe('all')
    expect(selection.reason).toMatch(/Large impact detected/)
  })

  it('runs partial tests for transitive scss dependents', () => {
    const scssDependencyMap = buildScssDependencyMap([
      {
        path: 'src/components/icon/style/dnb-icon.scss',
        content: '',
      },
      {
        path: 'src/components/icon/style/deps.scss',
        content: "@use './dnb-icon.scss';",
      },
      {
        path: 'src/components/button/style/deps.scss',
        content: "@use '../../icon/style/deps.scss';",
      },
    ])

    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/components/icon/style/dnb-icon.scss',
      ],
      scssDependencyMap,
      impactedThreshold: 1,
    })

    expect(selection.mode).toBe('partial')
    expect(selection.tests).toEqual([
      'src/components/button/__tests__/Button.screenshot.test.ts',
      'src/components/icon/__tests__/Icon.screenshot.test.ts',
    ])
  })

  it('does not expand scss impact through dnb-ui-components aggregator', () => {
    const scssDependencyMap = buildScssDependencyMap([
      {
        path: 'src/components/badge/style/dnb-badge.scss',
        content: '',
      },
      {
        path: 'src/style/dnb-ui-components.scss',
        content: "@use '../components/badge/style/dnb-badge.scss';",
      },
      {
        path: 'src/style/themes/theme-ui/ui-theme-components.scss',
        content: "@use '../../dnb-ui-components.scss';",
      },
    ])

    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/components/badge/style/dnb-badge.scss',
      ],
      scssDependencyMap,
      impactedThreshold: 1,
    })

    expect(selection.mode).toBe('partial')
    expect(selection.tests).toEqual([
      'src/components/badge/__tests__/Badge.screenshot.test.ts',
    ])
  })

  it('selects tests of components that render a component with changed styles', () => {
    const scssDependencyMap = buildScssDependencyMap([
      {
        path: 'src/components/input/style/dnb-input.scss',
        content: '',
      },
    ])
    const dependencyMap = buildDependencyMap([
      {
        source: 'src/components/input/Input.tsx',
        dependents: ['src/components/tag/Tag.tsx'],
      },
      {
        source: 'src/components/input/InputDocs.ts',
        dependents: ['src/components/badge/BadgeDocs.ts'],
      },
    ])

    const analysis = analyzeSelection({
      allScreenshotTests,
      changedRepoFiles: [
        'packages/dnb-eufemia/src/components/input/style/dnb-input.scss',
      ],
      dependencyMap,
      scssDependencyMap,
      impactedThreshold: 1,
    })

    expect(analysis.selection.tests).toEqual([
      'src/components/input/__tests__/Input.screenshot.test.ts',
      'src/components/tag/__tests__/Tag.screenshot.test.ts',
    ])
    expect(
      analysis.details.testCauses[
        'src/components/tag/__tests__/Tag.screenshot.test.ts'
      ]
    ).toEqual(['Style of a rendered component'])
  })

  it('does not treat global style files as owned by a component', () => {
    const scssDependencyMap = buildScssDependencyMap([
      {
        path: 'src/components/button/style/themes/dnb-button-theme-ui.scss',
        content: '',
      },
      {
        path: 'src/style/themes/ui/ui-theme-components.scss',
        content:
          "@use '../../../components/button/style/themes/dnb-button-theme-ui.scss';",
      },
    ])
    const dependencyMap = buildDependencyMap([
      {
        source: 'src/components/modal/Modal.tsx',
        dependents: ['src/components/tabs/Tabs.tsx'],
      },
    ])

    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/components/button/style/themes/dnb-button-theme-ui.scss',
      ],
      dependencyMap,
      scssDependencyMap,
      impactedThreshold: 1,
    })

    expect(selection.tests).toEqual([
      'src/components/button/__tests__/Button.screenshot.test.ts',
    ])
  })

  it('does not select screenshot tests through other test files', () => {
    const dependencyMap = buildDependencyMap([
      {
        source: 'src/components/button/Button.tsx',
        dependents: [
          'src/components/tabs/__tests__/TabsExports.test.ts',
          'src/components/input/Input.tsx',
        ],
      },
    ])

    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/components/button/Button.tsx',
      ],
      dependencyMap,
      impactedThreshold: 1,
    })

    expect(selection.tests).toEqual([
      'src/components/button/__tests__/Button.screenshot.test.ts',
      'src/components/input/__tests__/Input.screenshot.test.ts',
    ])
  })

  it('includes tests impacted by composition usage in demos', () => {
    const selection = select({
      changedRepoFiles: [
        'packages/dnb-eufemia/src/components/badge/Badge.tsx',
      ],
      compositionImpactedTests: [
        'src/components/tabs/__tests__/Tabs.screenshot.test.ts',
      ],
      impactedThreshold: 1,
    })

    expect(selection.mode).toBe('partial')
    expect(selection.tests).toEqual([
      'src/components/badge/__tests__/Badge.screenshot.test.ts',
      'src/components/tabs/__tests__/Tabs.screenshot.test.ts',
    ])
  })

  it('includes tests impacted by changed portal docs without forcing global run', () => {
    const selection = select({
      changedRepoFiles: [
        'packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/about-forms.mdx',
      ],
      portalDocsImpactedTests: [
        'src/components/tabs/__tests__/Tabs.screenshot.test.ts',
      ],
      impactedThreshold: 1,
    })

    expect(selection.mode).toBe('partial')
    expect(selection.tests).toEqual([
      'src/components/tabs/__tests__/Tabs.screenshot.test.ts',
    ])
  })
})

describe('path helpers', () => {
  it('normalizes package-relative paths from repository paths', () => {
    expect(
      toPackageRelativePath(
        'packages/dnb-eufemia/src/components/button/Button.js'
      )
    ).toBe('src/components/button/Button.js')
  })

  it('does not treat portal visual docs as global visual impact', () => {
    expect(
      isGlobalVisualImpact(
        'packages/dnb-design-system-portal/src/docs/uilib/components/button.mdx',
        null
      )
    ).toBe(false)
  })

  it('treats the portal demo wrapper as global visual impact', () => {
    expect(
      isGlobalVisualImpact(
        'packages/dnb-design-system-portal/src/shared/tags/CodeBlock.module.scss',
        null
      )
    ).toBe(true)
  })

  it('lists only portal files that exist', () => {
    const repoRoot = path.resolve(__dirname, '../../../../..')

    for (const filePath of Array.from(GLOBAL_VISUAL_PORTAL_FILES)) {
      expect(existsSync(path.join(repoRoot, filePath))).toBe(true)
    }
  })

  it('treats theme selection as global visual impact', () => {
    expect(
      isGlobalVisualImpact(
        'packages/dnb-eufemia/src/core/vitest-screenshots/themeSelection.client.ts',
        'src/core/vitest-screenshots/themeSelection.client.ts'
      )
    ).toBe(true)
  })

  it('treats the screenshot vitest config as global visual impact', () => {
    expect(
      isGlobalVisualImpact(
        'packages/dnb-eufemia/vitest.config.screenshots.mts',
        toPackageRelativePath(
          'packages/dnb-eufemia/vitest.config.screenshots.mts'
        )
      )
    ).toBe(true)
  })

  it('does not treat unrelated jest helpers as global visual impact', () => {
    expect(
      isGlobalVisualImpact(
        'packages/dnb-eufemia/src/core/test-utils/testSetup.ts',
        'src/core/test-utils/testSetup.ts'
      )
    ).toBe(false)
  })
})
