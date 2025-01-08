/**
 * Web Accordion Component
 *
 */

import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  HTMLProps,
  useMemo,
} from 'react'

import classnames from 'classnames'
import {
  makeUniqueId,
  findElementInChildren,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import type { ButtonIconPosition } from '../Button'
import type { HeadingLevel } from '../Heading'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'

import AccordionGroup from './AccordionGroup'
import AccordionHeader from './AccordionHeader'
import AccordionContent from './AccordionContent'
import AccordionContext from './AccordionContext'
import AccordionProviderContext from './AccordionProviderContext'
import Context from '../../shared/Context'

import { AccordionStore, Store, rememberWarning } from './AccordionStore'
import { accordionDefaultProps } from './defaultProps'

export type AccordionVariant = 'plain' | 'default' | 'outlined' | 'filled'

export type AccordionHeading = boolean | React.ReactNode

export type AccordionIcon =
  | IconIcon
  | {
      closed?: IconIcon
      /**
       * If set to `true` the accordion will be expanded as its initial state.
       */
      expanded?: IconIcon
    }

export type AccordionAttributes = string | Record<string, unknown>

export type AccordionIconPosition = ButtonIconPosition

export type AccordionProps = Omit<React.HTMLProps<HTMLElement>, 'ref'> &
  SpacingProps & {
    /**
     * A title as a string or React element. It will be used as the button text.
     */
    title?: React.ReactNode
    description?: React.ReactNode
    /**
     * If set to `true` the accordion will be expanded as its initial state.
     */
    expanded?: boolean
    /**
     * If set to `true`, the open and close animation will be omitted.
     */
    no_animation?: boolean
    /**
     * If set to `true` the accordion will be expanded during SSR. Can be potentially useful for SEO, although it will disturb client hydration, where React expects the same state. But that&#39;s mainly a technical aspect to consider.
     */
    expanded_ssr?: boolean
    /**
     */
    prerender?: boolean
    /**
     * If set to `true` the accordion component will not re-render its content – can be useful for components you don&#39;t have control of storing the temporary state during an interaction.
     */
    prevent_rerender?: boolean
    /**
     * Use this prop together with `prevent_rerender` – and if it is to `true`, the accordion component will re-render if the children are a new React element and does not match the previous one anymore.
     */
    prevent_rerender_conditional?: boolean
    /**
     * If set to `true`, it will remember a changed state initiated by the user. It requires a unique `id`. It will store the sate in the local storage.
     */
    remember_state?: boolean
    /**
     * Send along a custom React Ref for `.dnb-accordion__content`.
     */
    contentRef?: React.MutableRefObject<unknown>
    /**
     * If set to `true`, the saved (remembered) will be removed and the initial component state will be used and set.
     */
    flush_remembered_state?: boolean
    /**
     * If set to `true`, a group of accordions will be wrapped to sidebar looking menu for medium and larger screens.
     */
    single_container?: boolean
    /**
     * Defines the used styling. As of now, only `outlined` is available. Use `plain` for no styles. It defaults to `outlined`.
     */
    variant?: AccordionVariant
    /**
     * Will add a React element on the left side of the `title`, inside `AccordionHeaderContainer`.
     */
    left_component?: React.ReactNode
    /**
     * If set to `true`, the accordion button will be disabled (dimmed).
     */
    disabled?: boolean
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow
    /**
     * A unique `id` that will be used on the button element. If you use `remember_state`, an id is required.
     */
    id?: string
    group?: string
    /**
     * Gives you the option to replace the used `button` element. Provide a React element, including a string (HTML element). Defaults to a `div` with all the needed accessibility features included.
     */
    element?: React.ReactNode
    /**
     * If set to `true`, level 2 (h2) will be used. You can provide your own HTML heading (`h3`), or provide a `heading_level` property.
     */
    heading?: AccordionHeading
    /**
     * If `heading` is set to `true`, you can provide a numeric value to define a different heading level. Defaults to `2`.
     */
    heading_level?: HeadingLevel
    /**
     * Will replace the `chevron` icon. The icon will still rotate (by CSS). You can use an object to use two different icons, one for the closed state and one for the expanded state `{ closed, expanded }`.
     */
    icon?: AccordionIcon
    /**
     * Will set the placement of the icon. Defaults to `left`.
     */
    icon_position?: AccordionIconPosition
    /**
     * Define a different icon size. Defaults to `medium` (1.5rem).
     */
    icon_size?: IconSize
    attributes?: AccordionAttributes
    className?: string
    children?: React.ReactNode
    /**
     * Will be called by user click interaction. Returns an object with a boolean state `expanded` inside `{ expanded, id, event, ...event }`.
     */
    on_change?: (...args: any[]) => any
    on_state_update?: (...args: any[]) => any
  }

function Accordion({
  variant = 'outlined',
  icon_size = 'medium',
  ...restOfProps
}: AccordionProps) {
  const props = { variant, icon_size, ...restOfProps }

  const context = useContext(AccordionProviderContext)

  const group = props.group || context?.group
  const id = useRef(props.id || makeUniqueId()).current

  const store = new Store({ id: props.id, group })

  // States ordered last here to make sure that the getInitialExpandedState have access to the store
  const [previousExpanded, setPreviousExpanded] = useState(props.expanded)
  const [expanded, setExpanded] = useState<boolean>(
    getInitialExpandedState()
  )
  const hasAddedCallbackRef = useRef<boolean>(false)

  // replacement for getDerivedStateFromProps
  if (props.expanded !== previousExpanded) {
    setExpanded(props.expanded !== undefined ? props.expanded : false)
    setPreviousExpanded(props.expanded)
  }

  const thisInstance = {
    _id: id,
    context,
    handleDisabledClick,
    callOnChange,
    callOnChangeHandler,
    close,
    setExpandedState,
    state: { expanded, group },
    props,
    store,
  }

  // Constructor
  useEffect(() => {
    if (group && typeof window !== 'undefined') {
      window['__dnbAccordion'] = window['__dnbAccordion'] || {}
      window['__dnbAccordion'][group] =
        window['__dnbAccordion'][group] || new AccordionStore(group)

      window['__dnbAccordion'][group].addInstance(thisInstance)
    }

    if (context && typeof context?.onInit === 'function') {
      context.onInit(thisInstance)
    }

    return () => {
      if (group && typeof window !== 'undefined') {
        window?.['__dnbAccordion'][group]?.removeInstance(thisInstance)
      }
    }
  }, [])

  // componentDidUpdate
  useEffect(() => {
    if (context.flush_remembered_state) {
      store.flush()
      setExpanded(props.expanded)
    }

    if (context?.expanded_id && context.expanded_id === props.id) {
      setExpanded(true)
    }
  }, [
    context.flush_remembered_state,
    context.expanded_id,
    props.expanded,
    props.id,
    store,
  ])

  // Add callback for closing all accordions inside a group if collapseAllHandleRef is defined
  if (context?.collapseAllHandleRef && !hasAddedCallbackRef.current) {
    context?.collapseAccordionCallbacks?.current.push(close)
    hasAddedCallbackRef.current = true
  }

  // Gets the initial expanded sate, to prevent the opening and closing of Accordion
  // That happens when if we put this logic in a useEffect that runs after the initial expanded state is set
  // Since useEffect runs after every render
  function getInitialExpandedState() {
    if (props.expanded_ssr || context?.expanded_ssr) {
      return typeof window === 'undefined'
    }

    if (props.remember_state || context.remember_state) {
      const storedExpanded = store.getState()

      if (props.expanded && storedExpanded === false) {
        return false
      }

      if (storedExpanded) {
        return true
      }
    }

    return props.expanded !== undefined
      ? props.expanded
      : context?.expanded !== undefined
      ? context.expanded
      : false
  }

  function setExpandedState(expanded: boolean) {
    setExpanded(expanded)
  }

  function close() {
    changeOpened(false)
  }

  function changeOpened(expanded: boolean) {
    setExpanded(expanded)

    // check if a event exists, because, then it's a user click
    if (props.remember_state || context.remember_state) {
      store.saveState(expanded)
    }
  }

  function handleDisabledClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    return false
  }

  function callOnChangeHandler(...params: any[]) {
    callOnChange(...params)
    if (context?.onChange) {
      context?.onChange(...params)
    }
    if (group && typeof window !== 'undefined') {
      window?.['__dnbAccordion'][group]?.onChange(...params)
    }
  }

  function callOnChange(...params: any[]) {
    const { expanded, event } = params[0]

    changeOpened(expanded)

    dispatchCustomElementEvent(thisInstance, 'on_change', {
      expanded,
      event,
    })
  }

  return (
    <Context.Consumer>
      {(globalContext) => (
        <AccordionContext.Consumer>
          {(nestedContext) => {
            // use only the props from context, who are available here anyway
            let expandedState = expanded

            const extendedProps = extendPropsWithContext(
              props,
              accordionDefaultProps,
              context, // group context
              nestedContext as Record<string, unknown>, // internal context
              { skeleton: globalContext?.skeleton },
              globalContext.Accordion, // global context
              globalContext.translation['Accordion']
            )

            if (expandedState === undefined && globalContext.Accordion) {
              if (globalContext.Accordion.expanded) {
                expandedState = extendedProps.expanded
              }
            }

            const {
              variant,
              className,
              prerender,
              prevent_rerender,
              prevent_rerender_conditional,
              single_container,
              remember_state,
              disabled,
              skeleton,
              no_animation,
              expanded_ssr: _expanded_ssr, // eslint-disable-line
              children,

              id: _id, // eslint-disable-line
              group: _group, // eslint-disable-line
              // expanded: _expanded, // eslint-disable-line

              title, // eslint-disable-line
              description, // eslint-disable-line
              left_component, // eslint-disable-line
              icon, // eslint-disable-line
              icon_position, // eslint-disable-line
              icon_size, // eslint-disable-line
              on_change, // eslint-disable-line
              on_state_update, // eslint-disable-line

              contentRef, // eslint-disable-line

              ...restOfExtendedProps
            } = extendedProps

            const mainParams = {
              id,
              className: classnames(
                'dnb-accordion',
                expandedState && 'dnb-accordion--expanded',
                variant && `dnb-accordion__variant--${variant}`,
                prerender && 'dnb-accordion--prerender',
                createSpacingClasses(extendedProps),
                className
              ),
            } as HTMLProps<HTMLDivElement>

            if (disabled) {
              mainParams.onClick = handleDisabledClick
            }

            // to remove spacing props
            validateDOMAttributes(props, restOfExtendedProps)

            const extendedPropsForContext = extendPropsWithContext(
              props,
              accordionDefaultProps,
              { expanded, group },
              context
            )

            const accordionContext = {
              ...extendedPropsForContext,
              id,
              expanded: expandedState,
              prerender: prerender,
              prevent_rerender: prevent_rerender,
              prevent_rerender_conditional: prevent_rerender_conditional,
              single_container: single_container,
              remember_state: remember_state,
              disabled: disabled,
              skeleton: skeleton,
              no_animation: no_animation,
              callOnChange: callOnChangeHandler,
            }

            return (
              <AccordionContext.Provider value={accordionContext}>
                <div {...mainParams}>
                  {findElementInChildren(
                    children,
                    (cur) => cur.type === AccordionHeader
                  ) ? null : (
                    <AccordionHeader />
                  )}
                  {findElementInChildren(
                    children,
                    (cur) => cur.type === AccordionContent
                  ) ? (
                    children
                  ) : (
                    <AccordionContent>{children}</AccordionContent>
                  )}
                </div>
              </AccordionContext.Provider>
            )
          }}
        </AccordionContext.Consumer>
      )}
    </Context.Consumer>
  )
}
// TEMPORARY SOLUTION (defaultProps will be deprecated at one point). Needs to replacement with default prop parameters for example "({expanded: null})"
// Only solved this way to prevent tests from failing, for when expanded is undefined instead of null
Accordion.defaultProps = accordionDefaultProps

