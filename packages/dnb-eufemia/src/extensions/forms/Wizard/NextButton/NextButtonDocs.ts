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
    doc: 'All button properties, except `variant`.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const WizardNextButtonEvents: PropertiesTableProps = {}
