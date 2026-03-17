/**
 * Web TermDefinition Component
 */

import React, { useCallback, useContext, useRef, useState } from 'react'
import clsx from 'clsx'
import Popover from '../popover/Popover'
import useId from '../../shared/helpers/useId'
import useTranslation from '../../shared/useTranslation'
import type { SpacingProps } from '../../shared/types'
import {
  createSpacingClasses,
  removeSpaceProps,
} from '../space/SpacingHelper'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'

export type TermDefinitionProps = {
  /**
   * The term shown as the anchor trigger.
   */
  children: React.ReactNode
  /**
   * The explanatory text/content shown inside the tooltip.
   */
  content: React.ReactNode
  /**
   * Optional CSS class for the anchor trigger.
   */
  className?: string
  /**
   * Tooltip placement relative to the trigger.
   */
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

export type TermDefinitionAllProps = TermDefinitionProps &
  SpacingProps &
  React.HTMLAttributes<HTMLSpanElement>

const defaultProps: Partial<TermDefinitionAllProps> = {
  placement: 'bottom',
}

export default function TermDefinition(
  localProps: TermDefinitionAllProps
) {
  const context = useContext(Context)

  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context?.TermDefinition
  )

  const { children, content, className, placement, ...rest } = allProps

  const [active, setActive] = useState(false)
  const triggerRef = useRef<HTMLSpanElement | null>(null)
  const id = useId()
  const { TermDefinition: tr = {} } = useTranslation()
  const title = active ? tr.closeTriggerTitle : tr.openTriggerTitle

  const toggle = useCallback((next?: boolean) => {
    setActive((prev) => {
      const value = typeof next === 'boolean' ? next : !prev
      if (prev && !value) {
        triggerRef.current?.focus({ preventScroll: true })
      }
      return value
    })
  }, [])

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault()
      toggle()
    },
    [toggle]
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement> & KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        toggle(false)
      }
    },
    [toggle]
  )

  const spacingClasses = createSpacingClasses(rest)
  const triggerProps = removeSpaceProps(rest)

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        ref={triggerRef}
        className={clsx(
          'dnb-term-definition__trigger',
          'dnb-anchor',
          active && 'dnb-anchor--hover',
          className,
          spacingClasses
        )}
        aria-expanded={active}
        aria-controls={active ? id : undefined}
        aria-describedby={`${id}-description`}
        title={title}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...triggerProps}
      >
        {children}
      </span>

      <span className="dnb-sr-only" aria-hidden id={`${id}-description`}>
        {title}
      </span>

      <Popover
        id={id}
        targetElement={triggerRef}
        open={active}
        onOpenChange={toggle}
        showDelay={0}
        hideDelay={0}
        triggerOffset={4}
        placement={placement}
        arrowPosition="left"
        alignOnTarget="left"
        arrowEdgeOffset={0}
        className="dnb-term-definition"
        portalRootClass="dnb-term-definition__portal"
        omitDescribedBy
        hideArrow
        title={children}
      >
        {content}
      </Popover>
    </>
  )
}
