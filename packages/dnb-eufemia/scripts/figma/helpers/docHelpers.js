/**
 * Figma Task
 *
 */

import fs from 'fs-extra'
import https from 'https'
import path from 'path'
import { Client } from 'figma-js'
import traverse from 'traverse'
import isEqual from 'lodash.isequal'
import isEqualWith from 'lodash.isequalwith'
import Color from 'color'
import { ErrorHandler, ERROR_HARMLESS } from '../../lib/error'
import { log } from '../../lib'
import crypto from 'crypto'
import dotenv from 'dotenv'

// import .env variables
dotenv.config()

const Figma = Client({
  personalAccessToken: process.env.FIGMA_TOKEN,
})

export const fetchTextColor = (node) => {
  const vector = findNode(node, {
    name: 'text',
    // type: 'TEXT'
  })
  if (!vector) return null
  return Color(fetchColors(vector.fills)[0]).hex()
}
export const fetchFillColor = (node) => {
  const vector = findNode(node, {
    name: 'bg',
    // type: 'VECTOR'
  })
  if (!vector) return null
  return Color(fetchColors(vector.fills)[0]).hex()
}
export const fetchStrokes = (node) => {
  const vector = findNode(node, {
    name: 'bg',
    // type: 'VECTOR'
  })
  if (!vector) return null
  const { strokes, strokeWeight } = vector
  return {
    color: fetchColors(strokes)[0],
    weight: strokeWeight,
  }
}
export const fetchColors = (fills) => {
  return fills
    .map((fill) => {
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

export const fetchSize = (node) => {
  const { width, height } = node.absoluteBoundingBox
  return { width, height }
}
export const fetchText = (node) =>
  findNode(node, {
    type: 'TEXT',
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
    const findSuccess = findKeys.every((key) =>
      isEqualWith(tree[key], objToFindBy[key], customizer)
    )
    if (objToIgnoreBy) {
      const ignoreKeys = Object.keys(objToIgnoreBy)
      ignoreSuccess = ignoreKeys.some((key) =>
        isEqualWith(tree[key], objToIgnoreBy[key], customizer)
      )
    }
    if (findSuccess && !ignoreSuccess) {
      if (findFirst) {
        return (findFirst = tree)
      }
      objToReturn.push(tree)
    }
    if (Object.prototype.hasOwnProperty.call(tree, childrenKey)) {
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

export const getLiveVersionOfFigmaDoc = async ({ figmaFile }) => {
  try {
    const {
      data: { versions },
    } = await Figma.client.get(`files/${figmaFile}/versions`)
    // const versions = await Figma.versions() // not implemented yet

    return versions[0].id
  } catch (e) {
    ErrorHandler('Could not get version!', e)
  }
}

const saveLiveVersionOfFigmaDoc = async ({ figmaFile, version }) => {
  if (!version) {
    return null
  }
  try {
    const lockFile = path.resolve(__dirname, `../version.lock`)

    const existingLockFileContent = fs.existsSync(lockFile)
      ? JSON.parse((await fs.readFile(lockFile, 'utf-8')) || '{}')
      : {}
    const newLockFileContent = {
      [md5(figmaFile)]: version,
    }

    await fs.writeFile(
      lockFile,
      JSON.stringify({
        ...existingLockFileContent,
        ...newLockFileContent,
      })
    )
  } catch (e) {
    log.fail('Could not create a new "version.lock" file', e)
  }
}

export const getLocalVersionFromLockFile = async ({ figmaFile }) => {
  const lockFile = path.resolve(__dirname, `../version.lock`)
  try {
    if (fs.existsSync(lockFile)) {
      const fileContent = JSON.parse(await fs.readFile(lockFile, 'utf-8'))
      return fileContent[md5(figmaFile)]
    }
  } catch (e) {
    ErrorHandler('Could not get version from lock file!', e)
  }
  return null
}

export const getFigmaDoc = async ({
  figmaFile = null,
  localFile = null,
  forceRefetch = null,
  preventUpdate = null,
} = {}) => {
  if (
    !(typeof figmaFile === 'string' && figmaFile.length > 0) &&
    !localFile
  ) {
    ErrorHandler(
      'No Figma file defined. Make sure there is a .env file with a valid "figmaFile" defined!'
    )
  }

  const localDir = path.resolve(__dirname, `../.cache`)
  if (!localFile) {
    localFile = path.resolve(localDir, `${figmaFile}.json`)
  }

  log.start('> Figma: Fetching the figma doc')

  /**
   * Use "-u" to run force refetch
   */
  if (
    forceRefetch !== false &&
    process.argv.indexOf('--force-refetch') !== -1
  ) {
    forceRefetch = true
  }

  // Skip the cache checks
  if (forceRefetch !== true && preventUpdate !== true) {
    log.start('> Figma: Trying to get the newest online version')

    const liveVersion = await getLiveVersionOfFigmaDoc({
      figmaFile,
    })

    if (liveVersion) {
      const localVersion = await getLocalVersionFromLockFile({ figmaFile })

      log.info(
        `> Figma: Comparing old vs new version. (local version is ${localVersion})`
      )

      if (localVersion === liveVersion) {
        log.succeed(
          `> Figma: No newer version available. Both the local and online versions are ${liveVersion}`
        )
        return false
      } else {
        log.succeed(
          `> Figma: There is a new version available: ${liveVersion}`
        )
        await saveLiveVersionOfFigmaDoc({
          figmaFile,
          version: liveVersion,
        })
        forceRefetch = true
      }
    } else {
      log.fail('> Figma: Could not check for new version')
    }
  }

  // update if requested
  if (forceRefetch || !fs.existsSync(localFile)) {
    log.info(`> Figma: Fetching new doc from Figma ...`)
    try {
      const { data } = await Figma.file(figmaFile)
      const doRefetch = fs.existsSync(localFile)
      if (!fs.existsSync(localDir)) {
        await fs.mkdir(localDir)
      }
      await fs.writeFile(localFile, JSON.stringify(data, null, 2))

      log.succeed(`> Figma: Fetched new doc ${data.lastModified}`)

      data.doRefetch = doRefetch
      data.isNew = true
      return data
    } catch (e) {
      ErrorHandler(
        'Failed to client.file(figmaFile) and write the result with writeFile',
        e,
        ERROR_HARMLESS
      )
    }
  } else {
    log.succeed('> Figma: Using old Figma document')
  }

  try {
    return JSON.parse(await fs.readFile(localFile))
  } catch (e) {
    ErrorHandler('Failed to readFile and parse the result', e)
  }

  return null
}

export const getFigmaUrlByImageIds = async ({
  figmaFile,
  ids,
  params = {},
}) => {
  try {
    if (ids.length === 0) {
      return []
    }

    const {
      data: { images },
    } = await Figma.fileImages(figmaFile, {
      ids,
      format: 'svg',
      ...params,
    })

    return images
  } catch (e) {
    ErrorHandler('Failed on client.fileImages(figmaFile)', e)
  }
}

export const streamToDisk = (
  { file = '.tmp/file.json', url },
  { errorExceptionType = ERROR_HARMLESS }
) =>
  new Promise((resolve, reject) => {
    const streamHandler = ({ localFile, oldContent = null }) => {
      const writeStream = fs.createWriteStream(localFile)

      writeStream
        .on('error', (err) => {
          writeStream.end()
          reject(
            ErrorHandler(
              'Failed on createWriteStream',
              err,
              errorExceptionType
            )
          )
        })
        .on('finish', async () => {
          writeStream.close()

          const newContent = await fs.readFile(localFile, 'utf-8')
          const isEmpty = String(newContent).trim().length === 0

          if (isEmpty) {
            ErrorHandler(
              `streamToDisk failed because the stream did not end with content by using the url: ${url}`
            )
          }

          // reset the file, if its empty
          if (isEmpty) {
            if (oldContent) {
              await fs.writeFile(localFile, oldContent)
              ErrorHandler(`Using the old content for: ${localFile}`)
            } else {
              await fs.unlink(localFile)
            }
            resolve({ localFile })
          } else {
            resolve({ localFile, content: newContent })
          }
        })

      https
        .get(url, (response) => response.pipe(writeStream))
        .on('error', async (err) => {
          try {
            await fs.unlink(localFile)
          } catch (err) {
            reject(
              ErrorHandler('Failed on unlink', err, errorExceptionType)
            )
          }

          reject(
            ErrorHandler('Failed on streamToDisk', err, errorExceptionType)
          )
        })
    }

    const localFile = /\//.test(file)
      ? file
      : path.resolve(__dirname, `../.cache/${file}`)

    // Check if an old file exists, this way we can "reset" the file in case the stream fails during the data transfer
    fs.existsSync(localFile)
      ? fs.readFile(localFile, 'utf-8', (err, oldContent) => {
          if (err) {
            reject(
              ErrorHandler('Failed on readFile', err, errorExceptionType)
            )
          }

          streamHandler({ localFile, oldContent })
        })
      : streamHandler({ localFile })
  })

export const saveToFile = async (file, data) => {
  const localFile = /\//.test(file)
    ? file
    : path.resolve(__dirname, `../.cache/${file}`)
  await fs.writeFile(localFile, data)
}

export const getNodes = (doc, type = 'TEXT') => {
  const hasKey = (node, key) =>
    node && typeof node === 'object' && key in node
  return traverse
    .nodes(doc)
    .filter((node) => hasKey(node, 'type') && node.type === type)
}

export const md5 = (d) => crypto.createHash('md5').update(d).digest('hex')
