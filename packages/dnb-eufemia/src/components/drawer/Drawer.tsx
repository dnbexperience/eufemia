/**
 * Web Drawer Component
 *
 */
import { useContext } from 'react'
import type { JSX, ReactNode } from 'react'
import Modal from '../modal/Modal'
import DrawerContent from './DrawerContent'
import DrawerBody from './parts/DrawerBody'
import DrawerHeader from './parts/DrawerHeader'
import DrawerNavigation from './parts/DrawerNavigation'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import type { DrawerProps, DrawerContentProps } from './types'
import { removeUndefinedProps } from '../../shared/component-helper'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type DrawerAllProps = DrawerProps & DrawerContentProps

function Drawer(ownProps: DrawerAllProps): JSX.Element {
  const context = useContext(Context)
  const { renderDriver, ...props } = {
    ...context.Drawer,
    ...removeUndefinedProps({ ...ownProps }),
  }
  const Renderer = renderDriver?.Renderer
  return Renderer ? (
    <Renderer {...props} renderDrawer={renderDrawer} />
  ) : (
    <DrawerBase {...props} />
  )
}

function renderDrawer(props: DrawerAllProps, content?: ReactNode) {
  return <DrawerBase {...props} driverContent={content} />
}

function DrawerBase({
  driverContent,
  id,
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
  open,
  openDelay,
  restoreFocus,
  restoreFocusTo,

  omitTriggerButton,
  trigger,
  triggerProps,
  triggerAttributes,
  closeButtonProps,
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
}: DrawerAllProps & { driverContent?: ReactNode }): JSX.Element {
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
    open,
    restoreFocus,
    restoreFocusTo,
    directDomReturn,
    onOpen,
    onClose,
    onClosePrevent,
    openModal,
    closeModal,
    omitTriggerButton,
    trigger,
    triggerProps,
    triggerAttributes,
    closeButtonProps,
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
      {...modalProps}
      fullscreen={false} // to avoid double fullscreen as it's handled in DrawerContent
      contentClass={clsx('dnb-drawer__root', contentClass)}
    >
      {driverContent}
      <DrawerContent {...drawerProps} />
    </Modal>
  )
}

Drawer.Body = DrawerBody
Drawer.Header = DrawerHeader
Drawer.Navigation = DrawerNavigation

withComponentMarkers(Drawer, {
  _supportsSpacingProps: true,
})

export default Drawer
