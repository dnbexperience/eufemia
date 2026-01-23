/**
 * Web FormStatus Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useTheme, Context } from '../../shared'
import {
  isTrue,
  makeUniqueId,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import HeightAnimation from '../height-animation/HeightAnimation'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import Icon from '../icon/Icon'
import GlobalStatusProvider from '../global-status/GlobalStatusProvider'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import ui from '../../style/themes/theme-ui/properties'
import sbanken from '../../style/themes/theme-sbanken/properties'

const properties = { ui, sbanken }

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
  ]),
  label: PropTypes.node,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  iconSize: PropTypes.string,
  state: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.oneOf(['error', 'warn', 'info', 'marketing']),
  ]),
  variant: PropTypes.oneOf(['flat', 'outlined']),
  size: PropTypes.oneOf(['default', 'large']),
  globalStatus: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }),
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  textId: PropTypes.string,
  widthSelector: PropTypes.string,
  widthElement: PropTypes.object,
  noAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  role: PropTypes.string,

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
}

const defaultProps = {
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

const getContent = (props) => {
  if (props.text) {
    if (isTrue(props.text)) {
      return null
    }
    return props.text
  }
  return processChildren(props)
}

const correctStatus = (state) => {
  switch (state) {
    case 'information':
      state = 'info'
      break
    case 'warning':
      state = 'warn'
      break
  }
  return state
}

const getIcon = ({ state, icon, iconSize }) => {
  if (typeof icon !== 'string') {
    return icon
  }

  let IconToLoad = icon

  switch (correctStatus(state)) {
    case 'info':
    case 'success':
      IconToLoad = InfoIcon
      break
    case 'warn':
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

function FormStatus(localProps) {
  const context = React.useContext(Context)

  // Refs
  const _ref = React.useRef(null)
  const _globalStatusRef = React.useRef(null)
  const contentCacheRef = React.useRef(null)
  const stateCacheRef = React.useRef(null)

  // State
  const [id, setId] = React.useState(() => localProps.id || makeUniqueId())

  // Update id when props.id changes
  React.useEffect(() => {
    if (localProps.id && localProps.id !== id) {
      setId(localProps.id)
    }
  }, [localProps.id, id])

  // Helper functions
  const getProps = React.useCallback(
    (ctx = context) => {
      return extendPropsWithContextInClassComponent(
        localProps,
        defaultProps,
        { skeleton: ctx?.skeleton },
        pickFormElementProps(ctx?.formElement),
        ctx?.FormStatus
      )
    },
    [localProps, context]
  )

  const getStatusId = React.useCallback(() => {
    return `${id}-gs`
  }, [id])

  const updateWidth = React.useCallback(() => {
    // set max-width to this form-status, using the "linked mother"
    if (_ref.current) {
      const { widthElement, widthSelector } = localProps
      setMaxWidthToElement({
        element: _ref.current,
        widthElement: widthElement && widthElement.current,
        widthSelector: widthSelector,
      })
    }
  }, [localProps])

  const shouldAnimate = React.useCallback(() => {
    return localProps.noAnimation === false
  }, [localProps.noAnimation])

  const isReadyToGetVisible = React.useCallback(
    (props = null) => {
      const p = props || localProps
      return isTrue(p.show) && getContent(p) ? true : false
    },
    [localProps]
  )

  const fillCache = React.useCallback(() => {
    const animate = shouldAnimate()

    // Content
    const content = animate && getContent(localProps)
    if (content && content !== contentCacheRef.current) {
      contentCacheRef.current = content
    }

    // State
    const state = animate && correctStatus(localProps.state)
    if (state) {
      stateCacheRef.current = state
    }
  }, [localProps, shouldAnimate])

  const init = React.useCallback(() => {
    if (_globalStatusRef.current) {
      _globalStatusRef.current.isReady()
      updateWidth()
      fillCache()
    }
  }, [updateWidth, fillCache])

  // Initialize GlobalStatusProvider
  React.useEffect(() => {
    const globalStatusId =
      localProps?.globalStatus?.id ||
      context?.FormStatus?.globalStatus?.id ||
      context?.formElement?.globalStatus?.id ||
      'main'

    const provider = GlobalStatusProvider.init(
      globalStatusId,
      (providerInstance) => {
        // gets called once ready
        const props = getProps()
        if (props.state === 'error' && isReadyToGetVisible(props)) {
          const { state, text, children, globalStatus, label } = props
          providerInstance.add({
            state,
            statusId: getStatusId(),
            item: {
              itemId: id,
              text: globalStatus?.message || text || children,
              statusAnchorLabel: label,
              statusAnchorUrl: true,
            },
            ...globalStatus,
          })
        }
      }
    )

    _globalStatusRef.current = provider

    return () => {
      // componentWillUnmount equivalent
      const statusId = getStatusId()
      provider.remove(statusId)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // componentDidMount equivalent
  React.useEffect(() => {
    if (document.readyState === 'complete') {
      init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', init)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWidth)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', init)
        window.removeEventListener('resize', updateWidth)
      }
    }
  }, [init, updateWidth])

  // componentDidUpdate equivalent
  const prevPropsRef = React.useRef(localProps)
  React.useEffect(() => {
    const prevProps = prevPropsRef.current
    const { state, show, text, globalStatus, children, label } = getProps()

    if (
      prevProps.text !== text ||
      prevProps.children !== children ||
      prevProps.show !== show ||
      prevProps.globalStatus?.show !== globalStatus?.show ||
      prevProps.state !== state
    ) {
      fillCache()

      if (state === 'error') {
        const statusId = getStatusId()

        if (isTrue(show)) {
          _globalStatusRef.current.update(
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
        } else if (!getContent(localProps)) {
          const statusId = getStatusId()
          _globalStatusRef.current.remove(statusId)
        }
      }

      if (isReadyToGetVisible()) {
        updateWidth()
      }
    }

    prevPropsRef.current = localProps
  }, [
    localProps,
    getProps,
    fillCache,
    getStatusId,
    id,
    isReadyToGetVisible,
    updateWidth,
  ])

  // Render
  const props = getProps()

  const {
    title,
    state: rawState,
    size,
    variant,
    className,
    stretch,
    shellSpace,
    textId,

    show, // eslint-disable-line
    noAnimation, // eslint-disable-line
    label, // eslint-disable-line
    statusId, // eslint-disable-line
    globalStatus, // eslint-disable-line
    id: _ignoreId, // eslint-disable-line
    text, // eslint-disable-line
    icon, // eslint-disable-line
    iconSize, // eslint-disable-line
    widthSelector, // eslint-disable-line
    widthElement, // eslint-disable-line
    skeleton, // eslint-disable-line
    children, // eslint-disable-line
    role,

    ...rest
  } = props

  const state = correctStatus(rawState) || stateCacheRef.current
  const iconToRender = getIcon({
    state,
    icon,
    iconSize,
  })

  const contentToRender = getContent(localProps)

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
    id: !String(id).startsWith('null') ? id : null,
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
  validateDOMAttributes(localProps, params)
  validateDOMAttributes(null, textParams)

  return (
    <HeightAnimation
      element="span"
      open={isReadyToGetVisible()}
      animate={shouldAnimate()}
      duration={600}
      {...params}
      innerRef={_ref}
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

FormStatus.propTypes = propTypes
FormStatus.defaultProps = defaultProps
FormStatus.getContent = getContent
FormStatus.correctStatus = correctStatus
FormStatus.getIcon = getIcon

export default FormStatus

export const ErrorIcon = (props) => {
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
ErrorIcon.propTypes = {
  title: PropTypes.string,
}

export const WarnIcon = (props) => {
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
WarnIcon.propTypes = {
  title: PropTypes.string,
}

export const InfoIcon = (props) => {
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
InfoIcon.propTypes = {
  title: PropTypes.string,
}

export const MarketingIcon = (props) => {
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
MarketingIcon.propTypes = {
  title: PropTypes.string,
}

export function setMaxWidthToElement({
  element,
  id = null,
  widthElement = null,
  widthSelector = null,
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

function sumElementWidth({ widthElement, widthSelector }) {
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

      let width =
        (elem && elem.offsetWidth) || window.getComputedStyle(elem).width
      if (/em|rem/.test(width)) {
        width = parseFloat(width) * 16
      }

      if (width > 0) {
        // add additional one more spacing unit
        // to make it more correct for small elements
        if (acc > 0) {
          acc += 16
        }
        acc += width
      }

      return acc
    }, width)
  } catch (e) {
    // skip logging
  }

  return width
}

FormStatus._supportsSpacingProps = true
