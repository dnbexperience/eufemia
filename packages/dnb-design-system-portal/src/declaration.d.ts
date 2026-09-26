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

  /**
   * Subset of `allMdxNodes`. Pages that are published and listable: they
   * have a title and are not drafts, ordered by `order`, with pages that
   * have no `order` last.
   */
  export const regularMdxNodes: Array<MdxNode>

  /**
   * Does a page's slug match the glob pattern?
   *
   * `*` matches within one path segment, `**` matches any number of them:
   *
   *   globPath(node, 'uilib/elements/*')       direct children
   *   globPath(node, 'uilib/elements/**')      any depth
   */
  export function globPath(node: MdxNode, pattern: string): boolean
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
