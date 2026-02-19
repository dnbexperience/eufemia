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
  onValidationError: {
    doc: "Validation error handler function that receives newly added files with an `errorMessage` property. This is typically triggered by built-in validation failures (file size or file type), but will be called for any new file that has an `errorMessage` set. Use this to customize how invalid files are displayed, such as removing the download link, removing the delete button, or adding custom descriptions. The function is synchronous and should return the modified files. Executes before `onChange` and `fileHandler`, allowing you to process validation errors before they reach other handlers. **Note:** Only processes new files - if `fileHandler` returns a file with `errorMessage`, that file is already in the list and won't trigger `onValidationError` again.",
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
