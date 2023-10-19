import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'

// Shared
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import type { SpacingProps } from '../../shared/types'
import { TagGroupContext } from './TagContext'
import type { SkeletonShow } from '../skeleton/Skeleton'

export interface TagGroupProps {
  /**
   * Aria label to describe the tag group
   * Default: null
   */
  label: React.ReactNode

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * The tags to group.
   * Default: null
   */
  children?: React.ReactNode

  /**
   * Skeleton should be applied when loading content
   * Default: false
   */
  skeleton?: SkeletonShow
}

export const defaultProps = {
  label: null,
  className: null,
  children: null,
  skeleton: false,
}

const TagGroup = (localProps: TagGroupProps & SpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    label,
    className,
    children: childrenProp,
    ...props
  } = extendPropsWithContext(localProps, defaultProps, context?.TagGroup, {
    skeleton: context?.skeleton,
  })

  let children = childrenProp

  if (Array.isArray(childrenProp)) {
    children = [...childrenProp].map((child) => {
      return child
    })
  }

  const spacingClasses = createSpacingClasses(props)
  const {
    skeleton, // eslint-disable-line
    ...attributes
  } = validateDOMAttributes({}, props)

  return (
    <TagGroupContext.Provider value={props}>
      <span
        className={classnames('dnb-tag__group', spacingClasses, className)}
        {...attributes}
      >
        <span className="dnb-sr-only">{label}</span>
        {children}
      </span>
    </TagGroupContext.Provider>
  )
}

TagGroup._supportsSpacingProps = true

export default TagGroup
