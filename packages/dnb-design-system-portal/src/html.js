/**
 * Default HTML entry file
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// preload our default fonts
import fontRegular from 'dnb-ui-lib/assets/fonts/DNB-Regular.woff2'
import fontMedium from 'dnb-ui-lib/assets/fonts/DNB-Medium.woff2'
import fontBold from 'dnb-ui-lib/assets/fonts/DNB-Bold.woff2'

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
          {[fontRegular, fontMedium, fontBold].map(font => (
            <link
              key={font}
              rel="preload"
              as="font"
              type="font/woff2"
              href={font}
              crossOrigin="anonymous"
            />
          ))}
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
