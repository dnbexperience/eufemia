/**
 * Node
 *
 */

import gulp from 'gulp'
import path from 'path'
// import rename from 'gulp-rename'
import transform from 'gulp-transform'
import SVGOptim from 'svgo'
import { ERROR_HARMLESS } from '../../lib/error'
import { log } from '../../lib'

const selector = process.env.FIGMA_ICONS_SELECTOR || 'icon ' // before we used "icon--"
const frameName = process.env.FIGMA_ICONS_FRAME || 'Icons' // before we used "dnb-ui-icons"

import {
  getFigmaImages,
  safeFileToDisk,
  findNode,
  findAllNodes
} from '../helpers/docHelpers'

export const IconsConverter = async ({
  figmaFile,
  figmaToken,
  figmaDoc,
  doRefetch = true
}) => {
  let images = {},
    ids = []

  const iconsDoc = getIconsDoc({ figmaDoc })

  const iconsDocChildren = findAllNodes(iconsDoc, {
    name: new RegExp(selector)
    // type: /COMPONENT|FRAME/
  })
  iconsDocChildren.forEach(({ id, name }) => {
    if (!/#skip/.test(name)) {
      ids.push(id)
      images[id] = { id, name }
    }
  })

  log.text = `> Figma: Starting to fetch ${ids.length} images`

  const fetchResult = await getFigmaImages({
    figmaFile,
    figmaToken,
    ids,
    doRefetch
  })
  const listOfNodes = Object.entries(fetchResult)

  log.text = `> Figma: Starting to convert: ${listOfNodes.length} images`

  listOfNodes.forEach(([id, url]) => {
    images[id] = { ...images[id], url }
  })

  const listOfImages = Object.entries(images)

  await asyncForEach(listOfImages, async ([id, { name, url }]) => {
    if (name === undefined) return

    // also, make sure we use underline, insted of hyphen
    let fileName = name.replace(selector, '').replace(/-/g, '_')

    // Test if we have slashes, to define sizes, like it's best pratise in figma
    if (/\//.test(fileName)) {
      fileName = fileName
        .split(/\//)
        .filter(n => n !== 'default') // we don't use default size once we save it to size
        .reverse()
        .join('_')
    }

    const fileToSave = `../../../src/assets/icons/${fileName}.svg`
    const filePath = path.resolve(__dirname, fileToSave)

    log.text = `> Figma: Saving file to disk: ${fileToSave}`

    try {
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
      log.text = `> Figma: Starting to optimize image: ${file}`
      await optimizeSVG({ file })
      log.text = `> Figma: Optimizing image done: ${file}`
    } catch (e) {
      log.fail(e)
    }
  })

  return listOfImages
}

const asyncForEach = async (array, callback) => {
  for (let i = 0, l = array.length; i < l; ++i) {
    await callback(array[i], i, array)
  }
}

const optimizeSVG = ({ file }) => {
  const transformSvg = async content => {
    const plugins = [
      {
        removeAttrs: {
          attrs: [
            'fill' //remove all fills
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

const getIconsDoc = ({ figmaDoc }) =>
  findNode(figmaDoc.document, {
    name: frameName
  })
