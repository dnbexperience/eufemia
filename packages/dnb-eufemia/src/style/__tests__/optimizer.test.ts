import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs'
import os from 'os'
import path from 'path'

import {
  createSafelist,
  detectUsedComponents,
  protectWhereSelectors,
  type StyleManifest,
} from '../optimizer'

const manifest: StyleManifest = {
  version: 1,
  entries: {
    autocomplete: {
      name: 'autocomplete',
      group: 'components',
      classPrefix: 'dnb-autocomplete',
      dependencies: ['button', 'dropdown', 'icon', 'input'],
    },
    button: {
      name: 'button',
      group: 'components',
      classPrefix: 'dnb-button',
      dependencies: ['icon'],
    },
    dropdown: {
      name: 'dropdown',
      group: 'components',
      classPrefix: 'dnb-dropdown',
      dependencies: ['button', 'icon'],
    },
    icon: {
      name: 'icon',
      group: 'components',
      classPrefix: 'dnb-icon',
      dependencies: [],
    },
    input: {
      name: 'input',
      group: 'components',
      classPrefix: 'dnb-input',
      dependencies: [],
    },
    'input-masked': {
      name: 'input-masked',
      group: 'components',
      classPrefix: 'dnb-input-masked',
      dependencies: ['input'],
    },
    'date-picker': {
      name: 'date-picker',
      group: 'components',
      classPrefix: 'dnb-date-picker',
      dependencies: [],
    },
    slider: {
      name: 'slider',
      group: 'components',
      classPrefix: 'dnb-slider',
      dependencies: [],
    },
    table: {
      name: 'table',
      group: 'components',
      classPrefix: 'dnb-table',
      dependencies: [],
    },
    upload: {
      name: 'upload',
      group: 'components',
      classPrefix: 'dnb-upload',
      dependencies: ['table'],
    },
    forms: {
      name: 'forms',
      group: 'extensions',
      classPrefix: 'dnb-forms',
      dependencies: ['button', 'input'],
    },
  },
  foundation: ['dnb-h', 'dnb-hr', 'dnb-p', 'dnb-ul'],
  formsFieldDependencies: {
    'Field.Upload': ['table', 'upload'],
    'Value.Upload': ['table', 'upload'],
    'Field.Slider': ['slider'],
    'Field.Date': ['date-picker'],
  },
}

