/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import nodePath from 'path'
import globby from 'globby'
import { asyncForEach } from '../../tools'
import { log } from '../../lib'

import { fetchPropertiesFromDocs } from './generateTypes/fetchPropertiesFromDocs'

export default async function generateTypes({
  paths = [
    // './src/*.js',
    './src/extensions/forms/**/*.tsx',
    '!**/__tests__',
    '!**/stories',
    '!./src/esm/',
    '!./src/cjs/',
    '!./src/umd/',
    '!./src/style/',
  ],
} = {}) {
  if (process.env.NODE_ENV !== 'test') {
    log.start('> PrePublish: generating types')
  }

  try {
    const files = await globby(paths)
    await createTypes(files)

    log.succeed(`> PrePublish: Converting "types" is done`)
  } catch (e) {
    log.fail('Failed to run the generateTypes process')
    throw new Error(e)
  }
}

export const createTypes = async (
  listOfAllFiles,
  { isTest = false, ...opts } = {}
) => {
  try {
    const prettierrc = await fs.readJSON(
      nodePath.resolve('./.prettierrc'),
      'utf-8'
    )

    // "prettier.format" does not handle "overwrites", so we merge it manually
    prettierrc.overrides.forEach(({ files, options }) => {
      if (new RegExp(`.${files}`).test('file.d.ts')) {
        for (const key in options) {
          prettierrc[key] = options[key]
        }
      }
    })

    return await asyncForEach(listOfAllFiles, async (file) => {
      if (!isTest && file.includes('__tests__')) {
        return // stop here
      }

      const basename = nodePath.basename(file)

      if (file.includes('/forms/') && /^[A-Z]/.test(basename)) {
        await fetchPropertiesFromDocs({
          file,
          ...opts,
        })
      }
    })
  } catch (e) {
    throw new Error(e)
  }
}
