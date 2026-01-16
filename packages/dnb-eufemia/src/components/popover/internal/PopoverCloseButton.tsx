import React from 'react'
import classnames from 'classnames'
import IconPrimary from '../../icon-primary/IconPrimary'
import AlignmentHelper from '../../../shared/AlignmentHelper'
import type { IconIcon, IconSize } from '../../icon/Icon'

type CloseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  type?: string
  icon?: IconIcon | React.ReactNode
  icon_size?: IconSize
  icon_position?: 'left' | 'right' | 'top'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'signal' | 'unstyled'
  size?: 'default' | 'small' | 'medium' | 'large'
  text?: React.ReactNode
  children?: React.ReactNode
}

function renderIcon(
  icon: CloseButtonProps['icon'],
  iconSize: CloseButtonProps['icon_size'],
  title: CloseButtonProps['title']
) {
  if (!icon) {
    return null
  }

  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: classnames(icon.props.className, 'dnb-button__icon'),
    })
  }

  return (
    <IconPrimary
      className="dnb-button__icon"
      icon={icon as IconIcon}
      size={iconSize}
      aria-hidden={title ? true : null}
    />
  )
}

export default function PopoverCloseButton({
  icon = 'close',
  icon_size,
  icon_position = 'right',
  variant = 'tertiary',
  size,
  className,
  title,
  text,
  children,
  type: buttonType,
  ...rest
}: CloseButtonProps) {
  const hasIcon = Boolean(icon)
  const content = text ?? children
  const hasContent = Boolean(content)
  const resolvedAriaLabel =
    rest['aria-label'] ?? (typeof title === 'string' ? title : undefined)
  const resolvedType =
    buttonType === 'button' ||
    buttonType === 'submit' ||
    buttonType === 'reset'
      ? buttonType
      : 'button'

  const classes = classnames(
    'dnb-button',
    `dnb-button--${variant}`,
    size && size !== 'default' && `dnb-button--size-${size}`,
    hasIcon && `dnb-button--icon-position-${icon_position}`,
    hasIcon && icon_size && `dnb-button--icon-size-${icon_size}`,
    hasContent && 'dnb-button--has-text',
    hasIcon && 'dnb-button--has-icon',
    className
  )

  return (
    <button
      title={title}
      aria-label={resolvedAriaLabel}
      className={classes}
      type={resolvedType}
      {...rest}
    >
      {(hasIcon || hasContent) && (
        <AlignmentHelper
          className="dnb-button__alignment"
          pseudoElementOnly
        />
      )}
      {(icon_position === 'left' || icon_position === 'top') &&
        renderIcon(icon, icon_size, title)}
      {hasContent && (
        <span className="dnb-button__text dnb-skeleton--show-font">
          {content}
        </span>
      )}
      {icon_position === 'right' && renderIcon(icon, icon_size, title)}
    </button>
  )
}
