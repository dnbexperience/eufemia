import type { PropertiesTableProps } from '../../../../shared/types'

export const WizardEditButtonProperties: PropertiesTableProps = {
  toStep: {
    doc: 'Lets you navigate to a specific step.',
    type: 'number',
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties. A given `onClick` runs before the wizard moves to `toStep`, instead of replacing it. Return `false` from it to stay on the current step.',
    type: 'Various',
    status: 'optional',
  },
}
