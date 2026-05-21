/**
 * Shared search options type used by Autocomplete
 * and other components with search/filter behavior.
 */
export type SearchOptions = {
  /** Enable number-optimized/normalized matching. Defaults to `false`. */
  numbers?: boolean

  /** Threshold (1-based) deciding from which word position to search inside words. Defaults to `3`. */
  matchInsideWordsFrom?: number

  /** Matching strategy. */
  match?: 'word' | 'starts-with'

  /** Enable filtering of options based on typed input. Defaults to `true`. */
  filter?: boolean

  /** Enable reordering of search results by relevance. Defaults to `true`. */
  reorder?: boolean

  /** Enable highlighting of matching text in options. Defaults to `true`. */
  highlight?: boolean
}
