type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const AlphaProperties: PropertiesTableProps = {
  fontSize: {
    doc: 'Font size of the alpha content.',
    type: 'string',
    status: 'optional',
  },
}
