import React from 'react'
import EventEmitter, {
  EventEmitterData,
  EventEmitterId,
} from './EventEmitter'

/**
 * Use this React Hook as an easy way to sync data between components without a Context/Provider
 *
 * @param {string} id unique id, same as used in the "lined place"
 * @returns React Hook { data, update }
 */
export const useEventEmitter = (id: EventEmitterId = null) => {
  const [, updateState] = React.useState(null)
  const forceUpdate = React.useCallback(() => updateState({}), [])

  React.useEffect(() => () => emitter?.unlisten(forceUpdate), []) // eslint-disable-line react-hooks/exhaustive-deps

  const [emitter] = React.useState(() => {
    if (id) {
      const emitter = EventEmitter.createInstance(id)
      emitter.listen(forceUpdate)
      return emitter
    }
  })

  if (!emitter) {
    return { data: null }
  }

  const { get, update } = emitter
  const data: EventEmitterData = get()

  return { data, update }
}
