import type { PropertiesTableProps } from '../../shared/types'

export const MenuRootProperties: PropertiesTableProps = {
  open: {
    doc: 'Controlled open state. Use together with `onOpenChange`.',
    type: 'boolean',
    status: 'optional',
  },
  arrowPosition: {
    doc: 'Position of the popover arrow relative to the popover. `top` and `bottom` positions are only applicable when `placement` is `left` or `right`, and vice versa.',
    type: ['"left"', '"right"', '"center"', '"top"', '"bottom"'],
    defaultValue: '"center"',
    status: 'optional',
  },
  placement: {
    doc: 'Preferred placement of the menu relative to the trigger.',
    type: ['"top"', '"right"', '"bottom"', '"left"'],
    defaultValue: '"bottom"',
    status: 'optional',
  },
  autoAlignMode: {
    doc: 'Control when the menu automatically flips its placement to fit within the viewport. `"initial"`: flip only on open. `"scroll"`: also flip during scroll. `"never"`: always use specified placement.',
    type: ['"initial"', '"scroll"', '"never"'],
    defaultValue: '"initial"',
    status: 'optional',
  },
  skipPortal: {
    doc: 'Render inline instead of inside a portal.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  noAnimation: {
    doc: 'Disable the open/close animation.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
}

export const MenuRootEvents: PropertiesTableProps = {
  onOpenChange: {
    doc: 'Called whenever the open state changes. Receives the new open state as a boolean.',
    type: '(open: boolean) => void',
    status: 'optional',
  },
}

export const MenuButtonProperties: PropertiesTableProps = {
  icon: {
    doc: 'Icon displayed on the trigger button.',
    type: 'IconIcon',
    defaultValue: '"more"',
    status: 'optional',
  },
  variant: {
    doc: 'Button variant.',
    type: ['"primary"', '"secondary"', '"tertiary"'],
    defaultValue: '"secondary"',
    status: 'optional',
  },
  text: {
    doc: 'Visible text label for the trigger button.',
    type: 'string',
    status: 'optional',
  },
  '[Button props]': {
    doc: 'All [Button](/uilib/components/button/properties) props are supported.',
    type: 'Various',
    status: 'optional',
  },
}

export const MenuListProperties: PropertiesTableProps = {
  children: {
    doc: 'Menu items. Use `Menu.Action` and `Menu.Divider` as direct children.',
    type: 'React.ReactNode',
    status: 'required',
  },
}

export const MenuActionProperties: PropertiesTableProps = {
  text: {
    doc: 'Action label text.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  icon: {
    doc: 'Icon displayed before the text.',
    type: 'IconIcon',
    status: 'optional',
  },
  href: {
    doc: 'When provided, the action renders as a link.',
    type: 'string',
    status: 'optional',
  },
  to: {
    doc: 'Use this property when using a router Link component as the `element`. The `to` value is passed to the router element for client-side navigation.',
    type: 'string',
    status: 'optional',
  },
  element: {
    doc: 'Define what HTML or React element should be used for the link (e.g. `element={Link}` for a router Link component). Defaults to a semantic `a` element.',
    type: 'React.Element',
    status: 'optional',
  },
  target: {
    doc: 'Link target attribute (e.g. `_blank`).',
    type: 'string',
    status: 'optional',
  },
  rel: {
    doc: 'Link rel attribute (e.g. `noopener noreferrer`).',
    type: 'string',
    status: 'optional',
  },
  disabled: {
    doc: 'Disables the action. Sets `aria-disabled` and prevents click/keyboard activation.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  children: {
    doc: 'Custom content rendered inside the action item.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const MenuActionEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Called when the action is clicked or activated via keyboard (Enter/Space). The menu closes automatically after the handler is invoked unless used as a trigger for a nested `Menu.Root`.',
    type: '(event: React.MouseEvent<HTMLLIElement>) => void',
    status: 'optional',
  },
}

export const MenuAccordionProperties: PropertiesTableProps = {
  text: {
    doc: 'Accordion trigger label text.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  icon: {
    doc: 'Icon displayed before the text.',
    type: 'IconIcon',
    status: 'optional',
  },
  disabled: {
    doc: 'Disables the accordion trigger. Sets `aria-disabled` and prevents toggling.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  children: {
    doc: 'Menu items rendered inside the accordion when open. Use `Menu.Action` and `Menu.Divider` as children.',
    type: 'React.ReactNode',
    status: 'required',
  },
}

export const MenuHeaderProperties: PropertiesTableProps = {
  text: {
    doc: 'Header text displayed in the menu.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'Alternative to `text`. Content rendered inside the header.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}

export const MenuDividerProperties: PropertiesTableProps = {}
