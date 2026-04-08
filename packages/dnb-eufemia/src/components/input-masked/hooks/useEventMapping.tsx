/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns object of events to handle
 */

import { useCallEvent } from './useCallEvent'

export const useEventMapping = ({ setLocalValue }: any) => {
  const callEvent = useCallEvent({ setLocalValue })

  return {
    onBeforeInput: (event: any) => callEvent({ event }, 'onBeforeInput'),
    onInput: (event: any) => callEvent({ event }, 'onInput'),
    onFocus: (params: any) => callEvent(params, 'onFocus'),
    onBlur: (params: any) => callEvent(params, 'onBlur'),
    onMouseUp: (event: any) => callEvent({ event }, 'onMouseUp'),
    onMouseDown: (event: any) => callEvent({ event }, 'onMouseDown'),
    onKeyDown: (params: any) => callEvent(params, 'onKeyDown'),
    onSubmit: (params: any) => callEvent(params, 'onSubmit'),
    onChange: (params: any) => callEvent(params, 'onChange'),
  }
}
