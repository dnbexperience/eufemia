import {
  UploadEvents,
  UploadProperties,
} from '../../../../components/upload/UploadDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const UploadFieldProperties: PropertiesTableProps = {
  asyncFileHandler: {
    doc: 'Asynchronous handler function that takes newly added files (`newFiles: UploadValue`) as a parameter and returns a promise containing the processed files (`Promise<UploadValue>`).',
    type: 'function',
    status: 'optional',
  },
  ...UploadProperties,
  title: undefined,
  text: undefined,
}

export const UploadFieldEvents: PropertiesTableProps = {
  ...UploadEvents,
}
