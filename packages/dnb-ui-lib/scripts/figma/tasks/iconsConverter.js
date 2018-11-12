/**
 * Node
 *
 */

import fs from 'fs-extra'
import gulp from 'gulp'
import path from 'path'
// import rename from 'gulp-rename'
import transform from 'gulp-transform'
import SVGOptim from 'svgo'
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
  figmaDoc,
  figmaFile = defaultFigmaFile,
  doRefetch = null,
  ...rest
}) => {
  if (!figmaDoc || doRefetch) {
    figmaDoc = await getFigmaDoc({ figmaFile, doRefetch })
    if (figmaDoc.isNew) {
      doRefetch = true
    }
  }

  const canvasDoc = getIconCanvasDoc({ figmaDoc })
  let listOfImagesToLoad = []

  const framesInTheCanvas = findAllNodes(canvasDoc, {
    type: 'FRAME'
  })

  await asyncForEach(framesInTheCanvas, async frameDoc => {
    listOfImagesToLoad = listOfImagesToLoad.concat(
      await runCanvasIconsFactory({
        // canvasDoc,
        frameDoc,
        figmaFile,
        doRefetch,
        ...rest
      })
    )
  })

  return listOfImagesToLoad
}

const runCanvasIconsFactory = async ({
  // canvasDoc,
  frameDoc,
  figmaFile,
  doRefetch = null,
  forceReconvert = null
}) => {
  const frameId = frameDoc.id
  const originalFrameName = frameDoc.name
  const frameName = formatIconName(originalFrameName)

  // select all icons in the frame
  const frameDocChildren = iconSelector
    ? findAllNodes(frameDoc, { name: new RegExp(iconSelector) })
    : frameDoc.children

  // fill the empty containers
  const ids = frameDocChildren.reduce((acc, { id, name }) => {
    if (!/#skip/.test(name)) {
      acc.push(id)
    }
    return acc
  }, [])

  log.text = `> Figma: Starting to fetch ${
    ids.length
  } images from the ${originalFrameName} Canvas`

  const listWithIconsUrls = await getFigmaUrlByImageIds({
    figmaFile,
    frameId,
    ids,
    doRefetch
  })

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

  // check if lock file exists
  const oldLockFileContent = await readLockFile()

  const listOfImagesToLoad = Object.entries(listWithIconsUrls).filter(
    ([id]) => frameDocChildren.find(({ id: i }) => i === id)
  )

  const listOfLoadedImages = await asyncForEach(
    listOfImagesToLoad,
    async ([id, url]) => {
      try {
        const { name } = frameDocChildren.find(({ id: i }) => i === id)
        const iconName = prepareIconName(name, iconNameAdditions)

        // deifine the filePath
        const filePath = path.resolve(iconsDest, iconName)

        // check if frame content exists in the lock file
        const lockFileFrameContent =
          (oldLockFileContent && oldLockFileContent[iconName]) || null

        if (
          forceReconvert !== true &&
          // compare the current id with the one in the lock file
          // if the id is the same, and the file exists, this version is not changed
          (lockFileFrameContent && lockFileFrameContent.id === id) &&
          // and also compare for the frameId, as they may have been upadted
          (lockFileFrameContent &&
            lockFileFrameContent.slug === md5(frameId)) &&
          fs.existsSync(filePath)
        ) {
          log.text = `> Figma: File already exists: ${iconName}`
          // log.info(`${iconName} ${url}`)
          return null
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

          log.info(`> Figma: Icon was converted: ${iconName}`)

          return {
            iconName,
            id,
            name, // layer name
            // url, // dont save url in lock file for now!
            timestamp: Date.now(),
            slug: md5(frameId),
            frame: frameName
          }
        }
      } catch (e) {
        log.fail(e)
        new ErrorHandler('Failed to process new icons', e)
      }
    }
  )

  const newLockFileContent = listOfLoadedImages

  // marge and make a new lockFile content
  if (newLockFileContent.length > 0) {
    const lockFileContent = newLockFileContent.reduce(
      (acc, { iconName, ...cur }) => {
        acc[iconName] = cur
        return acc
      },
      {}
    )

    await saveLockFile({
      ...oldLockFileContent,
      ...lockFileContent
    })
  }

  return newLockFileContent
}

const asyncForEach = async (array, callback) => {
  const res = []
  for (let i = 0, l = array.length; i < l; ++i) {
    res.push(await callback(array[i], i, array))
  }
  return res.filter(i => i)
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
      // .pipe(
      //   rename({
      //     suffix: '.opt'
      //   })
      // )
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
    .replace(/[^a-z_]/g, '_')
    .replace(/\s|_{2,}/g, '_')

const lockFileDest = path.resolve(
  __dirname,
  `../../../src/icons/icons.lock`
)
export const readLockFile = async () => {
  if (fs.existsSync(lockFileDest)) {
    try {
      return JSON.parse(await fs.readFile(lockFileDest, 'utf-8'))
    } catch (e) {
      console.log('Failed to read the lock file and parse the result', e)
    }
  }
  return {}
}

export const saveLockFile = async data =>
  await saveToFile(lockFileDest, JSON.stringify(data))
