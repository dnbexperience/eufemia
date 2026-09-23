import { McpCount } from '../data'
import { P } from '@dnb/eufemia/src'

export type BarListProps = {
  items: McpCount[]
  emptyText?: string
}

// A ranked list rendered as horizontal bars. The value is real text (read by
// screen readers); the bar itself is decorative.
export default function BarList({
  items,
  emptyText = 'No data.',
}: BarListProps) {
  if (items.length === 0) {
    return <P className="dashboard-bar-list__empty">{emptyText}</P>
  }

  const max = items.reduce((m, item) => Math.max(m, item.count), 0)

  return (
    <ul className="dashboard-bar-list">
      {items.map((item) => (
        <li className="dashboard-bar-list__row" key={item.name}>
          <span className="dashboard-bar-list__name">{item.name}</span>
          <span className="dashboard-bar-list__track" aria-hidden="true">
            <span
              className="dashboard-bar-list__fill"
              style={{
                width: max > 0 ? `${(item.count / max) * 100}%` : '0',
              }}
            />
          </span>
          <span className="dashboard-bar-list__count">
            {item.count.toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  )
}
