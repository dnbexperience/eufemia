import type { PropertiesTableProps } from '../../shared/types'

export const SidebarMenuRootProperties: PropertiesTableProps = {
  children: {
    doc: 'Declarative menu content composed with SidebarMenu.Item, SidebarMenu.Accordion, SidebarMenu.Group, SidebarMenu.Section, SidebarMenu.Header, and SidebarMenu.Divider.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  openItems: {
    doc: 'Controlled array of open accordion ids. Selected ancestors are only opened automatically when this property is not provided.',
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
  openOnFind: {
    doc: "Keeps collapsed accordion content searchable and opens it when matched by the browser's find-in-page functionality.",
    type: 'boolean',
    defaultValue: 'true',
    status: 'optional',
  },
  activeSection: {
    doc: 'Controlled id of the visible section.',
    type: 'string',
    status: 'optional',
  },
  defaultActiveSection: {
    doc: 'Id of the initially visible section. Defaults to the section marked defaultActive, then the first section.',
    type: 'string',
    status: 'optional',
  },
  sectionLabel: {
    doc: 'Screen-reader label for the section dropdown. Defaults to the localized SidebarMenu label.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  selectedItem: {
    doc: 'Controlled id of the selected item or page accordion. A selected page accordion opens when selection initializes or changes, regardless of stored open state, and can then be collapsed manually. Its ancestor accordions and section open automatically, but ancestors can remain collapsed with medium-weight labels to indicate that they contain the current page.',
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

export const SidebarMenuDataProperties: PropertiesTableProps = {
  data: {
    doc: 'Recursive items used to render a menu from data.',
    type: 'Array<SidebarMenuItemData>',
    status: 'optional',
  },
  sections: {
    doc: 'Top-level switchable sections and their recursive items.',
    type: 'Array<SidebarMenuSectionData>',
    status: 'optional',
  },
  ...Object.fromEntries(
    Object.entries(SidebarMenuRootProperties).filter(
      ([name]) => name !== 'children'
    )
  ),
}

export const SidebarMenuRootEvents: PropertiesTableProps = {
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

export const SidebarMenuResizeHandleProperties: PropertiesTableProps = {
  targetRef: {
    doc: 'Ref to the element being resized. The handle reads this element’s rendered width when dragging starts or an arrow key is pressed.',
    type: 'React.RefObject<HTMLElement>',
    status: 'required',
  },
  cssProperty: {
    doc: 'CSS custom property that receives the new width as a pixel value, for example `--sidebar-width: 336px`. Use this property in the CSS that sizes the sidebar.',
    type: 'string',
    defaultValue: '"--sidebar-menu-width"',
    status: 'optional',
  },
  scopeSelector: {
    doc: 'Selector passed to `targetRef.current.closest()` to find where `cssProperty` is set. Use a shared layout ancestor when the sidebar and adjacent content both depend on the width. When omitted, the property is set on the referenced sidebar element.',
    type: 'string',
    status: 'optional',
  },
  minWidth: {
    doc: 'Smallest width the handle can write, in pixels. Use layout CSS for any additional responsive constraints.',
    type: 'number',
    defaultValue: '240',
    status: 'optional',
  },
  maxWidth: {
    doc: 'Largest width the handle can write, in pixels.',
    type: 'number',
    defaultValue: '560',
    status: 'optional',
  },
  collapseThreshold: {
    doc: 'Width in pixels at which continued pointer dragging calls onCollapse. Defaults to half of minWidth.',
    type: 'number',
    defaultValue: 'minWidth / 2',
    status: 'optional',
  },
  step: {
    doc: 'Number of pixels added or removed when pressing ArrowRight or ArrowLeft.',
    type: 'number',
    defaultValue: '16',
    status: 'optional',
  },
  largeStep: {
    doc: 'Number of pixels added or removed when pressing Shift together with ArrowRight or ArrowLeft.',
    type: 'number',
    defaultValue: '48',
    status: 'optional',
  },
  '[button attributes]': {
    doc: 'Standard button attributes are supported. Set `aria-controls` to the id of the resized sidebar. The default accessible label is "Resize sidebar".',
    type: 'Various',
    status: 'optional',
  },
}

export const SidebarMenuResizeHandleEvents: PropertiesTableProps = {
  onCollapse: {
    doc: 'Called when pointer dragging reaches collapseThreshold. Below minWidth, the handle applies resistance to communicate that continued dragging can collapse the sidebar.',
    type: '() => void',
    status: 'optional',
  },
}

export const SidebarMenuResponsiveProviderProperties: PropertiesTableProps =
  {
    breakpoint: {
      doc: 'Maximum viewport width at which the mobile navigation is used. Use an Eufemia breakpoint name or an explicit em value.',
      type: ['MediaQuerySizes', '`${number}em`'],
      defaultValue: '"medium"',
      status: 'optional',
    },
    styleNonce: {
      doc: 'CSP nonce forwarded to first-paint CSS generated for a custom breakpoint.',
      type: 'string',
      status: 'optional',
    },
    open: {
      doc: 'Controlled Drawer state.',
      type: 'boolean',
      status: 'optional',
    },
    defaultOpen: {
      doc: 'Initial uncontrolled Drawer state.',
      type: 'boolean',
      defaultValue: 'false',
      status: 'optional',
    },
    inlineCollapsed: {
      doc: 'Controlled desktop inline navigation state.',
      type: 'boolean',
      status: 'optional',
    },
    defaultInlineCollapsed: {
      doc: 'Initial uncontrolled desktop inline navigation state.',
      type: 'boolean',
      defaultValue: 'false',
      status: 'optional',
    },
  }

export const SidebarMenuResponsiveProviderEvents: PropertiesTableProps = {
  onOpenChange: {
    doc: 'Called whenever the responsive Drawer opens or closes.',
    type: '(open: boolean) => void',
    status: 'optional',
  },
  onInlineCollapsedChange: {
    doc: 'Called whenever the desktop inline navigation collapses or restores.',
    type: '(collapsed: boolean) => void',
    status: 'optional',
  },
}

export const SidebarMenuResponsiveTriggerProperties: PropertiesTableProps =
  {
    controls: {
      doc: 'Id of the responsive Drawer controlled by the trigger.',
      type: 'string',
      defaultValue: '"sidebar-menu-responsive-drawer"',
      status: 'optional',
    },
    inlineControls: {
      doc: 'Id of the desktop inline navigation restored by the trigger.',
      type: 'string',
      status: 'optional',
    },
    '[Button properties]': {
      doc: 'Supports Button properties except aria-expanded and aria-haspopup, which are managed by the responsive navigation.',
      type: 'Various',
      status: 'optional',
    },
  }

export const SidebarMenuResponsiveDrawerProperties: PropertiesTableProps =
  {
    id: {
      doc: 'Id matched by ResponsiveTrigger controls.',
      type: 'string',
      defaultValue: '"sidebar-menu-responsive-drawer"',
      status: 'optional',
    },
    dialogTitle: {
      doc: 'Accessible name of the Drawer.',
      type: 'React.ReactNode',
      status: 'optional',
    },
    '[Drawer properties]': {
      doc: 'Supports Drawer properties except open, which is managed by ResponsiveProvider.',
      type: 'Various',
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
    doc: 'Icon displayed before the label.',
    type: 'IconIcon',
    status: 'optional',
  },
  badge: {
    doc: 'Badge content displayed on the right side.',
    type: 'BadgeProps["content"]',
    status: 'optional',
  },
  suffix: {
    doc: 'Additional content displayed on the right side before the badge.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  badgeProps: {
    doc: 'Additional properties passed to the Badge component. A nested notification variant is indicated on collapsible ancestor accordions.',
    type: 'Omit<BadgeProps, "content" | "children">',
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
    doc: 'Marks the item as the current page without managing Root selection state.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
}

export const SidebarMenuItemEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Called when the item is activated after the Root selection state is updated.',
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
  suffix: {
    doc: 'Additional content displayed before the badge and accordion indicator.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  badgeProps: {
    doc: 'Additional properties passed to the Badge component. A nested notification variant is indicated on collapsible ancestor accordions.',
    type: 'Omit<BadgeProps, "content" | "children">',
    status: 'optional',
  },
  href: {
    doc: 'Makes the accordion trigger a page link that also controls expansion.',
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
  icon: {
    doc: 'Icon shown before the section label.',
    type: 'IconIcon',
    status: 'optional',
  },
  badge: {
    doc: 'Notification badge displayed on the right side of the dropdown option.',
    type: 'BadgeProps["content"]',
    status: 'optional',
  },
  badgeProps: {
    doc: 'Additional properties passed to the dropdown option Badge component. The variant defaults to "notification".',
    type: ['Omit<BadgeProps, "content"', '"children">'],
    status: 'optional',
  },
  triggerBadge: {
    doc: 'Notification badge displayed on the right side of the selected dropdown trigger.',
    type: 'BadgeProps["content"]',
    status: 'optional',
  },
  triggerBadgeProps: {
    doc: 'Additional properties passed to the selected dropdown trigger Badge component. The variant defaults to "notification".',
    type: ['Omit<BadgeProps, "content"', '"children">'],
    status: 'optional',
  },
  children: {
    doc: 'Menu content shown while the section is active.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const SidebarMenuGroupProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique id used for selection. Required for linked groups and generated for non-linked groups when omitted.',
    type: 'string',
    status: 'optional',
  },
  text: {
    doc: 'Visible group title.',
    type: 'React.ReactNode',
    status: 'optional',
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
    type: 'Omit<BadgeProps, "content" | "children">',
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
  headingLevel: {
    doc: 'Semantic heading level.',
    type: 'number',
    defaultValue: '2',
    status: 'optional',
  },
}
