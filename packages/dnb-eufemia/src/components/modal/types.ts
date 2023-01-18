import * as React from 'react'
import { CloseButtonProps } from './parts/CloseButton'
import { ButtonProps } from '../button/Button'
import { ModalRootProps } from './ModalRoot'

export type ExtendedBoolean = string | boolean
export type ReactChildType = React.ReactNode | ((...args: any[]) => any)

export type ModalFullscreen = 'auto' | ExtendedBoolean
export type ModalAlignContent = 'left' | 'center' | 'centered' | 'right'
export type ModalContainerPlacement = 'left' | 'right' | 'top' | 'bottom'
export type ModalOpenState = 'opened' | 'closed' | boolean
export type ModalTriggerVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'signal'
export type ModalTriggerIconPosition = 'left' | 'right'
export type ModalContentMinWidth = string | number
export type ModalContentMaxWidth = string | number

export interface ModalProps extends ModalRootProps {
  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  id?: string

  /**
   * Will disable the trigger button
   */
  disabled?: ExtendedBoolean

  /**
   * Forces the modal/drawer to delay the opening. The delay is given in `ms`.
   */
  open_delay?: string | number

  /**
   * If set to `true` (boolean or string), then the user can&#39;t close the modal/drawer.
   */
  prevent_close?: ExtendedBoolean

  /**
   * Duration of animation open/close in ms. Defaults to 300ms.
   */
  animation_duration?: string | number

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  no_animation?: ExtendedBoolean

  /**
   * Use this prop to control the open/close state by setting either: `opened` / `closed` or `true` / `false`.
   */
  open_state?: ModalOpenState

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactChildType

  /**
   * Omits default showing trigger button
   */
  omit_trigger_button?: boolean

  /**
   * This event gets triggered once the modal shows up. Returns the modal id: `{ id }`.
   */
  on_open?: ({ id }: { id?: string }) => void

  /**
   * This event gets triggered once the modal gets closed. Returns the modal id: `{ id, event, triggeredBy }`.
   */
  on_close?: ({
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
  on_close_prevent?: ({
    id,
    event,
    triggeredBy,
    close,
  }: {
    id?: string
    event?: Event
    triggeredBy?: string
    close?: (...args: any[]) => any
  }) => void

  /**
   * Set a function to call the callback function, once the modal/drawer should open: `open_modal={(open) => open()}`
   */
  open_modal?: (open?: (e: Event) => void, elem?: any) => () => void | void

  /**
   * Set a function to call the callback function, once the modal/drawer should close: `close_modal={(close) => close()}`
   */
  close_modal?: (
    close?: (...args: any[]) => void,
    elem?: any
  ) => () => void | void

  /**
   * Provide a custom trigger component. Like trigger={<Anchor href="/" />}. It will set the focus on it when the modal/drawer gets closed.
   */
  trigger?: ReactChildType

  /**
   * Send along custom HTML attributes or properties to the trigger button.
   */
  trigger_attributes?: TriggerAttributes

  /**
   * If truthy, the drawer will not open in a new DOM but directly in current DOM. Defaults to `false`.
   */
  direct_dom_return?: string | boolean

  /**
   * To get the inner content Element, pass in your own React ref
   */
  content_ref?: React.RefObject<HTMLElement>

  /**
   * To get the scroll Element, pass in your own React ref
   */
  scroll_ref?: React.RefObject<HTMLElement>
}

export interface ModalContentProps {
  hide?: boolean

  /**
   * The id used internal for the trigger button and modal component.
   */
  id?: string

  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  root_id?: string

  /**
   * The ID of the trigger component, describing the modal/drawer content. Defaults to the internal `trigger`, so make sure You define the trigger title.
   */
  labelled_by?: string

  /**
   * The Modal handles the first focus – automatically. How ever, you can defined a custom focus selector the will be used instead `focus_selector=".css-selector"`.
   */
  focus_selector?: string

  /**
   * Defines an unique identifier to a modal. Use it in case you have to refer in some way to the modal/drawer content wrapper.
   */
  content_id?: string

  /**
   * The modal/drawer title. Displays on the very top of the content.
   */
  title?: React.ReactNode

  /**
   * The aria label of the dialog when no labelled_by and no title is given. Defaults to `Vindu`.
   */
  dialog_title?: string

  /**
   * If truthy, the close button will not be shown.
   */
  hide_close_button?: ExtendedBoolean

  /**
   * Define any valid Eufemia Button property or HTML attribute inside an object.
   */
  close_button_attributes?: CloseButtonProps

  animation_duration?: string | number

  /**
   * Disable clicking the background overlay to close the modal
   */
  prevent_overlay_close?: ExtendedBoolean

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  no_animation?: ExtendedBoolean

  /**
   * Same as `no_animation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.
   */
  no_animation_on_mobile?: ExtendedBoolean

  /**
   * If set to `true` then the modal/drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.
   */
  fullscreen?: ModalFullscreen

  /**
   * For `drawer` mode only. Defines the placement on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  container_placement?: 'left' | 'right' | 'top' | 'bottom'

  /**
   * Give the content wrapper a custom class name (maps to `dnb-modal__content`).
   */
  content_class?: string

  /**
   * Give the page overlay a custom class name (maps to `dnb-modal__overlay`).
   */
  overlay_class?: string

  /**
   * Define an array with HTML class selectors (`['.element-selector']`) which should not get invalidated when the modal opens/closes. Use this in order to let some parts of your site still be accessible by screen readers.
   */
  bypass_invalidation_selectors?: Array<string>

  /**
   * For internal usage
   * Will close the modal
   */
  close?: (...args: any[]) => any

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactChildType

  /**
   * The displayed text for the 'close' button. Defaults to `Lukk`.
   */
  close_title?: string

  /**
   * Internal
   */
  dialog_role?: 'dialog' | 'alertdialog' | 'region'
  content_ref?: React.RefObject<HTMLElement>
  scroll_ref?: React.RefObject<HTMLElement>
}

export type TriggerAttributes = ButtonProps
