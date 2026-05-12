type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const MultiProperties: PropertiesTableProps = {
  value: {
    doc: 'The current value.',
    type: 'string',
    status: 'optional',
  },
  label: {
    doc: 'Label for the field.',
    type: 'string',
    status: 'optional',
  },
}

export const MultiEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called when the value changes.',
    type: 'function',
    status: 'optional',
  },
  onFocus: {
    doc: 'Called when the field receives focus.',
    type: 'function',
    status: 'optional',
  },
}
