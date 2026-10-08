import { useCallback, useEffect, useRef, useState } from 'react'
import { copyToClipboard, warn } from '../../shared/helpers'

export default function useCopyToClipboard() {
  const timeoutRef = useRef<NodeJS.Timeout>(undefined)
  const [active, setActive] = useState(false)
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const copy = useCallback(async (str: string) => {
    clearTimeout(timeoutRef.current)

    try {
      // copyToClipboard returns an error or a message when it fails
      const success = (await copyToClipboard(str)) === true
      if (success) {
        setHasCopied(true)
        setActive(true)

        timeoutRef.current = setTimeout(() => setActive(false), 2000)
      }
    } catch (e) {
      warn('CopyOnClick: Failed to copy text to clipboard:', e)
    }
  }, [])

  return { active, hasCopied, copy }
}
