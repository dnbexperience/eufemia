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
    doc: 'All button properties. A given `onClick` runs before the wizard moves to the previous step, instead of replacing it. Return `false` from it to stay on the current step.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
