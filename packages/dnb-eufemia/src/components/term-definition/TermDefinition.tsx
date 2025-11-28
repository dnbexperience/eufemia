/**
 * Web TermDefinition Component
 */

import React, { useCallback, useRef, useState } from 'react'
import classnames from 'classnames'
import Popover from '../popover/Popover'
import useId from '../../shared/helpers/useId'
import useTranslation from '../../shared/useTranslation'
import type { SpacingProps } from '../../shared/types'
import {
  createSpacingClasses,
  removeSpaceProps,
} from '../space/SpacingHelper'

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

type TermDefinitionAllProps = TermDefinitionProps &
  SpacingProps &
  React.HTMLAttributes<HTMLSpanElement>

export default function TermDefinition({
  children,
  content,
  className,
  placement = 'bottom',
  ...rest
}: TermDefinitionAllProps) {
  const [active, setActive] = useState(false)
  const triggerRef = useRef<HTMLSpanElement | null>(null)
  const id = useId()
  const { TermDefinition: tr = {} } = useTranslation()
  const title = active ? tr.closeTriggerTitle : tr.openTriggerTitle

  const toggle = useCallback((next?: boolean) => {
    setActive((prev) => {
      const value = typeof next === 'boolean' ? next : !prev
      if (prev && !value) {
        triggerRef.current?.focus()
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
        className={classnames(
          'dnb-term-definition__trigger',
          'dnb-anchor',
          active && 'dnb-anchor--hover',
          className,
          spacingClasses
        )}
        aria-expanded={active}
        aria-controls={id}
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
        closeOnOutsideClick
        hideArrow
        keepInDOM
        title={children}
      >
        {content}
      </Popover>
    </>
  )
}
