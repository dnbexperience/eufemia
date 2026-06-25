import {
  Children,
  createElement,
  isValidElement,
  useCallback,
  useContext,
} from 'react'
import type {
  ComponentType,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react'
import { clsx } from 'clsx'
import Button from '../../button/Button'
import FormStatus from '../../FormStatus'
import Space from '../../space/Space'
import ModalContext from '../../modal/ModalContext'
import { dispatchCustomElementEvent } from '../../../shared/component-helper'
import { Context } from '../../../shared'
import useId from '../../../shared/helpers/useId'
import withComponentMarkers from '../../../shared/helpers/withComponentMarkers'

import type { ButtonProps } from '../../button/Button'
import type { SpacingProps } from '../../../shared/types'

type ExtendedMouseEvent = {
  event: MouseEvent<HTMLElement>
  close: () => void
}

export type DialogActionProps = {
  /**
   * For dialog actions, give a custom text for the decline button.
   */
  declineText?: ReactNode

  /**
   * For dialog actions, give a custom text for the confirm button.
   */
  confirmText?: ReactNode

  /**
   * For variant confirmation, handle the confirm action click.
   */
  onConfirm?: (event: ExtendedMouseEvent) => void

  /**
   * For variant confirmation, handle the decline action click.
   */
  onDecline?: (event: ExtendedMouseEvent) => void

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
  children?: ReactElement | Array<ReactElement>

  /**
   * Provide a status message that will be displayed below the action buttons.
   */
  status?: ReactNode
}

export type DialogActionAllProps = DialogActionProps &
  SpacingProps &
  Omit<HTMLAttributes<HTMLElement>, 'children'>

const fallbackCloseAction = ({ close }: ExtendedMouseEvent) => close()

const DialogAction = ({
  declineText = null,
  confirmText = null,
  hideDecline = false,
  hideConfirm = false,
  status,
  onConfirm = fallbackCloseAction,
  onDecline = fallbackCloseAction,
  className,
  children,
  ...props
}: DialogActionAllProps) => {
  const { translation, Button: ButtonContext } = useContext(Context)
  const { close } = useContext(ModalContext)
  let childrenWithCloseFunc: ReactNode

  const statusId = useId()

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
    childrenWithCloseFunc = Children.map(children, (child) => {
      if (isValidElement<ButtonProps>(child) && child.type === Button) {
        const childElement = child as ReactElement<ButtonProps>

        return createElement(
          childElement.type as ComponentType<ButtonProps>,
          {
            ...(childElement.props || {}),
            onClick: (event) => {
              dispatchCustomElementEvent(childElement.props, 'onClick', {
                event,
                close,
              })
            },
          },
          childElement.props.children
        )
      } else {
        return child
      }
    })
  }

  return (
    <>
      <Space
        element="section"
        className={clsx('dnb-dialog__actions', className)}
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
            status={status ? 'error' : undefined}
            aria-describedby={status ? statusId + '-status' : undefined}
          />
        )}
      </Space>

      <FormStatus
        show={!!status}
        id={statusId + '-form-status'}
        textId={statusId + '-status'}
        noAnimation={false}
        shellSpace={{ top: 'small' }}
      >
        {status}
      </FormStatus>
    </>
  )
}

withComponentMarkers(DialogAction, {
  _supportsSpacingProps: true,
})

export default DialogAction
