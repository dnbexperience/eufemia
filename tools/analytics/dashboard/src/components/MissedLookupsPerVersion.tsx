import { Card, H2, P } from '@dnb/eufemia/src'
import Table, { Td, Th, Tr } from '@dnb/eufemia/src/components/Table'

import type { McpVersionUsage } from '../data'

type VersionWithLookups = McpVersionUsage & { componentLookups: number }

export type MissedLookupsPerVersionProps = {
  versions: McpVersionUsage[]
  label: string
}

export default function MissedLookupsPerVersion({
  versions,
  label,
}: MissedLookupsPerVersionProps) {
  const rows = versions
    .filter((version): version is VersionWithLookups =>
      Boolean(version.componentLookups)
    )
    .sort((a, b) =>
      b.name.localeCompare(a.name, undefined, { numeric: true })
    )

  if (rows.length === 0) {
    return null
  }

  return (
    <Card stack>
      <H2 size="medium">Missed lookups per version, last 90 days</H2>
      <P className="dashboard__meta">
        Lists versions from 11.16.0 on. Older versions don't report missed
        lookups. Names that don't look like a component name never count as
        misses, so the share is a minimum.
      </P>
      <Table.ScrollView>
        <Table>
          <caption className="dnb-sr-only">
            {`${label} missed lookups per version, last 90 days`}
          </caption>
          <thead>
            <Tr>
              <Th>Version</Th>
              <Th align="right">Component lookups</Th>
              <Th align="right">Missed</Th>
              <Th align="right">Share missed</Th>
            </Tr>
          </thead>
          <tbody>
            {rows.map(({ name, componentLookups, missedLookups }) => {
              const missed = missedLookups ?? 0

              return (
                <Tr key={name}>
                  <Td>{name}</Td>
                  <Td align="right">
                    {componentLookups.toLocaleString()}
                  </Td>
                  <Td align="right">{missed.toLocaleString()}</Td>
                  <Td align="right">
                    {(missed / componentLookups).toLocaleString(
                      undefined,
                      {
                        style: 'percent',
                        maximumFractionDigits: 1,
                      }
                    )}
                  </Td>
                </Tr>
              )
            })}
          </tbody>
        </Table>
      </Table.ScrollView>
    </Card>
  )
}
