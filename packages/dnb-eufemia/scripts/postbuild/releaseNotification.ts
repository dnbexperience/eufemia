import {
  appendFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
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
    const notifications: Array<ReleaseNotification> = existsSync(file)
      ? JSON.parse(readFileSync(file, 'utf8'))
      : []
    const { version, gitTag, channel } = nextRelease
    notifications.push({
      version,
      gitTag,
      channel,
      commits: commits.map(({ hash, message }) => ({ hash, message })),
    })
    writeFileSync(file, JSON.stringify(notifications))
  } catch {
    logger.warn('Could not save release notification details')
  }
}
