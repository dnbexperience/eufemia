/**
 * Prepublish
 *
 * This script collects all needed files
 * and transforms it to an npm ui lib ready package we can publish later
 *
 */

import {
  log,
  // convertSvgToCjs,
  // makeIconLib,
  // makeIconsUMDBundle
  // runStyleFactory,
  runThemeFactory,
  // convertSvgToJsx,
  // makeLibStyles,
  // makeMainStyle,
  // generateTypes,
  // makePropertiesFile
  // prepareTemplates
  // makeLibModules
  // makeMainUMDBundle
} from './index'

const dev = async () => {
  process.env.NODE_ENV = 'production'
  log.start('Starting dev prepublish...')
  // const preventDelete = true

  // // await convertSvgToCjs({ preventDelete })
  // await makeIconLib({ preventDelete })
  // await makeIconsUMDBundle()
  // await runStyleFactory()
  await runThemeFactory()
  // await convertSvgToJsx({ preventDelete })
  // await makeLibStyles()
  // await makeMainStyle()
  // await generateTypes()
  // await makePropertiesFile()
  // await prepareTemplates()
  // await makeLibModules()
  // await makeMainUMDBundle()

  log.succeed('Nice')
  return true
}
dev()
