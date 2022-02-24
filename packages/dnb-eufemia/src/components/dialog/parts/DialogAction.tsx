import React, { useContext } from 'react'
import Button from '../../button/Button'
import { Context } from '../../../shared'
import ModalContext from '../../modal/ModalContext'
import { dispatchCustomElementEvent } from '../../../shared/component-helper'

type extendedMouseEvent = {
  event: React.MouseEvent<HTMLElement>
  close: () => void
}
interface DialogActionProps {
  /**
   * For dialog actions, give a custom text for the decline button.
   */
  declineText?: string

  /**
   * For dialog actions, give a custom text for the confirm button.
   */
  confirmText?: string

  /**
   * For variant confirmation, handle the confirm action click.
   */

  onConfirm?: (event: extendedMouseEvent) => void

  /**
   * For variant confirmation, handle the decline action click.
   */
  onDecline?: (event: extendedMouseEvent) => void

  /**
   * For variant confirmation, hide the default decline button and only show the confirm button.
   */
  hideDecline?: boolean

  /**
   * Pass in custom confirm/decline buttons for action handling. Every child of type Button will be provided with a `close` function attribute.
   */
  children?: React.ReactElement | Array<React.ReactElement>
}

const fallbackCloseAction = ({ close }: extendedMouseEvent) => close()

const DialogAction = ({
  declineText = null,
  confirmText = null,
  hideDecline = false,
  onConfirm = fallbackCloseAction,
  onDecline = fallbackCloseAction,
  children,
}: DialogActionProps) => {
  const { translation, Button: ButtonContext } = useContext(Context)
  const { close } = useContext(ModalContext)
  let childrenWithCloseFunc: Array<React.ReactChild>

  if (children) {
    childrenWithCloseFunc = React.Children.map(children, (child) => {
      if (child.type === Button) {
        return React.cloneElement(
          child,
          {
            ...child.props,
            on_click: (event) => {
              dispatchCustomElementEvent(child.props, 'on_click', {
                event,
                close,
              })
            },
          },
          child.props.children
        )
      } else {
        return child
      }
    })
  }

  return (
    <div className="dnb-dialog__actions">
      {childrenWithCloseFunc}

      {!children && !hideDecline && (
        <Button
          text={declineText || translation?.Dialog?.declineText}
          variant="secondary"
          onClick={(event) => {
            dispatchCustomElementEvent({ onDecline }, 'onDecline', {
              event,
              close,
            })
          }}
          size={ButtonContext?.size || 'large'}
        />
      )}
      {!children && (
        <Button
          text={confirmText || translation?.Dialog?.confirmText}
          variant="primary"
          onClick={(event) => {
            dispatchCustomElementEvent({ onConfirm }, 'onConfirm', {
              event,
              close,
            })
          }}
          size={ButtonContext?.size || 'large'}
        />
      )}
    </div>
  )
}

export default DialogAction
export type { DialogActionProps }
