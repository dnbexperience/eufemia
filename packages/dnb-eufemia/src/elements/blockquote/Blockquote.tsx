/**
 * HTML Element
 *
 */

import React, { ReactNode } from 'react'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'

type BlockquoteProps = SpacingProps & {
  children?: ReactNode | ReactNode[]
}

const Blockquote = React.forwardRef((props: BlockquoteProps, ref) => (
  <E as="blockquote" skeletonMethod="font" innerRef={ref} {...props} />
))

export default Blockquote
