import type { ReactElement, ReactNode } from 'react'
import Dropdown from '../../components/Dropdown'
import Icon from '../../components/icon/Icon'
import { chevron_down, chevron_up } from '../../icons'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SidebarMenuSectionProps } from './types'

export default function SidebarMenuSection(
  _props: SidebarMenuSectionProps
) {
  return null
}

const sectionIcon = Icon.transition({
  closed: chevron_down,
  open: chevron_up,
})

function renderSelector(
  sections: ReactElement<SidebarMenuSectionProps>[],
  {
    activeSection,
    sectionLabel,
    selectSection,
    setHoveredSection,
  }: {
    activeSection?: string
    sectionLabel?: ReactNode
    selectSection: (id: string) => void
    setHoveredSection: (id?: string) => void
  }
) {
  return (
    <Dropdown
      className="dnb-sidebar-menu__sections"
      portalClass="dnb-sidebar-menu__sections-portal"
      value={activeSection}
      label={sectionLabel}
      labelSrOnly
      data={sections.map(({ props }) => {
        const content = props.icon ? (
          <Dropdown.HorizontalItem className="dnb-sidebar-menu__section-label">
            <Icon icon={props.icon} />
            {props.text}
          </Dropdown.HorizontalItem>
        ) : (
          props.text
        )

        return { selectedKey: props.id, selectedValue: content, content }
      })}
      onItemMouseEnter={({ item, event }) => {
        setHoveredSection(sections[item]?.props.id)
        event.currentTarget
          .closest('.dnb-drawer-list')
          ?.addEventListener(
            'mouseleave',
            () => setHoveredSection(undefined),
            { once: true }
          )
      }}
      onClose={() => setHoveredSection(undefined)}
      onChange={({ data }) => {
        setHoveredSection(undefined)
        if (typeof data?.selectedKey === 'string') {
          selectSection(data.selectedKey)
        }
      }}
      size="medium"
      icon={sectionIcon}
      stretch
    />
  )
}

withComponentMarkers(SidebarMenuSection, { _sidebarMenuRole: 'section' })
Object.assign(SidebarMenuSection, { _renderSelector: renderSelector })
