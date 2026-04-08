/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns object of events to handle
 */

import type React from 'react'
import { useCallEvent } from './useCallEvent'

type EventParams = { event: React.SyntheticEvent; value?: string }

export const useEventMapping = ({
  setLocalValue,
}: {
  setLocalValue: (value: string) => void
}) => {
  const callEvent = useCallEvent({ setLocalValue })

  return {
    onBeforeInput: (event: React.FormEvent<HTMLInputElement>) =>
      callEvent({ event }, 'onBeforeInput'),
    onInput: (event: React.FormEvent<HTMLInputElement>) =>
      callEvent({ event }, 'onInput'),
    onFocus: (params: EventParams) => callEvent(params, 'onFocus'),
    onBlur: (params: EventParams) => callEvent(params, 'onBlur'),
    onMouseUp: (event: React.MouseEvent<HTMLInputElement>) =>
      callEvent({ event }, 'onMouseUp'),
    onMouseDown: (event: React.MouseEvent<HTMLInputElement>) =>
      callEvent({ event }, 'onMouseDown'),
    onKeyDown: (params: EventParams) => callEvent(params, 'onKeyDown'),
    onSubmit: (params: EventParams) => callEvent(params, 'onSubmit'),
    onChange: (params: EventParams) => callEvent(params, 'onChange'),
  }
}
