/**
 * HTML Element
 *
 */

import React, { ReactNode } from 'react'
//import PropTypes from 'prop-types'
//import { spacingPropTypes } from '../../components/space/SpacingHelper'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'

type BlockquoteProps = SpacingProps & {
  children?: ReactNode | ReactNode[]
}

const Blockquote = React.forwardRef((props: BlockquoteProps, ref) => (
  <E as="blockquote" skeletonMethod="font" innerRef={ref} {...props} />
))
/* Blockquote.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node,
}
Blockquote.defaultProps = {
  children: null,
} */

export default Blockquote