export type GroupProps = AccordionProps & {
  allow_close_all?: boolean
  /**
   * Determines how many accordions can be expanded at once.
   * Default: `single`
   */
  /**
   * @deprecated – Replaced with expandBehavior, expandBehaviour can be removed in v11.
   */
  expandBehaviour?: 'single' | 'multiple'
  /**
   * Determines how many accordions can be expanded at once.
   * Default: `single`
   */
  expandBehavior?: 'single' | 'multiple'
  /**
   * ref handle to collapse all expanded accordions. Send in a ref and use `.current()` to collapse all accordions.
   *
   * Default: `undefined`
   */
  expanded_id?: string
  collapseAllHandleRef?: React.MutableRefObject<() => void>
}

const Group = ({
  expandBehaviour = 'single',
  expandBehavior = 'single',
  ...props
}: GroupProps) => {
  if (props.remember_state && !props.id) {
    rememberWarning('accordion group')
  }

  const [expandedId, setExpandedId] = useState<string | null>(null)

  const instanceIDs = useRef<string[]>([])

  const group = props?.id
    ? props.id
    : !props.group
    ? '#' + makeUniqueId()
    : undefined

  const store = useMemo(() => new Store({ group }), [group])

  // Set stored expanded_id on mount
  useEffect(() => {
    const storedData = store.getData()
    const currentIDs = instanceIDs?.current

    if (!storedData?.id) {
      return
    }

    if (currentIDs.includes(storedData?.id)) {
      return
    }

    // 1. get the fallback id
    const fallbackId = currentIDs[0]

    if (!fallbackId) {
      return
    }

    // 2. set the fallback ids
    setExpandedId(fallbackId)
  }, [store])

  // Store and reset fallback id
  useEffect(() => {
    if (!expandedId) {
      return
    }

    // 3. save the fallback id
    store.saveState(true, expandedId)

    // 4. and reset the fallback id
    setExpandedId(null)
  }, [expandedId, store])

  function onInit(instance) {
    if (
      instance.props.id &&
      !instanceIDs.current.includes(instance.props.id)
    ) {
      instanceIDs.current.push(instance.props.id)
    }
  }

  return (
    <AccordionGroup
      onInit={onInit}
      {...props}
      group={group}
      expandBehaviour={expandBehaviour}
      expandBehavior={expandBehavior}
      expanded_id={expandedId || props.expanded_id}
    />
  )
}

Accordion.Provider = AccordionGroup
Accordion.Header = AccordionHeader
Accordion.Content = AccordionContent

Accordion.Group = Group

Group.Store = (group: string, id: string = null) => {
  return new Store({ group, id })
}

Accordion.Store = (id: string) => {
  return new Store({ id })
}

Accordion._supportsSpacingProps = true

export default Accordion
