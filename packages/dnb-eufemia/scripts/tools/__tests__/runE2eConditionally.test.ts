import {
  LIBRARY,
  PORTAL,
  selectE2eTests,
  type SourceFile,
} from '../runE2eConditionally/selection'

const component = (owner: string) =>
  LIBRARY + 'src/components/' + owner + '/' + owner + '.tsx'
const spec = (owner: string): SourceFile => ({
  path:
    LIBRARY + 'src/components/' + owner + '/__tests__/example.e2e.spec.ts',
  content: "page.goto('/web/components/" + owner + "/demos/')",
})
const ai: SourceFile = {
  path: PORTAL + 'src/e2e/aiReading.spec.ts',
  content:
    "page.goto('/web/patterns-and-extensions/ai/Conversation/demos/')",
}
const smoke: SourceFile = {
  path: PORTAL + 'src/e2e/pageNavigation.spec.ts',
  content: "page.goto('/web/components/button/')",
}
const shared: SourceFile = {
  path: LIBRARY + 'src/style/__tests__/Fonts.e2e.spec.ts',
  content: "compile('style/themes/ui/fonts.scss')",
}
const tests = [
  spec('checkbox'),
  spec('filter'),
  spec('slider'),
  ai,
  smoke,
  shared,
]
const run = (
  options: Partial<Parameters<typeof selectE2eTests>[0]> = {}
) =>
  selectE2eTests({
    changedFiles: [component('checkbox')],
    tests,
    docs: [],
    branch: 'fix/checkbox',
    ...options,
  })

it('keeps affected components, shared browser checks and the navigation smoke', () => {
  const plan = run()
  expect(plan.mode).toBe('partial')
  expect(plan.tests).toEqual(
    expect.arrayContaining([
      spec('checkbox').path,
      smoke.path,
      shared.path,
    ])
  )
  expect(plan.tests).not.toContain(ai.path)
  expect(plan.tests).not.toContain(spec('slider').path)
})

it('includes transitive source dependencies and fixture compositions', () => {
  const docs = [
    {
      path: PORTAL + 'src/docs/web/components/filter/Examples.tsx',
      content: '<Checkbox />',
    },
  ]
  expect(run({ docs }).tests).toContain(spec('filter').path)
  expect(
    run({ affectedFiles: ['src/components/filter/Filter.tsx'] }).tests
  ).toContain(spec('filter').path)
})

it.each(['main', 'beta', 'alpha', 'release', 'next', 'v10'])(
  'runs full coverage on %s',
  (branch) => {
    expect(run({ branch }).mode).toBe('all')
  }
)

it.each([
  'yarn.lock',
  '.github/workflows/e2e.yml',
  LIBRARY + 'assets/fonts/dnb/font.woff2',
  LIBRARY + 'src/style/themes/shared-globals.scss',
  LIBRARY + 'src/shared/Context.ts',
  PORTAL + 'src/shared/menu/Header.tsx',
  PORTAL + 'vite.config.ts',
  PORTAL + 'src/docs/web/components/button/info.mdx',
])('runs full coverage for shared or unmapped input %s', (file) => {
  expect(run({ changedFiles: [file] }).mode).toBe('all')
})

it('runs full coverage when an affected component reaches shared Portal content', () => {
  expect(
    run({
      docs: [
        { path: PORTAL + 'src/docs/index.mdx', content: '<Checkbox />' },
      ],
    }).mode
  ).toBe('all')
})

it('runs full coverage when changes are unknown or explicitly forced', () => {
  expect(run({ changedFiles: [] }).mode).toBe('all')
  expect(run({ forceAll: true }).mode).toBe('all')
})

it('selects a modified test even when its fixture is otherwise unrelated', () => {
  expect(run({ changedFiles: [ai.path] }).tests).toContain(ai.path)
})

it('skips changes confined to unit expectations or agent guidance', () => {
  expect(run({ changedFiles: ['AGENTS.md'] }).mode).toBe('skip')
  expect(
    run({
      changedFiles: [
        LIBRARY + 'src/components/button/__tests__/Button.test.tsx',
      ],
    }).mode
  ).toBe('skip')
})

it('maps Forms fixtures in their current Portal location', () => {
  const formTest = {
    path: PORTAL + 'src/e2e/forms.spec.ts',
    content: "page.goto('/web/forms/base-fields/Selection/demos/')",
  }
  expect(
    run({
      tests: [...tests, formTest],
      docs: [
        {
          path:
            PORTAL +
            'src/docs/web/forms/base-fields/Selection/Examples.tsx',
          content: '<Checkbox />',
        },
      ],
    }).tests
  ).toContain(formTest.path)
})

it('does not treat a changelog mention as a rendered fixture', () => {
  expect(
    run({
      docs: [
        {
          path: PORTAL + 'src/docs/EUFEMIA_CHANGELOG.mdx',
          content: '- Checkbox: corrected the check icon.',
        },
      ],
    }).mode
  ).toBe('partial')
})

it('includes a named import used under a local alias', () => {
  expect(
    run({
      docs: [
        {
          path: PORTAL + 'src/docs/web/components/filter/Examples.tsx',
          content:
            "import { Checkbox as Check } from '@dnb/eufemia'; <Check />",
        },
      ],
    }).tests
  ).toContain(spec('filter').path)
})

it('does not expand a fixture owner into unrelated consumers of that component', () => {
  expect(
    run({
      docs: [
        {
          path: PORTAL + 'src/docs/web/components/filter/Examples.tsx',
          content: '<Checkbox />',
        },
        {
          path:
            PORTAL +
            'src/docs/web/patterns-and-extensions/ai/Examples.tsx',
          content: '<Filter />',
        },
      ],
    }).tests
  ).not.toContain(ai.path)
})

it('keeps global coverage when reverse dependencies reach shared source', () => {
  expect(run({ affectedFiles: ['src/shared/Context.ts'] }).mode).toBe(
    'all'
  )
})

it('retains shared style matrices even if they mention a component route', () => {
  const styles = {
    ...shared,
    content: "page.goto('/web/components/button/')",
  }
  expect(run({ tests: [styles, ...tests] }).tests).toContain(styles.path)
})

it('retains tests with dynamic routes or broad Portal sections', () => {
  for (const content of [
    "page.goto('/web/components/button/'); page.goto('/web/')",
    'page.goto(`/web/components/${component}/`)',
    "page.goto('/web/get-started/'); page.goto('/web/components/button/')",
  ]) {
    const test = { path: PORTAL + 'src/e2e/dynamic.spec.ts', content }
    expect(run({ tests: [test, ...tests] }).tests).toContain(test.path)
  }
})

it.each(['check+box', 'check(box', 'check[box', 'check|box'])(
  'matches component names literally in fixtures: %s',
  (owner) => {
    const name = owner[0].toUpperCase() + owner.slice(1)
    for (const content of [
      '<' + name + ' />',
      'import { ' + name + ' as Check } from "example"',
    ]) {
      const plan = run({
        changedFiles: [component(owner)],
        docs: [
          {
            path: PORTAL + 'src/docs/web/components/filter/Examples.tsx',
            content,
          },
        ],
      })
      expect(plan.tests).toContain(spec('filter').path)
    }
  }
)
