/**
 * Setup for the build script tests (vitest.config.scripts.ts).
 */

import type { Ora } from 'ora'
import { log } from '../../lib'

// The build tasks report progress with `ora`, which writes straight to stderr
// and so bypasses console mocks. Spies on `log` still record every call.
// ora 5 has an `isSilent` setter, but its types only list the option.
;(log as Ora & { isSilent: boolean }).isSilent = true
