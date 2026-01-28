/**
 * Inline Tag
 *
 */

import React from 'react'
import clsx from 'clsx'
import { Highlight, Prism } from 'prism-react-renderer'
import Tag from './Tag'
import { Button, Space } from '@dnb/eufemia/src/components'
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

export type CodeSectionProps = {
  scope?: Record<string, unknown>
  noInline?: boolean
  hideToolbar?: boolean
  hideCode?: boolean
  hidePreview?: boolean
  reactLive?: boolean
  language?: string
  className?: string
  background?: 'grid' | 'white'
  omitWrapper?: boolean
  children: string | React.ReactNode | (() => React.ReactNode)
  tabMode?: 'focus' | 'indentation'
  'data-visual-test'?: string
}

const CodeBlock = ({
  language,
  children: exampleCode,
  reactLive: isReactLive,
  ...props
}: CodeSectionProps) => {
  const context = React.useContext(Context)

  if (!language) {
    language = ((String(props && props.className).match(
      /language-(.*)$|\s/
    ) || [])[1] || 'jsx') as string
  }

  if (((props && props.scope) || isReactLive) && language === 'jsx') {
    return (
      <div
        className={clsx(
          codeBlockStyle,
          createSkeletonClass('code', context.skeleton)
        )}
      >
        <LiveCode code={exampleCode as string} {...props} />
      </div>
    )
  } else {
    return (
      <Highlight
        code={exampleCode as string}
        language={language}
        theme={prismTheme}
        prism={Prism}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            className={clsx(
              codeBlockStyle,
              createSkeletonClass('code', context.skeleton)
            )}
          >
            <Tag as="pre" className={className} css={style}>
              {cleanTokens(tokens).map((line, i) => {
                const { key, ...lineProps } = getLineProps({
                  line,
                  key: i,
                })
                return (
                  <div key={String(key)} {...lineProps}>
                    {line.map((token, tokenKey) => {
                      const { key: tokenKeyProp, ...tokenProps } =
                        getTokenProps({ token, key: tokenKey })
                      return (
                        <span key={String(tokenKeyProp)} {...tokenProps} />
                      )
                    })}
                  </div>
                )
              })}
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
} & Omit<CodeSectionProps, 'children'>

function prepareCode(code: string) {
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

function LiveCode(props: LiveCodeProps) {
  const context = React.useContext(Context)
  const editorElementRef = React.useRef<HTMLDivElement>(null)
  const idRef = React.useRef(makeUniqueId())

  const [state, setState] = React.useState(() => {
    const { hideToolbar, hideCode, hidePreview } = props
    return {
      hideToolbar,
      hideCode,
      hidePreview,
      tabMode: 'focus' as const,
    }
  })

  const toggleCode = () => {
    setState((prev) => ({ ...prev, hideCode: !prev.hideCode }))
  }

  const togglePreview = () => {
    setState((prev) => ({ ...prev, hidePreview: !prev.hidePreview }))
  }

  const {
    scope = {},
    noInline,
    noFragments = true,
    language = 'jsx',
    background,
    omitWrapper,

    code: _code, // eslint-disable-line
    hideToolbar: _hideToolbar, // eslint-disable-line
    hideCode: _hideCode, // eslint-disable-line
    hidePreview: _hidePreview, // eslint-disable-line
    omitWrapper: _omitWrapper, // eslint-disable-line
    'data-visual-test': visualTest, // eslint-disable-line

    ...restProps
  } = props

  const { hideToolbar, hideCode, hidePreview } = state

  const codeToUse = React.useMemo(() => {
    const code =
      typeof props.code === 'string' ? prepareCode(props.code) : ''

    if (code.trim().length === 0) {
      return 'No Code provided'
    }

    return code
  }, [props.code])

  return (
    <div
      className={clsx(
        liveCodeEditorStyle,
        background && whiteBackgroundStyle
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
        {...restProps}
      >
        {!hidePreview &&
          (omitWrapper ? (
            <LivePreview
              className="dnb-live-preview"
              data-visual-test={visualTest}
            />
          ) : (
            <div className="example-box">
              <LivePreview
                className="dnb-live-preview"
                data-visual-test={visualTest}
              />
            </div>
          ))}
        {!global.IS_TEST && !hideCode && (
          <Space
            className={clsx(
              'dnb-live-editor',
              createSkeletonClass('code', context.skeleton)
            )}
            top={omitWrapper}
            innerRef={editorElementRef}
          >
            <span className="dnb-sr-only">Code Editor</span>
            <LiveEditor
              prism={Prism}
              id={idRef.current}
              tabMode={state.tabMode}
              className="dnb-live-editor__editable dnb-pre"
              onFocus={() => {
                if (editorElementRef.current) {
                  editorElementRef.current.classList.add('dnb-pre--focus')
                }
              }}
              onBlur={() => {
                if (editorElementRef.current) {
                  editorElementRef.current.classList.remove(
                    'dnb-pre--focus'
                  )
                }
              }}
            />
          </Space>
        )}

        <LiveError className="dnb-form-status dnb-form-status__text dnb-form-status--error" />

        {!global.IS_TEST && !hideToolbar && (
          <Space
            className={clsx(toolbarStyle, 'dnb-live-toolbar')}
            style={{
              bottom: omitWrapper ? '-3.5rem' : 0,
            }}
          >
            {props.hideCode && (
              <Button
                className="toggle-button"
                onClick={toggleCode}
                variant="secondary"
                text="Code"
                title="Toggle Code Snippet"
                icon={`arrow-${hideCode ? 'down' : 'up'}`}
                size="medium"
              />
            )}
            {props.hidePreview && (
              <Button
                className="toggle-button"
                onClick={togglePreview}
                variant="secondary"
                text="Preview"
                title="Toggle Preview"
                icon={`arrow-${!hidePreview ? 'down' : 'up'}`}
                size="medium"
              />
            )}
          </Space>
        )}
      </LiveProvider>
    </div>
  )
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
