import type { ReactElement, ReactNode, RefObject } from 'react'
import { clsx } from 'clsx'
import Dropdown from '../../components/Dropdown'
import Icon from '../../components/icon/Icon'
import { chevron_down, chevron_up } from '../../icons'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import SidebarMenuBadge from './SidebarMenuBadge'
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

function supportsHover() {
  return (
    !window.matchMedia ||
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
}

function renderSelector(
  sections: ReactElement<SidebarMenuSectionProps>[],
  {
    activeSection,
    sectionLabel,
    sectionSelectorOpenRef,
    selectSection,
    setHoveredSection,
  }: {
    activeSection?: string
    sectionLabel?: ReactNode
    sectionSelectorOpenRef: RefObject<boolean>
    selectSection: (id: string) => void
    setHoveredSection: (id?: string) => void
  }
) {
  const activeSectionProps = sections.find(
    ({ props }) => props.id === activeSection
  )?.props

  return (
    <Dropdown
      className={clsx(
        'dnb-sidebar-menu__sections',
        activeSectionProps?.icon && 'dnb-sidebar-menu__sections--has-icon'
      )}
      portalClass="dnb-sidebar-menu__sections-portal"
      value={activeSection}
      label={sectionLabel}
      labelSrOnly
      data={sections.map(({ props }) => {
        const content =
          props.icon || props.badge !== undefined ? (
            <Dropdown.HorizontalItem className="dnb-sidebar-menu__section-label">
              {props.icon && <Icon icon={props.icon} />}
              {props.text}
              <SidebarMenuBadge
                badge={props.badge}
                badgeProps={{
                  variant: 'notification',
                  ...props.badgeProps,
                }}
              />
            </Dropdown.HorizontalItem>
          ) : (
            props.text
          )

        const selectedValue = (
          <Dropdown.HorizontalItem className="dnb-sidebar-menu__section-label">
            {props.icon && (
              <span className="dnb-sidebar-menu__item__icon">
                <Icon icon={props.icon} />
              </span>
            )}
            <span className="dnb-sidebar-menu__item__text">
              {props.text}
            </span>
            <SidebarMenuBadge
              badge={props.triggerBadge}
              badgeProps={{
                variant: 'notification',
                ...props.triggerBadgeProps,
              }}
            />
          </Dropdown.HorizontalItem>
        )

        return { selectedKey: props.id, selectedValue, content }
      })}
      onItemMouseEnter={({ item, event }) => {
        if (!supportsHover() || !sectionSelectorOpenRef.current) {
          return
        }

        setHoveredSection(sections[item]?.props.id)
        event.currentTarget
          .closest('.dnb-drawer-list')
          ?.addEventListener(
            'mouseleave',
            () => setHoveredSection(undefined),
            { once: true }
          )
      }}
      onOpen={() => {
        sectionSelectorOpenRef.current = true
      }}
      onClose={() => {
        sectionSelectorOpenRef.current = false
        setHoveredSection(undefined)
      }}
      onChange={({ data }) => {
        sectionSelectorOpenRef.current = false
        setHoveredSection(undefined)
        if (typeof data?.selectedKey === 'string') {
          selectSection(data.selectedKey)
        }
      }}
      size="medium"
      icon={sectionIcon}
      noDivider
      stretch
    />
  )
}

withComponentMarkers(SidebarMenuSection, { _sidebarMenuRole: 'section' })
Object.assign(SidebarMenuSection, { _renderSelector: renderSelector })
