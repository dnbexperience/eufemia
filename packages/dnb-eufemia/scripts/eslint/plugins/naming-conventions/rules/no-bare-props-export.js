/**
 * ESLint rule: no-bare-props-export
 *
 * Disallows `export type Props` or `export type AllProps` without a
 * component-specific prefix. Props types should be named with a prefix,
 * e.g. `export type CardProps` or `export type FieldStringAllProps`,
 * to avoid ambiguity when re-exported through barrel files.
 */

const BARE_NAMES = ['Props', 'AllProps']

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow exporting a type named "Props" or "AllProps" — use a prefixed name instead',
    },
    messages: {
      noBarePropsExport:
        'Do not export a type named "{{ name }}". Use a component-prefixed name instead (e.g. "CardProps", "FieldStringAllProps").',
    },
    schema: [],
  },
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        // Case 1: export type Props = ... or export type AllProps = ...
        if (
          node.declaration &&
          node.declaration.type === 'TSTypeAliasDeclaration' &&
          BARE_NAMES.includes(node.declaration.id.name)
        ) {
          context.report({
            node: node.declaration.id,
            messageId: 'noBarePropsExport',
            data: { name: node.declaration.id.name },
          })
        }

        // Case 2: export { Props } or export type { AllProps }
        if (node.specifiers) {
          for (const specifier of node.specifiers) {
            const exportedName =
              specifier.exported && specifier.exported.name
            if (BARE_NAMES.includes(exportedName)) {
              context.report({
                node: specifier,
                messageId: 'noBarePropsExport',
                data: { name: exportedName },
              })
            }
          }
        }
      },
    }
  },
}
