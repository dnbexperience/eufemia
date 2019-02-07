/**
 * Inline Tag
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Pre from './Pre'
import { Button } from 'dnb-ui-lib/src'
import Code from '../parts/uilib/Code'
import { generateElement } from './transpile/index'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live-replacement'
// we use this replacement, because;
// to simply have newer prism version for the LiveEditor

// this theme is replaced my a css one
// import prismTheme from 'prism-react-renderer/themes/nightOwl'
import dnbTheme from './themes/dnb-prism-theme'

const prismStyle = css(dnbTheme)

const Wrapper = styled.div`
  margin-bottom: 2rem;
`

const CodeBlock = ({
  language,
  children: exampleCode,
  reactLive: isReactLive,
  ...props
}) => {
  if (!language) {
    language =
      (String(props && props.className).match(/language-(.*)$|\s/) ||
        [])[1] || 'jsx'
  }

  if (((props && props.scope) || isReactLive) && language === 'jsx') {
    return (
      <Wrapper>
        <LiveCode code={exampleCode} {...props} />
      </Wrapper>
    )
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={String(exampleCode).trim()}
        language={language}
        theme={{
          styles: []
        }} // reset styles, instead of using "prismTheme"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Wrapper css={prismStyle}>
            <Pre className={className} css={style}>
              {cleanTokens(tokens).map((line, i) => (
                /* eslint-disable react/jsx-key */
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Pre>
          </Wrapper>
        )}
      </Highlight>
    )
  }
}

export default CodeBlock

class LiveCode extends PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
    scope: PropTypes.object.isRequired,
    hideToolbar: PropTypes.bool,
    hideCode: PropTypes.bool,
    hidePreview: PropTypes.bool,
    showSyntax: PropTypes.bool,
    caption: PropTypes.string
  }
  static defaultProps = {
    caption: null,
    hideToolbar: false,
    hideCode: false,
    hidePreview: false,
    showSyntax: true
  }

  constructor(props) {
    super(props)
    const { hideToolbar, hideCode, hidePreview } = props
    this.state = { hideToolbar, hideCode, hidePreview }
  }

  toggleCode = () => {
    this.setState(() => ({ hideCode: !this.state.hideCode }))
  }
  togglePreview = () => {
    this.setState(() => ({ hidePreview: !this.state.hidePreview }))
  }
  toggleSyntax = () => {
    this.setState(() => ({ showSyntax: !this.state.showSyntax }))
  }

  render() {
    const { code, caption, scope, ...rest } = this.props
    const { hideToolbar, hideCode, hidePreview, showSyntax } = this.state

    const codeToUse = typeof code === 'string' ? String(code).trim() : null

    const props = Object.entries(rest).reduce((acc, [key, value]) => {
      if (
        !['hideCode', 'hidePreview', 'hideToolbar', 'showSyntax'].includes(
          key
        )
      ) {
        acc[key] = value
      }
      return acc
    }, {})

    return (
      <LiveCodeEditor>
        <LiveProvider
          mountStylesheet={false}
          css={prismStyle}
          code={codeToUse}
          scope={scope}
          {...props}
        >
          {!hidePreview && (
            <div className="example-box">
              {!hideToolbar && hideCode && (
                <Button
                  className="toggle-button"
                  on_click={this.toggleCode}
                  variant="secondary"
                  text="Code"
                  title="Toggle Code Snippet"
                  icon={`chevron-${hideCode ? 'down' : 'up'}`}
                  size="medium"
                />
              )}
              <LivePreview />
              {caption && <p className="example-caption">{caption}</p>}
            </div>
          )}
          {!hideToolbar && (
            <Toolbar>
              {hidePreview && (
                <Button
                  className="toggle-button"
                  on_click={this.togglePreview}
                  variant="secondary"
                  text="Preview"
                  title="Toggle Preview"
                  icon={`chevron-${!hidePreview ? 'down' : 'up'}`}
                  size="medium"
                />
              )}
              <Button
                className="toggle-button"
                on_click={this.toggleSyntax}
                variant="secondary"
                text="Syntax"
                title="Toggle Syntax"
                icon={`chevron-${!showSyntax ? 'down' : 'up'}`}
                size="medium"
              />
            </Toolbar>
          )}
          {!hideCode && <LiveEditor language="jsx" ignoreTabKey />}
          {!hideCode && (
            <LiveError className="dnb-form-status dnb-form-status--text dnb-form-status--error" />
          )}
          {showSyntax && (
            <Syntax>
              <Code
                source={generateElement({
                  code: `<>${codeToUse}</>`,
                  scope
                })}
              />
            </Syntax>
          )}
        </LiveProvider>
      </LiveCodeEditor>
    )
  }
}

const LiveCodeEditor = styled.div`
  position: relative;

  p.example-caption {
    margin-bottom: -1rem;
  }
  div.example-box {
    margin-bottom: 0.5rem;
  }
  pre.prism-code {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: -8px;
      left: 5vw;

      width: 0;
      height: 0;

      border-style: solid;
      border-width: 0 7px 8px 7px;
      border-color: transparent transparent #222 transparent;
    }
  }

  .dnb-form-status:last-child {
    position: absolute;
    z-index: 1;

    max-width: 40rem;
    height: auto;
    white-space: normal;
    line-height: var(--input-height);
  }
`

const Toolbar = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: flex-end;

  padding: 0 1rem 1rem;

  pointer-events: none;
  button {
    pointer-events: all;
  }
`

const Syntax = styled.div`
  margin-top: 1rem;
`

/** Removes the last token from a code example if it's empty. */
const cleanTokens = tokens => {
  const tokensLength = tokens.length
  if (tokensLength === 0) {
    return tokens
  }
  const lastToken = tokens[tokensLength - 1]
  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1)
  }
  return tokens
}
