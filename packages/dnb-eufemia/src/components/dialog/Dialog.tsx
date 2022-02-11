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
    title: title,
    id: id,
    focus_selector: focusSelector,
    labelled_by: labelledBy,
    disabled: disabled,
    spacing: spacing,
    open_delay: openDelay,
    content_id: contentId,
    dialog_title: dialogTitle,
    close_title: closeTitle,
    hide_close_button: hideCloseButton,
    close_button_attributes: closeButtonAttributes,
    prevent_close: preventClose,
    animation_duration: animationDuration,
    no_animation: noAnimation,
    no_animation_on_mobile: noAnimationOnMobile,
    fullscreen: fullscreen,
    open_state: openState,
    direct_dom_return: directDomReturn,
    root_id: rootId,
    on_open: onOpen,
    on_close: onClose,
    on_close_prevent: onClosePrevent,
    open_modal: openModal,
    close_modal: closeModal,
    trigger: trigger,
    trigger_attributes: triggerAttributes,
    overlay_class: overlayClass,
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    space: space,
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
      content_class={classnames('dnb-dialog__root', contentClass)}
    >
      <DialogContent {...context.Dialog} {...dialogProps} />
    </Modal>
  )
}

Dialog.Body = DialogBody
Dialog.Header = DialogHeader
Dialog.Navigation = DialogNavigation

export default Dialog
