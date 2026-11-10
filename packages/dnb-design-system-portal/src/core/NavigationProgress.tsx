import { useEffect, useState } from 'react'
import { useNavigation } from 'react-router'
import { ProgressIndicator } from '@dnb/eufemia/src/components'
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
  const target =
    navigation.state === 'loading'
      ? navigation.location.pathname +
        navigation.location.search +
        navigation.location.hash
      : null
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
    const fallback = import.meta.env.DEV
      ? undefined
      : window.setTimeout(
          () => openDocument(target),
          DOCUMENT_FALLBACK_DELAY
        )

    return () => {
      window.clearTimeout(progress)
      window.clearTimeout(fallback)
    }
  }, [target, openDocument])

  if (!target || !showProgress) {
    return null
  }

  return (
    <div className={navigationProgressStyle}>
      <ProgressIndicator type="linear" size="small" />
    </div>
  )
}
