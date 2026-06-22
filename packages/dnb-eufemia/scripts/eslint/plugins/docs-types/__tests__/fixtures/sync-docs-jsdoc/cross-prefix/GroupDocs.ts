type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const ItemStartProperties: PropertiesTableProps = {
  fontSize: {
    doc: 'Font size of the start content.',
    type: 'string',
    status: 'optional',
  },
}

export const ItemCenterProperties: PropertiesTableProps = {
  fontSize: {
    doc: 'Font size of the center content.',
    type: 'string',
    status: 'optional',
  },
}
