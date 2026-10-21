import { warn } from '../../../../shared/helpers'
import type { SharedStateId } from '../../../../shared/helpers/useSharedState'
import { isServerEnvironment } from '../../../../shared/helpers/useSharedState'

// A WeakMap for object ids, so ids created per request can be garbage collected
const warnedObjects = new WeakMap<object, Set<string>>()
const warnedKeys = new Set<string>()

function isFirstWarning(helper: string, id: SharedStateId) {
  if (
    (typeof id === 'object' && id !== null) ||
    typeof id === 'function'
  ) {
    if (!warnedObjects.has(id)) {
      warnedObjects.set(id, new Set())
    }
    const helpers = warnedObjects.get(id)
    if (helpers.has(helper)) {
      return false
    }
    helpers.add(helper)
    return true
  }

  const key = `${helper}:${String(id)}`
  if (warnedKeys.has(key)) {
    return false
  }
  warnedKeys.add(key)
  return true
}

/**
 * Warns once per helper and id when an imperative data helper runs on the server.
 * On the server, form data lives in the store of each render,
 * which these helpers cannot reach.
 */
export function warnOnServer(
  helper: string,
  id: SharedStateId,
  message: string
) {
  // Check the environment first, so the browser does no more work than before
  if (!isServerEnvironment() || process.env.NODE_ENV === 'production') {
    return
  }

  if (!isFirstWarning(helper, id)) {
    return
  }

  const name = typeof id === 'string' ? `${helper}('${id}')` : helper
  warn(`${name} ${message}`)
}
