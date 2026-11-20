type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const InlineProperties: PropertiesTableProps = {
  skeleton: {
    doc: 'Applies skeleton state to the inline container.',
    type: 'boolean',
    status: 'optional',
  },
}
