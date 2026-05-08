import { createElement, isValidElement, useContext } from 'react'
import type { ButtonHTMLAttributes, ComponentType, ReactNode } from 'react'
import clsx from 'clsx'
import Context from '../../../shared/Context'
import { applySpacing } from '../../space/SpacingUtils'
import { createSkeletonClass } from '../../skeleton/SkeletonHelper'
import type { IconIcon, IconSize } from '../../icon/Icon'
import type { SkeletonShow } from '../../skeleton/Skeleton'
import type { SpacingProps } from '../../../shared/types'
import ButtonContent from '../../button/internal/ButtonContent'

type CloseButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> &
  SpacingProps & {
    type?: string
    icon?: IconIcon | ReactNode
    iconSize?: IconSize
    iconPosition?: 'left' | 'right' | 'top'
    variant?: 'primary' | 'secondary' | 'tertiary' | 'unstyled'
    size?: 'default' | 'small' | 'medium' | 'large'
    text?: ReactNode
    children?: ReactNode
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
  const context = useContext(Context)
  const hasIcon = Boolean(icon)
  const content = text ?? children
  const hasContent = Boolean(content)
  const isIconOnly = Boolean(hasIcon && !hasContent)
  const iconElement = isValidElement<{ className?: string }>(icon)
    ? createElement(icon.type as ComponentType<any>, {
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
      (resolvedSize === 'default' || resolvedSize === 'large')
    ) {
      resolvedIconSize = 'medium'
    }
  } else if (hasContent) {
    if (!resolvedVariant) {
      resolvedVariant = 'primary'
    }
    if (!resolvedSize) {
      resolvedSize = 'default'
    }
  }
  if (
    !resolvedIconSize &&
    resolvedVariant === 'tertiary' &&
    iconPosition === 'top'
  ) {
    resolvedIconSize = 'medium'
  }

  const buttonProps = applySpacing(
    { ...rest, stretch, wrap, skeleton },
    {
      title,
      'aria-label': resolvedAriaLabel,
      className: clsx(
        'dnb-button',
        `dnb-button--${resolvedVariant}`,
        resolvedSize &&
          resolvedSize !== 'default' &&
          `dnb-button--size-${resolvedSize}`,
        hasIcon && `dnb-button--icon-position-${iconPosition}`,
        hasIcon &&
          resolvedIconSize &&
          `dnb-button--icon-size-${resolvedIconSize}`,
        hasContent && 'dnb-button--has-text',
        hasIcon && 'dnb-button--has-icon',
        isIconOnly && 'dnb-button--icon-only',
        stretch && 'dnb-button--stretch',
        wrap && 'dnb-button--wrap',
        createSkeletonClass(
          resolvedVariant === 'tertiary' ? 'font' : 'shape',
          skeleton,
          context
        ),
        className
      ),
      type: resolvedType,
      ...rest,
    }
  ) as ButtonHTMLAttributes<HTMLButtonElement>

  return (
    <button {...buttonProps}>
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
