import { PropertiesTableProps } from '../../shared/types'

export const LogoProperties: PropertiesTableProps = {
  brand: {
    doc: 'Define which brand&#39;s logo to show. `ui` (DNB) or `sbanken`. Defaults to `ui`.',
    type: 'unknown',
    state: 'optional',
  },
  variant: {
    doc: 'Define the logo variant, if there is more than one variant of a brand&#39;s logo. Currently the only option other than default is a `compact` variant of the Sbanken logo. Defaults to `default`.',
    type: 'unknown',
    state: 'optional',
  },
  size: {
    doc: 'Define the size of the logo. Sets the height. The width will be calculated by the ratio. Also, `inherit` will use the inherited height. Defaults to `auto`.',
    type: 'unknown',
    state: 'optional',
  },
  color: {
    doc: 'Define the color of the logo.',
    type: 'unknown',
    state: 'optional',
  },
  inherit_color: {
    doc: 'Set to `true` if you do not want to inherit the color by `currentColor`. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  width: {
    doc: 'Define either the width of the logo.',
    type: 'unknown',
    state: 'optional',
  },
  height: {
    doc: 'Or define the height of the logo.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
