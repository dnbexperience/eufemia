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

export type DrawerAllProps = DrawerProps & DrawerContentProps

function Drawer({
  id,
  rootId,
  contentId,
  focusSelector,
  labelledBy,
  directDomReturn,
  hideCloseButton,
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
  closeButtonAttributes,
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
}: DrawerAllProps): JSX.Element {
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
    closeButtonAttributes,
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
      contentClass={classnames('dnb-drawer__root', contentClass)}
    >
      <DrawerContent {...context.Drawer} {...drawerProps} />
    </Modal>
  )
}

Drawer.Body = DrawerBody
Drawer.Header = DrawerHeader
Drawer.Navigation = DrawerNavigation

Drawer._supportsSpacingProps = true

export default Drawer