describe('createSafelist', () => {
  it('expands a used component to include its transitive dependencies', () => {
    const result = createSafelist({
      manifest,
      components: ['autocomplete'],
      includeGlobals: false,
    })

    expect(result.components).toEqual([
      'autocomplete',
      'button',
      'dropdown',
      'icon',
      'input',
    ])
    expect(result.prefixes).toContain('dnb-autocomplete')
    expect(result.prefixes).toContain('dnb-input')
  })

  it('accepts both names and class prefixes as input', () => {
    const result = createSafelist({
      manifest,
      components: ['dnb-button'],
      includeGlobals: false,
    })

    expect(result.components).toEqual(['button', 'icon'])
  })

  it('includes global structural classes by default', () => {
    const result = createSafelist({ manifest, components: ['button'] })

    expect(result.prefixes).toContain('dnb-core-style')
    expect(result.prefixes).toContain('dnb-spacing')
    expect(result.prefixes).toContain('eufemia-theme')
  })

  it('omits globals when includeGlobals is false', () => {
    const result = createSafelist({
      manifest,
      components: ['button'],
      includeGlobals: false,
    })

    expect(result.prefixes).not.toContain('dnb-core-style')
  })

  it('produces greedy regexes that keep the block and its BEM children', () => {
    const result = createSafelist({
      manifest,
      components: ['button'],
      includeGlobals: false,
    })

    const matches = (selector: string) =>
      result.greedy.some((re) => re.test(selector))

    expect(matches('dnb-button')).toBe(true)
    expect(matches('dnb-button--primary')).toBe(true)
    expect(matches('dnb-button__text')).toBe(true)
    expect(matches('dnb-icon')).toBe(true)
  })

  it('does not keep a different block that shares a dash-prefix', () => {
    const result = createSafelist({
      manifest,
      components: ['input'],
      includeGlobals: false,
    })

    const matches = (selector: string) =>
      result.greedy.some((re) => re.test(selector))

    expect(matches('dnb-input')).toBe(true)
    expect(matches('dnb-input--medium')).toBe(true)
    expect(matches('dnb-input-masked')).toBe(false)
  })

  it('keeps the whole flat namespace for a namespace block (forms)', () => {
    const result = createSafelist({
      manifest,
      components: ['forms'],
      includeGlobals: false,
    })

    const matches = (selector: string) =>
      result.greedy.some((re) => re.test(selector))

    expect(matches('dnb-forms')).toBe(true)
    expect(matches('dnb-forms-field-string')).toBe(true)
    expect(matches('dnb-forms-section')).toBe(true)
    expect(matches('dnb-forms-field-block__label')).toBe(true)

    // Forms also keeps the base components it renders (manifest dependencies).
    expect(result.components).toContain('button')
    expect(result.components).toContain('input')
  })

  it('keeps unknown components defensively', () => {
    const result = createSafelist({
      manifest,
      components: ['made-up'],
      includeGlobals: false,
    })

    expect(result.components).toContain('made-up')
    expect(result.prefixes).toContain('dnb-made-up')
  })

  it('always keeps the element foundation CSS when globals are included', () => {
    const result = createSafelist({ manifest, components: ['button'] })

    const matches = (selector: string) =>
      result.greedy.some((re) => re.test(selector))

    // Element base classes are emitted as a runtime `dnb-${tag}` class, so they
    // must be kept independently of any detected component.
    expect(result.prefixes).toContain('dnb-hr')
    expect(result.prefixes).toContain('dnb-p')
    expect(matches('dnb-hr')).toBe(true)
    expect(matches('dnb-hr--dashed')).toBe(true)
    expect(matches('dnb-p')).toBe(true)
    expect(matches('dnb-h')).toBe(true)
    expect(matches('dnb-h--large')).toBe(true)
    expect(matches('dnb-ul')).toBe(true)
  })

  it('foundation prefixes do not bleed into similarly named blocks', () => {
    const result = createSafelist({ manifest, components: [] })

    const matches = (selector: string) =>
      result.greedy.some((re) => re.test(selector))

    // `dnb-h` must not keep `dnb-heading`/`dnb-help-button`; `dnb-p` must not
    // keep `dnb-popover`; `dnb-hr` must not keep `dnb-p`'s unrelated neighbours.
    expect(matches('dnb-heading')).toBe(false)
    expect(matches('dnb-help-button')).toBe(false)
    expect(matches('dnb-height-animation')).toBe(false)
    expect(matches('dnb-popover')).toBe(false)
  })

  it('omits the element foundation when includeGlobals is false', () => {
    const result = createSafelist({
      manifest,
      components: ['button'],
      includeGlobals: false,
    })

    expect(result.prefixes).not.toContain('dnb-hr')
    expect(result.prefixes).not.toContain('dnb-p')
  })

  it('throws a clear error when the manifest path cannot be read', () => {
    expect(() =>
      createSafelist({
        manifestPath: path.join(os.tmpdir(), 'does-not-exist.json'),
        components: ['button'],
      })
    ).toThrow(/style manifest/i)
  })

  it('exposes serializable pattern sources matching the regexes', () => {
    const result = createSafelist({
      manifest,
      components: ['button'],
      includeGlobals: false,
    })

    expect(result.patterns.length).toBe(result.greedy.length)
    result.patterns.forEach((source, index) => {
      expect(new RegExp(source).source).toBe(result.greedy[index].source)
    })
  })
})

