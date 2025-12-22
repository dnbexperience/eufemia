import { PropertiesTableProps } from '../../shared/types'

export const InfoCardProperties: PropertiesTableProps = {
  text: {
    doc: 'The text content of the InfoCard, displayed/rendered in a paragraph. To fully customize the content, see `children` property.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  title: {
    doc: 'The title of the InfoCard.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  centered: {
    doc: 'Centers the content. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  dropShadow: {
    doc: 'Sets the drop shadow of the info card. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  stretch: {
    doc: 'Stretch the card to fill the container.',
    type: 'boolean',
    status: 'optional',
  },
  className: {
    doc: 'Custom className for the component root.',
    type: 'string',
    status: 'optional',
  },
  icon: {
    doc: 'Custom icon. Defaults to the `lightbulb` icon.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  imgProps: {
    doc: '[Image properties](/uilib/elements/image) applied to the `img` element if the component is used to display an image.',
    type: 'ImgProps',
    status: 'optional',
  },
  alt: {
    doc: 'Used in combination with `src` to provide an alt attribute for the image element.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  src: {
    doc: 'Specifies the path to the image.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  closeButtonText: {
    doc: 'The close button text.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  closeButtonAttributes: {
    doc: 'Define any valid Eufemia [Button properties](/uilib/components/button/properties) or HTML attribute inside an object.',
    type: 'ButtonProps',
    status: 'optional',
  },
  acceptButtonText: {
    doc: 'The accept button text.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  acceptButtonAttributes: {
    doc: 'Define any valid Eufemia [Button properties](/uilib/components/button/properties) or HTML attribute inside an object.',
    type: 'ButtonProps',
    status: 'optional',
  },
  children: {
    doc: 'Can be used to add custom content, which is displayed/rendered between the `text` property and buttons.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const InfoCardEvents: PropertiesTableProps = {
  onAccept: {
    doc: 'Will be called when user clicks the accept button.',
    type: 'function',
    status: 'optional',
  },
  onClose: {
    doc: 'Will be called when user clicks the close button.',
    type: 'function',
    status: 'optional',
  },
}
