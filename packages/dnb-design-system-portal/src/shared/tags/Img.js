import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Img = ({ alt, src, children, size, width, height, caption }) => {
  if (size === 'auto') {
    width = '100%'
    height = '100%'
  }
  const props = { width, height }
  return (
    <Fragment>
      <figure className="image-box">
        <img alt={alt || caption} src={src || children} {...props} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </Fragment>
  )
}

Img.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.node,
  src: PropTypes.string,
  size: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  caption: PropTypes.string
}
Img.defaultProps = {
  caption: null,
  alt: null,
  src: null,
  size: null,
  height: null,
  width: null,
  children: null
}

export default Img
