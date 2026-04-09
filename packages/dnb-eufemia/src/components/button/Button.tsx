/**
 * Web Button Component
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React, { useContext, useRef, useState } from 'react'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import clsx from 'clsx'
import Context from '../../shared/Context'
import {
  warn,
  extendExistingPropsWithContext,
  removeUndefinedProps,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import FormStatus from '../form-status/FormStatus'
import Anchor, { pickIcon, opensNewTab } from '../anchor/Anchor'
import { launch } from '../../icons'
import Tooltip from '../tooltip/Tooltip'
import ButtonContent from './internal/ButtonContent'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { IconIcon, IconSize } from '../icon/Icon'
import type {
  DataAttributes,
  DynamicElement,
  SpacingProps,
} from '../../shared/types'
import type { FormStatusBaseProps } from '../FormStatus'
import type { AnchorProps } from '../Anchor'

export type ButtonText = string | React.ReactNode
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'unstyled'
export type ButtonSize = 'default' | 'small' | 'medium' | 'large'
export type ButtonIcon = IconIcon
export type ButtonIconPositionTertiary = 'top'
export type ButtonIconPosition = 'left' | 'right'
export type ButtonIconPositionAll =
  | 'left'
  | 'right'
  | ButtonIconPositionTertiary
export type ButtonTooltip =
  | string
  | (() => React.ReactNode)
  | React.ReactNode
export type ButtonTo = string | ReactRouterLink['to']
export type ButtonSkeleton = SkeletonShow
export type ButtonChildren =
  | string
  | (() => React.ReactNode)
  | React.ReactNode

// Local type for react-router-dom link with only the necessary props.
type ReactRouterLink = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  to:
    | string
    | {
        pathname?: string
        search?: string
        has?: string
      }
}

export type ButtonElement =
  | DynamicElement<HTMLButtonElement | HTMLAnchorElement | AnchorProps>
  | React.ComponentType<
      ReactRouterLink & { ref?: React.Ref<HTMLAnchorElement> }
    >
  | React.ReactNode
export type ButtonClickEvent = {
  event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
}
export type ButtonOnClick = (args: ButtonClickEvent) => void

export type ButtonProps = {
  /**
   * The content of the button can be a string or a React Element.
   */
  text?: ButtonText
  /**
   * The type HTML attribute. Defaults to `button` to prevent accidental form submissions.
   */
  type?: string
  /**
   * Required if there is no text in the button. If `text` and `children` are undefined, setting the `title` property will automatically set `aria-label` with the same value.
   */
  title?: string
  /**
   * Defines the kind of button. Possible values are `primary`, `secondary` and `tertiary`. Defaults to `primary` (or `secondary` if icon only).
   */
  variant?: ButtonVariant
  /**
   * The size of the button. There is `default`, `small`, `medium` and `large`. The `tertiary` button officially supports only default and large.
   */
  size?: ButtonSize
  /**
   * To be included in the button. [Primary Icons](/icons/primary) can be set as a string (e.g. `icon="chevron_right"`), other icons should be set as React elements. For the `tertiary` button an icon is basically required for accessibility reasons (unless you explicitly turn it off with `icon={false}`).
   */
  icon?: ButtonIcon
  /**
   * Position of icon inside the button. Set to `left` or `right`. Tertiary button variant also supports `top`. Defaults to `right` if not set.
   */
  iconPosition?: ButtonIconPositionAll
  /**
   * Define icon width and height. Defaults to `16px`.
   */
  iconSize?: IconSize
  /**
   * Only for icon buttons. If true, use the style for a selected icon button. Default: `false`.
   */
  selected?: boolean
  /**
   * Provide a string or a React Element to be shown as the tooltip content.
   */
  tooltip?: ButtonTooltip
  id?: string
  /**
   * If you want the button to behave as a link. Use with caution! A link should normally visually be a link and not a button.
   */
  href?: string
  /**
   * When button behaves as a link. Used to specify where to open the linked document, specified by `href`. Possible values are `_self`, `_blank`, `_parent` and `_top`.
   */
  target?: string
  /**
   * When button behaves as a link. Used to specify the relationship between a linked resource and the current document. Examples(non-exhaustive list) of values are `nofollow`, `search`, and `tag`.
   */
  rel?: string
  /**
   * Use this property only if you are using a router Link component as the `element` that uses the `to` property to declare the navigation url.
   */
  to?: ButtonTo
  /**
   * If you need to inject completely custom markup (React Element) into the button component. You have then to handle alignment and styling by yourself.
   */
  customContent?: React.ReactNode
  /**
   * If set to `true` the button text will wrap in to new lines if the overflow point is reached. Defaults to `false`.
   */
  wrap?: boolean
  /**
   * Set it to `true` in order to extend the bounding box (above the visual button background). You may also look into the HTML class `dnb-button__bounding` if it needs some CSS customization in order to get the particular button right for your use-case.
   */
  bounding?: boolean
  /**
   * Set it to `true` in order to stretch the button to the available space. Defaults to `false`.
   */
  stretch?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: ButtonSkeleton
  disabled?: boolean
  ref?: React.Ref<HTMLElement>
  className?: string
  class?: string
  children?: ButtonChildren
  /**
   * Only meant to be used for special use cases. Defaults to `button` or `a` depending if href is set or not.
   */
  element?: ButtonElement
  onClick?: ButtonOnClick
} & FormStatusBaseProps &
  Partial<
    DataAttributes &
      Omit<
        Partial<
          React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>
        >,
        'onClick'
      >
  > &
  SpacingProps

