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
