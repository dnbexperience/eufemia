/**
 * Web Modal Component
 *
 */

import React from 'react'
import Section from '../../section/Section'
import ModalContext from '../ModalContext'
import classnames from 'classnames'
import { SectionProps } from '../../Section'

export interface ModalInnerProps extends SectionProps {
  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string
}

export default class ModalInner extends React.PureComponent<
  ModalInnerProps & React.HTMLProps<HTMLElement>
> {
  static contextType = ModalContext

  context!: React.ContextType<typeof ModalContext>

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
        className={classnames(className)}
        {...props}
      />
    )
  }
}
