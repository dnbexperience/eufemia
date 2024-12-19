import pointer, { JsonObject } from '../../utils/json-pointer'
import {
  SharedStateId,
  createSharedState,
} from '../../../../shared/helpers/useSharedState'
import type { UseDataReturnUpdate } from './useData'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So it's a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

type SetDataReturn<Data> = {
  update: UseDataReturnUpdate<Data>
}

export default function setData<Data>(
  id: SharedStateId,
  data?: Data
): SetDataReturn<Data> {
  const sharedState = createSharedState(id)

  if (data) {
    sharedState.extend(data)
  }

  const update: UseDataReturnUpdate<Data> = (path, value = undefined) => {
    const existingData = structuredClone(sharedState.data || {}) as Data &
      JsonObject

    if (typeof value === 'function') {
      value = value(
        pointer.has(existingData, path)
          ? pointer.get(existingData, path)
          : undefined
      )
    }

    pointer.set(existingData, path, value)

    // Rerender the form with the new data
    sharedState.extend(existingData)
  }

  return {
    update,
  }
}
