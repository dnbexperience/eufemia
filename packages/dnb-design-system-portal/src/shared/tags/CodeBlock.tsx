/**
 * Inline Tag
 *
 */

import React from 'react'
import classnames from 'classnames'
import styled from '@emotion/styled'
import Highlight, { Prism, defaultProps } from 'prism-react-renderer'
import ReactMarkdown from 'react-markdown'
import Tag from './Tag'
import components from './index'
import { Button } from '@dnb/eufemia/src/components'
import { P } from '@dnb/eufemia/src/elements'
import { makeUniqueId } from '@dnb/eufemia/src/shared/component-helper'
import { Context } from '@dnb/eufemia/src/shared'
import AutoLinkHeader from './AutoLinkHeader'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live-ssr' // we use this temporary version of until ssr is supported https://github.com/FormidableLabs/react-live/pull/322

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
  const context = React.useContext(Context)

  if (!language) {
    language =
      (String(props && props.className).match(/language-(.*)$|\s/) ||
        [])[1] || 'jsx'
  }

  if (((props && props.scope) || isReactLive) && language === 'jsx') {
    return (
      <Wrapper className={createSkeletonClass('code', context.skeleton)}>
        <LiveCode code={exampleCode} {...props} />
      </Wrapper>
    )
  } else {
    return (
      // @ts-ignore
      <Highlight
        {...defaultProps}
        code={String(exampleCode).trim()}
        language={language}
        theme={prismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Wrapper
            className={createSkeletonClass('code', context.skeleton)}
          >
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

type LiveCodeProps = {
  code: string
  scope?: Record<string, unknown>
  title?: string
  description?: string
  caption?: string
  useRender?: boolean
  noFragments?: boolean
  addToSearchIndex?: () => void
  hideToolbar?: boolean
  hideCode?: boolean
  hidePreview?: boolean
  language?: string
  'data-visual-test'?: string
}

type LiveCodeDefaultState = LiveCodeProps & {
  language?: string
}

class LiveCode extends React.PureComponent<
  LiveCodeProps,
  LiveCodeDefaultState
> {
  static contextType = Context

  _editorElementRef: React.RefObject<HTMLDivElement> = null
  _id: string = null

  constructor(props: LiveCodeProps) {
    super(props)
    const { code, hideToolbar, hideCode, hidePreview } = props

    this.state = {
      code,
      hideToolbar,
      hideCode,
      hidePreview,
    }

    this._editorElementRef = React.createRef()
    this._id = makeUniqueId()
  }

  toggleCode = () => {
    this.setState(() => ({ hideCode: !this.state.hideCode }))
  }
  togglePreview = () => {
    this.setState(() => ({ hidePreview: !this.state.hidePreview }))
  }

  componentDidUpdate(prevProps) {
    if (this.props.code !== prevProps.code) {
      this.setState({
        code: this.prepareCode(this.props.code),
      })
    }
  }

  prepareCode(code: string) {
    code = String(code).trim()
    if (
      /data-visual-test/.test(code) &&
      // remove test attribute only if: we run live, and are not not test
      !globalThis.IS_TEST
    ) {
      code = code.replace(/\s+data-visual-test="[^"]*"/g, '') // remove test data
    }
    return code
  }

  render() {
    const {
      title,
      description,
      caption,
      scope = {},
      useRender,
      noFragments = true,
      language = 'jsx',
      addToSearchIndex,

      code: _code, // eslint-disable-line
      hideToolbar: _hideToolbar, // eslint-disable-line
      hideCode: _hideCode, // eslint-disable-line
      hidePreview: _hidePreview, // eslint-disable-line
      'data-visual-test': visualTest, // eslint-disable-line

      ...props
    } = this.props

    const { code, hideToolbar, hideCode, hidePreview } = this.state

    const codeToUse =
      typeof code === 'string' ? this.prepareCode(code) : null

    if (codeToUse.trim().length === 0) {
      return <span>No Code provided</span>
    }

    return (
      <LiveCodeEditor>
        <LiveProvider
          Prism={Prism}
          theme={prismTheme}
          code={codeToUse}
          scope={scope}
          language={language}
          transformCode={(code: string) =>
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
                  useSlug={visualTest}
                  title={title}
                  addToSearchIndex={addToSearchIndex}
                >
                  <ReactMarkdown
                    // eslint-disable-next-line react/no-children-prop
                    children={title}
                    components={
                      {
                        ...components,
                        paragraph: ({ children }) => children,
                      } as Record<string, React.ReactNode>
                    }
                  />
                </AutoLinkHeader>
              )}
              {description && (
                <ReactMarkdown
                  // eslint-disable-next-line react/no-children-prop
                  children={description}
                  components={
                    {
                      ...components,
                      paragraph: ({ children }) => <P>{children}</P>,
                    } as Record<string, React.ReactNode>
                  }
                />
              )}

              <div className="example-box">
                <LivePreview
                  className="dnb-live-preview"
                  data-visual-test={visualTest}
                />
                {!global.IS_TEST && caption && (
                  <ReactMarkdown
                    // eslint-disable-next-line react/no-children-prop
                    children={caption}
                    components={
                      components as Record<string, React.ReactNode>
                    }
                    className="example-caption"
                  />
                )}
              </div>
            </>
          )}
          {!global.IS_TEST && !hideCode && (
            <div
              className={classnames(
                'dnb-live-editor',
                createSkeletonClass('code', this.context.skeleton)
              )}
              ref={this._editorElementRef}
            >
              <label className="dnb-sr-only" htmlFor={this._id}>
                Code Editor
              </label>
              <LiveEditor
                id={this._id}
                className="dnb-live-editor__editable dnb-pre"
                onChange={(code) => {
                  this.setState({ code })
                }}
                onFocus={() => {
                  if (this._editorElementRef.current) {
                    this._editorElementRef.current.classList.add(
                      'dnb-pre--focus'
                    )
                  }
                }}
                onBlur={() => {
                  if (this._editorElementRef.current) {
                    this._editorElementRef.current.classList.remove(
                      'dnb-pre--focus'
                    )
                  }
                }}
              />
            </div>
          )}
          {!hideCode && (
            <LiveError className="dnb-form-status dnb-form-status__text dnb-form-status--error" />
          )}
          {!global.IS_TEST && !hideToolbar && (
            <Toolbar className="dnb-live-toolbar">
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
    cursor: text;

    transition: box-shadow 0.2s ease-out;

    &::after {
      content: '';
      position: absolute;
      top: calc(-0.75rem + 1px);
      left: 1rem;

      width: 0;
      height: 0;

      border-style: solid;
      border-width: 0 0.75rem 0.75rem;
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

  .prism-code {
    padding: 0 !important; /* use important because of inline styles */
    white-space: pre-wrap !important; /* use important because of inline styles */
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

// @ts-ignore
Prism.languages.insertBefore('jsx', 'template-string', {
  'styled-template-string': {
    pattern:
      /(styled(\.\w+|\([^)]*\))(\.\w+(\([^)]*\))*)*|css|injectGlobal|keyframes|css={)`(?:\$\{[^}]+\}|\\\\|\\?[^\\])*?`/,
    lookbehind: true,
    greedy: true,
    inside: {
      interpolation: {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation',
          },
          rest: Prism.languages.jsx,
        },
      },
      string: {
        pattern: /[^$;]+/,
        inside: Prism.languages.css,
        alias: 'language-css',
      },
    },
  },
})
