/**
 * Prepublish Task
 *
 */

import gulp from 'gulp'
import sass from 'gulp-sass'
import postcss from 'postcss'
import onceImporter from 'node-sass-once-importer'
import cssnano from 'cssnano'
import clone from 'gulp-clone'
import rename from 'gulp-rename'
import transform from 'gulp-transform'
import { log } from '../../lib'
import globby from 'globby'
import { asyncForEach } from '../../tools/index'
import packpath from 'packpath'

// import the post css config
import postcssConfig from '../config/postcssConfig'

const ROOT_DIR = packpath.self()

export default async function makeMainStyle() {
  // info: use this aproach to process files because:
  // this way we avoid cross "includePaths" and the result is:
  // Now a custom theme can overwrite existing CSS Custom Properties
  const listWithThemesToProcess = await globby(
    './src/style/themes/theme-*/dnb-theme-*.scss'
  )
  await asyncForEach(listWithThemesToProcess, async (themeFile) => {
    // in order to keep the foder structure, we have to add these asteix
    themeFile = themeFile.replace('/style/themes/', '/style/**/themes/')
    await runFactory(themeFile, {
      importOnce: false,
    })
  })

  const listWithPackagesToProcess = await globby(
    './src/style/dnb-ui-*.scss'
  )
  await asyncForEach(listWithPackagesToProcess, async (packageFile) => {
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
  new Promise((resolve, reject) => {
    log.start('> PrePublish: transforming main style')
    try {
      const sassStream = sass({
        importer: importOnce ? [onceImporter()] : [],
      }).on('error', sass.logError)

      const cloneSink = clone.sink()

      let stream = gulp
        .src(src, {
          cwd: ROOT_DIR,
        })
        .pipe(sassStream)
        .pipe(
          transform(
            'utf8',
            transformPostcss(postcssConfig({ IE11: true }))
          )
        )
        .pipe(cloneSink)
        .pipe(transform('utf8', transformCssnano({ reduceIdents: false })))
        // .pipe(
        //   // cssnano has to run after cloneSink! So we get both a non min and a min version
        //   cssnano({
        //     reduceIdents: false,
        //   })
        // )
        .pipe(rename({ suffix: '.min' }))
        .pipe(cloneSink.tap())

      if (!returnResult) {
        stream = stream
          .pipe(
            gulp.dest('./build/cjs/style', {
              cwd: ROOT_DIR,
            })
          )
          .pipe(gulp.dest('./build/es/style', { cwd: ROOT_DIR }))
          .pipe(
            gulp.dest('./build/esm/style', {
              cwd: ROOT_DIR,
            })
          )
      }

      // so tests can test the minified code
      if (returnResult) {
        stream.pipe(
          transform('utf8', transformCssnano({ reduceIdents: false }))
          // cssnano({
          //   reduceIdents: false,
          // })
        )
      }

      stream
        .pipe(
          transform('utf8', transformPaths('../../assets/', '../assets/'))
        )
        .pipe(
          returnResult
            ? transform('utf8', (result) => resolve(result))
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

const transformPaths = (from, to) => (content) =>
  content.replace(new RegExp(from, 'g'), to)

const transformPostcss = (config) => async (content, file) => {
  log.info(`> PrePublish: postcss process | ${file.path}`)

  return (
    await postcss(config).process(content, {
      from: file.path,
    })
  ).toString()
}

const transformCssnano = (config) => async (content, file) => {
  log.info(`> PrePublish: cssnano process | ${file.path}`)

  return (
    await postcss([
      cssnano({
        preset: 'default',
        ...config,
      }),
    ]).process(content, {
      from: file.path,
    })
  ).toString()
}
