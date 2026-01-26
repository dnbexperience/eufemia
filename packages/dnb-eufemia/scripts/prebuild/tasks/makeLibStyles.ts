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
import { PassThrough, finished } from 'stream'
import { log } from '../../lib'
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

const mergeStreams = (...streams: Array<NodeJS.ReadWriteStream>) => {
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

type RunFactoryOptions = {
  returnResult?: boolean
  returnFiles?: boolean
}

export const runFactory = (
  src: string,
  { returnResult = false, returnFiles = false }: RunFactoryOptions = {}
) =>
  new Promise<string[] | undefined>((resolve, reject) => {
    log.start(`> PrePublish: converting sass to css | ${src}`)

    try {
      // do not use 'node-sass-json-importer' here! Every file needs the same core imports over and over again.

      const dest = src.replace('./src/', '').split('/**/')[0]
      const files = [
        src,
        '!**/__tests__/**',
        '!**/stories/**',
        '!**/*_not_in_use*/**/*',
      ]

      const source = gulp
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
                        verbose: false,
                      }),
                      postcssFontUrlRewritePlugin({
                        basePath: getFontBasePath(),
                        verbose: false,
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
          transform(
            'utf8',
            transformPaths('../../../../assets/', '../../../assets/')
          )
        )
        .pipe(
          returnResult || returnFiles
            ? transform('utf8', (result, file) => {
                collectedEntries.push({ path: file.path, result })
                return result
              })
            : gulp.dest(`./build/${dest}/`, {
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
          resolve(undefined)
        })
        .on('error', reject)

      if (returnResult || returnFiles) {
        collector.on('data', () => {})
      }
    } catch (e) {
      console.debug('reject', e)
      reject(e)
    }
  })
