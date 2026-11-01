import { useContext } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import IconPrimary from '../../components/IconPrimary'
import type { IconIcon } from '../../components/icon/Icon'
import { createSkeletonClass } from '../../components/skeleton/SkeletonHelper'
import Context from '../../shared/Context'

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
  const { skeleton } = useContext(Context)

  return (
    <>
      {icon && (
        <span className="dnb-sidebar-menu__item__icon">
          <IconPrimary icon={icon} />
        </span>
      )}
      <span
        className={clsx(
          'dnb-sidebar-menu__item__text',
          createSkeletonClass('font', skeleton)
        )}
      >
        {text ?? children}
        {textSuffix}
      </span>
    </>
  )
}
