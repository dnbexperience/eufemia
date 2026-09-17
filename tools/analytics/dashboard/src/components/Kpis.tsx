import { Card, Flex, P } from '@dnb/eufemia/src'

import type { Kpi } from '../data'

export default function Kpis({ items }: { items: Kpi[] }) {
  return (
    <Flex.Horizontal wrap gap="small">
      {items.map((kpi) => (
        <Card key={kpi.label} className="dashboard-kpi" stack>
          <span className="dashboard-kpi__value">
            {kpi.value.toLocaleString()}
          </span>
          <P className="dashboard-kpi__label">{kpi.label}</P>
        </Card>
      ))}
    </Flex.Horizontal>
  )
}
