declare module '*.scss'

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
  export = classes
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
