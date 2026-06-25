import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

import {
  buildComponentDirIndex,
  buildReexportFileIndex,
  deriveRenderDependencies,
} from '../src/deriveRenderDependencies.ts'

describe('buildComponentDirIndex', () => {
  it('sorts directories longest-first so the most specific dir wins', () => {
    const index = buildComponentDirIndex([
      { name: 'form', dir: '/src/components/form' },
      { name: 'form-status', dir: '/src/components/form-status' },
    ])

    expect(index.map((entry) => entry.name)).toEqual([
      'form-status',
      'form',
    ])
  })
})

describe('deriveRenderDependencies', () => {
  let root: string
  let buttonDir: string

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'derive-render-'))

    const make = (relativeFile: string, content: string) => {
      const full = path.join(root, relativeFile)
      fs.mkdirSync(path.dirname(full), { recursive: true })
      fs.writeFileSync(full, content)
    }

    buttonDir = path.join(root, 'components', 'button')

    make(
      'components/button/Button.tsx',
      [
        "import Tooltip from '../tooltip/Tooltip'",
        "import Anchor, { pickIcon } from '../anchor/Anchor'",
        "import IconPrimary from '../icon-primary/IconPrimary'",
        "import type { SkeletonShow } from '../skeleton/Skeleton'",
        "import { clsx } from 'clsx'",
        '',
        'export default function Button() {',
        '  return (',
        '    <button className={clsx(pickIcon())}>',
        '      <Tooltip />',
        '      <IconPrimary />',
        '    </button>',
        '  )',
        '}',
      ].join('\n')
    )

    // Nested implementation file should also be scanned.
    make(
      'components/button/internal/ButtonContent.tsx',
      [
        "import ProgressIndicator from '../../progress-indicator/ProgressIndicator'",
        'export default function ButtonContent() {',
        '  return <ProgressIndicator />',
        '}',
      ].join('\n')
    )

    // Test files must be ignored.
    make(
      'components/button/__tests__/Button.test.tsx',
      [
        "import Dropdown from '../../dropdown/Dropdown'",
        'it("renders", () => { render(<Dropdown />) })',
      ].join('\n')
    )

    // Sibling component directories (only their presence matters).
    for (const name of [
      'tooltip',
      'anchor',
      'progress-indicator',
      'skeleton',
      'dropdown',
    ]) {
      fs.mkdirSync(path.join(root, 'components', name), {
        recursive: true,
      })
    }
  })

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  const index = () =>
    buildComponentDirIndex([
      { name: 'button', dir: path.join(root, 'components', 'button') },
      { name: 'tooltip', dir: path.join(root, 'components', 'tooltip') },
      { name: 'anchor', dir: path.join(root, 'components', 'anchor') },
      {
        name: 'progress-indicator',
        dir: path.join(root, 'components', 'progress-indicator'),
      },
      { name: 'skeleton', dir: path.join(root, 'components', 'skeleton') },
      { name: 'dropdown', dir: path.join(root, 'components', 'dropdown') },
    ])

  it('detects a sibling component rendered as a JSX element', () => {
    const deps = deriveRenderDependencies({
      componentDir: buttonDir,
      name: 'button',
      componentDirIndex: index(),
    })

    expect(deps).toContain('tooltip')
  })

  it('scans nested implementation files', () => {
    const deps = deriveRenderDependencies({
      componentDir: buttonDir,
      name: 'button',
      componentDirIndex: index(),
    })

    expect(deps).toContain('progress-indicator')
  })

  it('ignores imports that are not rendered as JSX', () => {
    const deps = deriveRenderDependencies({
      componentDir: buttonDir,
      name: 'button',
      componentDirIndex: index(),
    })

    // `pickIcon` is used, but `<Anchor>` is never rendered.
    expect(deps).not.toContain('anchor')
  })

  it('ignores type-only imports', () => {
    const deps = deriveRenderDependencies({
      componentDir: buttonDir,
      name: 'button',
      componentDirIndex: index(),
    })

    expect(deps).not.toContain('skeleton')
  })

  it('ignores components rendered only in test files', () => {
    const deps = deriveRenderDependencies({
      componentDir: buttonDir,
      name: 'button',
      componentDirIndex: index(),
    })

    expect(deps).not.toContain('dropdown')
  })

  it('ignores components that are not manifest entries', () => {
    const deps = deriveRenderDependencies({
      componentDir: buttonDir,
      name: 'button',
      componentDirIndex: index(),
    })

    // `icon-primary` has no own style block, so it is absent from the index
    // and must not be reported even though `<IconPrimary>` is rendered.
    expect(deps).not.toContain('icon-primary')
  })

  it('returns an empty array when the directory is missing', () => {
    const deps = deriveRenderDependencies({
      componentDir: path.join(root, 'does-not-exist'),
      name: 'button',
      componentDirIndex: index(),
    })

    expect(deps).toEqual([])
  })
})

