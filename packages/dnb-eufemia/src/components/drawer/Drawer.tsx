/**
 * Web Drawer Component
 *
 */
import React, { useContext } from 'react'
import Modal from '../modal/Modal'
import DrawerContent from './DrawerContent'
import DrawerBody from './parts/DrawerBody'
import DrawerHeader from './parts/DrawerHeader'
import DrawerNavigation from './parts/DrawerNavigation'
import classnames from 'classnames'
import Context from '../../shared/Context'
import { DrawerProps, DrawerContentProps } from './types'
import { removeUndefinedProps } from '../../shared/component-helper'

function Drawer({
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
  containerPlacement = 'right',
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
}: DrawerProps & DrawerContentProps): JSX.Element {
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
    container_placement: containerPlacement,
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

  const drawerProps = removeUndefinedProps({
    ...props,
    noAnimation,
    noAnimationOnMobile,
    fullscreen,
    spacing,
  })

  return (
    <Modal
      {...context.Drawer}
      {...modalProps}
      mode="custom"
      content_class={classnames('dnb-drawer__root', contentClass)}
    >
      <DrawerContent {...context.Drawer} {...drawerProps} />
    </Modal>
  )
}

Drawer.Body = DrawerBody
Drawer.Header = DrawerHeader
Drawer.Navigation = DrawerNavigation

export default Drawer
