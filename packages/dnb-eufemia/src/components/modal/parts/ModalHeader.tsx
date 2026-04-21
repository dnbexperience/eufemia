/**
 * Web Modal Component
 *
 */

import React, { useContext } from 'react'
import clsx from 'clsx'
import { findElementInChildren } from '../../../shared/component-helper'
import type { SectionProps } from '../../section/Section'
import Section from '../../section/Section'
import Space from '../../space/Space'
import ModalContext from '../ModalContext'
import H1 from '../../../elements/H1'

export type ModalHeaderProps = {
  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: React.ReactNode

  /**
   * The modal/drawer title. Displays on the very top of the content.
   */
  title?: React.ReactNode

  /**
   * Give the h1 component a classname (maps to `dnb-modal__title`)
   */
  titleClass?: string

  /**
   * Font size of the title (maps to `dnb-h--<size>`)
   * Default: `large`
   */
  size?: 'medium' | 'large' | 'x-large' | 'xx-large'
} & Omit<SectionProps, 'children'>

export default function ModalHeader({
  title = null,
  children = null,
  titleClass = null,
  size = null,
  ref,
  ...sectionProps
}: ModalHeaderProps &
  Omit<React.HTMLProps<HTMLElement>, 'size' | 'title' | 'children'>) {
  const context = useContext(ModalContext)

  const customHeader = findElementInChildren(children, (cur) => {
    return cur.type === 'h1' || cur.type === H1
  })

  const usedTitle = title || context.title
  const showTitle = !customHeader && usedTitle
  const fontSize = size || 'large'

  return (
    <Section
      id={showTitle ? 'dnb-modal-' + context.id + '-title' : undefined}
      {...sectionProps}
    >
      {showTitle ? (
        <Space
          element="h1"
          top="zero"
          bottom="small"
          className={clsx(
            'dnb-modal__title', // for tests
            `dnb-h--${fontSize}`,
            titleClass,
          )}
        >
          {usedTitle}
        </Space>
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
