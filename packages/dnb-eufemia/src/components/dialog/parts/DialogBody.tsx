import React from 'react'
import clsx from 'clsx'
import type { ModalInnerProps } from '../../modal/parts/ModalInner'
import ModalInner from '../../modal/parts/ModalInner'
import type { SectionBackgroundColor } from '../../Section'

type DialogBodyProps = {
  /**
   * Give the inner content wrapper a class name (maps to `dnb-dialog__body`).
   */
  className?: string

  /**
   * Background color of the dialog body.
   */
  backgroundColor?: SectionBackgroundColor
} & ModalInnerProps

export default function DialogBody({
  className,
  backgroundColor,
  ref,
  ...props
}: DialogBodyProps & React.HTMLProps<HTMLElement>) {
  return (
    <ModalInner
      {...props}
      backgroundColor={backgroundColor}
      className={clsx('dnb-dialog__body', className)}
    />
  )
}
