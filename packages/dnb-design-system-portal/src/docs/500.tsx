/**
 * Page not found
 *
 */

import { GlobalError } from '@dnb/eufemia/src/components'
import { usePortalHead } from '../core/PortalHead'

export default function Error500() {
  usePortalHead({ title: 'Server error', description: null })

  return <GlobalError center statusCode="500" />
}
