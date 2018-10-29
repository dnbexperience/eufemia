/**
 * Extract JSX form component
 *
 */

import path from 'path'
import fs from 'fs-extra'
import del from 'del'
import prettier from 'prettier'
// import * as reactDocs from 'react-docgen'

const extractJSX = (type = 'components', files) =>
  new Promise(async (resolve, reject) => {
    const root = path.resolve(__dirname, `../../${type}/examples`)
    try {
      await del([`${root}/**/*`, `!${root}`])
    } catch (e) {
      reject(e)
    }

    const erros = []

    // also, extract jsx content from example files
    files
      .filter(({ source, ...rest }) => {
        if (/not_in_use|__tests__/g.test(source)) {
          return false
        }
        return { source, ...rest }
      })
      .map(({ source, file }) => {
        let content
        try {
          content = fs.readFileSync(
            require.resolve(`${source}/Example.js`),
            'utf-8'
          )
        } catch (e) {
          console.log(`There was an error on creating ${content}!`, e)
          erros.push(e)
        }

        let jsxCode
        try {
          jsxCode = extractJsxFromRender({ content })
        } catch (e) {
          console.log(`There was an error on creating ${content}!`, e)
          erros.push(e)
        }

        const filePath = `${root}/${file.replace(/\.js/, '')}.txt`
        try {
          fs.writeFile(filePath, jsxCode || '')
        } catch (e) {
          console.log(`There was an error on creating ${filePath}!`, e)
        }

        return jsxCode
      })

    if (erros.length > 0) {
      reject(erros)
    }

    resolve(files)
    return files
  })
export default extractJSX

const extractJsxFromRender = ({
  content,
  nameOfClass = '[^]*Example[^]*'
}) => {
  try {
    // extract jsx
    const result = new RegExp(
      // `[^]*class ${nameOfClass} [^]*render[^]*return\\s{0,}\\(([^}]*)\\)`,
      `${nameOfClass}<Fragment.*[\n]+([^]*)<\\/Fragment>`,
      'gm'
    ).exec(content)

    // add Fragment to run prettier on it
    let jsxCode =
      (result && result[1]
        ? `<Fragment>${String(result[1]).trim()}</Fragment>`
        : '') || ''

    // simply remove attributes
    if (/data-fake/.test(jsxCode)) {
      jsxCode = jsxCode.replace(/attributes=[^}]*\}\}/gm, '')
    }
    jsxCode = prettier.format(jsxCode, {
      filepath: 'file.jsx',
      printWidth: 75
      // tabWidth: 2,
      // singleQuote: true,
      // bracketSpacing: true,
      // useTabs: false,
      // semi: false,
      // jsxBracketSameLine: false,
      // parser: 'babylon',
      // trailingComma: 'none'
    })

    // remove Fragment again
    jsxCode = new RegExp(`<Fragment>[\n]+([^]*)<\\/Fragment>`, 'gm').exec(
      jsxCode
    )

    // also remove spaces on the beginning
    if (jsxCode) {
      jsxCode = jsxCode[1] && jsxCode[1].replace(/^\s{2}/gm, '')
    }

    // done
    return jsxCode
  } catch (e) {
    console.log(
      `There was an error on extracting jsx from content ${content}!`,
      e
    )
    return null
  }
}
