/**
 * ESLint rule: consistent-event-type-naming
 *
 * Enforces that exported event callback parameter types follow the
 * [Component][Action]Event naming convention, e.g. ButtonClickEvent,
 * CheckboxChangeEvent.
 *
 * Disallowed patterns:
 *   - *OnChangeParams, *OnClickParams, etc. (use *ChangeEvent, *ClickEvent)
 *   - *OnChange, *OnClick, etc. when used as a type for event parameters
 *     rather than a callback signature
 */

const ON_PARAMS_PATTERN = /^(\w+)On(\w+)Params$/

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce [Component][Action]Event naming for event callback parameter types',
    },
    messages: {
      useEventSuffix:
        'Event parameter type "{{ name }}" should follow the [Component][Action]Event pattern. Rename to "{{ suggested }}".',
    },
    schema: [],
  },
  create(context) {
    function checkTypeExport(node, name) {
      const match = name.match(ON_PARAMS_PATTERN)
      if (match) {
        const component = match[1]
        const action = match[2]
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
        // export type AutocompleteOnChangeParams = { ... }
        if (
          node.declaration &&
          node.declaration.type === 'TSTypeAliasDeclaration'
        ) {
          checkTypeExport(node.declaration.id, node.declaration.id.name)
        }

        // export { AutocompleteOnChangeParams }
        if (node.specifiers) {
          for (const specifier of node.specifiers) {
            const exportedName =
              specifier.exported && specifier.exported.name
            if (exportedName) {
              checkTypeExport(specifier, exportedName)
            }
          }
        }
      },
    }
  },
}
