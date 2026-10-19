// Findings that are expected on the Portal. They are listed in the report,
// but don't count as open findings. `pages` are path prefixes, and `target`
// matches a part of the axe selector.
export const acceptedFindings = [
  {
    rule: 'heading-order',
    pages: ['/uilib/components/heading/', '/uilib/elements/heading/'],
    reason: 'The Heading examples show every heading level on purpose.',
  },
  {
    rule: 'landmark-unique',
    pages: [
      '/uilib/components/breadcrumb/',
      '/uilib/components/filter/',
      '/uilib/components/step-indicator/',
      '/uilib/extensions/forms/Wizard/',
    ],
    reason:
      'The example pages show several instances of the same component with its default label. An app shows one per page.',
  },
  {
    rule: 'link-in-text-block',
    pages: ['/uilib/typography/'],
    target: '.dnb-anchor--',
    reason:
      'The Typography examples show the hover, focus and active link states on purpose.',
  },
  {
    rule: 'link-in-text-block',
    pages: ['/uilib/components/anchor/'],
    target: '.dnb-anchor--no-underline',
    reason:
      'The Anchor examples show the no-underline variant on purpose.',
  },
  {
    rule: 'link-name',
    pages: ['/uilib/components/number-format/'],
    target: 'a[href="sms:',
    reason:
      'False positive: browsers name the link from the formatted number, which is rendered with CSS.',
  },
  {
    rule: 'region',
    target: '#eufemia-portal-root',
    reason:
      'Open tooltips and popovers render in the portal root at the end of the page, outside the page landmarks.',
  },
]
