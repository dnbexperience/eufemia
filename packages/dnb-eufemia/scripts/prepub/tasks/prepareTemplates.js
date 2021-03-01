/**
 * Insert all the components/elements/extensions into the main lib index file
 * By using a template
 *
 */

import fs from 'fs-extra'
import path, { join as joinPath } from 'path'
import camelCase from 'camelcase'
import prettier from 'prettier'
import { ErrorHandler, log } from '../../lib'
import { asyncForEach } from '../../tools'

const prettierrc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc'), 'utf-8')
)

const prepareTemplates = async () => {
  log.start('> PrePublish: Starting the index template lib factory ...')

  // process components
  const componentsTemplateConfig = {
    templateObjectToFill: '{ Template }',
    templateListToExtend: `import Template from './template/Template'`,
    templateListToExtendBy: 'Template',
    srcFile: path.resolve(
      __dirname,
      '../../../src/core/templates/components-index-template.js'
    ),
    destFile: path.resolve(__dirname, '../../../src/components/index.js'),
    processToNamesList: path.resolve(
      __dirname,
      '../../../src/components/'
    ),
    processToNamesIgnoreList: ['web-components', 'fragments', 'style'],
    processToNamesListByUsingFolders: true
  }
  const components = await runFactory(componentsTemplateConfig).then(
    (res) => {
      if (require.main === module) {
        log.succeed(
          '> PrePublish: Created the index template with all the components'
        )
      }
      return res
    }
  )
  await runFactory({
    ...componentsTemplateConfig,
    ...{
      srcFile: path.resolve(
        __dirname,
        '../../../src/core/templates/components-lib-template.js'
      ),
      destFile: path.resolve(__dirname, '../../../src/components/lib.js')
    }
  }).then((res) => {
    if (require.main === module) {
      log.succeed(
        '> PrePublish: Created the index template with all the components'
      )
    }
    return res
  })
  await runFactory({
    ...componentsTemplateConfig,
    ...{
      srcFile: path.resolve(
        __dirname,
        '../../../src/core/templates/component-export-template.js'
      ),
      destFile: false,
      destPath: path.resolve(__dirname, '../../../src/components')
    }
  }).then((res) => {
    if (require.main === module) {
      log.succeed(
        '> PrePublish: Created the index template with all the components'
      )
    }
    return res
  })

  // process fragments
  const fragmentsTemplateConfig = {
    templateObjectToFill: '{ Template }',
    templateListToExtend: `import Template from './template/Template'`,
    templateListToExtendBy: 'Template',
    srcFile: path.resolve(
      __dirname,
      '../../../src/core/templates/components-index-template.js'
    ),
    destFile: path.resolve(__dirname, '../../../src/fragments/index.js'),
    processToNamesList: path.resolve(__dirname, '../../../src/fragments/'),
    processToNamesIgnoreList: ['web-components', 'style'],
    processToNamesListByUsingFolders: true
  }
  await runFactory(fragmentsTemplateConfig).then((res) => {
    if (require.main === module) {
      log.succeed(
        '> PrePublish: Created the index template with all the fragments'
      )
    }
    return res
  })
  await runFactory({
    ...fragmentsTemplateConfig,
    ...{
      srcFile: path.resolve(
        __dirname,
        '../../../src/core/templates/fragments-lib-template.js'
      ),
      destFile: path.resolve(__dirname, '../../../src/fragments/lib.js')
    }
  }).then((res) => {
    if (require.main === module) {
      log.succeed(
        '> PrePublish: Created the index template with all the fragments'
      )
    }
    return res
  })
  await runFactory({
    ...fragmentsTemplateConfig,
    ...{
      srcFile: path.resolve(
        __dirname,
        '../../../src/core/templates/component-export-template.js'
      ),
      destFile: false,
      destPath: path.resolve(__dirname, '../../../src/fragments')
    }
  }).then((res) => {
    if (require.main === module) {
      log.succeed(
        '> PrePublish: Created the index template with all the fragments'
      )
    }
    return res
  })

  // process elements
  const elementsTemplateConfig = {
    templateObjectToFill: '{ Template }',
    templateListToExtend: `import Template from './Template'`,
    templateListToExtendBy: 'Template',
    srcFile: path.resolve(
      __dirname,
      '../../../src/core/templates/elements-index-template.js'
    ),
    destFile: path.resolve(__dirname, '../../../src/elements/index.js'),
    processToNamesList: path.resolve(__dirname, '../../../src/elements/'),
    processToNamesIgnoreList: ['index', 'lib', 'Element'],
    processToNamesListByUsingFolders: false
  }
  const elements = await runFactory(elementsTemplateConfig).then((res) => {
    if (require.main === module) {
      log.info('> Created the index template with all the elements')
    }
    return res
  })
  await runFactory({
    ...elementsTemplateConfig,
    ...{
      srcFile: path.resolve(
        __dirname,
        '../../../src/core/templates/elements-lib-template.js'
      ),
      destFile: path.resolve(__dirname, '../../../src/elements/lib.js')
    }
  }).then((res) => {
    if (require.main === module) {
      log.info('> Created the index template with all the elements')
    }
    return res
  })

  // process extensions
  const extensionsTemplateConfig = {
    templateObjectToFill: '{ Template }',
    templateListToExtend: `import Template from './template/Template'`,
    templateListToExtendBy: 'Template',
    srcFile: path.resolve(
      __dirname,
      '../../../src/core/templates/components-index-template.js'
    ),
    destFile: path.resolve(__dirname, '../../../src/extensions/index.js'),
    processToNamesList: path.resolve(
      __dirname,
      '../../../src/extensions/'
    ),
    processToNamesIgnoreList: ['web-components', 'style'],
    processToNamesListByUsingFolders: true
  }
  // we dont export extensions anymore!
  await runFactory(extensionsTemplateConfig).then((res) => {
    if (require.main === module) {
      log.info('> Created the index template with all the extensions')
    }
    return res
  })
  await runFactory({
    ...extensionsTemplateConfig,
    ...{
      srcFile: path.resolve(
        __dirname,
        '../../../src/core/templates/extensions-lib-template.js'
      ),
      destFile: path.resolve(__dirname, '../../../src/extensions/lib.js')
    }
  }).then((res) => {
    if (require.main === module) {
      log.info('> Created the lib template with all the extensions')
    }
    return res
  })

  // fix the glory main index
  await runFactory({
    templateObjectToFill: '{ Template }',
    templateListToExtend: `import Template from './{type}/template/Template'`,
    templateListToExtendBy: 'Template',
    srcFile: path.resolve(
      __dirname,
      '../../../src/core/templates/main-index-template.js'
    ),
    destFile: path.resolve(__dirname, '../../../src/index.js'),
    processToNamesList: [...components, ...elements],
    transformNamesList: ({ result }) => {
      // because elements don't have a folder, we remove the last part of the path
      if (/\/elements\//.test(result)) {
        return result.replace(/\/[^/]+\/?$/g, "'")
      }
    }
  }).then((res) => {
    if (require.main === module) {
      log.info('> Created the main index with all the libs')
    }
    return res
  })
}

