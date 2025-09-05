/**
 * Page not found
 *
 */

import React from 'react'
import { GlobalError } from '@dnb/eufemia/src/components'
import { Provider } from '@dnb/eufemia/src/shared'
import Layout from '../shared/parts/Layout'

export default function PageNotFound({ location }) {
  const { pathname } = location

  return (
    <Provider
      translations={{
        'nb-NO': {
          GlobalError: {
            404: {
              text: `Det er ingen side på adressen: ${pathname}`,
            },
          },
        },
        'en-GB': {
          GlobalError: {
            404: {
              text: `There's no page at the address: ${pathname}`,
            },
          },
        },
        'sv-SE': {
          GlobalError: {
            404: {
              text: `Det finns ingen sida på adressen: ${pathname}`,
            },
          },
        },
        'da-DK': {
          GlobalError: {
            404: {
              text: `Det findes ingen side på adressen: ${pathname}`,
            },
          },
        },
      }}
    >
      <Layout key="layout" location={location} hideSidebar>
        <GlobalError center statusCode="404" />
      </Layout>
    </Provider>
  )
}
