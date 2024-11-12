/**
 * Figma Task handlers
 *
 */

import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { optimize, loadConfig } from 'svgo' // eslint-disable-line
import { asyncForEach } from '../../tools'
import { ERROR_HARMLESS } from '../../lib/error'
import { log, ErrorHandler } from '../../lib'
import {
  getFigmaUrlByImageIds,
  streamToDisk,
  getFigmaDoc,
  findNode,
  findAllNodes,
  saveToFile,
  md5,
} from '../helpers/docHelpers'
import properties from '../../../src/style/themes/theme-ui/properties'
import { create, extract } from 'tar'
import { runCommand } from '../../tools/cliTools'

export const ICON_SIZES = {
  16: { suffix: '' },
  24: { suffix: 'medium' },
}
export const NAME_SEPARATOR = '_'

const iconPrimaryList = process.env.FIGMA_ICONS_PRIMARY_LIST || [
  'chevron_left',
  'chevron_right',
  'chevron_down',
  'chevron_up',
  'arrow_left',
  'arrow_right',
  'arrow_down',
  'arrow_up',
  'bell',
  'add',
  'subtract',
  'exclamation',
  'information',
  'download',
  'check',
  'close',
  'reset',
  'more',
  'save',
  'loupe', // was "search" before
  'question',
  'calendar',
]

type IconsConfig = {
  assetsDir?: string
}

export function IconsConfig(overwrite: IconsConfig = {}) {
  if (overwrite?.assetsDir && /^\//.test(overwrite.assetsDir)) {
    log.fail(
      ErrorHandler('assetsDir should not start with a slash (/dir)')
    )
  }

  const iconRenameList = (process.env.FIGMA_ICONS_RENAME_LIST ||
    []) as Array<{ from: string; to: string }>
  const iconCloneList = process.env.FIGMA_ICONS_CLONE_LIST || []
  const canvasNameSelector = /^Icons$/ // before we have used: ^[0-9]+[_\- ]Icons$
  const frameNameSelector = /^Icons$/ // before we have used: [A-z]+ - [0-9]{1,2}
  const iconSelector = process.env.FIGMA_ICONS_SELECTOR || null
  const iconNameCleaner = process.env.FIGMA_ICONS_NAME_SPLIT || /\/(.*)/
  const imageUrlExpireAfterDays =
    process.env.FIGMA_ICONS_URL_EXPIRES_AFTER || 30
  const destDir = path.resolve(
    __dirname,
    '../../../assets/icons',
    overwrite?.assetsDir || ''
  )
  const iconsLockFile = path.resolve(
    __dirname,
    '../../../src/icons',
    overwrite?.assetsDir || '',
    'icons-svg.lock'
  )

  return {
    canvasNameSelector,
    frameNameSelector,
    iconsLockFile,
    iconPrimaryList,
    iconRenameList,
    iconCloneList,
    iconSelector,
    iconNameCleaner,
    imageUrlExpireAfterDays,
    destDir,
    ...overwrite,
  }
}

const prettierrc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc'), 'utf-8')
)

export const extractIcons = async ({
  figmaFile = null,
  figmaDoc = null,
  assetsDir = 'dnb',
  forceReconvert = false,
  ...rest
}) => {
  try {
    if (!figmaDoc) {
      figmaDoc = await getFigmaDoc({
        figmaFile,
        preventUpdate: forceReconvert,
      })
    }

    // juice out, if no changes
    if (!figmaDoc) return []

    const { iconsLockFile, iconRenameList, destDir } = IconsConfig({
      assetsDir,
    })

    log.start(
      '> Figma: started to fetch SVGs icons by using frameIconsFactory'
    )

    const { listOfProcessedFiles, listWithNewFiles } =
      await collectIconsFromFigmaDoc({
        figmaFile,
        figmaDoc,
        assetsDir,
        format: 'svg',
        forceReconvert,
        ...rest,
      })

    log.info(
      `> Figma: finished fetching SVGs icons by using frameIconsFactory. Processed ${listOfProcessedFiles.length} files along with ${listWithNewFiles.length} new files.`
    )

    if (listWithNewFiles.length > 0) {
      await optimizeSVGIcons({ destDir, listWithFiles: listWithNewFiles })

      // Android support
      await createXMLTarBundles({
        destDir,
        listOfProcessedFiles,
      })
    }

    if (!forceReconvert) {
      await saveIconsLockFile({
        file: iconsLockFile,
        data: listOfProcessedFiles.reduce((acc, { iconFile, ...cur }) => {
          acc[iconFile] = cur
          return acc
        }, {}),
        assetsDir,
      })

      await makeMetaFile({
        listOfProcessedFiles,
        figmaDoc,
        iconRenameList,
        assetsDir,
      })
    }

    return listOfProcessedFiles
  } catch (e) {
    log.fail(ErrorHandler('extractIcons failed', e))
  }
}

