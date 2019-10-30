/**
 * Prepublish Task
 *
 */

import path from 'path'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import rollupEach from 'gulp-rollup-each'
import rollupConfig from '../../../rollup.config'
import * as rollup from 'rollup'
import uglify from 'gulp-uglify'
import clone from 'gulp-clone'
import rename from 'gulp-rename'
import { log } from '../../lib'

export default async () => {
  log.start('> PrePublish: transforming main bundle')
  // make sure we use the 'rollup' as our enviroment variable
  // this way we use a diffrent babelrc config
  const NODE_ENV = process.env.NODE_ENV
  // process.env.NODE_ENV = 'rollup' // uses babel 6
  process.env.NODE_ENV = 'production-umd' // uses babel 7
  await transformStyleModule()
  process.env.NODE_ENV = NODE_ENV
  log.succeed(
    '> PrePublish: "makeMainUMDBundle" transforming main bundle done'
  )
}

const transformStyleModule = () =>
  new Promise((resolve, reject) => {
    const iconsPath = path.resolve('./src/icons/primary_icons.js')
    const globals = {
      [iconsPath]: 'dnbIcons',
      react: 'React',
      'react-dom': 'ReactDOM'
    }
    const cloneSink = clone.sink()
    try {
      gulp
        .src(['./src/umd/dnb-ui-lib.js'], {
          cwd: process.env.ROOT_DIR
        })
        .pipe(sourcemaps.init({ largeFile: true }))
        .pipe(
          rollupEach(
            {
              external: Object.keys(globals),
              ...rollupConfig
            },
            {
              format: 'umd',
              globals: globals
            },
            rollup
          )
        )
        .pipe(cloneSink) // clone the original
        .pipe(rename({ suffix: '.min' })) // rename
        .pipe(uglify()) // minify
        .pipe(sourcemaps.write('./')) // create sourcemaps
        .pipe(cloneSink.tap()) // get the original
        .pipe(gulp.dest('./umd', { cwd: process.env.ROOT_DIR }))
        .on('end', resolve)
        .on('error', reject)
    } catch (e) {
      reject(e)
    }
  })
