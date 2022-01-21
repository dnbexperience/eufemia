import React from 'react'
import classnames from 'classnames'

// Components
import { IconPrimaryIcon } from '../icon-primary/IconPrimary'
import Button from '../button/Button'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps, SkeletonTypes } from '../../shared/interfaces'
import { extendPropsWithContext } from '../../shared/component-helper'

export interface TagProps {
  /**
   * The content of the tag element, can be a string or a React Element.
   * Default: null
   */
  text?: string | React.ReactNode

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

  /**
   * Handle the click event on 'tag' element
   * Default: null
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const defaultProps = {
  className: null,
  skeleton: false,
  text: null,
  children: null,
  icon: null,
  onClick: null,
}

const Tag = (localProps: TagProps & ISpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const { className, skeleton, children, onClick, text, ...props } =
    extendPropsWithContext(
      { ...defaultProps, ...localProps },
      defaultProps,
      context?.translation?.Tag,
      context?.Tag
    )

  const content = text || children
  const isClickable = !!onClick

  const tagClassNames = classnames(
    'dnb-tag',
    className,
    isClickable && 'dnb-tag--clickable'
  )

  if (!isClickable) {
    props.element = 'span'
    props.type = ''
  }

  return (
    <Button
      data-testid="tag"
      variant="unstyled"
      icon_position="left"
      size="small"
      className={tagClassNames}
      on_click={onClick}
      text={content}
      skeleton={skeleton}
      {...props}
    />
  )
}

export default Tag
