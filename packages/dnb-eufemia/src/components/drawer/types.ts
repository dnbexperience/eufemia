import type { ReactNode } from 'react'
import type { ScrollViewAllProps } from '../scroll-view/ScrollView'
import type { ModalAllProps } from '../modal/Modal'

export type DrawerProps = {
  /**
   * Defines on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  containerPlacement?: 'left' | 'right' | 'top' | 'bottom'

  /**
   * The drawer title. Displays at the very top of the content.
   */
  title?: ReactNode
} & ModalAllProps

export type DrawerContentProps = {
  /**
   * The minimum Drawer content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful when using fixed `minWidth` so you don't break responsiveness. Defaults to `384px` (the average width is `40vw`).
   */
  minWidth?: string | number

  /**
   * The maximum Drawer content width, defined by a CSS width value like `20rem`. Defaults to `40rem`.
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
  navContent?: ReactNode

  /**
   * The content which will appear in the header of the drawer.
   */
  headerContent?: ReactNode

  /**
   * The content which will appear when triggering the drawer.
   */
  modalContent?: ReactNode | ((props: DrawerContentProps) => ReactNode)

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactNode | ((props: DrawerContentProps) => ReactNode)

  /**
   * Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `centered` and `right`. If `centered`, then the content will also be centered vertically. Defaults to `left`.
   */
  alignContent?: 'left' | 'right' | 'centered' | 'center'

  /**
   * Use `true` for fullscreen or `false` to disable automatic fullscreen. With `auto`, Drawer fills the viewport below the `small` width breakpoint, or below `medium` when the viewport height is at most `30em`. Top and bottom Drawers keep their placement height on taller viewports. Defaults to `auto`.
   */
  fullscreen?: boolean | string

  /**
   * Defines on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  containerPlacement?: string

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to `false`.
   */
  noAnimation?: boolean

  /**
   * Same as `noAnimation`, but gets triggered only if the viewport width is less than `40em`. Defaults to `false`.
   */
  noAnimationOnMobile?: boolean

  /**
   * Reserves space for the scrollbar gutter, preventing layout shifts when content overflows. By default, it enables `stable` when spacing is enabled. Set to `false` to disable.
   */
  scrollbarGutter?: 'stable' | false
} & Omit<ScrollViewAllProps, 'children' | 'scrollbarGutter'>
