/**
 * HTML Element
 *
 */

import React from 'react'
import type { SpacingProps } from '../../components/space/types'
import E from '../Element'

export type DivProps = SpacingProps & React.HTMLAttributes<HTMLElement>

const Div = React.forwardRef((props: DivProps, ref) => (
  <E as="div" skeletonMethod="shape" innerRef={ref} {...props} />
))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Adding custom property to component for spacing detection
Div._supportsSpacingProps = true

export default Div
