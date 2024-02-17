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
  toSnakeCase,
} from '../../../../src/shared/component-helper'

const TS_ROOT_DIR = path.resolve(
  path.dirname(require.resolve('@dnb/eufemia/package.json')),
  'src/'
)
const MDX_ROOT_DIR = path.resolve(
  path.dirname(require.resolve('dnb-design-system-portal/package.json')),
  'src/docs/uilib'
)

/**
 * Splits a component file path in different groups,
 * we use these groups later on
 *
 * groupDir: Can be components or elements
 * componentDir: button or anchor or step-indicator
 * componentName: Button or Anchor or StepIndicator
 */
function extractPathParts({ file }) {
  const basename = path.basename(file)
  const componentName = toPascalCase(
    toSnakeCase(basename.replace(path.extname(file), ''))
  )
  const tmpComponentName = toKebabCase(componentName)
  const firstPartOfFilename = tmpComponentName.split('-')[0]
  const parts = file
    .split('/')
    .map((name) =>
      toKebabCase(path.basename(name).replace(path.extname(file), ''))
    )
  const componentDir =
    parts.find((path) =>
      new RegExp(
        `(${firstPartOfFilename}-|^${firstPartOfFilename}$)`
      ).test(path)
    ) || ''
  const index = parts.findIndex((part) => part === componentDir)
  const groupDir = parts[index - 1] || ''

  /**
   * What is the unsure situation good for?
   * we only use it for the warning method: warnAboutMissingPropTypes
   *
   * In other words, do not warn when,
   * the component dir is different from the component name
   */
  const unsureSituation =
    componentDir.split('-').length !== tmpComponentName.split('-').length

  return {
    groupDir,
    componentDir,
    componentName,
    unsureSituation,
  }
}

export async function fetchPropertiesFromDocs({
  file, // Component file
  tsDocsDir = TS_ROOT_DIR, // The dir, where the TS docs are placed
  mdxDocsDir = MDX_ROOT_DIR, // The dir, where the MDX docs are placed
  findMdxFiles = ['properties.mdx', 'events.mdx'], // type of .mdx files to look for
  findTsFiles = ['{componentName}Docs.ts'], // type of .ts files to look for
} = {}) {
  if (process.env.NODE_ENV !== 'test') {
    log.start('> PrePublish: generating docs for types')
  }

  try {
    const { groupDir, componentDir, componentName, unsureSituation } =
      extractPathParts({
        file,
      })

    const tsDocsFiles = findTsFiles
      .map((filename) => {
        filename = filename.replace('{componentName}', componentName)
        const filePath = path.resolve(
          tsDocsDir,
          groupDir,
          componentDir,
          filename
        )

        if (fs.existsSync(filePath)) {
          return filePath
        }

        // try without componentDir
        if (!fs.existsSync(file)) {
          return path.resolve(tsDocsDir, groupDir, filename)
        }
        // and try without groupDir as well
        if (!fs.existsSync(file)) {
          return path.resolve(tsDocsDir, filename)
        }
      })
      .filter(Boolean)
      .map((file) => {
        return {
          file,
        }
      })

    const mdxDocsFiles = findMdxFiles.map((filename) => {
      let file = path.resolve(mdxDocsDir, groupDir, componentDir, filename)

      // try without componentDir
      if (!fs.existsSync(file)) {
        file = path.resolve(mdxDocsDir, groupDir, filename)
      }
      // and try without groupDir as well
      if (!fs.existsSync(file)) {
        file = path.resolve(mdxDocsDir, filename)
      }

      return { file }
    })

    return await extractorFactory({
      tsDocsFiles,
      mdxDocsFiles,
      mdxDocsDir,
      componentName,
      unsureSituation,
    })
  } catch (e) {
    log.fail('Failed to load docs')
    throw new Error(e)
  }
}

async function extractorFactory({
  tsDocsFiles,
  mdxDocsFiles,
  mdxDocsDir = MDX_ROOT_DIR,
  componentName,
  unsureSituation = false,
}) {
  const collections = await asyncForEach(
    mdxDocsFiles,
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
          (tableIndex === 0 && !/\s/.test(header)) ||
          (componentName &&
            /\s/.test(header) &&
            new RegExp(`(\\s|^)${componentName}(\\s|$)`, 'g').test(header))
        ) {
          rows.forEach((row) => {
            relationalTable.push({
              header,
              propName: row[0],
              description: row[1],
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
              const dir = path.resolve(mdxDocsDir, '../')
              const filename = href
                .replace(/^\//, '')
                .replace(path.extname(href), '')
              const file = path.resolve(dir, filename + '.mdx')
              const { componentName } = extractPathParts({
                file,
              })

              if (fs.existsSync(file)) {
                const { docs: subCollections } = await extractorFactory({
                  // tsDocsFiles, // Not implemented yet
                  mdxDocsFiles: [
                    {
                      file,
                    },
                  ],
                  mdxDocsDir,
                  componentName,
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

  if (tsDocsFiles?.length > 0) {
    const tsDocs = await asyncForEach(tsDocsFiles, async ({ file }) => {
      const content = await require(file)
      const collection = Object.entries(content).reduce(
        (acc, [key, value]) => {
          if (key.includes('Properties') || key.includes('Events')) {
            acc = Object.entries(value).reduce((acc, [key, value]) => {
              if (!key.includes('[')) {
                acc[key] = value.doc
              }
              return acc
            }, {})
          }

          return acc
        },
        {}
      )

      return collection
    })

    collections.push(...tsDocs)
  }

  const docs = collections
    .filter(Boolean)
    .reduce((acc, cur) => Object.assign(acc, cur), collections)

  return {
    docs,
    componentName,
    unsureSituation,
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