describe('detectUsedComponents', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(path.join(os.tmpdir(), 'eufemia-optimizer-'))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  const write = (relativePath: string, code: string) => {
    const full = path.join(dir, relativePath)
    mkdirSync(path.dirname(full), { recursive: true })
    writeFileSync(full, code, 'utf-8')
  }

  it('detects components imported from @dnb/eufemia across nested files', () => {
    write('a.tsx', `import { Button } from '@dnb/eufemia'`)
    write('nested/b.ts', `import { DatePicker } from '@dnb/eufemia'`)

    expect(detectUsedComponents({ manifest, sources: [dir] })).toEqual([
      'button',
      'date-picker',
    ])
  })

  it('ignores type-only imports and unknown components', () => {
    write('a.ts', `import type { ButtonProps } from '@dnb/eufemia'`)
    write('b.ts', `import { Unknown } from '@dnb/eufemia'`)

    expect(detectUsedComponents({ manifest, sources: [dir] })).toEqual([])
  })

  it('ignores imports from other packages', () => {
    write('a.ts', `import { Button } from 'some-other-lib'`)

    expect(detectUsedComponents({ manifest, sources: [dir] })).toEqual([])
  })

  it('detects Eufemia Forms from any forms-subpath import', () => {
    write(
      'a.tsx',
      `import { Field, Form } from '@dnb/eufemia/extensions/forms'`
    )
    write(
      'b.tsx',
      `import { RegisteredField as F } from '@dnb/eufemia/extensions/forms'`
    )
    write(
      'c.tsx',
      `import * as Forms from '@dnb/eufemia/extensions/forms'`
    )

    expect(detectUsedComponents({ manifest, sources: [dir] })).toContain(
      'forms'
    )
  })

  it('detects Eufemia Forms from a source (/src) forms-subpath import', () => {
    write(
      'a.tsx',
      `import { Field, Form } from '@dnb/eufemia/src/extensions/forms'`
    )

    expect(detectUsedComponents({ manifest, sources: [dir] })).toContain(
      'forms'
    )
  })

  it('does not keep a field heavy component unless its member is used', () => {
    write(
      'a.tsx',
      [
        `import { Form, Field } from '@dnb/eufemia/extensions/forms'`,
        `const App = () => (`,
        `  <Form.Handler>`,
        `    <Field.String label="Name" />`,
        `  </Form.Handler>`,
        `)`,
      ].join('\n')
    )

    const result = detectUsedComponents({ manifest, sources: [dir] })

    expect(result).toContain('forms')
    expect(result).not.toContain('upload')
    expect(result).not.toContain('table')
    expect(result).not.toContain('slider')
  })

  it('keeps Upload (and Table) only when Field.Upload is used', () => {
    write(
      'a.tsx',
      [
        `import { Form, Field } from '@dnb/eufemia/extensions/forms'`,
        `const App = () => (`,
        `  <Form.Handler>`,
        `    <Field.Upload path="/files" />`,
        `  </Form.Handler>`,
        `)`,
      ].join('\n')
    )

    const result = detectUsedComponents({ manifest, sources: [dir] })

    expect(result).toContain('forms')
    expect(result).toContain('upload')
    expect(result).toContain('table')
  })

  it('keeps Upload when Value.Upload is used', () => {
    write(
      'a.tsx',
      [
        `import { Value } from '@dnb/eufemia/extensions/forms'`,
        `const App = () => <Value.Upload path="/files" />`,
      ].join('\n')
    )

    const result = detectUsedComponents({ manifest, sources: [dir] })

    expect(result).toContain('upload')
    expect(result).toContain('table')
  })

  it('resolves field member usage through an aliased binding', () => {
    write(
      'a.tsx',
      [
        `import { Field as F } from '@dnb/eufemia/extensions/forms'`,
        `const App = () => <F.Slider path="/range" />`,
      ].join('\n')
    )

    const result = detectUsedComponents({ manifest, sources: [dir] })

    expect(result).toContain('forms')
    expect(result).toContain('slider')
    expect(result).not.toContain('upload')
  })

  it('keeps a fields safelist greedy patterns when its member is used', () => {
    write(
      'a.tsx',
      [
        `import { Field } from '@dnb/eufemia/extensions/forms'`,
        `const App = () => <Field.Upload path="/files" />`,
      ].join('\n')
    )

    const result = createSafelist({
      manifest,
      sources: [dir],
      includeGlobals: false,
    })

    const matches = (selector: string) =>
      result.greedy.some((re) => re.test(selector))

    expect(matches('dnb-upload')).toBe(true)
    expect(matches('dnb-table')).toBe(true)
    expect(matches('dnb-forms-field-upload')).toBe(true)
  })

  it('does not keep a fields component when only a different member is used', () => {
    write(
      'a.tsx',
      [
        `import { Field } from '@dnb/eufemia/extensions/forms'`,
        `const App = () => <Field.Date path="/date" />`,
      ].join('\n')
    )

    const result = createSafelist({
      manifest,
      sources: [dir],
      includeGlobals: false,
    })

    const matches = (selector: string) =>
      result.greedy.some((re) => re.test(selector))

    expect(result.components).toContain('date-picker')
    expect(matches('dnb-upload')).toBe(false)
    expect(matches('dnb-slider')).toBe(false)
  })

  it('detects components used through a namespace import', () => {
    write(
      'a.tsx',
      [
        `import * as Eufemia from '@dnb/eufemia'`,
        `const App = () => <Eufemia.Button>{Eufemia.DatePicker}</Eufemia.Button>`,
      ].join('\n')
    )

    expect(detectUsedComponents({ manifest, sources: [dir] })).toEqual([
      'button',
      'date-picker',
    ])
  })

  it('detects deep imports by path, including default imports', () => {
    write('a.tsx', `import Button from '@dnb/eufemia/components/Button'`)
    write(
      'b.ts',
      `import { DatePicker } from '@dnb/eufemia/components/DatePicker'`
    )

    expect(detectUsedComponents({ manifest, sources: [dir] })).toEqual([
      'button',
      'date-picker',
    ])
  })

  it('detects deep imports from kebab-case and nested paths', () => {
    write(
      'a.tsx',
      `import DatePicker from '@dnb/eufemia/components/date-picker'`
    )
    write(
      'b.tsx',
      `import Button from '@dnb/eufemia/components/button/Button'`
    )

    expect(detectUsedComponents({ manifest, sources: [dir] })).toEqual([
      'button',
      'date-picker',
    ])
  })

  it('detects deep imports from the source (/src) path', () => {
    write(
      'a.tsx',
      `import Button from '@dnb/eufemia/src/components/Button'`
    )

    expect(detectUsedComponents({ manifest, sources: [dir] })).toEqual([
      'button',
    ])
  })

  it('falls back to named detection for sub-path barrels', () => {
    write('a.tsx', `import { Button } from '@dnb/eufemia/components/lib'`)

    expect(detectUsedComponents({ manifest, sources: [dir] })).toEqual([
      'button',
    ])
  })

  it('returns an empty list for a missing source directory', () => {
    expect(
      detectUsedComponents({
        manifest,
        sources: [path.join(dir, 'does-not-exist')],
      })
    ).toEqual([])
  })

  it('auto-detects used components when createSafelist gets no list', () => {
    write('a.tsx', `import { Autocomplete } from '@dnb/eufemia'`)

    const result = createSafelist({
      manifest,
      sources: [dir],
      includeGlobals: false,
    })

    expect(result.components).toContain('autocomplete')
    expect(result.components).toContain('input')
  })
})

