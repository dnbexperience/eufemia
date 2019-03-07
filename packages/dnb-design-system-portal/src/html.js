/**
 * Default HTML entry file
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// preload our default fonts
import FedraSansStdBook from 'dnb-ui-lib/assets/fonts/FedraSansStd-Book.woff2'
import FedraSansStdDemi from 'dnb-ui-lib/assets/fonts/FedraSansStd-Demi.woff2'
import FedraSansStdMedium from 'dnb-ui-lib/assets/fonts/FedraSansStd-Medium.woff2'

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
          <meta name="robots" content="noindex" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes"
          />
          {[FedraSansStdBook, FedraSansStdDemi, FedraSansStdMedium].map(
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
          <div
            key="body"
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <div id="dnb-modal-root" />
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
