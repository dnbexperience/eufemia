/**
 * CLI Commands
 *
 */

process.on('unhandledRejection', err => {
  throw err
})

import {
  convertSvgToJsx,
  convertSvgToCjs,
  copyAssets
} from '../prepub/index'

const run = async () => {
  await convertSvgToJsx()
  await convertSvgToCjs()
  await copyAssets()
  return true
}
run()
