import { ToCamelCasePartial } from '../../shared/helpers/withCamelCaseProps'
import { ScrollViewProps } from '../../fragments/ScrollView'
import { ModalPropTypes } from '../modal/Modal'

export interface DialogProps extends ToCamelCasePartial<ModalPropTypes> {
  /**
   * The dialog title. Displays on the very top of the content.
   */
  title?: React.ReactNode

  /**
   * Variant of Dialog (coming)
   */
  // variant: 'inform' | 'confirm'
}

export interface DialogContentProps extends ScrollViewProps {
  /**
   * The minimum Dialog content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).
   */
  minWidth?: string | number

  /**
   * The maximum Dialog content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).
   */
  maxWidth?: string | number

  /**
   * Give the Dialog content a class name (maps to `dnb-dialog`).
   */
  className?: string

  /**
   * If set to `false` then the dialog content will be shown without any spacing. Defaults to `true`.
   */
  spacing?: string | boolean

  /**
   * By default the dialog content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.
   */
  preventCoreStyle?: string | boolean

  /**
   * The content which will appear in the navigation, above the header, and side-by-side the close button.
   */
  navContent?: React.ReactNode | ((...args: any[]) => any)

  /**
   * The content which will appear in the header of the dialog.
   */
  headerContent?: React.ReactNode | ((...args: any[]) => any)

  /**
   * The content which will appear when triggering the dialog.
   */
  modalContent?: React.ReactNode | ((...args: any[]) => any)

  /**
   * Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.
   */
  alignContent?: 'left' | 'right' | 'centered' | 'center'

  /**
   * If set to `true` then the dialog content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.
   */
  fullscreen?: string | boolean

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  noAnimation?: string | boolean

  /**
   * Same as `noAnimation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.
   */
  noAnimationOnMobile?: string | boolean
}
