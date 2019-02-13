import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Img = ({ alt, src, children, height, caption }) => {
  return (
    <Fragment>
      <figure className="image-box">
        <img alt={alt || caption} src={src || children} height={height} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </Fragment>
  )
}

Img.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.node,
  src: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  caption: PropTypes.string
}
Img.defaultProps = {
  caption: null,
  alt: null,
  src: null,
  height: null,
  children: null
}

export default Img
