const DESIGN_TOKENS_GUIDE_URL =
  'https://eufemia.dnb.no/uilib/usage/customisation/theming/design-tokens/guide/'

const reviewRules = {
  'eufemia/no-deprecated-color-variables': {
    category: 'deprecation',
    description:
      'Warn when deprecated --color-* CSS variables are used instead of design tokens.',
    documentation: DESIGN_TOKENS_GUIDE_URL,
    fixable: false,
    level: 'warning',
    tools: ['eslint', 'stylelint'],
  },
}

module.exports = reviewRules
