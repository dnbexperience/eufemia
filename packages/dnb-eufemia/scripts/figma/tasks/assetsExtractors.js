/**
 * Figma Task handlers
 *
 */

import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import SVGOptim from 'svgo'
import svg2vectordrawable from 'svg2vectordrawable/lib/svg-file-to-vectordrawable-file'
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
    { from: 'checkmark', to: 'check' }, // deprecated, can be removed in next minor versjon
    { from: 'repeat', to: 'refresh' }, // deprecated, can be removed in next minor versjon
    { from: 'document', to: 'file' }, // deprecated, can be removed in next minor versjon
    { from: 'more_horizontal', to: 'more' } // deprecated, can be removed in next minor versjon
  ]

  const iconCloneList = process.env.FIGMA_ICONS_CLONE_LIST || [
    // As of now, we only clone these icons
    { from: 'document', to: 'file' } // deprecated, can be removed in next minor versjon
  ]

  const canvasNameSelector =
    process.env.FIGMA_ICONS_PAGE_SELECTOR || /^Icons$/ // before we have used: ^[0-9]+[_\- ]Icons$
  const frameNameSelector =
    process.env.FIGMA_ICONS_FRAME_SELECTOR || /[A-z]+ - [0-9]{1,2}/
  const sizeSeparator =
    process.env.FIGMA_ICONS_FRAME_SIZE_SEPERATOR || /(.*)_[0-9]{1,2}/
  const iconSelector = process.env.FIGMA_ICONS_SELECTOR || null
  const iconNameCleaner =
    process.env.FIGMA_ICONS_NAME_SPLIT || /.*\/(.*)_[0-9]{1,2}/
  const ignoreAddingSizeList = ['basis', 'default']
  const imageUrlExpireAfterDays =
    process.env.FIGMA_ICONS_URL_EXPIRES_AFTER || 30
  const destDir = path.resolve(__dirname, '../../../assets/icons')
  const iconsLockFile = path.resolve(
    __dirname,
    `../../../src/icons/icons-svg.lock`
  )
  const getCategoryFromIconName = (name) => String(name).split(/\//)[0]

  return {
    canvasNameSelector,
    frameNameSelector,
    sizeSeparator,
    ignoreAddingSizeList,
    iconsLockFile,
    iconPrimaryList,
    iconRenameList,
    iconCloneList,
    iconSelector,
    iconNameCleaner,
    imageUrlExpireAfterDays,
    destDir,
    getCategoryFromIconName,
    ...overwrite
  }
}

export const extractIconsAsSVG = async ({
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

    const {
      iconsLockFile,
      ignoreAddingSizeList,
      iconRenameList,
      destDir
    } = IconsConfig()

    log.start(
      '> Figma: started to fetch SVGs icons by using frameIconsFactory'
    )

    const {
      listOfProcessedFiles,
      listWithNewFiles
    } = await collectIconsFromFigmaDoc({
      figmaFile,
      figmaDoc,
      format: 'svg',
      ...rest
    })

    log.info(
      `> Figma: finished fetching SVGs icons by using frameIconsFactory. Processed ${listOfProcessedFiles.length} files along with ${listWithNewFiles.length} new files.`
    )

    // save the lockFile content
    await saveIconsLockFile({
      file: iconsLockFile,
      data: listOfProcessedFiles.reduce((acc, { iconFile, ...cur }) => {
        acc[iconFile] = cur
        return acc
      }, {})
    })
    log.info(`> Figma: ${iconsLockFile} file got generated`)

    if (listWithNewFiles.length > 0) {
      await optimizeSVGIcons({ destDir, listWithNewFiles })
      await createXMLTarBundles({
        destDir,
        listOfProcessedFiles
      })
    }

    makeMetaFile({
      listOfProcessedFiles,
      ignoreAddingSizeList,
      figmaDoc,
      iconRenameList
    })

    return listOfProcessedFiles
  } catch (e) {
    log.fail(new ErrorHandler('extractIconsAsSVG failed', e))
  }
}

