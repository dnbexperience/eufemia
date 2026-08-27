import type { PropertiesTableProps } from '../../shared/types'

export const SidebarMenuContainerProperties: PropertiesTableProps = {
  children: {
    doc: 'Declarative menu content composed with SidebarMenu.Item, SidebarMenu.Accordion, SidebarMenu.Group, SidebarMenu.Section, SidebarMenu.Header, and SidebarMenu.Divider. Use instead of data or sections.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  data: {
    doc: 'Recursive items used to render a menu from data. Use instead of children or sections.',
    type: 'Array<SidebarMenuItemData>',
    status: 'optional',
  },
  sections: {
    doc: 'Top-level switchable sections and their recursive items.',
    type: 'Array<SidebarMenuSectionData>',
    status: 'optional',
  },
  openItems: {
    doc: 'Controlled array of open accordion ids.',
    type: 'Array<string>',
    status: 'optional',
  },
  defaultOpenItems: {
    doc: 'Accordion ids that are initially open.',
    type: 'Array<string>',
    defaultValue: '[]',
    status: 'optional',
  },
  openItemsStorageKey: {
    doc: "Storage key used to persist the user's open accordion state between route navigations.",
    type: 'string',
    status: 'optional',
  },
  openItemsStorage: {
    doc: 'Storage used with openItemsStorageKey. Session storage is recommended for navigation UI state.',
    type: ['"session"', '"local"'],
    defaultValue: '"session"',
    status: 'optional',
  },
  scrollPositionStorageKey: {
    doc: "Storage key used to persist the nearest ScrollView's vertical position between route navigations.",
    type: 'string',
    status: 'optional',
  },
  scrollPositionStorage: {
    doc: 'Storage used with scrollPositionStorageKey. Session storage is recommended for navigation UI state.',
    type: ['"session"', '"local"'],
    defaultValue: '"session"',
    status: 'optional',
  },
  scrollSelectedItemIntoView: {
    doc: 'Whether an off-screen selected item is positioned within the nearest ScrollView or browser viewport.',
    type: 'boolean',
    defaultValue: 'true',
    status: 'optional',
  },
  disableUntilFound: {
    doc: "Disables keeping collapsed accordion content searchable with the browser's find-in-page functionality.",
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  activeSection: {
    doc: 'Controlled id of the visible section.',
    type: 'string',
    status: 'optional',
  },
  defaultActiveSection: {
    doc: 'Id of the initially visible section. Defaults to the section marked active, then the first section.',
    type: 'string',
    status: 'optional',
  },
  sectionLabel: {
    doc: 'Screen-reader label for the section dropdown.',
    type: 'React.ReactNode',
    defaultValue: '"Menu section"',
    status: 'optional',
  },
  selectedItem: {
    doc: 'Controlled id of the selected item or page accordion. Its ancestor accordions and section open automatically, but ancestor accordions can still be collapsed by the user. A collapsed ancestor indicates that it contains the current page.',
    type: 'string',
    status: 'optional',
  },
  defaultSelectedItem: {
    doc: 'Id of the initially selected item or page accordion.',
    type: 'string',
    status: 'optional',
  },
  '[nav attributes]': {
    doc: 'Standard HTML attributes are supported. Provide aria-label or aria-labelledby to name the navigation landmark.',
    type: 'Various',
    status: 'optional',
  },
}

export const SidebarMenuContainerEvents: PropertiesTableProps = {
  onOpenItemsChange: {
    doc: 'Called whenever an accordion opens or closes with all open accordion ids.',
    type: '(openItems: string[]) => void',
    status: 'optional',
  },
  onActiveSectionChange: {
    doc: 'Called when a section toggle is selected.',
    type: '(sectionId: string) => void',
    status: 'optional',
  },
  onSelectedItemChange: {
    doc: 'Called when a leaf item is selected.',
    type: '(itemId: string) => void',
    status: 'optional',
  },
}

export const SidebarMenuItemProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique item id used for selection state.',
    type: 'string',
    status: 'required',
  },
  text: {
    doc: 'Visible item label.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'Alternative to text.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  icon: {
    doc: 'Icon displayed before the label. The selection arrow replaces it while selected.',
    type: 'IconIcon',
    status: 'optional',
  },
  badge: {
    doc: 'Badge content displayed on the right side.',
    type: 'BadgeProps["content"]',
    status: 'optional',
  },
  badgeProps: {
    doc: 'Additional properties passed to the Badge component.',
    type: ['Omit<BadgeProps, "content"', '"children">'],
    status: 'optional',
  },
  href: {
    doc: 'Renders the item as a link with this destination.',
    type: 'string',
    status: 'optional',
  },
  to: {
    doc: 'Router destination passed to element.',
    type: 'string',
    status: 'optional',
  },
  element: {
    doc: 'Custom link element, such as a router Link component.',
    type: 'React.Element',
    status: 'optional',
  },
  target: {
    doc: 'Link target attribute.',
    type: 'string',
    status: 'optional',
  },
  rel: { doc: 'Link rel attribute.', type: 'string', status: 'optional' },
  disabled: {
    doc: 'Disables activation.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  active: {
    doc: 'Marks the item as the current page without managing container selection state.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
}

export const SidebarMenuItemEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Called when the item is activated after the container selection state is updated.',
    type: '(event: React.MouseEvent<HTMLElement>) => void',
    status: 'optional',
  },
}

