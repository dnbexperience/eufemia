import { createElement, isValidElement, useCallback, useRef } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { escapeRegexChars } from '../component-helper'

export type HighlightTextTag = 'mark' | 'span'
export type HighlightTextSearchMatch = 'word' | 'starts-with'

export type HighlightTextOptions = {
  /**
   * The term(s) to highlight. A string is split on whitespace into
   * multiple terms, an array is used as-is.
   */
  search: string | string[]

  /**
   * The class name applied to every highlighted part.
   */
  className: string

  /**
   * The element used to wrap a highlighted part.
   * Default: 'mark'
   */
  tag?: HighlightTextTag

  /**
   * Controls where the first term is allowed to match.
   * - 'word' (default): terms match at the start of any word.
   * - 'starts-with': the first term only matches at the start of the text.
   */
  searchMatch?: HighlightTextSearchMatch

  /**
   * When true, terms are stripped down to letters and numbers before
   * matching, and matching is done anywhere in the text.
   */
  searchNumbers?: boolean

  /**
   * Case-insensitive matching.
   * Default: true
   */
  ignoreCase?: boolean

  /**
   * Terms at this index or later match anywhere in the text instead of
   * at a word boundary. Default: 0 (all terms match anywhere).
   */
  searchInWordIndex?: number

  /**
   * When true, a top-level text node is wrapped in a plain span. Used to
   * preserve existing markup in some consumers.
   * Default: false
   */
  wrapInSpan?: boolean

  /**
   * A prefix used when generating React keys.
   */
  keyPrefix?: string
}

const strS = '\uFFFE'
const strE = '\uFFFF'

function getWordBoundary(
  wordIndex: number,
  searchMatch: HighlightTextSearchMatch
): string {
  if (searchMatch === 'starts-with' && wordIndex === 0) {
    return '^'
  }

  return '^|\\s'
}

function markText(
  text: string,
  terms: string[],
  {
    flags,
    searchMatch,
    searchNumbers,
    inWordIndex,
  }: {
    flags: string
    searchMatch: HighlightTextSearchMatch
    searchNumbers: boolean
    inWordIndex: number
  }
): string {
  let segment = text

  terms.forEach((word, wordIndex) => {
    if (!segment) {
      return
    }

    if (searchNumbers) {
      const cleanedWord = word.replace(
        // @ts-expect-error Unicode property escapes are supported at runtime here
        /[^\p{L}\p{N}]+/gu,
        ''
      )

      if (cleanedWord) {
        const escapedWord = escapeRegexChars(cleanedWord)
        segment = segment.replace(
          new RegExp(`(${escapedWord})`, flags),
          (match) => {
            if (match.includes(strS)) {
              return match
            }
            return `${strS}${match}${strE}`
          }
        )
      }

      return
    }

    const escapedWord = escapeRegexChars(word)

    if (wordIndex >= inWordIndex) {
      segment = segment.replace(
        new RegExp(`(${escapedWord})`, flags),
        `${strS}$1${strE}`
      )
    } else {
      const wordBoundary = getWordBoundary(wordIndex, searchMatch)
      segment = segment.replace(
        new RegExp(`(${wordBoundary})(${escapedWord})`, flags),
        `$1${strS}$2${strE}`
      )
    }
  })

  return segment
}

function renderMarkedSegment(
  segment: string,
  {
    tag,
    className,
    keyBase,
  }: { tag: HighlightTextTag; className: string; keyBase: string }
): ReactNode[] | string {
  if (!segment.includes(strS)) {
    return segment
  }

  const startRepeatRegex = new RegExp(`(${strS})+`, 'g')
  const endRepeatRegex = new RegExp(`(${strE})+`, 'g')
  const adjacentRegex = new RegExp(`(${strE}${strS})`, 'g')
  const splitRegex = new RegExp(`(${strS}|${strE})`, 'g')

  const normalized = segment
    .replace(startRepeatRegex, strS)
    .replace(endRepeatRegex, strE)
    .replace(adjacentRegex, '')

  const tokens = normalized.split(splitRegex).filter(Boolean)

  let isHighlighted = false
  let highlightIndex = 0

  return tokens.map((token) => {
    // eslint-disable-next-line security/detect-possible-timing-attacks -- sentinel char comparison, not a secret
    if (token === strS) {
      isHighlighted = true
      return null
    }
    // eslint-disable-next-line security/detect-possible-timing-attacks -- sentinel char comparison, not a secret
    if (token === strE) {
      isHighlighted = false
      return null
    }

    if (isHighlighted) {
      const key = `highlight-${keyBase}-${highlightIndex++}`
      return createElement(tag, { key, className }, token)
    }

    return token
  })
}

