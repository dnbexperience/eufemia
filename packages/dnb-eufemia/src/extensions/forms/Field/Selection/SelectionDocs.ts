import { PropertiesTableProps } from '../../../../shared/types'

export const SelectionProperties: PropertiesTableProps = {
  variant: {
    doc: 'Choice of UI feature. Can be: `dropdown`, `autocomplete`, `radio` or `button`.',
    type: 'string',
    status: 'optional',
  },
  optionsLayout: {
    doc: 'Layout for the list of options. Can be `horizontal` or `vertical`.',
    type: 'string',
    status: 'optional',
  },
  width: {
    doc: '`small`, `medium` or `large` for predefined standard widths, `stretch` for fill available width.',
    type: ['string', 'false'],
    status: 'optional',
  },
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    status: 'optional',
  },
  autocompleteProps: {
    doc: 'Forward any additional props (camelCase) to the [Autocomplete](/uilib/components/autocomplete/) component.',
    type: 'object',
    status: 'optional',
  },
  dropdownProps: {
    doc: 'Forward any additional props (camelCase) to the [Dropdown](/uilib/components/dropdown/) component.',
    type: 'object',
    status: 'optional',
  },
  children: {
    doc: 'For providing Option components.',
    type: 'React.Node',
    status: 'optional',
  },
}
