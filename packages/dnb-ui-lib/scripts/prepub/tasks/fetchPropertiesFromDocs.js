/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { log } from '../../lib'
import { asyncForEach } from '../../tools'
import { Extractor } from 'markdown-tables-to-json'
import { toLispCase } from '../../../src/shared/component-helper'

const ROOT_DIR = path.resolve(
  path.dirname(require.resolve('dnb-design-system-portal/package.json')),
  'src/docs/uilib'
)

export async function fetchPropertiesFromDocs({
  file, // Component file
  docsDir = ROOT_DIR, // The dir, where the docs are placed
  findFiles = ['properties.md', 'events.md'], // type of .md files to look for
  includeSpecialDirs = false // special path setup
} = {}) {
  if (process.env.NODE_ENV !== 'test') {
    log.start('> PrePublish: generating docs for types')
  }

  const basename = path.basename(file)
  const filename = basename.replace(path.extname(file), '')

  try {
    const parts = file
      .split('/')
      .map((fn) =>
        toLispCase(path.basename(fn).replace(path.extname(file), ''))
      )
    const index = parts.findIndex((fn) => fn === toLispCase(filename))
    const groupDir = includeSpecialDirs ? parts[index - 1] : ''
    const componentDir = includeSpecialDirs ? toLispCase(filename) : ''

    const markdownFiles = findFiles.map((file) => {
      return path.resolve(docsDir, groupDir, componentDir, file)
    })

    return await extractorFactory(markdownFiles, docsDir)
  } catch (e) {
    log.fail('Failed to load docs')
    throw new Error(e)
  }
}

async function extractorFactory(markdownFiles, docsDir = ROOT_DIR) {
  const collections = await asyncForEach(
    markdownFiles,
    async (markdownFile) => {
      if (!fs.existsSync(markdownFile)) {
        return null
      }

      const mdContent = await fs.readFile(markdownFile, 'utf-8')

      const json = Extractor.extractObject(mdContent, 'rows') // Here we may extend with "extractAllObjects"

      const collection = {}

      for (let key in json) {
        let description

        if (json[key]?.Properties) {
          description = json[key]?.Properties
        } else if (json[key]?.Events) {
          description = json[key]?.Events
        } else if (json[key]) {
          description = json[key]
        }

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

        // Enhance props with e.g. "Space" docs/props
        if (key.includes('<a')) {
          const href = /href="([^"]+)"/g.exec(key)[1]
          if (href[0] === '/') {
            const dir = path.resolve(docsDir, '../')
            const file = path.resolve(dir, href.replace(/^\//, '') + '.md')
            if (fs.existsSync(file)) {
              const subCollections = await extractorFactory(
                [file],
                docsDir
              )

              if (
                Array.isArray(subCollections) &&
                subCollections.length > 0
              ) {
                subCollections.forEach((subCol) => {
                  Object.assign(collection, subCol)
                })
              }
            }
          }

          continue
        }

        // Duplicate if several props do have the same docs
        key = key.replace(/( or )/g, '|')
        if (key.includes('|')) {
          const keys = key.split('|')
          keys.forEach((key) => {
            if (description) {
              collection[key] = description
            }
          })
          continue
        }

        if (description) {
          collection[key] = description
        }
      }

      if (process.env.NODE_ENV !== 'test') {
        log.succeed(`> PrePublish: Collected docs for ${markdownFile}`)
      }

      return collection
    }
  )

  const docs = collections
    .filter(Boolean)
    .reduce((acc, cur) => Object.assign(acc, cur), collections)

  return docs
}

function htmlDecode(input) {
  return input
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}
