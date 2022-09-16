/**
 * Web Drawer Component
 *
 */

import React, { useContext } from 'react'
import classnames from 'classnames'
import {
  isTrue,
  findElementInChildren,
} from '../../shared/component-helper'
import ScrollView from '../../fragments/scroll-view/ScrollView'
import DrawerHeader from './parts/DrawerHeader'
import DrawerNavigation from './parts/DrawerNavigation'
import ModalContext from '../modal/ModalContext'
import { getContent } from '../modal/helpers'
import { DrawerContentProps } from './types'
import { checkMinMaxWidth } from './helpers'
import ModalHeaderBar from '../modal/parts/ModalHeaderBar'
import ModalHeader from '../modal/parts/ModalHeader'

export default function DrawerContent({
  modalContent = null,
  navContent = null,
  headerContent = null,
  alignContent = 'left',
  containerPlacement = 'right',
  preventCoreStyle = false,
  className = null,
  spacing = true,
  fullscreen = 'auto',
  noAnimation = false,
  noAnimationOnMobile = false,
  minWidth: min_width = null,
  maxWidth: max_width = null,
  ...rest
}: DrawerContentProps): JSX.Element {
  const context = useContext(ModalContext)
  const { minWidth, maxWidth } = checkMinMaxWidth(min_width, max_width)
  const content =
    modalContent ||
    getContent(
      typeof rest.children === 'function'
        ? Object.freeze({ ...rest, close: context?.close })
        : rest
    )

  const innerParams = {
    className: classnames(
      !isTrue(preventCoreStyle) && 'dnb-core-style',

      'dnb-drawer',
      isTrue(spacing) && 'dnb-drawer--spacing',
      alignContent && `dnb-drawer__align--${alignContent}`,
      isTrue(fullscreen)
        ? `dnb-drawer--fullscreen`
        : fullscreen === 'auto' && `dnb-drawer--auto-fullscreen`,
      isTrue(context?.hide) && `dnb-drawer--hide`,
      isTrue(noAnimation) && `dnb-drawer--no-animation`,
      isTrue(noAnimationOnMobile) && `dnb-drawer--no-animation-on-mobile`,

      `dnb-drawer--${containerPlacement || 'right'}`,
      className
    ),
    style: (minWidth || maxWidth) && { minWidth, maxWidth },
    onClick: context?.preventClick,
    onTouchStart: context?.preventClick,
    onKeyDown: context?.onKeyDownHandler,
    ...rest,
  }

  const navExists = findElementInChildren(
    content,
    (cur) => cur.type === DrawerNavigation || cur.type === ModalHeaderBar
  )

  const headerExists = findElementInChildren(
    content,
    (cur) => cur.type === DrawerHeader || cur.type === ModalHeader
  )

  return (
    <ScrollView {...innerParams} ref={context?.scrollRef}>
      <div
        tabIndex={-1}
        className="dnb-drawer__inner dnb-no-focus"
        ref={context?.contentRef}
      >
        {!navExists && <DrawerNavigation>{navContent}</DrawerNavigation>}
        {!headerExists && (
          <DrawerHeader title={context?.title}>
            {headerContent}
          </DrawerHeader>
        )}
        <div
          id={context?.contentId + '-content'}
          className="dnb-drawer__content"
        >
          {content}
        </div>
      </div>
    </ScrollView>
  )
}
