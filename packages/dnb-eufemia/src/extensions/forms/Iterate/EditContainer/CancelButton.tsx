import React, { useCallback, useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { Button, Dialog } from '../../../../components'
import useTranslation from '../../hooks/useTranslation'
import IterateItemContext from '../IterateItemContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import PushContainerContext from '../PushContainer/PushContainerContext'
import { close } from '../../../../icons'
import type { ButtonProps } from '../../../../components/Button'
import type { Props as RemoveButtonProps } from '../RemoveButton';
import RemoveButton from '../RemoveButton'
import type { ContainerMode } from '../Array'

type Props = ButtonProps & {
  showConfirmDialog?: boolean
}

export default function CancelButton(props: Props) {
  const { onClick, className, showConfirmDialog = true, ...rest } = props
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

  const translation = useTranslation()
  const { cancelButton, removeButton } = translation.IterateEditContainer
  const { confirmCancelText } = translation.SectionEditContainer
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
    ({ close, event }) => {
      close?.()
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
        showConfirmDialog={showConfirmDialog}
        {...(rest as RemoveButtonProps)}
      />
    )
  }

  const triggerAttributes: ButtonProps = {
    variant: 'tertiary',
    className: classnames('dnb-forms-iterate__cancel-button', className),
    icon: close,
    icon_position: 'left',
    text: cancelButton,
    ...rest,
  }

  if (showConfirmDialog) {
    return (
      <Dialog
        variant="confirmation"
        title={confirmCancelText}
        triggerAttributes={triggerAttributes}
        onConfirm={cancelHandler}
      />
    )
  }

  return (
    <Button {...triggerAttributes} on_click={cancelHandler} {...rest} />
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
