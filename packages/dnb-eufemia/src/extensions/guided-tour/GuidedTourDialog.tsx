import Button from '../../components/button/Button'
import Dialog from '../../components/dialog/Dialog'
import type { GuidedTourDialogContent } from './types'

export type GuidedTourDialogProps = GuidedTourDialogContent & {
  primaryText: string
  onPrimary: () => void
  secondaryText?: string
  onSecondary?: () => void
  onClose: () => void
}

/**
 * Modal also fires `onClose` when it is closed programmatically
 * (`triggeredBy: 'unmount'`), which happens on every step change.
 */
const userCloseTriggers = ['button', 'keyboard', 'overlay']

export default function GuidedTourDialog({
  title,
  content,
  primaryText,
  onPrimary,
  secondaryText,
  onSecondary,
  onClose,
}: GuidedTourDialogProps) {
  return (
    <Dialog
      open
      title={title}
      className="dnb-guided-tour__dialog"
      noAnimation
      restoreFocus={false}
      omitTriggerButton
      preventOverlayClose
      fullscreen={false}
      onClose={({ triggeredBy }) => {
        if (userCloseTriggers.includes(triggeredBy)) {
          onClose()
        }
      }}
    >
      {content}

      <Dialog.Action>
        {secondaryText && (
          <Button
            variant="secondary"
            text={secondaryText}
            onClick={onSecondary}
          />
        )}
        <Button text={primaryText} onClick={onPrimary} />
      </Dialog.Action>
    </Dialog>
  )
}
