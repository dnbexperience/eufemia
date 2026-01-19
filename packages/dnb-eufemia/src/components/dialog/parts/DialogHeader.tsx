import React from 'react'
import classnames from 'classnames'
import ModalHeader, {
  ModalHeaderProps,
} from '../../modal/parts/ModalHeader'
import type { SpacingProps } from '../../space/types'

interface DialogHeaderProps extends ModalHeaderProps, SpacingProps {
  titleClass?: string
}

export default function DialogHeader({
  className,
  titleClass,
  size = 'large',
  ref, // eslint-disable-line
  ...props
}: DialogHeaderProps &
  Omit<React.HTMLProps<HTMLElement>, 'size' | 'children'>) {
  return (
    <ModalHeader
      {...props}
      size={size}
      className={classnames('dnb-dialog__header', className)}
      titleClass={classnames('dnb-dialog__title', titleClass)}
    />
  )
}
