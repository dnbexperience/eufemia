type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const RootProperties: PropertiesTableProps = {
  skeleton: {
    doc: 'Applies skeleton state to all sub-components.',
    type: 'boolean',
    status: 'optional',
  },
}
