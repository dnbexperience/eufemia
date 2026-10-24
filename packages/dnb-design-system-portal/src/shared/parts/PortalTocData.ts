import { createContext } from 'react'

export type PortalTocHeading = {
  id: string
  level: number
  text: Array<string | { code: string }>
}

export type PortalTocSnapshot = {
  pathname: string
  headings: PortalTocHeading[]
}

export const PortalTocData = createContext<PortalTocSnapshot | null>(null)

export function readInitialToc(pathname: string) {
  if (typeof document === 'undefined') {
    return null
  }
  const data = document.getElementById('portal-toc-data')?.textContent
  if (!data) {
    return null
  }
  try {
    const snapshot: PortalTocSnapshot = JSON.parse(data)
    return snapshot.pathname === pathname ? snapshot : null
  } catch {
    return null
  }
}
