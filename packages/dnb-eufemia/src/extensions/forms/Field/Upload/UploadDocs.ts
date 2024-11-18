import {
  UploadEvents,
  UploadProperties,
} from '../../../../components/upload/UploadDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const UploadFieldProperties: PropertiesTableProps = {
  ...UploadProperties,
  title: undefined,
  text: undefined,
  asyncFileHandler: {
    doc: 'Handler function that is triggered when new files are added to the upload field. Takes said new files as a parameter and returns a promise containing the processed files.',
    type: 'function',
    status: 'optional',
  },
}

export const UploadFieldEvents: PropertiesTableProps = {
  ...UploadEvents,
}
