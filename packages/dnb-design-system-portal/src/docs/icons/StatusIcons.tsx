import { Hr, Icon, VisuallyHidden } from '@dnb/eufemia/src'
import {
  check,
  check_medium,
  cog,
  cog_medium,
  exclamation,
  exclamation_medium,
  exclamation_triangle,
  exclamation_triangle_medium,
  stop,
  stop_medium,
} from '@dnb/eufemia/src/icons'
import styles from './StatusIcons.module.scss'

const statuses = [
  {
    label: 'Operational',
    icon: check,
    mediumIcon: check_medium,
    status: 'positive',
  },
  {
    label: 'Minor outage',
    icon: exclamation_triangle,
    mediumIcon: exclamation_triangle_medium,
    status: 'negative',
  },
  {
    label: 'Major outage',
    icon: stop,
    mediumIcon: stop_medium,
    status: 'negative',
  },
  {
    label: 'Degraded performance',
    icon: exclamation,
    mediumIcon: exclamation_medium,
    status: 'warning',
  },
  {
    label: 'Under maintenance',
    icon: cog,
    mediumIcon: cog_medium,
    status: 'neutral',
  },
] as const

type StatusSize = 'large' | 'medium' | 'small'

export default function StatusIcons() {
  return (
    <div className={styles.example} data-visual-test="status-icons">
      <StatusList size="large" />
      <Hr />
      <StatusList size="medium" />
      <Hr />
      <StatusList size="small" />
    </div>
  )
}

function StatusList({ size }: { size: StatusSize }) {
  const label = {
    large: 'Large (2.5rem)',
    medium: 'Medium (2rem)',
    small: 'Small (1.5rem)',
  }[size]

  return (
    <section className={styles.group}>
      <p className={styles.label}>{label}</p>
      <ul className={styles.list} aria-label={label}>
        {statuses.map(({ label, icon, mediumIcon, status }) => (
          <li key={label} className={styles.item}>
            <span
              className={`${styles.icon} ${styles[size]} ${styles[status]}`}
              aria-hidden
            >
              <Icon icon={size === 'large' ? mediumIcon : icon} />
            </span>
            <VisuallyHidden>Status: </VisuallyHidden>
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}
