import { Card, Flex, P } from '@dnb/eufemia/src'

export type Kpi = { value: number; label: string }

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
