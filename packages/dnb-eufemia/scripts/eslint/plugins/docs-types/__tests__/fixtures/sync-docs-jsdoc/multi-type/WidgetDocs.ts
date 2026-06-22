type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const WidgetRootProperties: PropertiesTableProps = {
  children: {
    doc: 'Root children content.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const WidgetButtonProperties: PropertiesTableProps = {
  children: {
    doc: 'Button label content.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}
