import { useEffect, useState } from 'react'
import { useNavigation } from 'react-router'
import { AriaLive, ProgressIndicator } from '@dnb/eufemia/src/components'
import { navigationProgressStyle } from './NavigationProgress.module.scss'

// Fast navigations finish before the indicator would flash.
const PROGRESS_DELAY = 300

// A page chunk that never arrives would otherwise leave the click without a result.
export const DOCUMENT_FALLBACK_DELAY = 8000

type NavigationProgressProps = {
  openDocument?: (url: string) => void
}

function assignLocation(url: string) {
  window.location.assign(url)
}

export default function NavigationProgress({
  openDocument = assignLocation,
}: NavigationProgressProps) {
  const navigation = useNavigation()
  const location =
    navigation.state === 'loading' ? navigation.location : null

  // Prerendered pages are directories, so this skips the server's slash redirect.
  const target = location
    ? location.pathname.replace(/\/?$/, '/') +
      location.search +
      location.hash
    : null
  const navigationKey = location?.key
  const [showProgress, setShowProgress] = useState(false)

  useEffect(() => {
    setShowProgress(false)

    if (!target) {
      return undefined
    }

    const progress = window.setTimeout(
      () => setShowProgress(true),
      PROGRESS_DELAY
    )

    // Cold dev-server transforms can be slow without anything being stuck.
    if (import.meta.env.DEV) {
      return () => window.clearTimeout(progress)
    }

    let fallback: number
    const scheduleFallback = () => {
      window.clearTimeout(fallback)
      fallback = window.setTimeout(() => {
        // Offline, the browser would replace the page with its error page.
        if (navigator.onLine) {
          openDocument(target)
        }
      }, DOCUMENT_FALLBACK_DELAY)
    }

    // A finished response means a slow connection is still making progress.
    const observer = new PerformanceObserver(scheduleFallback)
    observer.observe({ type: 'resource' })

    // A reload would discard what the user typed on the current page.
    const cancelFallback = () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
    document.addEventListener('input', cancelFallback, true)

    scheduleFallback()

    return () => {
      window.clearTimeout(progress)
      cancelFallback()
      document.removeEventListener('input', cancelFallback, true)
    }
  }, [target, navigationKey, openDocument])

  const loading = Boolean(target && showProgress)

  return (
    <>
      {loading && (
        <div className={navigationProgressStyle}>
          <ProgressIndicator type="linear" size="small" />
        </div>
      )}
      <AriaLive>{loading ? 'Loading page' : null}</AriaLive>
    </>
  )
}
