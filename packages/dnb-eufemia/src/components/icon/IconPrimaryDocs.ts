import type { PropertiesTableProps } from '../../shared/types'

export const IconPrimaryProperties: PropertiesTableProps = {
  icon: {
    doc: 'Defines the icon name. Bundled [primary icons](/icons/primary) render inline; other names load from the asset CDN. See [dynamic CDN icons](/uilib/components/icon#loading-icons-by-name).',
    type: 'string',
    status: 'required',
  },
  '[Icon](/uilib/components/icon/properties)': {
    doc: 'Accepts all default icon properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
