import type { PropertiesTableProps } from '../../shared/types'

export const SidebarMenuContainerProperties: PropertiesTableProps = {
  children: {
    doc: 'Declarative menu content using the SidebarMenu subcomponents.',
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
    doc: 'Accessible label for the section toggle group.',
    type: 'React.ReactNode',
    defaultValue: '"Menu section"',
    status: 'optional',
  },
  selectedItem: {
    doc: 'Controlled id of the selected item or page accordion. Its ancestor accordions and section open automatically.',
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
    defaultValue: '"folder"',
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
