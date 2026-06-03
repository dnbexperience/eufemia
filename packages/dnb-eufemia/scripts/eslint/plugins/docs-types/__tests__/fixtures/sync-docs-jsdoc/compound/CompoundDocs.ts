type PropertiesTableProps = Record<
  string,
  { doc: string; type: string | string[]; status: string }
>

export const RootProperties: PropertiesTableProps = {
  children: {
    doc: 'Root children content.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  onChange: {
    doc: 'Called when root state changes.',
    type: 'function',
    status: 'optional',
  },
}

export const SortButtonProperties: PropertiesTableProps = {
  data: {
    doc: 'Sort options for the dropdown.',
    type: 'Array',
    status: 'required',
  },
  onChange: {
    doc: 'Called when a sort option is selected.',
    type: 'function',
    status: 'optional',
  },
}

export const SearchProperties: PropertiesTableProps = {
  label: {
    doc: 'Label for the search input.',
    type: 'string',
    status: 'required',
  },
  onChange: {
    doc: 'Called when the search value changes.',
    type: 'function',
    status: 'optional',
  },
}
