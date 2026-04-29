/**
 * Web AccordionGroup Component
 *
 */

import React, { useContext, useEffect, useRef } from 'react'

import clsx from 'clsx'
import {
  extendPropsWithContext,
  cleanDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { applySpacing } from '../space/SpacingUtils'
import useId from '../../shared/helpers/useId'

import Context from '../../shared/Context'
import AccordionGroupContext from './AccordionProviderContext'

import type {
  AccordionGroupProps as AccordionGroupBaseProps,
  AccordionInstance,
} from './types'
import { accordionDefaultProps } from './types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type AccordionGroupProps = React.HTMLProps<HTMLElement> &
  AccordionGroupBaseProps & {
    onInit?: (accordion: AccordionInstance) => void
  }

const AccordionGroup = (props: AccordionGroupProps) => {
  const context = useContext(Context)
  const id = useId(props.id)

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

  const rootProps = applySpacing(extendedProps, {
    className: clsx(
      'dnb-accordion-group',
      singleContainer && 'dnb-accordion-group--single-container',
      className
    ),
  })

  const params = cleanDOMAttributes({
    ...restOfExtendedProps,
  })

  const fallbackGroup = useId()

  if (!extendedProps?.group && props.singleContainer) {
    extendedProps.group = fallbackGroup
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
      <div {...rootProps}>
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
