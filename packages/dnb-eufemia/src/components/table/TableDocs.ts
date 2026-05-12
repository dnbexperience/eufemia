import type { PropertiesTableProps } from '../../shared/types'

export const TableProperties: PropertiesTableProps = {
  mode: {
    doc: 'Defines how the Table should look. Use `accordion` for an accordion-like table. Use `navigation` for a navigation table.',
    type: ['"accordion"', '"navigation"'],
    defaultValue: 'null',
    status: 'optional',
  },
  accordionChevronPlacement: {
    doc: 'Defines where the chevron will be placed, should only be used together with `mode="accordion"`.',
    type: ['"left"', '"right"'],
    defaultValue: '"left"',
    status: 'optional',
  },
  border: {
    doc: 'Use `true` to show borders between table data cells.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  outline: {
    doc: 'Use `true` to show an outline border around the table.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  sticky: {
    doc: "Use `true` to enable a sticky Table header. Or use `'css-position'` to enable the CSS based scroll behavior.",
    type: ['boolean', '"css-position"'],
    defaultValue: 'false',
    status: 'optional',
  },
  stickyOffset: {
    doc: 'Defines the offset (top) in `rem` from where the header should start to stick. You may define your app header height here, if you have a sticky header on your page.',
    type: ['string', 'number'],
    defaultValue: '0',
    status: 'optional',
  },
  size: {
    doc: 'Spacing size inside the table header and data.',
    type: ['"large"', '"small"', '"medium"'],
    defaultValue: '"large"',
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
    doc: 'Custom `className` on the component root.',
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

export const TableEventProperties: PropertiesTableProps = {
  collapseAllHandleRef: {
    doc: 'Ref handle to collapse all expanded accordion rows. Send in a ref and use `.current()` to collapse all rows.',
    type: 'React.RefObject<() => void>',
    defaultValue: 'undefined',
    status: 'optional',
  },
}

export const TrProperties: PropertiesTableProps = {
  /**
   * The variant of the tr
   */
  variant: {
    doc: 'Override the automatic variant of the current row. The next row one will continue with the opposite.',
    type: ['"even"', '"odd"'],
    defaultValue: 'undefined',
    status: 'optional',
  },
  noWrap: {
    doc: 'If set to `true`, the inherited header text will not wrap to new lines.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  verticalAlign: {
    doc: 'Vertical alignment of all cell content in the row.',
    type: ['"top"', '"middle"', '"bottom"'],
    defaultValue: 'undefined',
    status: 'optional',
  },
  expanded: {
    doc: 'Use `true` to render the `<Tr>` initially as expanded.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  disabled: {
    doc: 'Use `true` to disable the `<Tr>` to be accessible as an interactive element.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  noAnimation: {
    doc: 'Use `true` to disable the expand/collapse animation.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  keepInDOM: {
    doc: 'When `true`, keeps the accordion content in the DOM when closed. Defaults to `false`.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  highlight: {
    doc: 'If set to `true`, all `<Td>` and `<Th>` cells in the row receive a highlighted background.',
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

export const TrEventProperties: PropertiesTableProps = {
  onClick: {
    doc: 'Will emit when user clicks/expands or on keydown space/enter (in `mode="accordion"` and `mode="navigation"`) in the table row. The second argument is an object with `trElement` (the `HTMLTableRowElement`).',
    type: '(event, { trElement }) => void',
    defaultValue: 'undefined',
    status: 'optional',
  },
  onOpen: {
    doc: 'Will emit when table row is expanded. Returns an object with the table row as the target: `{ target }`.',
    type: '({ target }) => void',
    defaultValue: 'undefined',
    status: 'optional',
  },
  onClose: {
    doc: 'Will emit when table row is closed (after it was open). Returns an object with the table row as the target: `{ target }`.',
    type: '({ target }) => void',
    defaultValue: 'undefined',
    status: 'optional',
  },
}

export const ThProperties: PropertiesTableProps = {
  variant: {
    doc: 'Defines the visual style of the table header. Use `subtle` for a lighter appearance with reduced font-weight, smaller font-size, and muted text color.',
    type: ['"emphasis"', '"subtle"'],
    defaultValue: '"emphasis"',
    status: 'optional',
  },
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
  highlight: {
    doc: 'If set to `true`, the header cell and all `<Td>` cells in the same column receive a highlighted background. Also inherited from the parent `<Tr>` when it has `highlight`.',
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

export const TdProperties: PropertiesTableProps = {
  noSpacing: {
    doc: 'If set to `true`, no padding will be added.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  spacing: {
    doc: 'Set to `horizontal` for padding on left and right side.',
    type: '"horizontal"',
    defaultValue: 'undefined',
    status: 'optional',
  },
  verticalAlign: {
    doc: 'Vertical alignment of the cell content.',
    type: ['"top"', '"middle"', '"bottom"'],
    defaultValue: 'undefined',
    status: 'optional',
  },
  highlight: {
    doc: 'If set to `true`, the cell receives a highlighted background. Automatically set when the parent `<Tr>` has `highlight`, or when the corresponding `<Th>` in the same column has `highlight`.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  selected: {
    doc: 'When `true`, the cell is styled as selected (highlighted background and selected icon/border). Requires `onClick` to take effect, since the selected styling targets the cell button. When provided (either `true` or `false`), the cell button is announced as a toggle button by screen readers via `aria-pressed`. Use `setSelected` from the `onClick` callback to toggle the state.',
    type: 'boolean',
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

export const TdEventProperties: PropertiesTableProps = {
  onClick: {
    doc: 'Will emit when user clicks the cell button. The second argument is an object with `trElement` (the parent `HTMLTableRowElement`), `tdElement` (the `HTMLTableCellElement`), `thElement` (the matching `<Th>` from `<thead>`, or `null` if not found), `isSelected` (current selected state), and `setSelected` (function to update the selected state — only effective when the `selected` prop is provided).',
    type: '(event, { trElement, tdElement, thElement, isSelected, setSelected }) => void',
    defaultValue: 'undefined',
    status: 'optional',
  },
  icon: {
    doc: 'Icon to show in the clickable cell. Set to `true` for the default chevron icon, or pass a custom icon. Set to `false` to hide the icon. Only takes effect when `onClick` is provided.',
    type: ['boolean', 'IconIcon'],
    defaultValue: 'true',
    status: 'optional',
  },
}
