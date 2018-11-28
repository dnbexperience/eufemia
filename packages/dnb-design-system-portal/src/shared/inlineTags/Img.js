import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Img = ({ alt, src, height, caption }) => {
  return (
    <Fragment>
      <figure className="image-box">
        <img alt={alt} src={src} height={height} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </Fragment>
  )
}

Img.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  caption: PropTypes.string
}
Img.defaultProps = {
  caption: null,
  height: null
}

export default Img
