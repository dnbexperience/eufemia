/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns object of events to handle
 */

import { useCallEvent } from './useCallEvent'

export const useEventMapping = ({ setLocalValue }) => {
  const callEvent = useCallEvent({ setLocalValue })

  return {
    onBeforeInput: (event) => callEvent({ event }, 'onBeforeInput'),
    onInput: (event) => callEvent({ event }, 'onInput'),
    onFocus: (params) => callEvent(params, 'onFocus'),
    onBlur: (params) => callEvent(params, 'onBlur'),
    onMouseUp: (event) => callEvent({ event }, 'onMouseUp'),
    onMouseDown: (event) => callEvent({ event }, 'onMouseDown'),
    onKeyDown: (params) => callEvent(params, 'onKeyDown'),
    onSubmit: (params) => callEvent(params, 'onSubmit'),
    onChange: (params) => callEvent(params, 'onChange'),
  }
}
