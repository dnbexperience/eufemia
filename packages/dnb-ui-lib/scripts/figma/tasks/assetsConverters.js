/**
 * Figma Task handlers
 *
 */

import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import SVGOptim from 'svgo'
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
  md5
} from '../helpers/docHelpers'
import properties from '../../../src/style/properties'
import { create, extract } from 'tar'

const prettierrc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc'), 'utf-8')
)
export function IconsConfig(overwrite = {}) {
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
    'calendar'
  ]

  const iconRenameList = process.env.FIGMA_ICONS_RENAME_LIST || [
    { from: 'checkmark', to: 'check' },
    { from: 'repeat', to: 'refresh' },
    { from: 'document', to: 'file' },
    { from: 'more_horizontal', to: 'more' }
    // { from: 'loupe', to: 'settings' },
    // { from: 'loupe', to: 'search' },
    // { from: 'hide', to: 'view_off' },
    // { from: 'log_in', to: 'login' },
    // { from: 'log_out', to: 'logout' },
  ]

  const iconCloneList =
    process.env.FIGMA_ICONS_CLONE_LIST ||
    [
      // As of now, we only rename these icons
      // { from: 'loupe', to: 'search' },
    ]

  const canvasNameSelector =
    process.env.FIGMA_ICONS_PAGE_SELECTOR || /^Icons$/ // before we have used: ^[0-9]+[_\- ]Icons$
  const frameNameSelector =
    process.env.FIGMA_ICONS_FRAME_SELECTOR || /[A-z]+ - [0-9]{1,2}/
  const sizeSeperator =
    process.env.FIGMA_ICONS_FRAME_SIZE_SEPERATOR || /(.*)_[0-9]{1,2}/
  const iconSelector = process.env.FIGMA_ICONS_SELECTOR || null
  const iconNameCleaner =
    process.env.FIGMA_ICONS_NAME_SPLIT || /.*\/(.*)_[0-9]{1,2}/
  const ignoreAddingSizeList = ['basis', 'default']
  const iconsDest = path.resolve(__dirname, '../../../assets/icons')
  const iconsLockFile = path.resolve(
    __dirname,
    `../../../src/icons/icons-svg.lock`
  )
  const getCategory = (name) => String(name).split(/\//)[0]

  return {
    canvasNameSelector,
    frameNameSelector,
    sizeSeperator,
    ignoreAddingSizeList,
    iconsLockFile,
    iconPrimaryList,
    iconRenameList,
    iconCloneList,
    iconSelector,
    iconNameCleaner,
    iconsDest,
    getCategory,
    ...overwrite
  }
}

