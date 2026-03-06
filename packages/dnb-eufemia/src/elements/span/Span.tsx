/**
 * HTML Element
 *
 */

import React from 'react'
import Typography, { TypographyProps } from '../typography/Typography'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { TypographyProps } from '../typography/Typography'
import Typography from '../typography/Typography'

type SpanProps = TypographyProps<HTMLSpanElement>

function Span({
  ref,
  ...props
}: SpanProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return <Typography element="span" ref={ref} {...props} />
}

withComponentMarkers(Span, { _supportsSpacingProps: true })

export default Span
