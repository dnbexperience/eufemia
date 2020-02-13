/**
 * Default HTML entry file
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

// preload our default fonts
import fontRegular from 'dnb-ui-lib/assets/fonts/DNB-Regular.woff2'
import fontMedium from 'dnb-ui-lib/assets/fonts/DNB-Medium.woff2'
import fontBold from 'dnb-ui-lib/assets/fonts/DNB-Bold.woff2'
import fontMonoRegular from 'dnb-ui-lib/assets/fonts/DNBMono-Regular.woff2'

export default class HTML extends PureComponent {
  render() {
    const {
      htmlAttributes,
      bodyAttributes,
      headComponents,
      preBodyComponents,
      postBodyComponents,
      body
    } = this.props
    return (
      <html lang="en" {...htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={withPrefix('/apple-touch-icon.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={withPrefix('/favicon-32x32.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={withPrefix('/favicon-16x16.png')}
          />
          <link
            rel="mask-icon"
            href={withPrefix('/safari-pinned-tab.svg')}
            color="#007272"
          />
          <meta name="msapplication-TileColor" content="#007272" />
          <meta name="theme-color" content="#007272" />
          {[fontRegular, fontMedium, fontBold, fontMonoRegular].map(
            font => (
              <link
                key={font}
                rel="preload"
                as="font"
                type="font/woff2"
                href={font}
                crossOrigin="anonymous"
              />
            )
          )}
          {headComponents}
        </head>
        <body {...bodyAttributes}>
          {preBodyComponents}
          <noscript key="noscript" id="gatsby-noscript">
            Eufemia works best with JavaScript enabled.
          </noscript>
          <div
            key="body"
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <div id="dnb-modal-root" className="dnb-core-style" />
          {postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array.isRequired,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
  postBodyComponents: PropTypes.array.isRequired
}
HTML.defaultProps = {
  htmlAttributes: null,
  bodyAttributes: null
}