export const PDFConverter = async ({
  figmaFile,
  figmaDoc = null,
  forceReconvert = null,
  outputName = 'eufemia-icons-pdf.tgz',
  outputNameCategorized = 'eufemia-icons-pdf-categorized.tgz',
  ...rest
}) => {
  try {
    if (figmaDoc === null) {
      figmaDoc = await getFigmaDoc({
        figmaFile,
        preventUpdate: forceReconvert
      })
    }

    // juice out, if no changes
    if (!figmaDoc) return []

    const canvasDoc = getIconCanvasDoc({ figmaDoc })

    const framesInTheCanvas = findAllNodes(canvasDoc, {
      type: 'FRAME'
    })

    const destDir = path.resolve(__dirname, '../../../assets/icons')
    if (!fs.existsSync(destDir)) {
      fs.mkdir(destDir)
    }

    log.start(
      '> Figma: started to fetch PDFs by using runFrameIconsFactory'
    )

    const tarFile = path.resolve(`${destDir}`, outputName)
    if (fs.existsSync(tarFile)) {
      await extract({
        cwd: destDir,
        file: tarFile
      })
    }

    const iconsLockFile = path.resolve(
      __dirname,
      `../../../src/icons/icons-pdf.lock`
    )

    const listWithNewFiles = []
    const listOfProcessedPdfs = await asyncForEach(
      // Load and save additional PDFs
      framesInTheCanvas,
      async (frameDoc) => {
        const { files, newFiles } = await runFrameIconsFactory({
          frameDoc,
          figmaFile,
          destDir,
          format: 'pdf',
          ...IconsConfig({ iconsLockFile }),
          ...rest
        })

        listWithNewFiles.concat(newFiles)
        return files
      }
    )
    log.info(
      `> Figma: finished fetching PDFs by using runFrameIconsFactory. Processed ${listOfProcessedPdfs.length} files along with ${listWithNewFiles.length} new files.`
    )

    // save the lockFile content
    await saveIconsLockFile({
      file: iconsLockFile,
      data: listOfProcessedPdfs.reduce((acc, { iconFile, ...cur }) => {
        acc[iconFile] = cur
        return acc
      }, {})
    })
    log.info(`> Figma: ${iconsLockFile} file got generated`)

    if (listWithNewFiles.length > 0) {
      log.info(`> Figma: started to create ${outputName}`)

      const createTarWithoutCategories = async () => {
        const fileList = listOfProcessedPdfs.reduce(
          (acc, { iconFile }) => {
            acc.push(iconFile)
            return acc
          },
          []
        )

        await create(
          {
            gzip: true,
            cwd: destDir,
            file: tarFile
          },
          fileList
        )
      }

      const createTarWithCategories = async () => {
        const { getCategory } = IconsConfig()

        await asyncForEach(
          listOfProcessedPdfs,
          async ({ name, iconFile }) => {
            const folder = getCategory(name)
            const source = path.resolve(destDir, iconFile)
            const dest = path.resolve(destDir, `${folder}/${iconFile}`)

            if (fs.existsSync(source)) {
              await fs.move(source, dest)
            }
          }
        )

        const fileList = listOfProcessedPdfs.reduce(
          (acc, { name, iconFile }) => {
            const folder = getCategory(name)
            const file = `${folder}/${iconFile}`
            acc.push(file)
            return acc
          },
          []
        )

        const tarFile = path.resolve(`${destDir}`, outputNameCategorized)
        await create(
          {
            gzip: true,
            cwd: destDir,
            file: tarFile
          },
          fileList
        )

        await asyncForEach(fileList, async (file) => {
          file = path.resolve(destDir, file)
          if (fs.existsSync(file)) {
            await fs.unlink(file)
          }
        })
      }

      await createTarWithoutCategories()
      await createTarWithCategories()

      log.succeed(`> Figma: finished to create ${outputName}`)
    }

    // Remove the pdfs
    await asyncForEach(listOfProcessedPdfs, async ({ iconFile }) => {
      const file = path.resolve(destDir, iconFile)
      if (fs.existsSync(file)) {
        try {
          await fs.unlink(file)
          log.info(`> Figma: File got removed: ${iconFile}`)
        } catch (e) {
          log.fail(new ErrorHandler(`Failed to remove ${iconFile}`, e))
        }
      }
    })

    return listOfProcessedPdfs
  } catch (e) {
    log.fail(new ErrorHandler('PDFConverter failed', e))
  }
}

