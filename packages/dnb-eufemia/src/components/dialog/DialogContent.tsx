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
import DialogHeader from './parts/DialogHeader'
import DialogNavigation from './parts/DialogNavigation'
import { getContent } from '../modal/helpers'
import ModalContext from '../modal/ModalContext'
import { checkMinMaxWidth } from '../drawer/helpers'
import { DialogContentProps } from './types'
import ModalHeaderBar from '../modal/parts/ModalHeaderBar'
import ModalHeader from '../modal/parts/ModalHeader'

export default function DialogContent({
  modalContent = null,
  navContent = null,
  headerContent = null,
  alignContent = 'left',
  className = null,
  class: _className = null,
  preventCoreStyle = null,
  spacing = true,
  fullscreen = 'auto',
  noAnimation = false,
  noAnimationOnMobile = false,
  minWidth: min_width = null,
  maxWidth: max_width = null,
  ...rest
}: DialogContentProps): JSX.Element {
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

      'dnb-dialog',
      isTrue(spacing) && 'dnb-dialog--spacing',
      alignContent && `dnb-dialog__align--${alignContent}`,
      isTrue(fullscreen)
        ? `dnb-dialog--fullscreen`
        : fullscreen === 'auto' && `dnb-dialog--auto-fullscreen`,
      isTrue(context?.hide) && `dnb-dialog--hide`,
      isTrue(noAnimation) && `dnb-dialog--no-animation`,
      isTrue(noAnimationOnMobile) && `dnb-dialog--no-animation-on-mobile`,
      className,
      _className
    ),
    style: (minWidth || maxWidth) && { minWidth, maxWidth },
    onClick: context?.preventClick,
    onTouchStart: context?.preventClick,
    onKeyDown: context?.onKeyDownHandler,
    ...rest,
  }

  const navExists = findElementInChildren(
    content,
    (cur) => cur.type === DialogNavigation || cur.type === ModalHeaderBar
  )

  const headerExists = findElementInChildren(
    content,
    (cur) => cur.type === DialogHeader || cur.type === ModalHeader
  )
  return (
    <ScrollView {...innerParams}>
      <div
        tabIndex={-1}
        className="dnb-dialog__inner dnb-no-focus"
        ref={context?.contentRef}
      >
        {!navExists && <DialogNavigation>{navContent}</DialogNavigation>}
        {!headerExists && (
          <DialogHeader title={context?.title}>
            {headerContent}
          </DialogHeader>
        )}
        <div
          id={context?.contentId + '-content'}
          className="dnb-dialog__content"
        >
          {content}
        </div>
      </div>
    </ScrollView>
  )
}
