import React from 'react'
import clsx from 'clsx'
import ModalInner, { ModalInnerProps } from '../../modal/parts/ModalInner'
import type { SectionStyle } from '../../Section'

type DrawerBodyProps = {
  /**
   * Give the inner content wrapper a class name (maps to `dnb-drawer__body`).
   */
  className?: string

  /**
   * Color/Style of the drawer body
   */
  styleType?: SectionStyle
} & ModalInnerProps

export default function DrawerBody({
  className,
  styleType,
  ref,
  ...props
}: DrawerBodyProps & React.HTMLProps<HTMLElement>) {
  return (
    <ModalInner
      {...props}
      backgroundColor={styleType}
      className={clsx('dnb-drawer__body', className)}
    />
  )
}
