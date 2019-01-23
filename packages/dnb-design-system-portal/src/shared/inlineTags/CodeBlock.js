/**
 * Inline Tag
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Highlight, { defaultProps } from 'prism-react-renderer'
import dnbTheme from './themes/dnb-prism-theme'
import { Button } from 'dnb-ui-lib/src'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live-replacement'
import Pre from './Pre'

const prismStyle = css(dnbTheme)

const CodeBlock = ({
  language = 'jsx',
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
    return <LiveCode code={exampleCode} {...props} />
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={String(exampleCode).trim()}
        language={language}
        theme={{ styles: [] }} /* reset styles*/
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div css={prismStyle}>
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
          </div>
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
    hideCode: PropTypes.bool,
    hidePreview: PropTypes.bool,
    caption: PropTypes.string
  }
  static defaultProps = {
    caption: null,
    hideCode: false,
    hidePreview: false
  }

  constructor(props) {
    super(props)
    const { hideCode, hidePreview } = props
    this.state = { hideCode, hidePreview }
  }

  toggleCode = () => {
    this.setState(() => ({ hideCode: !this.state.hideCode }))
  }
  togglePreview = () => {
    this.setState(() => ({ hidePreview: !this.state.hidePreview }))
  }

  render() {
    const { code, caption, scope } = this.props
    const { hideCode, hidePreview } = this.state

    return (
      <LiveCodeEditor>
        <LiveProvider
          mountStylesheet={false}
          css={prismStyle}
          code={typeof code === 'string' ? String(code).trim() : null}
          scope={scope}
          // onError={e => {
          //   console.log('error', e)
          // }}
        >
          {!hidePreview && (
            <>
              <div className="example-box">
                {this.props.hideCode && (
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
            </>
          )}
          <Toolbar>
            {!hideCode && (
              <LiveError className="dnb-form-status dnb-form-status--text dnb-form-status--error" />
            )}
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
          </Toolbar>
          {!hideCode && <LiveEditor language="jsx" />}
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
`

const Toolbar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: flex-end;

  padding: 0 1rem 1rem;
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
