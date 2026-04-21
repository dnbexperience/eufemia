import { Ul, Li } from '@dnb/eufemia/src'
import Anchor from '../tags/Anchor'

type TableOfContents = {
  url: string
  title: string
  items?: Array<TableOfContents>
}

type TableOfContentsProps = {
  edges: Array<{
    node: {
      frontmatter: { order: number }
      tableOfContents: {
        items: Array<TableOfContents>
      }
    }
  }>
}

const TableOfContents = ({ edges }: TableOfContentsProps) => {
  const orderedContents = edges
    .sort((edgeA, edgeB) =>
      edgeA.node.frontmatter.order > edgeB.node.frontmatter.order ? 1 : -1,
    )
    .map(({ node }) => node.tableOfContents.items)
    .reduce<Array<TableOfContents>>((allContent, currentContent) => {
      currentContent.forEach((content) => allContent.push(content))
      return allContent
    }, [])

  return (
    <Ul>
      {orderedContents.map((content, index) => (
        <TableOfContentsItem
          key={`${content.title}-${index}`}
          {...content}
        />
      ))}
    </Ul>
  )
}

type TableOfContentsItemProps = TableOfContents

function TableOfContentsItem({
  title,
  url,
  items,
}: TableOfContentsItemProps) {
  return (
    <Li>
      <Anchor href={url}>{title}</Anchor>
      {items?.length > 0 && (
        <Ul>
          {items.map((item, index) => (
            <TableOfContentsItem
              key={`${item.title}-${index}`}
              {...item}
            />
          ))}
        </Ul>
      )}
    </Li>
  )
}

export default TableOfContents
