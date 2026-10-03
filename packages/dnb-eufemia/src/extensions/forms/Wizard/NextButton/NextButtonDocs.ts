import type { PropertiesTableProps } from '../../../../shared/types'

export const WizardNextButtonProperties: PropertiesTableProps = {
  icon: {
    doc: 'The icon shown in the button. Defaults to `chevron_right`.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  iconPosition: {
    doc: 'Position of the icon inside the button. Defaults to `right`.',
    type: ['"left"', '"right"', '"top"'],
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties, except `variant`. A given `onClick` runs before the wizard moves to the next step, instead of replacing it. Return `false` from it to stay on the current step.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
