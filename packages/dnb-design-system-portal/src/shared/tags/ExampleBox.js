/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

const ExampleBox = ({ children, caption, ...rest }) => {
  return (
    <>
      <div className="example-box" {...rest}>
        {children}
      </div>
      {caption && <p className="dnb-p example-caption">{caption}</p>}
    </>
  )
}
ExampleBox.propTypes = {
  children: PropTypes.node.isRequired,
  caption: PropTypes.string,
}
ExampleBox.defaultProps = {
  caption: null,
}

export default ExampleBox
