import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListBaseInputComponents() {
  const edges = regularMdxNodes.filter(({ fields, frontmatter }) => {
    const parentPath = fields.slug.split('/').slice(0, -1).join('/')

    return (
      parentPath === 'uilib/extensions/forms/base-fields' &&
      frontmatter.componentType === 'base-input'
    )
  })

  return (
    <ListSummaryFromEdges
      space={{ top: 'x-small' }}
      level={3}
      size="medium"
      description=""
      edges={edges}
    />
  )
}
