import { PropertiesTableProps } from '../../shared/types'

export const SkeletonHelperProperties: PropertiesTableProps = {
  show: {
    doc: 'Use `true` to enable/show the skeleton for the component used inside. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  figure: {
    doc: 'Define a figure to use, like `article`. The wrapped content will be hidden while the skeleton figure is shown.',
    type: 'unknown',
    state: 'optional',
  },
  no_animation: {
    doc: 'Use `true` to disable the animation.',
    type: 'unknown',
    state: 'optional',
  },
  aria_busy: {
    doc: 'Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.',
    type: 'unknown',
    state: 'optional',
  },
  aria_ready: {
    doc: 'Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.',
    type: 'unknown',
    state: 'optional',
  },
  element: {
    doc: 'Set any HTML element type you have to use. A couple of aria attributes will be set on this element while active. Defaults to `div`.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
