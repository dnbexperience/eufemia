/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import { findElementInChildren } from '../../../shared/component-helper'
import Section from '../../section/Section'
import ModalContext from '../ModalContext'
import H1 from '../../../elements/H1'
import { ModalHeaderProps } from '../types'

export default class ModalHeader extends React.PureComponent<
  ModalHeaderProps & React.HTMLProps<HTMLElement>
> {
  static contextType = ModalContext
  render() {
    const {
      title = null,
      className = null,
      children = null,
      ref, // eslint-disable-line
      ...props
    } = this.props

    const customHeader = findElementInChildren(children, (cur) => {
      return cur.type === 'h1' || cur.type === H1
    })

    const usedTitle = title || this.context.title
    const showTitle = !customHeader && usedTitle

    return (
      <Section
        style_type="white"
        className={classnames('dnb-modal__header', className)}
        id={
          showTitle ? 'dnb-modal-' + this.context.id + '-title' : undefined
        }
        {...props}
      >
        {showTitle && (
          <h1
            className={classnames(
              'dnb-modal__title',
              'dnb-space__top--zero',
              'dnb-space__bottom--small',
              this.context.mode === 'drawer'
                ? 'dnb-h--x-large'
                : 'dnb-h--large'
            )}
          >
            {usedTitle}
          </h1>
        )}
        <div className="dnb-modal__header__inner">{children}</div>
      </Section>
    )
  }
}
