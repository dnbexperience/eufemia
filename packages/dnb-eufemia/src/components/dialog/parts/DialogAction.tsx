import React, { useCallback, useContext } from 'react'
import classNames from 'classnames'
import Button from '../../button/Button'
import Space from '../../space/Space'
import { Context } from '../../../shared'
import ModalContext from '../../modal/ModalContext'
import { dispatchCustomElementEvent } from '../../../shared/component-helper'

import type { SpacingProps } from '../../space/types'

type extendedMouseEvent = {
  event: React.MouseEvent<HTMLElement>
  close: () => void
}

export type DialogActionProps = {
  /**
   * For dialog actions, give a custom text for the decline button.
   */
  declineText?: string | React.ReactNode

  /**
   * For dialog actions, give a custom text for the confirm button.
   */
  confirmText?: string | React.ReactNode

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
   * For variant confirmation, hide the default confirm button and only show the decline button.
   */
  hideConfirm?: boolean

  /**
   * Pass in custom confirm/decline buttons for action handling. Every child of type Button will be provided with a `close` function attribute.
   */
  children?: React.ReactElement | Array<React.ReactElement>
}

export type DialogActionAllProps = DialogActionProps &
  SpacingProps &
  Omit<React.HTMLAttributes<HTMLElement>, 'children'>

const fallbackCloseAction = ({ close }: extendedMouseEvent) => close()

const DialogAction = ({
  declineText = null,
  confirmText = null,
  hideDecline = false,
  hideConfirm = false,
  onConfirm = fallbackCloseAction,
  onDecline = fallbackCloseAction,
  className,
  children,
  ...props
}: DialogActionAllProps) => {
  const { translation, Button: ButtonContext } = useContext(Context)
  const { close } = useContext(ModalContext)
  let childrenWithCloseFunc: Array<React.ReactChild>

  const onConfirmHandler = useCallback(
    (event) => {
      dispatchCustomElementEvent({ onConfirm }, 'onConfirm', {
        event,
        close,
      })
    },
    [close, onConfirm]
  )
  const onDeclineHandler = useCallback(
    (event) => {
      dispatchCustomElementEvent({ onDecline }, 'onDecline', {
        event,
        close,
      })
    },
    [close, onDecline]
  )

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
    <Space
      element="section"
      className={classNames('dnb-dialog__actions', className)}
      {...props}
    >
      {childrenWithCloseFunc}

      {!children && !hideDecline && (
        <Button
          text={declineText || translation?.Dialog?.declineText}
          variant="secondary"
          onClick={onDeclineHandler}
          size={ButtonContext?.size || 'large'}
        />
      )}
      {!children && !hideConfirm && (
        <Button
          text={confirmText || translation?.Dialog?.confirmText}
          variant="primary"
          onClick={onConfirmHandler}
          size={ButtonContext?.size || 'large'}
        />
      )}
    </Space>
  )
}

DialogAction._supportsSpacingProps = true

export default DialogAction
