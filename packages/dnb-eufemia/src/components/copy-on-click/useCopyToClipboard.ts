import { useCallback, useEffect, useRef, useState } from 'react'
import { copyToClipboard, warn } from '../../shared/helpers'

export default function useCopyToClipboard() {
  const timeoutRef = useRef<NodeJS.Timeout>(undefined)
  const [active, setActive] = useState(false)
  const [copyCount, setCopyCount] = useState(0)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const copy = useCallback(async (str: string) => {
    try {
      // copyToClipboard returns an error or a message when it fails
      const success = (await copyToClipboard(str)) === true
      if (success) {
        clearTimeout(timeoutRef.current)
        setCopyCount((count) => count + 1)
        setActive(true)

        timeoutRef.current = setTimeout(() => setActive(false), 2000)
      }
    } catch (e) {
      warn('CopyOnClick: Failed to copy text to clipboard:', e)
    }
  }, [])

  return { active, copyCount, copy }
}
