/**
 * Make Demos Factory
 *
 */

import fs from 'fs-extra'
import del from 'del'
import { join as joinPath } from 'path'
import camelCase from 'camelcase'

const autoAdvice = '/* ATTENTION: This file is auto generated! */'

export default async function runFactory({
  templateNameToRename,
  tempalteFilePath = null,
  processDestFilePath,
  processDestFileFilter = v => v,
  preprocessContent = null,
  processDestFileExt = '.js',
  processDestFileContent = null,
  processToNamesList,
  processToNamesIgnoreList = [],
  processToNamesListByUsingFolders = false,
  prepareDestFileCallback = null,
  removeFiles = false
}) {
  // remove all files, but keep they we need
  if (removeFiles) {
    let removeFilesList = [
      `${processDestFilePath}/**`,
      `!${processDestFilePath}`,
      `!${processDestFilePath}/index.js`,
      `!${processDestFilePath}/README.txt`,
      `!${tempalteFilePath}`
    ]
    // .concat(keepFiles.map(f => ('!**/' + f).replace('//', '/')))
    if (Array.isArray(removeFiles)) {
      removeFilesList = removeFilesList.concat(removeFiles)
    }
    await del(removeFilesList)
  }

  if (typeof processToNamesList === 'string') {
    const __orig__processToNamesList = processToNamesList
    processToNamesList = await fs.readdir(processToNamesList)
    processToNamesList = processToNamesList
      .filter(file => {
        if (/not_in_use|__tests__/g.test(file)) {
          return false
        }
        return !processToNamesIgnoreList.includes(file)
      })
      .map(file => ({
        source: joinPath(__orig__processToNamesList, file),
        file
      }))
    if (processToNamesListByUsingFolders) {
      processToNamesList = processToNamesList.filter(({ source }) =>
        fs.lstatSync(source).isDirectory()
      )
    } else {
      processToNamesList = processToNamesList.filter(({ source }) =>
        fs.lstatSync(source).isFile()
      )
    }
  } else if (Array.isArray(processToNamesList)) {
    processToNamesList = processToNamesList.map(file => ({
      source: joinPath(
        processDestFilePath,
        `${file}${processDestFileExt}`
      ),
      file
    }))
  }
  if (!tempalteFilePath)
    tempalteFilePath = `${processDestFilePath}/${templateNameToRename.toLowerCase()}.js`
  const template = await fs.readFile(tempalteFilePath, 'utf-8')

  const listComponents = processToNamesList.map(({ source, file }) => {
    const fileName = file.replace(/(\.js|\.md)$/, '')
    // const name = camelCase(fileName, { pascalCase: true })
    const content = template
      .trim()
      .replace(
        new RegExp(templateNameToRename, 'g'),
        camelCase(fileName, { pascalCase: true })
      )
      .replace(
        new RegExp(templateNameToRename.toLowerCase(), 'g'),
        fileName.toLowerCase()
      )
    file.replace(/(\.js|\.md)$/, '')
    if (typeof prepareDestFileCallback === 'function')
      file = prepareDestFileCallback(file)
    file = `${file}${processDestFileExt}`
    return {
      source,
      file,
      fileName,
      // name,
      content
    }
  })

  const listSuccesses = listComponents
    .filter(processDestFileFilter)
    .sort(({ file: a }, { file: b }) => (a > b ? 1 : -1))
    .reduce(async (success, { source, file, content }, i) => {
      success = await success
      const filePath = `${processDestFilePath}/${file}`
      try {
        if (typeof preprocessContent === 'function')
          content = preprocessContent({ source, file, content })
        await fs.writeFile(
          filePath,
          typeof processDestFileContent === 'function'
            ? processDestFileContent(content, i)
            : `${String(autoAdvice).trim()}\n${content}`
        )
        success.push({ source, file, filePath, content })
      } catch (e) {
        console.log(`There was an error on creating ${filePath}!`, e)
      }
      return success
    }, [])

  const res = await listSuccesses
  const files = res.map(({ file }) => file)

  console.log(
    `Processed ${files.length} files!\n--- Files ---\n${files.join(
      '\n'
    )}\n-------------`
  )

  return res
}
