import type { SearchOptions } from './searchUtils'

/**
 * Shared search configuration type used by Autocomplete
 * and other components with search/filter behavior.
 */
export type SearchConfig = SearchOptions & {
  /** Enable filtering of options based on typed input. Defaults to `true`. */
  filter?: boolean

  /** Enable reordering of search results by relevance. Defaults to `true`. */
  reorder?: boolean

  /** Enable highlighting of matching text in options. Defaults to `true`. */
  highlight?: boolean
}
