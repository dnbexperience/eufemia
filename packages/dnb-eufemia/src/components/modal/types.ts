import * as React from 'react'
import { ISpacingProps, SpaceTypes } from '../../shared/interfaces'

export type ModalMode = 'modal' | 'drawer'
export type ModalDisabled = string | boolean
export type ModalSpacing = string | boolean
export type ModalOpenDelay = string | number
export type ModalHideCloseButton = string | boolean
export type ModalPreventClose = string | boolean
export type ModalPreventCoreStyle = string | boolean
export type ModalAnimationDuration = string | number
export type ModalNoAnimation = string | boolean
export type ModalNoAnimationOnMobile = string | boolean
export type ModalFullscreen = 'auto' | any | 'true' | 'false'
export type ModalAlignContent = 'left' | 'center' | 'centered' | 'right'
export type ModalContainerPlacement = 'left' | 'right' | 'top' | 'bottom'
export type ModalOpenState = 'opened' | 'closed' | boolean
export type ModalDirectDomReturn = string | boolean
export type ModalChildren = React.ReactNode | ((...args: any[]) => any)
export type ModalTrigger = React.ReactNode | ((...args: any[]) => any)
export type ModalTriggerHidden = string | boolean
export type ModalTriggerDisabled = string | boolean
export type ModalTriggerVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'signal'
export type ModalTriggerIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)
export type ModalTriggerIconPosition = 'left' | 'right'
export type ModalModalContent =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)
export type ModalContentMinWidth = string | number
export type ModalContentMaxWidth = string | number
export type ModalContentChildren =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)

export interface ModalProps {
  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  id?: string
  root_id?: string

  /**
   * The modal/drawer mode. Can be set to `drawer`. Defaults to `modal`.
   */
  mode?: ModalMode

  /**
   * The Modal handles the first focus – automatically. How ever, you can defined a custom focus selector the will be used instead `focus_selector=".css-selector"`.
   */
  focus_selector?: string

  /**
   * The ID of the trigger component, describing the modal/drawer content. Defaults to the internal `trigger`, so make sure You define the `trigger_title`.
   */
  labelled_by?: string

  /**
   * The modal/drawer title. Displays on the very top of the content.
   */
  title?: React.ReactNode
  disabled?: ModalDisabled

  /**
   * If set to `false` then the modal/drawer content will be shown without any spacing. Defaults to `true`.
   */
  spacing?: ModalSpacing

  /**
   * Forces the modal/drawer to delay the opening. The delay is given in `ms`.
   */
  open_delay?: ModalOpenDelay

  /**
   * Defines an unique identifier to a modal. Use it in case you have to refer in some way to the modal/drawer content wrapper.
   */
  content_id?: string
  dialog_title?: string

  /**
   * The title of the close button. Defaults to <em>Close Modal Window</em>.
   */
  close_title?: string

  /**
   * If truthy, the close button will not be shown.
   */
  hide_close_button?: ModalHideCloseButton

  /**
   * Define any valid Eufemia Button property or HTML attribute inside an object.
   */
  close_button_attributes?: { [x: string]: any }

  /**
   * If set to `true` (boolean or string), then the user can&#39;t close the modal/drawer.
   */
  prevent_close?: ModalPreventClose

  /**
   * By default the modal/drawer content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.
   */
  prevent_core_style?: ModalPreventCoreStyle
  animation_duration?: ModalAnimationDuration

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  no_animation?: ModalNoAnimation

  /**
   * Same as `no_animation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.
   */
  no_animation_on_mobile?: ModalNoAnimationOnMobile

  /**
   * If set to `true` then the modal/drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.
   */
  fullscreen?: ModalFullscreen

  /**
   * The minimum Modal content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `min_width` so you don&#39;t break responsiveness. Defaults to `30rem` (average width is set to `60vw`).
   */
  min_width?: string

  /**
   * The maximum Modal content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).
   */
  max_width?: string

  /**
   * Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.
   */
  align_content?: ModalAlignContent

  /**
   * For `drawer` mode only. Defines the placement on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  container_placement?: ModalContainerPlacement

  /**
   * Use this prop to control the open/close state by setting either: `opened` / `closed` or `true` / `false`.
   */
  open_state?: ModalOpenState
  direct_dom_return?: ModalDirectDomReturn

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: ISpacingProps

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: SpaceTypes

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: SpaceTypes

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: SpaceTypes

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: SpaceTypes

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  class?: string

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ModalChildren

  /**
   * This event gets triggered once the modal shows up. Returns the modal id: `{ id }`.
   */
  on_open?: (...args: any[]) => any

  /**
   * This event gets triggered once the modal gets closed. Returns the modal id: `{ id, event, triggeredBy }`.
   */
  on_close?: (...args: any[]) => any

  /**
   * This event gets triggered once the user tries to close the modal, but `prevent_close` is set to "true". Returns a callback `close` You can call to trigger the close mechanism. More details below. Returns the modal id: `{ id, event, close: Method, triggeredBy }`
   */
  on_close_prevent?: (...args: any[]) => any

  /**
   * Set a function to call the callback function, once the modal/drawer should open: `open_modal={(open) => open()}`
   */
  open_modal?: (...args: any[]) => any

  /**
   * Set a function to call the callback function, once the modal/drawer should close: `close_modal={(close) => close()}`
   */
  close_modal?: (...args: any[]) => any
  trigger?: ModalTrigger

