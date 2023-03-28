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

export default Code
