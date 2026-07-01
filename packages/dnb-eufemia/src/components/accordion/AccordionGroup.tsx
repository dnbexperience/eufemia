/**
 * Web AccordionGroup Component
 *
 */

import { useContext, useEffect, useRef } from 'react'
import type { HTMLProps, RefObject } from 'react'

import { clsx } from 'clsx'
import {
  extendPropsWithContext,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { useSpacing, removeSpaceProps } from '../space/SpacingUtils'
import useId from '../../shared/helpers/useId'

import Context from '../../shared/Context'
import AccordionGroupContext from './AccordionProviderContext'

import type {
  AccordionGroupProps as AccordionGroupBaseProps,
  AccordionInstance,
} from './types'
import { accordionDefaultProps } from './types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type AccordionGroupProps = Omit<
  HTMLProps<HTMLElement>,
  'onChange' | 'title'
> &
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
    title: _title,
    onChange: _onChange,

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
        collapseAllHandleRef as RefObject<() => void>
      mutableCollapseAllHandleRef.current = () => {
        collapseAccordionCallbacks.current.forEach((callback) =>
          callback()
        )
      }
    }
  }, [collapseAllHandleRef])

  const rootProps = useSpacing(extendedProps, {
    className: clsx(
      'dnb-accordion-group',
      singleContainer && 'dnb-accordion-group--single-container',
      className
    ),
  })

  const params = removeSpaceProps(restOfExtendedProps)

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
