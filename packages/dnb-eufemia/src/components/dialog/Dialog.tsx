/**
 * Web Dialog Component
 *
 */
import React, { useContext } from 'react'
import Modal from '../modal/Modal'
import DialogContent from './DialogContent'
import DialogBody from './parts/DialogBody'
import DialogHeader from './parts/DialogHeader'
import DialogNavigation from './parts/DialogNavigation'
import { DialogProps, DialogContentProps } from './types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import DialogAction from './parts/DialogAction'
import { usePropsWithContext } from '../../shared/hooks'

const defaultProps = {
  variant: 'information',
  spacing: true,
}

function Dialog(
  localProps: DialogProps & DialogContentProps
): JSX.Element {
  const context = useContext(Context)

  const propsWithContext = usePropsWithContext(
    localProps,
    defaultProps,
    context?.Dialog
  )

  const {
    id,
    rootId,
    contentId,
    focusSelector,
    labelledBy,
    directDomReturn,
    closeButtonAttributes,
    disabled,

    variant,
    title,
    dialogTitle,
    closeTitle,
    spacing,
    noAnimation,
    noAnimationOnMobile,
    animationDuration,
    triggerAttributes,
    hideCloseButton,
    fullscreen,

    onOpen,
    onClose,
    onClosePrevent,
    openModal,
    closeModal,
    preventClose,
    preventOverlayClose,
    openState,
    openDelay,

    trigger,
    omitTriggerButton = false,
    overlayClass,
    contentClass,

    top,
    bottom,
    left,
    right,
    space,

    ...props
  } = propsWithContext

  let currentHideCloseButton = hideCloseButton
  let currentOmitTriggerButton = omitTriggerButton
  let currentFullscreen = fullscreen
  let currentPreventOverlayClose = preventOverlayClose

  if (variant === 'confirmation') {
    currentHideCloseButton =
      hideCloseButton !== undefined ? hideCloseButton : true
    currentOmitTriggerButton =
      triggerAttributes !== undefined ? omitTriggerButton : true
    currentPreventOverlayClose =
      preventOverlayClose !== undefined ? preventOverlayClose : true
  }

  if (fullscreen === undefined && fullscreen !== false) {
    currentFullscreen = variant === 'information' ? 'auto' : false
  }

  const modalProps = {
    title,
    id,
    focusSelector,
    labelledBy,
    disabled,
    spacing,
    openDelay,
    contentId,
    dialogTitle,
    closeTitle,
    hideCloseButton: currentHideCloseButton,
    closeButtonAttributes,
    preventClose,
    preventOverlayClose: currentPreventOverlayClose,
    animationDuration,
    noAnimation,
    noAnimationOnMobile,
    fullscreen: currentFullscreen,
    openState,
    directDomReturn,
    rootId,
    onOpen,
    onClose,
    onClosePrevent,
    openModal,
    closeModal,
    omitTriggerButton: currentOmitTriggerButton,
    trigger,
    triggerAttributes,
    overlayClass,
    top,
    bottom,
    left,
    right,
    space,
  }

  const dialogProps = {
    ...props,
    noAnimation,
    noAnimationOnMobile,
    fullscreen: currentFullscreen,
    spacing,
    variant,
  }

  return (
    <Modal
      {...modalProps}
      mode="custom"
      dialogRole={variant == 'information' ? 'dialog' : 'alertdialog'}
      contentClass={classnames('dnb-dialog__root', contentClass)}
    >
      <DialogContent {...dialogProps} />
    </Modal>
  )
}

Dialog.Body = DialogBody
Dialog.Header = DialogHeader
Dialog.Navigation = DialogNavigation
Dialog.Action = DialogAction

export default Dialog
