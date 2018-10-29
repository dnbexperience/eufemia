/**
 * Node
 *
 */

import fs from 'fs-extra'
import https from 'https'
import path from 'path'
import * as Figma from 'figma-js'
import traverse from 'traverse'
import isEqual from 'lodash.isequal'
import isEqualWith from 'lodash.isequalwith'
import fileOlderThan from 'file-older-than'
import Color from 'color'
import { ErrorHandler, ERROR_HARMLESS, ERROR_FATAL } from '../../lib/error'
import { log } from '../../lib'

const defaultFigmaToken = process.env.FIGMA_TOKEN
const defaultFigmaFile = process.env.FIGMA_MAIN_FILE
const defaultCacheTime = process.env.FIGMA_CACHE_TIME || '1d'

export const fetchTextColor = node => {
  const vector = findNode(node, {
    name: 'text'
    // type: 'TEXT'
  })
  if (!vector) return null
  return Color(fetchColors(vector.fills)[0]).hex()
}
export const fetchFillColor = node => {
  const vector = findNode(node, {
    name: 'bg'
    // type: 'VECTOR'
  })
  if (!vector) return null
  return Color(fetchColors(vector.fills)[0]).hex()
}
export const fetchStrokes = node => {
  const vector = findNode(node, {
    name: 'bg'
    // type: 'VECTOR'
  })
  if (!vector) return null
  const { strokes, strokeWeight } = vector
  return {
    color: fetchColors(strokes)[0],
    weight: strokeWeight
  }
}
export const fetchColors = fills => {
  return fills
    .map(fill => {
      return fill.color
    })
    .reduce((acc, c) => {
      acc.push(
        Color([c.r * 255, c.g * 255, c.b * 255, c.a]).hex()
        // .rgb()
        // .string()
      )
      return acc
    }, [])
}

export const fetchSize = node => {
  const { width, height } = node.absoluteBoundingBox
  return { width, height }
}
export const fetchText = node =>
  findNode(node, {
    type: 'TEXT'
  })

export const findAll = (
  tree,
  childrenKey,
  objToFindBy,
  objToIgnoreBy = null,
  findFirst = false
) => {
  const objToReturn = []
  if (!tree) return objToReturn
  const customizer = (objValue, othValue) => {
    // is RegExp
    if (String(othValue)[0] === '/') {
      return othValue.test(objValue)
    }
    return isEqual(objValue, othValue)
  }
  const innerFunc = (tree, childrenKey, objToFindBy, objToIgnoreBy) => {
    let ignoreSuccess = false
    const findKeys = Object.keys(objToFindBy)
    // find the first matching key
    // const findSuccess = findKeys.some(key =>
    //   isEqualWith(tree[key], objToFindBy[key], customizer)
    // )
    // make sure we match all
    const findSuccess = findKeys.every(key =>
      isEqualWith(tree[key], objToFindBy[key], customizer)
    )
    if (objToIgnoreBy) {
      const ignoreKeys = Object.keys(objToIgnoreBy)
      ignoreSuccess = ignoreKeys.some(key =>
        isEqualWith(tree[key], objToIgnoreBy[key], customizer)
      )
    }
    if (findSuccess && !ignoreSuccess) {
      if (findFirst) {
        return (findFirst = tree)
      }
      objToReturn.push(tree)
    }
    if (tree.hasOwnProperty(childrenKey)) {
      for (let n of tree[childrenKey]) {
        innerFunc(n, childrenKey, objToFindBy, objToIgnoreBy)
      }
    }
  }
  innerFunc(tree, childrenKey, objToFindBy, objToIgnoreBy)
  if (findFirst) return typeof findFirst === 'boolean' ? null : findFirst
  return objToReturn
}

export const findFirst = (tree, childrenKey, objToFindBy, objToIgnoreBy) =>
  findAll(tree, childrenKey, objToFindBy, objToIgnoreBy, true)

export const findNode = (doc, find, ignore = null) =>
  findFirst(doc, 'children', find, ignore)
export const findAllNodes = (doc, find, ignore = null) =>
  findAll(doc, 'children', find, ignore)

