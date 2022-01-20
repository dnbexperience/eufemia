import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

// Elements
import { ImgProps } from '../../elements/Img'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps, SkeletonTypes } from '../../shared/interfaces'
import { extendPropsWithContext } from '../../shared/component-helper'
import { Img } from '../..'

// Internal
import AvatarGroup from './AvatarGroup'

export * from './AvatarGroup'

export type AvatarSizes = 'small' | 'medium' | 'large' | 'x-large'
export type AvatarVariants = 'primary' | 'secondary' | 'tertiary'

export interface AvatarProps {
  /**
   * Used in combination with `src` to provide an alt attribute for the `img` element.
   * Default: null
   */
  alt?: string

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonTypes

  /**
   * The content of the component. Can be used instead of prop "data".
   * Default: null
   */
  children?: React.ReactNode

  /**
   * The size of the component.
   * Default: medium.
   */
  size?: AvatarSizes

  /**
   * Specifies the path to the image
   * Default: null
   */
  src?: string

  /**
   * Props applied to the `img` element if the component is used to display an image.
   * Default: null
   */
  imgProps?: ImgProps

  /**
   * The variant of the component.
   * Default: primary.
   */
  variant?: AvatarVariants
}

export const defaultProps = {
  alt: null,
  className: null,
  size: 'medium',
  src: null,
  imgProps: null,
  variant: 'primary',
  skeleton: false,
  children: null,
}

function Avatar(localProps: AvatarProps & ISpacingProps) {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    alt,
    className,
    children: childrenProp,
    size,
    skeleton,
    variant,
    src,
    imgProps,
    ...props
  } = extendPropsWithContext(
    { ...defaultProps, ...localProps },
    defaultProps,
    context?.Avatar
  )

  let children = null

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  if (src || imgProps) {
    const imageProps = { src, alt, ...imgProps }
    children = <Img {...imageProps} />
  } else {
    children = childrenProp
  }

  return (
    <div
      className={classnames(
        'dnb-avatar',
        `dnb-avatar--${variant || 'primary'}`,
        `dnb-avatar--size-${size || 'medium'}`,
        skeletonClasses,
        spacingClasses,
        className
      )}
      data-testid="avatar"
      {...props}
    >
      {children}
    </div>
  )
}

Avatar.Group = AvatarGroup

export { AvatarGroup }

export default Avatar
