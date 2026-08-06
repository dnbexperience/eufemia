import { createContext } from 'react'
import type { ReactNode } from 'react'
import type { FlexContainerProps } from './Container'

export type FlexLayoutContextValue = Pick<
  FlexContainerProps,
  | 'direction'
  | 'wrap'
  | 'rowGap'
  | 'sizeCount'
  | 'justify'
  | 'align'
  | 'divider'
  | 'gap'
  | 'breakpoints'
  | 'queries'
> & {
  mediaKey?: string
  renderChildren(children: ReactNode): ReactNode
}

const FlexLayoutContext = createContext<FlexLayoutContextValue | null>(
  null
)

export default FlexLayoutContext
