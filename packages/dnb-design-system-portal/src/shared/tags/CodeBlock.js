/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styled from '@emotion/styled'
import Highlight, { Prism, defaultProps } from 'prism-react-renderer'
import ReactMarkdown from 'react-markdown'
import Tag from './Tag'
import renderers from './index'
import Code from '../parts/uilib/Code'
import { Button } from '@dnb/eufemia/src/components'
import { P } from '@dnb/eufemia/src/elements'
import { makeUniqueId } from '@dnb/eufemia/src/shared/component-helper'
import { Context } from '@dnb/eufemia/src/shared'
import AutoLinkHeader from './AutoLinkHeader'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'

import {
  generateElement,
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

// this theme is replaced my a css one
import prismTheme from '@dnb/eufemia/src/style/themes/theme-ui/prism/dnb-prism-theme'

const Wrapper = styled.div`
  margin-bottom: 2rem;
  textarea {
    outline: inherit;
  }
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
        theme={prismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Wrapper>
            <Tag is="pre" className={className} css={style}>
              {cleanTokens(tokens).map((line, i) => (
                /* eslint-disable react/jsx-key */
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Tag>
          </Wrapper>
        )}
      </Highlight>
    )
  }
}

export default CodeBlock

class LiveCode extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    code: PropTypes.string.isRequired,
    scope: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    caption: PropTypes.string,
    useRender: PropTypes.bool,
    noFragments: PropTypes.bool,
    addToSearchIndex: PropTypes.func,
    hideToolbar: PropTypes.bool,
    hideCode: PropTypes.bool,
    hidePreview: PropTypes.bool,
    showSyntax: PropTypes.bool,
    hideSyntaxButton: PropTypes.bool,
    language: PropTypes.string
  }

  static defaultProps = {
    scope: {},
    title: null,
    description: null,
    caption: null,
    useRender: false,
    noFragments: true,
    addToSearchIndex: null,
    hideToolbar: false,
    hideCode: false,
    hidePreview: false,
    showSyntax: false,
    hideSyntaxButton: null,
    language: 'jsx'
  }

  constructor(props) {
    super(props)
    const {
      code,
      hideToolbar,
      hideCode,
      hidePreview,
      showSyntax,
      useRender,
      hideSyntaxButton
    } = props

    this.state = {
      code,
      hideToolbar,
      hideCode,
      hidePreview,
      showSyntax,
      hideSyntaxButton:
        hideSyntaxButton === null ? useRender : hideSyntaxButton
    }

    this._refEditor = React.createRef()
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

  prepareCode(code) {
    code = String(code).trim()
    if (
      /data-visual-test/.test(code) &&
      // remove test attribute only if: we run live, and are not not test
      typeof window !== 'undefined' &&
      !window.IS_TEST
    ) {
      code = code.replace(/\s+data-visual-test="[^"]*"/g, '') // remove test data
    }
    // code = code.replace(/^\s*$(?:\r\n?|\n)/gm, '') // remove empty lines
    return code
  }

  render() {
    const {
      title,
      description,
      caption,
      scope,
      useRender,
      noFragments,
      language,
      addToSearchIndex,

      code: _code, // eslint-disable-line
      hideToolbar: _hideToolbar, // eslint-disable-line
      hideCode: _hideCode, // eslint-disable-line
      hidePreview: _hidePreview, // eslint-disable-line
      showSyntax: _showSyntax, // eslint-disable-line
      hideSyntaxButton: _hideSyntaxButton, // eslint-disable-line
      'data-visual-test': visualTest, // eslint-disable-line

      ...props
    } = this.props

    const {
      code,
      hideToolbar,
      hideCode,
      hidePreview,
      showSyntax,
      hideSyntaxButton
    } = this.state

    const codeToUse =
      typeof code === 'string' ? this.prepareCode(code) : null

    if (codeToUse.trim().length === 0) {
      return <span>No Code provided</span>
    }

    const id = makeUniqueId()

    // Add the html attribute, only so we can run it locally during dev
    if (global.IS_TEST && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-visual-test', true)
    }

    return (
      <LiveCodeEditor>
        <LiveProvider
          Prism={Prism}
          theme={prismTheme}
          code={codeToUse}
          scope={scope}
          transformCode={(code) =>
            !useRender && noFragments ? `<>${code}</>` : code
          }
          noInline={useRender}
          {...props}
        >
          {!hidePreview && (
            <>
              {title && (
                <AutoLinkHeader
                  level={3}
                  // is="h3"
                  useSlug={visualTest}
                  title={title}
                  addToSearchIndex={addToSearchIndex}
                >
                  <ReactMarkdown
                    source={title}
                    escapeHtml={false}
                    renderers={{
                      ...renderers,
                      paragraph: ({ children }) => children
                    }}
                  />
                </AutoLinkHeader>
              )}
              {description && (
                <ReactMarkdown
                  source={description}
                  escapeHtml={false}
                  renderers={{
                    ...renderers,
                    paragraph: ({ children }) => <P>{children}</P>
                  }}
                />
              )}

              <div className="example-box">
                <LivePreview
                  className="dnb-live-preview"
                  data-visual-test={visualTest}
                />
                {!global.IS_TEST && caption && (
                  <ReactMarkdown
                    source={caption}
                    escapeHtml={false}
                    renderers={renderers}
                    className="example-caption"
                  />
                )}
              </div>
            </>
          )}
          {!global.IS_TEST && !hideCode && (
            <div
              className={classnames(
                'dnb-pre',
                'dnb-live-editor',
                createSkeletonClass('code', this.context.skeleton)
              )}
              ref={this._refEditor}
            >
              <label className="dnb-sr-only" htmlFor={id}>
                Code Editor
              </label>
              <LiveEditor
                textareaId={id}
                ignoreTabKey
                padding={0}
                style={{
                  font: 'inherit'
                }}
                onChange={(code) => {
                  this.setState({ code })
                }}
                onFocus={() => {
                  if (this._refEditor.current) {
                    this._refEditor.current.classList.add('dnb-pre--focus')
                  }
                }}
                onBlur={() => {
                  if (this._refEditor.current) {
                    this._refEditor.current.classList.remove(
                      'dnb-pre--focus'
                    )
                  }
                }}
                // make this wrap to get in the custom Prism
                // This way we can reformat jsx css template-string
                // language={language}
                highlight={(code) => (
                  <Highlight
                    Prism={Prism}
                    code={code}
                    theme={prismTheme}
                    language={language}
                  >
                    {({ tokens, getLineProps, getTokenProps }) => (
                      <>
                        {tokens.map((line, i) => (
                          <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        ))}
                      </>
                    )}
                  </Highlight>
                )}
              />
            </div>
          )}
          {!hideCode && (
            <LiveError className="dnb-form-status dnb-form-status__text dnb-form-status--error" />
          )}
          {!global.IS_TEST && !hideToolbar && (
            <Toolbar className="dnb-live-toolbar">
              {!hideCode && !hideSyntaxButton && (
                <Button
                  className="toggle-button"
                  on_click={this.toggleSyntax}
                  variant="secondary"
                  text="Syntax"
                  title="Toggle Syntax"
                  icon={`arrow-${!showSyntax ? 'down' : 'up'}`}
                  size="medium"
                />
              )}
              {this.props.hideCode && (
                <Button
                  className="toggle-button"
                  on_click={this.toggleCode}
                  variant="secondary"
                  text="Code"
                  title="Toggle Code Snippet"
                  icon={`arrow-${hideCode ? 'down' : 'up'}`}
                  size="medium"
                />
              )}
              {this.props.hidePreview && (
                <Button
                  className="toggle-button"
                  on_click={this.togglePreview}
                  variant="secondary"
                  text="Preview"
                  title="Toggle Preview"
                  icon={`arrow-${!hidePreview ? 'down' : 'up'}`}
                  size="medium"
                />
              )}
            </Toolbar>
          )}
          {!global.IS_TEST && showSyntax && (
            <Syntax>
              <Code
                source={generateElement({
                  code:
                    !useRender && noFragments
                      ? `<>${codeToUse}</>`
                      : codeToUse,
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

  .example-box {
    margin-bottom: 0;
  }
  .example-caption {
    margin-bottom: 1.5rem;
  }
  .dnb-live-editor {
    position: relative;
    margin-bottom: 4rem;

    &::after {
      content: '';
      position: absolute;
      top: calc(-0.5rem + 1px);
      left: 45%;

      width: 0;
      height: 0;

      border-style: solid;
      border-width: 0 0.4375rem 0.5rem;
      border-color: transparent transparent #222 transparent;

      opacity: 1;
      transition: opacity 0.2s ease-out, border-width 0.2s ease-out;
    }

    &.dnb-pre--focus {
      &::after {
        opacity: 0;
        border-top-width: 0.5rem;
      }
    }
  }

  .react-live-error:last-child {
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
const cleanTokens = (tokens) => {
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

Prism.languages.insertBefore('jsx', 'template-string', {
  'styled-template-string': {
    pattern: /(styled(\.\w+|\([^)]*\))(\.\w+(\([^)]*\))*)*|css|injectGlobal|keyframes|css={)`(?:\$\{[^}]+\}|\\\\|\\?[^\\])*?`/,
    lookbehind: true,
    greedy: true,
    inside: {
      interpolation: {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.jsx
        }
      },
      string: {
        pattern: /[^$;]+/,
        inside: Prism.languages.css,
        alias: 'language-css'
      }
    }
  }
})
