import { PropertiesTableProps } from '../../../../shared/types'
import { ValueProperties } from '../ValueDocs'

export const ValueProviderProperties: PropertiesTableProps = {
  ...ValueProperties,
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    status: 'required',
  },
}

export const StepEvents: PropertiesTableProps = {}
