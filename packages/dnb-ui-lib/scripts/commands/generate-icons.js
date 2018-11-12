/**
 * CLI Commands
 *
 */

process.on('unhandledRejection', err => {
  throw err
})

import { convertSvgToJsx } from '../prepub/index'

const run = async () => {
  await convertSvgToJsx()
  return true
}
run()
