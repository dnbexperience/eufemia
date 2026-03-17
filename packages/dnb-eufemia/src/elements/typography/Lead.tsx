/**
 * HTML Element
 *
 */
import React from 'react'
import type { PProps } from './P'
import P from './P'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

const Lead = ({ className, ...rest }: PProps) => (
  <P className={clsx('dnb-p--lead', className)} {...rest} />
)

withComponentMarkers(Lead, { _supportsSpacingProps: true })

export default Lead
