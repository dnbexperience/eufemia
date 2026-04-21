import React from 'react'
import clsx from 'clsx'

// Components
import { applySpacing } from '../space/SpacingUtils'

// Shared
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import type { SpacingProps } from '../../shared/types'
import { TagGroupContext } from './TagContext'
import type { SkeletonShow } from '../skeleton/Skeleton'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type TagGroupProps = {
  /**
   * Aria label to describe the tag group
   * Default: `null`
   */
  label: React.ReactNode

  /**
   * Custom className on the component root
   * Default: `null`
   */
  className?: string

  /**
   * The tags to group.
   * Default: `null`
   */
  children?: React.ReactNode

  /**
   * Skeleton should be applied when loading content
   * Default: `false`
   */
  skeleton?: SkeletonShow
}

const defaultProps: Partial<TagGroupProps> = {
  label: null,
  className: null,
  children: null,
  skeleton: false,
}

const TagGroup = (
  localProps: TagGroupProps &
    SpacingProps &
    Omit<React.HTMLProps<HTMLElement>, 'label'>
) => {
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

  const spacingProps = applySpacing(props, {
    className: clsx('dnb-tag__group', className),
  })
  const { skeleton, ...attributes } = validateDOMAttributes({}, {
    ...props,
    ...spacingProps,
  } as Record<string, unknown>)

  return (
    <TagGroupContext value={props}>
      <span {...(attributes as React.HTMLAttributes<HTMLSpanElement>)}>
        <span className="dnb-sr-only">{label}</span>
        {children}
      </span>
    </TagGroupContext>
  )
}

withComponentMarkers(TagGroup, {
  _supportsSpacingProps: true,
})

export default TagGroup
