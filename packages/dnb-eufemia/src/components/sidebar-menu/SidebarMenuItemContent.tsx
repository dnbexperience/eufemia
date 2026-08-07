import type { ReactNode } from 'react'
import IconPrimary from '../IconPrimary'
import type { IconIcon } from '../icon/Icon'

export default function SidebarMenuItemContent({
  icon,
  text,
  children,
}: {
  icon?: IconIcon
  text?: ReactNode
  children?: ReactNode
}) {
  return (
    <>
      {icon && (
        <span className="dnb-sidebar-menu__item__icon">
          <IconPrimary icon={icon} />
        </span>
      )}
      <span className="dnb-sidebar-menu__item__text">
        {text ?? children}
      </span>
    </>
  )
}
