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
  // makeEveryComponentStyle
  makeIconLib,
  makeIconsUMDBundle
  // runStyleFactory,
  // convertSvgToJsx,
  // copyAssets,
  // makeEveryComponentStyle,
  // makeJSLibs,
  // makeMainStyle,
  // makeLibStyles,
  // makeMainUMDBundle
} from './index'

const dev = async () => {
  process.env.NODE_ENV = 'development'
  log.start('Starting dev prepublish...')
  const preventDelete = false

  // await cleanupLib({ preventDelete })
  // // await convertSvgToCjs({ preventDelete })
  // await makeEveryComponentStyle({ preventDelete })
  await makeIconLib({ preventDelete })
  await makeIconsUMDBundle({ doRefetch: false })
  // await runStyleFactory()
  // await convertSvgToJsx({ preventDelete })
  // await copyAssets({ preventDelete })
  // await makeEveryComponentStyle()
  // await makeMainStyle()
  // await makeLibStyles()
  //
  // await makeJSLibs()
  // await makeMainUMDBundle()

  log.succeed('Nice')
  return true
}
dev()
