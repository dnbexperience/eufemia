import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

// @ts-expect-error Vite requires a newer module-resolution mode than the
// package's legacy typecheck; Vitest still resolves it through Vite itself.
import { build } from 'vite'

import { eufemiaCssOptimizer } from '../vite-plugin'

type HookName =
  | 'buildStart'
  | 'closeBundle'
  | 'configResolved'
  | 'transform'

function getHook(
  plugin: ReturnType<typeof eufemiaCssOptimizer>,
  name: 'buildStart'
): ReturnType<typeof eufemiaCssOptimizer>['buildStart']
function getHook(
  plugin: ReturnType<typeof eufemiaCssOptimizer>,
  name: 'closeBundle'
): ReturnType<typeof eufemiaCssOptimizer>['closeBundle']
function getHook(
  plugin: ReturnType<typeof eufemiaCssOptimizer>,
  name: 'configResolved'
): ReturnType<typeof eufemiaCssOptimizer>['configResolved']
function getHook(
  plugin: ReturnType<typeof eufemiaCssOptimizer>,
  name: 'transform'
): ReturnType<typeof eufemiaCssOptimizer>['transform']
function getHook(
  plugin: ReturnType<typeof eufemiaCssOptimizer>,
  name: HookName
) {
  return plugin[name]
}

function createConfig(root: string, info = vi.fn()) {
  return {
    root,
    logger: { info },
  }
}

describe('eufemiaCssOptimizer', () => {
  let root: string

  beforeEach(() => {
    root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'eufemia-vite-plugin-'))
    )
    fs.mkdirSync(path.join(root, 'src'))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it('only applies to production builds when enabled', () => {
    const enabled = eufemiaCssOptimizer()
    const disabled = eufemiaCssOptimizer({ enabled: false })

    expect(enabled.apply).toBe('build')
    expect(
      typeof disabled.apply === 'function'
        ? disabled.apply()
        : disabled.apply
    ).toBe(false)
  })

  it('uses configured source roots to detect components once', async () => {
    fs.mkdirSync(path.join(root, 'app'))
    fs.writeFileSync(
      path.join(root, 'app/index.tsx'),
      `import { Button } from '@dnb/eufemia'`
    )

    const plugin = eufemiaCssOptimizer({ sources: ['app'] })
    await getHook(plugin, 'configResolved')?.call(
      {} as never,
      createConfig(root) as never
    )

    const result = await getHook(plugin, 'transform')?.call(
      {} as never,
      '.dnb-button{color:red}.dnb-upload{color:blue}',
      path.join(
        root,
        'node_modules/@dnb/eufemia/style/themes/ui/ui-theme-components.css'
      ),
      {} as never
    )

    expect(result).toBeTruthy()
    expect(result.code).toContain('.dnb-button')
    expect(result.code).not.toContain('.dnb-upload')
    expect(result.map).toEqual(
      expect.objectContaining({
        version: 3,
        sources: expect.any(Array),
        sourcesContent: expect.any(Array),
      })
    )
  })

  it('lets explicit components override source detection', async () => {
    fs.writeFileSync(
      path.join(root, 'src/index.tsx'),
      `import { Button } from '@dnb/eufemia'`
    )

    const plugin = eufemiaCssOptimizer({ components: ['made-up'] })
    await getHook(plugin, 'configResolved')?.call(
      {} as never,
      createConfig(root) as never
    )

    const result = await getHook(plugin, 'transform')?.call(
      {} as never,
      '.dnb-button{color:red}.dnb-made-up{color:blue}',
      path.join(
        root,
        'node_modules/@dnb/eufemia/style/themes/ui/ui-theme-components.css'
      ),
      {} as never
    )

    expect(result.code).not.toContain('.dnb-button')
    expect(result.code).toContain('.dnb-made-up')
  })

  it('keeps literal selectors found in configured sources', async () => {
    fs.writeFileSync(
      path.join(root, 'src/index.tsx'),
      `<div className="custom-eufemia-selector" />`
    )

    const plugin = eufemiaCssOptimizer({ components: [] })
    await getHook(plugin, 'configResolved').call(
      {} as never,
      createConfig(root) as never
    )

    const result = await getHook(plugin, 'transform').call(
      {} as never,
      '.custom-eufemia-selector{color:red}.unused-selector{color:blue}',
      path.join(
        root,
        'node_modules/@dnb/eufemia/style/themes/ui/ui-theme-components.css'
      ),
      {} as never
    )

    expect(result.code).toContain('.custom-eufemia-selector')
    expect(result.code).not.toContain('.unused-selector')
  })

  it('only transforms Eufemia aggregate component style modules', async () => {
    fs.writeFileSync(
      path.join(root, 'src/index.tsx'),
      `import { Button } from '@dnb/eufemia'`
    )

    const plugin = eufemiaCssOptimizer()
    await getHook(plugin, 'configResolved')?.call(
      {} as never,
      createConfig(root) as never
    )
    const transform = getHook(plugin, 'transform')
    const css = '.dnb-button{color:red}.dnb-upload{color:blue}'

    const applicationCss = await transform?.call(
      {} as never,
      css,
      path.join(root, 'src/app.css'),
      {} as never
    )
    const coreCss = await transform?.call(
      {} as never,
      css,
      path.join(root, 'node_modules/@dnb/eufemia/style/dnb-ui-core.css'),
      {} as never
    )
    const basisCss = await transform?.call(
      {} as never,
      css,
      path.join(
        root,
        'node_modules/@dnb/eufemia/style/themes/ui/ui-theme-basis.css'
      ),
      {} as never
    )
    const aggregateCss = await transform?.call(
      {} as never,
      css,
      path.join(
        root,
        'node_modules/@dnb/eufemia/style/themes/ui/ui-theme-components.css'
      ),
      {} as never
    )

    expect(applicationCss).toBeNull()
    expect(coreCss).toBeNull()
    expect(basisCss).toBeNull()
    expect(aggregateCss).toBeTruthy()
  })

  it('reports detected components and aggregate byte savings', async () => {
    fs.writeFileSync(
      path.join(root, 'src/index.tsx'),
      `import { Button } from '@dnb/eufemia'`
    )

    const info = vi.fn()
    const plugin = eufemiaCssOptimizer()
    await getHook(plugin, 'configResolved')?.call(
      {} as never,
      createConfig(root, info) as never
    )
    await getHook(plugin, 'transform')?.call(
      {} as never,
      '.dnb-button{color:red}.dnb-upload{color:blue}',
      path.join(
        root,
        'packages/dnb-eufemia/src/style/dnb-ui-components.scss'
      ),
      {} as never
    )
    await getHook(plugin, 'closeBundle')?.call({} as never)

    expect(info).toHaveBeenCalledTimes(1)
    expect(info.mock.calls[0][0]).toContain('Eufemia CSS optimizer')
    expect(info.mock.calls[0][0]).toContain('button')
    expect(info.mock.calls[0][0]).toMatch(/CSS: .* -> .*/)
  })

  it('surfaces PurgeCSS failures with the module id', async () => {
    fs.writeFileSync(
      path.join(root, 'src/index.tsx'),
      `import { Button } from '@dnb/eufemia'`
    )

    const plugin = eufemiaCssOptimizer({ components: ['button'] })
    await getHook(plugin, 'configResolved')?.call(
      {} as never,
      createConfig(root) as never
    )
    const id = path.join(
      root,
      'node_modules/@dnb/eufemia/style/dnb-ui-components.css'
    )

    await expect(
      getHook(plugin, 'transform')?.call(
        {} as never,
        '.dnb-button{',
        id,
        {} as never
      )
    ).rejects.toThrow(id)
  })
})