async function collectIconsFromFigmaDoc({
  figmaDoc,
  figmaFile,
  assetsDir,
  forceReconvert = false,
  ...rest
}) {
  const { frameNameSelector, destDir } = IconsConfig({ assetsDir })

  const canvasDoc = getIconCanvasDoc({ figmaDoc })
  const framesInTheCanvas = findAllNodes(canvasDoc, {
    type: 'FRAME',
  })

  const controlStorageLists = []
  const listWithNewFiles = []
  const listOfProcessedFiles = await asyncForEach(
    framesInTheCanvas,
    async (frameDoc) => {
      // Skip names starting with a dot
      if (
        /^\./.test(frameDoc.name) ||
        !frameNameSelector.test(frameDoc.name)
      ) {
        return // stop here
      }

      const { files, newFiles } = await frameIconsFactory({
        frameDoc,
        figmaFile,
        destDir,
        ...IconsConfig({ assetsDir }),
        ...rest,
      })

      controlStorageLists.push(files)
      listWithNewFiles.push(...newFiles)

      return files
    }
  )

  runDiffControll({ controlStorageLists })

  return {
    listWithNewFiles,
    listOfProcessedFiles,
  }
}

const runDiffControll = ({ controlStorageLists }) => {
  const collectDiff = []
  const sizes = Object.keys(ICON_SIZES).map((size) => `_${size}`)
  const removeSizes = (n) =>
    n.replace(new RegExp(`(${sizes.join('|')})$`), '')
  const getDiff = (a, b) =>
    a.filter(
      ({ name }) =>
        !b.some(({ name: n }) => removeSizes(n) === removeSizes(name))
    )

  controlStorageLists.forEach((cur, i, arr) => {
    getDiff(arr[0], cur).forEach(({ size, name }) => {
      collectDiff.push({ [size]: name })
    })
  })
  controlStorageLists.reverse().forEach((cur, i, arr) => {
    getDiff(arr[0], cur).forEach(({ size, name }) => {
      collectDiff.push({ [size]: name })
    })
  })

  if (collectDiff.length > 0) {
    log.fail(
      `> Figma: Detected a difference between the frames!. Here are the differences:\n ${JSON.stringify(
        collectDiff,
        null,
        4
      )}`
    )
  }
}

