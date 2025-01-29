/**
 * Default HTML entry file
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

// load icons
import { withPrefix } from 'gatsby' // use it like this: withPrefix('/safari-pinned-tab.svg')
// import appleTouchIcon from '@dnb/eufemia/assets/browser/dnb/apple-touch-icon.png'
// import favicon32 from '@dnb/eufemia/assets/browser/dnb/favicon-32x32.png'
// import favicon16 from '@dnb/eufemia/assets/browser/dnb/favicon-16x16.png'
// import safariPinnedTab from '@dnb/eufemia/assets/browser/dnb/safari-pinned-tab.svg'

// load properties
import properties from '@dnb/eufemia/src/style/themes/theme-ui/properties'
const mainColor = properties['--color-sea-green']

export default class HTML extends React.PureComponent {
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
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
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
            // href={safariPinnedTab}
            href={withPrefix('/dnb/safari-pinned-tab.svg')}
            color={mainColor}
          />
          <meta name="msapplication-TileColor" content={mainColor} />
          <meta name="theme-color" content={mainColor} />
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
  postBodyComponents: PropTypes.array.isRequired,
}
