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
    status: 'optional',
  },
  required: {
    doc: 'Will make all nested form fields required.',
    type: 'boolean',
    status: 'optional',
  },
  autoComplete: {
    doc: 'Will set `autoComplete="on"` on all nested [Field.String](/uilib/extensions/forms/base-fields/String/)-fields.',
    type: 'boolean',
    status: 'optional',
  },
  wrapper: {
    doc: 'A wrapper component to wrap the form element. You can provide an array of components to wrap the form. Use it instead of wrapping your form with multiple providers.',
    type: ['ReactNode', 'Array<ReactNode>'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
  '[DataContext.Provider](/uilib/extensions/forms/DataContext/Provider/properties)':
    {
      doc: 'Provider properties such as `data`.',
      type: 'Various',
      status: 'optional',
    },
  '[Form Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes)':
    {
      doc: 'All supported form element attributes.',
      type: 'string',
      status: 'optional',
    },
}

export const HandlerEvents: PropertiesTableProps = {
  ...ProviderEvents,
  '[DataContext.Provider](/uilib/extensions/forms/DataContext/Provider/events)':
    {
      doc: 'events such as `onSubmit`.',
      type: 'function',
      status: 'optional',
    },
}
