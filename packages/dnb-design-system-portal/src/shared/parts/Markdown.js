/**
 * Page Component
 *
 */

import React from 'react'

import PropTypes from 'prop-types'
import { enableWebComponents } from '@dnb/eufemia/src/lib'
import portalStyle from './PortalStyle'

export class Html extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
  }
  static defaultProps = {
    children: null,
    value: null,
  }
  componentDidMount() {
    if (
      this.props.children ||
      (this.props.value && /<dnb/.test(this.props.value))
    ) {
      enableWebComponents()
    }
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

export const markdownStyle = portalStyle
