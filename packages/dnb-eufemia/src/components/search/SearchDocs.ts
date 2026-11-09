import type { PropertiesTableProps } from '../../shared/types'

export const SearchProperties: PropertiesTableProps = {
  variant: {
    doc: 'Choose `default`, `hero` for a large search, or `compact` to expand on focus and while results or a query are present. Defaults to `default`.',
    type: ['"default"', '"hero"', '"compact"'],
    status: 'optional',
  },
  pill: {
    doc: "Use a pill shape instead of the theme's normal corner radius. Applies to any variant. Defaults to `false`.",
    type: 'boolean',
    status: 'optional',
  },
  shortcut: {
    doc: 'Enable Cmd+K and Ctrl+K to focus the first visible, enabled Search with a shortcut. Shows a platform-specific hint when the input is empty. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
}

export const SearchPopoverProperties: PropertiesTableProps = {
  align: {
    doc: 'Align the results surface with the input using `left`, `center`, or `right`. Defaults to `left`. The surface stays within the viewport when there is insufficient space.',
    type: ['"left"', '"center"', '"right"'],
    status: 'optional',
  },
  children: {
    doc: 'Render custom controls alongside `results`, the inline Autocomplete list. Keep controls outside the listbox. The `close` callback closes the surface. Defaults to rendering only the results.',
    type: '({ results: React.ReactNode, close: () => void }) => React.ReactNode',
    status: 'optional',
  },
  popoverProps: {
    doc: 'Configure the underlying [Popover](/web/components/popover/properties) with `placement`, `triggerOffset`, `autoAlignMode`, `className`, or `noAnimation`.',
    type: 'object',
    status: 'optional',
  },
}
