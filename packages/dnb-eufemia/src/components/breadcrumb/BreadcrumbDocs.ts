import { PropertiesTableProps } from '../../shared/types'

export const BreadcrumbProperties: PropertiesTableProps = {
  data: {
    doc: 'List of pages to render as breadcrumbitems. Each object in data can include all properties from [BreadcrumbItem properties](/uilib/components/breadcrumb/properties#breadcrumbitem-properties).',
    type: 'Array<BreadcrumbItemProps>',
    status: 'optional',
  },
  children: {
    doc: 'Content of the component. Can be used instead of property `data`, by adding Breadcrumbitem children `<Breadcrumb.Item {...props} />`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  variant: {
    doc: "Defaults to 'responsive' or 'single' depending on content. Options: `responsive` | `single` | `multiple` | `collapse` .",
    type: ['responsive', 'single', 'multiple', 'collapse'],
    status: 'optional',
  },
  href: {
    doc: 'For variant `single`, set `href` for button click. Can be used instead of event/property `onClick`.',
    type: 'string',
    status: 'optional',
  },
  navText: {
    doc: 'Every `<nav>` on a page needs an unique aria-label text.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  goBackText: {
    doc: "Override with a custom 'Back' text for variant `single` (Not recommended).",
    type: 'React.ReactNode',
    status: 'optional',
  },
  homeText: {
    doc: "Override with a custom 'Home' text (Not recommended)",
    type: 'React.ReactNode',
    status: 'optional',
  },
  backToText: {
    doc: "Override with a custom 'Back to...' text (Not recommended).",
    type: 'React.ReactNode',
    status: 'optional',
  },
  styleType: {
    doc: 'Use one of the Section component style types (style_type). Defaults to `transparent`.',
    type: 'Various',
    status: 'optional',
  },
  collapsedStyleType: {
    doc: 'Use one of the Section component variants. Defaults to `info`.',
    type: ['error', 'info', 'warning', 'success'],
    status: 'optional',
  },
  className: {
    doc: 'Custom className for the component root.',
    type: 'string',
    status: 'optional',
  },
  isCollapsed: {
    doc: 'For variant `collapse`, override isCollapsed for the collapsed content by updating this value using the provided property `onClick`.',
    type: 'boolean',
    status: 'optional',
  },
  spacing: {
    doc: 'Include spacing properties in breadcrumb. If only `true` is given, the spacing will be `small`. Defaults to `false`.',
    type: 'Various',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const BreadcrumbEvents: PropertiesTableProps = {
  onClick: {
    doc: 'will be called by user click interaction, to handle click event on "Back" for variant `single` and "Back to..." for variant `collapse`.',
    type: 'function',
    status: 'optional',
  },
  onToggle: {
    doc: 'Will be called when breadcrumb expands or collapses.',
    type: 'function',
    status: 'optional',
  },
}

export const BreadcrumbItemProperties: PropertiesTableProps = {
  text: {
    doc: 'Text displaying inside Breadcrumb item.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  variant: {
    doc: 'The component variant. Options: `home` | `previous` | `current`.',
    type: ['home', 'previous', 'current'],
    status: 'optional',
  },
  icon: {
    doc: 'Override icon displaying on the left side (Not recommended). Default: `chevron_left`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  href: {
    doc: 'Set what happens when the user clicks on the item. Also see `onClick` event.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
}

export const BreadcrumbItemEvents: PropertiesTableProps = {
  onClick: {
    doc: 'will be called by user click interaction.',
    type: 'function',
    status: 'optional',
  },
}
