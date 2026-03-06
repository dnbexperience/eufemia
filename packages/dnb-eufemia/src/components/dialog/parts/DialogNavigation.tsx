import React from 'react'
import clsx from 'clsx'
import type { ModalHeaderBarProps } from '../../modal/parts/ModalHeaderBar'
import ModalHeaderBar from '../../modal/parts/ModalHeaderBar'

export default function DialogNavigation({
  className,
  ref,
  ...props
}: ModalHeaderBarProps & Omit<React.HTMLProps<HTMLElement>, 'children'>) {
  return (
    <ModalHeaderBar
      {...props}
      className={clsx('dnb-dialog__navigation', className)}
      shadowClass="dnb-dialog__navigation--sticky"
    />
  )
}
