/**
 * Page not found
 *
 */

import React from 'react'
import { GlobalError } from '@dnb/eufemia/src/components'
import Layout from '../shared/parts/Layout'

export default function PageNotFound({ location }) {
  const { pathname } = location

  return (
    <Layout key="layout" location={location} hideSidebar>
      <GlobalError
        center
        status="404"
        title="We couldn't find that page!"
        text={
          <>
            There's not a page at <code>{pathname}</code>
          </>
        }
      />
    </Layout>
  )
}
