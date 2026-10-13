import { useState } from 'react'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'

// Created after mount, so server-rendered HTML hydrates without a mismatch
export default function useObjectUrl(file?: File) {
  const [url, setUrl] = useState<string>(null)

  useIsomorphicLayoutEffect(() => {
    if (!(file?.size > 0)) {
      return undefined // stop here
    }

    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
      setUrl(null)
    }
  }, [file])

  return url
}
