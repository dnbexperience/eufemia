/**
 * Web FormStatus Component
 */

import React, { useCallback, useContext, useEffect, useRef } from 'react'
import useMountEffect from '../../shared/helpers/useMountEffect'
import useUpdateEffect from '../../shared/helpers/useUpdateEffect'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useTheme, Context } from '../../shared'
import useId from '../../shared/helpers/useId'
import {
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext,
  removeUndefinedProps,
} from '../../shared/component-helper'
import HeightAnimation from '../height-animation/HeightAnimation'
import { createSpacingClasses } from '../space/SpacingHelper'
import Icon from '../icon/Icon'
import GlobalStatusProvider from '../global-status/GlobalStatusProvider'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import {
  pickFormElementProps,
  type FormElementProps,
} from '../../shared/helpers/filterValidProps'
import ui from '../../style/themes/ui/properties'
import sbanken from '../../style/themes/sbanken/properties'
import type { GlobalStatusConfigObject } from '../GlobalStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceTypeAll } from '../../shared/types'

const properties = { ui, sbanken }

export type FormStatusText =
  | string
  | boolean
  | (() => React.ReactNode)
  | React.ReactNode
export type FormStatusState =
  | 'error'
  | 'warning'
  | 'information'
  | 'success'
  | 'marketing'
export type FormStatusVariant = 'plain' | 'outlined'
export type FormStatusSize = 'default' | 'large'
export type FormStatusAttributes = string | Record<string, unknown>
export type FormStatusChildren =
  | string
  | (() => React.ReactNode)
  | React.ReactNode

/**
 * Shared status-related props used by form components that display a FormStatus.
 */
export type FormStatusBaseProps = {
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText
  /**
   * Defines the state of the status. Valid states are `error`, `warning`, `information`, `success` and `marketing`. Defaults to `error`.
   */
  statusState?: FormStatusState
  /**
   * Use an object to define additional FormStatus properties.
   */
  statusProps?: FormStatusProps
  /**
   * Set to `true` to disable the status animation. Defaults to `false`.
   */
  statusNoAnimation?: boolean
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject
}

export type FormStatusProps = {
  id?: string
  /**
   * The `title` attribute in the status.
   */
  title?: string
  label?: React.ReactNode
  /**
   * Provide `false` if you want to animate the visibility. Defaults to `true`.
   */
  show?: boolean
  /**
   * The `text` appears as the status message. Beside plain text, you can send in a React component as well.
   */
  text?: FormStatusText
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject
  /**
   * The `icon` show before the status text. Defaults to `exclamation`.
   */
  icon?: IconIcon
  /**
   * The icon size of the icon shows. Defaults to `medium`.
   */
  iconSize?: IconSize
  /**
   * Defines the visual appearance of the status. These are the statuses `error`, `warning`, `information` and `marketing`. The default status is `error`.
   */
  state?: FormStatusState
  /**
   * As of now, there is the `plain` and the `outlined` variant. Defaults to `plain`.
   */
  variant?: FormStatusVariant
  /**
   * Defines the appearance size. There are these sizes `default`, `large`. The default status is `default`.
   */
  size?: FormStatusSize
  attributes?: FormStatusAttributes
  textId?: string
  widthSelector?: string
  widthElement?: { current: HTMLElement | null } | null
  /**
   * NB: Animation is disabled as of now. ~~use `true` to omit the animation on content visibility. Defaults to `false`.~~
   */
  noAnimation?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * If set to `true`, then the FormStatus will be 100% in available `width`. **NB:** Only use this on independent status messages.
   */
  stretch?: boolean
  /**
   * The `role` attribute for accessibility, defaults to `alert`.
   */
  role?: string
  /**
   * Use it to set an inner margin. It supports the same properties as [Space](/uilib/layout/space/properties). Useful for animation.
   */
  shellSpace?: SpaceTypeAll
  className?: string
  /**
   * The `text` appears as the status message. Beside plain text, you can send in a React component as well.
   */
  children?: FormStatusChildren
} & Omit<
  React.HTMLProps<HTMLElement>,
  'ref' | 'label' | 'value' | 'onFocus' | 'onBlur' | 'children' | 'size'
