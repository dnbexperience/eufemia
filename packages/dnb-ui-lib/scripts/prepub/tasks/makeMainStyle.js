/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import onceImporter from 'node-sass-once-importer'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
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
  await transformStyleModules()

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

const transformModulesContent = content =>
  content.replace(/\.scss/g, '.min.css')
const transformMainStyleContent = content =>
  content.replace(new RegExp('../../assets/', 'g'), '../assets/')

const transformStyleModules = () =>
  new Promise((resolve, reject) => {
    log.start('> PrePublish: transforming style modules')
    try {
      gulp
        .src(
          [
            './src/style/**/*.js',
            '!**/__tests__/**',
            '!**/*_not_in_use*/**/*'
          ],
          {
            cwd: process.env.ROOT_DIR
          }
        )
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(transform('utf8', transformModulesContent))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./style', { cwd: process.env.ROOT_DIR }))
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

export const runFactory = (
  src,
  { returnResult = false, importOnce = true } = {}
) =>
  new Promise((resolve, reject) => {
    log.start('> PrePublish: transforming main style')
    try {
      const stream = sass({
        importer: importOnce ? [onceImporter()] : []
      }).on('error', sass.logError)

      const cloneSink = clone.sink()

      gulp
        .src(src, {
          cwd: process.env.ROOT_DIR
        })
        .pipe(stream)
        .pipe(transform('utf8', transformMainStyleContent))
        .pipe(postcss(postcssConfig({ IE11: true })))
        .pipe(cloneSink)
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cloneSink.tap())
        .pipe(
          returnResult
            ? transform('utf8', result => resolve(result))
            : gulp.dest('./style', { cwd: process.env.ROOT_DIR })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })
