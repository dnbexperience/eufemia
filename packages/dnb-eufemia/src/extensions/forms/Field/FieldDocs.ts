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

  const typeString = `(${value}${add}) => void`

  return {
    ...fieldEvents,
    onChange: {
      ...fieldEvents.onChange,
      type: typeString,
    },
    onFocus: {
      ...fieldEvents.onFocus,
      type: typeString,
    },
    onBlur: {
      ...fieldEvents.onBlur,
      type: typeString,
    },
  }
}
