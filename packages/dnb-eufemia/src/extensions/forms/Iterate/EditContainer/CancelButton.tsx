import React, { useCallback, useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { Button } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import PushContainerContext from '../PushContainer/PushContainerContext'
import { close } from '../../../../icons'
import { ButtonProps } from '../../../../components/Button'
import RemoveButton, { Props as RemoveButtonProps } from '../RemoveButton'
import { ContainerMode } from '../Array'

type Props = ButtonProps

export default function CancelButton(props: Props) {
  const { onClick, className, ...rest } = props
  const {
    restoreOriginalValue,
    switchContainerMode,
    containerMode,
    arrayValue,
    isNew,
    index,
  } = useContext(IterateItemContext) || {}
  const { setShowBoundaryErrors, verifyFieldError, hasVisibleError } =
    useContext(FieldBoundaryContext) || {}
  const { setShowError } = useContext(ToolbarContext) || {}
  const pushContext = useContext(PushContainerContext)

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
      restoreOriginalValue?.(valueBackupRef.current)

      requestAnimationFrame(() => {
        const isInsidePushContainer = Boolean(pushContext)

        if (!isInsidePushContainer && verifyFieldError?.()) {
          setShowBoundaryErrors?.(true)
          if (hasVisibleError) {
            setShowError(true)
          }
        } else {
          setShowError(false)
          setShowBoundaryErrors?.(false)
          switchContainerMode?.('view')
        }

        onClick?.(event)
      }) // because of the re-render of "restoreOriginalData"
    },
    [
      hasVisibleError,
      pushContext,
      onClick,
      restoreOriginalValue,
      setShowBoundaryErrors,
      setShowError,
      switchContainerMode,
      verifyFieldError,
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
      className={classnames('dnb-forms-iterate__cancel-button', className)}
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
