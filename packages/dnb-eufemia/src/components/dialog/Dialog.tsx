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
import { removeUndefinedProps } from '../../shared/component-helper'

function Dialog({
  id,
  rootId,
  contentId,
  focusSelector,
  labelledBy,
  directDomReturn,
  hideCloseButton,
  closeButtonAttributes,
  disabled,

  title,
  dialogTitle,
  closeTitle,
  spacing = true,
  noAnimation,
  noAnimationOnMobile,
  animationDuration,
  fullscreen = 'auto',

  onOpen,
  onClose,
  onClosePrevent,
  openModal,
  closeModal,
  preventClose,
  openState,
  openDelay,

  trigger,
  triggerAttributes,
  overlayClass,
  contentClass,

  top,
  bottom,
  left,
  right,
  space,

  ...props
}: DialogProps & DialogContentProps): JSX.Element {
  const context = useContext(Context)

  const modalProps = removeUndefinedProps({
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
    hideCloseButton,
    closeButtonAttributes,
    preventClose,
    animationDuration,
    noAnimation,
    noAnimationOnMobile,
    fullscreen,
    openState,
    directDomReturn,
    rootId,
    onOpen,
    onClose,
    onClosePrevent,
    openModal,
    closeModal,
    trigger,
    triggerAttributes,
    overlayClass,
    top,
    bottom,
    left,
    right,
    space,
  })

  const dialogProps = removeUndefinedProps({
    ...props,
    noAnimation,
    noAnimationOnMobile,
    fullscreen,
    spacing,
  })

  return (
    <Modal
      {...context.Dialog}
      {...modalProps}
      mode="custom"
      contentClass={classnames('dnb-dialog__root', contentClass)}
    >
      <DialogContent {...context.Dialog} {...dialogProps} />
    </Modal>
  )
}

Dialog.Body = DialogBody
Dialog.Header = DialogHeader
Dialog.Navigation = DialogNavigation

export default Dialog