async function collectIconsFromFigmaDoc({ figmaDoc, figmaFile, ...rest }) {
  const { frameNameSelector, destDir } = IconsConfig()

  const canvasDoc = getIconCanvasDoc({ figmaDoc })
  const framesInTheCanvas = findAllNodes(canvasDoc, {
    type: 'FRAME'
  })

  const controllStorageLists = []
  const listWithNewFiles = []
  const listOfProcessedFiles = await asyncForEach(
    framesInTheCanvas,
    async (frameDoc) => {
      if (
        /#skip/.test(frameDoc.name) ||
        !frameNameSelector.test(frameDoc.name)
      ) {
        return // stop here
      }

      const { files, newFiles } = await frameIconsFactory({
        frameDoc,
        figmaFile,
        destDir,
        ...IconsConfig(),
        ...rest
      })

      controllStorageLists.push(files)
      listWithNewFiles.concat(newFiles)

      return files
    }
  )

  runDiffControll({ controllStorageLists })

  return {
    listWithNewFiles,
    listOfProcessedFiles
  }
}

const runDiffControll = ({ controllStorageLists }) => {
  const collectDiff = []
  const removeSizes = (n) => n.replace(/(_16|_24)$/, '')
  const getDiff = (a, b) =>
    a.filter(
      ({ name }) =>
        !b.some(({ name: n }) => removeSizes(n) === removeSizes(name))
    )

  controllStorageLists.forEach((cur, i, arr) => {
    getDiff(arr[0], cur).forEach(({ size, name }) => {
      collectDiff.push({ [size]: name })
    })
  })
  controllStorageLists.reverse().forEach((cur, i, arr) => {
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

export const extractIconsAsPDF = async ({
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

    log.start('> Figma: started to fetch PDFs by using frameIconsFactory')

    const destDir = path.resolve(__dirname, '../../../assets/icons')
    if (!fs.existsSync(destDir)) {
      fs.mkdir(destDir)
    }

    let tarFileSize = 0
    const tarFile = path.resolve(destDir, outputName)
    if (fs.existsSync(tarFile)) {
      tarFileSize = (await fs.stat(tarFile)).size
      await extract({
        cwd: destDir,
        file: tarFile
      })
    }

    const iconsLockFile = path.resolve(
      __dirname,
      '../../../src/icons/icons-pdf.lock'
    )

    const {
      listOfProcessedFiles,
      listWithNewFiles
    } = await collectIconsFromFigmaDoc({
      figmaFile,
      figmaDoc,
      format: 'pdf',
      ...IconsConfig({ iconsLockFile }),
      ...rest
    })

    log.info(
      `> Figma: finished fetching PDFs by using frameIconsFactory. Processed ${listOfProcessedFiles.length} files along with ${listWithNewFiles.length} new files.`
    )

    // save the lockFile content
    await saveIconsLockFile({
      file: iconsLockFile,
      data: listOfProcessedFiles.reduce((acc, { iconFile, ...cur }) => {
        acc[iconFile] = cur
        return acc
      }, {})
    })

    log.info(`> Figma: ${iconsLockFile} file got generated`)

    if (listOfProcessedFiles.length > 0) {
      log.info(`> Figma: started to create ${outputName}`)

      const hasSizeChanged = async () => {
        const fileList = listOfProcessedFiles.map(
          ({ iconFile }) => iconFile
        )

        const tmp = path.resolve(destDir, 'tmp.tgz')
        await create(
          {
            gzip: true,
            cwd: destDir,
            file: tmp
          },
          fileList
        )
        const tmpSize = (await fs.stat(tmp)).size

        await fs.unlink(tmp)

        return Math.abs(tarFileSize - tmpSize) > 30
      }

      const createTarWithoutCategories = async () => {
        const fileList = listOfProcessedFiles.map(
          ({ iconFile }) => iconFile
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
        const { getCategoryFromIconName } = IconsConfig()

        await asyncForEach(
          listOfProcessedFiles,
          async ({ name, iconFile }) => {
            const source = path.resolve(destDir, iconFile)
            const dest = path.resolve(
              destDir,
              `${getCategoryFromIconName(name)}/${iconFile}`
            )

            if (fs.existsSync(source)) {
              await fs.move(source, dest)
            }
          }
        )

        const fileList = listOfProcessedFiles.map(
          ({ name, iconFile }) =>
            `${getCategoryFromIconName(name)}/${iconFile}`
        )

        const tarFile = path.resolve(destDir, outputNameCategorized)
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

      const sizeHasChanged = await hasSizeChanged()
      if (sizeHasChanged) {
        await createTarWithoutCategories()
        await createTarWithCategories()
      }

      log.succeed(`> Figma: finished to create ${outputName}`)
    }

    // Remove the pdfs
    await asyncForEach(listOfProcessedFiles, async ({ iconFile }) => {
      const file = path.resolve(destDir, iconFile)
      if (fs.existsSync(file)) {
        try {
          await fs.unlink(file)
        } catch (e) {
          log.fail(new ErrorHandler(`Failed to remove ${iconFile}`, e))
        }
      }
    })

    return listOfProcessedFiles
  } catch (e) {
    log.fail(new ErrorHandler('extractIconsAsPDF failed', e))
  }
}

const frameIconsFactory = async ({
  frameDoc,
  figmaFile,
  destDir,
  forceRedownload = null,
  format = 'svg',
  sizeSeparator,
  iconsLockFile,
  iconSelector,
  iconPrimaryList,
  iconCloneList,
  imageUrlExpireAfterDays,
  ignoreAddingSizeList
}) => {
  const newFiles = []
  const existingFiles = []

  const frameId = frameDoc.id
  const originalFrameName = String(frameDoc.name)
    // because the frame name contains a number first
    .replace(/^[0-9]+[_\- ]/g, '')
  const size = formatIconName(originalFrameName).replace(
    sizeSeparator,
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
      updated
    }))

  // remove the IDs if they are in the lock file so we font need to refetch the urls
  const iconIdsToFetchFrom = iconIdsFromDoc.filter((_id) => {
    const found = listOfCachedIconUrls.find(({ id }) => id === _id)

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
      ids: iconIdsToFetchFrom,
      params: { format }
    })
  ).map(([id, url]) => ({
    id,
    url
  }))

  const rawListOfIconsToProcess = listOfCachedIconUrls
    .concat(listOfAdditionalIconUrls)
    // clean the list of icons we will process
    .map(({ id, url }) => {
      return {
        ...frameDocChildren.find(({ id: i }) => i === id),
        url
      }
    })
    // by making sure it is in the current Figma frame document
    .filter((item) => item && item.url)

  const listOfIconsToProcess = iconCloneList.reduce((acc, cur) => {
    const found = acc.find(({ name }) =>
      new RegExp(`(^|/)${cur.from}(_[0-9]|$)`).test(name)
    )
    if (found && found.name) {
      acc.push({
        ...found,
        name: found.name.replace(new RegExp(cur.from), cur.to)
      })
    }

    return acc
  }, rawListOfIconsToProcess)

  log.start(
    `> Figma: Starting to fetch process ${listOfIconsToProcess.length} icons`
  )

  const listOfProcessedFiles = (
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
              id // id is not used for now
            },
            {
              errorExceptionType: ERROR_HARMLESS
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
              new ErrorHandler(
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

            log.info(
              `> Figma: Saved file ${iconFile} (ID=${id}, CREATED=${ret.created})`
            )
            newFiles.push(ret)
          }
        }

        return ret
      } catch (e) {
        log.fail(new ErrorHandler('Failed to process new icons', e))
      }
    })
  ).filter(Boolean)

  return { size, files: listOfProcessedFiles, newFiles, existingFiles }
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
    log.fail(
      `\nReserved name found for icon "${iconName}" – it got renamed to "${iconName}_1".\n\n\n`
    )
  }

  if (size && !ignoreAddingSizeList.includes(size)) {
    iconName = `${iconName}_${size}`
    log.fail(
      `\nSize for icon "${iconName}" was not found – added "${iconName}_${size}".\n\n\n`
    )
  }

  return iconName
}

