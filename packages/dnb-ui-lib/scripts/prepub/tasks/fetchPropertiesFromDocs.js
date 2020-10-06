/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { log } from '../../lib'
import { Extractor } from 'markdown-tables-to-json'

export async function fetchPropertiesFromDocs({ file } = {}) {
  log.start('> PrePublish: generating types')

  const basename = path.basename(file)
  const filename = basename.replace(path.extname(file), '')

  try {
    const parts = file
      .split('/')
      .map((fn) =>
        path.basename(fn).replace(path.extname(file), '').toLowerCase()
      )
    const index = parts.findIndex((fn) => fn === filename.toLowerCase())
    const group = parts[index - 1]
    const markdownFile = path.resolve(
      path.dirname(
        require.resolve('dnb-design-system-portal/package.json')
      ),
      `src/docs/uilib/${group}/${filename.toLowerCase()}/properties.md`
    )
    if (!(await fs.exists(markdownFile))) {
      return null
    }

    const mdContent = await fs.readFile(markdownFile, 'utf-8')

    const json = Extractor.extractObject(mdContent, 'rows') // Here we may extend with "extractAllObjects"

    const collection = {}

    for (let key in json) {
      let description = json[key]?.Properties || json[key]
      if (description) {
        description = String(description)
          .replace(/<em>\((optional|mandatory)\)<\/em> /, '')
          .replace(/<strong>([^<]*)<\/strong>/g, '"$1"')
          .replace(/<code>([^<]*)<\/code>/g, '`$1`')
        description = htmlDecode(description)

        description =
          description.charAt(0).toUpperCase() + description.slice(1)
      }

      key = key.replace(/<code>([^<]*)<\/code>/g, '$1')

      // Remove "Space" docs
      if (key.includes('<a')) {
        continue
      }

      // Duplicate if several props do have the same docs
      key = key.replace(/( or )/g, '|')
      if (key.includes('|')) {
        const keys = key.split('|')
        keys.forEach((key) => {
          collection[key] = description
        })
        continue
      }

      collection[key] = description
    }

    log.succeed(`> PrePublish: Collected docs for ${filename}`)

    return collection
  } catch (e) {
    log.fail('Failed to load docs/properties')
    throw new Error(e)
  }
}

function htmlDecode(input) {
  return input
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}
