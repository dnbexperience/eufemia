import { PropertiesTableProps } from '../../../shared/types'
import { fieldBlockSharedProperties } from '../FieldBlock/FieldBlockDocs'
import {
  dataValueEvents,
  dataValueProperties,
} from '../hooks/DataValueDocs'

export const fieldProperties: PropertiesTableProps = {
  ...dataValueProperties,
  ...fieldBlockSharedProperties,
}

export const fieldEvents: PropertiesTableProps = {
  ...dataValueEvents,
}

export const getFieldEventsWithTypes = (
  valueType: { type: string; optional?: boolean } = undefined,
  additionalArgsType: { type: string; optional?: boolean } = undefined
): PropertiesTableProps => {
  const value = valueType
    ? `value${valueType.optional ? '?' : ''}: ${valueType.type}`
    : 'value'

  const add = additionalArgsType
    ? `, additionalArgs${additionalArgsType.optional ? '?' : ''}: ${
        additionalArgsType.type
      }`
    : ''

  return {
    ...fieldEvents,
    onChange: {
      ...fieldEvents.onChange,
      type: `(${value}${add}) => void`,
    },
    onFocus: {
      ...fieldEvents.onFocus,
      type: `(${value}) => void`,
    },
    onBlur: {
      ...fieldEvents.onBlur,
      type: `(${value}) => void`,
    },
  }
}
