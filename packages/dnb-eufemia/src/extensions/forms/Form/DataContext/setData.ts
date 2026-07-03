import type { JsonObject } from '../../utils/json-pointer'
import pointer from '../../utils/json-pointer'
import type { Path } from '../../types'
import type { SharedStateId } from '../../../../shared/helpers/useSharedState'
import { createSharedState } from '../../../../shared/helpers/useSharedState'
import type { UseDataReturnUpdate } from './useData'
import { structuredClone } from '../../../../shared/helpers/structuredClone'

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

  // The runtime resolver takes a plain `Path` and a loose value; cast it to the
  // public generic signature so the value is checked against the literal path
  // (`update` maps `P` to `PathType<Data, P>`).
  const update = ((path: Path, value: unknown = undefined) => {
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
  }) as unknown as UseDataReturnUpdate<Data>

  return {
    update,
  }
}
