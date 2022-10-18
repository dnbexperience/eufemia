export type SpacingElementProps = {
  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   *
   */
  top?: SpaceTypes

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   *
   */
  right?: SpaceTypes

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   *
   */
  bottom?: SpaceTypes

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   *
   */
  left?: SpaceTypes
}

export type SpaceTypes = string | boolean | number

export type SpacingProps = SpacingElementProps & {
  space?: SpaceTypes | SpacingElementProps
}

/**
 * @deprecated Use SpacingElementProps instead
 */
export type ISpacingElementProps = SpacingElementProps

/**
 * @deprecated Use SpacingProps instead
 */
export type ISpacingProps = SpacingProps
