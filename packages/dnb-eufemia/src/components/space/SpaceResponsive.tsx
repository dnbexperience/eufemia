import { useContext } from 'react'
import type { ReactNode } from 'react'
import SpaceResponsiveContext from './SpaceResponsiveContext'
import type {
  SpaceDensity,
  SpaceBreakpoint,
} from './SpaceResponsiveContext'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type SpaceResponsiveProps = {
  /**
   * Forces a specific spacing density for descendants. Overrides `defaultBreakpoint` when set.
   */
  density?: SpaceDensity

  /**
   * Sets which breakpoint's spacing scale to use as the default. Default: `medium`.
   */
  defaultBreakpoint?: SpaceBreakpoint

  /**
   * When `true`, disables responsive spacing for descendants, overriding a parent `Space.Responsive`. Defaults to `false`.
   */
  off?: boolean
  children?: ReactNode
}

function SpaceResponsive({
  density,
  defaultBreakpoint,
  off,
  children,
}: SpaceResponsiveProps) {
  const parent = useContext(SpaceResponsiveContext)

  const value = off
    ? { off }
    : {
        ...(parent || undefined),
        ...(density !== undefined && { density }),
        ...(defaultBreakpoint !== undefined && { defaultBreakpoint }),
      }

  return (
    <SpaceResponsiveContext value={value}>
      {children}
    </SpaceResponsiveContext>
  )
}

withComponentMarkers(SpaceResponsive, {
  _supportsSpacingProps: 'passthrough',
})

export default SpaceResponsive
