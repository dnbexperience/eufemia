/**
 * HTML Element
 *
 */

import type { Ref } from 'react'
import type { TypographyProps } from '../typography/Typography'
import Typography from '../typography/Typography'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

type SpanProps = TypographyProps<HTMLSpanElement>

function Span({
  ref,
  ...props
}: SpanProps & { ref?: Ref<HTMLSpanElement> }) {
  return <Typography element="span" ref={ref} {...props} />
}

withComponentMarkers(Span, { _supportsSpacingProps: true })

export default Span
