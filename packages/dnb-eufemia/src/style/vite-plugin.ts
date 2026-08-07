import path from 'node:path'

import { PurgeCSS } from 'purgecss'

import {
  createSafelist,
  protectWhereSelectors,
  type CreateSafelistOptions,
} from './optimizer'

export type EufemiaCssOptimizerOptions = Pick<
  CreateSafelistOptions,
  'components' | 'extensions' | 'sources'
> & {
  /** Enable the optimizer. Defaults to `true`. */
  enabled?: boolean

  /** Print detected components and byte savings after the build. */
  report?: boolean
}

type ResolvedViteConfig = {
  root: string
  logger: {
    info: (message: string) => void
  }
}

export type EufemiaCssOptimizerPlugin = {
  name: string
  apply: 'build' | (() => false)
  configResolved: (config: ResolvedViteConfig) => void
  buildStart: () => void
  transform: (
    css: string,
    id: string,
    options?: unknown
  ) => Promise<{
    code: string
    map: Record<string, unknown> | null
  } | null>
  closeBundle: () => void
}

const AGGREGATE_STYLE_PATTERN =
  /(?:^|\/)(?:dnb-ui-(?:components|extensions|forms|fragments)|(?:ui|sbanken|carnegie|eiendom)-theme-(?:components|extensions|forms))(?:--isolated)?(?:\.min)?\.(?:css|scss)(?:\?|$)/
const EUFEMIA_PACKAGE_PATTERN =
  /(?:^|\/)(?:node_modules\/@dnb\/eufemia|packages\/dnb-eufemia)\/(?:build\/)?(?:src\/)?style\//

function isEufemiaAggregateStyle(id: string): boolean {
  const normalized = id.replaceAll('\\', '/')

  return (
    EUFEMIA_PACKAGE_PATTERN.test(normalized) &&
    AGGREGATE_STYLE_PATTERN.test(normalized)
  )
}

function formatKilobytes(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} kB`
}

export function eufemiaCssOptimizer(
  options: EufemiaCssOptimizerOptions = {}
): EufemiaCssOptimizerPlugin {
  let config: ResolvedViteConfig
  let components: string[] = []
  let content: string[] = []
  let greedy: RegExp[] = []
  let bytesBefore = 0
  let bytesAfter = 0
  let transformedModules = 0

  return {
    name: 'dnb-eufemia-css-optimizer',
    apply: options.enabled === false ? () => false : 'build',

    configResolved(resolvedConfig) {
      config = resolvedConfig
      const extensions = (
        options.extensions ?? ['ts', 'tsx', 'js', 'jsx', 'mdx']
      ).map((extension) => extension.replace(/^\./, ''))
      const sources = (options.sources ?? ['src']).map((source) =>
        path.resolve(config.root, source)
      )
      const safelist = createSafelist({
        components: options.components,
        extensions,
        sources,
      })

      components = safelist.components
      content = sources.map(
        (source) =>
          `${source.replaceAll('\\', '/')}/**/*.{${extensions.join(',')}}`
      )
      greedy = safelist.greedy
    },

    buildStart() {
      bytesBefore = 0
      bytesAfter = 0
      transformedModules = 0
    },

    async transform(css, id) {
      if (!isEufemiaAggregateStyle(id)) {
        return null
      }

      try {
        const guardedCss = protectWhereSelectors(css, greedy)
        const [result] = await new PurgeCSS().purge({
          content,
          css: [{ raw: guardedCss, name: id }],
          safelist: { greedy },
          sourceMap: {
            annotation: false,
            inline: false,
          },
        })

        bytesBefore += Buffer.byteLength(css)
        bytesAfter += Buffer.byteLength(result.css)
        transformedModules++

        return {
          code: result.css,
          map: result.sourceMap ? JSON.parse(result.sourceMap) : null,
        }
      } catch (error) {
        throw new Error(`Failed to optimize Eufemia CSS module "${id}".`, {
          cause: error,
        })
      }
    },

    closeBundle() {
      if (options.report === false || transformedModules === 0) {
        return
      }

      const saved = bytesBefore - bytesAfter
      const percent = bytesBefore > 0 ? (saved / bytesBefore) * 100 : 0

      config.logger.info(
        [
          '',
          'Eufemia CSS optimizer',
          `  Detected components: ${components.join(', ') || '(none)'}`,
          `  CSS: ${formatKilobytes(bytesBefore)} -> ${formatKilobytes(bytesAfter)} ` +
            `(removed ${formatKilobytes(saved)}, ${percent.toFixed(1)}%)`,
          '',
        ].join('\n')
      )
    },
  }
}
