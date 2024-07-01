import { PropertiesTableProps } from '../../shared/types'

export const UploadProperties: PropertiesTableProps = {
  acceptedFileTypes: {
    doc: 'List of accepted file types.',
    type: 'Array<string>',
    status: 'required',
  },
  filesAmountLimit: {
    doc: 'Defines the amount of files the user can select and upload. Defaults to 100.',
    type: 'number',
    status: 'optional',
  },
  fileMaxSize: {
    doc: '`fileMaxSize` is max size of each file in MB. Defaults to 5 MB.',
    type: 'number',
    status: 'optional',
  },
  title: {
    doc: 'Custom text property. Replaces the default title.',
    type: 'string',
    status: 'optional',
  },
  text: {
    doc: 'Custom text property. Replaces the default text.',
    type: 'string',
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
}
