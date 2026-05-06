import type { HTMLProps } from 'react'
import clsx from 'clsx'
import type { ModalInnerProps } from '../../modal/parts/ModalInner'
import ModalInner from '../../modal/parts/ModalInner'

type DialogBodyProps = {
  /**
   * Give the inner content wrapper a class name (maps to `dnb-dialog__body`).
   */
  className?: string
} & ModalInnerProps

export default function DialogBody({
  className,
  ref,
  ...props
}: DialogBodyProps & HTMLProps<HTMLElement>) {
  return (
    <ModalInner
      {...props}
      className={clsx('dnb-dialog__body', className)}
    />
  )
}
