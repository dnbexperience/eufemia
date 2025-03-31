import { PropertiesTableProps } from '../../shared/types'

export const FormSetProperties: PropertiesTableProps = {
  element: {
    doc: 'define what HTML element should be used. Defaults to `<form>`.',
    type: 'string',
    status: 'optional',
  },
  no_form: {
    doc: 'if set to `true`, then a `div` HTML element will be used instead of `form`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  prevent_submit: {
    doc: "if set to `true`, components inside can't cause a page refresh. The event `on_submit` will still be triggered. Defaults to `false`.",
    type: 'boolean',
    status: 'optional',
  },
  locale: {
    doc: 'Send along a different locale to all nested components.',
    type: 'string',
    status: 'optional',
  },
  disabled: {
    doc: 'if set to `true`, every component inside will be disabled. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: {
    doc: 'if set to `true`, it enables skeleton for nested components. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  '[FormRow](/uilib/layout/form-row/properties)': {
    doc: 'Beside the own properties, **FormSet** can provide the [FormRow](/uilib/layout/form-row/properties) properties down to `FormRow`. This works in React-based applications by using the React Context under the hood.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