> &
  SpacingProps

export type ErrorIconProps = {
  /**
   * The `title` attribute in the status.
   */
  title?: string
  state?: FormStatusState
  [key: string]: any
}
export type WarnIconProps = {
  /**
   * The `title` attribute in the status.
   */
  title?: string
  state?: FormStatusState
  [key: string]: any
}
export type InfoIconProps = {
  /**
   * The `title` attribute in the status.
   */
  title?: string
  state?: FormStatusState
  [key: string]: any
}
export type MarketingIconProps = {
  /**
   * The `title` attribute in the status.
   */
  title?: string
  state?: FormStatusState
  [key: string]: any
}

export type FormStatusIcon =
  | typeof ErrorIcon
  | typeof WarnIcon
  | typeof InfoIcon
  | typeof MarketingIcon

const formStatusDefaultProps = {
  show: true,
  icon: 'error',
  iconSize: 'medium',
  size: 'default',
  state: 'error',
}

function getContent(props: FormStatusProps) {
  if (props.text) {
    if (props.text === true) {
      return null
    }
    return props.text
  }
  return processChildren(props)
}

function correctStatus(state: FormStatusState | undefined) {
  return state
}

function getIcon({
  state,
  icon,
  iconSize,
}: Pick<FormStatusProps, 'state' | 'icon' | 'iconSize'>) {
  if (typeof icon !== 'string') {
    return icon as React.ReactNode
  }

  let IconToLoad: React.ComponentType<
    ErrorIconProps | WarnIconProps | InfoIconProps | MarketingIconProps
  > = ErrorIcon

  switch (correctStatus(state)) {
    case 'information':
    case 'success':
      IconToLoad = InfoIcon
      break
    case 'warning':
      IconToLoad = WarnIcon
      break
    case 'marketing':
      IconToLoad = MarketingIcon
      break
    case 'error':
    default:
      IconToLoad = ErrorIcon
  }

  return (
    <Icon
      icon={<IconToLoad title={null} state={state} />}
      size={iconSize}
      inheritColor={false}
    />
  )
}

