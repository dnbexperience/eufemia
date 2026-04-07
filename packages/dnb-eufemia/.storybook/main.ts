import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import type { Options } from '@swc/core'
import type { StorybookConfig } from '@storybook/react-webpack5'

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [getAbsolutePath('@storybook/addon-webpack5-compiler-swc')],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {
      builder: {
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { sourceMap: false },
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: false },
        },
      ],
    })

    // Disable source maps — the compiled SCSS output is too large
    // for SourceMapDevToolPlugin (exceeds V8 max string length)
    config.devtool = false

    return config
  },
  swc: (config: Options): Options => {
    if (config.jsc) {
      config.jsc.transform = {
        react: {
          runtime: 'automatic',
        },
      }
    }
    return config
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
    enableCrashReports: false,
  },
}
export default config

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
