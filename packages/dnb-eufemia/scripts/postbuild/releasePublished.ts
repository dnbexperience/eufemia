import { appendFileSync } from 'node:fs'
import type { PublishContext } from 'semantic-release'

// Listed right after @semantic-release/npm, and semantic-release stops at the
// first publish plugin that fails, so this only runs once `npm publish` has
// succeeded. It must never fail itself: the GitHub release is published after it.
export function publish(
  _config: unknown,
  { nextRelease, env, logger }: PublishContext
) {
  try {
    if (env.GITHUB_OUTPUT) {
      appendFileSync(
        env.GITHUB_OUTPUT,
        `published=${nextRelease.version}\n`
      )
    }
  } catch {
    logger.warn('Could not record the published version')
  }

  return false
}
