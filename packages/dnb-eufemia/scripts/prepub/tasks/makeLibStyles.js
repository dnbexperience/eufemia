/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import cssnano from 'gulp-cssnano'
import clone from 'gulp-clone'
import rename from 'gulp-rename'
import transform from 'gulp-transform'
import packpath from 'packpath'
import { log } from '../../lib'

// import the post css config
import postcssConfig from '../config/postcssConfig'

const ROOT_DIR = packpath.self()

export default async function makeLibStyles() {
  log.info('> PrePublish: converting sass to css')

  try {
    await runFactory('./src/components/**/style/**/dnb-*.scss')
    await runFactory('./src/extensions/**/style/**/dnb-*.scss')
    log.succeed(
      `> PrePublish: "makeLibStyles" converting sass to css done`
    )
  } catch (e) {
    throw new Error(e)
  }
}

export const runFactory = (src, { returnResult = false } = {}) =>
  new Promise((resolve, reject) => {
    log.start(`> PrePublish: converting sass to css | ${src}`)

    try {
      // do not use 'node-sass-json-importer' here! Every file needs the same core imports over and over again.
      const sassStream = sass().on('error', sass.logError)
      const cloneSink = clone.sink()
      const dest = src.replace('./src/', '').split('/**/')[0]
      const files = [src, '!**/__tests__/**', '!**/*_not_in_use*/**/*']

      let stream = gulp
        .src(files, {
          cwd: ROOT_DIR
        })
        .pipe(sassStream)
        .pipe(
          transform(
            'utf8',
            transformPaths('../../../../assets/', '../../../assets/')
          )
        )
        .pipe(postcss(postcssConfig({ IE11: true })))
        .pipe(cloneSink)
        .pipe(
          // cssnano has to run after cloneSink! So we get both a non min and a min version
          cssnano({
            reduceIdents: false
          })
        )
        .pipe(rename({ suffix: '.min' }))
        .pipe(cloneSink.tap())

      if (!returnResult) {
        stream = stream
          .pipe(
            gulp.dest(`./build/cjs/${dest}/`, {
              cwd: ROOT_DIR
            })
          )
          .pipe(gulp.dest(`./build/es/${dest}/`, { cwd: ROOT_DIR }))
          .pipe(
            gulp.dest(`./build/esm/${dest}/`, {
              cwd: ROOT_DIR
            })
          )
      }

      // so tests can test the minifyed code
      if (returnResult) {
        stream.pipe(
          cssnano({
            reduceIdents: false
          })
        )
      }

      stream
        .pipe(
          transform(
            'utf8',
            transformPaths('../../../../assets/', '../../../assets/')
          )
        )
        .pipe(
          returnResult
            ? transform('utf8', (result) => resolve(result))
            : gulp.dest(`./build/${dest}/`, {
                cwd: ROOT_DIR
              })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      console.debug('reject', e)
      reject(e)
    }
  })

const transformPaths = (from, to) => (content, file) => {
  log.info(`> PrePublish: converting sass to css | ${file.path}`)
  return content.replace(new RegExp(from, 'g'), to)
}