describe('buildReexportFileIndex', () => {
  let root: string
  let componentsDir: string

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'reexport-index-'))
    componentsDir = path.join(root, 'components')

    const make = (relativeFile: string, content: string) => {
      const full = path.join(root, relativeFile)
      fs.mkdirSync(path.dirname(full), { recursive: true })
      fs.writeFileSync(full, content)
    }

    // Component directories with their real implementation files.
    make('components/flex/Flex.tsx', 'export default function Flex() {}')
    make(
      'components/form-status/FormStatus.tsx',
      'export default function FormStatus() {}'
    )

    // PascalCase re-export barrels one level above the component directory.
    make(
      'components/Flex.ts',
      [
        "import Flex from './flex/Flex'",
        "export * from './flex/Flex'",
        'export default Flex',
      ].join('\n')
    )
    make(
      'components/FormStatus.ts',
      [
        "import FormStatus from './form-status/FormStatus'",
        "export * from './form-status/FormStatus'",
        'export default FormStatus',
      ].join('\n')
    )

    // A lowercase index barrel must be ignored (re-exports everything).
    make('components/index.ts', "export * from './Flex'")

    // A PascalCase file that does not re-export a known component is ignored.
    make('components/Helpers.ts', 'export const noop = () => {}')
  })

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  const dirIndex = () =>
    buildComponentDirIndex([
      { name: 'flex', dir: path.join(componentsDir, 'flex') },
      {
        name: 'form-status',
        dir: path.join(componentsDir, 'form-status'),
      },
    ])

  it('maps PascalCase re-export barrels to the component they re-export', () => {
    const aliases = buildReexportFileIndex([componentsDir], dirIndex())

    expect(aliases).toEqual(
      expect.arrayContaining([
        { name: 'flex', dir: path.join(componentsDir, 'Flex') },
        {
          name: 'form-status',
          dir: path.join(componentsDir, 'FormStatus'),
        },
      ])
    )
  })

  it('ignores the lowercase index barrel and non-component files', () => {
    const aliases = buildReexportFileIndex([componentsDir], dirIndex())
    const dirs = aliases.map((alias) => path.basename(alias.dir))

    expect(dirs).not.toContain('index')
    expect(dirs).not.toContain('Helpers')
  })

  it('skips group directories that do not exist', () => {
    const aliases = buildReexportFileIndex(
      [path.join(root, 'missing')],
      dirIndex()
    )

    expect(aliases).toEqual([])
  })
})

describe('deriveRenderDependencies via re-export barrels', () => {
  let root: string
  let radioDir: string

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'render-reexport-'))
    radioDir = path.join(root, 'components', 'radio')

    const make = (relativeFile: string, content: string) => {
      const full = path.join(root, relativeFile)
      fs.mkdirSync(path.dirname(full), { recursive: true })
      fs.writeFileSync(full, content)
    }

    // RadioGroup renders <Flex> imported via the re-export barrel `../Flex`,
    // which resolves to `components/Flex.ts`, not `components/flex/`.
    make(
      'components/radio/RadioGroup.tsx',
      [
        "import Flex from '../Flex'",
        'export default function RadioGroup() {',
        '  return <Flex.Stack />',
        '}',
      ].join('\n')
    )

    make('components/flex/Flex.tsx', 'export default function Flex() {}')
    make(
      'components/Flex.ts',
      [
        "import Flex from './flex/Flex'",
        "export * from './flex/Flex'",
        'export default Flex',
      ].join('\n')
    )
  })

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it('resolves a sibling rendered through its re-export barrel file', () => {
    const componentsDir = path.join(root, 'components')
    const dirEntries = [
      { name: 'radio', dir: radioDir },
      { name: 'flex', dir: path.join(componentsDir, 'flex') },
    ]
    const componentDirIndex = buildComponentDirIndex([
      ...dirEntries,
      ...buildReexportFileIndex(
        [componentsDir],
        buildComponentDirIndex(dirEntries)
      ),
    ])

    const deps = deriveRenderDependencies({
      componentDir: radioDir,
      name: 'radio',
      componentDirIndex,
    })

    expect(deps).toContain('flex')
  })

  it('does not resolve the barrel import without the alias index', () => {
    const componentDirIndex = buildComponentDirIndex([
      { name: 'radio', dir: radioDir },
      { name: 'flex', dir: path.join(root, 'components', 'flex') },
    ])

    const deps = deriveRenderDependencies({
      componentDir: radioDir,
      name: 'radio',
      componentDirIndex,
    })

    // Without the re-export alias index the directory resolver misses it.
    expect(deps).not.toContain('flex')
  })
})
