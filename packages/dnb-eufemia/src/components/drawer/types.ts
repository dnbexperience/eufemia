import { ToCamelCasePartial } from '../../shared/helpers/withCamelCaseProps'
import { ScrollViewProps } from '../../fragments/ScrollView'
import { ModalPropTypes } from '../modal/Modal'

export interface DrawerProps extends ToCamelCasePartial<ModalPropTypes> {
  /**
   * Defines the placement on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  containerPlacement?: 'left' | 'right' | 'top' | 'bottom'

  /**
   * The drawer title. Displays on the very top of the content.
   */
  title?: React.ReactNode
}

export interface DrawerContentProps extends ScrollViewProps {
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
  spacing?: string | boolean

  /**
   * By default the drawer content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.
   */
  preventCoreStyle?: string | boolean

  /**
   * The content which will appear in the navigation, above the header, and side-by-side the close button.
   */
  navContent?: React.ReactNode | ((...args: any[]) => any)

  /**
   * The content which will appear in the header of the drawer.
   */
  headerContent?: React.ReactNode | ((...args: any[]) => any)

  /**
   * The content which will appear when triggering the drawer.
   */
  modalContent?: React.ReactNode | ((...args: any[]) => any)

  /**
   * Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.
   */
  alignContent?: 'left' | 'right' | 'centered' | 'center'

  /**
   * If set to `true` then the drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.
   */
  fullscreen?: string | boolean

  /**
   * Defines the placement on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  containerPlacement?: string

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  noAnimation?: string | boolean

  /**
   * Same as `no_animation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.
   */
  noAnimationOnMobile?: string | boolean
}
