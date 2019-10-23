/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import onceImporter from 'node-sass-once-importer'
import cssnano from 'gulp-cssnano'
import clone from 'gulp-clone'
import rename from 'gulp-rename'
import transform from 'gulp-transform'
import { log } from '../../lib'
import globby from 'globby'
import { asyncForEach } from '../../tools/index'

// import the post css config
import postcssConfig from '../config/postcssConfig'

export default async () => {
  // info: use this aproach to process files because:
  // this way we avoid cross "includePaths" and the result is:
  // Now a custom theme can overwrite existing CSS Custom Properties
  const listWithThemesToProcess = await globby(
    './src/style/themes/theme-*/dnb-theme-*.scss'
  )
  await asyncForEach(listWithThemesToProcess, async themeFile => {
    // in order to keep the foder structure, we have to add these asteix
    themeFile = themeFile.replace('/style/themes/', '/style/**/themes/')
    await runFactory(themeFile, {
      importOnce: false
    })
  })

  const listWithPackagesToProcess = await globby(
    './src/style/dnb-ui-*.scss'
  )
  await asyncForEach(listWithPackagesToProcess, async packageFile => {
    // in order to keep the foder structure, we have to add these asteix
    packageFile = packageFile.replace('/style/', '/style/**/')
    await runFactory(packageFile)
  })

  log.succeed(
    '> PrePublish: "makeMainStyle" transforming style modules done'
  )
}

export const runFactory = (
  src,
  { returnResult = false, importOnce = true } = {}
) =>
  new Promise(async (resolve, reject) => {
    log.start('> PrePublish: transforming main style')
    try {
      const sassStream = sass({
        importer: importOnce ? [onceImporter()] : []
      }).on('error', sass.logError)

      const cloneSink = clone.sink()

      let stream = gulp
        .src(src, {
          cwd: process.env.ROOT_DIR
        })
        .pipe(sassStream)
        .pipe(postcss(postcssConfig({ IE11: true })))
        .pipe(cloneSink)
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cloneSink.tap())

      if (!returnResult) {
        stream = stream
          .pipe(
            gulp.dest('./build/cjs/style', {
              cwd: process.env.ROOT_DIR
            })
          )
          .pipe(
            gulp.dest('./build/es/style', { cwd: process.env.ROOT_DIR })
          )
          .pipe(
            gulp.dest('./build/esm/style', {
              cwd: process.env.ROOT_DIR
            })
          )
      }

      stream
        .pipe(
          transform('utf8', transformPaths('../../assets/', '../assets/'))
        )
        .pipe(
          returnResult
            ? transform('utf8', result => resolve(result))
            : gulp.dest('./build/style', {
                cwd: process.env.ROOT_DIR
              })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

const transformPaths = (from, to) => content =>
  content.replace(new RegExp(from, 'g'), to)
