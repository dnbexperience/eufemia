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

// import the post css config
import postcssConfig from '../config/postcssConfig'

export default async () => {
  await transformStyleModules()
  await runFactory('./src/style/**/themes/*.scss', { importOnce: false })
  await runFactory('./src/style/**/dnb-ui-components.scss')
  await runFactory('./src/style/**/dnb-ui-patterns.scss')
  await runFactory('./src/style/**/dnb-ui-lib.scss')
  await runFactory('./src/style/**/dnb-ui-lib-IE11.scss', {
    IE11: true
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
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./style', { cwd: process.env.ROOT_DIR }))
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })

export const runFactory = (
  src,
  { IE11 = false, returnResult = false, importOnce = true } = {}
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
        .pipe(postcss(postcssConfig({ IE11 })))
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
