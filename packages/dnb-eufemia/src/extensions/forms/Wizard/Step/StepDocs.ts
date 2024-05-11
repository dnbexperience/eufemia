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