function FormStatusComponent(
  ownProps: FormStatusProps & { ref?: React.Ref<HTMLElement> }
) {
  const { ref, ...restOwnProps } = ownProps
  const context = useContext(Context)

  const props = extendPropsWithContext(
    {
      ...formStatusDefaultProps,
      ...removeUndefinedProps({ ...restOwnProps }),
    },
    formStatusDefaultProps,
    { skeleton: context?.skeleton },
    pickFormElementProps(context?.formElement),
    context?.FormStatus
  )

  const {
    id: idProp,
    text,
    globalStatus,
    label,
    show,
    noAnimation,
    state: rawStateProp,
    widthElement,
    widthSelector,
    ...restOfProps
  } = props

  const id = useId(idProp)

  const statusId = `${id}-gs`

  const elementRef = useRef<HTMLElement | null>(null)
  const isMountedRef = useRef(false)
  const contentCacheRef = useRef<React.ReactNode | null>(null)
  const stateCacheRef = useRef<FormStatusState | undefined>(undefined)

  const ownPropsRef = useRef(restOwnProps)
  ownPropsRef.current = restOwnProps

  // Sync forwarded ref with internal ref
  useEffect(() => {
    if (typeof ref === 'function') {
      ref(elementRef.current)
    } else if (ref) {
      ref.current = elementRef.current
    }
  })

  const shouldAnimate = noAnimation === false

  const fillCache = useCallback(() => {
    const content = shouldAnimate && getContent(ownPropsRef.current)
    if (content && content !== contentCacheRef.current) {
      contentCacheRef.current = content
    }

    const stateVal = shouldAnimate && correctStatus(rawStateProp)
    if (stateVal) {
      stateCacheRef.current = stateVal
    }
  }, [shouldAnimate, rawStateProp])

  const isReadyToGetVisible = useCallback(
    (p: FormStatusProps = props) => {
      return p.show && getContent(p) ? true : false
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.show, props.text, props.children]
  )

  const updateWidth = useCallback(() => {
    if (elementRef.current) {
      setMaxWidthToElement({
        element: elementRef.current,
        widthElement: widthElement?.current ?? null,
        widthSelector: widthSelector as string,
      })
    }
  }, [widthElement, widthSelector])

  // Stable ref to current props for use in globalStatus callback
  const propsRef = useRef(props)
  propsRef.current = props
  const isReadyToGetVisibleRef = useRef(isReadyToGetVisible)
  isReadyToGetVisibleRef.current = isReadyToGetVisible

  const globalStatusRef =
    useRef<ReturnType<typeof GlobalStatusProvider.init>>(null)

  // Initialize GlobalStatusProvider once
  useMountEffect(() => {
    globalStatusRef.current = GlobalStatusProvider.init(
      globalStatus?.id ||
        context?.FormStatus?.globalStatus?.id ||
        (
          context?.formElement as FormElementProps & {
            globalStatus?: GlobalStatusConfigObject
          }
        )?.globalStatus?.id ||
        'main',
      (provider) => {
        const currentProps = propsRef.current
        if (
          currentProps.state === 'error' &&
          isReadyToGetVisibleRef.current()
        ) {
          provider.add({
            state: currentProps.state,
            statusId,
            item: {
              itemId: id,
              text:
                currentProps.globalStatus?.message ||
                currentProps.text ||
                currentProps.children,
              statusAnchorLabel: currentProps.label,
              statusAnchorUrl: true,
            },
            ...currentProps.globalStatus,
          })
        }
      }
    )

    return () => {
      globalStatusRef.current?.remove(statusId)
    }
  })

  // Mount/unmount and window event listeners
  useMountEffect(() => {
    isMountedRef.current = true

    const init = () => {
      if (isMountedRef.current) {
        globalStatusRef.current?.isReady()
        updateWidth()
        fillCache()
      }
    }

    if (document.readyState === 'complete') {
      init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', init)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWidth)
    }

    return () => {
      isMountedRef.current = false
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', init)
        window.removeEventListener('resize', updateWidth)
      }
    }
  })

  // Track previous props for componentDidUpdate logic
  const prevPropsRef = useRef<FormStatusProps>(restOwnProps)
  useUpdateEffect(() => {
    const prevProps = prevPropsRef.current
    prevPropsRef.current = restOwnProps

    const state = props.state
    const { children } = props

    if (
      prevProps.text !== text ||
      prevProps.children !== children ||
      prevProps.show !== show ||
      (prevProps.globalStatus as Record<string, unknown>)?.show !==
        (globalStatus as Record<string, unknown>)?.show ||
      prevProps.state !== state
    ) {
      fillCache()

      if (state === 'error') {
        if (show) {
          globalStatusRef.current?.update(
            statusId,
            {
              state,
              statusId,
              item: {
                itemId: id,
                text: globalStatus?.message || text || children,
                statusAnchorLabel: label,
                statusAnchorUrl: true,
              },
              ...globalStatus,
            },
            {
              preventRestack: true, // because of the internal "close"
            }
          )
        } else if (!getContent(restOwnProps)) {
          globalStatusRef.current?.remove(statusId)
        }
      }

      if (isReadyToGetVisible()) {
        updateWidth()
      }
    }
  })

  const state = correctStatus(rawStateProp) || stateCacheRef.current
  const iconToRender = getIcon({
    state,
    icon: restOfProps.icon,
    iconSize: restOfProps.iconSize,
  })

  const contentToRender = getContent(restOwnProps)

  const hasStringContent =
    typeof contentToRender === 'string' && contentToRender.length > 0

  const {
    title,
    size,
    variant,
    className,
    stretch,
    shellSpace,
    textId,
    skeleton,
    role,
    icon: _icon,
    iconSize: _iconSize,
    ...rest
  } = restOfProps

  const params: Record<string, unknown> = {
    className: clsx(
      'dnb-form-status',
      state && `dnb-form-status--${state}`,
      `dnb-form-status__size--${size}`,
      variant && `dnb-form-status__variant--${variant}`,
      stretch && 'dnb-form-status--stretch',
      hasStringContent ? 'dnb-form-status--has-content' : null,
      createSpacingClasses(props),
      className
    ),
    id: !String(idProp).startsWith('null') ? id : null,
    title,
    role,
    ...rest,
  }

  if (!role) {
    switch (state) {
      case 'information':
        params.role = 'status'
        break
      default:
        params.role = 'alert'
    }
  }

  const textParams = {
    className: clsx(
      'dnb-form-status__text',
      createSkeletonClass('font', skeleton, context)
    ),
    id: !String(textId).startsWith('null') ? textId : null,
  }

  const shellParams = {
    className: clsx(
      'dnb-form-status__shell',
      createSpacingClasses({ space: shellSpace })
    ),
  }

  skeletonDOMAttributes(params, skeleton, context)

  // also used for code markup simulation
  validateDOMAttributes(restOwnProps, params)
  validateDOMAttributes(null, textParams)

  return (
    <HeightAnimation
      element="span"
      open={isReadyToGetVisible()}
      animate={shouldAnimate}
      duration={600}
      {...params}
      ref={elementRef}
    >
      <span {...shellParams}>
        {iconToRender}
        <span {...textParams}>
          {contentToRender || contentCacheRef.current}
        </span>
      </span>
    </HeightAnimation>
  )
}