export const SVGIconsConverter = async ({
  figmaFile,
  figmaDoc = null,
  forceReconvert = null,
  ...rest
}) => {
  try {
    if (figmaDoc === null) {
      figmaDoc = await getFigmaDoc({
        figmaFile,
        preventUpdate: forceReconvert
      })
    }

    // juice out, if no changes
    if (!figmaDoc) return []

    const canvasDoc = getIconCanvasDoc({ figmaDoc })

    const framesInTheCanvas = findAllNodes(canvasDoc, {
      type: 'FRAME'
    })

    const {
      iconsLockFile,
      ignoreAddingSizeList,
      iconRenameList,
      iconsDest
    } = IconsConfig()

    log.start(
      '> Figma: started to fetch svg icons by using runFrameIconsFactory'
    )

    const listWithNewFiles = []
    const listOfProcessedIcons = await asyncForEach(
      framesInTheCanvas,
      async (frameDoc) => {
        const { files, newFiles } = await runFrameIconsFactory({
          frameDoc,
          figmaFile,
          destDir: iconsDest,
          format: 'svg',
          ...IconsConfig(),
          ...rest
        })

        listWithNewFiles.concat(newFiles)
        return files
      }
    )
    log.info(
      `> Figma: finished fetching svg icons by using runFrameIconsFactory. Processed ${listOfProcessedIcons.length} files along with ${listWithNewFiles.length} new files.`
    )

    // save the lockFile content
    await saveIconsLockFile({
      file: iconsLockFile,
      data: listOfProcessedIcons.reduce((acc, { iconFile, ...cur }) => {
        acc[iconFile] = cur
        return acc
      }, {})
    })
    log.info(`> Figma: ${iconsLockFile} file got generated`)

    if (listWithNewFiles.length > 0) {
      await asyncForEach(
        listWithNewFiles,
        async ({ iconFile, created, updated }) => {
          const file = path.resolve(iconsDest, iconFile)
          await optimizeSVG(file)

          /**
           * Run twice, because then we get a possible small change on paths,
           * that else will be added next time, and messes up test snapshots
           */
          if (created === updated) {
            await optimizeSVG(file)
          }

          log.info(`> Figma: Icon was optimized: ${iconFile}`)
        }
      )
    }

    // save the metaFile content
    await saveIconsMetaFile(
      listOfProcessedIcons.reduce(
        (acc, { iconName, size, id, created, name, variant }) => {
          const cleanSize = !ignoreAddingSizeList.includes(size)
            ? size
            : null
          if (cleanSize && iconName.includes(cleanSize)) {
            iconName = iconName.replace(`_${cleanSize}`, '')
          }

          const { description } = figmaDoc.components[id]
          const tags = description
            .split(/[,;|]/g)
            .map((s) => (s ? s.trim() : null))
            .filter(Boolean)

          const foundRename = iconRenameList.find(
            ({ to }) => to === iconName
          )
          if (foundRename) {
            tags.push(foundRename.from)
          }

          if (acc[iconName]) {
            const existing = acc[iconName]

            acc[iconName] = {
              ...existing,
              tags: tags.reduce((acc, cur) => {
                if (!acc.includes(cur)) {
                  acc.push(cur)
                }
                return acc
              }, existing.tags)
            }
          } else {
            acc[iconName] = { tags, created, name, variant }
          }
          return acc
        },
        {}
      )
    )
    log.info('> Figma: icons-meta.json file got generated')

    return listOfProcessedIcons
  } catch (e) {
    log.fail(new ErrorHandler('SVGIconsConverter failed', e))
  }
}

