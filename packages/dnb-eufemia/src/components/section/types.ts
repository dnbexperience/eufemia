import type { CSSProperties, HTMLProps, ReactNode, RefObject } from 'react'
import type {
  DynamicElement,
  InnerSpaceType,
  ResponsiveProp,
  SpacingProps,
} from '../../shared/types'
import type { ThemeSurface } from '../../shared/Theme'

export type SectionVariants =
  | 'error'
  | 'information'
  | 'warning'
  | 'success'
  | 'divider'

export type SectionTextColor = string
export type SectionOutlineColor = string | boolean
export type SectionBackgroundColor = string
export type SectionDropShadow = boolean
export type SectionRoundedCorner =
  | boolean
  | [boolean, boolean, boolean, boolean]

export type SectionProps = {
  /**
   * Defines the semantic purpose and subsequently the style of the visual helper.
   */
  variant?: SectionVariants | string

  /**
   * Use `true` to enable a fullscreen breakout look. Also supports media query breakpoints like `{ small: boolean }`. Defaults to `true`.
   */
  breakout?: boolean | ResponsiveProp<boolean>

  /**
   * Define if the Section should break out negatively on larger screens. You cannot use `breakout` and `outset` together. Defaults to `false`.
   */
  outset?: boolean | ResponsiveProp<boolean>

  /**
   * Use `true` to enable rounded corners (border-radius). Also supports media query breakpoints like `{ small: boolean }`. Defaults to `false`.
   */
  roundedCorner?:
    | SectionRoundedCorner
    | ResponsiveProp<SectionRoundedCorner>

  /**
   * Define a custom border color. If `true` is given, `color-black-8` is used. Use a Eufemia color. Also supports media query breakpoints like `{ small: 'black-8' }`.
   */
  outline?: SectionOutlineColor | ResponsiveProp<SectionOutlineColor>

  /**
   * Define a custom border width. Defaults to `var(--card-outline-width)`. Also supports media query breakpoints like `{ small: '2px' }`.
   */
  outlineWidth?: number | string | ResponsiveProp<number | string>

  /**
   * Define a custom text color to complement the `backgroundColor`. Use a Eufemia color. Also supports media query breakpoints like `{ small: 'black-80' }`.
   */
  textColor?: SectionTextColor | ResponsiveProp<SectionTextColor>

  /**
   * Define a custom background color, instead of a variant. Use a Eufemia color. Also supports media query breakpoints like `{ small: 'white' }`.
   */
  backgroundColor?:
    | SectionBackgroundColor
    | ResponsiveProp<SectionBackgroundColor>

  /**
   * Use `true` to show the default Eufemia DropShadow. Also supports media query breakpoints like `{ small: true }`.
   */
  dropShadow?: SectionDropShadow | ResponsiveProp<SectionDropShadow>

  /**
   * Define the surface color context. When set to `dark`, ondark design tokens will be used for text and outline colors. Use `initial` to reset to the component's default behavior, ignoring any parent surface context. Uses `--token-color-decorative-first-bold-static` as the default background color and `--token-color-text-neutral-ondark` as the text color.
   */
  surface?: ThemeSurface

  /**
   * Define what HTML element should be used. Defaults to `<section>`.
   */
  element?: DynamicElement

  /**
   * By providing a `React.Ref` we can get the internally used element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.
   */
  ref?: RefObject<HTMLElement>
}

export type SectionSpacingProps = Omit<SpacingProps, 'innerSpace'> & {
  innerSpace?: InnerSpaceType
}

export type SectionAllProps = SectionProps &
  SectionSpacingProps &
  Omit<HTMLProps<HTMLElement>, 'ref'>

export type SectionReturnParams = Record<string, unknown> & {
  className: string
  ref: RefObject<HTMLElement>
  children: ReactNode
  style: CSSProperties
}
