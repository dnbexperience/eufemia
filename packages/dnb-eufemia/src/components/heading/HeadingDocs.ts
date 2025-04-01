import { PropertiesTableProps } from '../../shared/types'

export const HeadingProperties: PropertiesTableProps = {
  text: {
    doc: 'A heading, can be text or React.Node.',
    type: 'React.Node',
    status: 'optional',
  },
  children: {
    doc: 'a heading, can be text or React.Node.',
    type: 'React.Node',
    status: 'optional',
  },
  size: {
    doc: 'Define the typography [font-size](/uilib/typography/font-size) by a size _type_, e.g. `x-large`. Defaults to the predefined heading sizes.',
    type: [
      'xx-large',
      'x-large',
      'large',
      'medium',
      'basis',
      'small',
      'x-small',
    ],
    status: 'optional',
  },
  level: {
    doc: 'Overwrite the automated level handling to use a specific value to ensure correct level hierarchy.',
    type: ['1', '2', '3', '4', '5', '6'],
    status: 'optional',
  },
  increase: {
    doc: 'If set to `true`, the heading level will be incremented by 1.',
    type: 'boolean',
    status: 'optional',
  },
  decrease: {
    doc: 'If set to `true`, the heading level will be decremented by 1.',
    type: 'boolean',
    status: 'optional',
  },
  inherit: {
    doc: 'If set to `true`, the heading last used level will be inherited. Also from inside a level context.',
    type: 'boolean',
    status: 'optional',
  },
  reset: {
    doc: 'If set to `true`, the heading level will be reset to 2. You can give it a custom level if you need to, e.g. `reset(1)`.',
    type: ['boolean', 'number'],
    status: 'optional',
  },
  skip_correction: {
    doc: 'If set to `true`, the heading will not be corrected and warnings will not be shown. Warnings do not show up in **production builds** else either',
    type: 'boolean',
    status: 'optional',
  },
  debug: {
    doc: 'If set to `true`, the content will have a prefix, showing the heading level.',
    type: ['boolean', 'function'],
    status: 'optional',
  },
  debug_counter: {
    doc: 'If set to `true`, the content will have both a prefix and a JSON log attached to both headings and level contexts.',
    type: ['boolean', 'function'],
    status: 'optional',
  },
  element: {
    doc: 'define what HTML element should be used. If you use, e.g. a `span`, then `role="heading"` and `aria-level` gets set. Defaults to semantic heading element.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
