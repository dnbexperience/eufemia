import { PropertiesTableProps } from '../../shared/types'

export const ImgProperties: PropertiesTableProps = {
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  imgClass: {
    doc: 'Custom className on the `<img>`-element',
    type: 'string',
    status: 'optional',
  },
  element: {
    doc: 'Defines the Element Type, like `figure`.',
    type: ['HTMLElement', 'string'],
    status: 'optional',
  },
  caption: {
    doc: 'Use to define a caption for the image. Uses `<figcaption>`.',
    type: 'string',
    status: 'optional',
  },
  loading: {
    doc: 'Can either be `eager` or `lazy`. Defaults to `eager`.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
