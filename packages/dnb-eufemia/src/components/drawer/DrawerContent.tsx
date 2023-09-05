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
import { getOffsetTop, warn } from '../../shared/helpers'
import ScrollView from '../../fragments/scroll-view/ScrollView'
import DrawerHeader from './parts/DrawerHeader'
import DrawerNavigation from './parts/DrawerNavigation'
import ModalContext from '../modal/ModalContext'
import { getContent } from '../modal/helpers'
import { DrawerContentProps } from './types'
import { checkMinMaxWidth } from './helpers'
import ModalHeaderBar from '../modal/parts/ModalHeaderBar'
import ModalHeader from '../modal/parts/ModalHeader'
import { DrawerContentContext } from './parts/DrawerContentContext'

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

  /**
   * Update CSS --header-height with spacing to top of page
   */
  React.useEffect(() => {
    try {
      const height = getOffsetTop(context?.contentRef.current) / 16
      context?.contentRef.current.style.setProperty(
        '--header-height',
        `${height}rem`
      )
    } catch (e) {
      warn(e)
    }
  }, [content, context?.scrollRef, context?.contentRef])

  const navigationElement = findElementInChildren(
    content,
    (cur: React.ReactElement) =>
      cur.type === DrawerNavigation || cur.type === ModalHeaderBar
  )
  const headerElement = findElementInChildren(
    content,
    (cur: React.ReactElement) =>
      cur.type === DrawerHeader || cur.type === ModalHeader
  )

  return (
    <ScrollView {...innerParams} ref={context?.scrollRef}>
      {navigationElement ? (
        navigationElement
      ) : (
        <DrawerNavigation>{navContent}</DrawerNavigation>
      )}

      {headerElement ? (
        headerElement
      ) : (
        <DrawerHeader title={context?.title}>{headerContent}</DrawerHeader>
      )}
      <div
        tabIndex={-1}
        className="dnb-drawer__inner dnb-no-focus"
        ref={context?.contentRef}
      >
        <div
          id={context?.contentId + '-content'}
          className="dnb-drawer__content"
        >
          <DrawerContentContext.Provider
            value={{ navigationElement, headerElement }}
          >
            {content}
          </DrawerContentContext.Provider>
        </div>
      </div>
    </ScrollView>
  )
}
