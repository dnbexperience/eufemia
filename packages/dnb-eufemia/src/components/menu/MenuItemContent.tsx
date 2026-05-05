import type { ReactNode } from 'react'
import IconPrimary from '../IconPrimary'
import type { IconIcon } from '../icon/Icon'

export type MenuItemContentProps = {
  icon?: IconIcon
  text?: ReactNode
  children?: ReactNode
}

export default function MenuItemContent({
  icon,
  text,
  children,
}: MenuItemContentProps) {
  return (
    <>
      {icon && (
        <span className="dnb-menu__action__icon">
          <IconPrimary icon={icon} />
        </span>
      )}
      {text && <span className="dnb-menu__action__text">{text}</span>}
      {children}
    </>
  )
}
