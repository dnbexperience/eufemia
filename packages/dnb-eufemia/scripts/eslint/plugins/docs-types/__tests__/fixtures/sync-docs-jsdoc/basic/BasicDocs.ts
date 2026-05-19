type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const BasicProperties: PropertiesTableProps = {
  content: {
    doc: 'Content of the component.',
    type: 'string',
    status: 'optional',
  },
  label: {
    doc: 'Label for the component.',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'The size of the component. Defaults to `medium`.',
    type: ['"small"', '"medium"', '"large"'],
    status: 'optional',
  },
}
