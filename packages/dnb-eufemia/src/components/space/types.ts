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

export type SpaceType = string | boolean | number

export type SpacingProps = SpacingElementProps & {
  space?: SpaceType | SpacingElementProps
}
export type SpacingUnknownProps = Record<string, unknown>
export type StyleObjectProps = SpacingProps & {
  maxWidth?: string
  maxHeight?: string
  width?: string
  height?: string
}