export const SidebarMenuAccordionProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique accordion id used by controlled open state and ARIA relationships.',
    type: 'string',
    status: 'required',
  },
  text: {
    doc: 'Visible accordion label.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  icon: {
    doc: 'Icon displayed before the label.',
    type: 'IconIcon',
    status: 'optional',
  },
  badge: {
    doc: 'Badge content displayed before the accordion indicator.',
    type: 'BadgeProps["content"]',
    status: 'optional',
  },
  badgeProps: {
    doc: 'Additional properties passed to the Badge component.',
    type: ['Omit<BadgeProps, "content"', '"children">'],
    status: 'optional',
  },
  href: {
    doc: 'Makes the accordion label a page link while the chevron remains a separate expansion button.',
    type: 'string',
    status: 'optional',
  },
  to: {
    doc: 'Router destination passed to element.',
    type: 'string',
    status: 'optional',
  },
  element: {
    doc: 'Custom link element, such as a router Link component.',
    type: 'React.Element',
    status: 'optional',
  },
  children: {
    doc: 'Nested items and accordions.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  disabled: {
    doc: 'Disables the accordion trigger.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  open: {
    doc: 'Controlled open state for this accordion.',
    type: 'boolean',
    status: 'optional',
  },
  defaultOpen: {
    doc: 'Initial local open state.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  collapsible: {
    doc: 'Whether nested items can be collapsed.',
    type: 'boolean',
    defaultValue: 'true',
    status: 'optional',
  },
}

export const SidebarMenuAccordionEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Called when the optional page link is activated.',
    type: '(event: React.MouseEvent<HTMLElement>) => void',
    status: 'optional',
  },
  onOpenChange: {
    doc: 'Called whenever this accordion opens or closes.',
    type: '(open: boolean) => void',
    status: 'optional',
  },
}

export const SidebarMenuSectionProperties: PropertiesTableProps = {
  id: { doc: 'Unique section id.', type: 'string', status: 'required' },
  text: {
    doc: 'Label for the section toggle.',
    type: 'React.ReactNode',
    status: 'required',
  },
  children: {
    doc: 'Menu content shown while the section is active.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const SidebarMenuGroupProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique id used to associate the title with the nested list.',
    type: 'string',
    status: 'required',
  },
  text: {
    doc: 'Visible group title.',
    type: 'React.ReactNode',
    status: 'required',
  },
  icon: {
    doc: 'Icon shown before a linked group title.',
    type: 'IconIcon',
    status: 'optional',
  },
  badge: {
    doc: 'Badge content displayed on the right side of a linked group title.',
    type: 'BadgeProps["content"]',
    status: 'optional',
  },
  suffix: {
    doc: 'Additional content displayed before the badge.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  badgeProps: {
    doc: 'Additional properties passed to the Badge component.',
    type: ['Omit<BadgeProps, "content"', '"children">'],
    status: 'optional',
  },
  children: {
    doc: 'Nested menu content that is always visible.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  href: {
    doc: 'Makes the group title a page link without making it collapsible.',
    type: 'string',
    status: 'optional',
  },
  to: {
    doc: 'Router destination passed to element.',
    type: 'string',
    status: 'optional',
  },
  element: {
    doc: 'Custom link element, such as a router Link component.',
    type: 'React.Element',
    status: 'optional',
  },
  disabled: {
    doc: 'Disables activation of the optional page link.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
}

export const SidebarMenuHeaderProperties: PropertiesTableProps = {
  text: {
    doc: 'Header text.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'Alternative to text.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}
