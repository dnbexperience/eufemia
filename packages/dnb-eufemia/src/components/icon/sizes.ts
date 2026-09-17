/**
 * Icon sizes
 *
 * The size constants and the types derived from them live together,
 * so the derived types can use `typeof` without a circular import.
 */

export const DefaultIconSize = 16

export const DefaultIconSizes = {
  default: 16,
  medium: 24,
} as const

export const ValidIconType = [
  'small', // 12px 0.75rem
  'default', // 16px 1rem
  'medium', // 24px 1.5rem
  'large', // 32px 2rem
  'x-large', // 40px 2.5rem
  'xx-large', // 48px 3rem
] as const

export type DefaultIconSizes = typeof DefaultIconSizes
export type ValidIconType = (typeof ValidIconType)[number]
export type ValidIconNumericSize = DefaultIconSizes[keyof DefaultIconSizes]

export const ListDefaultIconSizes: Array<
  [ValidIconType, ValidIconNumericSize]
> = [
  ['default', 16],
  ['medium', 24],
]
