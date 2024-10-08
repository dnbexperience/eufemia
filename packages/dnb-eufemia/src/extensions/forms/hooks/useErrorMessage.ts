import { useContext, useMemo } from 'react'
import {
  DefaultErrorMessages,
  CustomErrorMessagesWithPaths,
  Path,
} from '../types'
import Context from '../DataContext/Context'

/**
 * Custom hook that retrieves error messages based on the provided path and error configurations.
 *
 * @param path - The path to the error messages in the configuration.
 * @param errorMessages - Custom error messages with paths.
 * @param defaultErrorMessages - Default error messages.
 * @returns An object containing the merged error messages.
 */
export default function useErrorMessage(
  path: Path,
  errorMessages: DefaultErrorMessages | CustomErrorMessagesWithPaths,
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
