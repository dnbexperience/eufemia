import { SliderProperties } from '../../../../components/slider/SliderDocs'
import type { PropertiesTableProps } from '../../../../shared/types'

export const SliderFieldProperties: PropertiesTableProps = {
  paths: {
    doc: 'Define an array with JSON Pointer paths for multiple thumb buttons.',
    type: 'Array<string>',
    status: 'optional',
  },
  min: {
    doc: 'The minimum value. Can be a negative number as well, or a JSON Pointer path to a value in the data context. Defaults to `0`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  max: {
    doc: 'The maximum value. Can also be a JSON Pointer path to a value in the data context. Defaults to `100`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  step: {
    doc: 'The steps the slider takes on changing the value. Can also be a JSON Pointer path to a value in the data context. Defaults to `1`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  vertical: SliderProperties.vertical,
  reverse: SliderProperties.reverse,
  width: {
    doc: '`false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` to fill available width. Defaults to `stretch`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  hideButtons: SliderProperties.hideButtons,
  multiThumbBehavior: SliderProperties.multiThumbBehavior,
  thumbTitle: SliderProperties.thumbTitle,
  subtractTitle: SliderProperties.subtractTitle,
  addTitle: SliderProperties.addTitle,
  numberFormat: SliderProperties.numberFormat,
  tooltip: SliderProperties.tooltip,
  alwaysShowTooltip: SliderProperties.alwaysShowTooltip,
  extensions: SliderProperties.extensions,
  '[Space](/web/layout-and-typography/layout/space/properties)':
    SliderProperties[
      '[Space](/web/layout-and-typography/layout/space/properties)'
    ],
}
