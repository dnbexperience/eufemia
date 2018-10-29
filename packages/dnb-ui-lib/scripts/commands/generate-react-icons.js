/**
 * CLI Commands
 *
 */

process.on('unhandledRejection', err => {
  throw err
})

import { convertSvgToJsx, copyAssets } from '../prepub/index'

const run = async () => {
  await convertSvgToJsx()
  await copyAssets()
  return true
}
run()
