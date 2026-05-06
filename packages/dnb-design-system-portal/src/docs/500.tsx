/**
 * Page not found
 *
 */

import { GlobalError } from '@dnb/eufemia/src/components'

export default function Error500() {
  return <GlobalError center statusCode="500" />
}
