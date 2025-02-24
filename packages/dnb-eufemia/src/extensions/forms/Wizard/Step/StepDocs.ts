import { PropertiesTableProps } from '../../../../shared/types'

export const StepProperties: PropertiesTableProps = {
  title: {
    doc: 'Title of the step.',
    type: 'React.Node',
    status: 'optional',
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
    doc: 'Provide a `path` and a `hasValue` property with the expected value in order to enable the step. You can alternatively provide a `hasValue` function that returns a boolean. The first parameter is the value of the path.',
    type: 'object',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
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
  active: {
    doc: 'Deprecated, use `include`. Old docs: If set to `false`, the step will not be rendered.',
    type: 'boolean',
    status: 'deprecated',
  },
  activeWhen: {
    doc: 'Deprecated, use `includeWhen`. Old docs: Provide a `path` and a `hasValue` property with the excepted value in order to enable the step. You can alternatively provide a `hasValue` function that returns a boolean. The first parameter is the value of the path.',
    type: 'object',
    status: 'deprecated',
  },
}

export const StepEvents: PropertiesTableProps = {}
