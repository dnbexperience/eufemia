import { ScrollViewAllProps } from '../../fragments/ScrollView'
import { ModalTypes } from '../modal/Modal'
import { ReactChildType } from '../modal/types'

export type DrawerProps = {
  /**
   * Defines the placement on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  containerPlacement?: 'left' | 'right' | 'top' | 'bottom'

  /**
   * The drawer title. Displays on the very top of the content.
   */
  title?: React.ReactNode
} & ModalTypes

export type DrawerContentProps = {
  /**
   * The minimum Drawer content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).
   */
  minWidth?: string | number

  /**
   * The maximum Drawer content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).
   */
  maxWidth?: string | number

  /**
   * Give the Drawer content a class name (maps to `dnb-drawer`).
   */
  className?: string

  /**
   * If set to `false` then the drawer content will be shown without any spacing. Defaults to `true`.
   */
  spacing?: boolean

  /**
   * By default the drawer content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.
   */
  preventCoreStyle?: boolean

  /**
   * The content which will appear in the navigation, above the header, and side-by-side the close button.
   */
  navContent?: ReactChildType

  /**
   * The content which will appear in the header of the drawer.
   */
  headerContent?: ReactChildType

  /**
   * The content which will appear when triggering the drawer.
   */
  modalContent?: ReactChildType

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactChildType

  /**
   * Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.
   */
  alignContent?: 'left' | 'right' | 'centered' | 'center'

  /**
   * If set to `true` then the drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.
   */
  fullscreen?: boolean | string

  /**
   * Defines the placement on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  containerPlacement?: string

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  noAnimation?: boolean

  /**
   * Same as `no_animation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.
   */
  noAnimationOnMobile?: boolean
} & Omit<ScrollViewAllProps, 'children'>
