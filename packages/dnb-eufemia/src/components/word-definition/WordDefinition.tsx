/**
 * Web WordDefinition Component
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import Tooltip from '../tooltip/Tooltip'
import Button from '../button/Button'
import useId from '../../shared/helpers/useId'
import useTranslation from '../../shared/useTranslation'
import type { SpacingProps } from '../../shared/types'
import {
  createSpacingClasses,
  removeSpaceProps,
} from '../space/SpacingHelper'

export type WordDefinitionProps = {
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
   * Tooltip position relative to the trigger.
   */
  position?: 'top' | 'right' | 'bottom' | 'left'
}

type WordDefinitionAllProps = WordDefinitionProps &
  SpacingProps &
  React.HTMLAttributes<HTMLSpanElement>

export default function WordDefinition({
  children,
  content,
  className,
  position = 'bottom',
  ...rest
}: WordDefinitionAllProps) {
  const [active, setActive] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>()
  const contentRef = useRef<HTMLSpanElement>()
  const id = useId()
  const tr = useTranslation().WordDefinition || {}
  const title = active ? tr.closeTriggerTitle : tr.openTriggerTitle

  const toggle = useCallback(
    (next?: boolean) => {
      setActive((prev) => (typeof next === 'boolean' ? next : !prev))
      if (active && !next) {
        triggerRef.current?.focus()
      }
    },
    [active]
  )

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      toggle()
    },
    [toggle]
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement> & KeyboardEvent) => {
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

  useEffect(() => {
    if (active) {
      const leaveEventHandler = (e: MouseEvent | KeyboardEvent) => {
        if (!(e.target instanceof Node)) {
          return
        }
        const clickedInsideContent =
          !!contentRef.current && contentRef.current.contains(e.target)
        const clickedOnTrigger =
          !!triggerRef.current && triggerRef.current.contains(e.target)

        if (!clickedInsideContent && !clickedOnTrigger) {
          toggle(false)
        }
      }
      const currentContentRef = contentRef.current
      const timeout = setTimeout(() => {
        const contentElem = contentRef.current?.querySelector(
          // '.dnb-tooltip__content'
          '.dnb-word-definition__content'
        ) as HTMLElement

        // contentElem.setAttribute('tabindex', '-1')
        // contentElem.classList.add('dnb-no-focus')

        contentElem?.focus({
          preventScroll: true,
        })
        contentRef.current?.addEventListener('keydown', onKeyDown)
        document.documentElement.addEventListener(
          'mousedown',
          leaveEventHandler
        )
        document.documentElement.addEventListener(
          'keyup',
          leaveEventHandler
        )
      }, 10) // Wait until the Tooltip is rendered

      return () => {
        clearTimeout(timeout)
        currentContentRef?.removeEventListener('keydown', onKeyDown)
        document.documentElement.removeEventListener(
          'mousedown',
          leaveEventHandler
        )
        document.documentElement.removeEventListener(
          'keyup',
          leaveEventHandler
        )
      }
    }
  }, [active, onKeyDown, toggle])

  const spacingClasses = createSpacingClasses(rest)
  const triggerProps = removeSpaceProps(rest)

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        ref={triggerRef}
        className={classnames(
          'dnb-word-definition__trigger',
          'dnb-anchor',
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

      <Tooltip
        id={id}
        contentRef={contentRef}
        targetElement={triggerRef}
        active={active}
        showDelay={0}
        hideDelay={0}
        position={position}
        className="dnb-word-definition"
        portalRootClass="dnb-word-definition__portal"
        omitDescribedBy
      >
        <span
          className="dnb-word-definition__content dnb-no-focus"
          tabIndex={-1}
        >
          <span className="dnb-word-definition__title">
            <strong className="dnb-h--basis">{children}</strong>
          </span>
          <span className="dnb-word-definition__text">{content}</span>
        </span>

        <Button
          variant="tertiary"
          icon="close"
          title={tr.closeButtonTitle || 'Close'}
          className="dnb-word-definition__close"
          on_click={() => toggle(false)}
        />
      </Tooltip>
    </>
  )
}
