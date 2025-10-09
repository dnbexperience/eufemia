import { placeholderChar as defaultPlaceholderChar } from './constants'
import type { Mask } from './types'

const emptyArray = []

export function convertMaskToPlaceholder(
  mask: Mask = emptyArray,
  placeholderChar: string = defaultPlaceholderChar
): string {
  if (!isArray(mask)) {
    throw new Error(
      'Text-mask:convertMaskToPlaceholder; The mask property must be an array.'
    )
  }

  if (mask.indexOf(placeholderChar) !== -1) {
    throw new Error(
      'Placeholder character must not be used as part of the mask. Please specify a character ' +
        'that is not present in your mask as your placeholder character.\n\n' +
        `The placeholder character that was received is: ${JSON.stringify(
          placeholderChar
        )}\n\n` +
        `The mask that was received is: ${JSON.stringify(mask)}`
    )
  }

  return mask
    .map((char) =>
      char instanceof RegExp ? placeholderChar : String(char)
    )
    .join('')
}

export function isArray(value: unknown): value is unknown[] {
  return (Array.isArray && Array.isArray(value)) || value instanceof Array
}

export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isNil<T>(
  value: T | undefined | null
): value is undefined | null {
  return typeof value === 'undefined' || value === null
}

const strCaretTrap = '[]'
export function processCaretTraps(mask: Mask): {
  maskWithoutCaretTraps: Mask
  indexes: number[]
} {
  const indexes: number[] = []

  let indexOfCaretTrap
  while (
    ((indexOfCaretTrap = mask.indexOf(strCaretTrap)),
    indexOfCaretTrap !== -1)
  ) {
    // eslint-disable-line
    indexes.push(indexOfCaretTrap)

    mask.splice(indexOfCaretTrap, 1)
  }

  return { maskWithoutCaretTraps: mask, indexes }
}
