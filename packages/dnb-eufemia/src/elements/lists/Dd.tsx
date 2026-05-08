/**
 * HTML Element
 *
 */

import type { ReactNode, Ref } from 'react'
import type { SpacingProps } from '../../shared/types'
import E from '../Element'

export type DdProps = {
  className?: string
  children: ReactNode
}

function Dd({
  ref,
  ...props
}: DdProps & SpacingProps & { ref?: Ref<HTMLElement> }) {
  return <E as="dd" ref={ref} {...props} />
}

export default Dd
