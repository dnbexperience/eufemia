import SidebarMenuAccordion from './SidebarMenuAccordion'
import SidebarMenuItem from './SidebarMenuItem'
import type { SidebarMenuItemData } from './types'

export default function renderSidebarMenuItems(
  items: SidebarMenuItemData[]
) {
  return items.map((item) => {
    if (item.items) {
      return (
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
        >
          {renderSidebarMenuItems(item.items)}
        </SidebarMenuAccordion>
      )
    }

    return <SidebarMenuItem key={item.id} {...item} />
  })
}
