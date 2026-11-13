/**
 * Web Drawer Component
 *
 */

import { useContext } from 'react'
import type { JSX, ReactElement } from 'react'
import { clsx } from 'clsx'
import { findElementInChildren } from '../../shared/component-helper'
import ScrollView from '../scroll-view/ScrollView'
import DrawerHeader from './parts/DrawerHeader'
import DrawerNavigation from './parts/DrawerNavigation'
import ModalContext from '../modal/ModalContext'
import mergeProps from '../../shared/helpers/mergeProps'
import { getContent } from '../modal/helpers'
import type { DrawerContentProps } from './types'
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
  minWidth: minWidthProp = null,
  maxWidth: maxWidthProp = null,
  scrollbarGutter,
  ...rest
}: DrawerContentProps): JSX.Element {
  const context = useContext(ModalContext)
  const reveal = useContext(DrawerContentContext)?.reveal
  const gutter =
    scrollbarGutter === false
      ? undefined
      : scrollbarGutter === 'stable' || spacing !== false
        ? 'stable'
        : undefined
  const { minWidth, maxWidth } = checkMinMaxWidth(
    minWidthProp,
    maxWidthProp
  )
  const content =
    modalContent ||
    getContent(
      typeof rest.children === 'function'
        ? Object.freeze({ ...rest, close: context?.close })
        : rest
    )

  const innerParams = {
    className: clsx(
      'dnb-drawer',
      !preventCoreStyle && 'dnb-core-style',
      spacing && 'dnb-drawer--spacing',
      alignContent && `dnb-drawer__align--${alignContent}`,
      fullscreen === true
        ? `dnb-drawer--fullscreen`
        : fullscreen === 'auto' && `dnb-drawer--auto-fullscreen`,
      context?.hide && `dnb-drawer--hide`,
      noAnimation && `dnb-drawer--no-animation`,
      noAnimationOnMobile && `dnb-drawer--no-animation-on-mobile`,

      `dnb-drawer--${containerPlacement || 'right'}`,
      className
    ),
    ...mergeProps(
      {
        style: (minWidth || maxWidth) && { minWidth, maxWidth },
        onClick: context?.preventClick,
        onTouchStart: context?.preventClick,
        onKeyDown: context?.onKeyDownHandler,
      },
      rest
    ),
  }

  const navigationElement = findElementInChildren(
    content,
    (cur: ReactElement) =>
      cur.type === DrawerNavigation || cur.type === ModalHeaderBar
  )
  const headerElement = findElementInChildren(
    content,
    (cur: ReactElement) =>
      cur.type === DrawerHeader || cur.type === ModalHeader
  )

  const scrollContent = (
    <>
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
          <DrawerContentContext
            value={{ navigationElement, headerElement }}
          >
            {content}
          </DrawerContentContext>
        </div>
      </div>
    </>
  )

  return (
    <ScrollView
      {...innerParams}
      ref={reveal ? undefined : context?.scrollRef}
      scrollbarGutter={reveal ? undefined : gutter}
    >
      {navigationElement ? (
        navigationElement
      ) : (
        <DrawerNavigation>{navContent}</DrawerNavigation>
      )}

      {reveal ? (
        <ScrollView
          className="dnb-drawer__reveal-scroll"
          ref={context?.scrollRef}
          scrollbarGutter={gutter}
        >
          {scrollContent}
        </ScrollView>
      ) : (
        scrollContent
      )}
    </ScrollView>
  )
}
