/**
 * Figma Task
 *
 */

import fs from 'fs-extra'
import gulp from 'gulp'
import path from 'path'
import transform from 'gulp-transform'
import SVGOptim from 'svgo'
import { asyncForEach } from '../../tools'
import { ERROR_HARMLESS } from '../../lib/error'
import { log, ErrorHandler } from '../../lib'
import {
  getFigmaUrlByImageIds,
  safeFileToDisk,
  getFigmaDoc,
  findNode,
  findAllNodes,
  saveToFile,
  md5,
  defaultFigmaFile
} from '../helpers/docHelpers'

const canvasNameSelector =
  process.env.FIGMA_ICONS_PAGE_SELECTOR || /^Icons$/ // before we have used: ^[0-9]+[_\- ]Icons$
const frameNameSelector =
  process.env.FIGMA_ICONS_FRAME_SELECTOR || /[A-z]+ - [0-9]{1,2}/
const sizeSeperator =
  process.env.FIGMA_ICONS_FRAME_SIZE_SEPERATOR || /(.*)_[0-9]{1,2}/
const iconSelector = process.env.FIGMA_ICONS_SELECTOR || null
const iconNameCleaner =
  process.env.FIGMA_ICONS_NAME_SPLIT || /.*\/(.*)_[0-9]{1,2}/
const iconRenameList = process.env.FIGMA_ICONS_RENAME_LIST || [
  { from: 'hide', to: 'view_off' },
  { from: 'loupe', to: 'search' },
  { from: 'checkmark', to: 'check' },
  { from: 'more_horizontal', to: 'more' }
]
const iconCloneList =
  process.env.FIGMA_ICONS_CLONE_LIST ||
  [
    // As of now, we only rename these icons
    // { from: 'loupe', to: 'search' },
    // { from: 'checkmark', to: 'check' },
    // { from: 'more_horizontal', to: 'more' }
  ]
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
  'search',
  'question',
  'calendar'
]

const ignoreAddingSizeList = ['basis', 'default']
const iconsDest = path.resolve(__dirname, `../../../assets/icons`)

export const IconsConverter = async ({
  figmaDoc = null,
  figmaFile = null,
  forceReconvert = null,
  ...rest
}) => {
  if (!figmaFile) {
    figmaFile = defaultFigmaFile
  }

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

  const listOfProcessedIcons = await asyncForEach(
    framesInTheCanvas,
    async (frameDoc) =>
      await runFrameIconsFactory({
        frameDoc,
        figmaFile,
        ...rest
      })
  )

  // prepare the lockFile content
  await saveLockFile(
    listOfProcessedIcons.reduce((acc, { iconFile, ...cur }) => {
      acc[iconFile] = cur
      return acc
    }, {})
  )

  return listOfProcessedIcons
}

const runFrameIconsFactory = async ({
  frameDoc,
  figmaFile,
  forceRedownload = null
}) => {
  if (/#skip/.test(frameDoc.name)) {
    return undefined
  }

  if (!frameNameSelector.test(frameDoc.name)) {
    return undefined
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
  const oldLockFileContent = await readLockFile()

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
      ids: iconIdsToFetchFrom
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
    // my making sure it is in the current Figma frame document
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

  const listOfProcessedIcons = await asyncForEach(
    listOfIconsToProcess,
    async ({ id, url, name }) => {
      try {
        const iconName = prerenderIconName(name, size)
        const iconFile = prerenderIconFile(iconName)
        const bundleName = `${
          iconPrimaryList.includes(prerenderIconName(name))
            ? 'primary'
            : 'secondary'
        }_icons${!ignoreAddingSizeList.includes(size) ? `_${size}` : ''}`

        // define the filePath
        const file = path.resolve(iconsDest, iconFile)

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
          // timestamp: Date.now(),// We set the timestamp later anyway, once it got processed
          // frame: frameName,// The "old" way of defining the primary/secondary icons – they where defined before in Figma Eufemia Web
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
          log.info(`> Figma: File already exists: ${iconFile}`)
        } else {
          log.info(`> Figma: Saving file to disk: ${iconFile}`)

          await safeFileToDisk(
            {
              file,
              url,
              id // id is not used for now
            },
            {
              errorExceptionType: ERROR_HARMLESS
            }
          )

          ret.timestamp = Date.now()

          log.info(
            `> Figma: Icon was saved: ${iconFile} (${ret.timestamp})`
          )
        }

        await optimizeSVG({ file })

        log.info(`> Figma: Icon was prepared: ${iconFile}`)

        return ret
      } catch (e) {
        log.fail(e)
        new ErrorHandler('Failed to process new icons', e)
      }
    }
  )

  return listOfProcessedIcons
}

const prerenderIconName = (name, size = null) => {
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

const prerenderIconFile = (name) => {
  // make the frameName ready for creating a collection file for every frame
  return `${name}.svg`
}

const optimizeSVG = ({ file }) => {
  const transformSvg = async (content) => {
    // Figma has an issue where 16px icons gets exported as 17px
    // This is a fix for that issue
    content = content.replace(/="17"/g, '="16"')
    content = content.replace(/="25"/g, '="24"')

    // If we cahnge the viewBox, then we change the possition of the icons slightly
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
      // { convertPathData: false }, // if we prefere to not transform any data paths, we have to disable this
      { cleanupIDs: true },
      { removeViewBox: false },
      { removeDimensions: false }
    ]
    const svgo = new SVGOptim({
      plugins
    })
    const { data } = await svgo.optimize(String(content))
    return data
  }
  return new Promise((resolve, reject) => {
    gulp
      .src(file, { cwd: process.env.ROOT_DIR, allowEmpty: true })
      .pipe(transform('utf8', transformSvg))
      .pipe(gulp.dest(path.dirname(file), { cwd: process.env.ROOT_DIR }))
      .on('end', resolve)
      .on('error', reject)
  })
}

const getIconCanvasDoc = ({ figmaDoc }) =>
  findNode(figmaDoc.document, {
    name: canvasNameSelector,
    type: 'CANVAS'
  })

const formatIconName = (n) =>
  String(n)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/\s|_{2,}/g, '_')

const lockFileDest = path.resolve(
  __dirname,
  `../../../src/icons/icons.lock`
)
export const readLockFile = async () => {
  if (fs.existsSync(lockFileDest)) {
    try {
      return JSON.parse((await fs.readFile(lockFileDest, 'utf-8')) || '{}')
    } catch (e) {
      log.fail('Failed to read the lock file and parse the result')
      console.error(e)
    }
  }
  return {}
}

export const saveLockFile = async (data) =>
  await saveToFile(lockFileDest, JSON.stringify(data))

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
