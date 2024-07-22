import {
  UploadEvents,
  UploadProperties,
} from '../../../../components/upload/UploadDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const UploadFieldProperties: PropertiesTableProps = {
  ...UploadProperties,
  title: undefined,
  text: undefined,
}

export const UploadFieldEvents: PropertiesTableProps = {
  ...UploadEvents,
}
