import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { Button } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import { close } from '../../../../icons'
import { ButtonProps } from '../../../../components/Button'
import RemoveButton, { Props as RemoveButtonProps } from '../RemoveButton'
import { ContainerMode } from '../Array'

type Props = ButtonProps

export default function EditToolbarTools(props: Props) {
  const {
    restoreOriginalValue,
    switchContainerMode,
    containerMode,
    initialContainerMode,
    arrayValue,
    isNew,
    index,
  } = useContext(IterateItemContext) || {}
  const { hasError, hasVisibleError, setShowBoundaryErrors } =
    useContext(FieldBoundaryContext) || {}
  const { setShowError } = useContext(ToolbarContext) || {}

  const { cancelButton, removeButton } =
    useTranslation().IterateEditContainer
  const valueBackupRef = useRef<unknown>()

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
    setShowError,
    switchContainerMode,
  ])

  const wasNew = useWasNew({ isNew, containerMode })

  if (containerMode === 'edit' && arrayValue?.length === 0) {
    return <></>
  }

  if (wasNew) {
    return (
      <RemoveButton
        text={removeButton}
        {...(props as RemoveButtonProps)}
      />
    )
  }

  return (
    <Button
      variant="tertiary"
      icon={close}
      icon_position="left"
      on_click={cancelHandler}
      {...props}
    >
      {cancelButton}
    </Button>
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
