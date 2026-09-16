/**
 * Web Button Component
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { isValidElement, useContext, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import {
  warn,
  convertJsxToString,
  extendExistingPropsWithContext,
  removeUndefinedProps,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import { useSpacing } from '../space/SpacingUtils'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import FormStatus from '../form-status/FormStatus'
import Anchor, { pickIcon, opensNewTab } from '../anchor/Anchor'
import { launch as LaunchIcon } from '../../icons'
import Tooltip from '../tooltip/Tooltip'
import ButtonContent from './internal/ButtonContent'
import type { ButtonProps } from './types'

export * from './types'

// Local type for react-router-dom link with only the necessary props.

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
function Button({ ref, transitionState, ...restProps }: ButtonProps) {
  const context = useContext(Context)
  const elementRef = useRef<HTMLElement | null>(null)
  const combinedRef = useCombinedRef(ref, elementRef)

  // Generate an id only when explicitly provided or when status/tooltip
  // needs one for aria linking.
  const generatedId = useId(restProps.id)
  const resolvedId =
    restProps.id || restProps.status || restProps.tooltip
      ? generatedId
      : undefined

  const [afterContent, setAfterContent] = useState<ReactNode | null>(null)

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
    id: _id, // excluded so the default `null` does not override the resolvedId
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
      usedIcon = LaunchIcon
    }
  }

  const titleString = convertJsxToString(title) || undefined

  const params = useSpacing(props, {
    className: clsx(
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
      className,
      props.href || props.to ? '' : null,
      Element === Anchor && 'dnb-anchor--no-style'
    ),
    title: titleString,
    id: resolvedId,
    disabled,
    ...attributes,
    ...(Element === Anchor && { omitClass: true }),
  })

  const handleClick = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const result = dispatchCustomElementEvent(props, 'onClick', {
      event,
    })
    if (result && isValidElement(result)) {
      setAfterContent(result)
    }
  }

  if (props.onClick) {
    params.onClick = handleClick
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
    params['aria-label'] = params['aria-label'] || titleString
  }

  // Link the FormStatus message to the button for screen readers.
  // The FormStatus text element uses the same id (see "textId" below).
  if (showStatus) {
    params['aria-describedby'] = combineDescribedBy(
      params,
      resolvedId + '-status'
    )
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
          transitionState={transitionState}
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
        shellSpace={{ top: 'x-small' }}
        {...statusProps}
      />

      {tooltip && elementRef && (
        <Tooltip
          id={resolvedId + '-tooltip'}
          targetElement={elementRef}
          tooltip={tooltip}
          omitDescribedBy={
            Boolean(params['aria-label']) &&
            convertJsxToString(tooltip) === params['aria-label']
          }
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
