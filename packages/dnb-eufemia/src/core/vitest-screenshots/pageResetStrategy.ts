export type PageResetStrategy = 'none' | 'reload' | 'navigate'

/**
 * Classifies how invasively the previous test mutated the page.
 *
 * - 'none'        – nothing happened that needs cleanup (first test on
 *                   a fresh navigation).
 * - 'structural'  – page state we can't trivially undo: a click that
 *                   may have toggled a modal/accordion, an
 *                   `executeBeforeSimulate` script, a `rootClassName`
 *                   change, or any unrecognised mutation. Triggers a
 *                   reload-or-navigate on the next test.
 */
export type PageMutationKind = 'none' | 'structural'

/**
 * Decides how to reset the page between screenshot tests based on the
 * mutation kind left by the previous test.
 */
export function getPageResetStrategyFromMutation({
  currentRetry,
  mutationKind,
  targetUrl,
  currentNavigatedUrl,
}: {
  currentRetry: number
  mutationKind: PageMutationKind
  targetUrl: string
  currentNavigatedUrl: string | null
}): PageResetStrategy {
  if (currentRetry > 0) {
    return 'navigate'
  }

  if (mutationKind !== 'structural') {
    return 'none'
  }

  return targetUrl === currentNavigatedUrl ? 'reload' : 'navigate'
}
