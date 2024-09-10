import { PropertiesTableProps } from '../../../../shared/types'

export const SectionProperties: PropertiesTableProps = {
  path: {
    doc: 'A path to the section (JSON Pointer). When defined, fields inside the section will get this path as a prefix of their own path.',
    type: 'string',
    status: 'optional',
  },
  overwriteProps: {
    doc: 'Overwrite field props for the section.',
    type: 'object',
    status: 'optional',
  },
  translation: {
    doc: "Provide a translation for the section (e.g. `{'nb-NO': { MySection: { MyField: { label: 'Custom' }}}}`).",
    type: 'object',
    status: 'optional',
  },
  required: {
    doc: 'Makes all fields inside it required.',
    type: 'boolean',
    status: 'optional',
  },
  validateInitially: {
    doc: 'If set to `true`, the whole section will be validated initially. All fields will then automatically get `validateInitially` and show their error messages. Can be useful in combination with `containerMode="auto"`.',
    type: 'boolean',
    status: 'optional',
  },
  defaultData: {
    doc: 'Provide default data to the section fields and values, in case the data context (Form.Handler) is not available.',
    type: 'object',
    status: 'optional',
  },
  data: {
    doc: 'Provide data to the section fields and values, in case the data context (Form.Handler) is not available.',
    type: 'object',
    status: 'optional',
  },
  containerMode: {
    doc: 'Defines the container mode. Can be `view`, `edit` or `auto`. When set to `auto`, the mode will initially be "edit" if fields contain errors. Defaults to `auto`.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'All the fields and values inside the section.',
    type: 'React.Node',
    status: 'optional',
  },
}

export const SectionEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument.',
    type: 'function',
    status: 'optional',
  },
}
