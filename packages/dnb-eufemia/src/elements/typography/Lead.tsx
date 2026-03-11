/**
 * HTML Element
 *
 */
import React from 'react'
import P, { PProps } from './P'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

const Lead = ({ className, ...rest }: PProps) => (
  <P className={clsx('dnb-p--lead', className)} {...rest} />
)

export default withComponentMarkers(Lead, { _supportsSpacingProps: true })
