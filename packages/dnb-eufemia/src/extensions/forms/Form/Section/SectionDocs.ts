import { PropertiesTableProps } from '../../../../shared/types'

export const SectionProperties: PropertiesTableProps = {
  path: {
    doc: 'A path (JSON Pointer) to the array to iterate over.',
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
