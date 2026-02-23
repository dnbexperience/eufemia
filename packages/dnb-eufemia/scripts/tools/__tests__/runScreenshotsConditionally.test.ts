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
        'packages/dnb-design-system-portal/src/docs/contribute/faq.mdx',
      ],
    })

    expect(selection.mode).toBe('skip')
  })

  it('runs all tests when global style paths are changed', () => {
    const selection = select({
      changedRepoFiles: ['packages/dnb-eufemia/src/style/core/base.scss'],
    })

    expect(selection.mode).toBe('all')
    expect(selection.reason).toMatch(/Global visual impact detected/i)
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
        content: "@import './dnb-icon.scss';",
      },
      {
        path: 'src/components/button/style/deps.scss',
        content: "@import '../../icon/style/deps.scss';",
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
        content: "@import '../components/badge/style/dnb-badge.scss';",
      },
      {
        path: 'src/style/themes/theme-ui/ui-theme-components.scss',
        content: "@import '../../dnb-ui-components.scss';",
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
})
