import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Button, Flex, FormStatus } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateElementContext from '../IterateElementContext'
import { check, close } from '../../../../icons'
import RemoveButton from '../RemoveButton'
import { ContainerMode } from '../Array/types'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'

export default function EditToolbarTools() {
  const {
    restoreOriginalValue,
    switchContainerMode,
    containerMode,
    arrayValue,
    index,
    isNew,
  } = useContext(IterateElementContext) || {}
  const { hasVisibleError } = useContext(FieldBoundaryContext) || {}

  const translation = useTranslation().Section
  const valueBackupRef = useRef<unknown>()
  const wasNew = useWasNew({ isNew, containerMode })
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (containerMode === 'edit' && !valueBackupRef.current) {
      valueBackupRef.current = arrayValue?.[index]
    }
    if (containerMode === 'view') {
      valueBackupRef.current = null
    }
  }, [arrayValue, containerMode, index])

  const cancelHandler = useCallback(() => {
    if (valueBackupRef.current) {
      restoreOriginalValue?.(valueBackupRef.current)
    }
    setShowError(false)
    switchContainerMode?.('view')
  }, [restoreOriginalValue, switchContainerMode])
  const doneHandler = useCallback(() => {
    if (hasVisibleError) {
      setShowError(true)
    } else {
      setShowError(false)
      switchContainerMode?.('view')
    }
  }, [hasVisibleError, switchContainerMode])

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
          {translation.done}
        </Button>

        {wasNew ? (
          <RemoveButton />
        ) : (
          <Button
            variant="tertiary"
            icon={close}
            icon_position="left"
            on_click={cancelHandler}
          >
            {translation.cancel}
          </Button>
        )}
      </Flex.Horizontal>
    </>
  )
}

export function useWasNew({
  isNew,
  containerMode,
}: {
  isNew: boolean
  containerMode: ContainerMode
}) {
  const wasNewRef = useRef<unknown>(isNew)

  useEffect(() => {
    if (containerMode === 'view') {
      wasNewRef.current = false
    }
  }, [isNew, containerMode])

  return wasNewRef.current
}
