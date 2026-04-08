/**
 * ESLint rule: no-inline-type-exports
 *
 * Enforces that component files (.tsx) with many exported type definitions
 * move those types into a separate `types.ts` file. This keeps component
 * files focused on rendering logic and makes types easier to find and reuse.
 *
 * The threshold is configurable (default: 5 exported types). When a .tsx
 * file exceeds the threshold, this rule reports an error suggesting the
 * types be moved to a sibling types.ts file.
 *
 * Files named `types.ts` are always allowed to export any number of types.
 */

const DEFAULT_THRESHOLD = 5

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow exporting too many type definitions from component .tsx files — move them to types.ts',
    },
    messages: {
      tooManyInlineTypes:
        'This file exports {{ count }} type definitions (threshold: {{ threshold }}). Move shared types to a sibling `types.ts` file.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          threshold: {
            type: 'integer',
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const filename = context.filename || context.getFilename()

    // Only apply to .tsx files (component files)
    if (!filename.endsWith('.tsx')) {
      return {}
    }

    // Skip test files and stories
    if (
      filename.includes('__tests__') ||
      filename.includes('.test.') ||
      filename.includes('.spec.') ||
      filename.includes('.stories.')
    ) {
      return {}
    }

    const options = context.options[0] || {}
    const threshold = options.threshold || DEFAULT_THRESHOLD

    const exportedTypes = []

    return {
      ExportNamedDeclaration(node) {
        // Case 1: export type X = ...
        if (
          node.declaration &&
          node.declaration.type === 'TSTypeAliasDeclaration'
        ) {
          exportedTypes.push(node)
        }

        // Case 2: export interface X { ... }
        if (
          node.declaration &&
          node.declaration.type === 'TSInterfaceDeclaration'
        ) {
          exportedTypes.push(node)
        }

        // Case 3: export type { X, Y } (re-exports count too)
        if (node.exportKind === 'type' && node.specifiers) {
          for (const specifier of node.specifiers) {
            exportedTypes.push(specifier)
          }
        }
      },

      'Program:exit'() {
        if (exportedTypes.length > threshold) {
          // Report on the first exported type to point the developer
          // to the start of the issue
          context.report({
            node: exportedTypes[0],
            messageId: 'tooManyInlineTypes',
            data: {
              count: String(exportedTypes.length),
              threshold: String(threshold),
            },
          })
        }
      },
    }
  },
}