FormStatusComponent.displayName = 'FormStatus'

const FormStatus = React.memo(
  FormStatusComponent
) as React.MemoExoticComponent<
  (
    props: FormStatusProps & { ref?: React.Ref<HTMLElement> }
  ) => React.ReactNode
>

withComponentMarkers(FormStatus, { _supportsSpacingProps: true })

export default FormStatus

export const ErrorIcon = (props: ErrorIconProps) => {
  const { title = 'error' } = props || {}
  const isSbankenTheme = useTheme()?.name === 'sbanken'
  const fill = isSbankenTheme
    ? properties.sbanken['--sb-color-magenta']
    : properties.ui['--color-fire-red']
  const line = isSbankenTheme
    ? properties.sbanken['--sb-color-magenta-light-2']
    : properties.ui['--color-white']

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <title>{title}</title>
      <path
        d="M23.625 17.864A3.547 3.547 0 0120.45 23H3.548a3.546 3.546 0 01-3.172-5.136l8.45-14.902a3.548 3.548 0 016.347 0l8.452 14.902z"
        fill={fill}
      />
      <path
        d="M12 16.286a1.286 1.286 0 100 2.572 1.286 1.286 0 000-2.572z"
        fill={line}
      />
      <path
        d="M12 13.818v-5"
        stroke={line}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const WarnIcon = (props: WarnIconProps) => {
  const { title = 'error' } = props || {}
  const isSbankenTheme = useTheme()?.name === 'sbanken'
  const fill = isSbankenTheme
    ? properties.sbanken['--sb-color-yellow-dark']
    : properties.ui['--color-accent-yellow']
  const line = isSbankenTheme
    ? properties.sbanken['--sb-color-black']
    : properties.ui['--color-black-80']

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <title>{title}</title>
      <path
        d="M23.625 17.864A3.547 3.547 0 0120.45 23H3.548a3.546 3.546 0 01-3.172-5.136l8.45-14.902a3.548 3.548 0 016.347 0l8.452 14.902z"
        fill={fill}
      />
      <path
        d="M12 16.286a1.286 1.286 0 100 2.572 1.286 1.286 0 000-2.572z"
        fill={line}
      />
      <path
        d="M12 13.818v-5"
        stroke={line}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const InfoIcon = (props: InfoIconProps) => {
  const { title = 'information' } = props || {}
  const isSbankenTheme = useTheme()?.name === 'sbanken'
  let fill = isSbankenTheme
    ? properties.sbanken['--sb-color-green-dark-2']
    : properties.ui['--color-sea-green']
  if (props && props?.state === 'success') {
    fill = isSbankenTheme
      ? properties.sbanken['--sb-color-green-dark-3']
      : properties.ui['--color-summer-green']
  }

  const line = isSbankenTheme
    ? properties.sbanken['--sb-color-green-light-2']
    : properties.ui['--color-white']

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <title>{title}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.268 0a11.25 11.25 0 105.566 21.017l6.112 2.91a.75.75 0 001-1l-2.911-6.112A11.234 11.234 0 0011.268 0z"
        fill={fill}
      />
      <circle cx="11" cy="6.5" r=".5" fill="#fff" stroke={line} />
      <path
        d="M13.75 16H13a1.5 1.5 0 01-1.5-1.5v-3.75a.75.75 0 00-.75-.75H10"
        stroke={line}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const MarketingIcon = (props: MarketingIconProps) => {
  const { title = 'marketing' } = props || {}
  const isSbankenTheme = useTheme()?.name === 'sbanken'
  const fill = isSbankenTheme
    ? properties.sbanken['--sb-color-violet-light']
    : properties.ui['--color-black-80']

  return (
    <svg
      width="24"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <path
        d="M6 15.25H4.5c-2.042 0-3.75-1.707-3.75-3.75S2.458 7.75 4.5 7.75H6v7.5ZM7.5 15.25c4.801 0 8.846 1.897 12.75 4.5V3.25c-3.904 2.603-7.949 4.5-12.75 4.5v7.5ZM23.25 10a.75.75 0 0 0-1.5 0h1.5Zm-1.5 3a.75.75 0 0 0 1.5 0h-1.5ZM8.483 21.043a.75.75 0 1 0 1.034-1.086l-1.034 1.086ZM21.75 10v3h1.5v-3h-1.5ZM6 15.25a8.058 8.058 0 0 0 2.483 5.793l1.034-1.086A6.559 6.559 0 0 1 7.5 15.25H6Z"
        fill={fill}
      />
    </svg>
  )
}

export function setMaxWidthToElement({
  element,
  id = null,
  widthElement = null,
  widthSelector = null,
}: {
  element: HTMLElement
  id?: string | null
  widthElement?: HTMLElement | null
  widthSelector?: string | null
}) {
  if (!(element && typeof window !== 'undefined')) {
    return // stop here
  }
  try {
    if (!id && !widthSelector) {
      id = element.getAttribute('id')
    }
    widthSelector = widthSelector || id?.replace('-form-status', '') || id

    let width = sumElementWidth({
      widthElement,
      widthSelector,
    })

    if (width > 40) {
      const maxWidth = 30 * 16 // use 12rem, because that's the default width in chrome for an input
      if (width < maxWidth) {
        width = maxWidth
      }

      const remWidth = `${width / 16}rem`

      const style = window.getComputedStyle(element)
      const hasCustomWidth = element.style.maxWidth
        ? false
        : (style.minWidth !== '' && style.minWidth !== 'auto') ||
          (style.maxWidth !== '' && style.maxWidth !== 'none')

      if (!hasCustomWidth) {
        element.style.maxWidth = remWidth
      }
    }
  } catch (e) {
    // skip logging
  }
}

function sumElementWidth({
  widthElement,
  widthSelector,
}: {
  widthElement: HTMLElement | null
  widthSelector: string | null
}) {
  let width = 0
  if (typeof document === 'undefined') {
    return width // stop here
  }
  try {
    // beside "selector" - which is straight forward, we
    // also check if we can get an ID given by textId
    const ids = widthElement
      ? [widthElement]
      : widthSelector.split(/, |,/g)

    width = ids.reduce((acc, cur) => {
      const elem =
        typeof cur === 'string'
          ? cur[0] === '.'
            ? document.querySelector(cur)
            : document.getElementById(cur)
          : cur

      let elemWidth: number =
        (elem && (elem as HTMLElement).offsetWidth) ||
        parseFloat(String(window.getComputedStyle(elem).width)) ||
        0
      if (/em|rem/.test(String(window.getComputedStyle(elem).width))) {
        elemWidth =
          parseFloat(String(window.getComputedStyle(elem).width)) * 16
      }

      if (elemWidth > 0) {
        // add additional one more spacing unit
        // to make it more correct for small elements
        if (acc > 0) {
          acc += 16
        }
        acc += elemWidth
      }

      return acc
    }, width)
  } catch (e) {
    // skip logging
  }

  return width
}
