/**
 * Web Modal Component
 *
 */

import React from 'react'
import Section from '../../section/Section'
import ModalContext from '../ModalContext'
import classnames from 'classnames'
import { SectionProps } from '../../Section'

export type ModalInnerProps = SectionProps

export default class ModalInner extends React.PureComponent<
  ModalInnerProps & React.HTMLProps<HTMLElement>
> {
  static contextType = ModalContext

  context!: React.ContextType<typeof ModalContext>

  componentDidMount() {
    const { backgroundColor = 'black-3' } = this.props
    if (backgroundColor) {
      this.context.setBackgroundColor(backgroundColor)
    }
  }

  render() {
    const {
      className = null,
      backgroundColor = 'black-3',
      ref, // eslint-disable-line
      ...props
    } = this.props

    return (
      <Section
        backgroundColor={backgroundColor}
        className={classnames(className)}
        {...props}
      />
    )
  }
}
