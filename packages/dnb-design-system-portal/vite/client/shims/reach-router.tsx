/**
 * Shim for @gatsbyjs/reach-router → react-router-dom.
 *
 * Components that import from @gatsbyjs/reach-router in the Gatsby portal
 * get redirected here via Vite alias.
 */

import {
  useLocation as useRRLocation,
  Link as RRLink,
} from 'react-router-dom'
import { navigate as portalNavigate } from './portal-query'
import React from 'react'

export function useLocation() {
  return useRRLocation()
}

// Re-use the portal-query navigate so it goes through React Router
export function navigate(to: string, options?: { replace?: boolean }) {
  portalNavigate(to, options)
}

export const Link = RRLink

// Router shim — in Vite SPA mode, just render children directly
export function Router({
  children,
  ...props
}: {
  children: React.ReactNode
  basepath?: string
}) {
  return <>{children}</>
}

export default {
  useLocation,
  navigate,
  Link,
  Router,
}
