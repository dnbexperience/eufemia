import type { ReactNode } from 'react'
import IconPrimary from '../../components/IconPrimary'
import type { IconIcon } from '../../components/icon/Icon'

export default function SidebarMenuItemContent({
  icon,
  text,
  children,
  textSuffix,
}: {
  icon?: IconIcon
  text?: ReactNode
  children?: ReactNode
  textSuffix?: ReactNode
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
        {textSuffix}
      </span>
    </>
  )
}
