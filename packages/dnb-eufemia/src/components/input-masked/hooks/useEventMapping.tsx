/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns object of events to handle
 */

import { useCallEvent } from './useCallEvent'
import type { InputMaskedEvent } from './useCallEvent'

type EventParams = { event: InputMaskedEvent; value?: string }

export const useEventMapping = ({
  setLocalValue,
}: {
  setLocalValue: (value: string) => void
}) => {
  const callEvent = useCallEvent({ setLocalValue })

  return {
    onBeforeInput: (event: InputMaskedEvent) =>
      callEvent({ event }, 'onBeforeInput'),
    onInput: (event: InputMaskedEvent) => callEvent({ event }, 'onInput'),
    onFocus: (params: EventParams) => callEvent(params, 'onFocus'),
    onBlur: (params: EventParams) => callEvent(params, 'onBlur'),
    onMouseUp: (event: InputMaskedEvent) =>
      callEvent({ event }, 'onMouseUp'),
    onMouseDown: (event: InputMaskedEvent) =>
      callEvent({ event }, 'onMouseDown'),
    onKeyDown: (params: EventParams) => callEvent(params, 'onKeyDown'),
    onSubmit: (params: EventParams) => callEvent(params, 'onSubmit'),
    onChange: (params: EventParams) => callEvent(params, 'onChange'),
  }
}
