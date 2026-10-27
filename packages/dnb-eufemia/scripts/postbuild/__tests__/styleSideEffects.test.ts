import { readFileSync } from 'node:fs'
import path from 'node:path'

const packageRoot = path.resolve(__dirname, '../../..')

describe.each([
  ['package.json', ['', 'es/', 'esm/', 'src/']],
  ['src/cjs/package.json', ['']],
])('%s style side effects', (manifest, prefixes: string[]) => {
  const { sideEffects } = JSON.parse(
    readFileSync(path.join(packageRoot, manifest), 'utf8')
  ) as { sideEffects: string[] }

  // Bundlers match patterns without a slash at any directory depth.
  const hasSideEffects = (file: string) =>
    sideEffects.some((pattern) =>
      path.matchesGlob(
        file,
        pattern.includes('/') ? pattern : `**/${pattern}`
      )
    )

  describe.each(prefixes)('%s', (prefix) => {
    it.each([
      'style/index.js',
      'style/isolated.js',
      'style/themes/ui/ui-theme-components.min.css',
      'components/button/style/index.js',
      'components/button/style/dnb-button.scss',
      'fragments/drawer-list/style/index.js',
      'fragments/scroll-view/style/index.js',
      'extensions/sidebar-menu/style.js',
      'extensions/sidebar-menu/style/isolated.js',
      'extensions/payment-card/style/isolated.js',
      'extensions/payment-card/style/index.js',
      'extensions/forms/FieldBlock/style.js',
      'extensions/forms/FieldBlock/style/index.js',
      'extensions/forms/Field/ArraySelection/style/index.js',
      'extensions/forms/FieldBlock/style/dnb-field-block.css',
      'extensions/forms/FieldBlock/style/dnb-field-block.min.css',
      'extensions/forms/FieldBlock/style/dnb-field-block.scss',
    ])('preserves %s', (file) => {
      expect(hasSideEffects(`${prefix}${file}`)).toBe(true)
    })

    it.each([
      'index.js',
      'components/button/index.js',
      'fragments/drawer-list/index.js',
      'extensions/index.js',
      'extensions/sidebar-menu/index.js',
      'extensions/sidebar-menu/SidebarMenu.js',
      'extensions/sidebar-menu/isolated.js',
      'extensions/sidebar-menu/style-utils.js',
      'extensions/sidebar-menu/styles/index.js',
      'extensions/forms/FieldBlock/index.js',
      'extensions/forms/Field/String/index.js',
      'shared/style.js',
      'shared/style-utils.js',
      'plugins/postcss-isolated-style-scope.js',
    ])('keeps %s tree-shakeable', (file) => {
      expect(hasSideEffects(`${prefix}${file}`)).toBe(false)
    })
  })

  it('preserves source TypeScript style entries', () => {
    for (const prefix of prefixes) {
      expect(
        hasSideEffects(`${prefix}extensions/sidebar-menu/style.ts`)
      ).toBe(true)
      expect(
        hasSideEffects(
          `${prefix}extensions/sidebar-menu/style/isolated.ts`
        )
      ).toBe(true)
    }
  })

  it('preserves UMD bundles', () => {
    expect(hasSideEffects('umd/dnb-ui-lib.js')).toBe(true)
  })
})
