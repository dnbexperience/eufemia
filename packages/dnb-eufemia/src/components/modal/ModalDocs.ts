import { PropertiesTableProps } from '../../shared/types'

export const ModalProperties: PropertiesTableProps = {
  id: {
    doc: 'The id used internal for the trigger button and Modal component.',
    type: 'string',
    status: 'optional',
  },
  rootId: {
    doc: 'The id used internal in the modal root element. Defaults to `root`, so the element id will be `dnb-modal-root`.',
    type: 'string',
    status: 'optional',
  },
  contentId: {
    doc: 'Defines an unique identifier to a modal. Use it in case you have to refer in some way to the modal content.',
    type: 'string',
    status: 'optional',
  },
  labelledBy: {
    doc: 'The ID of the trigger component, describing the modal content. Defaults to the internal `trigger`, so make sure you define the `title` in `triggerAttributes`.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'the content which will appear when triggering open the modal. If a function is given, you get a close method `() => ({ close })` in the arguments.',
    type: ['React.ReactNode', 'function'],
    status: 'optional',
  },
  fullscreen: {
    doc: 'If set to `true` then the modal content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.',
    type: 'boolean',
    status: 'optional',
  },
  openState: {
    doc: 'use this property to control the open/close state by setting either: `opened` / `closed` or `true` / `false`.',
    type: ['boolean', 'opened', 'closed'],
    status: 'optional',
  },
  openDelay: {
    doc: 'forces the modal to delay the opening. The delay is given in `ms`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  disabled: {
    doc: 'Will disable the trigger button.',
    type: 'boolean',
    status: 'optional',
  },
  noAnimation: {
    doc: 'if set to `true`, no open/close animation will be shown. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  noAnimationOnMobile: {
    doc: 'same as `noAnimation`, but gets triggered only if the viewport width is less than `40em`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  animationDuration: {
    doc: 'Duration of animation open/close in ms. Defaults to 300ms.',
    type: ['number', 'string'],
    status: 'optional',
  },
  preventClose: {
    doc: "if set to `true` (boolean or string), then the user can't close the modal.",
    type: 'boolean',
    status: 'optional',
  },
  preventOverlayClose: {
    doc: 'Disable clicking the background overlay to close the modal. PS! Pressing `esc` key will still close the modal.',
    type: 'boolean',
    status: 'optional',
  },
  openModal: {
    doc: 'set a function to call the callback function, once the modal should open: `openModal={(open) => open()}`.',
    type: 'function',
    status: 'optional',
  },
  closeModal: {
    doc: 'set a function to call the callback function, once the modal should close: `closeModal={(close) => close()}`.',
    type: 'function',
    status: 'optional',
  },
  focusSelector: {
    doc: 'The Modal handles the first focus – automatically. However, you can define a custom focus selector the will be used instead `focusSelector=".css-selector"`.',
    type: 'string',
    status: 'optional',
  },
  overlayClass: {
    doc: 'give the page overlay a custom class name (maps to `dnb-modal__overlay`).',
    type: 'string',
    status: 'optional',
  },
  contentClass: {
    doc: 'give the content wrapper a custom class name (maps to `dnb-modal__content`).',
    type: 'string',
    status: 'optional',
  },
  omitTriggerButton: {
    doc: 'omits default showing trigger button.',
    type: 'boolean',
    status: 'optional',
  },
  trigger: {
    doc: 'provide a custom trigger component. Like `trigger={<Anchor href="/" />}`. It will set the focus on it when the modal gets closed.',
    type: ['React.ReactNode', 'function'],
    status: 'optional',
  },
  triggerAttributes: {
    doc: 'send along with custom HTML attributes or properties to the trigger button.',
    type: 'Various',
    status: 'optional',
  },
  dialogTitle: {
    doc: 'The aria label of the dialog when no labelledBy and no title is given. Defaults to `Vindu`.',
    type: 'string',
    status: 'optional',
  },
  directDomReturn: {
    doc: 'If true, the modal will not open in a new DOM but directly in current DOM. Defaults to `false`. Be aware of the side effects of setting this property to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  bypassInvalidationSelectors: {
    doc: "Define an array with HTML class selectors (`['.element-selector']`) which should not get invalidated when the modal opens/closes. Use this in order to let some parts of your site still be accessible by screen readers.",
    type: 'boolean',
    status: 'optional',
  },
  scrollRef: {
    doc: 'To get the scroll Element, pass in your own React ref.',
    type: 'React.RefObject',
    status: 'optional',
  },
  contentRef: {
    doc: 'To get the inner content Element, pass in your own React ref.',
    type: 'React.RefObject',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
  spacing: {
    doc: 'if set to `false` then the modal content will be shown without any spacing. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  closeTitle: {
    doc: 'the title of the close button. Defaults to _Lukk_.',
    type: 'string',
    status: 'optional',
  },
  hideCloseButton: {
    doc: 'if true, the close button will not be shown.',
    type: 'boolean',
    status: 'optional',
  },
  class: {
    doc: 'give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).',
    type: 'string',
    status: 'optional',
  },
  className: {
    doc: 'give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).',
    type: 'string',
    status: 'optional',
  },
}

export const ModalEvents: PropertiesTableProps = {
  onOpen: {
    doc: 'This event gets triggered once the modal shows up. Returns the modal id: `{ id }`.',
    type: 'function',
    status: 'optional',
  },
  onClose: {
    doc: 'This event gets triggered once the modal gets closed. Returns the modal id: `{ id, event, triggeredBy }`.',
    type: 'function',
    status: 'optional',
  },
  onClosePrevent: {
    doc: 'This event gets triggered once the user tries to close the modal, but `preventClose` is set to **true**. Returns a callback `close` you can call to trigger the close mechanism. More details below. Returns the modal id: `{ id, event, close: Method, triggeredBy }`.',
    type: 'function',
    status: 'optional',
  },
}
