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

export default Span
