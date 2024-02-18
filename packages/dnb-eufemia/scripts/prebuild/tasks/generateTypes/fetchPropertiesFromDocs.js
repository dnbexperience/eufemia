/**
 * Prepublish Task
 *
 */

import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { log } from '../../../lib'
import { asyncForEach } from '../../../tools'
import { Extractor } from 'markdown-tables-to-json'
import {
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toCamelCase,
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
  // const index = parts.findIndex((part) => part === componentDir)
  // const groupDir = parts[index - 1] || ''
  const groupDir = 'extensions/forms/extended-features/StepsLayout'

  // /Users/tobias/dev/dnb/eufemia/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/extended-features/StepsLayout/Buttons/properties.mdx

  // /Users/tobias/dev/dnb/eufemia/packages/dnb-eufemia/src/extensions/forms/Value/SummaryList/SummaryList.tsx

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

    let destTsDocsFile = null

    const tsDocsFiles = findTsFiles
      .map((filename) => {
        filename = filename.replace('{componentName}', componentName)

        // /Users/tobias/dev/dnb/eufemia/packages/dnb-eufemia/src/extensions/forms/Form/ButtonRow/ButtonRow.tsx
        // /Users/tobias/dev/dnb/eufemia/packages/dnb-eufemia/src/extensions/forms/Form/ButtonRow/ButtonRowDocs.ts

        // console.log('groupDir', groupDir)

        // extensions/forms/extended-features/Form

        // /Users/tobias/dev/dnb/eufemia/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/extended-features/

        const filePath = path.resolve(
          tsDocsDir,
          groupDir.replace('extended-features', ''),
          componentName,
          filename
        )
        console.log('filePath', filePath)
        destTsDocsFile = filePath

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
      const file = path.resolve(
        mdxDocsDir,
        groupDir,
        componentName,
        filename
      )

      return { file }
    })

    return await extractorFactory({
      destTsDocsFile,
      tsDocsFiles,
      mdxDocsFiles,
      mdxDocsDir,
      componentName,
      componentDir,
      groupDir,
      unsureSituation,
    })
  } catch (e) {
    log.fail('Failed to load docs')
    throw new Error(e)
  }
}

