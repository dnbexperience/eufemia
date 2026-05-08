/**
 * HTML Element
 *
 */

import type { HTMLAttributes, Ref } from 'react'
import type { SpacingProps } from '../../shared/types'
import E from '../Element'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type DivProps = SpacingProps & HTMLAttributes<HTMLElement>

function Div({ ref, ...props }: DivProps & { ref?: Ref<HTMLElement> }) {
  return <E as="div" skeletonMethod="shape" ref={ref} {...props} />
}

withComponentMarkers(Div, { _supportsSpacingProps: true })

export default Div
