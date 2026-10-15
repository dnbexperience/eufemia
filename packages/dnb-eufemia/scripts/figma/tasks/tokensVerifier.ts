/**
 * Checks that the Figma exports the themes are generated from exist and
 * can be converted to CSS. Exports that no theme uses are ignored.
 */

import fs from 'fs-extra'
import path from 'path'
import { log } from '../../lib'
import {
  DESIGN_TOKEN_FILES,
  FOUNDATION_TOKEN_FILES,
  validateTokenExport,
} from '../../prebuild/tasks/makePropertiesFile'

export const verifyTokens = async ({
  rootDir = path.resolve(__dirname, '../../..'),
}: {
  rootDir?: string
} = {}) => {
  log.start('> Figma: Verifying the design token exports')

  const problems = new Set<string>()

  for (const file of [...DESIGN_TOKEN_FILES, ...FOUNDATION_TOKEN_FILES]) {
    const filePath = path.resolve(rootDir, file.in)

    if (!(await fs.pathExists(filePath))) {
      problems.add(
        `${file.in} is missing. The Figma collection or mode it is exported from was not found.`
      )
      continue
    }

    try {
      validateTokenExport(
        JSON.parse(await fs.readFile(filePath, 'utf-8')),
        file
      )
    } catch (e) {
      problems.add(`${file.in} (${file.theme}): ${(e as Error).message}`)
    }
  }

  if (problems.size > 0) {
    throw new Error(
      `The design token exports are not as expected:\n${Array.from(
        problems,
        (problem) => `- ${problem}`
      ).join('\n')}`
    )
  }

  log.succeed('> Figma: The design token exports are as expected')
}
