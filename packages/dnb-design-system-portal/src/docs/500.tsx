/**
 * Page not found
 *
 */

import React from 'react'
import { GlobalError } from '@dnb/eufemia/src/components'

export default function Error500() {
  return <GlobalError center status="500" />
}
