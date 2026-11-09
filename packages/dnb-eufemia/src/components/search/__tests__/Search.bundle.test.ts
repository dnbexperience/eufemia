// @vitest-environment node

import path from 'node:path'
import { build } from 'vite'

it.each([
  ['root Input', 'src/index.ts', 'Input', false],
  ['namespace Input', 'src/components/search/index.ts', 'Input', false],
  [
    'namespace Autocomplete',
    'src/components/search/index.ts',
    'Autocomplete',
    true,
  ],
  ['namespace Popover', 'src/components/search/index.ts', 'Popover', true],
])(
  'bundles only the dependencies used by Search.%s',
  async (_, entry, member, autocomplete) => {
    const packageRoot = path.resolve(__dirname, '../../../..')
    const source = path.join(packageRoot, entry)
    const result = await build({
      configFile: false,
      root: packageRoot,
      logLevel: 'silent',
      define: { 'process.env.NODE_ENV': JSON.stringify('production') },
      plugins: [
        {
          name: 'search-bundle-entry',
          resolveId(id) {
            return id === 'virtual:search-bundle'
              ? '\0virtual:search-bundle'
              : null
          },
          load(id) {
            if (id !== '\0virtual:search-bundle') {
              return null
            }
            const declaration =
              entry === 'src/index.ts'
                ? `import { Search } from ${JSON.stringify(source)}`
                : `import Search from ${JSON.stringify(source)}`
            return `${declaration}; export default Search.${member}`
          },
        },
      ],
      build: {
        write: false,
        minify: true,
        rolldownOptions: {
          input: 'virtual:search-bundle',
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
    expect(modules.some((id) => id.endsWith('/input/Input.tsx'))).toBe(
      true
    )
    expect(
      modules.some((id) => id.endsWith('/autocomplete/Autocomplete.tsx'))
    ).toBe(autocomplete)
    expect(
      modules.some((id) => id.endsWith('/drawer-list/DrawerList.tsx'))
    ).toBe(autocomplete)
    expect(
      modules.some((id) => id.endsWith('/search/SearchPopover.tsx'))
    ).toBe(member === 'Popover')
  }
)
