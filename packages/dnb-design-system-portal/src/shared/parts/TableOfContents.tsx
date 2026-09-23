import { Ul, Li } from '@dnb/eufemia/src'
import Anchor from '../tags/Anchor'
import type { StaticQueryConnection } from 'portal-query'

type TableOfContents = {
  url: string
  title: string
  items?: Array<TableOfContents>
}

type TableOfContentsProps = StaticQueryConnection

const TableOfContents = ({ edges }: TableOfContentsProps) => {
  const orderedContents = [...edges]
    // Same ordering as `regularMdxNodes`
    .sort(({ node: a }, { node: b }) => {
      const orderA = a.frontmatter.order
      const orderB = b.frontmatter.order

      if (orderA === orderB) {
        return 0
      }
      if (orderA === undefined) {
        return 1
      }
      if (orderB === undefined) {
        return -1
      }

      return orderA - orderB
    })
    .map(({ node }) => node.tableOfContents?.items)
    .filter(Boolean)
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
