import { useState } from 'react'
import type { ReactNode, RefObject } from 'react'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import type { FlexLayoutContextValue } from './FlexLayoutContext'

export type FlexLayoutChildrenProps = {
  children?: ReactNode
  layout: FlexLayoutContextValue | null
}

export function useFlexLayoutRoot(
  layout: FlexLayoutContextValue | null,
  rootRef: RefObject<HTMLElement | null>
) {
  const [rootLayout, setRootLayout] =
    useState<FlexLayoutContextValue | null>(null)

  useIsomorphicLayoutEffect(() => {
    setRootLayout(
      rootRef.current?.parentElement?.classList.contains(
        'dnb-flex-container--css-gap'
      )
        ? layout
        : null
    )
  }, [layout, rootRef])

  return rootLayout
}

export default function FlexLayoutChildren({
  children,
  layout,
}: FlexLayoutChildrenProps) {
  if (!layout) {
    return children
  }

  return layout.renderChildren(children)
}
