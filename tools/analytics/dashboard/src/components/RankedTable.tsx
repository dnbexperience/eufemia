import Table, { Td, Th, Tr } from '@dnb/eufemia/src/components/Table'
import { P } from '@dnb/eufemia/src'

import { McpCount } from '../data'

export type RankedTableProps = {
  items: McpCount[]
  caption: string
  nameHeader?: string
  countHeader?: string
  emptyText?: string
}

// A ranked list rendered as an accessible Eufemia table: a labelled name and
// count column, plus a decorative bar cell that visualises the count.
export default function RankedTable({
  items,
  caption,
  nameHeader = 'Name',
  countHeader = 'Count',
  emptyText = 'No data.',
}: RankedTableProps) {
  if (items.length === 0) {
    return <P className="dashboard-ranked__empty">{emptyText}</P>
  }

  const max = items.reduce((m, item) => Math.max(m, item.count), 0)

  return (
    <Table.ScrollView>
      <Table>
        <caption className="dnb-sr-only">{caption}</caption>
        <thead>
          <Tr>
            <Th>{nameHeader}</Th>
            <Th aria-hidden="true" />
            <Th align="right">{countHeader}</Th>
          </Tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <Tr key={item.name}>
              <Td>{item.name}</Td>
              <Td className="dashboard-ranked__bar-cell">
                <span className="dashboard-bar" aria-hidden="true">
                  <span
                    className="dashboard-bar__fill"
                    style={{
                      width:
                        max > 0 ? `${(item.count / max) * 100}%` : '0',
                    }}
                  />
                </span>
              </Td>
              <Td align="right">{item.count.toLocaleString()}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Table.ScrollView>
  )
}
