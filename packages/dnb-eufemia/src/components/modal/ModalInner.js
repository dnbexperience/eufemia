/**
 * Web Modal Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Section from '../section/Section'
import ModalContext from './ModalContext'

export default class ModalInner extends React.PureComponent {
  static contextType = ModalContext
  static propTypes = {
    style_type: PropTypes.string,
    className: PropTypes.string,
  }
  static defaultProps = {
    style_type: 'black-3',
    className: null,
  }

  componentDidMount() {
    const { style_type } = this.props
    if (style_type) {
      this.context.setBackgroundColor(style_type)
    }
  }

  render() {
    const { className, style_type, ...props } = this.props

    return (
      <Section
        style_type={style_type}
        className={classnames('dnb-modal__wrapper__inner', className)}
        {...props}
      />
    )
  }
}
