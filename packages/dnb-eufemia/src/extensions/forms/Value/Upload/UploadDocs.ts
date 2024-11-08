import { PropertiesTableProps } from '../../../../shared/types'

import { ListFormatProperties } from '../../../../components/list-format/ListFormatDocs'

export const UploadProperties: PropertiesTableProps = {
  download: {
    doc: 'Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  displaySize: {
    doc: 'Can be used to display the file size of the file. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  ...ListFormatProperties,
}
