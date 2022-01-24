import React from 'react'
import classnames from 'classnames'

// Components
import IconPrimary, { IconPrimaryIcon } from '../icon-primary/IconPrimary'
import Button from '../button/Button'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps, SkeletonTypes } from '../../shared/interfaces'
import {
  warn,
  extendPropsWithContext,
} from '../../shared/component-helper'

// Internal
import TagGroup, { TagGroupContext } from './TagGroup'

export * from './TagGroup'

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

  /**
   * Handle the delete event on 'tag' element
   * Default: null
   */
  onDelete?: React.MouseEventHandler<HTMLButtonElement>

  /**
   * Handle the delete event on 'tag' element
   * Default: null
   */
  omitOnKeyUpDeleteEvent?: boolean
}

export const defaultProps = {
  className: null,
  skeleton: false,
  text: null,
  children: null,
  icon: null,
  onClick: null,
  onDelete: null,
  omitOnKeyUpDeleteEvent: false,
}

const Tag = (localProps: TagProps & ISpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  const tagGroupContext = React.useContext(TagGroupContext)

  // Extract additional props from global context
  const {
    className,
    skeleton,
    children,
    text,
    onClick,
    onDelete,
    omitOnKeyUpDeleteEvent,
    ...props
  } = extendPropsWithContext(
    { ...defaultProps, ...localProps },
    defaultProps,
    context?.translation?.Tag,
    context?.Tag,
    tagGroupContext
  )

  const content = text || children
  const isClickable = !!onClick
  const isRemovable = !!onDelete && !isClickable
  const isInteractive = isClickable || isRemovable

  const tagClassNames = classnames(
    'dnb-tag',
    className,
    isInteractive && 'dnb-tag--interactive',
    isRemovable && 'dnb-tag--removable'
  )

  const isDeleteKeyboardEvent = (keyboardEvent) => {
    return (
      keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete'
    )
  }

  const handleKeyUp = (event) => {
    if (onDelete && isDeleteKeyboardEvent(event)) {
      onDelete(event)
    }
  }

  if (!isInteractive) {
    props.element = 'span'
    props.type = ''
  }

  if (isRemovable) {
    props.icon = getDeleteIcon()
  }

  if (!tagGroupContext) {
    warn(
      `Tag group required: A Tag requires a Tag.Group with label description as a parent component. This is to ensure correct semantic and accessibility.`
    )
  }

  return (
    <Button
      data-testid="tag"
      variant="unstyled"
      size="small"
      icon_position={isRemovable ? 'right' : 'left'}
      className={tagClassNames}
      on_click={onClick || onDelete}
      text={content}
      skeleton={skeleton}
      onKeyUp={
        isRemovable && !omitOnKeyUpDeleteEvent
          ? (e) => handleKeyUp(e)
          : undefined
      }
      {...props}
    />
  )

  function getDeleteIcon() {
    return (
      <IconPrimary
        data-testid="tag-delete-icon"
        inherit_color={false}
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 8C0 3.58172 3.58172 0 8 0V0C12.4183 0 16 3.58172 16 8V8C16 12.4183 12.4183 16 8 16V16C3.58172 16 0 12.4183 0 8V8Z"
              fill="white"
              className="dnb-icon-close-circle-path"
            />
            <path
              d="M5.5 10.5L10.5 5.5M10.5 10.5L5.5 5.5"
              stroke="#007272"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dnb-icon-close-cross-path"
            />
          </svg>
        }
      />
    )
  }
}

Tag.Group = TagGroup

export { TagGroup }

export default Tag
