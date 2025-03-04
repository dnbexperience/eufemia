import { PropertiesTableProps } from '../../shared/types'

export const SliderProperties: PropertiesTableProps = {
  value: {
    doc: 'The `value` of the slider as a number or an array. If an array with numbers is provided, each number will represent a thumb button (the `+` and `-` button will be hidden on multiple thumbs).',
    type: ['number', 'Array<number>'],
    status: 'required',
  },
  min: {
    doc: 'The minimum value. Can be a negative number as well. Defaults to `0`.',
    type: 'number',
    status: 'optional',
  },
  max: {
    doc: 'The maximum value. Defaults to `100`.',
    type: 'number',
    status: 'optional',
  },
  step: {
    doc: 'The steps the slider takes on changing the value. Defaults to `null`.',
    type: 'number',
    status: 'optional',
  },
  vertical: {
    doc: 'Show the slider vertically. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  reverse: {
    doc: 'Show the slider reversed. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the slider will be 100% in `width`.',
    type: 'boolean',
    status: 'optional',
  },
  hideButtons: {
    doc: 'Removes the helper buttons. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  multiThumbBehavior: {
    doc: 'Use either `omit`, `push` or `swap`. This property only works for two (range) or more thumb buttons, while `omit` will stop the thumb from swapping, `push` will push its nearest thumb along. Defaults to `swap`.',
    type: 'string',
    status: 'optional',
  },
  thumbTitle: {
    doc: 'Give the slider thumb button a title for accessibility reasons. Defaults to `null`.',
    type: 'string',
    status: 'optional',
  },
  subtractTitle: {
    doc: 'Give the subtract button a title for accessibility reasons. Defaults to `Decrease (%s)`.',
    type: 'string',
    status: 'optional',
  },
  addTitle: {
    doc: 'Give the add button a title for accessibility reasons. Defaults to `Increase (%s)`.',
    type: 'string',
    status: 'optional',
  },
  numberFormat: {
    doc: 'Will extend the return object with a `number` property (from `onChange` event). You can use all the options from the [NumberFormat](/uilib/components/number-format/properties) component. It also will use that formatted number in the increase/decrease buttons. If it has to represent a currency, then use e.g. `numberFormat={{ currency: true, decimals: 0 }}`',
    type: 'object',
    status: 'optional',
  },
  tooltip: {
    doc: 'Use `true` to show a tooltip on `mouseOver`, `touchStart` and `focus`, showing the current number (if `numberFormat` is given) or the raw value.',
    type: 'boolean',
    status: 'optional',
  },
  alwaysShowTooltip: {
    doc: 'Use `true` to always show the tooltip, in addition to the `tooltip` property.',
    type: 'boolean',
    status: 'optional',
  },
  label: {
    doc: 'Prepends the Form Label component. If no ID is provided, a random ID is created.',
    type: 'string',
    status: 'optional',
  },
  labelDirection: {
    doc: 'Use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.',
    type: 'string',
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: 'string',
    status: 'optional',
  },
  statusState: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: 'string',
    status: 'optional',
  },
  statusProps: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'object',
    status: 'optional',
  },
  globalStatusId: {
    doc: 'The `status_id` used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'string',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the Slider more than the label. You can also send in a React component, so it gets wrapped inside the Slider component.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  extensions: {
    doc: 'Makes it possible to display overlays with other functionality such as a marker on the slider marking a given value.',
    type: 'object',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const SliderEvents: PropertiesTableProps = {
  onChange: {
    doc: 'will be called on state changes made by the user. The callback `value` and `rawValue` is a number `{ value, rawValue, event }`. But if the prop `numberFormat` is given, then it will return an additional `number` with the given format `{ value, number, rawValue, event }`.',
    type: 'function',
    status: 'optional',
  },
  onDragStart: {
    doc: 'will be called once the user stops dragging. Returns `{ event }`.',
    type: 'function',
    status: 'optional',
  },
  onDragEnd: {
    doc: 'will be called once the user starts dragging. Returns `{ event }`.',
    type: 'function',
    status: 'optional',
  },
}
