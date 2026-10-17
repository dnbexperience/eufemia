import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'

vi.mock('../../../docs/icons/StatusIcons.module.scss', () => ({
  default: {
    example: 'example',
    group: 'group',
    label: 'label',
    list: 'list',
    item: 'item',
    icon: 'icon',
    large: 'large',
    medium: 'medium',
    small: 'small',
    positive: 'positive',
    warning: 'warning',
    negative: 'negative',
    neutral: 'neutral',
  },
}))

import StatusIcons from '../../../docs/icons/StatusIcons'
import styles from '../../../docs/icons/StatusIcons.module.scss'

afterEach(cleanup)

describe('StatusIcons', () => {
  it('renders the status icon pattern with visible labels', () => {
    render(<StatusIcons />)

    const items = Array.from(
      document.querySelectorAll('[data-visual-test="status-icons"] li')
    )

    const expectedLabels = [
      'Status: Operational',
      'Status: Minor outage',
      'Status: Major outage',
      'Status: Degraded performance',
      'Status: Under maintenance',
    ]

    expect(items.map((item) => item.textContent)).toEqual([
      ...expectedLabels,
      ...expectedLabels,
      ...expectedLabels,
    ])
    expect(
      document.querySelectorAll('.dnb-visually-hidden.dnb-sr-only')
    ).toHaveLength(15)
  })

  it('uses semantic styles and hides decorative icons', () => {
    render(<StatusIcons />)

    const iconContainers = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-visual-test="status-icons"] li > span[aria-hidden]'
      )
    )
    const statusClasses = [
      styles.positive,
      styles.negative,
      styles.negative,
      styles.warning,
      styles.neutral,
    ]

    iconContainers.forEach((container, index) => {
      expect(container.classList.contains(styles.icon)).toBe(true)
      expect(container.classList.contains(statusClasses[index % 5])).toBe(
        true
      )
      expect(container.getAttribute('aria-hidden')).toBe('true')
      const expectedSize = index < 5 ? 'medium' : 'default'
      const circleSize = [styles.large, styles.medium, styles.small][
        Math.floor(index / 5)
      ]
      expect(container.classList.contains(circleSize)).toBe(true)
      expect(
        container.querySelector(`.dnb-icon--${expectedSize}`)
      ).not.toBeNull()
    })

    const groups = document.querySelectorAll(
      '[data-visual-test="status-icons"] section'
    )
    expect(
      Array.from(groups).map(
        (group) => group.querySelector('p')?.textContent
      )
    ).toEqual(['Large (2.5rem)', 'Medium (2rem)', 'Small (1.5rem)'])
    expect(groups).toHaveLength(3)
    expect(
      document.querySelectorAll(
        '[data-visual-test="status-icons"] hr.dnb-hr'
      )
    ).toHaveLength(2)
  })
})
