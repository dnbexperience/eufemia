import type { PropertiesTableProps } from '../../shared/types'

export const DrawerProperties: PropertiesTableProps = {
  containerPlacement: {
    doc: 'Defines on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.',
    type: ['left', 'right', 'top', 'bottom'],
    status: 'optional',
  },
  title: {
    doc: 'The drawer title. Displays on the very top of the content.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  minWidth: {
    doc: "The minimum Drawer content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).",
    type: ['string', 'number'],
    status: 'optional',
  },
  maxWidth: {
    doc: 'The maximum Drawer content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).',
    type: ['string', 'number'],
    status: 'optional',
  },
  className: {
    doc: 'Give the Drawer content a class name (maps to `dnb-drawer`).',
    type: 'string',
    status: 'optional',
  },
  spacing: {
    doc: 'If set to `false` then the drawer content will be shown without any spacing. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  preventCoreStyle: {
    doc: 'By default the drawer content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.',
    type: 'boolean',
    status: 'optional',
  },
  navContent: {
    doc: 'The content which will appear in the navigation, above the header, and side-by-side the close button.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  headerContent: {
    doc: 'The content which will appear in the header of the drawer.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  modalContent: {
    doc: 'The content which will appear when triggering the drawer.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  alignContent: {
    doc: 'Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.',
    type: ['left', 'right', 'centered', 'center'],
    status: 'optional',
  },
  fullscreen: {
    doc: 'If set to `true` then the drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.',
    type: ['boolean', 'string'],
    status: 'optional',
  },
}
