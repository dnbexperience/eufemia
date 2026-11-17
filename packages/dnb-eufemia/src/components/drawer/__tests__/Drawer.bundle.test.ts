// @vitest-environment node

import path from 'node:path'
import { build } from 'vite'

it.each([
  ['direct Drawer', 'src/components/drawer/index.ts', 'default'],
  ['root Drawer', 'src/index.ts', 'Drawer'],
  [
    'responsive SidebarMenu',
    'src/extensions/sidebar-menu/index.ts',
    'ResponsiveDrawer',
  ],
  [
    'explicit reveal driver',
    'src/components/drawer/DrawerReveal.tsx',
    'createDrawerReveal',
  ],
])(
  'only includes the reveal behavior when imported: %s',
  async (_, entry, member) => {
    const packageRoot = path.resolve(__dirname, '../../../..')
    const result = await build({
      configFile: false,
      root: packageRoot,
      logLevel: 'silent',
      define: { 'process.env.NODE_ENV': JSON.stringify('production') },
      plugins: [
        {
          name: 'drawer-bundle-entry',
          resolveId(id) {
            return id === 'virtual:drawer-bundle'
              ? '\0virtual:drawer-bundle'
              : null
          },
          load(id) {
            if (id !== '\0virtual:drawer-bundle') {
              return null
            }
            return `export { ${member} as default } from ${JSON.stringify(
              path.join(packageRoot, entry)
            )}`
          },
        },
      ],
      build: {
        write: false,
        minify: true,
        rolldownOptions: {
          input: 'virtual:drawer-bundle',
          preserveEntrySignatures: 'strict',
          external: [
            'react',
            'react/jsx-runtime',
            'react-dom',
            'react-dom/client',
          ],
          output: { format: 'es' },
        },
      },
    })

    if (Array.isArray(result) || !('output' in result)) {
      throw new Error('Expected a single production bundle')
    }
    const modules = result.output.flatMap((chunk) =>
      chunk.type === 'chunk'
        ? Object.entries(chunk.modules)
            .filter(([, details]) => details.renderedLength > 0)
            .map(([id]) => id)
        : []
    )
    expect(modules.some((id) => id.endsWith('/drawer/Drawer.tsx'))).toBe(
      member !== 'createDrawerReveal'
    )
    expect(
      modules.some((id) => id.endsWith('/drawer/DrawerReveal.tsx'))
    ).toBe(member === 'createDrawerReveal')
  }
)
