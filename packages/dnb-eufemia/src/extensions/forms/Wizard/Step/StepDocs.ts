import type { PropertiesTableProps } from '../../../../shared/types'

export const StepProperties: PropertiesTableProps = {
  title: {
    doc: 'A unique title of the step.',
    type: 'React.ReactNode',
    status: 'required',
  },
  inactive: {
    doc: 'Will treat the step as non-navigable if set to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  required: {
    doc: 'Will make all nested form fields required.',
    type: 'boolean',
    status: 'optional',
  },
  include: {
    doc: 'If set to `false`, the step will not be rendered.',
    type: 'boolean',
    status: 'optional',
  },
  includeWhen: {
    doc: 'Provide a `path` or `itemPath` together with `hasValue` or `isValid` in order to enable the step. `hasValue` can be a value or a function that returns a boolean. `isValid` uses the validation state of the referenced field.',
    type: 'object',
    status: 'optional',
  },
  keepInDOM: {
    doc: 'Determines if the step should be kept in the DOM. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Flex.Container](/uilib/layout/flex/container/properties)': {
    doc: 'Flex.Container properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
