/**
 * Inline Tag
 *
 */

import React from 'react'
import { css } from '@emotion/core'
import Highlight, { defaultProps } from 'prism-react-renderer'
import dnbTheme from './themes/dnb-prism-theme'
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
    const { caption, hideCode, hideExample, ...restProps } = props
    return (
      <LiveProvider
        mountStylesheet={false}
        css={prismStyle}
        code={
          typeof exampleCode === 'string'
            ? String(exampleCode).trim()
            : null
        }
        {...restProps}
      >
        {!hideExample && (
          <div className="example-box">
            <LivePreview />
          </div>
        )}
        {caption && <p className="example-caption">{caption}</p>}
        {!hideCode && <LiveEditor language="jsx" />}
        {!hideCode && <LiveError />}
      </LiveProvider>
    )
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