export const getFigmaDoc = async ({
  figmaFile = defaultFigmaFile,
  figmaToken = defaultFigmaToken,
  localFile = null,
  doRefetch = null
}) => {
  if (!localFile && !figmaFile) {
    new ErrorHandler(
      'No Figma Main File defined. Make sure there is a .env file with a valid FIGMA_MAIN_FILE defined!'
    )
  }

  const localDir = path.resolve(__dirname, `../files`)
  if (!localFile) {
    localFile = path.resolve(localDir, `${figmaFile}.json`)
  }

  log.start('> Figma: Fetching the figma doc')

  // update if requested
  if (
    doRefetch ||
    (doRefetch !== false &&
      (!fs.existsSync(localFile) ||
        fileOlderThan(localFile, defaultCacheTime)))
  ) {
    if (!figmaToken) {
      new ErrorHandler(
        'No Figma Token found. Make sure there is a .env file with the FIGMA_TOKEN inside!'
      )
    }
    log.text = `> Figma: Fetching new doc from Figma ...`
    const client = Figma.Client({
      personalAccessToken: figmaToken
    })
    try {
      const { data } = await client.file(figmaFile)
      if (!fs.existsSync(localDir)) {
        await fs.mkdir(localDir)
      }
      await fs.writeFile(localFile, JSON.stringify(data, null, 2))
      log.succeed(`> Figma: Fetched new doc ${data.lastModified}`)
    } catch (e) {
      new ErrorHandler(
        'Failed to client.file(figmaFile) and write the result with writeFile',
        e,
        ERROR_HARMLESS
      )
    }
  } else {
    log.succeed('> Figma: Using old doc')
  }

  try {
    return JSON.parse(await fs.readFile(localFile))
  } catch (e) {
    new ErrorHandler('Failed to readFile and parse the result', e)
  }

  return null
}

export const getFigmaImages = async ({
  figmaFile,
  figmaToken,
  ids,
  params,
  doRefetch = null
}) => {
  try {
    if (ids.length === 0) {
      return []
    }
    const localFile = path.resolve(
      __dirname,
      `../files/${figmaFile}-images.json`
    )

    // get the files from the cache
    if (
      doRefetch ||
      (doRefetch !== false &&
        (!fs.existsSync(localFile) ||
          fileOlderThan(localFile, defaultCacheTime))) // e.g., '5m', '20w', '300d30h10m5s'
    ) {
      const client = Figma.Client({
        personalAccessToken: figmaToken
      })

      const {
        data: { images }
      } = await client.fileImages(figmaFile, {
        ids,
        format: 'svg',
        ...params
      })

      // cahce the files data
      await saveToFile(localFile, JSON.stringify(images))

      return images
    }

    return JSON.parse(await fs.readFile(localFile))
  } catch (e) {
    new ErrorHandler('Failed on client.fileImages(figmaFile)', e)
  }
}

export const safeFileToDisk = (
  { file = '.tmp/file.json', url },
  { errorExceptionType = ERROR_FATAL }
) =>
  new Promise(resolve => {
    const localFile = /\//.test(file)
      ? file
      : path.resolve(__dirname, `../files/${file}`)
    const stream = fs.createWriteStream(localFile)
    stream.on('error', err => {
      stream.end()
      new ErrorHandler(
        'Failed on createWriteStream',
        err,
        errorExceptionType
      )
    })
    stream.on('finish', () => {
      stream.close()
      resolve({ file: localFile })
    })
    https
      .get(url, response => {
        response.pipe(stream)
      })
      .on('error', async err => {
        try {
          await fs.unlink(localFile)
        } catch (err) {
          new ErrorHandler('Failed on unlink', err, errorExceptionType)
        }
        new ErrorHandler(
          'Failed on safeFileToDisk',
          err,
          errorExceptionType
        )
      })
  })

export const saveToFile = async (file, data) => {
  const localFile = /\//.test(file)
    ? file
    : path.resolve(__dirname, `../files/${file}`)
  await fs.writeFile(
    localFile,
    typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  )
}

export const getNodes = (doc, type = 'TEXT') => {
  const hasKey = (node, key) =>
    node && typeof node === 'object' && key in node
  return traverse
    .nodes(doc)
    .filter(node => hasKey(node, 'type') && node.type === type)
}