const autoAdvice =
  '/**\n * ATTENTION: This file is auto generated by using "prepareTemplates".\n * Do not change the content!\n *\n */\n\n'

const runFactory = async ({
  templateObjectToFill = '{ Template }',
  templateListToExtend,
  templateListToExtendBy,
  srcFile,
  destFile,
  destPath = null,
  processToNamesList,
  processToNamesIgnoreList = [],
  processToNamesListByUsingFolders = false,
  transformNamesList = null
}) => {
  if (typeof processToNamesList === 'string') {
    const __orig__processToNamesList = processToNamesList
    processToNamesList = (await fs.readdir(processToNamesList))
      .filter((file) => !/\.(cjs|ts)$/.test(file))
      .map((file) => ({
        source: joinPath(__orig__processToNamesList, file),
        file
      }))
    if (processToNamesListByUsingFolders) {
      processToNamesList = processToNamesList.filter(({ source }) =>
        fs.lstatSync(source).isDirectory()
      )
    } else {
      processToNamesList = processToNamesList
        .filter(({ source }) => fs.lstatSync(source).isFile())
        .map(({ file, ...rest }) => {
          file = file.replace(/\.js$/, '')
          return { file, ...rest }
        })
    }
    processToNamesList = processToNamesList
      .filter(({ file }) => {
        if (/not_in_use|__tests__/g.test(file)) {
          return false
        }
        return !processToNamesIgnoreList.includes(file)
      })
      .sort(({ file: a }, { file: b }) => (a > b ? 1 : -1))
  }

  const template = await fs.readFile(srcFile, 'utf-8')

  if (destPath) {
    await asyncForEach(processToNamesList, async ({ file }) => {
      const destFile = path.resolve(
        destPath,
        `${camelCase(file, { pascalCase: true })}.js`
      )

      try {
        // replace the content in the template
        const content = template
          .trim()
          // 1. replace templateListToExtendBy
          .replace(
            new RegExp(templateListToExtendBy, 'g'),
            camelCase(file, { pascalCase: true })
          )
          // 2. replace templateListToExtendBy, but lower case
          .replace(
            new RegExp(templateListToExtendBy.toLowerCase(), 'g'),
            file
          )

        await fs.writeFile(
          destFile,
          prettier.format(`${autoAdvice}${content}`, {
            ...prettierrc,
            parser: 'babel'
          })
        )
      } catch (e) {
        log.fail(`There was an error on creating ${destFile}!`)
        new ErrorHandler(e)
      }
    })
  }

  if (destFile) {
    // replace the content in the template
    const content = template
      .trim()
      // 1. replace templateObjectToFill
      .replace(
        new RegExp(templateObjectToFill, 'g'),
        `{ ${processToNamesList
          .map(({ file }) => camelCase(file, { pascalCase: true }))
          .join(', ')} }`
      )
      // 2. replace templateListToExtend
      .replace(
        new RegExp(templateListToExtend, 'g'),
        processToNamesList
          .map(({ file, source }) => {
            let res = templateListToExtend
              .replace(
                new RegExp(templateListToExtendBy, 'g'),
                camelCase(file, { pascalCase: true })
              )
              .replace(
                new RegExp(templateListToExtendBy.toLowerCase(), 'g'),
                file
              )

            // in case we have a type to replace
            if (/\{type\}/.test(res)) {
              const type = source.trim('/').split(/\//g).slice(-2, -1)[0]
              res = res.replace(new RegExp('{type}', 'g'), type)
            }

            if (typeof transformNamesList === 'function') {
              const transformedResult = transformNamesList({
                file,
                source,
                result: res
              })
              if (transformedResult) {
                res = transformedResult
              }
            }

            return res
          })
          .join('\n')
      )
    try {
      await fs.writeFile(
        destFile,
        prettier.format(`${autoAdvice}${content}`, {
          ...prettierrc,
          parser: 'babel'
        })
      )
    } catch (e) {
      log.fail(`There was an error on creating ${destFile}!`)
      new ErrorHandler(e)
    }
  }

  return processToNamesList
}

if (require.main === module && process.env.NODE_ENV !== 'test') {
  log.start()
  prepareTemplates().then(() => {
    log.succeed()
  })
}

export { prepareTemplates }
