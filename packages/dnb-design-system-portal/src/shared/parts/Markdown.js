/**
 * Page Component
 *
 */

import React from 'react'

import PropTypes from 'prop-types'

export class Html extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
  }
  static defaultProps = {
    children: null,
    value: null,
  }
  state = {
    visible: true,
  }
  render() {
    return (
      <React.Fragment>
        {this.state.visible && this.props.value && (
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.value,
            }}
          />
        )}
        {this.state.visible && this.props.children}
      </React.Fragment>
    )
  }
}
