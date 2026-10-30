import type { PropertiesTableProps } from '../../../../shared/types'

import { ListFormatProperties } from '../../../../components/list-format/ListFormatDocs'

import { UploadFieldEvents } from '../../Field/Upload/UploadDocs'

// `value` is in the general properties; the other omitted keys are not supported
const {
  value,
  children,
  inside,
  outside,
  nested,
  ref,
  ...listProperties
} = ListFormatProperties

export const UploadValueProperties: PropertiesTableProps = {
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
  ...listProperties,
}

export const UploadValueEvents: PropertiesTableProps = {
  onFileClick: UploadFieldEvents.onFileClick,
}
