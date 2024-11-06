import React, { useCallback, useContext } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button } from '../../../../../components'
import { close } from '../../../../../icons'
import useContainerDataStore from './useContainerDataStore'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'

export default function CancelButton() {
  const { onCancel, setShowError } = useContext(ToolbarContext) || {}
  const { restoreOriginalData } = useContainerDataStore()
  const { switchContainerMode, initialContainerMode } =
    useContext(SectionContainerContext) || {}
  const {
    hasVisibleError,
    hasSubmitError,
    hasError,
    setShowBoundaryErrors,
  } = useContext(FieldBoundaryContext) || {}

  const translation = useTranslation().SectionEditContainer

  const cancelHandler = useCallback(() => {
    if (hasSubmitError || (initialContainerMode === 'auto' && hasError)) {
      setShowBoundaryErrors?.(true)
      if (hasVisibleError) {
        setShowError(true)
      }
    } else {
      setShowError(false)
      setShowBoundaryErrors?.(false)
      restoreOriginalData()
      switchContainerMode?.('view')
      onCancel?.()
    }
  }, [
    hasError,
    hasSubmitError,
    hasVisibleError,
    initialContainerMode,
    onCancel,
    restoreOriginalData,
    setShowBoundaryErrors,
    setShowError,
    switchContainerMode,
  ])

  return (
    <Button
      variant="tertiary"
      icon={close}
      icon_position="left"
      on_click={cancelHandler}
    >
      {translation.cancelButton}
    </Button>
  )
}
