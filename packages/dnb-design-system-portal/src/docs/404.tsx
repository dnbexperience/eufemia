/**
 * Page not found
 *
 */

import { useLocation } from 'react-router'
import { GlobalError } from '@dnb/eufemia/src/components'
import { Provider } from '@dnb/eufemia/src/shared'
import Layout from '../shared/parts/Layout'
import { usePortalHead } from '../core/PortalHead'

export default function PageNotFound() {
  const location = useLocation()
  const { pathname } = location

  usePortalHead({ title: 'Page not found', description: null })

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
      <Layout
        key="layout"
        location={location as unknown as Location}
        hideSidebar
      >
        <GlobalError center statusCode="404" />
      </Layout>
    </Provider>
  )
}
