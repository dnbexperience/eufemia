import {
  prepareSearchWords,
  findMatchingWords,
  calculateTotalScore,
  checkMultipleNumericTerms,
} from '../searchUtils'

describe('prepareSearchWords', () => {
  it('splits input into search words', () => {
    const result = prepareSearchWords('hello world')
    expect(result.searchWords).toEqual(['hello', 'world'])
  })

  it('handles null value', () => {
    const result = prepareSearchWords(null)
    expect(result.searchWords).toEqual([])
  })

  it('handles empty string', () => {
    const result = prepareSearchWords('')
    expect(result.searchWords).toEqual([])
  })

  it('trims extra whitespace', () => {
    const result = prepareSearchWords('  hello   world  ')
    expect(result.searchWords).toEqual(['hello', 'world'])
  })

  it('builds filter regexes for each word', () => {
    const result = prepareSearchWords('abc')
    expect(result.searchWordsData).toHaveLength(1)
    expect(result.searchWordsData[0].filterRegex).toBeInstanceOf(RegExp)
    expect(result.searchWordsData[0].scoreRegex).toBeInstanceOf(RegExp)
  })

  it('builds firstWordRegex', () => {
    const result = prepareSearchWords('abc def')
    expect(result.firstWordRegex).toBeInstanceOf(RegExp)
    expect(result.firstWordRegex.test('abc')).toBe(true)
    expect(result.firstWordRegex.test('def')).toBe(false)
  })

  it('returns null firstWordRegex for empty input', () => {
    const result = prepareSearchWords('')
    expect(result.firstWordRegex).toBeNull()
  })

  it('uses starts-with word boundary for first word', () => {
    const result = prepareSearchWords('The', {
      match: 'starts-with',
    })
    expect(result.searchWordsData[0].filterRegex.test('The Matrix')).toBe(
      true
    )
    expect(
      result.searchWordsData[0].filterRegex.test('Back to the Future')
    ).toBe(false)
  })

  it('normalizes numeric input with starts-with and matchNumbers', () => {
    const result = prepareSearchWords('123.456', {
      match: 'starts-with',
      matchNumbers: true,
    })
    expect(result.searchWords).toEqual(['123456'])
  })

  it('exposes 0-based inWordIndex on PreparedSearch', () => {
    const result = prepareSearchWords('a b c', { inWordIndex: 3 })
    expect(result.inWordIndex).toBe(2)
  })

  it('defaults inWordIndex to 2 (1-based 3)', () => {
    const result = prepareSearchWords('a b c')
    expect(result.inWordIndex).toBe(2)
  })

  it('exposes matchNumbers on PreparedSearch', () => {
    const withNumbers = prepareSearchWords('123', { matchNumbers: true })
    expect(withNumbers.matchNumbers).toBe(true)

    const withoutNumbers = prepareSearchWords('123')
    expect(withoutNumbers.matchNumbers).toBe(false)
  })
})

describe('findMatchingWords', () => {
  it('finds matching words in content', () => {
    const prepared = prepareSearchWords('hello')
    const matches = findMatchingWords('hello world', prepared)
    expect(matches).toHaveLength(1)
    expect(matches[0].word).toBe('hello')
    expect(matches[0].wordScore).toBeGreaterThan(0)
  })

  it('returns empty array for no match', () => {
    const prepared = prepareSearchWords('xyz')
    const matches = findMatchingWords('hello world', prepared)
    expect(matches).toHaveLength(0)
  })

  it('returns empty array for null content', () => {
    const prepared = prepareSearchWords('hello')
    const matches = findMatchingWords(null, prepared)
    expect(matches).toHaveLength(0)
  })

  it('matches case-insensitively', () => {
    const prepared = prepareSearchWords('HELLO')
    const matches = findMatchingWords('hello world', prepared)
    expect(matches).toHaveLength(1)
  })

  it('gives bonus score when matching first word', () => {
    const prepared = prepareSearchWords('hello')
    const matchFirst = findMatchingWords('hello world', prepared)
    const matchSecond = findMatchingWords('world hello', prepared)
    expect(matchFirst[0].wordScore).toBeGreaterThan(
      matchSecond[0].wordScore
    )
  })

  it('matches numbers with matchNumbers enabled', () => {
    const prepared = prepareSearchWords('123', {
      matchNumbers: true,
    })
    const matches = findMatchingWords('1234 5678', prepared)
    expect(matches).toHaveLength(1)
  })
})

describe('calculateTotalScore', () => {
  it('returns 0 for empty matches', () => {
    expect(calculateTotalScore([])).toBe(0)
  })

  it('sums match count and word scores', () => {
    const score = calculateTotalScore([
      { word: 'a', wordIndex: 0, wordScore: 3 },
      { word: 'b', wordIndex: 1, wordScore: 1 },
    ])
    // 2 (count) + 3 + 1 = 6
    expect(score).toBe(6)
  })
})

describe('checkMultipleNumericTerms', () => {
  it('returns true when matchNumbers is false', () => {
    const prepared = prepareSearchWords('123 456')
    expect(checkMultipleNumericTerms([], prepared)).toBe(true)
  })

  it('returns true for single numeric term', () => {
    const prepared = prepareSearchWords('123', { matchNumbers: true })
    expect(checkMultipleNumericTerms([], prepared)).toBe(true)
  })

  it('returns false when not all numeric terms matched', () => {
    const prepared = prepareSearchWords('123 456', { matchNumbers: true })
    const matched = [{ word: '123', wordIndex: 0, wordScore: 1 }]
    expect(checkMultipleNumericTerms(matched, prepared)).toBe(false)
  })

  it('returns true when all numeric terms matched', () => {
    const prepared = prepareSearchWords('123 456', { matchNumbers: true })
    const matched = [
      { word: '123', wordIndex: 0, wordScore: 1 },
      { word: '456', wordIndex: 1, wordScore: 1 },
    ]
    expect(checkMultipleNumericTerms(matched, prepared)).toBe(true)
  })

  it('returns true for non-numeric multi-word search', () => {
    const prepared = prepareSearchWords('hello world', {
      matchNumbers: true,
    })
    expect(checkMultipleNumericTerms([], prepared)).toBe(true)
  })
})
