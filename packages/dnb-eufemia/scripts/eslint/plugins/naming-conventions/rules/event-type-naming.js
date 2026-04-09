/**
 * ESLint rule: event-type-naming
 *
 * Enforces that exported event callback parameter types follow the
 * `Component{Action}Event` naming convention.
 *
 * Disallowed patterns:
 *   - `ComponentOnChangeParams`  → use `ComponentChangeEvent`
 *   - `ComponentOnClickParams`   → use `ComponentClickEvent`
 *   - `ComponentOnFocusArgs`     → use `ComponentFocusEvent`
 *
 * The rule flags exported type aliases whose names match:
 *   /On[A-Z]\w*(Params|Args)$/
 */

const FORBIDDEN_PATTERN = /^(\w+?)On([A-Z]\w*?)(Params|Args)$/

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce Component{Action}Event naming for exported event callback types',
    },
    messages: {
      useEventSuffix:
        'Exported event type "{{ name }}" should follow the Component{Action}Event convention. Rename to "{{ suggested }}".',
    },
    schema: [],
  },
  create(context) {
    function checkTypeName(node, name) {
      const match = FORBIDDEN_PATTERN.exec(name)
      if (match) {
        const [, component, action] = match
        const suggested = `${component}${action}Event`
        context.report({
          node,
          messageId: 'useEventSuffix',
          data: { name, suggested },
        })
      }
    }

    return {
      ExportNamedDeclaration(node) {
        // export type FooOnChangeParams = { ... }
        if (
          node.declaration &&
          node.declaration.type === 'TSTypeAliasDeclaration'
        ) {
          checkTypeName(node.declaration.id, node.declaration.id.name)
        }

        // export { FooOnChangeParams }
        if (node.specifiers) {
          for (const specifier of node.specifiers) {
            const exportedName =
              specifier.exported && specifier.exported.name
            if (exportedName) {
              checkTypeName(specifier, exportedName)
            }
          }
        }
      },
    }
  },
}
