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
   * Color/Style of the dialog body
   */
  styleType?: SectionBackgroundColor
} & ModalInnerProps

export default function DialogBody({
  className,
  styleType,
  ref,
  ...props
}: DialogBodyProps & React.HTMLProps<HTMLElement>) {
  return (
    <ModalInner
      {...props}
      backgroundColor={styleType}
      className={clsx('dnb-dialog__body', className)}
    />
  )
}
