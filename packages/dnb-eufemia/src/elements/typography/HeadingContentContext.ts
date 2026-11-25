import { createContext } from 'react'
import type { ReactNode } from 'react'
import type { ThemeProps } from '../../shared/Theme'
import type { TypographyProps } from './types'

type HeadingContentRenderer = (
  children: ReactNode,
  options: Pick<TypographyProps, 'family' | 'size'> &
    Pick<ThemeProps, 'brand'>
) => ReactNode

export default createContext<HeadingContentRenderer>(null)
