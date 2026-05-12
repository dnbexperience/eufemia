/**
 * Pure search/filter utility functions.
 *
 * These are framework-agnostic and can be used by Autocomplete,
 * MultiSelection, or any other component that needs search/filter behavior.
 */

import { escapeRegexChars } from '../component-helper'

export type SearchOptions = {
  /** Enable number-optimized matching. */
  matchNumbers?: boolean

  /** Threshold (1-based) deciding from which word position to search inside words. Defaults to `3`. */
  inWordIndex?: number

  /** Matching strategy. */
  match?: 'word' | 'starts-with'
}

export type SearchWordData = {
  originalWord: string
  processedWord: string
  wordIndex: number
  filterRegex: RegExp
  scoreRegex: RegExp
}

export type PreparedSearch = {
  searchWords: string[]
  searchWordsData: SearchWordData[]
  firstWordRegex: RegExp | null
  getWordBoundary: (wordIndex: number) => string
  /** The 0-based inWordIndex threshold used for filtering and highlighting. */
  inWordIndex: number
  /** Whether number-optimized matching is enabled. */
  matchNumbers: boolean
}

export type MatchedWord = {
  word: string
  wordIndex: number
  wordScore: number
}

/**
 * Prepare search data from a raw input value.
 *
 * Splits the input into words, builds filter and score regexes
 * for each word, and returns the prepared search data.
 */
export function prepareSearchWords(
  value: string | null,
  options: SearchOptions = {}
): PreparedSearch {
  const {
    matchNumbers = false,
    match,
    inWordIndex: rawInWordIndex = 3,
  } = options
  const inWordIndex = rawInWordIndex - 1
  const startsWithMatch = match === 'starts-with'
  const rawValue = value ?? ''
  let searchWords = rawValue.split(/\s+/g).filter(Boolean)

  if (startsWithMatch) {
    // @ts-expect-error Unicode property escapes are supported at runtime
    const hasLetters = /[\p{L}]/u.test(rawValue)
    // @ts-expect-error Unicode property escapes are supported at runtime
    const hasNumbers = /[\p{N}]/u.test(rawValue)

    if (matchNumbers && hasNumbers && !hasLetters) {
      // @ts-expect-error Unicode property escapes are supported at runtime
      const normalizedNumeric = rawValue.replace(/[^\p{N}]+/gu, '')
      searchWords = normalizedNumeric ? [normalizedNumeric] : []
    }
  }

  const getWordBoundary = (wordIndex: number) =>
    startsWithMatch && wordIndex === 0 ? '^' : matchNumbers ? '' : '^|\\s'

  const searchWordsData = searchWords.map((word, wordIndex) => {
    const processedWord = matchNumbers
      ? // @ts-expect-error Unicode property escapes are supported at runtime
        word.replace(/[^\p{L}\p{N}]+/gu, '')
      : escapeRegexChars(word)
    const wordBoundary = getWordBoundary(wordIndex)

    return {
      originalWord: word,
      processedWord,
      wordIndex,
      filterRegex: new RegExp(
        wordIndex >= inWordIndex && !startsWithMatch
          ? `${processedWord}`
          : `(${wordBoundary})${processedWord}`,
        'i'
      ),
      scoreRegex: new RegExp(
        `(${wordBoundary})${escapeRegexChars(word)}`,
        'ig'
      ),
    }
  })

  const firstWordRegex =
    searchWords.length > 0
      ? new RegExp(`^${escapeRegexChars(searchWords[0])}`, 'i')
      : null

  return {
    searchWords,
    searchWordsData,
    firstWordRegex,
    getWordBoundary,
    inWordIndex,
    matchNumbers,
  }
}

/**
 * Find and score matching words in a content chunk.
 *
 * Tests each prepared search word against the content and
 * returns an array of matched words with their relevance scores.
 */
export function findMatchingWords(
  contentChunk: string | null,
  preparedSearch: PreparedSearch
): MatchedWord[] {
  const { searchWordsData, firstWordRegex, searchWords, matchNumbers } =
    preparedSearch

  if (typeof contentChunk !== 'string') {
    return []
  }

  return searchWordsData
    .filter(({ filterRegex }) => {
      if (filterRegex.test(contentChunk)) {
        return true
      }

      if (
        matchNumbers &&
        filterRegex.test(contentChunk.replace(/[^0-9]/g, ''))
      ) {
        return true
      }

      return false
    })
    .map(({ originalWord, wordIndex, scoreRegex }) => {
      let wordScore = 0

      wordScore += (contentChunk.match(scoreRegex) || []).length

      if (wordIndex === 0 && firstWordRegex) {
        const isFirstWord = firstWordRegex.test(contentChunk.split(' ')[0])

        if (isFirstWord) {
          wordScore += searchWords.length + 1
        }
      }

      return {
        word: originalWord,
        wordIndex,
        wordScore,
      }
    })
}

/**
 * Calculate total relevance score from matched words.
 */
export function calculateTotalScore(matchedWords: MatchedWord[]): number {
  let totalScore = matchedWords.length

  for (const { wordScore } of matchedWords) {
    totalScore += wordScore
  }

  return totalScore
}

/**
 * Check whether multiple numeric search terms all matched.
 *
 * When searching with multiple numeric terms (e.g. "123 456"),
 * ALL terms must match for the item to be included.
 * Returns `false` if the item should be excluded.
 */
export function checkMultipleNumericTerms(
  matchedWords: MatchedWord[],
  preparedSearch: PreparedSearch
): boolean {
  const { searchWords, matchNumbers } = preparedSearch

  if (!matchNumbers) {
    return true
  }

  const allWordsAreNumeric = searchWords.every(
    // @ts-expect-error Unicode property escapes are supported at runtime
    (word) => /^[\p{N}\s.,]+$/u.test(word)
  )

  const hasMultipleNumericTerms =
    searchWords.length > 1 && allWordsAreNumeric

  if (
    hasMultipleNumericTerms &&
    matchedWords.length !== searchWords.length
  ) {
    return false
  }

  return true
}
