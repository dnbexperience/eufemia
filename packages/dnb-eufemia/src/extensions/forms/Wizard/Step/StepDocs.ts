import { PropertiesTableProps } from '../../../../shared/types'

export const StepProperties: PropertiesTableProps = {
  title: {
    doc: 'Title of the step.',
    type: 'React.Node',
    status: 'optional',
  },
  required: {
    doc: 'Will make all nested form fields required.',
    type: 'boolean',
    status: 'optional',
  },
  active: {
    doc: 'If set to `false`, the step will not be rendered.',
    type: 'boolean',
    status: 'optional',
  },
  activeWhen: {
    doc: 'Provide a `path` and a `hasValue` property with the excepted value in order to enable the step. You can alternatively provide a `hasValue` function that returns a boolean. The first parameter is the value of the path.',
    type: 'object',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    status: 'required',
  },
  '[Flex.Container](/uilib/layout/flex/container)': {
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

export const StepEvents: PropertiesTableProps = {}
