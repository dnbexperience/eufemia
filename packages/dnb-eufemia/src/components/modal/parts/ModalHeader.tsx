/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import { findElementInChildren } from '../../../shared/component-helper'
import Section from '../../section/Section'
import { SectionProps } from '../../section'
import ModalContext from '../ModalContext'
import H1 from '../../../elements/H1'
import { ReactChildType } from '../types'

export interface ModalHeaderProps
  extends Omit<SectionProps, 'size' | 'title'> {
  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactChildType

  /**
   * The modal/drawer title. Displays on the very top of the content.
   */
  title?: React.ReactNode

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string

  /**
   * Give the h1 component a classname (maps to `dnb-modal__title`)
   */
  title_class?: string

  /**
   * Font size of the title (maps to `dnb-p--<size>`)
   */
  size?: 'medium' | 'large' | 'x-large' | 'xx-large'
}

export default class ModalHeader extends React.PureComponent<ModalHeaderProps> {
  static contextType = ModalContext
  render() {
    const {
      title = null,
      className = null,
      children = null,
      title_class = null,
      size = null,
      ref, // eslint-disable-line
      ...sectionProps
    } = this.props
    const { mode } = this.context

    const customHeader = findElementInChildren(children, (cur) => {
      return cur.type === 'h1' || cur.type === H1
    })

    const usedTitle = title || this.context.title
    const showTitle = !customHeader && usedTitle
    const fontSize =
      size || (this.context.mode === 'drawer' && 'x-large') || 'large'

    return (
      <Section
        style_type="white"
        className={classnames(
          className,

          // Deprecated - For backward compatibility
          mode == 'drawer' && 'dnb-drawer__header',
          (mode == 'modal' || mode == 'dialog') && 'dnb-dialog__header'
        )}
        id={
          showTitle ? 'dnb-modal-' + this.context.id + '-title' : undefined
        }
        {...sectionProps}
      >
        {showTitle && (
          <h1
            className={classnames(
              'dnb-modal__title', // for tests
              'dnb-space__top--zero',
              'dnb-space__bottom--small',
              `dnb-h--${fontSize}`,
              title_class,

              // Deprecated - For backward compatibility
              mode == 'drawer' && 'dnb-drawer__title',
              (mode == 'modal' || mode == 'dialog') && 'dnb-dialog__title'
            )}
          >
            {usedTitle}
          </h1>
        )}
        <div>{children}</div>
      </Section>
    )
  }
}
