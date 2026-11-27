import { useCallback, useContext, useRef } from 'react'
import DataContext from '../../DataContext/Context'
import type { Path } from '../../types'

/** Keep Add controls with the data provider and array path they modify. */
export default function useAddButtonRef(path: Path) {
  const { iterateAddButtonsRef } = useContext(DataContext)
  const previous = useRef<HTMLElement>(null)

  return useCallback(
    (button: HTMLElement | null) => {
      if (previous.current) {
        iterateAddButtonsRef?.current.delete(previous.current)
      }
      if (button && path) {
        iterateAddButtonsRef?.current.set(button, path)
      }
      previous.current = button
    },
    [iterateAddButtonsRef, path]
  )
}