const runFrameIconsFactory = async ({
  frameDoc,
  figmaFile,
  destDir,
  forceRedownload = null,
  format = 'svg',
  frameNameSelector,
  sizeSeperator,
  iconsLockFile,
  iconSelector,
  iconPrimaryList,
  iconCloneList,
  ignoreAddingSizeList
}) => {
  const newFiles = []
  const existingFiles = []

  if (
    /#skip/.test(frameDoc.name) ||
    !frameNameSelector.test(frameDoc.name)
  ) {
    return {
      files: [],
      newFiles,
      existingFiles
    }
  }

  const frameId = frameDoc.id
  const originalFrameName = String(frameDoc.name)
    // because the frame name contains a number first
    .replace(/^[0-9]+[_\- ]/g, '')
  const size = formatIconName(originalFrameName).replace(
    sizeSeperator,
    '$1'
  )

  // select all icons in the frame
  const frameDocChildren = iconSelector
    ? findAllNodes(frameDoc, { name: new RegExp(iconSelector) })
    : // using frameDoc.children only is possible,
      // but once an icon has a frame inside, we have to make sure that this not happens
      findAllNodes(frameDoc, { type: 'COMPONENT' }) || frameDoc.children

  // get a list of icons we want to refetch
  const iconIdsFromDoc = frameDocChildren.reduce((acc, { id, name }) => {
    // skip adding the current icon
    if (/#skip/.test(name)) {
      return acc
    }

    // also skip if there are too many underlines
    // because too many underlines will probably indicate that it is not meant to have it inside
    const iconName = prerenderIconName(name)
    const underlineLimit = 4
    if (iconName.split(/_/g).length > underlineLimit) {
      log.fail(
        `${iconName} was skipped, cause it had more than ${underlineLimit} parts on name split by _`
      )
      return acc
    }

    // then add to the fetch list
    acc.push(id)
    return acc
  }, [])

  // check if lock file exists
  const oldLockFileContent = await readIconsLockFile({
    file: iconsLockFile
  })

  // this may be controversial, but it's kind of a short way to use the lock file
  // to fetch icons by using the url in the lock file
  // this way we do not lay on that we have a cached version
  // This is done to optimize the CI process
  const listOfIconUrls = Object.entries(oldLockFileContent)
    .filter(
      ([file, { id, url, slug }]) =>
        file && id && url && slug === md5(figmaFile + frameId)
    )
    // define the same format as we get from "getFigmaUrlByImageIds"
    .map(([file, { id, url }]) => [id, url, file])

  // remove the IDs if they are in the lock file so we font need to refetch the urls
  const iconIdsToFetchFrom = iconIdsFromDoc.filter(
    (refId) => !listOfIconUrls.some(([id]) => id === refId)
  )

  log.start(
    `> Figma: Starting to fetch ${iconIdsToFetchFrom.length} icons from the "${originalFrameName}" Canvas`
  )

  // go and load additional images
  const listOfAdditionalIconUrls = Object.entries(
    await getFigmaUrlByImageIds({
      figmaFile,
      ids: iconIdsToFetchFrom,
      params: { format }
    })
  )

  const rawListOfIconsToProcess = listOfIconUrls
    .concat(listOfAdditionalIconUrls)
    // clean the list of icons we will process
    .map(([id, url]) => {
      return {
        ...frameDocChildren.find(({ id: i }) => i === id),
        url
      }
    })
    // by making sure it is in the current Figma frame document
    .filter((item) => item && item.url)

  const listOfIconsToProcess = iconCloneList.reduce((acc, cur) => {
    const found = acc.find(({ name }) =>
      new RegExp(`(^|/)${cur.from}(_|$)`).test(name)
    )
    if (found && found.name) {
      acc.push({
        ...found,
        name: found.name.replace(cur.from, cur.to)
      })
    }

    return acc
  }, rawListOfIconsToProcess)

  log.start(
    `> Figma: Starting to fetch process ${listOfIconsToProcess.length} icons`
  )

  const listOfProcessedIcons = (
    await asyncForEach(listOfIconsToProcess, async ({ id, url, name }) => {
      try {
        const iconName = prerenderIconName(name, size)
        const iconFile = prerenderIconFile(iconName, format)
        const variant = iconPrimaryList.includes(prerenderIconName(name))
          ? 'primary'
          : 'secondary'
        const bundleName = `${variant}_icons${
          !ignoreAddingSizeList.includes(size) ? `_${size}` : ''
        }`

        // define the filePath
        const file = path.resolve(destDir, iconFile)

        // check if frame content exists in the lock file
        const lockFileFrameContent =
          (oldLockFileContent && oldLockFileContent[iconFile]) || null

        const ret = {
          iconName,
          iconFile,
          name, // layer name
          url,
          id,
          slug: md5(figmaFile + frameId),
          size,
          variant,
          bundleName
        }

        if (
          forceRedownload !== true &&
          // compare the current id with the one in the lock file
          // if the id is the same, and the file exists, this version is not changed
          lockFileFrameContent &&
          lockFileFrameContent.id === id &&
          // and also compare for the frameId, as they may have been updated
          lockFileFrameContent &&
          lockFileFrameContent.slug === md5(figmaFile + frameId) &&
          fs.existsSync(file)
        ) {
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
              id // id is not used for now
            },
            {
              errorExceptionType: ERROR_HARMLESS
            }
          )

          if (content) {
            ret.created = lockFileFrameContent?.created || Date.now()
            ret.updated = Date.now()

            log.info(
              `> Figma: Saved file ${iconFile} (ID=${id}, CREATED=${ret.created})`
            )
            newFiles.push(ret)
          } else {
            if (fs.existsSync(file)) {
              await fs.unlink(file)
            }

            return null
          }
        }

        return ret
      } catch (e) {
        log.fail(new ErrorHandler('Failed to process new icons', e))
      }
    })
  ).filter(Boolean)

  return { files: listOfProcessedIcons, newFiles, existingFiles }
}

