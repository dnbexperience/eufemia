import type { PropertiesTableProps } from '../../shared/types'

export const ImgProperties: PropertiesTableProps = {
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  imgClass: {
    doc: 'Deprecated. Use `imageClassName` instead.',
    type: 'string',
    status: 'deprecated',
  },
  imageClassName: {
    doc: 'Custom `className` for the inner `img` element.',
    type: 'string',
    status: 'optional',
  },
  figureProps: {
    doc: 'Native HTML properties for the wrapping `figure` element.',
    type: 'HTMLProps<HTMLElement>',
    status: 'optional',
  },
  element: {
    doc: 'Deprecated. The wrapper should remain a `figure` to preserve its semantics.',
    type: ['HTMLElement', 'string'],
    status: 'deprecated',
  },
  caption: {
    doc: 'Use to define a caption for the image. Uses `<figcaption>`.',
    type: 'string',
    status: 'optional',
  },
  loading: {
    doc: 'Can either be `eager` or `lazy`. Defaults to `eager`.',
    type: ['"eager"', '"lazy"'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
