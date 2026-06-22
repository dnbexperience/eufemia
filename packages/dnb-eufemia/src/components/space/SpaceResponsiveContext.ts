import { createContext } from 'react'
import type { MediaQuerySizes } from '../../shared/MediaQueryUtils'

export type SpaceDensity = 'compact' | 'basis'
export type SpaceBreakpoint = Extract<MediaQuerySizes, 'small' | 'medium'>

export type SpaceResponsiveContextValue = {
  breakpoint?: SpaceBreakpoint
  density?: SpaceDensity | false
  off?: boolean
}

/**
 * Signals whether a component tree is wrapped in `Space.ResponsiveContext`.
 *
 * When active, `useSpacing` appends CSS classes so descendant components
 * opt into responsive spacing via `--responsive-spacing-*` custom properties.
 */
const SpaceResponsiveContext = createContext<
  SpaceResponsiveContextValue | false
>(false)

export default SpaceResponsiveContext
