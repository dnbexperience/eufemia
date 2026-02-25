/**
 * HTML Element
 *
 */

import React from 'react'
import Typography, { TypographyProps } from '../typography/Typography'

type SpanProps = TypographyProps<HTMLSpanElement>

function Span({
  ref,
  ...props
}: SpanProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return <Typography element="span" innerRef={ref} {...props} />
}

Span._supportsSpacingProps = true

export default Span
