export type ISpacingProps = ISpacingElementProps & {
  space?: SpaceTypes | ISpacingElementProps
}

export type ISpacingElementProps = {
  top?: SpaceTypes
  right?: SpaceTypes
  bottom?: SpaceTypes
  left?: SpaceTypes
}

export type SpaceTypes = string | boolean | number

export type DataAttributeTypes = {
  /**
   * When using HTMLAttributes on object to define props,
   * we need not get data-* attributes as valid types:
   *
   * triggerAttributes={{
   *   'data-testid': 'html-selector'
   * }}
   *
   * Effects: triggerAttributes, closeButtonAttributes
   */
  'data-testid'?: string

  /**
   * In future we want to use this below.
   * But its supported from TS v4.4 - so we may wait some more months.
   */
  // [property: `data-${string}`]: string
}
