import { isValidElement } from 'react'
import type { ComponentType, ReactNode } from 'react'
import clsx from 'clsx'
import { Img as Image } from '@dnb/eufemia/src'

type ImgProps = {
  className?: string
  alt?: string
  src?: string | ReactNode
  children?: ReactNode
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

  let finalSrc: string | ReactNode = src || children

  if (isValidElement(src)) {
    const Svg = src.type as ComponentType<{
      alt?: string
      width?: string | number
      height?: string | number
    }>
    finalSrc = <Svg alt={alt || caption} {...props} />
  }

  return (
    <Image
      className={clsx('image-box', className)}
      alt={alt || caption}
      caption={caption}
      src={finalSrc as string}
      {...props}
      {...rest}
    />
  )
}

export default Img