const buttonDefaultProps: Partial<ButtonProps> = {
  type: null, // defaults to 'button' to prevent accidental form submissions (except when used as Anchor)
  text: null,
  variant: null,
  size: null,
  title: null,
  icon: null,
  iconPosition: 'right',
  iconSize: null,
  href: null,
  target: null,
  rel: null,
  to: null,
  id: null,
  customContent: null,
  wrap: null,
  bounding: null,
  stretch: null,
  skeleton: null,
  disabled: null,
  tooltip: null,
  status: null,
  statusState: 'error',
  statusProps: null,
  statusNoAnimation: null,
  globalStatus: null,

  className: null,
  ref: null,
  children: null,
  element: null,

  onClick: null,
}

function getContent(props: ButtonProps) {
  return processChildren(props)
}

/**
 * The button component should be used as the call-to-action in a form, or as a user interaction mechanism. Generally speaking, a button should not be used when a link would do the trick. Exceptions are made at times when it is used as a navigation element in the action-nav element.
 */
function Button({ ref, ...restProps }: ButtonProps) {
  const context = useContext(Context)
  const elementRef = useRef<HTMLElement | null>(null)
  const combinedRef = useCombinedRef(ref, elementRef)

  // Generate an id only when explicitly provided or when status/tooltip
  // needs one for aria linking – mirrors the original class component logic.
  const generatedId = useId(restProps.id)
  const resolvedId =
    restProps.id || restProps.status || restProps.tooltip
      ? generatedId
      : undefined

  const [afterContent, setAfterContent] = useState<React.ReactNode | null>(
    null
  )

  const props = extendExistingPropsWithContext(
    {
      ...buttonDefaultProps,
      ...removeUndefinedProps({ ...restProps }),
    },
    buttonDefaultProps,
    { skeleton: context?.skeleton },
    pickFormElementProps(context?.formElement),
    context.Button
  )

  const {
    className,
    variant,
    size,
    title,
    customContent,
    tooltip,
    status,
    statusState,
    statusProps,
    statusNoAnimation,
    globalStatus,
    disabled,
    text: _text,
    icon: _icon,
    iconPosition,
    iconSize,
    wrap,
    bounding,
    stretch,
    skeleton,
    element,
    selected,
    ...attributes
  } = props

  const showStatus = getStatusState(status)

  const { text } = props
  let { icon: usedIcon } = props
  let usedVariant = variant
  let usedSize = size
  let usedIconSize = iconSize
  const content = getContent(restProps)

  if (
    variant === 'tertiary' &&
    (text || content) &&
    !usedIcon &&
    usedIcon !== false
  ) {
    warn(
      `Icon required: A Tertiary Button requires an icon to be WCAG compliant in most cases, because variant tertiary has no underline.
(Override this warning using icon={false}, or consider using one of the other variants)`
    )
  }

  // if only has Icon, then resize it and define it as secondary
  const isIconOnly = Boolean(!text && !content && usedIcon)
  if (isIconOnly) {
    if (!usedVariant) {
      usedVariant = 'secondary'
    }
    if (
      !usedIconSize &&
      (usedSize === 'default' || usedSize === 'large')
    ) {
      usedIconSize = 'medium'
    }
    if (!usedSize) {
      usedSize = 'medium'
    }

    // Warn if icon-only button lacks accessible label
    if (
      process.env.NODE_ENV === 'development' &&
      !title &&
      !attributes['aria-label']
    ) {
      warn(
        'Icon-only Button requires either a "title" or "aria-label" prop for accessibility.'
      )
    }
  } else if (content) {
    if (!usedVariant) {
      usedVariant = 'primary'
    }
    if (!usedSize) {
      usedSize = 'default'
    }
  }
  if (!usedIconSize && variant === 'tertiary' && iconPosition === 'top') {
    usedIconSize = 'medium'
  }

  const Element = element
    ? element
    : props.href || props.to
      ? Anchor
      : 'button'
  if (Element === Anchor) {
    if (opensNewTab(props.target, props.href) && !usedIcon) {
      usedIcon = launch
    }
  }

  const classes = clsx(
    'dnb-button',
    `dnb-button--${usedVariant || 'primary'}`,
    usedSize && usedSize !== 'default' && `dnb-button--size-${usedSize}`,
    context?.theme?.surface === 'dark' && `dnb-button--surface-dark`,
    usedIcon && `dnb-button--icon-position-${iconPosition}`,
    stretch && 'dnb-button--stretch',
    usedIcon && usedIconSize && `dnb-button--icon-size-${usedIconSize}`,
    (text || content || customContent) && 'dnb-button--has-text',
    usedIcon && 'dnb-button--has-icon',
    isIconOnly && 'dnb-button--icon-only',
    selected && 'dnb-button--selected',
    wrap && 'dnb-button--wrap',
    status && `dnb-button__status--${statusState}`,
    createSkeletonClass(
      variant === 'tertiary' ? 'font' : 'shape',
      skeleton,
      context
    ),
    createSpacingClasses(props),
    className,
    props.href || props.to ? '' : null,
    Element === Anchor && 'dnb-anchor--no-style'
  )

  const params = {
    className: classes,
    title,
    id: resolvedId,
    disabled,
    ...attributes,
    ...(Element === Anchor && { omitClass: true }),
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const result = dispatchCustomElementEvent(props, 'onClick', {
      event,
    })
    if (result && React.isValidElement(result)) {
      setAfterContent(result)
    }
  }

  if (props.onClick) {
    params.onClick = handleClick
  }

  // Prevent navigation when used as Anchor and disabled
  if (Element === Anchor && params.disabled) {
    const originalOnClick = params.onClick
    params.onClick = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (typeof originalOnClick === 'function') {
        originalOnClick(e)
      }
    }
    params.tabIndex = -1
    params['aria-disabled'] = true

    // Remove href when disabled to avoid navigation via URL bar/status
    if (params.href) {
      delete params.href
    }
  }

  if (Element !== Anchor && !params.type) {
    params.type = params.type === '' ? undefined : 'button'
  }
  if (isIconOnly) {
    params['aria-label'] = params['aria-label'] || title
  }

  skeletonDOMAttributes(params, skeleton, context)

  // also used for code markup simulation
  validateDOMAttributes(restProps, params)

  return (
    <>
      <Element ref={combinedRef} {...params}>
        <ButtonContent
          {...restProps}
          icon={usedIcon}
          iconSize={usedIconSize}
          content={text || content}
          customContent={customContent}
          isIconOnly={isIconOnly}
          skeleton={skeleton}
          iconElement={pickIcon(usedIcon, 'dnb-button__icon')}
        />
      </Element>

      {afterContent}

      <FormStatus
        show={showStatus}
        id={resolvedId + '-form-status'}
        globalStatus={globalStatus}
        label={text}
        text={status}
        state={statusState}
        textId={resolvedId + '-status'} // used for "aria-describedby"
        noAnimation={statusNoAnimation}
        skeleton={skeleton}
        {...statusProps}
      />

      {tooltip && elementRef && (
        <Tooltip
          id={resolvedId + '-tooltip'}
          targetElement={elementRef}
          tooltip={tooltip}
        />
      )}
    </>
  )
}

Button.getContent = getContent

withComponentMarkers(Button, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default Button
