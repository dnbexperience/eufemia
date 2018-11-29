/**
 * Inline Tag
 *
 */

import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import prismTheme from 'prism-react-renderer/themes/nightOwl'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

import Pre from './Pre'

/* eslint-disable react/jsx-key */
const CodeBlock = ({
  language,
  children: exampleCode,
  reactLive: isReactLive,
  className
}) => {
  if (!language)
    language = ((className || '').split(/-/) || [null, 'jsx'])[1]

  if (isReactLive && language === 'jsx') {
    return (
      <LiveProvider
        code={
          typeof exampleCode === 'string'
            ? String(exampleCode).trim()
            : null
        }
        // transformCode={
        //   typeof exampleCode === 'function' ? exampleCode : null
        // }
      >
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
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
          <Pre className={className} css={style}>
            {cleanTokens(tokens).map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
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
