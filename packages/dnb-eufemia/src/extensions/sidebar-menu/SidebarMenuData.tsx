import SidebarMenuRoot from './SidebarMenuRoot'
import SidebarMenuSection from './SidebarMenuSection'
import renderSidebarMenuItems from './renderSidebarMenuItems'
import type { SidebarMenuDataProps } from './types'
import { useSidebarMenuContent } from './SidebarMenuController'

export default function SidebarMenuData({
  data,
  sections,
  defaultActiveSection,
  controllerId,
  ...rootProps
}: SidebarMenuDataProps) {
  const content = useSidebarMenuContent(controllerId, data, sections)

  return (
    <SidebarMenuRoot
      {...rootProps}
      defaultActiveSection={
        defaultActiveSection ??
        content.sections?.find((section) => section.defaultActive)?.id
      }
    >
      {content.sections?.length
        ? content.sections.map(({ items, ...section }) => (
            <SidebarMenuSection key={section.id} {...section}>
              {renderSidebarMenuItems(items)}
            </SidebarMenuSection>
          ))
        : renderSidebarMenuItems(content.data ?? [])}
    </SidebarMenuRoot>
  )
}
