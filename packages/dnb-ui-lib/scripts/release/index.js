/**
 * Relase file
 *
 */

import dotenv from 'dotenv'
// import postpack from './postpack'
import semanticRelease from 'semantic-release'
import { WritableStreamBuffer } from 'stream-buffers'

// import .env variables
dotenv.config()

const semanicRelease = async () => {
  // await postpack()

  const stdoutBuffer = new WritableStreamBuffer()
  const stderrBuffer = new WritableStreamBuffer()

  try {
    const result = await semanticRelease(
      {
        // plugins: [
        //   [
        //     '@semantic-release/npm',
        //     {
        //       npmPublish: false,
        //       tarballDir: 'dist2'
        //     }
        //   ],
        //   [
        //     '@semantic-release/github',
        //     {
        //       assets: 'dist/*.tgz'
        //     }
        //   ]
        // ]
      },
      {
        // Store stdout and stderr to use later instead of writing to `process.stdout` and `process.stderr`
        stdout: stdoutBuffer,
        stderr: stderrBuffer
      }
    )

    if (result) {
      const { lastRelease, commits, nextRelease, releases } = result

      console.log(
        `Published ${nextRelease.type} release version ${
          nextRelease.version
        } containing ${commits.length} commits.`
      )

      if (lastRelease.version) {
        console.log(`The last release was "${lastRelease.version}".`)
      }

      console.debug(releases)
    } else {
      console.log('No release published.')
    }

    // Get stdout and stderr content
    const logs = stdoutBuffer.getContentsAsString('utf8')
    const errors = stderrBuffer.getContentsAsString('utf8')

    if (logs) console.log(logs)
    if (errors) console.log(errors)

    console.log('NPM Package Released')
  } catch (err) {
    console.error('The automated release failed with %O', err)
  }
}

semanicRelease()

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
