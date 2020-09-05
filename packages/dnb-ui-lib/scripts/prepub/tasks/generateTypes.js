/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import packpath from 'packpath'
import prettier from 'prettier'
import globby from 'globby'
import { asyncForEach } from '../../tools'
import { log } from '../../lib'
import { generateFromSource } from 'react-to-typescript-definitions'
import * as babel from '@babel/core'

export default async function generateTypes({
  globes = [
    './src/components/section/Section.js'
    // './src/components/**/**/*.js',
    // './src/patterns/**/**/*.js',
    // './src/fragments/**/**/*.js',
    // './src/elements/*.js'
  ]
} = {}) {
  log.start('> PrePublish: generating types')

  try {
    await asyncForEach(globes, async (globe) => {
      const files = await globby(globe)
      await createTypes(files)
    })

    log.succeed(`> PrePublish: Converting "types" is done`)
  } catch (e) {
    log.fail('Failed to run the generateTypes process')
    throw new Error(e)
  }
}

const createTypes = async (listOfAllFiles) => {
  try {
    // const srcPath = path.resolve(packpath.self(), './src')
    const prettierrc = JSON.parse(
      await fs.readFile(
        path.resolve(packpath.self(), '.prettierrc'),
        'utf-8'
      )
    )

    await asyncForEach(listOfAllFiles, async (file) => {
      const basename = path.basename(file)
      const filename = basename.replace(path.extname(file), '')
      const destFile = file.replace(path.extname(file), '.d.ts')

      if (
        /^[A-Z]/.test(basename) &&
        !file.includes('__tests__') &&
        (await fileContains(file, 'PropTypes'))
      ) {
        /**
         * 1. Why do we use babel here?
         *    Because some components uses optional-chaining,
         *    and that is not supported in Node v10.
         *
         * 2. Why do we use our own babel config?
         *    Because we do not need to convert to cjs etc.
         *
         * 3. More fun we can do?
         *    Yes, babel does export an AST -> const { code, ast } =
         *    with that we can easily extract/use interesting parts,
         *    like special comments/definition we may need to customize our generated type definitions.
         */
        const { code } = await babel.transformFileAsync(file, {
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              {
                // loose: true,
                modules: false,
                ignoreBrowserslistConfig: true,
                targets: {
                  esmodules: true
                }
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-proposal-export-default-from',
            ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-proposal-optional-chaining'
          ],
          sourceMaps: false,
          comments: true,
          ignore: ['node_modules/**']
        })

        const definitionContent = generateFromSource(
          filename,
          prepareCode(code),
          {}
        )

        const prettyDefinitionContent = prettier.format(
          definitionContent,
          {
            ...prettierrc,
            // parser: 'babel',
            filepath: destFile
          }
        )

        // console.log('\n\n--\n', file, '\n', prettyDefinitionContent)

        await fs.writeFile(destFile, prettyDefinitionContent)
      }
    })
  } catch (e) {
    throw new Error(e)
  }
}

const prepareCode = (code) => {
  /**
   * Use the React based PropTypes,
   * because "react-to-typescript-definitions" needs that.
   * Probably because of the type defintions found in there.
   */
  code = code.replace(
    /import PropTypes from 'prop-types'/g,
    `import { PropTypes } from 'react'`
  )

  return code
}

const fileContains = async (file, find) =>
  (await fs.readFile(file, 'utf-8')).includes(find)
