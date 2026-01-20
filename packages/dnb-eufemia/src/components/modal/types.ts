import * as React from 'react'
import type { CloseButtonProps } from './parts/CloseButton'
import type { ButtonProps } from '../button/Button'
import type { ModalRootProps } from './ModalRoot'

export type ReactChildType = React.ReactNode | ((...args: any[]) => any)

export type ModalFullscreen = 'auto' | boolean
export type ModalAlignContent = 'left' | 'center' | 'centered' | 'right'
export type ModalContainerPlacement = 'left' | 'right' | 'top' | 'bottom'
export type ModalTriggerVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'signal'
export type ModalTriggerIconPosition = 'left' | 'right'
export type ModalContentMinWidth = string | number
export type ModalContentMaxWidth = string | number

export type TriggeredBy =
  | 'handler'
  | 'button'
  | 'overlay'
  | 'keyboard'
  | 'unmount'
export type CloseHandlerParams = {
  triggeredBy: TriggeredBy
  triggeredByEvent?: Event
}
export type CloseHandler = (params?: CloseHandlerParams) => void

export interface ModalProps extends ModalRootProps {
  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  id?: string

  /**
   * Will disable the trigger button.
   */
  disabled?: boolean

  /**
   * Forces the modal/drawer to delay the opening. The delay is given in `ms`.
   */
  openDelay?: string | number

  /**
   * If set to `true` (boolean or string), then the user can&#39;t close the modal/drawer.
   */
  preventClose?: boolean

  /**
   * Duration of animation open/close in ms. Defaults to 300ms.
   */
  animationDuration?: string | number

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  noAnimation?: boolean

  /**
   * Use this prop to control the open/close state by setting `true` / `false`.
   */
  open?: boolean

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactChildType

  /**
   * Omits default showing trigger button
   */
  omitTriggerButton?: boolean

  /**
   * This event gets triggered once the modal shows up. Returns the modal id: `{ id }`.
   */
  onOpen?: ({ id }: { id?: string }) => void

  /**
   * This event gets triggered once the modal gets closed. Returns the modal id: `{ id, event, triggeredBy }`.
   */
  onClose?: ({
    id,
    event,
    triggeredBy,
  }: {
    id?: string
    event?: Event
    triggeredBy?: string
  }) => void

  /**
   * This event gets triggered once the user tries to close the modal, but `preventClose` is set to "true". Returns a callback `close` you can call to trigger the close mechanism. More details below. Returns the modal id: `{ id, event, close: Method, triggeredBy }`
   */
  onClosePrevent?: ({
    id,
    event,
    triggeredBy,
    close,
  }: {
    id?: string
    event?: Event
    triggeredBy?: string
    close?: CloseHandler
  }) => void

  /**
   * Set a function to call the callback function, once the modal/drawer should open: `openModal={(open) => open()}`
   */
  openModal?: (
    open?: (e: Event) => void,
    instance?: any
  ) => () => void | void

  /**
   * Set a function to call the callback function, once the modal/drawer should close: `closeModal={(close) => close()}`
   */
  closeModal?: (close?: CloseHandler, instance?: any) => () => void | void

  /**
   * Provide a custom trigger component. Like trigger={<Anchor href="/" />}. It will set the focus on it when the modal/drawer gets closed.
   */
  trigger?: ReactChildType

  /**
   * Send along custom HTML attributes or properties to the trigger button.
   */
  triggerAttributes?: TriggerAttributes

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  modalContent?: ReactChildType

  /**
   * If true, the drawer will not open in a new DOM but directly in current DOM. Defaults to `false`.
   */
  directDomReturn?: boolean

  /**
   * To get the inner content Element, pass in your own React ref
   */
  contentRef?: React.RefObject<HTMLElement>

  /**
   * To get the scroll Element, pass in your own React ref
   */
  scrollRef?: React.RefObject<HTMLElement>
}

