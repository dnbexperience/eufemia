import { useCallback, useContext, useRef } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import DataContext from '../../../DataContext/Context'
import { useTranslation } from '../../../hooks'
import { DEFAULT_ASYNC_SUBMIT_TIMEOUT } from '../../../defaults'
import { Button } from '../../../../../components'
import { check } from '../../../../../icons'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../../shared/helpers/useIsomorphicLayoutEffect'

type PendingOperation = {
  timeout?: ReturnType<typeof setTimeout>
}

export default function DoneEditButton() {
  const { onDone, setShowError, isPending, setIsPending } =
    useContext(ToolbarContext) || {}

  const { switchContainerMode } = useContext(SectionContainerContext) || {}
  const { hasError, hasVisibleError, setShowBoundaryErrors } =
    useContext(FieldBoundaryContext) || {}
  const dataContext = useContext(DataContext)
  const asyncSubmitTimeout =
    dataContext?.props?.asyncSubmitTimeout ?? DEFAULT_ASYNC_SUBMIT_TIMEOUT
  const translation = useTranslation().SectionEditContainer
  const pendingOperationRef = useRef<PendingOperation>(null)

  useLayoutEffect(
    () => () => {
      const operation = pendingOperationRef.current
      pendingOperationRef.current = null

      if (operation?.timeout !== undefined) {
        clearTimeout(operation.timeout)
      }
    },
    []
  )

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

      if (result instanceof Promise) {
        setIsPending?.(true)

        const operation: PendingOperation = {}
        pendingOperationRef.current = operation

        const finishOperation = () => {
          if (pendingOperationRef.current !== operation) {
            return false
          }

          pendingOperationRef.current = null

          if (operation.timeout !== undefined) {
            clearTimeout(operation.timeout)
          }

          return true
        }

        // Recover the pending state if the Promise never settles. Without
        // it, a Promise that never resolves or rejects would leave the
        // section disabled with no way out. The section stays in edit mode
        // so the user can try again.
        operation.timeout = setTimeout(() => {
          if (!finishOperation()) {
            return
          }

          setIsPending?.(false)
        }, asyncSubmitTimeout)

        void result.then(
          () => {
            if (!finishOperation()) {
              return
            }

            setIsPending?.(false)
            switchContainerMode?.('view')
          },
          () => {
            if (!finishOperation()) {
              return
            }

            setIsPending?.(false)
          }
        )
      } else {
        switchContainerMode?.('view')
      }
    }
  }, [
    asyncSubmitTimeout,
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
      pending={Boolean(isPending)}
    >
      {translation.doneButton}
    </Button>
  )
}
