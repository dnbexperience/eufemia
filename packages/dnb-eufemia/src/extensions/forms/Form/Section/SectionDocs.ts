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
    doc: 'Defines the container mode. Can be `view` or `edit`. Defaults to `view`.',
    type: 'string',
    status: 'optional',
  },
  validateFieldsInitially: {
    doc: 'When set to `true`, the mode will initially be "edit" if fields contain errors. Fields will automatically get `validateInitially` and show their error messages. Defaults to `false`.',
    type: 'boolean',
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
