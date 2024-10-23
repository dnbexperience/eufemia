import { useContext, useMemo } from 'react'
import {
  DefaultErrorMessages,
  GlobalErrorMessagesWithPaths,
  Path,
} from '../types'
import Context from '../DataContext/Context'

/** @deprecated – can be removed in v11 */
export default function useErrorMessage(
  path: Path,
  errorMessages: DefaultErrorMessages | GlobalErrorMessagesWithPaths,
  defaultErrorMessages: Record<`${string}.${string}`, string>
) {
  const context = useContext(Context)

  return useMemo(() => {
    const fromContext = context?.contextErrorMessages
    return {
      ...defaultErrorMessages,
      ...fromContext,
      ...fromContext?.[path],
      ...errorMessages,
    }
  }, [
    context?.contextErrorMessages,
    path,
    defaultErrorMessages,
    errorMessages,
  ])
}
