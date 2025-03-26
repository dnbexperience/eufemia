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
          'GlobalError.text': `Det er ingen side på adressen ${pathname}`,
        },
        'en-GB': {
          'GlobalError.text': `There's no a page at the address ${pathname}`,
        },
      }}
    >
      <Layout key="layout" location={location} hideSidebar>
        <GlobalError center status="404" />
      </Layout>
    </Provider>
  )
}
