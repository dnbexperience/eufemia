/**
 * Relase file
 *
 */

import dotenv from 'dotenv'
import semanticRelease from 'semantic-release'
import { WritableStreamBuffer } from 'stream-buffers'
import prepareForRelease from './prepareForRelease'

// import .env variables
dotenv.config()

const semanicRelease = async () => {
  try {
    await prepareForRelease()

    const stdoutBuffer = new WritableStreamBuffer()
    const stderrBuffer = new WritableStreamBuffer()
    const result = await semanticRelease(
      {},
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
