import { CloseButtonProps } from './parts/CloseButton'
import { TriggerAttributes } from './types'
import Modal from './Modal'

export interface ModalPropsV2 {
  /**
   * The id used internal for the trigger button and Modal component.
   */
  id?: string

  /**
   * The id used internal in the modal root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  rootId?: string

  /**
   * Defines an unique identifier to a modal. Use it in case you have to refer in some way to the modal content.
   */
  contentId?: string

  /**
   * The Modal handles the first focus – automatically. How ever, you can defined a custom focus selector the will be used instead `focusSelector=".css-selector"`.
   */
  focusSelector?: string

  /**
   * The ID of the trigger component, describing the modal content. Defaults to the internal `trigger`, so make sure You define the `trigger_title`.
   */
  labelledBy?: string

  /**
   * If truthy, the modal will not open in a new DOM but directly in current DOM. Defaults to `false`.
   */
  directDomReturn?: string | boolean

  /**
   * If truthy, the close button will not be shown.
   */
  hideCloseButton?: string | boolean

  /**
   * Define any valid Eufemia Button property or HTML attribute inside an object.
   */
  closeButtonAttributes?: CloseButtonProps

  /**
   * Will disable the trigger button
   */
  disabled?: string | boolean

  /**
   * The aria label of the dialog when no labelled_by and no title is given. Defaults to `Vindu`.
   */
  dialogTitle?: string

  /**
   * The displayed text for the 'close' button. Defaults to `Lukk`.
   */
  closeTitle?: string

  /**
   * If set to `false` then the modal content will be shown without any spacing. Defaults to `true`.
   */
  spacing?: string | boolean

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  noAnimation?: string | boolean

  /**
   * Same as `no_animation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.
   */
  noAnimationOnMobile?: string | boolean

  /**
   * Duration of animation open/close in ms. Defaults to 300ms.
   */
  animationDuration?: string | number

  /**
   * If set to `true` then the modal content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.
   */
  fullscreen?: 'auto' | string | boolean

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
   * This event gets triggered once the user tries to close the modal, but `prevent_close` is set to "true". Returns a callback `close` You can call to trigger the close mechanism. More details below. Returns the modal id: `{ id, event, close: Method, triggeredBy }`
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
    close?: (...args: any[]) => void
  }) => void

  /**
   * Set a function to call the callback function, once the modal should open: `openModal={(open) => open()}`
   */
  openModal?: (
    open?: (e: Event) => void,
    elem?: Modal
  ) => () => void | void

  /**
   * Set a function to call the callback function, once the modal should close: `closeModal={(close) => close()}`
   */
  closeModal?: (
    close?: (...args: any[]) => void,
    elem?: Modal
  ) => () => void | void

  /**
   * If set to `true` (boolean or string), then the user can't close the modal.
   */
  preventClose?: string | boolean

  /**
   * Use this prop to control the open/close state by setting either: `opened` / `closed` or `true` / `false`.
   */
  openState?: 'opened' | 'closed' | boolean

  /**
   * Forces the modal to delay the opening. The delay is given in `ms`.
   */
  openDelay?: string | number

  /**
   * Provide a custom trigger component. Like trigger={<Anchor href="/" />}. It will set the focus on it when the modal gets closed.
   */
  trigger?: React.ReactNode | ((...args: any[]) => any)

  /**
   * Send along custom HTML attributes or properties to the trigger button.
   */
  triggerAttributes?: TriggerAttributes

  /**
   * Give the page overlay a custom class name (maps to `dnb-modal__overlay`).
   */
  overlayClass?: string

  /**
   * Give the content wrapper a custom class name (maps to `dnb-modal__content`).
   */
  contentClass?: string
}
