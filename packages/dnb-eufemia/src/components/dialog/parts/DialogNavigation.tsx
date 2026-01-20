import React from 'react'
import clsx from 'clsx'
import ModalHeaderBar, {
  ModalHeaderBarProps,
} from '../../modal/parts/ModalHeaderBar'

export default function DialogNavigation({
  className,
  ref, //eslint-disable-line
  ...props
}: ModalHeaderBarProps & Omit<React.HTMLProps<HTMLElement>, 'children'>) {
  return (
    <ModalHeaderBar
      {...props}
      className={clsx('dnb-dialog__navigation', className)}
    />
  )
}
