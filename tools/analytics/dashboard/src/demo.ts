import type { DashboardPayload } from './data'

// Dev-only sample data so `yarn dev` shows a populated dashboard without a
// backend. Loaded lazily and only when running under Vite dev with no API
// configured (see App.tsx), so it never reaches the production bundle.

const days = [
  '2026-09-13',
  '2026-09-14',
  '2026-09-15',
  '2026-09-16',
  '2026-09-17',
]

const pages = [
  '/uilib/components/button',
  '/uilib/components/input',
  '/uilib/components/dropdown',
  '/uilib/components/table',
  '/uilib/patterns/forms',
  '/uilib/getting-started',
]

// Rough per-page view totals, so the ranking and bars have visible spread.
const perPageTotals = [18, 12, 9, 7, 5, 3]

const portalViews = pages.flatMap((path, pageIndex) => {
  const total = perPageTotals[pageIndex]

  return Array.from({ length: total }, (_, n) => {
    const day = days[(n + pageIndex) % days.length]
    const hour = String(8 + (n % 10)).padStart(2, '0')

    return {
      path,
      env: n % 3 === 0 ? 'test' : 'prod',
      created_at: `${day}T${hour}:00:00Z`,
    }
  })
})

export const demoPayload: DashboardPayload = {
  generatedAt: new Date().toISOString(),
  portalViews,
  mcpUsage: {
    total: 128,
    perTool: [
      { name: 'docs_read', count: 52 },
      { name: 'component_props', count: 34 },
      { name: 'review_rules', count: 21 },
      { name: 'component_examples', count: 13 },
      { name: 'portal_content_workflow', count: 8 },
    ],
    perComponent: [
      { name: 'Button', count: 24 },
      { name: 'Input', count: 18 },
      { name: 'Dropdown', count: 15 },
      { name: 'Table', count: 11 },
      { name: 'Card', count: 9 },
      { name: 'DatePicker', count: 6 },
    ],
    perPath: [
      { name: '/uilib/components/button', count: 20 },
      { name: '/uilib/components/input', count: 16 },
      { name: '/uilib/components/dropdown', count: 12 },
      { name: '/uilib/patterns/forms', count: 7 },
      { name: '/uilib/getting-started', count: 4 },
    ],
    perVersion: [
      { name: '10.79.0', count: 34 },
      { name: '10.78.1', count: 21 },
      { name: '10.77.0', count: 9 },
    ],
  },
  componentUsage: {
    total: 342,
    perComponent: [
      { name: 'Button', count: 96 },
      { name: 'Input', count: 71 },
      { name: 'Flex', count: 58 },
      { name: 'Card', count: 44 },
      { name: 'Dropdown', count: 39 },
      { name: 'Table', count: 34 },
    ],
    perApp: [
      { name: 'nettbank', count: 148 },
      { name: 'sbanken-app', count: 121 },
      { name: 'innlogging', count: 73 },
    ],
    perVersion: [
      { name: '10.79.0', count: 190 },
      { name: '10.78.1', count: 108 },
      { name: '10.77.0', count: 44 },
    ],
  },
}
