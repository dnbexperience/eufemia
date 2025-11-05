import type { Mask } from './types'

const strCaretTrap = '[]'

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function convertMaskToPlaceholder(
  mask: Mask,
  placeholderChar = '_'
): string {
  if (!isArray(mask)) {
    throw new Error(
      'Text-mask:convertMaskToPlaceholder; The mask property must be an array.'
    )
  }

  if (mask.includes(placeholderChar)) {
    throw new Error(
      'Text-mask:convertMaskToPlaceholder; Placeholder character must not be used as part of the mask.'
    )
  }

  return mask
    .map((char) => {
      return char instanceof RegExp ? placeholderChar : char
    })
    .join('')
}

export function processCaretTraps(mask: Mask): {
  maskWithoutCaretTraps: Mask
  indexes: number[]
} {
  const indexes: number[] = []
  const maskWithoutCaretTraps = [...mask]

  let index = maskWithoutCaretTraps.indexOf(strCaretTrap)
  while (index !== -1) {
    indexes.push(index)
    maskWithoutCaretTraps.splice(index, 1)
    index = maskWithoutCaretTraps.indexOf(strCaretTrap)
  }

  return {
    maskWithoutCaretTraps,
    indexes,
  }
}
