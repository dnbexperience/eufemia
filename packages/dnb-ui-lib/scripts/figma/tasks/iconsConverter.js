/**
 * Node
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

const canvasName = process.env.FIGMA_ICONS_PAGE_SELECTOR || 'Icons'
const sizeSeperator = process.env.FIGMA_ICONS_FRAME_SIZE_SEPERATOR || '-'
const iconSelector = process.env.FIGMA_ICONS_SELECTOR || null
const iconsDest = path.resolve(__dirname, `../../../assets/icons`)

export const IconsConverter = async ({
  figmaDoc = null,
  figmaFile = null,
  ...rest
}) => {
  if (!figmaFile) {
    figmaFile = defaultFigmaFile
  }

  if (figmaDoc === null) {
    figmaDoc = await getFigmaDoc({ figmaFile })
  }

  // juce out, if no changes
  if (!figmaDoc) return []

  const canvasDoc = getIconCanvasDoc({ figmaDoc })

  const framesInTheCanvas = findAllNodes(canvasDoc, {
    type: 'FRAME'
  })

  const listOfProcessedIcons = await asyncForEach(
    framesInTheCanvas,
    async frameDoc =>
      await runFrameIconsFactory({
        frameDoc,
        figmaFile,
        ...rest
      })
  )

  // prepare the lockFile content
  await saveLockFile(
    listOfProcessedIcons.reduce((acc, { iconName, ...cur }) => {
      acc[iconName] = cur
      return acc
    }, {})
  )

  return listOfProcessedIcons
}

const runFrameIconsFactory = async ({
  frameDoc,
  figmaFile,
  forceReconvert = null
}) => {
  const frameId = frameDoc.id
  const originalFrameName = String(frameDoc.name).replace(/^[0-9]+_/g, '') // because the frame name conains a number first
  const frameName = formatIconName(originalFrameName)

  // select all icons in the frame
  const frameDocChildren = iconSelector
    ? findAllNodes(frameDoc, { name: new RegExp(iconSelector) })
    : frameDoc.children

  // get a list of icons we want to refetch
  const iconIdsFromDoc = frameDocChildren.reduce((acc, { id, name }) => {
    if (!/#skip/.test(name)) {
      acc.push(id)
    }
    return acc
  }, [])

  // check if lock file exists
  const oldLockFileContent = await readLockFile()

  // this may be controversielt, but it's kind of a short way to use the lock file
  // to fetch icons by using the url in the lock file
  // this way we do not lay on that we have a cached version
  // This is done to optimize the CI process
  const listOfIconUrls = Object.entries(oldLockFileContent)
    .filter(
      ([file, { id, url, slug }]) =>
        file && id && url && slug === md5(figmaFile + frameId)
    )
    // deifine the same format as we get from "getFigmaUrlByImageIds"
    .map(([file, { id, url }]) => [id, url, file])

  // remove the IDs if they are in the lock file so we dont need to refetch the urls
  const iconIdsToFetchFrom = iconIdsFromDoc.filter(
    refId => !listOfIconUrls.some(([id]) => id === refId)
  )
  // console.log('\n listOfIconUrls', listOfIconUrls)
  // console.log('\niconIdsFromDoc', iconIdsFromDoc)
  // console.log('\niconIdsToFetchFrom', iconIdsToFetchFrom)

  log.start(
    `> Figma: Starting to fetch ${
      iconIdsToFetchFrom.length
    } icons from the "${originalFrameName}" Canvas`
  )

  // console.log('\n\niconIdsToFetchFrom', iconIdsToFetchFrom, iconIdsFromDoc)

  // go and load additional images
  const listOfAdditionalIconUrls = Object.entries(
    await getFigmaUrlByImageIds({
      figmaFile,
      ids: iconIdsToFetchFrom
    })
  )

  const listOfIconsToProcess = listOfIconUrls
    .concat(listOfAdditionalIconUrls)
    // clean the list of icons we will process
    // my making shure it is in the current figma frame document
    .filter(([id]) => frameDocChildren.find(({ id: i }) => i === id))

  // split frameName, and use all after the selector/s as iconName additions
  const iconNameAdditions = String(originalFrameName)
    .split(sizeSeperator)
    .slice(1)
    .map(n =>
      String(n)
        .trim()
        .toLowerCase()
    ) // remove space arround the names
    .filter(n => n !== 'default') // we don't use default size once we save it to size

  log.start(
    `> Figma: Starting to fetch process ${
      listOfIconsToProcess.length
    } icons`
  )

  const listOfProcessedIcons = await asyncForEach(
    listOfIconsToProcess,
    async ([id, url]) => {
      try {
        const { name } = frameDocChildren.find(({ id: i }) => i === id)
        const iconName = prepareIconName(name, iconNameAdditions)

        // deifine the filePath
        const filePath = path.resolve(iconsDest, iconName)

        // check if frame content exists in the lock file
        const lockFileFrameContent =
          (oldLockFileContent && oldLockFileContent[iconName]) || null

        const ret = {
          iconName,
          id,
          name, // layer name
          url,
          // timestamp: Date.now(),
          slug: md5(figmaFile + frameId),
          frame: frameName
        }

        if (
          forceReconvert !== true &&
          // compare the current id with the one in the lock file
          // if the id is the same, and the file exists, this version is not changed
          (lockFileFrameContent && lockFileFrameContent.id === id) &&
          // and also compare for the frameId, as they may have been upadted
          (lockFileFrameContent &&
            lockFileFrameContent.slug === md5(figmaFile + frameId)) &&
          fs.existsSync(filePath)
        ) {
          log.text = `> Figma: File already exists: ${iconName}`
        } else {
          log.text = `> Figma: Saving file to disk: ${iconName}`

          const { file } = await safeFileToDisk(
            {
              file: filePath,
              url,
              id // id is not used for now
            },
            {
              errorExceptionType: ERROR_HARMLESS
            }
          )

          await optimizeSVG({ file })

          ret.timestamp = Date.now()

          log.info(`> Figma: Icon was prepared and saved: ${iconName}`)
        }

        return ret
      } catch (e) {
        log.fail(e)
        new ErrorHandler('Failed to process new icons', e)
      }
    }
  )

  return listOfProcessedIcons
}

const prepareIconName = (name, iconNameAdditions = []) => {
  let iconName = name

  // in case Icons have "[NAME] ..." somewhere
  if (iconSelector) {
    iconName = iconName.replace(new RegExp(iconSelector), '')
  }

  // in case there are frameName spesifications, then add them to the iconName
  if (iconNameAdditions && iconNameAdditions.length > 0) {
    // iconNameAdditions.unshift(iconName) // prepend the iconName to the array
    const iconNameAddition = iconNameAdditions
      .join('_') // then we comine the names
      .replace(/_$/, '') // make sure we never end up having _ at the end

    if (!iconName.includes(iconNameAddition)) {
      iconName = `${iconName}_${iconNameAddition}`
    }
  }

  // also, make sure we use underline, insted of hyphen and so on
  iconName = formatIconName(iconName)

  // make the frameName ready for creating a collection file for every frame
  iconName = `${iconName}.svg`

  return iconName
}

const optimizeSVG = ({ file }) => {
  const transformSvg = async content => {
    const plugins = [
      {
        removeAttrs: {
          attrs: [
            'fill' //remove all fills - if the instance has a defined background color, then things are not showing good. Then then have to allow this setting to be there
            // 'svg:fill'
            // 'svg:xmlns',
            // 'svg:width',
            // 'svg:height'
          ]
        }
      },
      { cleanupIDs: false },
      { removeViewBox: false },
      { removeDimensions: true }
    ]
    const svgo = new SVGOptim({
      plugins
    })
    const { data } = await svgo.optimize(String(content))
    return data
  }
  return new Promise((resolve, reject) => {
    gulp
      .src(file, { cwd: process.env.ROOT_DIR })
      .pipe(transform('utf8', transformSvg))
      .pipe(gulp.dest(path.dirname(file), { cwd: process.env.ROOT_DIR }))
      .on('end', resolve)
      .on('error', reject)
  })
}

const getIconCanvasDoc = ({ figmaDoc }) =>
  findNode(figmaDoc.document, {
    name: canvasName,
    type: 'CANVAS'
  })

const formatIconName = n =>
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
      console.log('Failed to read the lock file and parse the result', e)
    }
  }
  return {}
}

export const saveLockFile = async data =>
  await saveToFile(lockFileDest, JSON.stringify(data))
