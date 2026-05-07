const COLOR_VARIABLE_REGEX = /--color-[a-z0-9-]+/g
const DESIGN_TOKENS_GUIDE_URL =
  'https://eufemia.dnb.no/uilib/usage/customisation/theming/design-tokens/guide/'

const reportMatches = (context, node, text) => {
  if (typeof text !== 'string') {
    return
  }

  const matches = text.match(COLOR_VARIABLE_REGEX)

  if (!matches?.length) {
    return
  }

  for (const variable of new Set(matches)) {
    context.report({
      node,
      messageId: 'deprecatedColorVariable',
      data: {
        variable,
      },
    })
  }
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Warn when deprecated --color-* CSS variables are used in JavaScript and TypeScript code',
    },
    messages: {
      deprecatedColorVariable: `Deprecated CSS color variable "{{ variable }}" detected. Use a design token instead; the correct replacement depends on context. See ${DESIGN_TOKENS_GUIDE_URL} for more information.`,
    },
    schema: [],
  },

  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          reportMatches(context, node, node.value)
        }
      },

      TemplateElement(node) {
        reportMatches(context, node, node.value.raw)
      },

      JSXText(node) {
        reportMatches(context, node, node.value)
      },
    }
  },
}
