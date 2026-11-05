import { Children, useContext } from 'react'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import { createSkeletonClass } from '../../components/skeleton/SkeletonHelper'
import type { SidebarMenuHeaderProps } from './types'
import useId from '../../shared/helpers/useId'
import {
  SidebarMenuContext,
  useSidebarMenuContext,
} from './SidebarMenuContext'

export default function SidebarMenuHeader(props: SidebarMenuHeaderProps) {
  const {
    id,
    className,
    text,
    children,
    style,
    headingLevel: _headingLevel,
    ...rest
  } = props
  const titleId = `${useId(id)}-title`
  const { skeleton } = useContext(Context)
  const context = useSidebarMenuContext()
  const headerStyle = {
    ...style,
    '--sidebar-menu-indent': `${context.indent}rem`,
  } as React.CSSProperties
  const skeletonClass = createSkeletonClass('font', skeleton)
  const hasText = text !== undefined && text !== null
  const label = hasText ? text : children
  const hasItems = hasText && Children.toArray(children).length > 0

  if (!hasItems) {
    return (
      <li
        {...rest}
        id={id}
        style={headerStyle}
        className={clsx(
          'dnb-sidebar-menu__header',
          skeletonClass,
          className
        )}
      >
        {label}
      </li>
    )
  }

  return (
    <li
      {...rest}
      id={id}
      style={headerStyle}
      className={clsx(
        'dnb-sidebar-menu__group dnb-sidebar-menu__header-group',
        className
      )}
    >
      <div
        id={titleId}
        className={clsx('dnb-sidebar-menu__header', skeletonClass)}
      >
        {label}
      </div>
      <SidebarMenuContext
        value={{
          ...context,
          indent: context.indent ? context.indent + 1 : 0,
        }}
      >
        <ul
          className="dnb-sidebar-menu__list dnb-sidebar-menu__group__list"
          aria-labelledby={titleId}
        >
          {children}
        </ul>
      </SidebarMenuContext>
    </li>
  )
}
