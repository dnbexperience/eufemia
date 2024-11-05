import { PropertiesTableProps } from '../../../shared/types'
import { FieldBlockSharedProperties } from '../FieldBlock/FieldBlockDocs'
import {
  DataValueWritePropsEvents,
  DataValueWritePropsProperties,
} from '../hooks/DataValueWritePropsDocs'

export const FieldProperties: PropertiesTableProps = {
  ...DataValueWritePropsProperties,
  ...FieldBlockSharedProperties,
}

export const FieldEvents: PropertiesTableProps = {
  ...DataValueWritePropsEvents,
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
    ...FieldEvents,
    onChange: {
      ...FieldEvents.onChange,
      type: typeString,
    },
    onFocus: {
      ...FieldEvents.onFocus,
      type: typeString,
    },
    onBlur: {
      ...FieldEvents.onBlur,
      type: typeString,
    },
  }
}
