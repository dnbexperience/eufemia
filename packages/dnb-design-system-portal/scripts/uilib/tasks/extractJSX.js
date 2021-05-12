/**
 * Extract JSX form component
 *
 */

import path from 'path'
import fs from 'fs-extra'
import del from 'del'
import prettier from 'prettier'
import packpath from 'packpath'
// import * as reactDocs from 'react-docgen'

const extractJSX = async (type = 'components', files) => {
  const root = path.resolve(
    packpath.self(),
    `./src/uilib/${type}/examples`
  )
  try {
    await del([`${root}/**/*`, `!${root}`, `!${root}/README.txt`])
  } catch (e) {
    throw new Error(e)
  }

  const erros = []

  // also, extract jsx content from example files
  files
    .filter(({ source }) => !/not_in_use|__tests__/g.test(source))
    // prepare the JSX
    .map(({ source, file }) => {
      let content
      const exampleFile = path.resolve(`${source}/Example.js`)
      if (!fs.existsSync(exampleFile)) {
        return { file, jsxCode: null } // return empty JSX example
      }
      try {
        content = fs.readFileSync(exampleFile, 'utf-8')
      } catch (e) {
        console.log(`There was an error on creating ${content}!`, e)
        erros.push(e)
      }

      let jsxCode
      try {
        jsxCode = extractJSXFromRender({ content })
      } catch (e) {
        console.log(`There was an error on creating ${content}!`, e)
        erros.push(e)
      }

      return { file, jsxCode }
    })
    // save the example code
    .forEach(({ file, jsxCode }) => {
      const filePath = `${root}/${file.replace(/\.js/, '')}.txt`
      try {
        fs.writeFile(filePath, jsxCode || '')
      } catch (e) {
        console.log(`There was an error on creating ${filePath}!`, e)
      }
    })

  if (erros.length > 0) {
    throw new Error(erros)
  }

  return files
}
export default extractJSX

const extractJSXFromRender = ({
  content,
  nameOfClass = '[^]*Example[^]*',
}) => {
  try {
    // extract jsx - there has to be a Fragment
    const result = new RegExp(
      `${nameOfClass}<React.Fragment.*[\n]+([^]*)</React.Fragment>`,
      'gm'
    ).exec(content)

    let jsxCode = result && result[1] ? cleanCode(result[1]) : result

    // add Fragment to run prettier on it
    jsxCode = `<React.Fragment>${String(jsxCode).trim()}</React.Fragment>`

    try {
      jsxCode = prettier.format(jsxCode, {
        filepath: 'file.jsx',
        printWidth: 75,
        // tabWidth: 2,
        // singleQuote: true,
        // bracketSpacing: true,
        // useTabs: false,
        // semi: false,
        // jsxBracketSameLine: false,
        // parser: 'babel',
        // trailingComma: 'none'
      })
    } catch (e) {
      console.log('\nError on formatting code with Prettier:\n', jsxCode)
    }

    // remove Fragment again
    jsxCode = new RegExp(
      `<React.Fragment>[\n]+([^]*)<\\/React.Fragment>`,
      'gm'
    ).exec(jsxCode)

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

export const cleanCode = (
  jsxCode,
  { removeTag = '<div className="example-box">' } = {}
) => {
  // and remove example box markup
  if (removeTag && new RegExp(removeTag).test(jsxCode)) {
    jsxCode = jsxCode
      .split(new RegExp(removeTag, 'g'))
      .filter((row) => row.trim().length > 0)
      .map((row) =>
        row
          .trim()
          .replace(/<\/div>$/g, '')
          .replace(/<p className="example-caption">[^]*?<\/p>/g, '')
          .trim()
      )
      .join('\n')
  }
  // simply remove attributes
  if (/data-fake/.test(jsxCode)) {
    jsxCode = jsxCode.replace(/attributes=[^}]*\}\}/gm, '')
  }
  return jsxCode
}
