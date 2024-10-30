import { PropertiesTableProps } from '../../shared/types'

export const DialogProperties: PropertiesTableProps = {
  variant: {
    doc: 'The dialog variant. Can either be `information` or `confirmation`. Defaults to `information`.',
    type: 'string',
    status: 'optional',
  },
  title: {
    doc: 'The dialog title. Displays on the very top of the content.',
    type: 'string',
    status: 'optional',
  },
  minWidth: {
    doc: "The minimum Dialog content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).",
    type: 'string',
    status: 'optional',
  },
  maxWidth: {
    doc: 'The maximum Dialog content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).',
    type: 'string',
    status: 'optional',
  },
  className: {
    doc: 'Give the Dialog content a class name (maps to `dnb-dialog`).',
    type: 'string',
    status: 'optional',
  },
  spacing: {
    doc: 'If set to `false` then the dialog content will be shown without any spacing. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  preventCoreStyle: {
    doc: 'By default the dialog content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.',
    type: 'boolean',
    status: 'optional',
  },
  navContent: {
    doc: 'The content which will appear in the navigation, above the header, and side-by-side the close button.',
    type: 'React.Node',
    status: 'optional',
  },
  headerContent: {
    doc: 'The content which will appear in the header of the dialog.',
    type: 'React.Node',
    status: 'optional',
  },
  modalContent: {
    doc: 'The content which will appear when triggering the dialog.',
    type: 'React.Node',
    status: 'optional',
  },
  description: {
    doc: 'A description will be positioned below the title, but before the content. Used for Dialog variant `confirmation` to further describe what the actions will do.',
    type: 'string',
    status: 'optional',
  },
  verticalAlignment: {
    doc: 'Define the vertical alignment of the container. Can be set to `top` or `center`. Defaults to `center`.',
    type: 'string',
    status: 'optional',
  },
  alignContent: {
    doc: 'Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.',
    type: 'string',
    status: 'optional',
  },
  fullscreen: {
    doc: 'If set to `true` then the dialog content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.',
    type: 'boolean',
    status: 'optional',
  },
  icon: {
    doc: 'An icon to display at the top of the component. Should be of size medium, so make sure you import the `_medium` version of the Eufemia icon.',
    type: 'React.Node',
    status: 'optional',
  },
  confirmType: {
    doc: 'For variant confirmation, the dialog is either an informational (`info`) or a warning (`warning`) message. Defaults to `info`.',
    type: 'string',
    status: 'optional',
  },
  declineText: {
    doc: 'For dialog actions, give a custom text for the decline button.',
    type: 'string',
    status: 'optional',
  },
  confirmText: {
    doc: 'For dialog actions, give a custom text for the confirmation button.',
    type: 'string',
    status: 'optional',
  },
  hideDecline: {
    doc: 'For variant confirmation, hide the default decline button and only show the confirmation button.',
    type: 'boolean',
    status: 'optional',
  },
  hideConfirm: {
    doc: 'For variant confirmation, hide the default confirm button and only show the decline button.',
    type: 'boolean',
    status: 'optional',
  },
  scrollRef: {
    doc: 'To get the scroll Element, pass in your own React ref.',
    type: 'React.Ref',
    status: 'optional',
  },
  contentRef: {
    doc: 'To get the inner content Element, pass in your own React ref.',
    type: 'React.Ref',
    status: 'optional',
  },
}
