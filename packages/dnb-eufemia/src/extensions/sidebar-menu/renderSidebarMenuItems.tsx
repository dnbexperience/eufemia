import SidebarMenuAccordion from './SidebarMenuAccordion'
import SidebarMenuItem from './SidebarMenuItem'
import SidebarMenuGroup from './SidebarMenuGroup'
import SidebarMenuDivider from './SidebarMenuDivider'
import { clsx } from 'clsx'
import type { SidebarMenuItemData } from './types'
import type { ReactNode } from 'react'

export default function renderSidebarMenuItems(
  items: SidebarMenuItemData[]
) {
  return items.flatMap((item) => {
    const { dividerBefore, ...itemProps } = item
    const divider = dividerBefore ? (
      <SidebarMenuDivider key={`${item.id}-divider`} />
    ) : null
    let content: ReactNode

    if (item.type === 'custom') {
      content = (
        <li
          key={item.id}
          className={clsx('dnb-sidebar-menu__custom', item.className)}
        >
          {item.content}
        </li>
      )
    } else if (item.type === 'group') {
      content = (
        <SidebarMenuGroup
          key={item.id}
          id={item.id}
          text={item.text}
          icon={item.icon}
          badge={item.badge}
          suffix={item.suffix}
          badgeProps={item.badgeProps}
          href={item.href}
          to={item.to}
          element={item.element}
          target={item.target}
          rel={item.rel}
          onClick={item.onClick}
          disabled={item.disabled}
          className={item.className}
        >
          {item.items ? renderSidebarMenuItems(item.items) : null}
        </SidebarMenuGroup>
      )
    } else if (item.items) {
      content = (
        <SidebarMenuAccordion
          key={item.id}
          id={item.id}
          text={item.text}
          icon={item.icon}
          badge={item.badge}
          suffix={item.suffix}
          badgeProps={item.badgeProps}
          href={item.href}
          to={item.to}
          element={item.element}
          target={item.target}
          rel={item.rel}
          onClick={item.onClick}
          disabled={item.disabled}
          collapsible={item.collapsible}
        >
          {renderSidebarMenuItems(item.items)}
        </SidebarMenuAccordion>
      )
    } else {
      const { content: _content, type: _type, ...props } = itemProps
      content = <SidebarMenuItem key={item.id} {...props} />
    }

    return divider ? [divider, content] : [content]
  })
}
