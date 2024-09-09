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
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import PushContainerContext from '../PushContainer/PushContainerContext'
import { check, close } from '../../../../icons'
import RemoveButton from '../RemoveButton'
import { ContainerMode } from '../Array/types'

type Props = {
  /**
   * Used internally by the PushContainer component.
   */
  enableButtons?: Array<'create' | 'remove' | 'cancel' | false>
}

export default function EditToolbarTools(props: Props) {
  const { enableButtons } = props
  const {
    restoreOriginalValue,
    switchContainerMode,
    containerMode,
    initialContainerMode,
    minimumContainerItems,
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
    if (hasError && initialContainerMode === 'auto') {
      setShowBoundaryErrors?.(true)
      if (hasVisibleError) {
        setShowError(true)
      }
    } else {
      restoreOriginalValue?.(valueBackupRef.current)
      setShowError(false)
      setShowBoundaryErrors?.(false)
      switchContainerMode?.('view')
    }
  }, [
    hasError,
    hasVisibleError,
    initialContainerMode,
    restoreOriginalValue,
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

  let createButtonElement: React.ReactElement = null
  let removeButtonElement: React.ReactElement = null

  createButtonElement = (
    <Button
      variant="tertiary"
      icon={check}
      icon_position="left"
      on_click={doneHandler}
    >
      {commitHandleRef || enableButtons?.includes('create')
        ? createButton
        : doneButton}
    </Button>
  )

  const showCancelAndRemoveButton =
    minimumContainerItems > 0
      ? arrayValue?.length > minimumContainerItems
      : true &&
        (!entries || (entries?.length > 0 && containerMode === 'edit'))

  if (
    (showCancelAndRemoveButton && wasNew && !enableButtons) ||
    enableButtons?.includes('remove')
  ) {
    removeButtonElement = <RemoveButton text={removeButton} />
  }

  if (
    (showCancelAndRemoveButton && !wasNew && !enableButtons) ||
    enableButtons?.includes('cancel')
  ) {
    removeButtonElement = (
      <Button
        variant="tertiary"
        icon={close}
        icon_position="left"
        on_click={cancelHandler}
      >
        {cancelButton}
      </Button>
    )
  }

  return (
    <>
      <FormStatus show={showError && hasVisibleError} no_animation={false}>
        {errorInSection}
      </FormStatus>
      <Flex.Horizontal gap="large">
        {createButtonElement}
        {removeButtonElement}
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