const frameIconsFactory = async ({
  frameDoc,
  figmaFile,
  destDir,
  forceRedownload = false,
  format = 'svg',
  iconsLockFile,
  iconSelector,
  iconPrimaryList,
  iconCloneList,
  imageUrlExpireAfterDays,
}) => {
  const newFiles = []
  const existingFiles = []

  const frameId = frameDoc.id
  const originalFrameName = String(frameDoc.name)
    // because the frame name contains a number first
    .replace(/^[0-9]+[_\- ]/g, '')

  // select all icons in the frame
  const frameDocChildren = iconSelector
    ? findAllNodes(frameDoc, { name: new RegExp(iconSelector) })
    : // using frameDoc.children only is possible,
      // but once an icon has a frame inside, we have to make sure that this not happens
      findAllNodes(frameDoc, { type: 'COMPONENT_SET' }) ||
      frameDoc.children

  // get a list of icons we want to refetch
  const listOfIconObjectsFromDoc = frameDocChildren.reduce(
    (acc, { name, children }) => {
      const iconName = prerenderIconName(name)

      // Skip names starting with a dot
      if (/^\./.test(iconName)) {
        return acc
      }

      // also skip if there are too many underlines
      // because too many underlines will probably indicate that it is not meant to have it inside
      const underlineLimit = 4
      if (iconName.split(/_/g).length > underlineLimit) {
        log.fail(
          `${iconName} was skipped, cause it had more than ${underlineLimit} parts on name split by _`
        )
        return acc
      }

      // then add every component variant to the fetch list
      children.forEach((object) => {
        if (!object.size) {
          object.size = object.name.match(/([0-9]+)/)?.[1] || null
        }
        object.name = iconName
        object.category = String(name).split(/\//)[0]
        acc.push(object)
      })

      return acc
    },
    []
  )

  // check if lock file exists
  const oldLockFileContent = await readIconsLockFile({
    file: iconsLockFile,
  })

  // this may be controversial, but it's kind of a short way to use the lock file
  // to fetch icons by using the url in the lock file
  // this way we do not lay on that we have a cached version
  // This is done to optimize the CI process
  const listOfCachedIconUrls = Object.entries(oldLockFileContent)
    .filter(
      ([file, { id, url, slug }]) =>
        file && id && url && slug === md5(figmaFile + frameId)
    )
    // define the same format as we get from "getFigmaUrlByImageIds"
    .map(([file, { id, url, updated }]) => ({
      id,
      url,
      file,
      updated,
    }))

  // remove the IDs if they are in the lock file so we font need to refetch the urls
  const iconIdsToFetchFrom = listOfIconObjectsFromDoc.filter(({ id }) => {
    const found = listOfCachedIconUrls.find(({ id: i }) => i === id)

    if (found) {
      // Check if created has passed 30 days
      const countDays = Math.ceil(
        (Date.now() - found.updated) / (1e3 * 60 * 60 * 24)
      )
      const outdated = countDays > imageUrlExpireAfterDays

      if (outdated) {
        return true // yes, re-fetch the url
      }
    }

    return !found // no, we have it already
  })

  log.start(
    `> Figma: Starting to fetch ${iconIdsToFetchFrom.length} icons from the "${originalFrameName}" Canvas`
  )

  // go and load additional images
  const listOfAdditionalIconUrls = Object.entries(
    await getFigmaUrlByImageIds({
      figmaFile,
      ids: iconIdsToFetchFrom.map(({ id }) => id),
      params: { format },
    })
  ).map(([id, url]) => ({
    id,
    url,
  }))

  type IconItem = {
    id: string
    name: string
    url: string
    category: string
    size: number
  }
  type ListOfIcons = Array<IconItem>

  const rawListOfIconsToProcess: ListOfIcons = listOfCachedIconUrls
    // define the same format as we get from "getFigmaUrlByImageIds"
    .map(({ id, url }) => ({ id, url }))
    .concat(listOfAdditionalIconUrls)

    // clean the list of icons we will process
    .map(({ id, url }) => {
      const existingObject = listOfIconObjectsFromDoc.find(
        ({ id: i }) => i === id
      )

      return {
        ...existingObject,
        url,
      }
    })

    // by making sure it is in the current Figma frame document
    .filter((item) => item && item.url)

  const listOfIconsToProcess: ListOfIcons = iconCloneList.reduce(
    (acc, cur) => {
      const found = acc.find(({ name }) => cur.from === name)
      if (found && found.name) {
        acc.push({
          ...found,
          name: found.name.replace(new RegExp(cur.from), cur.to),
        })
      }

      return acc
    },
    rawListOfIconsToProcess
  )

  log.start(
    `> Figma: Starting to fetch process ${listOfIconsToProcess.length} icons`
  )

  const listOfProcessedFiles = (
    await asyncForEach(
      listOfIconsToProcess,
      async ({ id, url, category, name, size }) => {
        try {
          const iconSize = ICON_SIZES[size].suffix
          const iconName = prerenderIconName(name, iconSize)

          const iconFile = prerenderIconFile(iconName, format)
          const variant = iconPrimaryList.includes(prerenderIconName(name))
            ? 'primary'
            : 'secondary'
          const bundleName = `${variant}_icons${
            iconSize ? `_${iconSize}` : ''
          }`

          // define the filePath
          const file = path.resolve(destDir, iconFile)

          // check if frame content exists in the lock file
          const lockFileFrameContent =
            (oldLockFileContent && oldLockFileContent[iconFile]) || null

          const ret = {
            iconName,
            iconFile,
            name,
            category,
            url,
            id,
            slug: md5(figmaFile + frameId),
            size,
            variant,
            bundleName,
            created: null,
            updated: null,
          }

          let existsAndIsValid =
            forceRedownload !== true &&
            // compare the current id with the one in the lock file
            // if the id is the same, and the file exists, this version is not changed
            lockFileFrameContent &&
            lockFileFrameContent.id === id &&
            // and also compare for the frameId, as they may have been updated
            lockFileFrameContent &&
            lockFileFrameContent.slug === md5(figmaFile + frameId) &&
            fs.existsSync(file)

          // Check if created has passed 30 days
          const countDays = Math.ceil(
            (Date.now() - lockFileFrameContent?.updated) /
              (1e3 * 60 * 60 * 24)
          )
          if (countDays > imageUrlExpireAfterDays) {
            existsAndIsValid = false
          }

          if (existsAndIsValid) {
            ret.created = lockFileFrameContent?.created
            ret.updated = lockFileFrameContent?.updated

            log.info(
              `> Figma: File already exists: ${iconFile} (ID=${id}, CREATED=${ret.created})`
            )

            existingFiles.push(ret)
          } else {
            const { content } = await streamToDisk(
              {
                file,
                url,
              },
              {
                errorExceptionType: ERROR_HARMLESS,
              }
            )

            let streamResult = null

            if (!content) {
              streamResult = 'IS_EMPTY'
            } else if (content.includes('denied')) {
              streamResult = 'ACCESS_DENIED'
            } else {
              streamResult = 'SUCCESS'
            }

            if (streamResult === 'ACCESS_DENIED') {
              log.fail(
                ErrorHandler(
                  `> Figma: Failed to stream content of (${iconName}): ${content}`
                )
              )
            }

            if (['IS_EMPTY', 'ACCESS_DENIED'].includes(streamResult)) {
              if (fs.existsSync(file)) {
                await fs.unlink(file)
              }

              return null // stop here
            }

            if (streamResult === 'SUCCESS') {
              ret.created = lockFileFrameContent?.created || Date.now()
              ret.updated = Date.now()

              newFiles.push(ret)

              log.info(
                `> Figma: Saved file ${iconFile} (ID=${id}, CREATED=${ret.created})`
              )
            }
          }

          return ret
        } catch (e) {
          log.fail(ErrorHandler('Failed to process new icons', e))
        }
      }
    )
  ).filter(Boolean)

  return { files: listOfProcessedFiles, newFiles, existingFiles }
}

const prerenderIconName = (name, size = null) => {
  const { iconSelector, iconNameCleaner, iconRenameList } = IconsConfig()

  let iconName = name

  // in case Icons have "[NAME] ..." somewhere
  if (iconSelector) {
    iconName =
      iconName.match(new RegExp(iconSelector), '$1')?.[1] || iconName
  }

  // essentials/grabber_16 => grabber
  if (iconNameCleaner) {
    iconName =
      iconName.match(new RegExp(iconNameCleaner), '$1')?.[1] || iconName
  }

  // also, make sure we use underline, instead of hyphen and so on
  iconName = formatIconName(iconName)

  iconName = iconRenameList.reduce(
    (acc, cur) => (cur.from === acc ? cur.to : acc),
    iconName
  )

  const isReservedWord = reservedJavaScriptWords.some(
    (name) => name === iconName
  )
  if (isReservedWord) {
    log.fail(
      `\nReserved name found for icon "${iconName}" – it got renamed to "${iconName}_1".\n\n\n`
    )
    iconName = `${iconName}_1`
  }

  if (size) {
    iconName = `${iconName}_${size}`
  }

  return iconName
}

const prerenderIconFile = (name, format = 'svg') => {
  // make the frameName ready for creating a collection file for every frame
  return `${name}.${format}`
}

const makeMetaFile = async ({
  listOfProcessedFiles,
  figmaDoc,
  iconRenameList,
  assetsDir,
}) => {
  // save the metaFile content
  const data = listOfProcessedFiles.reduce(
    (acc, { iconName, size, id, created, name, variant, category }) => {
      const cleanSize = size ? size : null
      if (cleanSize && iconName.includes(cleanSize)) {
        iconName = iconName.replace(`_${cleanSize}`, '')
      }

      const { description, componentSetId } = figmaDoc.components[id]
      const componentSet = figmaDoc.componentSets?.[componentSetId]

      let tags = []

      // add component tags
      tags = description
        .split(/[,;|]/g)
        .map((s) => (s ? s.trim() : null))
        .filter(Boolean)

      // add set tags
      tags = (componentSet?.description || '')
        .split(/[,;|]/g)
        .map((s) => (s ? s.trim() : null))
        .filter(Boolean)
        .reduce((tags, tag) => {
          if (!tags.includes(tag)) {
            tags.push(tag)
          }

          return tags
        }, tags)

      // remove duplication
      const cleanedName = Object.values(ICON_SIZES).reduce(
        (iconName, { suffix }) =>
          suffix
            ? iconName.replace(NAME_SEPARATOR + suffix, '')
            : iconName,
        iconName
      )
      tags = tags.filter((item, index) => {
        if (item === cleanedName) {
          return false
        }
        return tags.indexOf(item) === index
      })

      const foundRename = iconRenameList.find(({ to }) => to === iconName)
      if (foundRename) {
        tags.push(foundRename.from)
      }

      if (acc[iconName]) {
        const existing = acc[iconName]

        acc[iconName] = {
          ...existing,
          tags: tags.reduce((acc, cur) => {
            if (!acc.includes(cur) && cur !== iconName) {
              acc.push(cur)
            }
            return acc
          }, existing.tags),
        }
      } else {
        acc[iconName] = { tags, created, name, variant, category }
      }
      return acc
    },
    {}
  )

  await saveToFile(
    makeIconsMetaFile(assetsDir),
    await formatIconsMetaFile(data, assetsDir)
  )

  log.info('> Figma: icons-meta.json file got generated')
}

type ProcessedFileList = Array<{
  name: string
  category: string
  iconFile: string
  iconFileXML: string
}>

type XMLTarBundlesOptions = {
  destDir: string
  listOfProcessedFiles: ProcessedFileList
  outputName?: string
  outputNameCategorized?: string
}

const createXMLTarBundles = async ({
  destDir,
  listOfProcessedFiles,
  outputName = 'eufemia-icons-xml.tgz',
  outputNameCategorized = 'eufemia-icons-xml-categorized.tgz',
}: XMLTarBundlesOptions) => {
  log.info(`> Figma: started to create ${outputName}`)

  let tarFileSize = 0
  const tarFile = path.resolve(destDir, outputName)
  if (fs.existsSync(tarFile)) {
    tarFileSize = (await fs.stat(tarFile)).size
    await extract({
      cwd: destDir,
      file: tarFile,
    })
  }

  listOfProcessedFiles = listOfProcessedFiles.map(
    ({ iconFile, ...rest }) => {
      const iconFileXML = iconFile.replace(/\.svg$/, '.xml')
      return { iconFile, iconFileXML, ...rest }
    }
  )

  await convertSvgToXml()
  const sizeHasChanged = await hasSizeChanged()

  if (sizeHasChanged) {
    await createTarWithoutCategories()
    await createTarWithCategories()
  }

  await removeGeneratedXmlFiles()

  log.succeed(`> Figma: finished to create ${outputName}`)

  async function convertSvgToXml() {
    try {
      log.info(`> Figma: convert SVG to XML in directory: ${destDir}`)
      await runCommand(`yarn vd-tool -c -in ${destDir}`)
    } catch (error) {
      log.fail(
        `> Figma: failed to convert SVG to XML in ${destDir}\n\n${error}`
      )
    }
  }

  async function removeGeneratedXmlFiles() {
    await asyncForEach(listOfProcessedFiles, async ({ iconFileXML }) => {
      const file = path.resolve(destDir, iconFileXML)
      if (fs.existsSync(file)) {
        await fs.unlink(file)
      }
    })
  }

  async function hasSizeChanged() {
    const fileList = listOfProcessedFiles.map(
      ({ iconFileXML }) => iconFileXML
    )

    const tmp = path.resolve(destDir, 'tmp.tgz')
    await create(
      {
        gzip: true,
        cwd: destDir,
        file: tmp,
      },
      fileList
    )
    const tmpSize = (await fs.stat(tmp)).size

    await fs.unlink(tmp)

    return Math.abs(tarFileSize - tmpSize) > 30
  }

  async function createTarWithoutCategories() {
    const fileList = listOfProcessedFiles.map(
      ({ iconFileXML }) => iconFileXML
    )

    await create(
      {
        gzip: true,
        cwd: destDir,
        file: tarFile,
      },
      fileList
    )
  }

  async function createTarWithCategories() {
    await asyncForEach(
      listOfProcessedFiles,
      async ({ category, iconFileXML }) => {
        const source = path.resolve(destDir, iconFileXML)
        const dest = path.resolve(destDir, `${category}/${iconFileXML}`)

        if (fs.existsSync(source)) {
          await fs.move(source, dest)
        }
      }
    )

    const fileList = listOfProcessedFiles.map(
      ({ category, iconFileXML }) => `${category}/${iconFileXML}`
    )

    const tarFile = path.resolve(destDir, outputNameCategorized)
    await create(
      {
        gzip: true,
        cwd: destDir,
        file: tarFile,
      },
      fileList
    )

    // Empty category dir
    await asyncForEach(fileList, async (file) => {
      file = path.resolve(destDir, file)
      if (fs.existsSync(file)) {
        await fs.unlink(file)
      }
    })

    // Remove category dir
    await asyncForEach(listOfProcessedFiles, async ({ category }) => {
      const dir = path.resolve(destDir, category)
      if (fs.existsSync(dir)) {
        await fs.rmdir(dir)
      }
    })
  }
}

const optimizeSVGIcons = async ({ destDir, listWithFiles }) => {
  await asyncForEach(listWithFiles, async ({ iconFile }) => {
    const file = path.resolve(destDir, iconFile)
    await optimizeSVG(file)

    log.info(`> Figma: Icon was optimized: ${iconFile}`)
  })
}

const optimizeSVG = async (file) => {
  if (!fs.existsSync(file)) {
    log.fail(`Figma: optimizeSVG got an non existing file: ${file}`)
    return null
  }

  try {
    const content = await fs.readFile(file, 'utf-8')

    const config = await loadConfig()
    let { data } = await optimize(content, {
      path: file,
      ...config,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      removeViewBox: false, // Seems to be a bug as it is not picked up from svgo.config.js
    })

    // Figma has an issue where 16px icons gets exported as 17px
    // This is a fix for that issue
    data = data.replace(/="17"/g, '="16"')
    data = data.replace(/="25"/g, '="24"')
    data = data.replace(/17 16/g, '16 16')
    data = data.replace(/16 17/g, '16 16')
    data = data.replace(/25 24/g, '24 24')
    data = data.replace(/24 25/g, '24 24')

    // WIP
    // data = insertInlineStylesToSVG(data)

    await fs.writeFile(file, data)
    return data
  } catch (e) {
    log.fail(ErrorHandler('Failed during optimizeSVG', e))
  }

  return null
}

// eslint-disable-next-line no-unused-vars
const insertInlineStylesToSVG = (svg) => {
  return Object.entries(properties)
    .filter(([key]) => key.includes('--color-'))
    .reduce((acc, [key, val]) => {
      if (acc.includes(val)) {
        acc = acc.replace(
          /(fill|stroke)="([^"]*)"/g,
          `style="$1:var(${key})" $1="$2"`
        )
      }
      return acc
    }, svg)
}

