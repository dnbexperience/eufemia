declare module '*.scss'

type ImportMetaEnv = {
  readonly VITE_EUFEMIA_STACKBLITZ_VERSION?: string
  readonly VITE_GITHUB_REPOSITORY?: string
  readonly VITE_GITHUB_EDIT_REF?: string
  readonly VITE_GITHUB_COMMIT_SHA?: string
  readonly VITE_ANALYTICS_ENDPOINT?: string
  readonly VITE_ANALYTICS_ENV?: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
  export = classes
}

declare module 'virtual:portal-pages' {
  import type { MdxNode } from '../vite/client/plugins/portal-pages.shared'

  export const routes: Array<{
    path: string
    lazy: () => Promise<{ Component: React.ComponentType }>
  }>

  /**
   * Every MDX page, unfiltered and unsorted.
   */
  export const allMdxNodes: Array<MdxNode>
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
    restoreWindow?: boolean
  }): void
  export function useScrollPosition(): void
}

declare module 'virtual:github-releases' {
  import type { GitHubRelease } from '../vite/client/plugins/github-releases'

  export const releases: GitHubRelease[]
}
