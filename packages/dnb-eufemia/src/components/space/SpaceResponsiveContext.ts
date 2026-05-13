import { createContext } from 'react'
import type { MediaQuerySizes } from '../../shared/MediaQueryUtils'

export type SpaceDensity = 'compact' | 'basis' | 'spacious'
export type SpaceBreakpoint = Extract<
  MediaQuerySizes,
  'small' | 'medium' | 'large'
>

export type SpaceResponsiveContextValue = {
  defaultBreakpoint?: SpaceBreakpoint
  density?: SpaceDensity
  off?: boolean
}

/**
 * Signals whether a component tree is wrapped in `Space.Responsive`.
 *
 * When active, `useSpacing` appends CSS classes so descendant components
 * opt into responsive spacing via `--responsive-spacing-*` custom properties.
 */
const SpaceResponsiveContext = createContext<
  SpaceResponsiveContextValue | false
>(false)

export default SpaceResponsiveContext
