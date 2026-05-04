/// <reference types="vite/client" />

declare module 'virtual:build-info' {
  export const releaseVersion: string
  export const buildVersion: string
  export const changelogVersion: string
}

declare module 'virtual:portal-pages' {
  export const routes: Array<{
    path: string
    lazy: () => Promise<{ Component: React.ComponentType }>
  }>
  export const allMdxNodes: Array<{
    fields: { slug: string }
    frontmatter: Record<string, unknown>
  }>
}

declare module 'virtual:prefetch-on-hover' {
  export function setupPrefetchOnHover(): () => void
  export function usePrefetchOnHover(): void
}

declare module 'virtual:catch-links' {
  export function useCatchLinks(): void
}

declare module 'virtual:scroll-position' {
  export function saveScrollPosition(): void
  export function restoreScrollPosition(options?: {
    smooth?: boolean
  }): void
  export function useScrollPosition(): void
}

declare module 'virtual:eufemia-theme-styles' {
  // Side-effect only module — imports all theme SCSS files
}

declare module 'virtual:eufemia-theme-ui' {
  // Side-effect only module — imports ui (default) theme SCSS files
}

declare module 'virtual:eufemia-theme-sbanken' {
  // Side-effect only module — imports sbanken theme SCSS files
}

declare module 'virtual:eufemia-theme-eiendom' {
  // Side-effect only module — imports eiendom theme SCSS files
}

declare module 'virtual:eufemia-theme-carnegie' {
  // Side-effect only module — imports carnegie theme SCSS files
}
