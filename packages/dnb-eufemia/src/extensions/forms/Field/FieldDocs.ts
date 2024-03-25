import { PropertiesTableProps } from '../../../shared/types'
import { FieldBlockProperties } from '../FieldBlock/FieldBlockDocs'
import {
  DataValueEvents,
  DataValueProperties,
} from '../hooks/DataValueDocs'

export const FieldProperties: PropertiesTableProps = {
  ...DataValueProperties,
  ...FieldBlockProperties,
}

export const FieldEvents: PropertiesTableProps = {
  ...DataValueEvents,
}
