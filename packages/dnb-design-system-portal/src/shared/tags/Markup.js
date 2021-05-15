/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Code from '../parts/uilib/Code'

export default class Markup extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  }
  static defaultProps = {
    children: null,
  }
  render() {
    const { children } = this.props
    return <Code source={children} />
  }
}
