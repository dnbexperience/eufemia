import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListExtensions(props) {
  const edges = regularMdxNodes.filter(({ fields, frontmatter }) => {
    const parentPath = fields.slug.split('/').slice(0, -1).join('/')

    return (
      parentPath === 'uilib/extensions' && frontmatter.hideInMenu !== true
    )
  })

  return <ListSummaryFromEdges edges={edges} {...props} />
}
