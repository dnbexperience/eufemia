// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const NUMBER_CHARS = '\\-0-9,.'

// change the position of minus if it's first
// check for two minus - −
// check also for hyphen ‐
// check also for dashes ‒  –  —  ―
export const NUMBER_MINUS = '-|−|‐|‒|–|—|―'

// this is used to format a number that is not absent
export const ABSENT_VALUE_FORMAT = '–'

export function isAbsent(value) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    value === ABSENT_VALUE_FORMAT
  )
}
