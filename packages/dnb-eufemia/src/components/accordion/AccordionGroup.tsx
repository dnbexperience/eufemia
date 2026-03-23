/**
 * Web AccordionGroup Component
 *
 */

import React, { useContext, useEffect, useRef } from 'react'

import clsx from 'clsx'
import {
  makeUniqueId,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Context from '../../shared/Context'
import AccordionGroupContext from './AccordionProviderContext'

import type { AccordionGroupProps as AccordionGroupBaseProps } from './types'
import { accordionDefaultProps } from './types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type AccordionGroupProps = React.HTMLProps<HTMLElement> &
  AccordionGroupBaseProps & {
    onInit?: (accordion: Record<string, unknown>) => void
  }

const AccordionGroup = (props: AccordionGroupProps) => {
  const context = useContext(Context)
  const id = props.id || makeUniqueId()

  const thisInstance = {
    _id: id,
    props,
    context,
    onChangeHandler,
  }

  function onChangeHandler(event) {
    dispatchCustomElementEvent(thisInstance, 'onChange', {
      id: event.id,
      expanded: event.expanded,
      event,
    })
  }

  // use only the props from context, who are available here anyway
  const extendedProps = extendPropsWithContext(
    props,
    accordionDefaultProps,
    context.Accordion,
    context.getTranslation(props)['Accordion']
  )

  const {
    expanded,
    expandedId,
    keepInDOM,
    preventRerender,
    singleContainer,
    contentRef,
    allowCloseAll,
    rememberState,
    flushRememberedState,
    noAnimation,
    iconSize,
    disabled,
    group,
    iconPosition,
    onInit,
    className,

    id: _id,
    children,
    collapseAllHandleRef,
    expandBehavior,

    ...restOfExtendedProps
  } = extendedProps

  const collapseAccordionCallbacks = useRef<(() => void)[]>([])

  useEffect(() => {
    if (collapseAllHandleRef) {
      const mutableCollapseAllHandleRef =
        collapseAllHandleRef as React.RefObject<() => void>
      mutableCollapseAllHandleRef.current = () => {
        collapseAccordionCallbacks.current.forEach((callback) =>
          callback()
        )
      }
    }
  }, [collapseAllHandleRef])

  const classes = clsx(
    'dnb-accordion-group',
    singleContainer && 'dnb-accordion-group--single-container',
    createSpacingClasses(extendedProps),
    className
  )

  const params = {
    ...restOfExtendedProps,
  }

  // also used for code markup simulation
  validateDOMAttributes(props, params)

  if (!extendedProps?.group && props.singleContainer) {
    extendedProps.group = makeUniqueId()
  }

  const contextForProvider = {
    ...extendedProps,
    id,
    onChange: onChangeHandler,
    collapseAllHandleRef,
    collapseAccordionCallbacks,
    expandBehavior,
  }

  return (
    <AccordionGroupContext value={contextForProvider}>
      <div className={classes}>
        <span
          id={id}
          className="dnb-accordion-group__shell"
          role="group"
          {...params}
        >
          <span className="dnb-accordion-group__children">{children}</span>
        </span>
      </div>
    </AccordionGroupContext>
  )
}

withComponentMarkers(AccordionGroup, {
  _supportsSpacingProps: true,
})

export default AccordionGroup
