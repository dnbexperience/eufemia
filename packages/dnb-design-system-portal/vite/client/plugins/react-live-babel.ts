import path from 'node:path'
import type { Plugin } from 'vite'

const portalRoot = path.resolve(__dirname, '..', '..', '..')

export default function reactLiveBabelPlugin(): Plugin {
  return {
    name: 'react-live-babel',
    enforce: 'pre',

    async transform(code, id) {
      const [filepath] = id.split('?')
      if (!filepath.endsWith('Examples.tsx')) {
        return null
      }

      const babel = await import('@babel/core')
      const result = await babel.transformAsync(code, {
        filename: filepath,
        presets: [
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
        plugins: [
          [
            require.resolve('babel-plugin-react-live'),
            {
              componentName: 'ComponentBox',
              filesToMatch: ['Examples.tsx'],
              prettierPath: path.resolve(portalRoot, '.prettierrc'),
            },
          ],
        ],
        sourceMaps: true,
      })

      if (result?.code) {
        return { code: result.code, map: result.map }
      }

      return null
    },
  }
}
