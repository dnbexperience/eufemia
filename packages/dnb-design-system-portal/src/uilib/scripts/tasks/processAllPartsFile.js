/**
 * Pack all aviable pages in one file
 *
 */

import path from 'path'
import fs from 'fs-extra'
// import del from 'del'

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
  fs.writeFile(
    path.resolve(__dirname, `../../${type}/demos/allParts.js`),
    `
${autoAdvice}

${importFiles.join('\n')}

export default [${exportFiles.join(', ')}]

`.trim()
  ).then(() => {})
  console.log('Created also "allParts.js"')
}

export default processAllPartsFile
