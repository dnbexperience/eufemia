import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Img as Image } from '@dnb/eufemia/src/elements'

const Img = ({
  className,
  alt,
  src,
  children,
  size,
  width,
  height,
  caption
}) => {
  if (size === 'auto') {
    width = '100%'
    height = '100%'
  }
  const props = { width, height }
  return (
    <Image
      className={classnames('image-box', className)}
      alt={alt || caption}
      caption={caption}
      src={src || children}
      {...props}
    />
  )
}

Img.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.node,
  src: PropTypes.string,
  size: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  caption: PropTypes.string
}
Img.defaultProps = {
  className: null,
  caption: null,
  alt: null,
  src: null,
  size: null,
  height: null,
  width: null,
  children: null
}

export default Img
