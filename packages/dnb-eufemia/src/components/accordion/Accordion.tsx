/**
 * Web Accordion Component
 *
 */

import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { HTMLProps, KeyboardEvent, MouseEvent } from 'react'

import { clsx } from 'clsx'
import {
  findElementInChildren,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { useSpacing } from '../space/SpacingUtils'
import useId from '../../shared/helpers/useId'

import AccordionGroup from './AccordionGroup'
import AccordionHeader from './AccordionHeader'
import AccordionContent from './AccordionContent'
import AccordionContext from './AccordionContext'
import AccordionProviderContext from './AccordionProviderContext'
import type { AccordionTertiaryProps } from './AccordionTertiary'
import AccordionTertiary from './AccordionTertiary'
import Context from '../../shared/Context'

import { AccordionStore, Store, rememberWarning } from './AccordionStore'
import {
  accordionDefaultProps,
  type AccordionGroupProps,
  type AccordionProps,
} from './types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type * from './types'
export { accordionDefaultProps } from './types'

function Accordion({
  variant = 'outlined',
  ...restOfProps
}: AccordionProps) {
  if (variant === 'tertiary') {
    return (
      <AccordionTertiary
        {...(restOfProps as unknown as AccordionTertiaryProps)}
      />
    )
  }

  return <AccordionDefault variant={variant} {...restOfProps} />
}

function AccordionDefault({
  variant = 'outlined',
  iconSize = 'medium',
  ...restOfProps
}: AccordionProps) {
  const props = { variant, iconSize, ...restOfProps }

  const context = useContext(AccordionProviderContext)

  const group = props.group || context?.group
  const id = useId(props.id)

  const store = useMemo(
    () => new Store({ id: props.id, group }),
    [props.id, group]
  )

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

  // Sync expanded state from context
  useEffect(() => {
    if (context.flushRememberedState) {
      store.flush()
      setExpanded(props.expanded)
    }

    if (context?.expandedId && context.expandedId === props.id) {
      setExpanded(true)
    }
  }, [
    context.flushRememberedState,
    context.expandedId,
    props.expanded,
    props.id,
    store,
  ])

  // Add callback for closing all accordions inside a group if collapseAllHandleRef is defined
  if (context?.collapseAllHandleRef && !hasAddedCallbackRef.current) {
    context?.collapseAccordionCallbacks?.current.push(close)
    hasAddedCallbackRef.current = true
  }

  // Gets the initial expanded state, to prevent the opening and closing of Accordion
  // That happens when if we put this logic in a useEffect that runs after the initial expanded state is set
  // Since useEffect runs after every render
  function getInitialExpandedState() {
    if (props.expandedSsr || context?.expandedSsr) {
      return typeof window === 'undefined'
    }

    if (props.rememberState || context.rememberState) {
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

    // check if an event exists, because, then it's a user click
    if (props.rememberState || context.rememberState) {
      store.saveState(expanded)
    }
  }

  function handleDisabledClick(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    return false
  }

  type AccordionInternalChangeParams = {
    id: string
    group: string
    expanded: boolean
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement> | Event
  }

  function callOnChangeHandler(params: AccordionInternalChangeParams) {
    callOnChange(params)
    if (context?.onChange) {
      context?.onChange(params)
    }
    if (group && typeof window !== 'undefined') {
      window?.['__dnbAccordion'][group]?.onChange(params)
    }
  }

  function callOnChange(params: AccordionInternalChangeParams) {
    const { expanded, event } = params

    changeOpened(expanded)

    dispatchCustomElementEvent(thisInstance, 'onChange', {
      expanded,
      event,
    })
  }

  const globalContext = useContext(Context)
  const nestedContext = useContext(AccordionContext)

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
    variant: extendedVariant,
    className,
    keepInDOM,
    openOnFind: openOnFindProp,
    preventRerender,
    preventRerenderConditional,
    singleContainer,
    rememberState,
    disabled,
    skeleton,
    noAnimation,
    expandedSsr: _expandedSsr,
    children,

    id: _id,
    group: _group,
    // expanded: _expanded,

    title,
    description,
    leftComponent,
    icon,
    iconPosition,
    iconSize: _iconSize,
    onChange,

    contentRef,

    ...restOfExtendedProps
  } = extendedProps

  const openOnFind = openOnFindProp ?? keepInDOM

  const mainParams = useSpacing(extendedProps, {
    id,
    className: clsx(
      'dnb-accordion',
      expandedState && 'dnb-accordion--expanded',
      extendedVariant && `dnb-accordion__variant--${extendedVariant}`,
      keepInDOM && 'dnb-accordion--prerender',
      className
    ),
  }) as HTMLProps<HTMLDivElement>

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
    keepInDOM: keepInDOM,
    openOnFind: openOnFind,
    preventRerender: preventRerender,
    preventRerenderConditional: preventRerenderConditional,
    singleContainer: singleContainer,
    rememberState: rememberState,
    disabled: disabled,
    skeleton: skeleton,
    noAnimation: noAnimation,
    callOnChange: callOnChangeHandler,
  }

  return (
    <AccordionContext value={accordionContext}>
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
    </AccordionContext>
  )
}

const Group = ({
  expandBehavior = 'single',
  ...props
}: AccordionGroupProps) => {
  if (props.rememberState && !props.id) {
    rememberWarning('accordion group')
  }

  const [expandedId, setExpandedId] = useState<string | null>(null)

  const instanceIDs = useRef<string[]>([])

  const fallbackGroup = useId()

  const group = props?.id
    ? props.id
    : !props.group
      ? '#' + fallbackGroup
      : undefined

  const store = useMemo(() => new Store({ group }), [group])

  // Set stored expandedId on mount
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
      expandBehavior={expandBehavior}
      expandedId={expandedId || props.expandedId}
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

withComponentMarkers(Accordion, {
  _supportsSpacingProps: true,
})

export default Accordion