type WalkContext = {
  terms: string[]
  className: string
  tag: HighlightTextTag
  flags: string
  searchMatch: HighlightTextSearchMatch
  searchNumbers: boolean
  inWordIndex: number
  keyPrefix: string
}

function renderText(
  text: string,
  keyPart: string,
  wrapInSpan: boolean,
  ctx: WalkContext
): ReactNode {
  const result = renderMarkedSegment(
    markText(text, ctx.terms, {
      flags: ctx.flags,
      searchMatch: ctx.searchMatch,
      searchNumbers: ctx.searchNumbers,
      inWordIndex: ctx.inWordIndex,
    }),
    {
      tag: ctx.tag,
      className: ctx.className,
      keyBase: ctx.keyPrefix + keyPart,
    }
  )

  if (wrapInSpan) {
    return createElement('span', { key: ctx.keyPrefix + keyPart }, result)
  }

  return result
}

function renderNode(
  node: ReactNode,
  keyPart: string,
  wrapText: boolean,
  ctx: WalkContext
): ReactNode {
  if (Array.isArray(node)) {
    return node.map((child, index) =>
      renderNode(child, `${keyPart}-${index}`, false, ctx)
    )
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return renderText(String(node), keyPart, wrapText, ctx)
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    const child = node.props.children

    if (typeof child === 'undefined') {
      return node
    }

    return createElement(
      node.type as ComponentType<{ children?: ReactNode }>,
      {
        ...node.props,
        key: node.key ?? 'clone' + ctx.keyPrefix + keyPart,
      },
      renderNode(child, keyPart, false, ctx)
    )
  }

  return node
}

/**
 * Highlights every occurrence of the given search term(s) inside a ReactNode
 * by wrapping the matching text in the given tag with the given class name.
 * Handles strings, numbers, arrays and nested elements.
 */
export function highlightText(
  node: ReactNode,
  options: HighlightTextOptions
): ReactNode {
  const {
    search,
    className,
    tag = 'mark',
    searchMatch = 'word',
    searchNumbers = false,
    ignoreCase = true,
    searchInWordIndex = 0,
    wrapInSpan = false,
    keyPrefix = '',
  } = options

  const terms = (
    Array.isArray(search) ? search : String(search ?? '').split(/\s+/g)
  ).filter(Boolean)

  if (terms.length === 0) {
    return node
  }

  const ctx: WalkContext = {
    terms,
    className,
    tag,
    flags: ignoreCase ? 'gi' : 'g',
    searchMatch,
    searchNumbers,
    inWordIndex: searchInWordIndex,
    keyPrefix,
  }

  if (Array.isArray(node)) {
    return node.map((child, index) =>
      renderNode(child, String(index), wrapInSpan, ctx)
    )
  }

  return renderNode(node, '0', wrapInSpan, ctx)
}

/**
 * Returns a stable callback that highlights a ReactNode using the shared
 * {@link highlightText} engine. It owns a per-search render cache so repeated
 * calls with the same cache key (within one search) reuse the result. The
 * cache resets whenever the search or options change.
 *
 * The cache is keyed solely by `cacheKey`, so the caller must ensure the
 * `cacheKey` fully determines the node's content. Passing a stable key while
 * the node content changes (e.g. a position-based key) returns stale
 * highlights. When in doubt, omit `cacheKey` to always recompute.
 */
export function useHighlightText(
  options: HighlightTextOptions
): (node: ReactNode, cacheKey?: string) => ReactNode {
  const {
    search,
    className,
    tag = 'mark',
    searchMatch = 'word',
    searchNumbers = false,
    ignoreCase = true,
    searchInWordIndex = 0,
    wrapInSpan = false,
    keyPrefix = '',
  } = options

  const searchKey = JSON.stringify([
    search,
    className,
    tag,
    searchMatch,
    searchNumbers,
    ignoreCase,
    searchInWordIndex,
    wrapInSpan,
    keyPrefix,
  ])

  const cacheRef = useRef<{
    key: string
    map: Map<string, ReactNode>
  } | null>(null)

  return useCallback(
    (node: ReactNode, cacheKey?: string) => {
      if (!cacheRef.current || cacheRef.current.key !== searchKey) {
        cacheRef.current = { key: searchKey, map: new Map() }
      }

      if (
        typeof cacheKey === 'string' &&
        cacheRef.current.map.has(cacheKey)
      ) {
        return cacheRef.current.map.get(cacheKey)
      }

      const result = highlightText(node, {
        search,
        className,
        tag,
        searchMatch,
        searchNumbers,
        ignoreCase,
        searchInWordIndex,
        wrapInSpan,
        keyPrefix,
      })

      if (typeof cacheKey === 'string') {
        cacheRef.current.map.set(cacheKey, result)
      }

      return result
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchKey]
  )
}
