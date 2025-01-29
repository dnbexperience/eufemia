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

export default function CancelButton(props: Props) {
  const { onClick, ...rest } = props
  const {
    restoreOriginalValue,
    switchContainerMode,
    containerMode,
    arrayValue,
    isNew,
    index,
  } = useContext(IterateItemContext) || {}
  const { setShowBoundaryErrors } = useContext(FieldBoundaryContext) || {}
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

  const cancelHandler = useCallback(
    ({ event }: { event: React.MouseEvent<HTMLButtonElement> }) => {
      onClick?.(event)
      restoreOriginalValue?.(valueBackupRef.current)
      setShowError(false)
      setShowBoundaryErrors?.(false)
      switchContainerMode?.('view')
    },
    [
      onClick,
      restoreOriginalValue,
      setShowBoundaryErrors,
      setShowError,
      switchContainerMode,
    ]
  )

  const wasNew = useWasNew({ isNew, containerMode })

  if (containerMode === 'edit' && arrayValue?.length === 0) {
    return <></>
  }

  if (wasNew) {
    return (
      <RemoveButton
        text={removeButton}
        onClick={onClick}
        {...(rest as RemoveButtonProps)}
      />
    )
  }

  return (
    <Button
      variant="tertiary"
      icon={close}
      icon_position="left"
      on_click={cancelHandler}
      {...rest}
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
