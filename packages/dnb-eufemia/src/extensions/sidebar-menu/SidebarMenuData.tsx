import SidebarMenuRoot from './SidebarMenuRoot'
import SidebarMenuSection from './SidebarMenuSection'
import renderSidebarMenuItems from './renderSidebarMenuItems'
import type { SidebarMenuDataProps } from './types'

export default function SidebarMenuData({
  data,
  sections,
  defaultActiveSection,
  ...rootProps
}: SidebarMenuDataProps) {
  return (
    <SidebarMenuRoot
      {...rootProps}
      defaultActiveSection={
        defaultActiveSection ??
        sections?.find((section) => section.defaultActive)?.id
      }
    >
      {sections?.length
        ? sections.map(({ items, ...section }) => (
            <SidebarMenuSection key={section.id} {...section}>
              {renderSidebarMenuItems(items)}
            </SidebarMenuSection>
          ))
        : renderSidebarMenuItems(data ?? [])}
    </SidebarMenuRoot>
  )
}
