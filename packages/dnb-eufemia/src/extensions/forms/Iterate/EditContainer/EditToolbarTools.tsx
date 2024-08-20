import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Button, Flex, FormStatus } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import { check, close } from '../../../../icons'
import RemoveButton from '../RemoveButton'
import { ContainerMode } from '../Array/types'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import PushContainerContext from '../PushContainer/PushContainerContext'

export default function EditToolbarTools() {
  const {
    restoreOriginalValue,
    switchContainerMode,
    containerMode,
    arrayValue,
    index,
    isNew,
  } = useContext(IterateItemContext) || {}
  const { hasError, hasVisibleError, setShowBoundaryErrors } =
    useContext(FieldBoundaryContext) || {}
  const { entries, commitHandleRef } =
    useContext(PushContainerContext) || {}

  const { doneButton, cancelButton, removeButton, errorInSection } =
    useTranslation().IterateEditContainer
  const { createButton } = useTranslation().IteratePushContainer
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
    setShowBoundaryErrors?.(false)
    switchContainerMode?.('view')
  }, [restoreOriginalValue, setShowBoundaryErrors, switchContainerMode])
  const doneHandler = useCallback(() => {
    if (hasError) {
      setShowBoundaryErrors?.(true)
      if (hasVisibleError) {
        setShowError(true)
      }
    } else {
      setShowBoundaryErrors?.(false)
      setShowError(false)
      if (commitHandleRef) {
        commitHandleRef.current?.()
      } else {
        switchContainerMode?.('view')
      }
    }
  }, [
    commitHandleRef,
    hasError,
    hasVisibleError,
    setShowBoundaryErrors,
    switchContainerMode,
  ])

  return (
    <>
      <FormStatus show={showError && hasVisibleError} no_animation={false}>
        {errorInSection}
      </FormStatus>
      <Flex.Horizontal gap="large">
        {commitHandleRef ? (
          <Button
            variant="tertiary"
            icon={check}
            icon_position="left"
            on_click={doneHandler}
          >
            {createButton}
          </Button>
        ) : (
          <Button
            variant="tertiary"
            icon={check}
            icon_position="left"
            on_click={doneHandler}
          >
            {doneButton}
          </Button>
        )}

        {(!entries || (entries?.length > 0 && containerMode === 'edit')) &&
          (wasNew ? (
            <RemoveButton text={removeButton} />
          ) : (
            <Button
              variant="tertiary"
              icon={close}
              icon_position="left"
              on_click={cancelHandler}
            >
              {cancelButton}
            </Button>
          ))}
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
