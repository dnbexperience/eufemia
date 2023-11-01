import React from 'react'
import classnames from 'classnames'
import ModalInner, { ModalInnerProps } from '../../modal/parts/ModalInner'
import type { SectionStyleTypes } from '../../Section'

interface DrawerBodyProps extends ModalInnerProps {
  /**
   * Give the inner content wrapper a class name (maps to `dnb-drawer__body`).
   */
  className?: string

  /**
   * Color/Style of the drawer body
   */
  styleType?: SectionStyleTypes
}

export default function DrawerBody({
  className,
  styleType,
  ref, //eslint-disable-line
  ...props
}: DrawerBodyProps & React.HTMLProps<HTMLElement>) {
  return (
    <ModalInner
      {...props}
      backgroundColor={styleType}
      className={classnames('dnb-drawer__body', className)}
    />
  )
}
