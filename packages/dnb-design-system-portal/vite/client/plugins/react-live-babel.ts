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
 * Also injects a `sourceImports` prop with all file-level import
 * statements (rewritten to published paths). This lets StackBlitz
 * filter by code usage without needing hardcoded component name lists.
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
          node: { body: Array<{ type: string }> }
          traverse: (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            visitors: Record<string, (path: any) => void>
          ) => void
        }) {
          const counters = new Map<string, number>()

          // Build a map of local name → import statement string
          // from all file-level import declarations
          const importsByName = buildImportMap(programPath.node.body, t)

          programPath.traverse({
            JSXOpeningElement(nodePath: {
              node: {
                name: { type: string; name: string }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                attributes: any[]
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

              // Inject stableName
              const parent = nodePath.findParent(
                (p) =>
                  (p.isFunctionDeclaration() ||
                    p.isVariableDeclarator()) &&
                  p.node.id?.type === 'Identifier'
              )

              if (parent?.node.id?.name) {
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
              }

              // Inject sourceImports with all file-level imports.
              // StackBlitz filters these at runtime by code usage.
              const allNames = Array.from(importsByName.keys())
              const imports = resolveImports(allNames, importsByName)
              if (imports.length > 0) {
                node.attributes.push(
                  t.jsxAttribute(
                    t.jsxIdentifier('sourceImports'),
                    t.jsxExpressionContainer(
                      t.arrayExpression(
                        imports.map((s) => t.stringLiteral(s))
                      )
                    )
                  )
                )
              }
            },
          })
        },
      },
    },
  }
}

/**
 * Builds a map of local imported name → { source, specifiers } from
 * the file's import declarations.
 *
 * For `import { trash as trashIcon } from '@dnb/eufemia/icons'`
 * → importsByName.get('trashIcon') = { source: '@dnb/eufemia/icons', imported: 'trash', local: 'trashIcon' }
 */
function buildImportMap(
  body: Array<{ type: string }>,
  t: typeof BabelTypes
) {
  const map = new Map<
    string,
    { source: string; imported: string; local: string; isDefault: boolean }
  >()

  for (const node of body) {
    if (!t.isImportDeclaration(node as BabelTypes.Node)) {
      continue
    }

    const importNode = node as unknown as BabelTypes.ImportDeclaration
    const source = importNode.source.value

    // Skip internal portal imports (ComponentBox, etc.)
    if (
      source.includes('/shared/tags/') ||
      (source.includes('/shared/') && !source.includes('@dnb/'))
    ) {
      continue
    }

    for (const spec of importNode.specifiers) {
      if (t.isImportSpecifier(spec)) {
        const imported = t.isIdentifier(spec.imported)
          ? spec.imported.name
          : spec.imported.value
        map.set(spec.local.name, {
          source,
          imported,
          local: spec.local.name,
          isDefault: false,
        })
      } else if (t.isImportDefaultSpecifier(spec)) {
        map.set(spec.local.name, {
          source,
          imported: 'default',
          local: spec.local.name,
          isDefault: true,
        })
      }
    }
  }

  return map
}

/**
 * Resolves names to import statements, grouping specifiers by source.
 * Rewrites `@dnb/eufemia/src/...` paths to their published equivalents.
 */
function resolveImports(
  names: string[],
  importsByName: ReturnType<typeof buildImportMap>
): string[] {
  // Group by source path
  const bySource = new Map<
    string,
    Array<{ imported: string; local: string; isDefault: boolean }>
  >()

  for (const name of names) {
    const entry = importsByName.get(name)
    if (!entry) {
      continue
    }

    const source = rewriteImportPath(entry.source)
    if (!bySource.has(source)) {
      bySource.set(source, [])
    }
    bySource.get(source)!.push(entry)
  }

  // Build import statement strings
  const imports: string[] = []

  Array.from(bySource.entries()).forEach(([source, specs]) => {
    const defaultSpec = specs.find((s) => s.isDefault)
    const namedSpecs = specs.filter((s) => !s.isDefault)

    const parts: string[] = []

    if (defaultSpec) {
      parts.push(defaultSpec.local)
    }

    if (namedSpecs.length > 0) {
      const specifiers = namedSpecs.map((s) =>
        s.imported === s.local ? s.local : `${s.imported} as ${s.local}`
      )
      parts.push(`{ ${specifiers.join(', ')} }`)
    }

    const publishedSource = rewriteImportPath(source)
    imports.push(`import ${parts.join(', ')} from '${publishedSource}'`)
  })

  return imports
}

/**
 * Rewrites internal @dnb/eufemia/src/... paths to published paths.
 * e.g. '@dnb/eufemia/src/icons' → '@dnb/eufemia/icons'
 *      '@dnb/eufemia/src/components/Table' → '@dnb/eufemia/components/Table'
 */
function rewriteImportPath(source: string): string {
  if (source === '@dnb/eufemia/src') {
    return '@dnb/eufemia'
  }

  return source.replace('@dnb/eufemia/src/', '@dnb/eufemia/')
}
