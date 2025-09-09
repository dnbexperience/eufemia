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
  const { setShowBoundaryErrors, verifyFieldError, hasVisibleError } =
    useContext(FieldBoundaryContext) || {}

  const translation = useTranslation().SectionEditContainer

  const cancelHandler = useCallback(() => {
    restoreOriginalData()

    requestAnimationFrame(() => {
      if (verifyFieldError?.()) {
        setShowBoundaryErrors?.(true)
        if (hasVisibleError) {
          setShowError(true)
        }
      } else {
        setShowError(false)
        setShowBoundaryErrors?.(false)
        switchContainerMode?.('view')
      }

      onCancel?.()
    }) // because of the re-render of "restoreOriginalData"
  }, [
    hasVisibleError,
    onCancel,
    restoreOriginalData,
    setShowBoundaryErrors,
    setShowError,
    switchContainerMode,
    verifyFieldError,
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
