import { PropertiesTableProps } from '../../shared/types'

export const SkeletonProperties: PropertiesTableProps = {
  show: {
    doc: 'Use `true` to enable/show the skeleton for the component used inside. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  figure: {
    doc: 'Define a figure to use, like `article`. The wrapped content will be hidden while the skeleton figure is shown.',
    type: ['string', 'React.Element', 'function'],
    status: 'optional',
  },
  noAnimation: {
    doc: 'Use `true` to disable the animation.',
    type: 'boolean',
    status: 'optional',
  },
  ariaBusy: {
    doc: 'Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.',
    type: 'string',
    status: 'optional',
  },
  ariaReady: {
    doc: 'Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.',
    type: 'string',
    status: 'optional',
  },
  element: {
    doc: 'Set any HTML element type you have to use. A couple of aria attributes will be set on this element while active. Defaults to `div`.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
