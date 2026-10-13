/**
 * Run only the Figma Design Tokens verification
 *
 */

import { log } from '../lib'
import { verifyTokens } from './tasks/tokensVerifier'

verifyTokens().catch((e) => {
  log.fail(e.message)
  process.exitCode = 1
})
