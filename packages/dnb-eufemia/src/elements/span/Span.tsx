/**
 * HTML Element
 *
 */

import React from 'react'
import Typography, { TypographyProps } from '../typography/Typography'

type SpanProps = TypographyProps<HTMLSpanElement>

const Span = React.forwardRef((props: SpanProps, ref) => (
  <Typography element="span" innerRef={ref} {...props} />
))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Adding custom property to component for spacing detection
Span._supportsSpacingProps = true

export default Span
