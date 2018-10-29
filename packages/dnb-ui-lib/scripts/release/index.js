/**
 * Relase file
 *
 */

import postpack from './postpack'

postpack()

// TODO: We may later do someting during the relase process
// import fs from 'fs'
// import path from 'path'

// if (fs.existsSync(path.resolve(__dirname, '../lib'))) {
//   const versionFilePath = path.resolve(
//     process.cwd(),
//     'lib',
//     'version',
//     'index.js'
//   )
//   const versionFileContent = fs.readFileSync(versionFilePath).toString()
//
//   fs.writeFileSync(
//     versionFilePath,
//     versionFileContent.replace(
//       `require('../../package.json')`,
//       `{ version: '${packageInfo.version}' }`
//     )
//   )
//   console.log('Wrote version into lib/version/index.js')
// }

console.log('NPM Release')
