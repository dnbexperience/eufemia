import { useRef, useCallback } from 'react'

/**
 * Keep track of possible parallel processes to avoid issues
 */
export default function useProcessManager() {
  const tokenRef = useRef<number>()

  const startProcess = useCallback(() => {
    const processToken = Math.floor(Math.random() * 100000)
    tokenRef.current = processToken

    // If another process was started after this one code can skip further steps to avoid race conditions
    // that could lead to overwriting state in the wrong order.
    const isProcessActive = () => tokenRef.current === processToken

    return isProcessActive
  }, [])

  return {
    startProcess,
  }
}
