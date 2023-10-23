/**
 * HTML Element
 *
 */
import React from 'react'
import P, { PProps } from './P'
import classnames from 'classnames'

const Lead = ({ className, ...rest }: PProps) => (
  <P className={classnames('dnb-p--lead', className)} {...rest} />
)

Lead._supportsSpacingProps = true

export default Lead
