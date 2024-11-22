import {
  UploadEvents,
  UploadProperties,
} from '../../../../components/upload/UploadDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const UploadFieldProperties: PropertiesTableProps = {
  fileHandler: {
    doc: 'File handler function that takes newly added files (`newFiles: UploadValue`) as a parameter and returns the processed files. The function can either be synchronous or asynchronous. It returns a promise (`Promise<UploadValue>`) containing the processed files when asynchronous.',
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
