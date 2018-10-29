/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import del from 'del'
import gulp from 'gulp'
import { log } from '../../lib'

export default ({ preventDelete = false } = {}) =>
  new Promise(async (resolve, reject) => {
    log.text = '> PrePublish: start copy assets'
    if (!preventDelete && (await fs.exists('./src/assets'))) {
      await del(['./assets/**', '!./assets'])
    }
    try {
      await copyAssets()
    } catch (e) {
      reject(e)
    }
    log.text = '> PrePublish: assets copy done'
    resolve()
  })

const copyAssets = () => {
  return new Promise((resolve, reject) => {
    try {
      gulp
        .src('./src/assets/**', { cwd: process.env.ROOT_DIR })
        .pipe(gulp.dest('./assets', { cwd: process.env.ROOT_DIR }))
        .on('end', resolve)
    } catch (e) {
      reject(e)
    }
  })
}
