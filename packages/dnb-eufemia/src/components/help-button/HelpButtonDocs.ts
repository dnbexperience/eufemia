import { PropertiesTableProps } from '../../shared/types'

export const HelpButtonProperties: PropertiesTableProps = {
  children: {
    doc: 'The content to show.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  title: {
    doc: 'The content title. Defaults to `Hjelpetekst` (HelpButton.title).',
    type: 'string',
    status: 'optional',
  },
  icon: {
    doc: 'To be included in the button. [Primary Icons](/icons/primary) can be set as a string (e.g. `icon="information"`), other icons should be set as React elements.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  render: {
    doc: 'Accepts a function that returns a valid React Element. See example below.',
    type: 'function',
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

export const HelpButtonEvents: PropertiesTableProps = {
  '[Button](/uilib/components/button/events)': {
    doc: 'Accepts all Button events.',
    type: 'Various',
    status: 'optional',
  },
}
