import React, { useCallback, useContext } from 'react'
import SectionContainerContext from '../containers/SectionContainerContext'
import ToolbarContext from '../Toolbar/ToolbarContext'
import { useTranslation } from '../../../hooks'
import { Button, Dialog } from '../../../../../components'
import { close } from '../../../../../icons'
import useContainerDataStore from './useContainerDataStore'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'

type Props = React.ComponentProps<typeof Button> & {
  showConfirmDialog?: boolean
}

export default function CancelButton({
  showConfirmDialog = true,
  ...buttonProps
}: Props) {
  const { onCancel, setShowError } = useContext(ToolbarContext) || {}
  const { restoreOriginalData } = useContainerDataStore()
  const { switchContainerMode } = useContext(SectionContainerContext) || {}
  const { setShowBoundaryErrors, verifyFieldError, hasVisibleError } =
    useContext(FieldBoundaryContext) || {}

  const translation = useTranslation()
  const { cancelButton, confirmCancelText } =
    translation.SectionEditContainer

  const cancelHandler = useCallback(
    ({ close }) => {
      close?.()
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
    },
    [
      hasVisibleError,
      onCancel,
      restoreOriginalData,
      setShowBoundaryErrors,
      setShowError,
      switchContainerMode,
      verifyFieldError,
    ]
  )

  const triggerAttributes: React.ComponentProps<typeof Button> = {
    variant: 'tertiary',
    icon: close,
    iconPosition: 'left',
    text: cancelButton,
    ...buttonProps,
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

  return <Button {...triggerAttributes} on_click={cancelHandler} />
}
