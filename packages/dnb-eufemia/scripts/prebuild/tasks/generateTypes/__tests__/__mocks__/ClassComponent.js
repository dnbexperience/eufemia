/**
 * Test mock file
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

export default class ComponentName extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    classProperty: PropTypes.string,
  }
  static defaultProps = {
    children: null,
    classProperty: null,
  }
}
