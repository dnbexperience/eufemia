/**
 * HTML Element
 *
 */

import React from 'react'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'

type SpanProps = SpacingProps & React.HTMLAttributes<HTMLElement>

const Span = React.forwardRef((props: SpanProps, ref) => (
  <E as="span" innerRef={ref} {...props} />
))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Span._supportsSpacingProps = true

export default Span
