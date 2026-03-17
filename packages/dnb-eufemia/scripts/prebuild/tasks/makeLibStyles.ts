/**
 * Prepublish Task
 *
 */

import sass from 'sass'
import fs from 'fs-extra'
import path from 'path'
import packpath from 'packpath'
import globby from 'globby'
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

export default async function makeLibStyles() {
  log.info('> PrePublish: converting sass to css')

  try {
    await runFactory('./src/components/**/style/**/dnb-*.scss')
    await runFactory('./src/extensions/**/style/**/dnb-*.scss')
    log.succeed(
      `> PrePublish: "makeLibStyles" converting sass to css done`
    )
  } catch (e) {
    // @ts-expect-error -- strictFunctionTypes
    throw new Error(e)
  }
}

type RunFactoryOptions = {
  returnResult?: boolean
  returnFiles?: boolean
}

export const runFactory = async (
  src: string,
  { returnResult = false, returnFiles = false }: RunFactoryOptions = {}
): Promise<string[] | undefined> => {
  log.start(`> PrePublish: converting sass to css | ${src}`)

  // do not use 'node-sass-json-importer' here! Every file needs the same core imports over and over again.

  const sassTransform = transformSass()
  const innerPathsTransform = transformPaths(
    '../../../../assets/',
    '../../../assets/'
  )
  const postcssTransform = transformPostcss(postcssConfig({ sass }))
  const cssnanoTransform = transformCssnano({ reduceIdents: false })

  const filePatterns = [
    src,
    '!**/__tests__/**',
    '!**/stories/**',
    '!**/*_not_in_use*/**/*',
  ]
  const matchedFiles = await globby(filePatterns, { cwd: ROOT_DIR })

  const collectedEntries: Array<{ path: string; result: string }> = []

  for (const filePath of matchedFiles) {
    const absolutePath = path.resolve(ROOT_DIR, filePath)
    const content = await fs.readFile(absolutePath, 'utf-8')

    // Transform SASS → CSS, fix asset paths
    const cssContent = sassTransform(content, { path: absolutePath })
    const cssPath = absolutePath.replace(/\.scss$/, '.css')
    const pathFixedContent = innerPathsTransform(cssContent)

    // Branch 1: base (postcss processed) + final path transform
    const baseContent = await postcssTransform(pathFixedContent, {
      path: cssPath,
    })
    const baseResult = innerPathsTransform(baseContent)
    collectedEntries.push({ path: cssPath, result: baseResult })

    // Branch 2: base minified
    const baseMinContent = await cssnanoTransform(baseContent, {
      path: cssPath,
    })
    const minPath = cssPath.replace(/\.css$/, '.min.css')
    const baseMinResult = innerPathsTransform(baseMinContent)
    collectedEntries.push({ path: minPath, result: baseMinResult })

    // Branch 3 & 4: scoped styles (if enabled)
    if (enableBuildStyleScope()) {
      const scopedPostcssTransform = transformPostcss(
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

      const scopedContent = await scopedPostcssTransform(
        pathFixedContent,
        { path: cssPath }
      )
      const scopedPath = cssPath.replace(/\.css$/, '--isolated.css')
      const scopedResult = innerPathsTransform(scopedContent)
      collectedEntries.push({ path: scopedPath, result: scopedResult })

      const scopedMinContent = await cssnanoTransform(scopedContent, {
        path: cssPath,
      })
      const scopedMinPath = cssPath.replace(/\.css$/, '--isolated.min.css')
      const scopedMinResult = innerPathsTransform(scopedMinContent)
      collectedEntries.push({
        path: scopedMinPath,
        result: scopedMinResult,
      })
    }
  }

  const sorted = collectedEntries
    .slice()
    .sort((a, b) => a.path.localeCompare(b.path))

  if (returnFiles) {
    return sorted.map((entry) => entry.path)
  }

  if (returnResult) {
    return sorted.map((entry) => entry.result)
  }

  // Write files to build directory
  for (const entry of sorted) {
    const relativePath = path.relative(
      path.resolve(ROOT_DIR, 'src'),
      entry.path
    )
    const destPath = path.resolve(ROOT_DIR, 'build', relativePath)
    await fs.outputFile(destPath, entry.result)
  }

  return undefined
}
