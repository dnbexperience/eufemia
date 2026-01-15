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
import { PassThrough, finished } from 'stream'
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

const mergeStreams = (...streams) => {
  const output = new PassThrough({ objectMode: true })
  let remaining = streams.length

  if (remaining === 0) {
    output.end()
    return output
  }

  streams.forEach((stream) => {
    stream.on('error', (error) => output.emit('error', error))
    stream.pipe(output, { end: false })
    finished(stream, (error) => {
      if (error) {
        output.emit('error', error)
        return
      }
      remaining -= 1
      if (remaining === 0) {
        output.end()
      }
    })
  })

  return output
}

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
      const source = gulp
        .src(src, {
          cwd: ROOT_DIR,
        })
        .pipe(transform('utf8', transformSass()))
        .pipe(
          rename({
            extname: '.css',
          })
        )

      const base = source
        .pipe(clone())
        .pipe(transform('utf8', transformPostcss(postcssConfig({ sass }))))

      const baseMin = base
        .pipe(clone())
        .pipe(transform('utf8', transformCssnano({ reduceIdents: false })))
        .pipe(rename({ suffix: '.min' }))

      const streams = [base, baseMin]

      // Create a second bundle with scoped styles
      if (enableBuildStyleScope()) {
        const scoped = source
          .pipe(clone())
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

        const scopedMin = scoped
          .pipe(clone())
          .pipe(
            transform('utf8', transformCssnano({ reduceIdents: false }))
          )
          .pipe(rename({ suffix: '.min' }))

        streams.push(scoped, scopedMin)
      }

      const stream = mergeStreams(...streams)

      const collectedFiles = []
      const collectedResults = []
      const collectedEntries = []

      const collector = stream
        .pipe(
          transform('utf8', transformPaths('../../assets/', '../assets/'))
        )
        .pipe(
          returnResult || returnFiles
            ? transform('utf8', (result, file) => {
                collectedEntries.push({ path: file.path, result })
                return result
              })
            : gulp.dest('./build/style', {
                cwd: ROOT_DIR,
              })
        )
        .on('end', () => {
          if (returnResult || returnFiles) {
            const sorted = collectedEntries
              .slice()
              .sort((a, b) => a.path.localeCompare(b.path))
            if (returnFiles) {
              collectedFiles.push(...sorted.map((entry) => entry.path))
              resolve(collectedFiles)
            } else if (returnResult) {
              collectedResults.push(...sorted.map((entry) => entry.result))
              resolve(collectedResults)
            }
            return
          }
          resolve()
        })
        .on('error', reject)

      if (returnResult || returnFiles) {
        collector.on('data', () => {})
      }
    } catch (e) {
      reject(e)
    }
  })
