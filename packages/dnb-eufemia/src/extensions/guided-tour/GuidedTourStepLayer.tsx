import { useEffect, useId, useRef, useState } from 'react'
import { clsx } from 'clsx'
import Popover from '../../components/popover/Popover'
import PortalRoot from '../../components/portal-root/PortalRoot'
import { InteractionInvalidation } from '../../shared/helpers/InteractionInvalidation'
import useTranslation from '../../shared/useTranslation'
import GuidedTourCard from './GuidedTourCard'
import { findTarget, getParents, isVisible } from './targets'
import useTargetRect from './useTargetRect'
import type { GuidedTourStep } from './types'

/**
 * How long a step with `onBeforeShow` waits for its target to appear.
 */
const REVEAL_TIMEOUT_MS = 1500

/**
 * Space around the highlighted element, in pixels.
 */
const SPOTLIGHT_PADDING = 6

/**
 * Distance from the target to the step, so the Popover arrow stays clear of
 * the spotlight padding and its outline.
 */
const POPOVER_OFFSET = 16

export type GuidedTourStepLayerProps = {
  step: GuidedTourStep
  progress: string
  showBack: boolean
  isLast: boolean
  onNext: () => void
  onBack: () => void
  onClose: () => void
  onUnavailable: () => void
  onReady: () => void
}

/**
 * Renders one step. Mount it with `key={step.id}`, so each step resolves its
 * target once, even when the parent re-renders with new `steps` or callbacks.
 */
export default function GuidedTourStepLayer(
  props: GuidedTourStepLayerProps
) {
  const { step, progress, showBack, isLast } = props
  const tr = useTranslation().GuidedTour

  const latest = useRef(props)
  latest.current = props

  const [element, setElement] = useState<HTMLElement | null>(null)
  const [ready, setReady] = useState(false)
  const [overlayElement, setOverlayElement] =
    useState<HTMLDivElement | null>(null)
  const [spotlightElement, setSpotlightElement] =
    useState<HTMLDivElement | null>(null)
  const headingId = useId()
  const bodyId = useId()

  useEffect(() => {
    const { step } = latest.current
    let canceled = false
    let frame = 0

    const resolve = async () => {
      // A failing or hanging onBeforeShow must not leave the page blocked without a step
      let timeout: number

      try {
        await Promise.race([
          step.onBeforeShow?.(),
          new Promise((resolve) => {
            timeout = window.setTimeout(resolve, REVEAL_TIMEOUT_MS)
          }),
        ])
      } catch {
        if (!canceled) {
          latest.current.onUnavailable()
        }
        return // stop here
      } finally {
        clearTimeout(timeout)
      }

      if (canceled) {
        return // stop here
      }

      if (!step.target) {
        setReady(true)
        return // stop here
      }

      const start = performance.now()

      const tick = () => {
        if (canceled) {
          return // stop here
        }

        const found = findTarget(step.target)

        if (isVisible(found)) {
          setElement(found)
          setReady(true)

          if (typeof found.scrollIntoView === 'function') {
            const reduceMotion = window.matchMedia?.(
              '(prefers-reduced-motion: reduce)'
            ).matches
            found.scrollIntoView({
              block: 'center',
              behavior: reduceMotion ? 'auto' : 'smooth',
            })
          }
          return // stop here
        }

        const canWait =
          step.onBeforeShow &&
          performance.now() - start < REVEAL_TIMEOUT_MS

        if (canWait) {
          frame = requestAnimationFrame(tick)
        } else {
          latest.current.onUnavailable()
        }
      }

      tick()
    }

    void resolve()

    return () => {
      canceled = true
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (ready) {
      latest.current.onReady()
    }
  }, [ready])

  // Hide the page from keyboard and screen readers; the overlay blocks the mouse.
  useEffect(() => {
    if (!ready || !overlayElement) {
      return undefined
    }

    const ii = new InteractionInvalidation()
    ii.setBypassElements(getParents(overlayElement))
    ii.setBypassSelector([
      '#eufemia-portal-root',
      '#eufemia-portal-root *',
    ])
    ii.activate()

    return () => ii.revert()
  }, [ready, overlayElement])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return // stop here
      }

      const { onClose, onNext, onBack, showBack } = latest.current

      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return // stop here
      }

      const isEditing = (event.target as HTMLElement)?.closest?.(
        'input, textarea, select, [contenteditable="true"]'
      )

      if (isEditing) {
        return // stop here
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNext()
      } else if (event.key === 'ArrowLeft' && showBack) {
        event.preventDefault()
        onBack()
      }
    }

    // Capture phase, so it runs before Popover's own Escape handling
    document.addEventListener('keydown', onKeyDown, true)

    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [])

  const rect = useTargetRect(element)
  const popoverTarget = step.target ? element : spotlightElement

  return (
    <>
      <PortalRoot>
        <div
          className="dnb-guided-tour__overlay"
          ref={setOverlayElement}
          aria-hidden
        >
          <div
            className={clsx(
              'dnb-guided-tour__spotlight',
              !rect && 'dnb-guided-tour__spotlight--centered'
            )}
            style={
              rect && {
                top: rect.top - SPOTLIGHT_PADDING,
                left: rect.left - SPOTLIGHT_PADDING,
                width: rect.width + SPOTLIGHT_PADDING * 2,
                height: rect.height + SPOTLIGHT_PADDING * 2,
              }
            }
            ref={setSpotlightElement}
          />
        </div>
      </PortalRoot>

      {ready && popoverTarget && (
        <Popover
          open
          targetElement={popoverTarget}
          triggerOffset={step.target ? POPOVER_OFFSET : 0}
          placement={step.target ? (step.placement ?? 'bottom') : 'bottom'}
          alignOnTarget={step.target ? (step.align ?? 'center') : 'center'}
          hideArrow={!step.target}
          autoAlignMode="scroll"
          preventClose
          focusOnOpen
          disableFocusTrap
          restoreFocus={false}
          closeButtonProps={{
            title: tr.closeButtonTitle,
            onClick: () => latest.current.onClose(),
          }}
          className="dnb-guided-tour__popover"
          contentClassName="dnb-guided-tour__popover-content"
          portalRootClass="dnb-guided-tour__popover-portal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={step.title ? headingId : undefined}
          aria-describedby={bodyId}
          title={step.title && <span id={headingId}>{step.title}</span>}
          content={
            <GuidedTourCard
              bodyId={bodyId}
              content={step.content}
              progress={progress}
              showBack={showBack}
              isLast={isLast}
              onNext={() => latest.current.onNext()}
              onBack={() => latest.current.onBack()}
            />
          }
        />
      )}
    </>
  )
}
