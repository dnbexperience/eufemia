/**
 * Register additional Prism languages not included in prism-react-renderer's default bundle.
 *
 * The prismjs component files read from globalThis.Prism at load time.
 * ./prismSetup assigns the Prism instance to globalThis, and because
 * ES module evaluation follows import order, it runs before the
 * prismjs component imports below.
 */

import './prismSetup'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-json'
