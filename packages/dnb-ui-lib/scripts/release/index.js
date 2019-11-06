/**
 * Relase file
 *
 */

import dotenv from 'dotenv'
import semanticRelease from 'semantic-release'
import { WritableStreamBuffer } from 'stream-buffers'
import prepareForRelease from './prepareForRelease'
import { release } from '../../package.json'

// import .env variables
dotenv.config()

// run the release
semanicRelease().then(({ error }) => {
  if (error) {
    // so we stop the CI process
    throw new Error(error)
  }
})

async function semanicRelease() {
  try {
    await prepareForRelease()

    const stdoutBuffer = new WritableStreamBuffer()
    const stderrBuffer = new WritableStreamBuffer()
    const result = await semanticRelease(release, {
      // Store stdout and stderr to use later instead of writing to `process.stdout` and `process.stderr`
      stdout: stdoutBuffer,
      stderr: stderrBuffer
    })

    // Get stdout and stderr content
    const logs = stdoutBuffer.getContentsAsString('utf8')
    const errors = stderrBuffer.getContentsAsString('utf8')

    if (logs) {
      console.log(logs)
    }
    if (errors) {
      console.error(errors)
    }

    if (result) {
      const { lastRelease, commits, nextRelease, releases } = result

      console.log(
        `Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`
      )

      if (lastRelease.version) {
        console.log(`The last release was "${lastRelease.version}".`)
      }

      console.log(releases)

      console.log('NPM Package Released.')
    } else {
      console.log('No release published.')
    }
  } catch (error) {
    console.error('The automated release failed with %O', error)

    return { error }
  }

  return { error: null }
}
