import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListElements() {
  const edges = regularMdxNodes.filter(({ fields, frontmatter }) => {
    const parentPath = fields.slug.split('/').slice(0, -1).join('/')

    return (
      parentPath === 'uilib/elements' && frontmatter.hideInMenu !== true
    )
  })

  return <ListSummaryFromEdges edges={edges} returnListItems />
}
