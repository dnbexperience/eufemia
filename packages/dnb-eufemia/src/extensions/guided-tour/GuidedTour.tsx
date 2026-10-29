/**
 * GuidedTour Extension
 *
 */

import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import useTranslation from '../../shared/useTranslation'
import GuidedTourDialog from './GuidedTourDialog'
import GuidedTourStepLayer from './GuidedTourStepLayer'
import { findShownIndex, isStepShown } from './targets'
import type { GuidedTourProps } from './types'

export type * from './types'

type Phase = 'intro' | 'steps' | 'outro' | 'closed'

export default function GuidedTour(props: GuidedTourProps) {
  if (!props.open) {
    return null
  }

  return <GuidedTourSession {...props} />
}

/**
 * Mounted while `open` is true, so every opening starts from a fresh state.
 */
function GuidedTourSession(props: GuidedTourProps) {
  const { steps, intro, outro } = props
  const tr = useTranslation().GuidedTour

  const [phase, setPhase] = useState<Phase>(intro ? 'intro' : 'steps')
  const [index, setIndex] = useState(0)
  const directionRef = useRef<1 | -1>(1)
  const closingRef = useRef(false)

  // Re-render once a step is ready, as its onBeforeShow may have revealed or
  // hidden other targets, which changes the progress and Back/Done buttons
  const [, recalculate] = useReducer((count: number) => count + 1, 0)

  const latest = useRef(props)
  latest.current = props

  const [launcher] = useState(() =>
    typeof document !== 'undefined'
      ? (document.activeElement as HTMLElement | null)
      : null
  )
  const isClosed = phase === 'closed'

  // Restore focus only when still closed a frame later, so a StrictMode
  // effect re-run does not steal focus from the opening tour
  const activeRef = useRef(false)

  useEffect(() => {
    if (isClosed) {
      return undefined
    }

    activeRef.current = true

    return () => {
      activeRef.current = false
      requestAnimationFrame(() => {
        if (!activeRef.current && launcher?.isConnected) {
          launcher.focus({ preventScroll: true })
        }
      })
    }
  }, [isClosed, launcher])

  const finish = useCallback((completed: boolean) => {
    if (closingRef.current) {
      return // stop here
    }

    closingRef.current = true
    setPhase('closed')

    const { onComplete, onCancel, onOpenChange } = latest.current
    if (completed) {
      onComplete?.()
    } else {
      onCancel?.()
    }
    onOpenChange?.(false)
  }, [])

  const goToEnd = useCallback(() => {
    if (outro) {
      setPhase('outro')
    } else {
      finish(true)
    }
  }, [outro, finish])

  const hasStep = Boolean(steps[index])

  // Moving past the last step (or having no steps) ends up here
  useEffect(() => {
    if (phase === 'steps' && !hasStep) {
      goToEnd()
    }
  }, [phase, hasStep, goToEnd])

  const startSteps = () => {
    directionRef.current = 1
    setIndex(0)
    setPhase('steps')
  }

  const next = () => {
    directionRef.current = 1
    setIndex(index + 1)
  }

  const back = () => {
    directionRef.current = -1
    setIndex(Math.max(index - 1, 0))
  }

  // Called when a step's target is missing or hidden: keep moving the same way
  const skip = () => {
    if (index + directionRef.current < 0) {
      directionRef.current = 1
    }

    setIndex(index + directionRef.current)
  }

  if (phase === 'intro') {
    return (
      <GuidedTourDialog
        {...intro}
        primaryText={tr.startButtonText}
        onPrimary={startSteps}
        secondaryText={tr.skipButtonText}
        onSecondary={() => finish(false)}
        onClose={() => finish(false)}
      />
    )
  }

  if (phase === 'outro') {
    // The user has seen every step, so closing the outro also completes the tour
    return (
      <GuidedTourDialog
        {...outro}
        primaryText={tr.doneButtonText}
        onPrimary={() => finish(true)}
        onClose={() => finish(true)}
      />
    )
  }

  const step = steps[index]

  if (phase === 'closed' || !step) {
    return null
  }

  const shownSteps = steps.filter(isStepShown)
  const progress = tr.progress
    .replace('%current', String(shownSteps.indexOf(step) + 1 || 1))
    .replace('%total', String(shownSteps.length || 1))

  return (
    <GuidedTourStepLayer
      key={step.id}
      step={step}
      progress={progress}
      showBack={findShownIndex(steps, index - 1, -1) !== -1}
      isLast={!outro && findShownIndex(steps, index + 1, 1) === -1}
      onNext={next}
      onBack={back}
      onClose={() => finish(false)}
      onUnavailable={skip}
      onReady={recalculate}
    />
  )
}
