import { useRef } from 'react'
import type { RefObject } from 'react'
import { useMenuContext } from './MenuContext'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'

export default function useMenuItemRegistration(
  itemRef: RefObject<HTMLElement | null>
) {
  const context = useMenuContext()
  const indexRef = useRef(-1)

  const registerItem = context?.registerItem
  const unregisterItem = context?.unregisterItem
  const isOpen = context?.isOpen

  useIsomorphicLayoutEffect(() => {
    if (!registerItem || !unregisterItem || !isOpen) {
      return undefined // stop here
    }

    indexRef.current = registerItem(itemRef as RefObject<HTMLElement>)

    return () => {
      unregisterItem(indexRef.current)
    }
  }, [registerItem, unregisterItem, isOpen])

  const isActive = context?.activeIndex === indexRef.current

  return { isActive, context }
}
