import React from 'react'
import classnames from 'classnames'

// Components
import IconPrimary from '../icon-primary/IconPrimary'
import type { IconIcon } from '../icon/Icon'
import Button, { ButtonProps } from '../button/Button'

// Shared
import Context from '../../shared/Context'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../skeleton/Skeleton'
import {
  warn,
  extendPropsWithContext,
} from '../../shared/component-helper'

// Internal
import TagGroup from './TagGroup'
import { TagGroupContext } from './TagContext'
import { createSpacingClasses } from '../space/SpacingHelper'

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
  icon?: IconIcon

  /**
   * If a label is given, typical inside a table or dl (definition list), then you can disable Tag.Group as a dependent of Tag. Use `true` to omit the `Tag group required:` warning.
   * Default: null
   */
  hasLabel?: boolean

  /**
   * Defines the variant
   * Default: 'default'
   */
  variant?: 'default' | 'clickable' | 'addable' | 'removable'

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow

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
   * @deprecated Use `onClick` instead. With `variant='removable'`
   */
  onDelete?: React.MouseEventHandler<HTMLButtonElement>

  /**
   * Handle the delete event on 'tag' element
   * Default: null
   */
  omitOnKeyUpDeleteEvent?: boolean

  /**
   * Internal property
   * Has translation in context
   */
  removeIconTitle?: string

  /**
   * Internal property
   * Has translation in context
   */
  addIconTitle?: string
}

export const defaultProps = {
  skeleton: null,
  omitOnKeyUpDeleteEvent: false,
}

const Tag = (localProps: TagProps & SpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  const tagGroupContext = React.useContext(TagGroupContext)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.translation?.Tag,
    context?.Tag,
    tagGroupContext
  )

  const {
    className,
    skeleton,
    children,
    text,
    hasLabel,
    variant: _variant = 'default',
    onClick,
    onDelete,
    omitOnKeyUpDeleteEvent,
    removeIconTitle, // has a translation in context
    addIconTitle, // has a translation in context
    ...props
  } = allProps

  const content = text || children

  let variant = _variant
  if (variant === 'default') {
    if (onClick) {
      variant = 'clickable'
    } else if (onDelete) {
      variant = 'removable'
    }
  }

  const addIcon = variant === 'addable' || variant === 'removable'
  const isInteractive = variant !== 'default'
  const spacingClasses = createSpacingClasses(props)
  const tagClassNames = classnames(
    'dnb-tag',
    className,
    spacingClasses,
    isInteractive && 'dnb-tag--interactive',
    `dnb-tag--${variant}`
  )
  const buttonAttr: typeof props & Pick<ButtonProps, 'element' | 'type'> =
    props

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
    buttonAttr.element = 'span'
    buttonAttr.type = ''
  }

  if (addIcon) {
    buttonAttr.icon = getIcon(
      variant === 'addable' ? addIconTitle : removeIconTitle
    )
  }

  if (!tagGroupContext && !hasLabel) {
    warn(
      `Tag group required: A Tag requires a Tag.Group with label description as a parent component. This is to ensure correct semantic and accessibility.`
    )
  }

  return (
    <Button
      variant="unstyled"
      size="small"
      icon_position={addIcon ? 'right' : 'left'}
      className={tagClassNames}
      on_click={onClick || onDelete}
      text={content}
      skeleton={skeleton}
      onKeyUp={
        variant === 'removable' && !omitOnKeyUpDeleteEvent
          ? (e) => handleKeyUp(e)
          : undefined
      }
      {...buttonAttr}
    />
  )
}

const getIcon = (title: string) => (
  <IconPrimary
    title={title}
    inherit_color={false}
    icon={
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8a8 8 0 1 1 16 0A8 8 0 1 1 0 8Z"
          className="dnb-icon-close-circle-path"
        />
        <path
          d="m5.5 10.5 5-5m0 5-5-5"
          className="dnb-icon-close-cross-path"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    }
  />
)

Tag.Group = TagGroup

Tag._formElement = true
Tag._supportsSpacingProps = true

export default Tag
