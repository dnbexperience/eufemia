import { isValidElement } from 'react'
import type { StateMessage, StateWithMessage } from './FieldBlockContext'
import { FormError } from '../utils/FormError'

function getMessage(error: FormError | Error) {
  if (error instanceof FormError) {
    return error.formattedMessage ?? error.message
  }

  return error.message
}

export function getMessagesFromError(
  item: Partial<StateWithMessage>
): Array<StateMessage> {
  const { content } = item

  if (content instanceof FormError && Array.isArray(content.errors)) {
    return content.errors.map((content) => {
      return getMessage(content)
    })
  }

  if (Array.isArray(content)) {
    return content.map((content) => {
      return content instanceof FormError || content instanceof Error
        ? getMessage(content)
        : content
    })
  }

  if (content instanceof FormError || content instanceof Error) {
    return [getMessage(content)]
  }

  return [
    ((isValidElement(content) ? content : content?.toString()) ||
      content) as StateMessage,
  ]
}
