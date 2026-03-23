/**
 * ESLint rule: no-bare-props-export
 *
 * Disallows `export type Props` without a component-specific prefix.
 * Props types should be named with a prefix, e.g. `export type CardProps`
 * or `export type FieldStringProps`, to avoid ambiguity when re-exported
 * through barrel files.
 */

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow exporting a type named "Props" — use a prefixed name instead',
    },
    messages: {
      noBarePropsExport:
        'Do not export a type named "Props". Use a component-prefixed name instead (e.g. "CardProps", "FieldStringProps").',
    },
    schema: [],
  },
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        // Case 1: export type Props = ... or export type Props<T> = ...
        if (
          node.declaration &&
          node.declaration.type === 'TSTypeAliasDeclaration' &&
          node.declaration.id.name === 'Props'
        ) {
          context.report({
            node: node.declaration.id,
            messageId: 'noBarePropsExport',
          })
        }

        // Case 2: export { Props } or export type { Props }
        if (node.specifiers) {
          for (const specifier of node.specifiers) {
            const exportedName =
              specifier.exported && specifier.exported.name
            if (exportedName === 'Props') {
              context.report({
                node: specifier,
                messageId: 'noBarePropsExport',
              })
            }
          }
        }
      },
    }
  },
}
