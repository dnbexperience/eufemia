/**
 * Inline Tag
 *
 */

import React from 'react'
import classnames from 'classnames'
import Highlight, {
  Language,
  Prism,
  defaultProps,
} from 'prism-react-renderer'
import Tag from './Tag'
import { Button } from '@dnb/eufemia/src/components'
import { makeUniqueId } from '@dnb/eufemia/src/shared/component-helper'
import { Context } from '@dnb/eufemia/src/shared'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import {
  liveCodeEditorStyle,
  toolbarStyle,
  codeBlockStyle,
  whiteBackgroundStyle,
} from './CodeBlock.module.scss'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live-ssr' // we use this temporary version of until ssr is supported https://github.com/FormidableLabs/react-live/pull/322

// this theme is replaced my a css one
import prismTheme from '@dnb/eufemia/src/style/themes/theme-ui/prism/dnb-prism-theme'
import { ContextProps } from '@dnb/eufemia/src/shared/Context'

export type CodeBlockProps = {
  scope?: Record<string, unknown>
  noInline?: boolean
  hideToolbar?: boolean
  hideCode?: boolean
  hidePreview?: boolean
  reactLive?: boolean
  language?: Language
  className?: string
  background?: 'grid' | 'white'
  children: string | React.ReactNode | (() => React.ReactNode)
  tabMode?: 'focus' | 'indentation'
  'data-visual-test'?: string
}

const CodeBlock = ({
  language,
  children: exampleCode,
  reactLive: isReactLive,
  ...props
}: CodeBlockProps) => {
  const context = React.useContext(Context)

  if (!language) {
    language = ((String(props && props.className).match(
      /language-(.*)$|\s/,
    ) || [])[1] || 'jsx') as Language
  }

  if (((props && props.scope) || isReactLive) && language === 'jsx') {
    return (
      <div
        className={classnames(
          codeBlockStyle,
          createSkeletonClass('code', context.skeleton),
        )}
      >
        <LiveCode code={exampleCode as string} {...props} />
      </div>
    )
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={exampleCode as string}
        language={language}
        theme={prismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            className={classnames(
              codeBlockStyle,
              createSkeletonClass('code', context.skeleton),
            )}
          >
            <Tag as="pre" className={className} css={style}>
              {cleanTokens(tokens).map((line, i) => (
                /* eslint-disable react/jsx-key */
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Tag>
          </div>
        )}
      </Highlight>
    )
  }
}

export default CodeBlock

type LiveCodeProps = {
  code: string
  noFragments?: boolean
} & Omit<CodeBlockProps, 'children'>

class LiveCode extends React.PureComponent<LiveCodeProps, LiveCodeProps> {
  static contextType = Context

  context!: ContextProps

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
      tabMode: 'focus',
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
      /data-visual-test|visualTestProp/.test(code) &&
      // remove test attribute only if: we run live, and are not not test
      !globalThis.IS_TEST
    ) {
      code = code.replace(/\s+data-visual-test="[^"]*"/g, '') // remove test data
      code = code.replace(/ +{\.+visualTestProp.*}\n/g, '') // remove test data
    }
    return code
  }

  render() {
    const {
      scope = {},
      noInline,
      noFragments = true,
      language = 'jsx',
      background,

      code: _code, // eslint-disable-line
      hideToolbar: _hideToolbar, // eslint-disable-line
      hideCode: _hideCode, // eslint-disable-line
      hidePreview: _hidePreview, // eslint-disable-line
      'data-visual-test': visualTest, // eslint-disable-line

      ...props
    } = this.props

    const { code, hideToolbar, hideCode, hidePreview } = this.state

    const codeToUse =
      typeof code === 'string' ? this.prepareCode(code) : ''

    if (codeToUse.trim().length === 0) {
      return <span>No Code provided</span>
    }

    return (
      <div
        className={classnames(
          liveCodeEditorStyle,
          background && whiteBackgroundStyle,
        )}
      >
        <LiveProvider
          theme={prismTheme}
          code={codeToUse}
          scope={scope}
          language={language}
          transformCode={(code: string) =>
            !noInline && noFragments ? `<>${code}</>` : code
          }
          noInline={noInline}
          {...props}
        >
          {!hidePreview && (
            <div className="example-box">
              <LivePreview
                className="dnb-live-preview"
                data-visual-test={visualTest}
              />
            </div>
          )}
          {!global.IS_TEST && !hideCode && (
            <div
              className={classnames(
                'dnb-live-editor',
                createSkeletonClass('code', this.context.skeleton),
              )}
              ref={this._editorElementRef}
            >
              <span className="dnb-sr-only">Code Editor</span>
              <LiveEditor
                prism={Prism}
                id={this._id}
                tabMode={this.state.tabMode}
                className="dnb-live-editor__editable dnb-pre"
                onChange={(code) => {
                  this.setState({ code })
                }}
                onFocus={() => {
                  if (this._editorElementRef.current) {
                    this._editorElementRef.current.classList.add(
                      'dnb-pre--focus',
                    )
                  }
                }}
                onBlur={() => {
                  if (this._editorElementRef.current) {
                    this._editorElementRef.current.classList.remove(
                      'dnb-pre--focus',
                    )
                  }
                }}
              />
            </div>
          )}

          <LiveError className="dnb-form-status dnb-form-status__text dnb-form-status--error" />

          {!global.IS_TEST && !hideToolbar && (
            <div className={classnames(toolbarStyle, 'dnb-live-toolbar')}>
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
            </div>
          )}
        </LiveProvider>
      </div>
    )
  }
}

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
