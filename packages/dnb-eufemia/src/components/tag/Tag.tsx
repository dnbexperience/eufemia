import React from 'react'
import classnames from 'classnames'

// Components
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Icon, { IconPrimaryIcon } from '../icon-primary/IconPrimary'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps, SkeletonTypes } from '../../shared/interfaces'
import { extendPropsWithContext } from '../../shared/component-helper'

export interface TagProps {
  /**
   * The content of the tag element, can be a string or a React Element.
   * Default: null
   */
  text?: React.ReactNode

  /**
   * Icon displaying on the left side
   * Default: null
   */
  icon?: IconPrimaryIcon

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
   * The content of the tag element, can be a string or a React Element. Will be overwritten by text prop
   * Default: null
   */
  children?: string | React.ReactNode // ReactNode allows multiple elements, strings, numbers, fragments, portals...
}

export const defaultProps = {
  className: null,
  skeleton: false,
  text: null,
  children: null,
  icon: null,
}

function Tag(localProps: TagProps & ISpacingProps) {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const { className, skeleton, children, icon, text, ...props } =
    extendPropsWithContext(
      { ...defaultProps, ...localProps },
      defaultProps,
      context?.translation?.Tag,
      context?.Tag
    )
  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const content = text || children

  return (
    <div
      className={classnames(
        'dnb-tag',
        skeletonClasses,
        spacingClasses,
        className
      )}
      data-testid="tag"
      {...props}
    >
      {icon && (
        <span data-testid="tag-icon" className="dnb-tag__icon">
          <Icon icon={icon} right="x-small" />
        </span>
      )}
      {content && (
        <>
          <span data-testid="tag-text" className="dnb-tag__text">
            {content}
          </span>
        </>
      )}
    </div>
  )
}

export default Tag
