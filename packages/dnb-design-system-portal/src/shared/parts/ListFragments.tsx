import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListFragments() {
  const edges = regularMdxNodes.filter(({ fields, frontmatter }) => {
    const parentPath = fields.slug.split('/').slice(0, -1).join('/')

    return (
      parentPath === 'uilib/components/fragments' &&
      frontmatter.hideInMenu !== true
    )
  })

  return <ListSummaryFromEdges edges={edges} />
}
