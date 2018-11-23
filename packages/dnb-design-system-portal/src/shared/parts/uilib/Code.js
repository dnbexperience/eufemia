/**
 * Component
 *
 */

import React, { PureComponent, Fragment } from 'react'

import Beautifier from './code_beautifier'
import PropTypes from 'prop-types'
import ReactDOMServer from 'react-dom/server'

import pretty from 'pretty' // https://www.npmjs.com/package/pretty

// import prettier from 'prettier/standalone'
// import plugins from 'prettier/parser-parse5'
import CodeBlock from '../../inlineTags/CodeBlock'

export default class Code extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    raw: PropTypes.string,
    source: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
      .isRequired
  }
  static defaultProps = {
    language: 'html',
    raw: ''
  }
  state = {
    codeString: ''
  }
  constructor(props) {
    super(props)
    const Comp = this.props.source
    this.beautify(<Comp />)
  }
  _isMounted = false
  componentDidMount() {
    this._isMounted = true
    this.setCode()
  }
  setCode() {
    if (this.code)
      this.setState({
        codeString: this.props.raw + this.code
      })
    this.code = null
  }
  async beautify(comp) {
    switch (this.props.language) {
      case 'html':
        {
          this.code = ReactDOMServer.renderToStaticMarkup(comp)
          this.code = this.code.replace(/data-fake:/g, '') // is used to get onclick attribute on html tags
          this.code = this.code.replace(
            /disabled=""/g,
            'disabled="disabled"'
          ) // make disabled valid html code

          try {
            this.code = await Beautifier(this.code, 'html')
            this.code = pretty(this.code, { ocd: true })
            // this.code = prettier.format(this.code, {
            //   parser: 'parse5',
            //   plugins: [plugins]
            //   // plugins: [plugins],
            //   // printWidth: 75,
            //   // tabWidth: 2,
            //   // singleQuote: true,
            //   // bracketSpacing: true,
            //   // useTabs: false,
            //   // semi: false,
            //   // jsxBracketSameLine: false,
            //   // trailingComma: 'none'
            // })
            if (this._isMounted) this.setCode()
          } catch (e) {
            console.log('HTML Beautifier Error:', e)
          }
        }
        break
    }
  }

  render() {
    if (!this.state.codeString) {
      return <Fragment />
    }
    return (
      <CodeRenderer language={this.props.language}>
        {this.state.codeString}
      </CodeRenderer>
    )
  }
}

export class CodeRenderer extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]).isRequired
  }
  static defaultProps = {
    language: 'jsx'
  }
  render() {
    return <CodeBlock {...this.props} />
  }
}