const prerenderIconFile = (name, format = 'svg') => {
  // make the frameName ready for creating a collection file for every frame
  return `${name}.${format}`
}

const makeMetaFile = async ({
  listOfProcessedFiles,
  ignoreAddingSizeList,
  figmaDoc,
  iconRenameList
}) => {
  // save the metaFile content
  await saveIconsMetaFile(
    listOfProcessedFiles.reduce(
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
}

const createXMLTarBundles = async ({
  floatPrecision = 3, // If undefined, the default precision is 2
  destDir,
  listOfProcessedFiles,
  outputName = 'eufemia-icons-xml.tgz',
  outputNameCategorized = 'eufemia-icons-xml-categorized.tgz'
}) => {
  log.info(`> Figma: started to create ${outputName}`)

  let tarFileSize = 0
  const tarFile = path.resolve(destDir, outputName)
  if (fs.existsSync(tarFile)) {
    tarFileSize = (await fs.stat(tarFile)).size
    await extract({
      cwd: destDir,
      file: tarFile
    })
  }

  listOfProcessedFiles = listOfProcessedFiles.map(
    ({ iconFile, ...rest }) => {
      const iconFileXML = iconFile.replace(/\.svg$/, '.xml')
      return { iconFileXML, iconFile, ...rest }
    }
  )

  const convertSvgToXml = async () => {
    await asyncForEach(
      listOfProcessedFiles,
      async ({ iconFile, iconFileXML }) => {
        const source = path.resolve(destDir, iconFile)
        const dest = path.resolve(destDir, iconFileXML)

        await svg2vectordrawable(source, dest, floatPrecision)
      }
    )
  }

  const removeGeneratedXmlFiles = async () => {
    await asyncForEach(listOfProcessedFiles, async ({ iconFileXML }) => {
      const file = path.resolve(destDir, iconFileXML)
      if (fs.existsSync(file)) {
        await fs.unlink(file)
      }
    })
  }

  const hasSizeChanged = async () => {
    const fileList = listOfProcessedFiles.map(
      ({ iconFileXML }) => iconFileXML
    )

    const tmp = path.resolve(destDir, 'tmp.tgz')
    await create(
      {
        gzip: true,
        cwd: destDir,
        file: tmp
      },
      fileList
    )
    const tmpSize = (await fs.stat(tmp)).size

    await fs.unlink(tmp)

    return Math.abs(tarFileSize - tmpSize) > 30
  }

  const createTarWithoutCategories = async () => {
    const fileList = listOfProcessedFiles.map(
      ({ iconFileXML }) => iconFileXML
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
    const { getCategoryFromIconName } = IconsConfig()

    await asyncForEach(
      listOfProcessedFiles,
      async ({ name, iconFileXML }) => {
        const source = path.resolve(destDir, iconFileXML)
        const dest = path.resolve(
          destDir,
          `${getCategoryFromIconName(name)}/${iconFileXML}`
        )

        if (fs.existsSync(source)) {
          await fs.move(source, dest)
        }
      }
    )

    const fileList = listOfProcessedFiles.map(
      ({ name, iconFileXML }) =>
        `${getCategoryFromIconName(name)}/${iconFileXML}`
    )

    const tarFile = path.resolve(destDir, outputNameCategorized)
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

  await convertSvgToXml()
  const sizeHasChanged = await hasSizeChanged()

  if (sizeHasChanged) {
    await createTarWithoutCategories()
    await createTarWithCategories()
  }

  await removeGeneratedXmlFiles()

  log.succeed(`> Figma: finished to create ${outputName}`)
}

const optimizeSVGIcons = async ({ destDir, listWithNewFiles }) => {
  await asyncForEach(
    listWithNewFiles,
    async ({ iconFile, created, updated }) => {
      const file = path.resolve(destDir, iconFile)
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
      //       // we can use this method
      //       // '*:(fill)|((?!^none$).)*'
      //       // remove all fills - if the instance has a defined background color, then things are not showing good. Then then have to allow this setting to be there
      //       'fill'
      //       // 'stroke' // for now, we don't remove stroke
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
  'document',
  'window'
]
