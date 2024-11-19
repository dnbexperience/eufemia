/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import { findElementInChildren } from '../../../shared/component-helper'
import Section, { SectionProps } from '../../section/Section'
import ModalContext from '../ModalContext'
import H1 from '../../../elements/H1'
import { ReactChildType } from '../types'

export interface ModalHeaderProps extends Omit<SectionProps, 'children'> {
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
   * Font size of the title (maps to `dnb-h--<size>`)
   * Default is `large`
   */
  size?: 'medium' | 'large' | 'x-large' | 'xx-large'
}

export default class ModalHeader extends React.PureComponent<
  ModalHeaderProps &
    Omit<React.HTMLProps<HTMLElement>, 'size' | 'title' | 'children'>
> {
  static contextType = ModalContext

  context!: React.ContextType<typeof ModalContext>

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

    const customHeader = findElementInChildren(children, (cur) => {
      return cur.type === 'h1' || cur.type === H1
    })

    const usedTitle = title || this.context.title
    const showTitle = !customHeader && usedTitle
    const fontSize = size || 'large'

    return (
      <Section
        style_type="white"
        className={classnames(className)}
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
              title_class
            )}
          >
            {usedTitle}
          </h1>
        )}
        <div>{children as React.ReactNode}</div>
      </Section>
    )
  }
}
