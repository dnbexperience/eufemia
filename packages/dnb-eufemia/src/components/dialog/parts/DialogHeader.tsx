import type { HTMLProps } from 'react'
import clsx from 'clsx'
import type { ModalHeaderProps } from '../../modal/parts/ModalHeader'
import ModalHeader from '../../modal/parts/ModalHeader'
import type { SpacingProps } from '../../../shared/types'

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
}: DialogHeaderProps & Omit<HTMLProps<HTMLElement>, 'size' | 'children'>) {
  return (
    <ModalHeader
      {...props}
      size={size}
      className={clsx('dnb-dialog__header', className)}
      titleClass={clsx('dnb-dialog__title', titleClass)}
    />
  )
}
