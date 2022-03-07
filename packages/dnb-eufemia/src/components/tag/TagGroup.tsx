import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'

// Shared
import { validateDOMAttributes } from '../../shared/component-helper'
import Context from '../../shared/Context'
import { ISpacingProps } from '../../shared/interfaces'
import { usePropsWithContext } from '../../shared/hooks'
import { TagGroupContext } from './TagContext'

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
}

export const defaultProps = {
  label: null,
  className: null,
  children: null,
}

const TagGroup = (localProps: TagGroupProps & ISpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    label,
    className,
    children: childrenProp,
    ...props
  } = usePropsWithContext(localProps, defaultProps, context?.TagGroup)

  let children = childrenProp

  if (Array.isArray(childrenProp)) {
    children = [...childrenProp].map((child) => {
      return child
    })
  }

  const spacingClasses = createSpacingClasses(props)

  return (
    <TagGroupContext.Provider value={props}>
      <span
        className={classnames('dnb-tag__group', spacingClasses, className)}
        data-testid="tag-group"
        {...validateDOMAttributes({}, props)}
      >
        <span data-testid="tag-group-label" className="dnb-sr-only">
          {label}
        </span>
        {children}
      </span>
    </TagGroupContext.Provider>
  )
}

export default TagGroup
