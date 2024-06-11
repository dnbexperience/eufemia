import { PropertiesTableProps } from '../../shared/types'

export const tableProperties: PropertiesTableProps = {
  accordion: {
    doc: 'Set to true if you have one or more rows that contains an accordion content.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  accordionChevronPlacement: {
    doc: 'Defines where the chevron will be placed.',
    type: [`'start'`, `'end'`],
    defaultValue: `'start'`,
    status: 'optional',
  },
  border: {
    doc: 'Use `true` to show borders between table data cells.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  outline: {
    doc: 'Use `true` to show an outline border around the table',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  sticky: {
    doc: "Use `true? to enable a sticky Table header. Or use `'css-position'` to enable the CSS based scroll behavior.",
    type: ['boolean', `'css-position'`],
    defaultValue: 'false',
    status: 'optional',
  },
  stickyOffset: {
    doc: 'Defines the offset (top) in `rem` from where the header should start to stick. You may define your app header height here, if you have a sticky header on your page.',
    type: ['string', 'number'],
    defaultValue: 'false',
    status: 'optional',
  },
  size: {
    doc: 'Spacing size inside the table header and data.',
    type: [`'large'`, `'medium'`, `'small'`],
    defaultValue: `'large'`,
    status: 'optional',
  },
  fixed: {
    doc: 'If set to `true`, the table will behave with a fixed table layout, using: `table-layout: fixed;`. Use e.g. CSS `width: 40%` on a table column to define the width.',
    type: 'boolean',
    defaultValue: 'null',
    status: 'optional',
  },
  children: {
    doc: 'The content of the component.',
    type: 'React.ReactNode',
    status: 'required',
  },
  className: {
    doc: 'Custom className on the component root',
    type: 'string',
    defaultValue: 'undefined',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    defaultValue: 'undefined',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const tableEventProperties: PropertiesTableProps = {
  collapseAllHandleRef: {
    doc: 'ref handle to collapse all expanded accordion rows. Send in a ref and use `.current()` to collapse all rows.',
    type: 'React.MutableRefObject<() => void>',
    defaultValue: 'undefined',
    status: 'optional',
  },
}

export const trProperties: PropertiesTableProps = {
  /**
   * The variant of the tr
   */
  variant: {
    doc: 'Override the automatic variant of the current row. The next row one will continue with the opposite.',
    type: [`'even'`, `'odd'`],
    defaultValue: 'undefined',
    status: 'optional',
  },
  noWrap: {
    doc: 'if set to `true`, the inherited header text will not wrap to new lines.',
    type: 'boolean',
    defaultValue: 'true',
    status: 'optional',
  },
  expanded: {
    doc: 'use `true` to render the `<Tr>` initially as expanded.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  disabled: {
    doc: 'use `true` to disable the `<Tr>` to be accessible as an interactive element.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  noAnimation: {
    doc: 'use `true` to disable the expand/collapse animation.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  children: {
    doc: 'The content of the component.',
    type: 'React.ReactNode',
    status: 'required',
  },
}

export const trEventProperties: PropertiesTableProps = {
  onClick: {
    doc: 'will emit when user clicks/expands the table row. Returns a native click.  ',
    type: '(event) => void',
    defaultValue: 'undefined',
    status: 'optional',
  },
  onOpened: {
    doc: 'Will emit when table row is expanded. Returns an object with the table row as the target: `{ target }`.',
    type: '({ target }) => void',
    defaultValue: 'undefined',
    status: 'optional',
  },
  onClosed: {
    doc: 'Will emit when table row is closed (after it was open). Returns an object with the table row as the target: `{ target }`.',
    type: '({ target }) => void',
    defaultValue: 'undefined',
    status: 'optional',
  },
}

export const thProperties: PropertiesTableProps = {
  sortable: {
    doc: 'Defines the table header as sortable if set to `true` (ascending).',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  active: {
    doc: 'Defines the sortable column as the current active (ascending).',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  reversed: {
    doc: 'Defines the sortable column as in reversed order (descending).',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  noWrap: {
    doc: 'If set to `true`, the header text will not wrap to new lines.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  children: {
    doc: 'The content of the component.',
    type: 'React.ReactNode',
    defaultValue: 'undefined',
    status: 'optional',
  },
}

export const tdProperties: PropertiesTableProps = {
  noSpacing: {
    doc: 'If set to `true`, no padding will be added.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  spacing: {
    doc: 'Set to `horizontal` for padding on left and right side.',
    type: `'horizontal'`,
    defaultValue: 'undefined',
    status: 'optional',
  },
  children: {
    doc: 'The content of the component.',
    type: 'React.ReactNode',
    defaultValue: 'undefined',
    status: 'optional',
  },
}
