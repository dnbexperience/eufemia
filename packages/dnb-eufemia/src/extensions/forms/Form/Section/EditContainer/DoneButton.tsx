import { useCallback, useContext, useRef } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button } from '../../../../../components'
import { check } from '../../../../../icons'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import SubmitIndicator from '../../SubmitIndicator'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../../shared/helpers/useIsomorphicLayoutEffect'

export default function DoneEditButton() {
  const { onDone, setShowError, isPending, setIsPending } =
    useContext(ToolbarContext) || {}

  const { switchContainerMode } = useContext(SectionContainerContext) || {}
  const { hasError, hasVisibleError, setShowBoundaryErrors } =
    useContext(FieldBoundaryContext) || {}
  const translation = useTranslation().SectionEditContainer
  const buttonRef = useRef<HTMLElement>(null)
  const restoreFocusRef = useRef(false)

  // Disabling the button while it is pending removes it from the focus
  // order, which makes browsers move focus to the document body. When the
  // section stays in edit mode (rejected Promise), move focus back so the
  // user keeps their place. Focus is only reclaimed when it was actually
  // lost, to avoid taking it away from somewhere the user moved it to.
  // On a resolved Promise, SectionContainer handles focus when the view
  // container opens. A layout effect restores focus in the same commit
  // that enables the button again.
  useLayoutEffect(() => {
    if (!isPending && restoreFocusRef.current) {
      restoreFocusRef.current = false

      if (document.activeElement === document.body) {
        buttonRef.current?.focus?.()
      }
    }
  }, [isPending])

  const doneHandler = useCallback(() => {
    if (isPending) {
      return
    }

    if (hasError) {
      setShowBoundaryErrors?.(true)
      if (hasVisibleError) {
        setShowError(true)
      }
    } else {
      setShowError(false)
      setShowBoundaryErrors?.(false)

      // "onDone" is typed as `() => void`, which is what makes it accept
      // both async and value-returning callbacks. Widening the result to
      // unknown is what allows it to be inspected at all.
      const result: unknown = onDone?.()

      // Only a returned Promise defers the mode switch. Any other return
      // value is ignored, because "onDone" has always allowed callbacks
      // that return something (e.g. `onDone={() => list.push(value)}`).
      if (result instanceof Promise) {
        setIsPending?.(true)
        void result.then(
          () => {
            setIsPending?.(false)
            switchContainerMode?.('view')
          },
          () => {
            restoreFocusRef.current = true
            setIsPending?.(false)
          }
        )
      } else {
        switchContainerMode?.('view')
      }
    }
  }, [
    hasError,
    hasVisibleError,
    isPending,
    onDone,
    setShowBoundaryErrors,
    setShowError,
    setIsPending,
    switchContainerMode,
  ])

  return (
    <Button
      variant="tertiary"
      icon={check}
      iconPosition="left"
      onClick={doneHandler}
      disabled={isPending}
      ref={buttonRef}
    >
      {translation.doneButton}
      {isPending && <SubmitIndicator state="pending" />}
    </Button>
  )
}
