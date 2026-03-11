/**
 * HTML Element
 *
 */

import React from 'react'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type DivProps = SpacingProps & React.HTMLAttributes<HTMLElement>

function Div({
  ref,
  ...props
}: DivProps & { ref?: React.Ref<HTMLElement> }) {
  return <E as="div" skeletonMethod="shape" ref={ref} {...props} />
}

withComponentMarkers(Div, { _supportsSpacingProps: true })

export default Div
