/**
 * HTML Element
 *
 */

import React from 'react'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'

type CodeProps = SpacingProps & React.HTMLAttributes<HTMLElement>

function Code({
  ref,
  ...props
}: CodeProps & { ref?: React.Ref<HTMLElement> }) {
  return <E as="code" ref={ref} {...props} />
}

Code._supportsSpacingProps = true

export default Code
