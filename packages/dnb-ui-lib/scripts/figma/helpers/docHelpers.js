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
import { ErrorHandler, ERROR_HARMLESS, ERROR_FATAL } from '../../lib/error'
import { log } from '../../lib'
import crypto from 'crypto'
import dotenv from 'dotenv'
import packpath from 'packpath'

// import .env variables
dotenv.config()

process.env.ROOT_DIR = packpath.self()

export const defaultFigmaToken = process.env.FIGMA_TOKEN
// export const defaultFigmaFile = process.env.FIGMA_MAIN_FILE
export const defaultFigmaFile = '2aNwT4Lbyt9hFmDv8k34yN'

const Figma = Client({
  personalAccessToken: defaultFigmaToken
})

export const fetchTextColor = (node) => {
  const vector = findNode(node, {
    name: 'text'
    // type: 'TEXT'
  })
  if (!vector) return null
  return Color(fetchColors(vector.fills)[0]).hex()
}
export const fetchFillColor = (node) => {
  const vector = findNode(node, {
    name: 'bg'
    // type: 'VECTOR'
  })
  if (!vector) return null
  return Color(fetchColors(vector.fills)[0]).hex()
}
export const fetchStrokes = (node) => {
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

export const getLiveVersionOfFigmaDoc = async ({ figmaFile = null }) => {
  if (!figmaFile) {
    figmaFile = defaultFigmaFile
  }
  try {
    const {
      data: { versions }
    } = await Figma.client.get(`files/${figmaFile}/versions`)
    // const versions = await Figma.versions() // not implemented yet

    return versions[0].id
  } catch (e) {
    console.log('Could not get version!', e)
  }
}

const saveLiveVersionOfFigmaDoc = async ({
  figmaFile = null,
  version
}) => {
  if (!figmaFile) {
    figmaFile = defaultFigmaFile
  }
  if (!version) {
    return null
  }
  try {
    const lockFile = path.resolve(__dirname, `../version.lock`)

    const existingLockFileContent = fs.existsSync(lockFile)
      ? JSON.parse((await fs.readFile(lockFile, 'utf-8')) || '{}')
      : {}
    const newLockFileContent = {
      [md5(figmaFile)]: version
    }

    await fs.writeFile(
      lockFile,
      JSON.stringify({
        ...existingLockFileContent,
        ...newLockFileContent
      })
    )
  } catch (e) {
    log.fail('Could not create a new "version.lock" file', e)
  }
}

export const getLocalVersionFromLockFile = async ({
  figmaFile = null
}) => {
  if (!figmaFile) {
    figmaFile = defaultFigmaFile
  }
  const lockFile = path.resolve(__dirname, `../version.lock`)
  try {
    if (fs.existsSync(lockFile)) {
      const fileContent = JSON.parse(await fs.readFile(lockFile, 'utf-8'))
      return fileContent[md5(figmaFile)]
    }
  } catch (e) {
    console.log('Could not get version from lock file!', e)
  }
  return null
}

export const getFigmaDoc = async ({
  figmaFile = null,
  localFile = null,
  forceRefetch = null,
  preventUpdate = null
} = {}) => {
  if (!figmaFile) {
    figmaFile = defaultFigmaFile
  }

  if (
    !(typeof figmaFile === 'string' && figmaFile.length > 0) &&
    !localFile
  ) {
    new ErrorHandler(
      'No Figma Main File defined. Make sure there is a .env file with a valid FIGMA_MAIN_FILE defined!'
    )
  }

  const localDir = path.resolve(__dirname, `../.cache`)
  if (!localFile) {
    localFile = path.resolve(localDir, `${figmaFile}.json`)
  }

  log.start('> Figma: Fetching the figma doc')

  if (forceRefetch !== false && process.argv.indexOf('-u') !== -1) {
    forceRefetch = true
  }

  if (forceRefetch !== true && preventUpdate !== true) {
    log.start('> Figma: Trying to get the newest online version')

    const liveVersion = await getLiveVersionOfFigmaDoc({
      figmaFile
    })

    if (liveVersion) {
      const localVersion = await getLocalVersionFromLockFile({ figmaFile })

      log.info(
        `> Figma: Comparing old vs new version. (local version is ${localVersion})`
      )

      if (localVersion === liveVersion) {
        log.succeed(
          `> Figma: No newer version aviable. Both the local and online versions are ${liveVersion}`
        )
        return false
      } else {
        log.succeed(
          `> Figma: There is a new version aviable: ${liveVersion}`
        )
        await saveLiveVersionOfFigmaDoc({
          figmaFile,
          version: liveVersion
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
      new ErrorHandler(
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
    new ErrorHandler('Failed to readFile and parse the result', e)
  }

  return null
}

export const getFigmaUrlByImageIds = async ({
  figmaFile,
  ids,
  params = {}
}) => {
  try {
    if (ids.length === 0) {
      return []
    }

    const {
      data: { images }
    } = await Figma.fileImages(figmaFile, {
      ids,
      format: 'svg',
      ...params
    })

    return images

    // return JSON.parse(await fs.readFile(localFile))
  } catch (e) {
    new ErrorHandler('Failed on client.fileImages(figmaFile)', e)
  }
}

export const safeFileToDisk = async (
  { file = '.tmp/file.json', url },
  { errorExceptionType = ERROR_FATAL }
) => {
  const localFile = /\//.test(file)
    ? file
    : path.resolve(__dirname, `../.cache/${file}`)
  const resetContent = fs.existsSync(localFile)
    ? await fs.readFile(localFile, 'utf-8')
    : null
  const writeStream = fs.createWriteStream(localFile)
  writeStream
    .on('error', (err) => {
      writeStream.end()
      new ErrorHandler(
        'Failed on createWriteStream',
        err,
        errorExceptionType
      )
    })
    .on('finish', async () => {
      writeStream.close()

      // reset the file, if its empty
      if (resetContent) {
        const newContent = await fs.readFile(localFile, 'utf-8')
        if (String(newContent).trim().length === 0) {
          await fs.writeFile(localFile, resetContent)
        }
      }

      return { localFile }
    })
  https
    .get(url, (response) => response.pipe(writeStream))
    .on('error', async (err) => {
      try {
        await fs.unlink(localFile)
      } catch (err) {
        new ErrorHandler('Failed on unlink', err, errorExceptionType)
      }
      new ErrorHandler('Failed on safeFileToDisk', err, errorExceptionType)
    })
}

export const saveToFile = async (file, data) => {
  const localFile = /\//.test(file)
    ? file
    : path.resolve(__dirname, `../.cache/${file}`)
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
    .filter((node) => hasKey(node, 'type') && node.type === type)
}

export const md5 = (d) => crypto.createHash('md5').update(d).digest('hex')
