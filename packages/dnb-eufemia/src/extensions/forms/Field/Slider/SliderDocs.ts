import { SliderProperties } from '../../../../components/slider/SliderDocs'
import { PropertiesTableProps } from '../../../../shared/types'

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
  stretch: SliderProperties.stretch,
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

export const SliderFieldEvents: PropertiesTableProps = {}
