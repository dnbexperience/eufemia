/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

import { GlobalError } from '@dnb/eufemia/src'

export const GlobalError404Example = () => (
  <ComponentBox data-visual-test="global-error-404">
    <GlobalError status="404" />
  </ComponentBox>
)

export const GlobalError500Example = () => (
  <ComponentBox data-visual-test="global-error-500">
    <GlobalError status="500" />
  </ComponentBox>
)

export const GlobalErrorCustomStatusExample = () => (
  <ComponentBox data-visual-test="global-error-custom">
    {() => {
      const links = [
        { text: 'Forside', url: 'https://www.dnb.no/' },
        { text: 'Forsikring', url: 'https://www.dnb.no/forsikring/' },
        { text: 'Sparing', url: 'https://www.dnb.no/sparing/' },
        { text: 'Lån', url: 'https://www.dnb.no/lan/' },
        {
          text: 'Kontakt',
          url: 'https://www.dnb.no/hjelp-og-veiledning/',
        },
      ]
      return (
        <GlobalError
          status="403"
          title="Access Denied"
          text="More related text"
          links={links}
        >
          Additional Content
        </GlobalError>
      )
    }}
  </ComponentBox>
)