export interface ModalContentProps {
  /**
   * The content which will appear when triggering the modal/drawer.
   */
  modalContent?: ReactChildType

  /**
   * The content which will appear in the bar, above the header, and side-by-side the close button.
   */
  barContent?: ReactChildType

  /**
   * The content which will appear in the header of the modal/drawer the modal/drawer.
   */
  headerContent?: ReactChildType
  hide?: boolean

  /**
   * The id used internal for the trigger button and modal component.
   */
  id?: string

  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  rootId?: string

  /**
   * The ID of the trigger component, describing the modal/drawer content. Defaults to the internal `trigger`, so make sure you define the trigger title.
   */
  labelledBy?: string

  /**
   * The Modal handles the first focus – automatically. How ever, you can defined a custom focus selector the will be used instead `focusSelector=".css-selector"`.
   */
  focusSelector?: string

  /**
   * Defines an unique identifier to a modal. Use it in case you have to refer in some way to the modal/drawer content wrapper.
   */
  contentId?: string

  /**
   * The modal/drawer title. Displays on the very top of the content.
   */
  title?: React.ReactNode

  /**
   * The aria label of the dialog when no labelledBy and no title is given. Defaults to `Vindu`.
   */
  dialogTitle?: string

  /**
   * If boolean, the close button will not be shown.
   */
  hideCloseButton?: boolean

  /**
   * Define any valid Eufemia Button property or HTML attribute inside an object.
   */
  closeButtonAttributes?: CloseButtonProps

  /**
   * If set to `false` then the modal/drawer content will be shown without any spacing. Defaults to `true`.
   */
  spacing?: boolean

  /**
   * By default the modal/drawer content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.
   */
  preventCoreStyle?: boolean
  animationDuration?: string | number

  /**
   * Disable clicking the background overlay to close the modal
   */
  preventOverlayClose?: boolean

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  noAnimation?: boolean

  /**
   * Same as `noAnimation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.
   */
  noAnimationOnMobile?: boolean

  /**
   * The minimum Modal content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don&#39;t break responsiveness. Defaults to `30rem` (average width is set to `60vw`).
   */
  minWidth?: ModalContentMinWidth

  /**
   * The maximum Modal content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).
   */
  maxWidth?: ModalContentMaxWidth

  /**
   * If set to `true` then the modal/drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.
   */
  fullscreen?: ModalFullscreen

  /**
   * Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.
   */
  alignContent?: 'right' | 'left' | 'centered' | 'center'

  /**
   * For `drawer` mode only. Defines the placement on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  containerPlacement?: 'left' | 'right' | 'top' | 'bottom'

  /**
   * Define the vertical alignment of the container. Can be set to `top` or `center`. Defaults to `center`.
   */
  verticalAlignment?: 'top' | 'center'

  /**
   * Give the content wrapper a custom class name (maps to `dnb-modal__content`).
   */
  contentClass?: string

  /**
   * Give the page overlay a custom class name (maps to `dnb-modal__overlay`).
   */
  overlayClass?: string

  /**
   * Define an array with HTML class selectors (`['.element-selector']`) which should not get invalidated when the modal opens/closes. Use this in order to let some parts of your site still be accessible by screen readers.
   */
  bypassInvalidationSelectors?: Array<string>

  /**
   * For internal usage
   * Will close the modal
   */
  close?: (...args: any[]) => any

  /**
   * Give the inner Dialog or Drawer component a className (only works with mode)
   */
  className?: string

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactChildType

  /**
   * The displayed text for the 'close' button. Defaults to `Lukk`.
   */
  closeTitle?: string

  /**
   * Internal
   */
  dialogRole?: 'dialog' | 'alertdialog' | 'region'
  contentRef?: React.RefObject<HTMLElement>
  scrollRef?: React.RefObject<HTMLElement>
  open?: boolean
  modalContentCloseRef?: React.MutableRefObject<any>
}

export type TriggerAttributes = ButtonProps
