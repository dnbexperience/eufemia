type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const StringKeysProperties: PropertiesTableProps = {
  'aria-label': {
    doc: 'Accessible label for the component.',
    type: 'string',
    status: 'optional',
  },
  'data-testid': {
    doc: 'Test ID for the component.',
    type: 'string',
    status: 'optional',
  },
  name: {
    doc: 'The name attribute.',
    type: 'string',
    status: 'optional',
  },
}
