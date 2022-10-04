import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { AvatarSizes, AvatarVariants } from './Avatar'

// Shared
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { SpacingProps } from '../../shared/types'
import { SkeletonShow } from '../skeleton/Skeleton'

export interface AvatarGroupProps {
  /**
   * Label to describe the avatar group
   * Default: null
   */
  label: React.ReactNode

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Number of max displayed elements, including the "elements hidden text (+x)".
   * Default: 4
   */
  maxElements?: number

  /**
   * The avatars to group.
   * Default: null
   */
  children?: React.ReactNode

  /**
   * The size of the Avatars, and "elements hidden text (+x)".
   * Default: medium.
   */
  size?: AvatarSizes

  /**
   * The variant of the Avatars.
   * Default: primary.
   */
  variant?: AvatarVariants

  /**
   * Skeleton should be applied when loading content
   * Default: false
   */
  skeleton?: SkeletonShow
}

export const defaultProps = {
  label: null,
  className: null,
  maxElements: 4,
  size: 'medium',
  children: null,
  variant: 'primary',
  skeleton: false,
}

export const AvatarGroupContext = React.createContext(null)

const AvatarGroup = (localProps: AvatarGroupProps & SpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    label,
    className,
    children: childrenProp,
    size,
    maxElements: maxElementsProp,
    variant,
    ...props
  } = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.AvatarGroup,
    {
      skeleton: context?.skeleton,
    }
  )

  const maxElements =
    maxElementsProp && maxElementsProp > 0 ? maxElementsProp : 4

  let children = childrenProp
  let numOfHiddenAvatars = 0

  if (Array.isArray(childrenProp)) {
    const total = childrenProp.length

    if (total > maxElements) {
      numOfHiddenAvatars = total - maxElements + 1
    }

    children = childrenProp
      .slice(0, total - numOfHiddenAvatars)
      .map((child, i) => {
        const appliedSize = child.props.size ? child.props.size : size
        const appliedVariant = child.props.variant
          ? child.props.variant
          : variant
        return React.cloneElement(child, {
          size: appliedSize,
          variant: appliedVariant,
          style: { ...child.props.style, zIndex: total - i },
          key: i,
        })
      })
  }

  const spacingClasses = createSpacingClasses(props)
  const {
    skeleton, // eslint-disable-line
    ...attributes
  } = validateDOMAttributes({}, props)

  return (
    <AvatarGroupContext.Provider value={props}>
      <span
        className={classnames(
          'dnb-avatar__group',
          spacingClasses,
          className
        )}
        data-testid="avatar-group"
        {...attributes}
      >
        <span data-testid="avatar-group-label" className="dnb-sr-only">
          {label}
        </span>

        {children}

        {numOfHiddenAvatars ? (
          <ElementsHidden size={size}>
            +{numOfHiddenAvatars}
          </ElementsHidden>
        ) : null}
      </span>
    </AvatarGroupContext.Provider>
  )
}

export interface ElementsHiddenProps {
  /**
   * The avatars to group.
   * Default: null
   */
  children?: React.ReactNode

  /**
   * The size of the "elements hidden text (+x)".
   * Default: medium.
   */
  size?: AvatarSizes
}

function ElementsHidden(props: ElementsHiddenProps) {
  const { size, children } = props
  return (
    <span
      className={classnames(
        'dnb-avatar__group--elements-left',
        `dnb-avatar__group--elements-left--size-${size || 'medium'}`
      )}
      data-testid="elements-left"
    >
      {children}
    </span>
  )
}

export default AvatarGroup
