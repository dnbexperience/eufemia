/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

import {
  log,
  // cleanupLib,
  // convertSvgToCjs,
  // makeIconLib,
  // makeIconsUMDBundle
  // runStyleFactory,
  // convertSvgToJsx,
  // copyAssets,
  makeLibStyles
  // makeLibModules
  // makeMainUMDBundle
} from './index'

const dev = async () => {
  process.env.NODE_ENV = 'development'
  log.start('Starting dev prepublish...')
  // const preventDelete = false

  // await cleanupLib({ preventDelete })
  // // await convertSvgToCjs({ preventDelete })
  // await makeIconLib({ preventDelete })
  // await makeIconsUMDBundle({ doRefetch: false })
  // await runStyleFactory()
  // await convertSvgToJsx({ preventDelete })
  // await copyAssets({ preventDelete })
  await makeLibStyles()
  // await makeLibModules()
  // await makeMainUMDBundle()

  log.succeed('Nice')
  return true
}
dev()
