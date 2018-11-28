/**
 * Page Component
 *
 */

import React, { PureComponent, Fragment } from 'react'

import PropTypes from 'prop-types'
import dnb from 'dnb-ui-lib/src'
import portalStyle from './PortalStyle'

// import { CodeRenderer } from './Code'
// import ReactMarkdown from 'react-markdown'
// export default class Markdown extends PureComponent {
//   static propTypes = {
//     children: PropTypes.string.isRequired
//   }
//   render() {
//     const { children } = this.props
//     return (
//       <div css={markdownStyle}>
//         <ReactMarkdown
//           escapeHtml={false}
//           // skipHtml={true}
//           // unwrapDisallowed={true}
//           source={children}
//           renderers={{
//             html: Html,
//             code: CodeRenderer
//             // table: Table
//           }}
//         />
//       </div>
//     )
//   }
// }

export class Html extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.string
  }
  static defaultProps = {
    children: null,
    value: null
  }
  componentDidMount() {
    if (
      this.props.children ||
      (this.props.value && /<dnb/.test(this.props.value))
    ) {
      dnb.enableWebComponents()
    }
    // setTimeout(() => {
    //   this.show()
    // }, 3e3)
  }
  state = {
    visible: true
  }
  // show() {
  //   this.setState({
  //     visible: true
  //   })
  // }
  render() {
    return (
      <Fragment>
        {this.state.visible && this.props.value && (
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.value
            }}
          />
        )}
        {this.state.visible && this.props.children}
      </Fragment>
    )
  }
}

// export class Script extends PureComponent {
//   static propTypes = {
//     children: PropTypes.node,
//     value: PropTypes.string
//   }
//   static defaultProps = {
//     children: null,
//     value: null
//   }
//   render() {
//     console.log('Script', this.props)
//     return <Fragment>Hello</Fragment>
//   }
// }

export const markdownStyle = portalStyle
