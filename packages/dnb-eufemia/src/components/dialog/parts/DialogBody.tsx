import React from 'react'
import classnames from 'classnames'
import ModalInner, { ModalInnerProps } from '../../modal/parts/ModalInner'
import { SectionStyleTypes } from '../../Section'

interface DialogBodyProps extends ModalInnerProps {
  /**
   * Give the inner content wrapper a class name (maps to `dnb-dialog__body`).
   */
  className?: string

  /**
   * Color/Style of the dialog body
   */
  styleType?: SectionStyleTypes
}

export default function DialogBody({
  className,
  styleType,
  ref, //eslint-disable-line
  ...props
}: DialogBodyProps) {
  return (
    <ModalInner
      {...props}
      style_type={styleType}
      className={classnames('dnb-dialog__body', className)}
    />
  )
}
