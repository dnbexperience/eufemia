import { PropertiesTableProps } from '../../../shared/types'
import { fieldBlockProperties } from '../FieldBlock/FieldBlockDocs'
import {
  dataValueEvents,
  dataValueProperties,
} from '../hooks/DataValueDocs'

export const fieldProperties: PropertiesTableProps = {
  ...dataValueProperties,
  ...fieldBlockProperties,
}

export const fieldEvents: PropertiesTableProps = {
  ...dataValueEvents,
}
