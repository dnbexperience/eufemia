/**
 * Web AccordionGroup Component
 *
 */

import React, { useContext } from 'react'

import classnames from 'classnames'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Context from '../../shared/Context'
import AccordionGroupContext from './AccordionProviderContext'

import type { GroupProps } from './Accordion'
import { accordionDefaultProps } from './defaultProps'

export type AccordionGroupProps = React.HTMLProps<HTMLElement> &
  GroupProps & {
    onInit?: (...args: any[]) => any
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
    dispatchCustomElementEvent(thisInstance, 'on_change', {
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
    context.getTranslation(props).Accordion
  )

  const {
    expanded, // eslint-disable-line
    expanded_id, // eslint-disable-line
    prerender, // eslint-disable-line
    prevent_rerender, // eslint-disable-line
    single_container, // eslint-disable-line
    contentRef, // eslint-disable-line
    allow_close_all, // eslint-disable-line
    remember_state, // eslint-disable-line
    flush_remembered_state, // eslint-disable-line
    disabled, // eslint-disable-line
    group, // eslint-disable-line
    onInit, // eslint-disable-line
    className,
    class: _className,

    id: _id, // eslint-disable-line
    children, // eslint-disable-line

    ...restOfExtendedProps
  } = extendedProps

  const classes = classnames(
    'dnb-accordion-group',
    isTrue(single_container) && 'dnb-accordion-group--single-container',
    createSpacingClasses(extendedProps),
    className,
    _className
  )

  const params = {
    ...restOfExtendedProps,
  }

  // also used for code markup simulation
  validateDOMAttributes(props, params)

  if (!extendedProps?.group && isTrue(props.single_container)) {
    extendedProps.group = makeUniqueId()
  }

  const contextForProvider = {
    ...extendedProps,
    id,
    onChange: onChangeHandler,
  }

  return (
    <AccordionGroupContext.Provider value={contextForProvider}>
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
    </AccordionGroupContext.Provider>
  )
}

export default AccordionGroup
