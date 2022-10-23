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
  preventOverlayClose,
  openState,
  openDelay,

  omitTriggerButton,
  trigger,
  triggerAttributes,
  overlayClass,
  contentClass,
  contentRef,
  scrollRef,

  top,
  bottom,
  left,
  right,
  space,

  ...props
}: DrawerProps & DrawerContentProps): JSX.Element {
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
    preventOverlayClose,
    animationDuration,
    noAnimation,
    noAnimationOnMobile,
    fullscreen,
    containerPlacement,
    openState,
    directDomReturn,
    rootId,
    onOpen,
    onClose,
    onClosePrevent,
    openModal,
    closeModal,
    omitTriggerButton,
    trigger,
    triggerAttributes,
    overlayClass,
    contentRef,
    scrollRef,
    top,
    bottom,
    left,
    right,
    space,
  })

  const drawerProps = removeUndefinedProps({
    ...props,
    noAnimation,
    noAnimationOnMobile,
    fullscreen,
    spacing,
    containerPlacement,
  })

  return (
    <Modal
      {...context.Drawer}
      {...modalProps}
      mode="custom"
      contentClass={classnames('dnb-drawer__root', contentClass)}
    >
      <DrawerContent {...context.Drawer} {...drawerProps} />
    </Modal>
  )
}

Drawer.Body = DrawerBody
Drawer.Header = DrawerHeader
Drawer.Navigation = DrawerNavigation

export default Drawer
