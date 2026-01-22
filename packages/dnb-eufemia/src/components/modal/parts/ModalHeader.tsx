/**
 * Web Modal Component
 *
 */

import React from 'react'
import clsx from 'clsx'
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
  titleClass?: string

  /**
   * Font size of the title (maps to `dnb-h--<size>`)
   * Default is `large`
   */
  size?: 'medium' | 'large' | 'x-large' | 'xx-large'
}

const ModalHeader: React.FC<
  ModalHeaderProps &
    Omit<React.HTMLProps<HTMLElement>, 'size' | 'title' | 'children'>
> = (props) => {
  const context = React.useContext(ModalContext)

  const {
    title = null,
    className = null,
    children = null,
    titleClass = null,
    size = null,
    ref, // eslint-disable-line
    ...sectionProps
  } = props

  const customHeader = findElementInChildren(children, (cur) => {
    return cur.type === 'h1' || cur.type === H1
  })

  const usedTitle = title || context.title
  const showTitle = !customHeader && usedTitle
  const fontSize = size || 'large'

  return (
    <Section
      style_type="white"
      className={clsx(className)}
      id={showTitle ? 'dnb-modal-' + context.id + '-title' : undefined}
      {...sectionProps}
    >
      {showTitle ? (
        <h1
          className={clsx(
            'dnb-modal__title', // for tests
            'dnb-space__top--zero',
            'dnb-space__bottom--small',
            `dnb-h--${fontSize}`,
            titleClass
          )}
        >
          {usedTitle}
        </h1>
      ) : (
        <div
          aria-hidden
          tabIndex={-1}
          className="dnb-modal__focus-helper dnb-sr-only"
        >
          {/* Used to set focus when no close button is present */}
          {usedTitle}
        </div>
      )}
      <div>{children as React.ReactNode}</div>
    </Section>
  )
}

export default ModalHeader
