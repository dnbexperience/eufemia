import { PropertiesTableProps } from '../../shared/types'

export const LogoProperties: PropertiesTableProps = {
  svg: {
    doc: 'Provide a custom SVG to render instead of the built-in logos. Accepts a React SVG component, element, or a function that receives the theme and returns a SVG component. Width, height and color props still apply. If not provided, defaults to DNB logo. Import SVGs from `@dnb/eufemia/components/Logo` (e.g., `DnbDefault`, `SbankenDefault`, `SbankenCompact`, `SbankenHorizontal`, `CarnegieDefault`, `EiendomDefault`). When using a function, it receives the theme context (useTheme return value) allowing theme-aware logo selection.',
    type: ['React.Component', 'React.Element', 'Function'],
    status: 'optional',
  },
  color: {
    doc: 'Define the color of the logo.',
    type: 'string',
    status: 'optional',
  },
  inheritColor: {
    doc: 'Set to `true` if you do not want to inherit the color by `currentColor`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  inheritSize: {
    doc: 'Set to `true` if you want to inherit the size of the parent. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  width: {
    doc: 'Define the width of the logo.',
    type: 'string',
    status: 'optional',
  },
  height: {
    doc: 'Define the height of the logo.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
