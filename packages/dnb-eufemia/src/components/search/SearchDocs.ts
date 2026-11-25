import type { PropertiesTableProps } from '../../shared/types'

export const SearchProperties: PropertiesTableProps = {
  variant: {
    doc: 'Choose `default`, `hero` for a large search, or `compact` to expand on focus and while results or a query are present. Defaults to `default`.',
    type: ['"default"', '"hero"', '"compact"'],
    status: 'optional',
  },
  shortcut: {
    doc: 'Enable Cmd+K on Mac and Ctrl+K elsewhere to focus the first visible, enabled Search with a shortcut. Leaves shortcuts to other focused text fields and editors. Shows a platform-specific hint when the input is empty. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
}

export const SearchPanelProperties: PropertiesTableProps = {
  minHeight: {
    doc: 'Minimum results height in rem. Defaults to `10` and is reduced to fit the available space on the opening side. A smaller explicit `maxHeight` takes precedence. Use `0` to let a short results list keep its natural height.',
    type: ['number', 'string'],
    status: 'optional',
  },
  maxHeight: {
    doc: 'Optional maximum results height in rem. Results otherwise grow into the available viewport space above or below the input, reserving room for custom controls and padding. The available space and a smaller explicit maximum take precedence over `minHeight`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  panelDescription: {
    doc: 'Describe the results and any controls available in the panel, such as filtering and sorting. Include how to reach those controls with Tab. This screen reader description is attached to the input, including while the panel is closed. Provide localized text. Result counts are announced separately by Autocomplete.',
    type: 'string',
    status: 'required',
  },
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
    doc: 'Configure the underlying [Popover](/web/components/popover/properties) with `fixedPosition`, `placement`, `triggerOffset`, `autoAlignMode`, `className`, or `noAnimation`. Use `fixedPosition: true` for a fixed or sticky header. Defaults to `triggerOffset: 8` pixels and `autoAlignMode: "initial"`, keeping the opening direction while the panel is open.',
    type: 'object',
    status: 'optional',
  },
}
