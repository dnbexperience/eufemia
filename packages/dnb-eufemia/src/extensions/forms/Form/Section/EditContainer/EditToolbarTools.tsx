import React, { useCallback, useContext, useState } from 'react'
import { Button, Flex, FormStatus } from '../../../../../components'
import useTranslation from '../../../hooks/useTranslation'
import SectionContainerContext from '../containers/SectionContainerContext'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import { check, close } from '../../../../../icons'
import useContainerDataStore from './useContainerDataStore'

export type Props = {
  onDone?: () => void
  onCancel?: () => void
}

export default function EditToolbarTools(props: Props) {
  const { onDone, onCancel } = props
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

  const [showError, setShowError] = useState(false)

  const cancelHandler = useCallback(() => {
    if (hasSubmitError || (initialContainerMode === 'auto' && hasError)) {
      setShowBoundaryErrors?.(Date.now())
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
    hasSubmitError,
    initialContainerMode,
    hasError,
    setShowBoundaryErrors,
    hasVisibleError,
    restoreOriginalData,
    switchContainerMode,
    onCancel,
  ])
  const doneHandler = useCallback(() => {
    if (hasError) {
      setShowBoundaryErrors?.(Date.now())
      if (hasVisibleError) {
        setShowError(true)
      }
    } else {
      setShowError(false)
      setShowBoundaryErrors?.(false)
      switchContainerMode?.('view')
      onDone?.()
    }
  }, [
    hasError,
    setShowBoundaryErrors,
    hasVisibleError,
    switchContainerMode,
    onDone,
  ])

  return (
    <>
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

      <FormStatus
        show={showError && hasVisibleError}
        shellSpace={{ top: 'x-small' }}
        no_animation={false}
      >
        {translation.errorInSection}
      </FormStatus>
    </>
  )
}
