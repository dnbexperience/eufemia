/**
 * Page not found
 *
 */

import React from 'react'
import { GlobalError } from '@dnb/eufemia/src/components'

export default function Error500() {
  return (
    <GlobalError
      center
      status="500"
      title="Sorry, we got a technical issue!"
      text="The service is not working properly at the moment. Please try again later."
    />
  )
}
