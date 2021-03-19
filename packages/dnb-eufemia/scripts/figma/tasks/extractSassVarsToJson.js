/**
 * Figma Task
 *
 */

import path from 'path'
import fs from 'fs-extra'
import { parse as parseSass } from 'sass-variable-parser'
import packpath from 'packpath'

const ROOT_DIR = packpath.self()

export const extractSassVars = async ({
  file,
  imports = ['./style/components/imports'],
  replaceCallback = null,
  parserOpts = {}
}) => {
  const filePath = path.resolve(__dirname, '../../../', file)
  let scssContent = await fs.readFile(filePath)

  if (typeof replaceCallback === 'function')
    scssContent = replaceCallback(scssContent)

  imports = imports.map((importStr) => `@import '${importStr}';\n`)
  const vars = parseSass(
    `
      ${imports}
      ${scssContent}
    `,
    {
      camelCase: false,
      cwd: path.resolve(__dirname, '../../../src'),
      indented: false,
      ...parserOpts
    }
  )
  // we only reset the cwd, as this looks like bug in sass-variable-parser
  parseSass('', {
    cwd: ROOT_DIR
  })

  return Promise.resolve(vars)
}
