export interface ISpacingProps extends ISpacingElementProps {
  space?: SpaceTypes | ISpacingElementProps
}

export interface ISpacingElementProps {
  top?: SpaceTypes
  right?: SpaceTypes
  bottom?: SpaceTypes
  left?: SpaceTypes
}

export type SpaceTypes = string | boolean | number
