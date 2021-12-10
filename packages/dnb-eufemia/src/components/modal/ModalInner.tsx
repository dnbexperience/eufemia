/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import Section from '../section/Section'
import ModalContext from './ModalContext'
import { ModalInnerProps } from './types'

export default class ModalInner extends React.PureComponent<
  ModalInnerProps & React.HTMLProps<HTMLElement>
> {
  static contextType = ModalContext

  componentDidMount() {
    const { style_type = 'black-3' } = this.props
    if (style_type) {
      this.context.setBackgroundColor(style_type)
    }
  }

  render() {
    const {
      className = null,
      style_type = 'black-3',
      ref, // eslint-disable-line
      ...props
    } = this.props

    return (
      <Section
        style_type={style_type}
        className={classnames('dnb-modal__wrapper__inner', className)}
        {...props}
      />
    )
  }
}
