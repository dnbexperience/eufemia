import { PropertiesTableProps } from '../../shared/types'

export const ContainerProperties: PropertiesTableProps = {
  variant: {
    doc: 'Visual variant of the list. Defaults to `basic`. Can be overridden per item via `List.Item.Basic` or `List.Item.Action`.',
    type: ["'basic'"],
    defaultValue: "'basic'",
    status: 'optional',
  },
  children: {
    doc: 'List items. Use `List.Item.Basic`, `List.Item.Action`, or `List.Item.Accordion` as direct children.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Flex.Container](/uilib/layout/flex/container/properties)': {
    doc: 'Flex.Container properties (e.g. direction, wrap, gap).',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ItemContentProperties: PropertiesTableProps = {
  variant: {
    doc: 'Overrides the variant inherited from `List.Container`.',
    type: ["'basic'"],
    status: 'optional',
  },
  selected: {
    doc: 'When `true`, applies the selected state styling (e.g. background).',
    type: 'boolean',
    status: 'optional',
  },
  pending: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown (loading state). Disables pointer events on the item.',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, applies skeleton font styling to the item (text placeholder animation). Use for loading state without the full overlay from `pending`.',
    type: 'boolean',
    status: 'optional',
  },
  icon: {
    doc: 'Optional icon (e.g. `fish_medium` or an icon element). Rendered at the start of the row.',
    type: 'IconIcon',
    status: 'optional',
  },
  title: {
    doc: 'Optional title. Rendered after the icon when provided.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'Item content. Typically `List.Cell.Start`, `List.Cell.Center`, `List.Cell.End`, or `List.Cell.Addition`.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Flex.Container](/uilib/layout/flex/container/properties)': {
    doc: 'Flex.Container properties. Direction is fixed to horizontal, justify to space-between.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ItemCenterProperties: PropertiesTableProps = {
  children: {
    doc: 'Center content of the list item. Grows to fill available space.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Flex.Item](/uilib/layout/flex/item/properties)': {
    doc: 'Flex.Item properties. Uses `grow` by default.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ItemAdditionProperties: PropertiesTableProps = {
  children: {
    doc: 'Additional content of the list item. Grows to fill available space.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Flex.Item](/uilib/layout/flex/item/properties)': {
    doc: 'Flex.Item properties. Uses `grow` by default.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ItemEndProperties: PropertiesTableProps = {
  fontWeight: {
    doc: 'Font weight of the end content. Defaults to `medium`.',
    type: ["'regular'", "'medium'"],
    defaultValue: "'medium'",
    status: 'optional',
  },
  children: {
    doc: 'End content of the list item (e.g. value, action).',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Flex.Item](/uilib/layout/flex/item/properties)': {
    doc: 'Flex.Item properties. Uses innerSpace left/right small by default.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ItemStartProperties: PropertiesTableProps = {
  children: {
    doc: 'Start content of the list item (e.g. icon, label).',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Flex.Item](/uilib/layout/flex/item/properties)': {
    doc: 'Flex.Item properties. Uses innerSpace left/right small by default.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ItemTitleProperties: PropertiesTableProps = {
  children: {
    doc: 'Title text of the list item. Grows to fill available space.',
    type: 'React.ReactNode',
    status: 'required',
  },
  subtitle: {
    doc: 'Optional subtitle text shown below the title.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[Flex.Item](/uilib/layout/flex/item/properties)': {
    doc: 'Flex.Item properties. Uses `grow` by default.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ItemIconProperties: PropertiesTableProps = {
  children: {
    doc: 'Icon element. Use a [primary](/icons/primary) or [secondary](/icons/secondary) icon component (e.g. `fish_medium`). Rendered with size `medium`.',
    type: 'IconIcon',
    status: 'required',
  },
  '[Flex.Item](/uilib/layout/flex/item/properties)': {
    doc: 'Flex.Item properties. Uses innerSpace left/right small by default.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ItemAccordionProperties: PropertiesTableProps = {
  chevronPosition: {
    doc: 'Placement of the chevron icon. Defaults to `right`. Use `left` to show the chevron on the left side.',
    type: ["'left'", "'right'"],
    defaultValue: "'right'",
    status: 'optional',
  },
  open: {
    doc: 'Initial open state. Defaults to `false`. The accordion can be toggled by the user via the header.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  id: {
    doc: 'Unique id used for the header and content region (for `aria-controls`, `aria-labelledby`, etc.). Auto-generated if not provided.',
    type: 'string',
    status: 'optional',
  },
  icon: {
    doc: 'Optional icon for the accordion header (e.g. `fish_medium`).',
    type: 'IconIcon',
    status: 'optional',
  },
  title: {
    doc: 'Optional title for the accordion header.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'Header cells (e.g. `List.Cell.Start`, `List.Cell.End`) and optionally `List.Item.Accordion.Content` for the expandable section.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[List.Item.Basic](/uilib/components/list/properties/#listitembasic)': {
    doc: 'Inherits List.Item.Basic properties (variant, pending, spacing, etc.).',
    type: 'Various',
    status: 'optional',
  },
}

export const ItemNavigateProperties: PropertiesTableProps = {
  href: {
    doc: 'When set, renders as a native link (`<a>`) so the item navigates to the URL. Use for external or internal navigation. When not set, the item behaves as a button (use `onClick` for custom handling).',
    type: 'string',
    status: 'optional',
  },
  target: {
    doc: 'Link target (e.g. `_blank` for new tab). Only applicable when `href` is set.',
    type: 'string',
    status: 'optional',
  },
  rel: {
    doc: 'Link rel (e.g. `noopener noreferrer` for external links). Only applicable when `href` is set.',
    type: 'string',
    status: 'optional',
  },
  chevronPosition: {
    doc: 'Placement of the chevron icon. Defaults to `right`. Use `left` to show the chevron on the left side.',
    type: ["'left'", "'right'"],
    defaultValue: "'right'",
    status: 'optional',
  },
  pending: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown (loading state). Disables click and keyboard while active.',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, applies skeleton font styling to the item (text placeholder).',
    type: 'boolean',
    status: 'optional',
  },
  role: {
    doc: 'ARIA role. Defaults to `button` so assistive technologies announce it as a button. Override if needed (e.g. `link`).',
    type: 'string',
    defaultValue: "'button'",
    status: 'optional',
  },
  onClick: {
    doc: 'Called when the user clicks or activates the item (Enter/Space key). Receives the native mouse event.',
    type: '(event: React.MouseEvent<HTMLDivElement>) => void',
    status: 'optional',
  },
  icon: {
    doc: 'Optional icon for the action item (e.g. `fish_medium`).',
    type: 'IconIcon',
    status: 'optional',
  },
  title: {
    doc: 'Optional title for the action item.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'Additional cells (e.g. `List.Cell.End` for value). A chevron icon is rendered at the end automatically.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[List.Item.Basic](/uilib/components/list/properties/#listitembasic)': {
    doc: 'Inherits List.Item.Basic properties (variant, selected, spacing, etc.).',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ListEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Fired when the user clicks or activates `List.Item.Action` (click or Enter/Space key). Receives the native event. Only applicable to `List.Item.Action`.',
    type: '(event: React.MouseEvent<HTMLDivElement>) => void',
    status: 'optional',
  },
}