const getIconCanvasDoc = ({ figmaDoc }) => {
  const { canvasNameSelector } = IconsConfig()
  return findNode(figmaDoc.document, {
    name: canvasNameSelector,
    type: 'CANVAS',
  })
}

const formatIconName = (n) =>
  String(n)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/\s|_{2,}/g, '_')

type IconsLockFileItem = {
  id: string
  url: string
  slug: string
  updated: number
  created: number
  bundleName: string
}
type IconsLockFileMap = { [key: string]: IconsLockFileItem }

export const readIconsLockFile = async ({ file }) => {
  if (fs.existsSync(file)) {
    try {
      return JSON.parse(
        (await fs.readFile(file, 'utf-8')) || '{}'
      ) as IconsLockFileMap
    } catch (e) {
      log.fail('Failed to read the lock file and parse the result')
      console.error(e)
    }
  }

  return {} as IconsLockFileMap
}
export const saveIconsLockFile = async ({ file, data, assetsDir }) => {
  await saveToFile(file, await formatIconsMetaFile(data, assetsDir))

  log.info(`> Figma: ${file} file got generated`)
}

const makeIconsMetaFile = (assetsDir) =>
  path.resolve(
    __dirname,
    `../../../src/icons/${assetsDir}/icons-meta.json`
  )

export const formatIconsMetaFile = async (data, assetsDir) => {
  return await prettier.format(JSON.stringify(data), {
    ...prettierrc,
    filepath: makeIconsMetaFile(assetsDir),
  })
}

const reservedJavaScriptWords = [
  'abstract',
  'arguments',
  'await',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'int',
  'interface',
  'let',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
  'yield',

  'array',
  'date',
  'eval',
  'function',
  'hasownproperty',
  'infinity',
  'isfinite',
  'isnan',
  'isprototypeof',
  'length',
  'math',
  'nan',
  'name',
  'number',
  'object',
  'prototype',
  'string',
  'tostring',
  'undefined',
  'valueof',

  'alert',
  'assign',
  'escape',
  'event',
  'navigate',
  'navigator',
  'parent',
  'scroll',
  'secure',
  'select',
  'self',
  'unescape',
  'document',
  'window',
]
