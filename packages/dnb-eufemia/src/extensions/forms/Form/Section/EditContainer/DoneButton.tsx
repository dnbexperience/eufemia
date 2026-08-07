import { useCallback, useContext } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button } from '../../../../../components'
import { check } from '../../../../../icons'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import EditContainerContext from './EditContainerContext'

export default function DoneEditButton() {
  const { onDone, setShowError } = useContext(ToolbarContext) || {}

  const { switchContainerMode } = useContext(SectionContainerContext) || {}
  const { hasError, hasVisibleError, setShowBoundaryErrors } =
    useContext(FieldBoundaryContext) || {}

  const translation = useTranslation().SectionEditContainer
  const { confirmChanges } = useContext(EditContainerContext) || {}

  const doneHandler = useCallback(() => {
    if (hasError) {
      setShowBoundaryErrors?.(true)
      if (hasVisibleError) {
        setShowError(true)
      }
    } else {
      setShowError(false)
      setShowBoundaryErrors?.(false)
      confirmChanges?.()
      switchContainerMode?.('view')
      onDone?.()
    }
  }, [
    hasError,
    hasVisibleError,
    confirmChanges,
    onDone,
    setShowBoundaryErrors,
    setShowError,
    switchContainerMode,
  ])

  return (
    <Button
      variant="tertiary"
      icon={check}
      iconPosition="left"
      onClick={doneHandler}
    >
      {translation.doneButton}
    </Button>
  )
}
