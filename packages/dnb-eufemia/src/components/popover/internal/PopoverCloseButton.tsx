import React from 'react'
import clsx from 'clsx'
import Context from '../../../shared/Context'
import { createSpacingClasses } from '../../space/SpacingHelper'
import { createSkeletonClass } from '../../skeleton/SkeletonHelper'
import type { IconIcon, IconSize } from '../../icon/Icon'
import type { SkeletonShow } from '../../skeleton/Skeleton'
import type { SpacingProps } from '../../../shared/types'
import ButtonContent from '../../button/internal/ButtonContent'

type CloseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> &
  SpacingProps & {
    type?: string
    icon?: IconIcon | React.ReactNode
    iconSize?: IconSize
    iconPosition?: 'left' | 'right' | 'top'
    variant?: 'primary' | 'secondary' | 'tertiary' | 'signal' | 'unstyled'
    size?: 'small' | 'medium' | 'large'
    text?: React.ReactNode
    children?: React.ReactNode
    stretch?: boolean
    wrap?: boolean
    skeleton?: SkeletonShow
  }

export default function PopoverCloseButton({
  icon = 'close',
  iconSize,
  iconPosition = 'right',
  variant = 'tertiary',
  size,
  className,
  title,
  text,
  children,
  type: buttonType,
  stretch,
  wrap,
  skeleton,
  ...rest
}: CloseButtonProps) {
  const context = React.useContext(Context)
  const hasIcon = Boolean(icon)
  const content = text ?? children
  const hasContent = Boolean(content)
  const isIconOnly = Boolean(hasIcon && !hasContent)
  const iconElement = React.isValidElement<{ className?: string }>(icon)
    ? React.createElement(icon.type as React.ComponentType<any>, {
        ...icon.props,
        className: clsx(icon.props.className, 'dnb-button__icon'),
      })
    : null
  const resolvedAriaLabel =
    rest['aria-label'] ?? (typeof title === 'string' ? title : undefined)
  const resolvedType =
    buttonType === 'button' ||
    buttonType === 'submit' ||
    buttonType === 'reset'
      ? buttonType
      : 'button'

  let resolvedVariant = variant
  let resolvedSize = size
  let resolvedIconSize = iconSize

  if (isIconOnly) {
    if (!resolvedVariant) {
      resolvedVariant = 'secondary'
    }
    if (!resolvedSize) {
      resolvedSize = 'medium'
    }
    if (
      !resolvedIconSize &&
      (!resolvedSize || resolvedSize === 'large')
    ) {
      resolvedIconSize = 'medium'
    }
  } else if (hasContent) {
    if (!resolvedVariant) {
      resolvedVariant = 'primary'
    }
    if (!resolvedSize) {
      resolvedSize = null
    }
  }
  if (
    !resolvedIconSize &&
    resolvedVariant === 'tertiary' &&
    iconPosition === 'top'
  ) {
    resolvedIconSize = 'medium'
  }

  const classes = clsx(
    'dnb-button',
    `dnb-button--${resolvedVariant}`,
    resolvedSize &&
      resolvedSize &&
      `dnb-button--size-${resolvedSize}`,
    context?.theme?.surface === 'dark' && 'dnb-button--on-dark-background',
    hasIcon && `dnb-button--icon-position-${iconPosition}`,
    hasIcon &&
      resolvedIconSize &&
      `dnb-button--icon-size-${resolvedIconSize}`,
    hasContent && 'dnb-button--has-text',
    hasIcon && 'dnb-button--has-icon',
    stretch && 'dnb-button--stretch',
    wrap && 'dnb-button--wrap',
    createSkeletonClass(
      resolvedVariant === 'tertiary' ? 'font' : 'shape',
      skeleton,
      context
    ),
    createSpacingClasses({
      ...rest,
      ...{ stretch, wrap, skeleton },
    }),
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
      <ButtonContent
        title={title}
        content={content}
        icon={icon}
        iconSize={resolvedIconSize}
        skeleton={skeleton}
        isIconOnly={isIconOnly}
        iconElement={iconElement}
      />
    </button>
  )
}
