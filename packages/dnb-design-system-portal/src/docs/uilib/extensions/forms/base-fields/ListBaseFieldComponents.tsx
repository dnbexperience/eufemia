import { regularMdxNodes } from 'virtual:portal-pages'
import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'

export default function ListBaseFieldComponents(props) {
  const edges = regularMdxNodes.filter(({ fields, frontmatter }) => {
    const parentPath = fields.slug.split('/').slice(0, -1).join('/')

    return (
      parentPath === 'uilib/extensions/forms/base-fields' &&
      frontmatter.componentType?.includes('base')
    )
  })

  return <ListSummaryFromEdges edges={edges} {...props} />
}
