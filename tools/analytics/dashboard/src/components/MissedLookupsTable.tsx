import Table, { Td, Th, Tr } from '@dnb/eufemia/src/components/Table'

import { McpVersionUsage } from '../data'

export type MissedLookupsTableProps = {
  versions: McpVersionUsage[]
  caption: string
}

export default function MissedLookupsTable({
  versions,
  caption,
}: MissedLookupsTableProps) {
  return (
    <Table.ScrollView>
      <Table>
        <caption className="dnb-sr-only">{caption}</caption>
        <thead>
          <Tr>
            <Th>Version</Th>
            <Th align="right">Component lookups</Th>
            <Th align="right">Missed</Th>
            <Th align="right">Share missed</Th>
          </Tr>
        </thead>
        <tbody>
          {versions.map(({ name, componentLookups, missedLookups }) => {
            const lookups = componentLookups ?? 0
            const missed = missedLookups ?? 0

            return (
              <Tr key={name}>
                <Td>{name}</Td>
                <Td align="right">{lookups.toLocaleString()}</Td>
                <Td align="right">{missed.toLocaleString()}</Td>
                <Td align="right">
                  {(missed / lookups).toLocaleString(undefined, {
                    style: 'percent',
                    maximumFractionDigits: 1,
                  })}
                </Td>
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </Table.ScrollView>
  )
}