async function extractorFactory({
  destTsDocsFile,
  tsDocsFiles,
  mdxDocsFiles,
  mdxDocsDir = MDX_ROOT_DIR,
  componentName,
  // componentDir,
  groupDir,
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
      const mdContent = fs.exists(file)
        ? await fs.readFile(file, 'utf-8')
        : ''

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
              type: row[1],
              description: row[2],
            })
          })
        }
      })

      await asyncForEach(
        relationalTable,
        async ({ propName, type, description }) => {
          if (type) {
            type = String(type)
              .replace(/<em>\((optional|mandatory)\)<\/em> /, '')
              .replace(/<strong>([^<]*)<\/strong>/g, '"$1"')
              .replace(/<code>([^<]*)<\/code>/g, '$1')
            type = htmlDecode(type)
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
                  if (file.includes('/space/')) {
                    collection['[Space](/uilib/layout/space/properties)'] =
                      {
                        doc: 'Spacing properties like `top` or `bottom` are supported.',
                        type: ['string', 'object'],
                        state: 'optional',
                      }
                  } else if (file.includes('/drawer-list/')) {
                    collection[
                      '[DrawerList](/uilib/components/fragments/drawer-list/properties)'
                    ] = {
                      doc: 'all DrawerList properties.',
                      type: 'Various',
                      state: 'optional',
                    }
                  } else if (file.includes('/icon/')) {
                    collection[
                      '[Icon](/uilib/components/icon/properties)'
                    ] = {
                      doc: 'all Icon properties.',
                      type: 'Various',
                      state: 'optional',
                    }
                  } else if (file.includes('/input/')) {
                    collection[
                      '[Input](/uilib/components/input/properties)'
                    ] = {
                      doc: 'all Input properties.',
                      type: 'Various',
                      state: 'optional',
                    }
                  } else {
                    // throw new Error(
                    //   `This file below has an unknown sub-collection!\n${file}\n\n`
                    // )
                  }
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
            collection[cleanedKey] = {
              doc: description,
              type,
              state: description.includes('required')
                ? 'required'
                : 'optional',
            }
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
      if (fs.existsSync(file)) {
        const content = await require(file)
        if (content) {
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
        }
      }
    })

    collections.push(...tsDocs)
  }

  if (destTsDocsFile) {
    const properties = collections[0]
    const events = collections[1]

    const propertiesName = `${toCamelCase(componentName)}Properties`
    const eventsName = `${toCamelCase(componentName)}Events`

    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const propertiesContent = properties
      ? `import { PropertiesTableProps } from "../../../../shared/types" \n\nexport const ${propertiesName}: PropertiesTableProps = ${JSON.stringify(
          Object.entries(properties).reduce((acc, [key, value]) => {
            acc[key] =
              typeof value === 'string'
                ? {
                    doc: capitalize(value),
                    type: 'unknown',
                    state: 'optional',
                  }
                : value

            return acc
          }, {}),
          null,
          2
        )}`
      : ''

    const eventsContent = events
      ? `\n\nexport const ${eventsName}: PropertiesTableProps = ${JSON.stringify(
          Object.entries(events).reduce((acc, [key, value]) => {
            acc[key] =
              typeof value === 'string'
                ? {
                    doc: capitalize(value),
                    type: 'unknown',
                    state: value.match(/_\(([^)]+)\)_/)?.[1] || 'optional',
                  }
                : value

            return acc
          }, {}),
          null,
          2
        )}`
      : ''

    const content = await prettier.format(
      [propertiesContent + eventsContent].filter(Boolean).join(''),
      {
        printWidth: 75,
        tabWidth: 2,
        singleQuote: true,
        bracketSpacing: true,
        useTabs: false,
        semi: false,
        bracketSameLine: false,
        trailingComma: 'es5',
        parser: 'typescript',
      }
    )

    if (!fs.existsSync(destTsDocsFile)) {
      if (content) {
        await fs.writeFile(destTsDocsFile, content)
      } else {
        log.fail(
          'No content generated to to write this file:' + destTsDocsFile
        )
      }
    }

    const mdxPropertiesContent = propertiesContent
      ? `---
showTabs: true
---

import PropertiesTable from 'dnb-design-system-portal/src/shared/parts/PropertiesTable'
import { ${propertiesName} } from '@dnb/eufemia/src/${groupDir.replace(
          'extended-features',
          ''
        )}/${componentName}/${componentName}Docs'

## Properties

<PropertiesTable props={${propertiesName}} />

`
      : ''

    const mdxEventsContent = eventsContent
      ? `---
showTabs: true
---

import PropertiesTable from 'dnb-design-system-portal/src/shared/parts/PropertiesTable'
import { ${eventsName} } from '@dnb/eufemia/src/${groupDir.replace(
          'extended-features',
          ''
        )}/${componentName}/${componentName}Docs'

## Events

<PropertiesTable props={${eventsName}} />

`
      : ''

    const mdxPropertiesContentImport = propertiesContent
      ? `import PropertiesTable from 'dnb-design-system-portal/src/shared/parts/PropertiesTable'
import { ${propertiesName} } from '@dnb/eufemia/src/${groupDir.replace(
          'extended-features',
          ''
        )}/${componentName}/${componentName}Docs'
<PropertiesTable props={${eventsName}} />
`
      : ''

    const mdxEventsContentImport = eventsContent
      ? `import PropertiesTable from 'dnb-design-system-portal/src/shared/parts/PropertiesTable'
import { ${eventsName} } from '@dnb/eufemia/src/${groupDir.replace(
          'extended-features',
          ''
        )}/${componentName}/${componentName}Docs'
<PropertiesTable props={${eventsName}} />
`
      : ''

    await asyncForEach(mdxDocsFiles, async ({ file }) => {
      if (file.includes('properties.mdx') && mdxPropertiesContent) {
        const existingContent = fs.exists(file)
          ? await fs.readFile(file, 'utf-8')
          : ''
        if (!existingContent.includes('PropertiesTable')) {
          const content = existingContent.replace(
            new RegExp(`---\nshowTabs: true\n---`),
            mdxPropertiesContent
          )
          await fs.writeFile(file, content)
        } else {
          const content = existingContent.replace(
            new RegExp(
              `import PropertiesTable from 'dnb-design-system-portal/src/shared/parts/PropertiesTable'`
            ),
            mdxPropertiesContentImport
          )
          await fs.writeFile(file, content)
        }
      } else if (file.includes('events.mdx') && mdxEventsContent) {
        const existingContent = fs.exists(file)
          ? await fs.readFile(file, 'utf-8')
          : ''
        if (!existingContent.includes('PropertiesTable')) {
          const content = existingContent.replace(
            new RegExp(`---\nshowTabs: true\n---`),
            mdxEventsContent
          )
          await fs.writeFile(file, content)
        } else {
          const content = existingContent.replace(
            new RegExp(
              `import PropertiesTable from 'dnb-design-system-portal/src/shared/parts/PropertiesTable'`
            ),
            mdxEventsContentImport
          )
          await fs.writeFile(file, content)
        }
      }
    })
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
