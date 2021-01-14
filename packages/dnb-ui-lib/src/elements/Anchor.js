/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Anchor = React.forwardRef(({ ...props }, ref) => {
  if (props.target === '_blank' && typeof props.children !== 'string') {
    // can be icon only or what ever content
    // because we then don't want to disctract the link out
    // we make sure we hide the icon
    props.className = classnames(props.className, 'dnb-anchor--no-icon')
  }
  return (
    <E
      ref={ref}
      is="a"
      class="dnb-anchor"
      className={props.className}
      {...props}
    />
  )
})
Anchor.propTypes = {
  ...spacingPropTypes,

  href: PropTypes.string,
  target: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  children: PropTypes.node
}
Anchor.defaultProps = {
  href: null,
  target: null,
  className: null,
  children: null
}
Anchor.tagName = 'dnb-anchor'

export default Anchor
