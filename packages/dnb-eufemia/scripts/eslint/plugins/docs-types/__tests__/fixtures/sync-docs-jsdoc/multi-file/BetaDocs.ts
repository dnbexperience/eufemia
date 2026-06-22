type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const BetaProperties: PropertiesTableProps = {
  fontSize: {
    doc: 'Font size of the beta content.',
    type: 'string',
    status: 'optional',
  },
}
