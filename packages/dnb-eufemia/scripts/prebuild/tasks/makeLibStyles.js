/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import sass from 'sass'
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

export const runFactory = (
  src,
  { returnResult = false, returnFiles = false } = {}
) =>
  new Promise((resolve, reject) => {
    log.start(`> PrePublish: converting sass to css | ${src}`)

    try {
      // do not use 'node-sass-json-importer' here! Every file needs the same core imports over and over again.
      const cloneSink = clone.sink()
      const dest = src.replace('./src/', '').split('/**/')[0]
      const files = [
        src,
        '!**/__tests__/**',
        '!**/stories/**',
        '!**/*_not_in_use*/**/*',
      ]

      const stream = gulp
        .src(files, {
          cwd: ROOT_DIR,
        })
        .pipe(transform('utf8', transformSass()))
        .pipe(
          rename({
            extname: '.css',
          })
        )
        .pipe(
          transform(
            'utf8',
            transformPaths('../../../../assets/', '../../../assets/')
          )
        )
        .pipe(transform('utf8', transformPostcss(postcssConfig({ sass }))))
        .pipe(cloneSink)
        .pipe(transform('utf8', transformCssnano({ reduceIdents: false })))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cloneSink.tap())

      if (!returnResult && !returnFiles) {
        stream.pipe(
          gulp.dest(`./build/${dest}/`, {
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
          transform(
            'utf8',
            transformPaths('../../../../assets/', '../../../assets/')
          )
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
