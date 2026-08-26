import { Button } from '../../../../components'
import { close } from '../../../../icons'

export type MultiSelectionActionsProps = {
  show: boolean
  disabled?: boolean
  tempValueLength: number
  formatMessage: (
    key: string,
    values?: Record<string, string | number>
  ) => string
  translation: {
    confirmButton: string
    cancelButton: string
  }
  onConfirm: () => void
  onCancel: () => void
}

export function MultiSelectionActions({
  show,
  disabled,
  tempValueLength,
  formatMessage,
  translation,
  onConfirm,
  onCancel,
}: MultiSelectionActionsProps) {
  if (!show) {
    return null
  }

  return (
    <div className="dnb-forms-field-multi-selection__actions">
      <Button
        variant="primary"
        onClick={onConfirm}
        disabled={disabled}
        className="dnb-forms-field-multi-selection__confirm-button"
      >
        {formatMessage(translation.confirmButton, {
          count: tempValueLength,
        })}
      </Button>
      <Button
        variant="tertiary"
        onClick={onCancel}
        disabled={disabled}
        icon={close}
      >
        {translation.cancelButton}
      </Button>
    </div>
  )
}