describe('eufemiaCssOptimizer Vite build', () => {
  const sourcePackageSegment = 'src'
  let root: string

  beforeEach(() => {
    root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'eufemia-vite-build-'))
    )
    fs.mkdirSync(path.join(root, 'src'), { recursive: true })
    fs.mkdirSync(
      path.join(root, 'packages/dnb-eufemia/src/style/themes/ui'),
      { recursive: true }
    )
    fs.writeFileSync(
      path.join(root, 'index.html'),
      '<div id="root" class="app-only"></div><script type="module" src="/src/main.ts"></script>'
    )
    fs.writeFileSync(
      path.join(root, 'src/eufemia.ts'),
      'export const Button = {}'
    )
    fs.writeFileSync(
      path.join(root, 'src/main.ts'),
      [
        `import { Button } from '@dnb/eufemia'`,
        `import './app.css'`,
        `import '../packages/dnb-eufemia/${sourcePackageSegment}/style/themes/ui/ui-theme-components.css'`,
        `console.log(Button)`,
      ].join('\n')
    )
    fs.writeFileSync(
      path.join(root, 'src/app.css'),
      '.app-only{color:green}'
    )
    fs.writeFileSync(
      path.join(
        root,
        'packages/dnb-eufemia/src/style/themes/ui/ui-theme-components.css'
      ),
      '.dnb-button{color:red}.dnb-upload{color:blue}'
    )
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it('purges before emission so application CSS survives and the content hash changes', async () => {
    const buildApp = async (outDir: string, optimized: boolean) => {
      await build({
        root,
        configFile: false,
        logLevel: 'silent',
        resolve: {
          alias: {
            '@dnb/eufemia': path.join(root, 'src/eufemia.ts'),
          },
        },
        plugins: optimized ? [eufemiaCssOptimizer({ report: false })] : [],
        build: {
          outDir,
          emptyOutDir: true,
        },
      })

      const assets = path.join(root, outDir, 'assets')
      const file = fs
        .readdirSync(assets)
        .find((name) => name.endsWith('.css'))

      if (!file) {
        throw new Error('Expected Vite to emit a CSS asset')
      }

      return {
        file,
        css: fs.readFileSync(path.join(assets, file), 'utf-8'),
      }
    }

    const original = await buildApp('dist-original', false)
    const optimized = await buildApp('dist-optimized', true)

    expect(optimized.css).toContain('.app-only')
    expect(optimized.css).toContain('.dnb-button')
    expect(optimized.css).not.toContain('.dnb-upload')
    expect(optimized.file).not.toBe(original.file)
  }, 30_000)
})
