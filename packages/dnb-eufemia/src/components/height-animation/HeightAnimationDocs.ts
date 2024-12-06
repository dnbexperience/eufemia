import { PropertiesTableProps } from '../../shared/types'

export const HeightAnimationProperties: PropertiesTableProps = {
  open: {
    doc: 'Set to `true` on second re-render when the view should animate from 0px to auto. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  animate: {
    doc: 'Set to `false` to omit the animation. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  keepInDOM: {
    doc: 'Set to `true` ensure the nested children content will be kept in the DOM. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  compensateForGap: {
    doc: 'To compensate for CSS gap between the rows, so animation does not jump during the animation. Provide a CSS unit or `auto`. Defaults to `null`.',
    type: 'string',
    status: 'optional',
  },
  showOverflow: {
    doc: 'Set to `true` to omit the usage of "overflow: hidden;". Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  duration: {
    doc: 'Custom duration of the animation in milliseconds. Defaults to `400ms`.',
    type: 'number',
    status: 'optional',
  },
  delay: {
    doc: 'Custom delay of the animation in milliseconds. Defaults to `0ms`.',
    type: 'number',
    status: 'optional',
  },
  element: {
    doc: 'Custom HTML element for the component. Defaults to `div` HTML Element.',
    type: 'string',
    status: 'optional',
  },
  innerRef: {
    doc: 'Send along a custom React Ref.',
    type: 'React.RefObject',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const HeightAnimationEvents: PropertiesTableProps = {
  onOpen: {
    doc: 'Is called when fully opened or closed. Returns `true` or `false` depending on the state.',
    type: 'function',
    status: 'optional',
  },
  onAnimationStart: {
    doc: 'Is called when animation has started. The first parameter is a string. Depending on the state, the value can be `opening`, `closing` or `adjusting`.',
    type: 'function',
    status: 'optional',
  },
  onAnimationEnd: {
    doc: 'Is called when animation is done and the full height is reached. The first parameter is a string. Depending on the state, the value can be `opened`, `closed` or `adjusted`.',
    type: 'function',
    status: 'optional',
  },
  onInit: {
    doc: 'Is called once before mounting the component (useLayoutEffect). Returns the instance of the internal animation class.',
    type: 'function',
    status: 'optional',
  },
}
