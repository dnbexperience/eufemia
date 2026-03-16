import React from 'react'
import clsx from 'clsx'
import ModalHeader, {
  ModalHeaderProps,
} from '../../modal/parts/ModalHeader'
import type { SpacingProps } from '../../space/types'

type DialogHeaderProps = {
  titleClass?: string
} & ModalHeaderProps &
  SpacingProps

export default function DialogHeader({
  className,
  titleClass,
  size = 'large',
  ref,
  ...props
}: DialogHeaderProps &
  Omit<React.HTMLProps<HTMLElement>, 'size' | 'children'>) {
  return (
    <ModalHeader
      {...props}
      size={size}
      className={clsx('dnb-dialog__header', className)}
      titleClass={clsx('dnb-dialog__title', titleClass)}
    />
  )
}