const prerenderIconName = (name, size = null) => {
  const {
    iconSelector,
    iconNameCleaner,
    iconRenameList,
    ignoreAddingSizeList
  } = IconsConfig()

  let iconName = name

  // in case Icons have "[NAME] ..." somewhere
  if (iconSelector) {
    iconName = iconName.replace(new RegExp(iconSelector), '')
  }

  // essentials/grabber_16 => grabber
  if (iconNameCleaner) {
    iconName = iconName.replace(new RegExp(iconNameCleaner), '$1')
  }

  // also, make sure we use underline, instead of hyphen and so on
  iconName = formatIconName(iconName)

  iconName = iconRenameList.reduce(
    (acc, cur) => (cur.from === acc ? cur.to : acc),
    iconName
  )

  if (reservedJavaScriptWords.includes(iconName)) {
    iconName = `${iconName}_1`
  }

  if (size && !ignoreAddingSizeList.includes(size)) {
    iconName = `${iconName}_${size}`
  }

  return iconName
}

const prerenderIconFile = (name, format = 'svg') => {
  // make the frameName ready for creating a collection file for every frame
  return `${name}.${format}`
}

const optimizeSVG = async (file) => {
  if (!fs.existsSync(file)) {
    log.fail(`Figma: optimizeSVG got an non existing file: ${file}`)
    return null
  }

  try {
    let content = await fs.readFile(file, 'utf8')

    // const transformSvg = async (content) => {
    // Figma has an issue where 16px icons gets exported as 17px
    // This is a fix for that issue
    content = content.replace(/="17"/g, '="16"')
    content = content.replace(/="25"/g, '="24"')

    // If we change the viewBox, then we change the position of the icons slightly
    // content = content.replace(/ (17)("| )/g, ' 16$2')
    // content = content.replace(/ (25)("| )/g, ' 24$2')

    // find an id, and remove the element containing it, as we don't want IDs in our markups!
    const id = (/id="(.*)"/g.exec(content) || [0, null])[1]

    const plugins = [
      // {
      //   removeAttrs: {
      //     attrs: [
      //       // once this pullrequest goes throug https://github.com/svg/svgo/pull/977
      //       // we can use this methode
      //       // '*:(fill)|((?!^none$).)*'
      //       // remove all fills - if the instance has a defined background color, then things are not showing good. Then then have to allow this setting to be there
      //       'fill'
      //       // 'stroke' // for now, we dont remove stroke
      //       // 'svg:fill'
      //       // 'svg:xmlns',
      //       // 'svg:width',
      //       // 'svg:height'
      //     ]
      //   }
      // },
      {
        removeElementsByAttr: {
          id
        }
      },
      // { convertPathData: false }, // if we prefer to not transform any data paths, we have to disable this
      { cleanupIDs: true },
      { removeViewBox: false },
      { removeDimensions: false }
    ]
    const svgo = new SVGOptim({
      plugins
    })

    // content = insertInlineStylesToSVG(content)

    const { data } = await svgo.optimize(content, { path: file })

    await fs.writeFile(file, data)
    return data
  } catch (e) {
    log.fail(new ErrorHandler('Failed during optimizeSVG', e))
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
    type: 'CANVAS'
  })
}

const formatIconName = (n) =>
  String(n)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/\s|_{2,}/g, '_')

export const readIconsLockFile = async ({ file }) => {
  if (fs.existsSync(file)) {
    try {
      return JSON.parse((await fs.readFile(file, 'utf-8')) || '{}')
    } catch (e) {
      log.fail('Failed to read the lock file and parse the result')
      console.error(e)
    }
  }
  return {}
}
export const saveIconsLockFile = async ({ file, data }) =>
  await saveToFile(file, JSON.stringify(data))

const iconsMetaFile = path.resolve(
  __dirname,
  '../../../src/icons/icons-meta.json'
)
export const saveIconsMetaFile = async (data) => {
  const content = prettier.format(JSON.stringify(data), {
    ...prettierrc,
    filepath: iconsMetaFile
  })

  return await saveToFile(iconsMetaFile, content)
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
  'window'
]
