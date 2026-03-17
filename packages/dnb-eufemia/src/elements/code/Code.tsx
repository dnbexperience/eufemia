/**
 * HTML Element
 *
 */

import React from 'react'
import type { SpacingProps } from '../../components/space/types'
import E from '../Element'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

type CodeProps = SpacingProps & React.HTMLAttributes<HTMLElement>

function Code({
  ref,
  ...props
}: CodeProps & { ref?: React.Ref<HTMLElement> }) {
  return <E as="code" ref={ref} {...props} />
}

withComponentMarkers(Code, { _supportsSpacingProps: true })

export default Code
