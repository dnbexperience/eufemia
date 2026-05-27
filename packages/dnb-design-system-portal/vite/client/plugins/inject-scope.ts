/**
 * Babel plugin that injects a `__buildScope` prop on each <ComponentBox>,
 * containing only the Eufemia symbols that the code string references.
 *
 * Must run BEFORE babel-plugin-react-live (which replaces JSXElements with
 * raw identifier nodes). We serialize the JSX children to a code string
 * using @babel/generator, then scan for known Eufemia identifiers.
 *
 * For each ComponentBox:
 * 1. Serialize children to a code string
 * 2. Extract PascalCase identifiers matching known scope symbols
 * 3. Add file-level imports for any missing symbols
 * 4. Inject a __buildScope prop with the resolved bindings
 *
 * This allows ComponentBox to receive only the components it needs
 * instead of importing the entire Eufemia library.
 */

import type BabelTypes from '@babel/types'
import {
  allScopeNames,
  builtinScopeNames,
  getImportInfo,
} from './scope-registry'

export function injectScope(babel: { types: typeof BabelTypes }) {
  const { types: t } = babel
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const generate = require('@babel/generator').default as (
    ast: BabelTypes.Node
  ) => { code: string }

  return {
    visitor: {
      Program(programPath: {
        node: { body: BabelTypes.Statement[] }
        traverse: (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          visitors: Record<string, (path: any) => void>
        ) => void
      }) {
        const allNeeded = new Set<string>()
        const componentBoxes: Array<{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          openingElement: any
          usedNames: string[]
        }> = []

        // Find all ComponentBox elements and collect referenced identifiers
        programPath.traverse({
          JSXOpeningElement(nodePath: {
            node: {
              name: { type: string; name: string }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              attributes: any[]
            }
            parentPath: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              node: { children: any[] }
            }
          }) {
            if (
              nodePath.node.name.type !== 'JSXIdentifier' ||
              nodePath.node.name.name !== 'ComponentBox'
            ) {
              return // stop here
            }

            // Serialize children to a code string for analysis
            const children = nodePath.parentPath.node.children || []
            const codeString = children
              .map((child: BabelTypes.Node) => {
                try {
                  return generate(child).code
                } catch {
                  return ''
                }
              })
              .join('\n')

            if (!codeString.trim()) {
              return // stop here
            }

            const usedNames = extractScopeIdentifiers(codeString)
            usedNames.forEach((name) => allNeeded.add(name))
            componentBoxes.push({
              openingElement: nodePath.node,
              usedNames,
            })
          },
        })

        if (componentBoxes.length === 0) {
          return // stop here
        }

        // Build a map of names already imported at the file level
        const existingBindings = buildExistingBindings(
          programPath.node.body,
          t
        )

        // Determine which symbols need new imports
        const addedBindings = new Map<string, string>()
        const importsBySource = new Map<
          string,
          Array<{
            importedName: string
            localName: string
            isDefault: boolean
          }>
        >()

        allNeeded.forEach((name) => {
          if (existingBindings.has(name)) {
            return // stop here
          }

          const info = getImportInfo(name)
          if (!info) {
            return // stop here
          }

          const localName = `__scope_${name}`
          addedBindings.set(name, localName)

          const group = importsBySource.get(info.source) || []
          group.push({
            importedName: name,
            localName,
            isDefault: info.isDefault,
          })
          importsBySource.set(info.source, group)
        })

        // Generate import declarations (grouped by source)
        importsBySource.forEach((specs, source) => {
          const specifiers = specs.map(
            ({ importedName, localName, isDefault }) => {
              if (isDefault) {
                return t.importDefaultSpecifier(t.identifier(localName))
              }
              return t.importSpecifier(
                t.identifier(localName),
                t.identifier(importedName)
              )
            }
          )

          programPath.node.body.unshift(
            t.importDeclaration(specifiers, t.stringLiteral(source))
          )
        })

        // Inject __buildScope on each ComponentBox
        for (const { openingElement, usedNames } of componentBoxes) {
          const properties = usedNames
            .map((name) => {
              const localName =
                existingBindings.get(name) || addedBindings.get(name)
              if (!localName) {
                return null
              }

              return t.objectProperty(
                t.identifier(name),
                t.identifier(localName),
                false,
                name === localName // shorthand
              )
            })
            .filter((p): p is BabelTypes.ObjectProperty => p !== null)

          if (properties.length > 0) {
            openingElement.attributes.push(
              t.jsxAttribute(
                t.jsxIdentifier('__buildScope'),
                t.jsxExpressionContainer(t.objectExpression(properties))
              )
            )
          }
        }
      },
    },
  }
}

/**
 * Extract PascalCase identifiers from a code string that match
 * known Eufemia scope symbols (excluding builtins like React hooks).
 */
export function extractScopeIdentifiers(code: string): string[] {
  // Strip comments and string literals in a single pass so that
  // sequences like // inside a string (e.g. "https://...") are consumed
  // by the string pattern first and never treated as line comments.
  // The single-quote pattern requires a non-word char before the opening
  // quote so that apostrophes in JSX text (e.g. "I'm") are not treated
  // as string delimiters.
  const cleaned = code.replace(
    /(?<!\w)'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\/\*[\s\S]*?\*\/|\/\/.*$/gm,
    (match) => {
      if (match[0] === "'" || match[0] === '"') return '""'
      return '' // comment
    }
  )

  const matches = cleaned.match(/\b([A-Z][a-zA-Z0-9]*)\b/g) || []

  return Array.from(new Set(matches)).filter(
    (name) => allScopeNames.has(name) && !builtinScopeNames.has(name)
  )
}

/**
 * Build a map of local binding name → local binding name
 * from all file-level import declarations.
 */
function buildExistingBindings(
  body: BabelTypes.Statement[],
  t: typeof BabelTypes
): Map<string, string> {
  const map = new Map<string, string>()

  for (const node of body) {
    if (!t.isImportDeclaration(node)) {
      continue
    }

    for (const spec of node.specifiers) {
      // Map by local name — this is what code strings reference
      map.set(spec.local.name, spec.local.name)
    }
  }

  return map
}
