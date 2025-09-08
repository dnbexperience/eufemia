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
  const { switchContainerMode } = useContext(SectionContainerContext) || {}
  const {
    setShowBoundaryErrors,
    hasError,
    hasVisibleError,
    hasSubmitError,
  } = useContext(FieldBoundaryContext) || {}

  const translation = useTranslation().SectionEditContainer

  const cancelHandler = useCallback(() => {
    if (hasError && hasSubmitError) {
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
