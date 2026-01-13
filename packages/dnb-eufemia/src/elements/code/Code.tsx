/**
 * HTML Element
 *
 */

import React from 'react'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'

type CodeProps = SpacingProps & React.HTMLAttributes<HTMLElement>

const Code = React.forwardRef((props: CodeProps, ref) => (
  <E as="code" innerRef={ref} {...props} />
))

// @ts-expect-error - Adding custom property to component for spacing detection
Code._supportsSpacingProps = true

export default Code
