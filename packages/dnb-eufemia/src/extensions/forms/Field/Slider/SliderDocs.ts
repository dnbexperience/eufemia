import { SliderProperties } from '../../../../components/slider/SliderDocs'
import type { PropertiesTableProps } from '../../../../shared/types'

export const SliderFieldProperties: PropertiesTableProps = {
  paths: {
    doc: 'Define an array with JSON Pointer paths for multiple thumb buttons.',
    type: 'Array<string>',
    status: 'optional',
  },
  min: SliderProperties.min,
  max: SliderProperties.max,
  step: SliderProperties.step,
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
  '[Space](/uilib/layout/space/properties)':
    SliderProperties['[Space](/uilib/layout/space/properties)'],
}
