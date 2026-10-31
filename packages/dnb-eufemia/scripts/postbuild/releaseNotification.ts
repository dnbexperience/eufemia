import {
  appendFileSync,
  closeSync,
  constants,
  ftruncateSync,
  openSync,
  readFileSync,
  writeSync,
} from 'node:fs'
import type { SuccessContext } from 'semantic-release'

export type ReleaseNotification = {
  version: string
  gitTag: string
  channel?: string | null
  commits: Array<{ hash: string; message: string }>
}

// Capture the same commits for new releases and channel promotions.
export function success(
  _config: unknown,
  { nextRelease, commits, env, logger }: SuccessContext
) {
  const file = env.RELEASE_NOTIFICATION_FILE
  if (!file) {
    return
  }

  try {
    if (env.GITHUB_OUTPUT) {
      appendFileSync(env.GITHUB_OUTPUT, 'notifications=true\n')
    }
    const descriptor = openSync(
      file,
      constants.O_RDWR | constants.O_CREAT | constants.O_NOFOLLOW,
      0o600
    )
    try {
      const content = readFileSync(descriptor, 'utf8')
      const notifications: Array<ReleaseNotification> = content
        ? JSON.parse(content)
        : []
      const { version, gitTag, channel } = nextRelease
      notifications.push({
        version,
        gitTag,
        channel,
        commits: commits.map(({ hash, message }) => ({ hash, message })),
      })
      const data = Buffer.from(JSON.stringify(notifications))
      let written = 0
      while (written < data.length) {
        written += writeSync(
          descriptor,
          data,
          written,
          data.length - written,
          written
        )
      }
      ftruncateSync(descriptor, written)
    } finally {
      closeSync(descriptor)
    }
  } catch {
    logger.warn('Could not save release notification details')
  }
}
