import { useCallback, useContext } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button } from '../../../../../components'
import { check } from '../../../../../icons'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import SubmitIndicator from '../../SubmitIndicator'

export default function DoneEditButton() {
  const { onDone, setShowError, isPending, setIsPending } =
    useContext(ToolbarContext) || {}

  const { switchContainerMode } = useContext(SectionContainerContext) || {}
  const { hasError, hasVisibleError, setShowBoundaryErrors } =
    useContext(FieldBoundaryContext) || {}
  const translation = useTranslation().SectionEditContainer
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

      const result = onDone?.()
      if (result) {
        setIsPending?.(true)
        void result.then(
          () => {
            setIsPending?.(false)
            switchContainerMode?.('view')
          },
          () => {
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
    >
      {translation.doneButton}
      {isPending && <SubmitIndicator state="pending" />}
    </Button>
  )
}
