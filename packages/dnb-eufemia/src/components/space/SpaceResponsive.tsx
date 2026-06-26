import { useContext } from 'react'
import type { ReactNode } from 'react'
import SpaceResponsiveContext, {
  type SpaceResponsiveContextValue,
} from './SpaceResponsiveContext'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

type SpaceResponsiveProps = SpaceResponsiveContextValue & {
  children?: ReactNode
}

function SpaceResponsive({
  density,
  breakOn,
  off,
  children,
}: SpaceResponsiveProps) {
  const parent = useContext(SpaceResponsiveContext)

  const value = off
    ? { off }
    : {
        ...(parent || undefined),
        ...(density !== undefined && { density }),
        ...(breakOn !== undefined && { breakOn }),
        ...(off !== undefined && { off }),
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
