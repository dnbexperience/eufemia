import type { PropertiesTableProps } from '../../../../shared/types'

export const WizardPreviousButtonProperties: PropertiesTableProps = {
  variant: {
    doc: 'Defines the kind of button. Defaults to `tertiary`.',
    type: ['"primary"', '"secondary"', '"tertiary"', '"unstyled"'],
    status: 'optional',
  },
  icon: {
    doc: 'The icon shown in the button. Defaults to `chevron_left`.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  iconPosition: {
    doc: 'Position of the icon inside the button. Defaults to `left`.',
    type: ['"left"', '"right"', '"top"'],
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
