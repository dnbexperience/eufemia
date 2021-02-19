/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { log } from '../../../lib'
import { asyncForEach } from '../../../tools'
import { Extractor } from 'markdown-tables-to-json'
import {
  toKebabCase,
  toPascalCase,
  toSnakeCase
} from '../../../../src/shared/component-helper'

const ROOT_DIR = path.resolve(
  path.dirname(require.resolve('dnb-design-system-portal/package.json')),
  'src/docs/uilib'
)

function extractPathParts({
  file,
  findFiles = [],
  includeSpecialDirs = true
}) {
  findFiles.forEach((part) => {
    file = file.replace(part, '').replace(/\/$/, '')
  })

  const basename = path.basename(file)
  const componentName = toPascalCase(
    toSnakeCase(basename.replace(path.extname(file), ''))
  )
  const filename = toKebabCase(componentName)
  const firstPartOfFilename = filename.split('-')[0]

  const parts = file
    .split('/')
    .map((name) =>
      toKebabCase(path.basename(name).replace(path.extname(file), ''))
    )
  const index = parts.findIndex((name) => name === firstPartOfFilename)
  const groupDir = includeSpecialDirs ? parts[index - 1] || '' : ''
  const componentDir = includeSpecialDirs ? firstPartOfFilename : ''
  const unsureSituation = filename.includes('-')

  return { componentName, groupDir, componentDir, unsureSituation }
}

export async function fetchPropertiesFromDocs({
  file, // Component file
  docsDir = ROOT_DIR, // The dir, where the docs are placed
  findFiles = ['properties.md', 'events.md'], // type of .md files to look for
  includeSpecialDirs = false // special path setup
} = {}) {
  if (process.env.NODE_ENV !== 'test') {
    log.start('> PrePublish: generating docs for types')
  }

  try {
    const {
      componentName,
      groupDir,
      componentDir,
      unsureSituation
    } = extractPathParts({
      file,
      findFiles,
      includeSpecialDirs
    })

    const markdownFiles = findFiles.map((filename) => {
      return {
        file: path.resolve(docsDir, groupDir, componentDir, filename)
      }
    })

    return await extractorFactory({
      markdownFiles,
      docsDir,
      findFiles,
      componentName,
      unsureSituation
    })
  } catch (e) {
    log.fail('Failed to load docs')
    throw new Error(e)
  }
}

async function extractorFactory({
  markdownFiles,
  docsDir = ROOT_DIR,
  findFiles,
  componentName,
  unsureSituation = false
}) {
  const collections = await asyncForEach(
    markdownFiles,
    async ({ file }) => {
      if (!fs.existsSync(file)) {
        return null
      }

      const collection = {}
      const relationalTable = []
      const mdContent = await fs.readFile(file, 'utf-8')

      const allTables = Extractor.extractAllTables(mdContent, 'rows')

      allTables.forEach((rows, tableIndex) => {
        const headerRow = rows.shift()
        const header = headerRow[0].trim()

        // In case the first column header contains the component name, we use that one
        if (
          tableIndex === 0 ||
          (componentName &&
            / /.test(header) &&
            new RegExp(`(\\s|^)${componentName}(\\s|$)`, 'g').test(header))
        ) {
          rows.forEach((row) => {
            relationalTable.push({
              header,
              propName: row[0],
              description: row[1]
            })
          })
        }
      })

      await asyncForEach(
        relationalTable,
        async ({ propName, description }) => {
          if (description) {
            description = String(description)
              .replace(/<em>\((optional|mandatory)\)<\/em> /, '')
              .replace(/<strong>([^<]*)<\/strong>/g, '"$1"')
              .replace(/<code>([^<]*)<\/code>/g, '`$1`')
            description = htmlDecode(description)

            description =
              description.charAt(0).toUpperCase() + description.slice(1)
          }

          propName = propName.replace(/<code>([^<]*)<\/code>/g, '$1')

          // Enhance props with e.g. "Space" docs/props
          if (propName.includes('<a')) {
            const href = /href="([^"]+)"/g.exec(propName)[1]
            if (href[0] === '/') {
              const dir = path.resolve(docsDir, '../')
              const filename = href
                .replace(/^\//, '')
                .replace(path.extname(href), '')
              const file = path.resolve(dir, filename + '.md')
              const { componentName } = extractPathParts({
                file,
                findFiles
              })

              if (fs.existsSync(file)) {
                const { docs: subCollections } = await extractorFactory({
                  markdownFiles: [
                    {
                      file
                    }
                  ],
                  docsDir,
                  componentName,
                  findFiles
                })

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

            return // skip here
          }

          // Remove deprecated props
          if (propName.includes('<del')) {
            return // skip here
          }

          let cleanedKey = propName.replace(
            /<[^<]*>([^<]*)<\/[^<]*>/g,
            '$1'
          ) // removes e.g. <strong> defined as **

          // Drop empty types
          if (cleanedKey.trim() === '') {
            log.fail(
              `This file below has an empty prop-type entry!\n${file}\n\n`
            )
            return // skip here
          }

          // Duplicate if several props do have the same docs
          cleanedKey = cleanedKey.replace(/( or )/g, '|')
          if (cleanedKey.includes('|')) {
            const keys = cleanedKey.split('|')
            keys.forEach((key) => {
              if (description) {
                collection[key] = description
              }
            })

            return // skip here
          }

          if (description) {
            collection[cleanedKey] = description
          }
        }
      )

      if (process.env.NODE_ENV !== 'test') {
        log.succeed(`> PrePublish: Collected docs for ${file}`)
      }

      return collection
    }
  )

  const docs = collections
    .filter(Boolean)
    .reduce((acc, cur) => Object.assign(acc, cur), collections)

  return { docs, componentName, unsureSituation }
}

function htmlDecode(input) {
  return input
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}
