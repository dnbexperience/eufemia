import { PropertiesTableProps } from '../../../../shared/types'
import {
  ProviderEvents,
  ProviderProperties,
} from '../../DataContext/Provider/ProviderDocs'

export const HandlerProperties: PropertiesTableProps = {
  ...ProviderProperties,
  disabled: {
    doc: 'Will disable all nested form fields.',
    type: 'boolean',
    state: 'optional',
  },
  autoComplete: {
    doc: 'Will set `autoComplete="on"` on all nested [Field.String](/uilib/extensions/forms/base-fields/String/)-fields.',
    type: 'boolean',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
  '[DataContext.Provider](/uilib/extensions/forms/extended-features/DataContext/Provider/properties)':
    {
      doc: 'Provider properties such as `data`.',
      type: 'Various',
      state: 'optional',
    },
  '[Form Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes)':
    {
      doc: 'All supported form element attributes.',
      type: 'string',
      state: 'optional',
    },
}

export const HandlerEvents: PropertiesTableProps = {
  ...ProviderEvents,
  '[DataContext.Provider](/uilib/extensions/forms/extended-features/DataContext/Provider/events)':
    {
      doc: 'events such as `onSubmit`.',
      type: 'function',
      state: 'optional',
    },
}
