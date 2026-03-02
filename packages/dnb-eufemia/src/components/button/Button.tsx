/**
 * Web Button Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Context from '../../shared/Context'
import {
  warn,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
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
  DataAttributeTypes,
  DynamicElement,
  SpacingProps,
} from '../../shared/types'
import type { FormStatusBaseProps } from '../FormStatus'
import type { AnchorProps } from '../Anchor'

/** @deprecated Use ButtonVariant type instead */
export const buttonVariantPropType = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'signal',
    'unstyled',
  ]),
}

export type ButtonText = string | React.ReactNode
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'signal'
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
  | ((...args: any[]) => any)
  | React.ReactNode
export type ButtonTo = string | any | ((...args: any[]) => any)
export type ButtonSkeleton = SkeletonShow
export type ButtonChildren =
  | string
  | ((...args: any[]) => any)
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
export type ButtonOnClick = (...args: any[]) => any

export type ButtonProps = {
  text?: ButtonText
  type?: string
  title?: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ButtonIcon
  iconPosition?: ButtonIconPositionAll
  iconSize?: IconSize
  tooltip?: ButtonTooltip
  id?: string
  href?: string
  target?: string
  rel?: string
  to?: ButtonTo
  customContent?: React.ReactNode
  wrap?: boolean
  bounding?: boolean
  stretch?: boolean
  skeleton?: ButtonSkeleton
  disabled?: boolean
  ref?: React.Ref<HTMLElement>
  className?: string
  class?: string
  children?: ButtonChildren
  element?: ButtonElement
  onClick?: ButtonOnClick
} & FormStatusBaseProps &
  Partial<
    DataAttributeTypes &
      Omit<
        Partial<
          React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>
        >,
        'onClick'
      >
  > &
  SpacingProps

interface ButtonState {
  afterContent: React.ReactNode | null
}

const buttonDefaultProps = {
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

/**
 * The button component should be used as the call-to-action in a form, or as a user interaction mechanism. Generally speaking, a button should not be used when a link would do the trick. Exceptions are made at times when it is used as a navigation element in the action-nav element.
 */
class ButtonClass extends React.PureComponent<ButtonProps, ButtonState> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  _id: string | undefined
  _ref: React.RefObject<HTMLElement | null>

  static getContent(props) {
    return processChildren(props)
  }

  constructor(props: ButtonProps) {
    super(props)

    this._id =
      props.id || ((props.status || props.tooltip) && makeUniqueId()) // cause we need an id anyway
    this._ref = React.createRef()

    this.state = { afterContent: null }
  }

  getOnClickHandler = (src) => (event) => {
    const afterContent = dispatchCustomElementEvent(src, 'onClick', {
      event,
    })
    if (afterContent && React.isValidElement(afterContent)) {
      this.setState({
        afterContent,
      })
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      { ...buttonDefaultProps, ...this.props },
      buttonDefaultProps,
      { skeleton: this.context?.skeleton },
      pickFormElementProps(this.context?.formElement),
      this.context.Button
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
      id,
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
      ref: _ref,
      ...attributes
    } = props

    const showStatus = getStatusState(status)

    const { text } = props
    let { icon } = props
    let usedVariant = variant
    let usedSize = size
    let usedIconSize = iconSize
    const content = ButtonClass.getContent(this.props)

    if (
      variant === 'tertiary' &&
      (text || content) &&
      !icon &&
      icon !== false
    ) {
      warn(
        `Icon required: A Tertiary Button requires an icon to be WCAG compliant in most cases, because variant tertiary has no underline.
(Override this warning using icon={false}, or consider using one of the other variants)`
      )
    }

    // if only has Icon, then resize it and define it as secondary
    const isIconOnly = Boolean(!text && !content && icon)
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
    if (
      !usedIconSize &&
      variant === 'tertiary' &&
      iconPosition === 'top'
    ) {
      usedIconSize = 'medium'
    }

    const Element = element
      ? element
      : props.href || props.to
      ? Anchor
      : 'button'
    if (Element === Anchor) {
      ;(attributes as Record<string, unknown>).omitClass = true
      if (opensNewTab(props.target, props.href) && !icon) {
        icon = launch
      }
    }

    const classes = clsx(
      'dnb-button',
      `dnb-button--${usedVariant || 'primary'}`,
      usedSize && usedSize !== 'default' && `dnb-button--size-${usedSize}`,
      this.context?.theme?.darkBackground &&
        `dnb-button--on-dark-background`,
      icon && `dnb-button--icon-position-${iconPosition}`,
      stretch && 'dnb-button--stretch',
      icon && usedIconSize && `dnb-button--icon-size-${usedIconSize}`,
      (text || content || customContent) && 'dnb-button--has-text',
      icon && 'dnb-button--has-icon',
      wrap && 'dnb-button--wrap',
      status && `dnb-button__status--${statusState}`,
      createSkeletonClass(
        variant === 'tertiary' ? 'font' : 'shape',
        skeleton,
        this.context
      ),
      createSpacingClasses(props),
      className,
      props.href || props.to ? '' : null, // dnb-anchor--no-underline dnb-anchor--no-hover
      Element === Anchor && 'dnb-anchor--no-style'
    )

    const params = {
      className: classes,
      title,
      id: this._id,
      disabled: disabled,
      ...attributes,
    }

    if (props.onClick) {
      params.onClick = this.getOnClickHandler(props)
    }

    // Prevent navigation when used as Anchor and disabled
    if (Element === Anchor && params.disabled) {
      const originalOnClick = params.onClick
      params.onClick = (e) => {
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

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <>
        <Element ref={this._ref} {...params}>
          <ButtonContent
            {...this.props}
            icon={icon}
            iconSize={usedIconSize}
            content={text || content}
            customContent={customContent}
            isIconOnly={isIconOnly}
            skeleton={skeleton}
            iconElement={pickIcon(icon, 'dnb-button__icon')}
          />
        </Element>

        {this.state.afterContent}

        <FormStatus
          show={showStatus}
          id={this._id + '-form-status'}
          globalStatus={globalStatus}
          label={text}
          text={status}
          state={statusState}
          textId={this._id + '-status'} // used for "aria-describedby"
          noAnimation={statusNoAnimation}
          skeleton={skeleton}
          {...statusProps}
        />

        {tooltip && this._ref && (
          <Tooltip
            id={this._id + '-tooltip'}
            targetElement={this._ref}
            tooltip={tooltip}
          />
        )}
      </>
    )
  }
}

/**
 * Function wrapper that forwards `ref` to the inner DOM element of the class component.
 */
function Button({ ref, ...props }: ButtonProps) {
  const instanceRef = React.useCallback(
    (instance) => {
      const el = instance?._ref?.current ?? null
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLElement | null>).current = el
      }
    },
    [ref]
  )

  return <ButtonClass ref={ref ? instanceRef : undefined} {...props} />
}

Button.getContent = ButtonClass.getContent
Button._formElement = true
Button._supportsSpacingProps = true

export default Button
