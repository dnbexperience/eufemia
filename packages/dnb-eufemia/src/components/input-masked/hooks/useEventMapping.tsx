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
    onFocus: (params) => callEvent(params, 'on_focus'),
    onBlur: (params) => callEvent(params, 'on_blur'),
    onMouseUp: (event) => callEvent({ event }, 'on_mouse_up'),
    onMouseDown: (event) => callEvent({ event }, 'on_mouse_down'),
    onKeyDown: (params) => callEvent(params, 'on_key_down'),
    onSubmit: (params) => callEvent(params, 'on_submit'),
    onChange: (params) => callEvent(params, 'on_change'),

    on_focus: undefined,
    on_blur: undefined,
    on_key_down: undefined,
    on_submit: undefined,
    on_change: undefined,
  }
}
