import { PropertiesTableProps } from '../../shared/types'

export const UploadProperties: PropertiesTableProps = {
  acceptedFileTypes: {
    doc: 'List of accepted file types. Either as string or [AcceptedFileType](/uilib/components/upload/properties/#acceptedfiletype). When providing a list of [AcceptedFileType](/uilib/components/upload/properties/#acceptedfiletype), the accepted file types will be presented in a table(see [example](/uilib/components/upload/demos/#upload-with-file-max-size-based-on-file-type)).',
    type: ['Array<string>', 'Array<AcceptedFileType>'],
    status: 'required',
  },
  filesAmountLimit: {
    doc: 'Defines the amount of files the user can select and upload. Defaults to 100.',
    type: 'number',
    status: 'optional',
  },
  fileMaxSize: {
    doc: 'Defines the max file size of each file in MB. Use either `0` or `false` to disable. Defaults to 5 MB.',
    type: ['number', 'false'],
    status: 'optional',
  },
  title: {
    doc: 'Custom text property. Replaces the default title. Can be disabled using `false`.',
    type: 'string',
    status: 'optional',
  },
  text: {
    doc: 'Custom text property. Replaces the default text. Can be disabled using `false`.',
    type: 'string',
    status: 'optional',
  },
  download: {
    doc: 'Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: {
    doc: 'Skeleton should be applied when loading content.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const AcceptedFileTypeProperties: PropertiesTableProps = {
  fileType: {
    doc: 'The name of the accepted file type.',
    type: 'string',
    status: 'required',
  },
  fileMaxSize: {
    doc: 'Defines the max file size of the given file type in MB. Use either `0` or `false` to disable. If not provided, it defaults to the value of [Uploads](/uilib/components/upload/properties/#properties) `fileMaxSize` which defaults to 5 MB.',
    type: ['number', 'false'],
    status: 'optional',
  },
}

export const UploadEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called on `files` changes made by the user. Access the files with `{ files }` (containing each a `fileItem`).',
    type: 'function',
    status: 'optional',
  },
  onFileDelete: {
    doc: 'Will be called once a file gets deleted by the user. Access the deleted file with `{ fileItem }`.',
    type: 'function',
    status: 'optional',
  },
  onFileClick: {
    doc: 'Will be called once a file gets clicked on by the user. Access the clicked file with `{ fileItem }`.',
    type: 'function',
    status: 'optional',
  },
}
