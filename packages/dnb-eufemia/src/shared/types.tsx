import { GetTranslationProps } from './Context'

export type LocaleProps = GetTranslationProps

export type SpacingElementProps = {
  top?: SpaceTypes
  right?: SpaceTypes
  bottom?: SpaceTypes
  left?: SpaceTypes
}

/**
 * @deprecated Use SpacingElementProps instead
 */
export type ISpacingElementProps = SpacingElementProps

export type SpacingProps = SpacingElementProps & {
  space?: SpaceTypes | SpacingElementProps
}

/**
 * @deprecated Use SpacingProps instead
 */
export type ISpacingProps = SpacingProps

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

export type DynamicElement =
  | keyof JSX.IntrinsicElements
  | React.FunctionComponent
