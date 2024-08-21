import React, { useCallback, useContext, useState } from 'react'
import { Button, Flex, FormStatus } from '../../../../../components'
import useTranslation from '../../../hooks/useTranslation'
import SectionContainerContext from '../containers/SectionContainerContext'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import { check, close } from '../../../../../icons'
import useContainerDataStore from './useContainerDataStore'
import useEditContainerToolbar from './useEditContainerToolbar'

export default function EditToolbarTools() {
  useEditContainerToolbar()
  const { restoreOriginalData } = useContainerDataStore()

  const { switchContainerMode } = useContext(SectionContainerContext) || {}
  const {
    hasVisibleError,
    hasSubmitError,
    hasError,
    setShowBoundaryErrors,
  } = useContext(FieldBoundaryContext) || {}

  const translation = useTranslation().SectionEditContainer

  const [showError, setShowError] = useState(false)

  const cancelHandler = useCallback(() => {
    if (hasSubmitError) {
      setShowError(true)
      setShowBoundaryErrors?.(true)
    } else {
      setShowError(false)
      setShowBoundaryErrors?.(false)
      restoreOriginalData()
      switchContainerMode?.('view')
    }
  }, [
    hasSubmitError,
    restoreOriginalData,
    setShowBoundaryErrors,
    switchContainerMode,
  ])
  const doneHandler = useCallback(() => {
    if (hasError) {
      setShowBoundaryErrors?.(true)
      if (hasVisibleError) {
        setShowError(true)
      }
    } else {
      setShowError(false)
      setShowBoundaryErrors?.(false)
      switchContainerMode?.('view')
    }
  }, [
    hasVisibleError,
    hasError,
    setShowBoundaryErrors,
    switchContainerMode,
  ])

  return (
    <>
      <FormStatus show={showError && hasVisibleError} no_animation={false}>
        {translation.errorInSection}
      </FormStatus>
      <Flex.Horizontal gap="large">
        <Button
          variant="tertiary"
          icon={check}
          icon_position="left"
          on_click={doneHandler}
        >
          {translation.doneButton}
        </Button>

        <Button
          variant="tertiary"
          icon={close}
          icon_position="left"
          on_click={cancelHandler}
        >
          {translation.cancelButton}
        </Button>
      </Flex.Horizontal>
    </>
  )
}
