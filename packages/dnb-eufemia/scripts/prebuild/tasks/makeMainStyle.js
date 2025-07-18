/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import sass from 'sass'
import clone from 'gulp-clone'
import rename from 'gulp-rename'
import transform from 'gulp-transform'
import { log } from '../../lib'
import globby from 'globby'
import { asyncForEach } from '../../tools/index'
import packpath from 'packpath'
import {
  transformSass,
  transformPaths,
  transformPostcss,
  transformCssnano,
} from './transformUtils'
import postcssIsolatePlugin from '../../../src/plugins/postcss-isolated-style-scope'
import postcssFontUrlRewritePlugin from '../../../src/plugins/postcss-font-url-rewrite'
import { enableBuildStyleScope } from '../../../src/plugins/postcss-isolated-style-scope/config'
import { getFontBasePath } from '../../../src/plugins/postcss-font-url-rewrite/config'

// import the post css config
import postcssConfig from '../config/postcssConfig'

const ROOT_DIR = packpath.self()

export default async function makeMainStyle() {
  // info: use this approach to process files because:
  // this way we avoid cross "includePaths" and the result is:
  // Now a custom theme can overwrite existing CSS Custom Properties
  const listWithThemesToProcess = await globby(
    './src/style/themes/theme-*/*-theme-*.scss'
  )
  await asyncForEach(listWithThemesToProcess, async (themeFile) => {
    // in order to keep the folder structure, we have to add these asterisks
    themeFile = themeFile.replace('/style/themes/', '/style/**/themes/')
    await runFactory(themeFile)
  })

  const listWithPackagesToProcess = await globby(
    './src/style/**/*-ui-*.scss'
  )
  await asyncForEach(listWithPackagesToProcess, async (packageFile) => {
    // in order to keep the folder structure, we have to add these asterisks
    packageFile = packageFile.replace('/style/', '/style/**/')
    await runFactory(packageFile)
  })

  log.succeed(
    '> PrePublish: "makeMainStyle" transforming style modules done'
  )
}

export const runFactory = (
  src,
  { returnResult = false, returnFiles = false } = {}
) =>
  new Promise((resolve, reject) => {
    log.start('> PrePublish: transforming main style')

    try {
      const cloneMin = clone.sink()
      const cloneScope = clone.sink()

      const stream = gulp
        .src(src, {
          cwd: ROOT_DIR,
        })
        .pipe(transform('utf8', transformSass()))
        .pipe(
          rename({
            extname: '.css',
          })
        )
        .pipe(cloneScope)
        .pipe(transform('utf8', transformPostcss(postcssConfig({ sass }))))
        .pipe(cloneMin)
        .pipe(transform('utf8', transformCssnano({ reduceIdents: false })))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cloneMin.tap())

      // Create a second bundle with scoped styles
      if (enableBuildStyleScope()) {
        cloneScope
          .tap()
          .pipe(
            transform(
              'utf8',
              transformPostcss(
                postcssConfig(
                  { sass },
                  {
                    plugins: [
                      postcssIsolatePlugin({
                        verbose: true,
                      }),
                      postcssFontUrlRewritePlugin({
                        basePath: getFontBasePath(),
                        verbose: true,
                      }),
                    ],
                  }
                )
              )
            )
          )
          .pipe(rename({ suffix: '--isolated' }))
          .pipe(cloneMin)
          .pipe(
            transform('utf8', transformCssnano({ reduceIdents: false }))
          )
          .pipe(rename({ suffix: '.min' }))
          .pipe(cloneMin.tap())
      }

      if (!returnResult && !returnFiles) {
        stream.pipe(
          gulp.dest('./build/style', {
            cwd: ROOT_DIR,
          })
        )
      }

      // so tests can test the minified code
      if (returnResult) {
        stream.pipe(
          transform('utf8', transformCssnano({ reduceIdents: false }))
        )
      }

      const collectedFiles = []
      const collectedResults = []

      stream
        .pipe(
          transform('utf8', transformPaths('../../assets/', '../assets/'))
        )
        .pipe(
          returnResult || returnFiles
            ? transform('utf8', (result, file) => {
                if (returnFiles) {
                  collectedFiles.push(file.path)
                  resolve(collectedFiles)
                } else if (returnResult) {
                  collectedResults.push(result)
                  resolve(collectedResults)
                }
                return result
              })
            : gulp.dest('./build/style', {
                cwd: ROOT_DIR,
              })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })
