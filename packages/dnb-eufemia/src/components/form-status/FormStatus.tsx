/**
 * Web FormStatus Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useTheme, Context } from '../../shared'
import {
  makeUniqueId,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import HeightAnimation from '../height-animation/HeightAnimation'
import { createSpacingClasses } from '../space/SpacingHelper'
import Icon from '../icon/Icon'
import GlobalStatusProvider from '../global-status/GlobalStatusProvider'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import ui from '../../style/themes/ui/properties'
import sbanken from '../../style/themes/sbanken/properties'
import type { GlobalStatusConfigObject } from '../GlobalStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceTypeAll } from '../space/types'

const properties = { ui, sbanken }

export type FormStatusText =
  | string
  | boolean
  | (() => React.ReactNode)
  | React.ReactNode
export type FormStatusState =
  | boolean
  | string
  | 'error'
  | 'warning'
  | 'info'
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
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
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
   * Defines the visual appearance of the status. These are the statuses `error`, `warning`, `info` and `marketing`. The default status is `error`.
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

export type FormStatusIconTypes =
  | typeof ErrorIcon
  | typeof WarnIcon
  | typeof InfoIcon
  | typeof MarketingIcon

type FormStatusComponentState = {
  id: string | null
  _id?: string
}

export default class FormStatus extends React.PureComponent<
  FormStatusProps,
  FormStatusComponentState
> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  _globalStatus: ReturnType<typeof GlobalStatusProvider.init>
  _ref: React.RefObject<HTMLElement | null>
  _isMounted: boolean
  contentCache: React.ReactNode | null
  stateCache: string | null

  static defaultProps = {
    id: null,
    title: null,
    show: true,
    text: null,
    globalStatus: null,
    label: null,
    icon: 'error',
    iconSize: 'medium',
    size: 'default',
    variant: null,
    state: 'error',
    attributes: null,
    textId: null,
    widthSelector: null,
    widthElement: null,
    noAnimation: null,
    skeleton: null,
    stretch: null,
    role: null,
    className: null,
    children: null,
  }

  static getContent(props: FormStatusProps) {
    if (props.text) {
      if (props.text === true) {
        return null
      }
      return props.text
    }
    return processChildren(props)
  }

  static correctStatus(state: FormStatusState | undefined) {
    switch (state) {
      case 'information':
        state = 'info'
        break
    }
    return state
  }

  static getIcon({
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

    switch (FormStatus.correctStatus(state)) {
      case 'info':
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

  static getDerivedStateFromProps(
    props: FormStatusProps,
    state: FormStatusComponentState
  ) {
    if (state._id !== props.id && props.id) {
      state.id = props.id
    }

    state._id = props.id

    return state
  }

  state = { id: null }

  constructor(
    props: FormStatusProps,
    context: React.ContextType<typeof Context>
  ) {
    super(props)

    // we do not use a random ID here, as we don't need it for now
    this.state.id = props.id || makeUniqueId()

    this._globalStatus = GlobalStatusProvider.init(
      props?.globalStatus?.id ||
        (context as Record<string, any>)?.FormStatus?.globalStatus?.id ||
        (context as Record<string, any>)?.formElement?.globalStatus?.id ||
        'main',
      (provider) => {
        // gets called once ready
        if (this.props.state === 'error' && this.isReadyToGetVisible()) {
          const { state, text, children, globalStatus, label } =
            this.getProps(context)
          provider.add({
            state,
            statusId: this.getStatusId(),
            item: {
              itemId: this.state.id,
              text: globalStatus?.message || text || children,
              statusAnchorLabel: label,
              statusAnchorUrl: true,
            },
            ...globalStatus,
          })
        }
      }
    )

    this._ref = React.createRef()
  }

  init = () => {
    if (this._isMounted) {
      this._globalStatus.isReady()

      this.updateWidth()
      this.fillCache()
    }
  }

  componentDidMount() {
    this._isMounted = true
    if (document.readyState === 'complete') {
      this.init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', this.init)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateWidth)
    }
  }

  fillCache() {
    const shouldAnimate = this.shouldAnimate()

    // Content
    const content = shouldAnimate && FormStatus.getContent(this.props)
    if (content && content !== this.contentCache) {
      this.contentCache = content
    }

    // State
    const state =
      shouldAnimate && FormStatus.correctStatus(this.props.state)
    if (state) {
      this.stateCache = state as string
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    const statusId = this.getStatusId()
    this._globalStatus.remove(statusId)
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', this.init)
      window.removeEventListener('resize', this.updateWidth)
    }
  }

  componentDidUpdate(prevProps: FormStatusProps) {
    const { state, show, text, globalStatus, children, label } =
      this.getProps()

    if (
      prevProps.text !== text ||
      prevProps.children !== children ||
      prevProps.show !== show ||
      (prevProps.globalStatus as Record<string, unknown>)?.show !==
        (globalStatus as Record<string, unknown>)?.show ||
      prevProps.state !== state
    ) {
      this.fillCache()

      if (state === 'error') {
        const statusId = this.getStatusId()

        if (show) {
          this._globalStatus.update(
            statusId,
            {
              state,
              statusId,
              item: {
                itemId: this.state.id,
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
        } else if (!FormStatus.getContent(this.props)) {
          const statusId = this.getStatusId()
          this._globalStatus.remove(statusId)
        }
      }

      if (this.isReadyToGetVisible()) {
        this.updateWidth()
      }
    }
  }

  getProps(context: React.ContextType<typeof Context> = this.context) {
    return extendPropsWithContextInClassComponent(
      this.props,
      FormStatus.defaultProps,
      { skeleton: context?.skeleton },
      pickFormElementProps(context?.formElement),
      context?.FormStatus
    )
  }

  getStatusId() {
    return `${this.state.id}-gs`
  }

  updateWidth = () => {
    // set max-width to this form-status, using the "linked mother"
    if (this._ref.current) {
      const { widthElement, widthSelector } = this.props
      setMaxWidthToElement({
        element: this._ref.current,
        widthElement: widthElement?.current ?? null,
        widthSelector: widthSelector as string,
      })
    }
  }

  shouldAnimate() {
    return this.props.noAnimation === false
  }

  isReadyToGetVisible(props: FormStatusProps = this.props) {
    return props.show && FormStatus.getContent(props) ? true : false
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = this.getProps()

    const {
      title,
      state: rawState,
      size,
      variant,
      className,
      stretch,
      shellSpace,
      textId,

      show,
      noAnimation,
      label,
      statusId,
      globalStatus,
      id,
      text,
      icon,
      iconSize,
      widthSelector,
      widthElement,
      skeleton,
      children,
      role,

      ...rest
    } = props as any

    const state =
      (FormStatus.correctStatus(rawState) as string) || this.stateCache
    const iconToRender = FormStatus.getIcon({
      state,
      icon,
      iconSize,
    })

    const contentToRender = FormStatus.getContent(this.props)

    const hasStringContent =
      typeof contentToRender === 'string' && contentToRender.length > 0

    const params = {
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
      id: !String(id).startsWith('null') ? this.state.id : null,
      title,
      role,
      ...rest,
    }

    if (!role) {
      switch (state) {
        case 'info':
          params.role = 'status'
          break
        default:
          params.role = 'alert'
      }
    }

    const textParams = {
      className: clsx(
        'dnb-form-status__text',
        createSkeletonClass('font', skeleton, this.context)
      ),
      id: !String(textId).startsWith('null') ? textId : null,
    }

    const shellParams = {
      className: clsx(
        'dnb-form-status__shell',
        createSpacingClasses({ space: shellSpace })
      ),
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)
    validateDOMAttributes(null, textParams)

    return (
      <HeightAnimation
        element="span"
        open={this.isReadyToGetVisible()}
        animate={this.shouldAnimate()}
        duration={600}
        {...(params as any)}
        ref={this._ref}
      >
        <span {...shellParams}>
          {iconToRender}
          <span {...textParams}>
            {contentToRender || this.contentCache}
          </span>
        </span>
      </HeightAnimation>
    )
  }
}

withComponentMarkers(FormStatus, { _supportsSpacingProps: true })

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
  const { title = 'info' } = props || {}
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
