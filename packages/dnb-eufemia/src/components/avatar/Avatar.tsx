import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

// Elements
import Img, { ImgProps } from '../../elements/Img'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps, SkeletonTypes } from '../../shared/interfaces'
import { warn } from '../../shared/component-helper'
import { usePropsWithContext } from '../../shared/hooks'

// Internal
import AvatarGroup, { AvatarGroupContext } from './AvatarGroup'

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

const Avatar = (localProps: AvatarProps & ISpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  const avatarGroupContext = React.useContext(AvatarGroupContext)

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
  } = usePropsWithContext(
    localProps,
    defaultProps,
    context?.Avatar,
    avatarGroupContext
  )

  let children = null

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const childrenIsString = typeof childrenProp === 'string'

  if (src || imgProps) {
    const imageProps = { src, alt, ...imgProps }
    children = <Img {...imageProps} />
  } else if (childrenIsString) {
    const firstLetterUpperCase = childrenProp.charAt(0).toUpperCase()
    children = (
      <span data-testid="avatar-text" aria-hidden>
        {firstLetterUpperCase}
      </span>
    )
  } else {
    children = childrenProp
  }

  if (!avatarGroupContext) {
    warn(
      `Avatar group required: An Avatar requires an Avatar.Group with label description as a parent component. This is to ensure correct semantic and accessibility.`
    )
  }

  return (
    <span
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
      {childrenIsString && (
        <span data-testid="avatar-label" className="dnb-sr-only">
          {childrenProp}
        </span>
      )}
      {children}
    </span>
  )
}

Avatar.Group = AvatarGroup

export { AvatarGroup }

export default Avatar
