/**
 * Page Component
 *
 */

import React from 'react'

import PropTypes from 'prop-types'
import { enableWebComponents } from '@dnb/eufemia/src/lib'
import portalStyle from './PortalStyle'

// import { CodeRenderer } from './Code'
// import ReactMarkdown from 'react-markdown'
// export default class Markdown extends React.PureComponent {
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

export class Html extends React.PureComponent {
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
      enableWebComponents()
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
      <React.Fragment>
        {this.state.visible && this.props.value && (
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.value
            }}
          />
        )}
        {this.state.visible && this.props.children}
      </React.Fragment>
    )
  }
}

// export class Script extends React.PureComponent {
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
//     return <React.Fragment>Hello</React.Fragment>
//   }
// }

export const markdownStyle = portalStyle
