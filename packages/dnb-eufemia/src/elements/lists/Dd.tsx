/**
 * HTML Element
 *
 */

import React from 'react'
import type { SpacingProps } from '../../shared/types'
import E from '../Element'

export type DdProps = {
  className?: string
  children: React.ReactNode
}

function Dd({
  ref,
  ...props
}: DdProps & SpacingProps & { ref?: React.Ref<HTMLElement> }) {
  return <E as="dd" innerRef={ref} {...props} />
}

export default Dd
