type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const SectionProperties: PropertiesTableProps = {
  label: {
    doc: 'Label of the section.',
    type: 'string',
    status: 'optional',
  },
}

export const SectionItemProperties: PropertiesTableProps = {
  label: {
    doc: 'Label of a section item.',
    type: 'string',
    status: 'optional',
  },
}
