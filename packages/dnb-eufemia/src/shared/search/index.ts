export { type SearchOptions } from './SearchOptions'
export {
  type SearchWordOptions,
  type SearchWordData,
  type PreparedSearch,
  type MatchedWord,
  prepareSearchWords,
  findMatchingWords,
  calculateTotalScore,
  passesNumericTermsCheck,
} from './searchUtils'
