import { useMemo } from 'react'
import type { DefaultErrorMessages } from '../types'

export type UseErrorMessagesOptions = {
  /** Translation string for 'Field.errorRequired' */
  errorRequired?: string
  /** Translation string for 'Field.errorPattern' */
  errorPattern?: string
  /** Consumer-provided errorMessages that take precedence */
  propsErrorMessages?: DefaultErrorMessages
  /** Additional custom key-value pairs to include */
  extra?: Record<string, string>
}

/**
 * Merges translation-based error messages with consumer overrides.
 *
 * This hook encapsulates the repeated pattern found in 15+ Field wrapper
 * components where translated error messages are merged with
 * props.errorMessages via useMemo.
 */
export default function useErrorMessages({
  errorRequired,
  errorPattern,
  propsErrorMessages,
  extra,
}: UseErrorMessagesOptions): DefaultErrorMessages {
  return useMemo(() => {
    const messages: DefaultErrorMessages = {}

    if (errorRequired !== undefined) {
      messages['Field.errorRequired'] = errorRequired
    }

    if (errorPattern !== undefined) {
      messages['Field.errorPattern'] = errorPattern
    }

    if (extra) {
      Object.assign(messages, extra)
    }

    // Consumer overrides always take precedence
    if (propsErrorMessages) {
      Object.assign(messages, propsErrorMessages)
    }

    return messages
  }, [errorRequired, errorPattern, extra, propsErrorMessages])
}