describe('protectWhereSelectors', () => {
  const greedy = createSafelist({
    manifest,
    components: ['button'],
    includeGlobals: false,
  }).greedy

  it('annotates a :where(:not()) rule that matches the safelist', () => {
    const css = ':where(:not(.dnb-button--no-style)).dnb-button{color:red}'

    expect(protectWhereSelectors(css, greedy)).toBe(
      `/* purgecss ignore */${css}`
    )
  })

  it('annotates an :is(:not()) rule that matches the safelist', () => {
    const css = '.dnb-button:is(:not(.dnb-button--no-hover)){color:red}'

    expect(protectWhereSelectors(css, greedy)).toBe(
      `/* purgecss ignore */${css}`
    )
  })

  it('leaves a :where(:not()) rule alone when it does not match the safelist', () => {
    const css = ':where(:not(.dnb-anchor--no-style)).dnb-anchor{color:red}'

    expect(protectWhereSelectors(css, greedy)).toBe(css)
  })

  it('does not annotate plain :where()/:is() rules (PurgeCSS keeps them)', () => {
    const css =
      ':where(.dnb-button){color:red}:is(.dnb-button){color:blue}'

    expect(protectWhereSelectors(css, greedy)).toBe(css)
  })

  it('does not annotate rules without the nested :not() pattern', () => {
    const css = '.dnb-button:not(.dnb-button--secondary){color:red}'

    expect(protectWhereSelectors(css, greedy)).toBe(css)
  })

  it('ignores :where(:not()) inside @supports/@media at-rule preludes', () => {
    const css =
      '@supports not (selector(*:where(*))){:not(.dnb-button--no-style).dnb-button{color:red}}'

    expect(protectWhereSelectors(css, greedy)).toBe(css)
  })

  it('protects a :where(:not()) rule nested inside an at-rule block', () => {
    const css =
      '@media (min-width:1px){:where(:not(.dnb-button--no-style)).dnb-button{color:red}}'

    expect(protectWhereSelectors(css, greedy)).toBe(
      '@media (min-width:1px){/* purgecss ignore */:where(:not(.dnb-button--no-style)).dnb-button{color:red}}'
    )
  })

  it('annotates every matching rule and preserves the rest', () => {
    const css =
      '.dnb-icon{fill:red}' +
      ':where(:not(.dnb-button--no-style)).dnb-button{color:red}' +
      '.dnb-button__text{font-weight:bold}'

    expect(protectWhereSelectors(css, greedy)).toBe(
      '.dnb-icon{fill:red}' +
        '/* purgecss ignore */:where(:not(.dnb-button--no-style)).dnb-button{color:red}' +
        '.dnb-button__text{font-weight:bold}'
    )
  })

  it('is not confused by braces inside string literals', () => {
    const css =
      '.dnb-button::after{content:"}{"}' +
      ':where(:not(.dnb-button--no-style)).dnb-button{color:red}'

    expect(protectWhereSelectors(css, greedy)).toBe(
      '.dnb-button::after{content:"}{"}' +
        '/* purgecss ignore */:where(:not(.dnb-button--no-style)).dnb-button{color:red}'
    )
  })

  it('returns the input unchanged when nothing needs protecting', () => {
    const css = '.dnb-button{color:red}'

    expect(protectWhereSelectors(css, greedy)).toBe(css)
  })
})