  /**
   * Send along custom HTML attributes or properties to the trigger button.
   */
  trigger_attributes?: { [x: string]: any }

  /**
   * If truthy, no trigger button will be show. This can be used in combination with `open_state="opened"`.
   */
  trigger_hidden?: ModalTriggerHidden

  /**
   * If truthy, then the trigger button can&#39;t be opened.
   */
  trigger_disabled?: ModalTriggerDisabled

  /**
   * The modal/drawer triggering button variant. Defaults to `secondary`.
   */
  trigger_variant?: ModalTriggerVariant

  /**
   * If type is set to `text`, this will be the text which triggers the modal/drawer. If set to `button` it will be the `title` attribute of the button.
   */
  trigger_text?: string

  /**
   * The modal/drawer triggering button title.
   */
  trigger_title?: string
  trigger_size?: string

  /**
   * The modal/drawer triggering button icon. Can be used instead of a `trigger_text`. Defaults to `question`.
   */
  trigger_icon?: ModalTriggerIcon

  /**
   * Defines the modal/drawer triggering icon position. Defaults to `left` because of the tertiary button variant.
   */
  trigger_icon_position?: ModalTriggerIconPosition

  /**
   * Adds a custom modal trigger class name.
   */
  trigger_class?: string

  /**
   * Give the page overlay a custom class name (maps to `dnb-modal__overlay`).
   */
  overlay_class?: string

  /**
   * Give the content wrapper a custom class name (maps to `dnb-modal__content`).
   */
  content_class?: string

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  modal_content?: ModalModalContent

  /**
   * The content which will appear in the header of the modal/drawer the modal/drawer.
   */
  header_content?: React.ReactNode

  /**
   * The content which will appear in the bar, above the header, and side-by-side the close button.
   */
  bar_content?: React.ReactNode
}

export type ModalRootChildren =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)

export interface ModalRootProps {
  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  id?: string
  root_id?: string
  direct_dom_return?: string | boolean

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ModalRootChildren

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  modal_content: React.ReactNode

  /**
   * Set a function to call the callback function, once the modal/drawer should close: `close_modal={(close) => close()}`
   */
  closeModal: (...args: any[]) => any

  [x: string]: any
}

export interface ModalContentProps {
  /**
   * The content which will appear when triggering the modal/drawer.
   */
  modal_content: React.ReactNode

  /**
   * The modal/drawer mode. Can be set to `drawer`. Defaults to `modal`.
   */
  mode?: ModalMode

  /**
   * The content which will appear in the bar, above the header, and side-by-side the close button.
   */
  bar_content?: React.ReactNode

  /**
   * The content which will appear in the header of the modal/drawer the modal/drawer.
   */
  header_content?: React.ReactNode
  hide?: boolean

  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  id?: string
  root_id?: string

  /**
   * The ID of the trigger component, describing the modal/drawer content. Defaults to the internal `trigger`, so make sure You define the `trigger_title`.
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
   * The title of the close button. Defaults to <em>Close Modal Window</em>.
   */
  close_title?: string
  dialog_title?: string

  /**
   * If truthy, the close button will not be shown.
   */
  hide_close_button?: ModalHideCloseButton

  /**
   * Define any valid Eufemia Button property or HTML attribute inside an object.
   */
  close_button_attributes?: { [x: string]: any }

  /**
   * If set to `false` then the modal/drawer content will be shown without any spacing. Defaults to `true`.
   */
  spacing?: ISpacingProps

  /**
   * If set to `true` (boolean or string), then the user can&#39;t close the modal/drawer.
   */
  prevent_close?: ModalPreventClose

  /**
   * By default the modal/drawer content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.
   */
  prevent_core_style?: ModalPreventCoreStyle
  animation_duration?: ModalAnimationDuration

  /**
   * If set to `true`, no open/close animation will be shown. Defaults to false.
   */
  no_animation?: ModalNoAnimation

  /**
   * Same as `no_animation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.
   */
  no_animation_on_mobile?: ModalNoAnimationOnMobile

  /**
   * The minimum Modal content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `min_width` so you don&#39;t break responsiveness. Defaults to `30rem` (average width is set to `60vw`).
   */
  min_width?: ModalContentMinWidth

  /**
   * The maximum Modal content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).
   */
  max_width?: ModalContentMaxWidth

  /**
   * If set to `true` then the modal/drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.
   */
  fullscreen?: ModalFullscreen

  /**
   * Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.
   */
  align_content?: string

  /**
   * For `drawer` mode only. Defines the placement on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.
   */
  container_placement?: string

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  class?: string

  /**
   * Give the content wrapper a custom class name (maps to `dnb-modal__content`).
   */
  content_class?: string

  /**
   * Give the page overlay a custom class name (maps to `dnb-modal__overlay`).
   */
  overlay_class?: string
  closeModal: (...args: any[]) => any

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ModalContentChildren

  // any other prop
  [x: string]: any
}

export interface ModalHeaderProps {
  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: React.ReactNode

  /**
   * The modal/drawer title. Displays on the very top of the content.
   */
  title?: React.ReactNode

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string
}

export interface ModalHeaderBarProps {
  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: React.ReactNode

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string
}

export interface CloseButtonProps {
  on_click: (...args: any[]) => any

  /**
   * The title of the close button. Defaults to <em>Close Modal Window</em>.
   */
  close_title?: string
  size?: string
  icon_position?: string

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string
}

export interface ModalInnerProps {
  style_type?: string

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string
}
