export type PageResetStrategy = 'none' | 'reload' | 'navigate'

export function getPageResetStrategy({
  currentRetry,
  needsHardReset,
  targetUrl,
  currentNavigatedUrl,
}: {
  currentRetry: number
  needsHardReset: boolean
  targetUrl: string
  currentNavigatedUrl: string | null
}): PageResetStrategy {
  if (currentRetry > 0) {
    return 'navigate'
  }

  if (!needsHardReset) {
    return 'none'
  }

  return targetUrl === currentNavigatedUrl ? 'reload' : 'navigate'
}
