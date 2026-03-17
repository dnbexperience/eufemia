export type SpacingElementProps = {
  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   *
   */
  top?: SpaceType

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   *
   */
  right?: SpaceType

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   *
   */
  bottom?: SpaceType

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   *
   */
  left?: SpaceType
}

export type SpacePositiveSize =
  | 'xx-small'
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'
  | 'xx-large-x2'

export type SpacePositiveRemValue = 0.25 | 0.5 | 1 | 1.5 | 2 | 3 | 3.5 | 7

export type SpaceSize = 'zero' | SpacePositiveSize

type SpaceSizeUnion = `${SpaceSize} ${SpaceSize}`
type SpaceSizeUnionInfinite = `${SpaceSize} ${SpaceSize} ${string}`

export type SpaceRemValuesType =
  | 0
  | 0.25
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 4.5
  | 5
  | 5.5
  | 6
  | 6.5
  | 7
  | 7.5
  | 8
  | 8.5
  | 9
  | 9.5
  | 10

type SpaceRemStringType = `${SpaceRemValuesType}rem`
type SpaceRemStringFallback = `${SpaceRemValuesType}`
type SpaceRemStringFallbackUnionInfinite =
  `${SpaceRemValuesType} ${string}`
type SpacePxStringType = `${number}px`

type SpaceRemNumberType = SpaceRemValuesType

export type SpaceStringTypes =
  | SpaceRemStringType
  | SpacePxStringType
  | SpaceRemStringFallback
  | SpaceRemStringFallbackUnionInfinite
  | SpaceSize
  | SpaceSizeUnion
  | SpaceSizeUnionInfinite

export type SpaceType = SpaceStringTypes | SpaceRemNumberType | boolean
export type SpaceTypeAll = SpaceType | SpacingElementProps

export type SpaceTypeMedia = {
  small?: SpaceTypeAll
  medium?: SpaceTypeAll
  large?: SpaceTypeAll
}

export type InnerSpacingElementProps = SpacingElementProps & {
  inline?: SpaceType
  block?: SpaceType
}

export type InnerSpaceTypeMedia = {
  small?: SpaceType | InnerSpacingElementProps
  medium?: SpaceType | InnerSpacingElementProps
  large?: SpaceType | InnerSpacingElementProps
}

export type InnerSpaceType =
  | SpaceType
  | InnerSpacingElementProps
  | InnerSpaceTypeMedia

export type SpacingProps = SpacingElementProps & {
  space?: SpaceTypeAll
  innerSpace?: SpaceTypeAll | SpaceTypeMedia
}
export type SpacingUnknownProps = Record<string, unknown>
