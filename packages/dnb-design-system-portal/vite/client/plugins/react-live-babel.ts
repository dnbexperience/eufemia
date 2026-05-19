import path from 'node:path'
import type { Plugin } from 'vite'
import type BabelTypes from '@babel/types'

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
          injectStableName,
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

/**
 * Babel plugin that injects a `stableName` prop on each <ComponentBox>,
 * derived from the enclosing export function name.
 * This gives each box a stable identity that survives HMR remounts.
 *
 * Must run before babel-plugin-react-live, which replaces JSX elements
 * with serialized code strings inside a Program visitor.
 * We use Program.enter + manual traverse so our visitor fires first.
 */
export function injectStableName(babel: { types: typeof BabelTypes }) {
  const { types: t } = babel

  return {
    visitor: {
      Program: {
        enter(programPath: {
          traverse: (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            visitors: Record<string, (path: any) => void>
          ) => void
        }) {
          const counters = new Map<string, number>()

          programPath.traverse({
            JSXOpeningElement(nodePath: {
              node: {
                name: { type: string; name: string }
                attributes: unknown[]
              }
              findParent: (
                cb: (p: {
                  node: { id?: { type: string; name: string } }
                  isFunctionDeclaration: () => boolean
                  isVariableDeclarator: () => boolean
                }) => boolean
              ) => { node: { id?: { name: string } } } | null
            }) {
              const { node } = nodePath
              if (
                node.name.type !== 'JSXIdentifier' ||
                node.name.name !== 'ComponentBox'
              ) {
                return // stop here
              }

              const parent = nodePath.findParent(
                (p) =>
                  (p.isFunctionDeclaration() ||
                    p.isVariableDeclarator()) &&
                  p.node.id?.type === 'Identifier'
              )

              if (!parent?.node.id?.name) {
                return // stop here
              }

              const funcName = parent.node.id.name
              const count = (counters.get(funcName) || 0) + 1
              counters.set(funcName, count)
              const stableName =
                count === 1 ? funcName : `${funcName}_${count}`

              node.attributes.push(
                t.jsxAttribute(
                  t.jsxIdentifier('stableName'),
                  t.stringLiteral(stableName)
                )
              )
            },
          })
        },
      },
    },
  }
}
