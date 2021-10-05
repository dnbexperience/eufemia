/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import clone from 'gulp-clone'
import rename from 'gulp-rename'
import transform from 'gulp-transform'
import packpath from 'packpath'
import { log } from '../../lib'
import {
  transformSass,
  transformPaths,
  transformPostcss,
  transformCssnano,
} from './transformUtils'

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
      const cloneSink = clone.sink()
      const dest = src.replace('./src/', '').split('/**/')[0]
      const files = [src, '!**/__tests__/**', '!**/*_not_in_use*/**/*']

      let stream = gulp
        .src(files, {
          cwd: ROOT_DIR,
        })
        .pipe(transform('utf8', transformSass()))
        .pipe(
          transform(
            'utf8',
            transformPaths('../../../../assets/', '../../../assets/')
          )
        )
        .pipe(
          transform(
            'utf8',
            transformPostcss(postcssConfig({ IE11: true }))
          )
        )
        .pipe(cloneSink)
      transform('utf8', transformCssnano({ reduceIdents: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cloneSink.tap())

      if (!returnResult) {
        stream = stream
          .pipe(
            gulp.dest(`./build/cjs/${dest}/`, {
              cwd: ROOT_DIR,
            })
          )
          .pipe(gulp.dest(`./build/es/${dest}/`, { cwd: ROOT_DIR }))
          .pipe(
            gulp.dest(`./build/esm/${dest}/`, {
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
                cwd: ROOT_DIR,
              })
        )
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      console.debug('reject', e)
      reject(e)
    }
  })
