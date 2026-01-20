/**
 * HTML Element
 *
 */
import React from 'react'
import P, { PProps } from './P'
import clsx from 'clsx'

const Lead = ({ className, ...rest }: PProps) => (
  <P className={clsx('dnb-p--lead', className)} {...rest} />
)

Lead._supportsSpacingProps = true

export default Lead
