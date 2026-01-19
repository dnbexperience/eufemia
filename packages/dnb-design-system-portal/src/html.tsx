/**
 * Default HTML entry file
 *
 */

import React from 'react'

// load icons
import { withPrefix } from 'gatsby' // use it like this: withPrefix('/safari-pinned-tab.svg')

// load properties
import properties from '@dnb/eufemia/src/style/themes/theme-ui/properties'
import type { ReactNode, HTMLAttributes } from 'react'

const mainColor = properties['--color-sea-green']

type HTMLProps = {
  htmlAttributes?: HTMLAttributes<HTMLHtmlElement>
  headComponents: ReactNode[]
  bodyAttributes?: HTMLAttributes<HTMLBodyElement>
  preBodyComponents: ReactNode[]
  body: string
  postBodyComponents: ReactNode[]
}

export default class HTML extends React.PureComponent<HTMLProps> {
  render() {
    const {
      htmlAttributes = null,
      bodyAttributes = null,
      headComponents,
      preBodyComponents,
      postBodyComponents,
      body,
    } = this.props

    return (
      <html lang="en" {...htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={withPrefix('/dnb/apple-touch-icon.png')}
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href={withPrefix('/dnb/favicon.ico')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={withPrefix('/dnb/favicon-32x32.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={withPrefix('/dnb/favicon-16x16.png')}
          />
          <link
            rel="mask-icon"
            href={withPrefix('/dnb/safari-pinned-tab.svg')}
            color={mainColor}
          />
          <meta name="msapplication-TileColor" content={mainColor} />
          <meta name="theme-color" content={mainColor} />
          {headComponents}
        </head>
        <body {...bodyAttributes}>
          <noscript key="noscript" id="gatsby-noscript">
            Eufemia works best with JavaScript enabled.
          </noscript>
          {preBodyComponents}
          <div
            key="body"
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {postBodyComponents}
        </body>
      </html>
    )
  }
}
