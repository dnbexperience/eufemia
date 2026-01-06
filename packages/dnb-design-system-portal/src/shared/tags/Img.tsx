import React from 'react'
import classnames from 'classnames'
import { Img as Image } from '@dnb/eufemia/src'

type ImgProps = {
  className?: string
  alt?: string
  src?: string | React.ReactNode
  children?: React.ReactNode
  size?: string
  width?: string | number
  height?: string | number
  caption?: string
}

const Img = ({
  className = null,
  alt = null,
  src = null,
  children = null,
  size = null,
  width = null,
  height = null,
  caption = null,
  ...rest
}: ImgProps) => {
  if (size === 'auto') {
    width = '100%'
    height = '100%'
  }
  const props = { width, height }

  let finalSrc: string | React.ReactNode = src || children

  if (React.isValidElement(src)) {
    const Svg = src.type as React.ComponentType<{
      alt?: string
      width?: string | number
      height?: string | number
    }>
    finalSrc = <Svg alt={alt || caption} {...props} />
  }

  return (
    <Image
      className={classnames('image-box', className)}
      alt={alt || caption}
      caption={caption}
      src={finalSrc as string}
      {...props}
      {...rest}
    />
  )
}

export default Img
