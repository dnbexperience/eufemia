import {
  UploadEvents,
  UploadProperties,
} from '../../../../components/upload/UploadDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const UploadFieldProperties: PropertiesTableProps = {
  fileHandler: {
    doc: 'File handler function that receives only newly added valid files (files without validation errors) as a parameter (`newFiles: UploadValue`) and returns the processed files. Existing files that were already uploaded are not included. The function can either be synchronous or asynchronous. It returns a promise (`Promise<UploadValue>`) containing the processed files when asynchronous. You can modify the returned files by setting a new `id` (e.g., from server response), adding an `errorMessage` to indicate upload failure, or modifying other properties.',
    type: 'function',
    status: 'optional',
  },
  ...UploadProperties,
  title: undefined, // hiding from docs as we rather want user to use the `label` prop,
  text: undefined, // hiding from docs as we rather want user to use the `labelDescription` prop,
}

export const UploadFieldEvents: PropertiesTableProps = {
  ...UploadEvents,
}
