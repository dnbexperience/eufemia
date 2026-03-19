/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns object of events to handle
 */

import type React from 'react'
import { useCallEvent } from './useCallEvent'

export const useEventMapping = ({ setLocalValue }: { setLocalValue: (value: string) => void }) => {
  const callEvent = useCallEvent({ setLocalValue })

  return {
    onBeforeInput: (event: React.FormEvent) => callEvent({ event } as { event: any; value?: any }, 'onBeforeInput'),
    onInput: (event: React.FormEvent) => callEvent({ event } as { event: any; value?: any }, 'onInput'),
    onFocus: (params: Record<string, unknown>) => callEvent(params as { event: any; value?: any }, 'onFocus'),
    onBlur: (params: Record<string, unknown>) => callEvent(params as { event: any; value?: any }, 'onBlur'),
    onMouseUp: (event: React.MouseEvent) => callEvent({ event } as { event: any; value?: any }, 'onMouseUp'),
    onMouseDown: (event: React.MouseEvent) => callEvent({ event } as { event: any; value?: any }, 'onMouseDown'),
    onKeyDown: (params: Record<string, unknown>) => callEvent(params as { event: any; value?: any }, 'onKeyDown'),
    onSubmit: (params: Record<string, unknown>) => callEvent(params as { event: any; value?: any }, 'onSubmit'),
    onChange: (params: Record<string, unknown>) => callEvent(params as { event: any; value?: any }, 'onChange'),
  }
}
