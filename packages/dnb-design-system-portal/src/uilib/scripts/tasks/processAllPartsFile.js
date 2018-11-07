/**
 * Pack all aviable pages in one file
 *
 */

import path from 'path'
import fs from 'fs-extra'
import prettier from 'prettier'

const prettierrc = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../../../.prettierrc'),
    'utf-8'
  )
)

const processAllPartsFile = (type, files, { autoAdvice = '' }) => {
  // add missing file, since we filter it out for tempalting reson
  files = files.sort(({ file: a }, { file: b }) => (a > b ? 1 : -1))
  const importFiles = files.map(({ file: f }) => {
    f = f.replace(/\.js|\.md/, '')
    return `import ${f} from './${f}'`
  })
  const exportFiles = files.reduce((acc, { file: f }) => {
    acc.push(f.replace(/\.js|\.md/, ''))
    return acc
  }, [])
  const filepath = path.resolve(
    __dirname,
    `../../${type}/demos/allParts.js`
  )
  const content = prettier.format(
    `
${autoAdvice}

${importFiles.join('\n')}

export default [${exportFiles.join(', ')}]

`.trim(),
    {
      ...prettierrc,
      filepath
    }
  )
  fs.writeFile(filepath, content).then(() => {})
  console.log('Created also "allParts.js"')
}

export default processAllPartsFile
