import type { DashboardPayload } from './data'

// Dev-only sample data so `yarn dev` shows a populated dashboard without a
// backend. Loaded lazily and only when running under Vite dev with no API
// configured (see App.tsx), so it never reaches the production bundle.

const pages = [
  '/uilib/components/button',
  '/uilib/components/input',
  '/uilib/components/dropdown',
  '/uilib/components/table',
  '/uilib/patterns/forms',
  '/uilib/getting-started',
]

// About four months of daily totals ending today, with a weekly rhythm.
const perDay = Array.from({ length: 120 }, (_, index) => {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - (119 - index))
  const dt = date.toISOString().slice(0, 10)
  const weekend = [0, 6].includes(date.getUTCDay())
  const prod = (weekend ? 120 : 420) + index * 2

  return [
    { dt, env: 'prod', count: prod },
    { dt, env: 'test', count: Math.round(prod / 10) },
  ]
}).flat()

const months = [...new Set(perDay.map((row) => row.dt.slice(0, 7)))]

const topPathsPerMonth = months.flatMap((month, monthIndex) =>
  ['', 'prod', 'test'].flatMap((env) =>
    pages.map((path, pageIndex) => ({
      month,
      env,
      path,
      count:
        (6 - pageIndex) * (env === 'test' ? 40 : 400) + monthIndex * 50,
    }))
  )
)

const localeThemeCounts = [
  { locale: 'nb-NO', theme: 'ui', count: 9000 },
  { locale: 'en-GB', theme: 'ui', count: 4000 },
  { locale: 'nb-NO', theme: 'sbanken', count: 2500 },
  { locale: 'sv-SE', theme: 'carnegie', count: 900 },
]

const perLocaleAndTheme = ['prod', 'test'].flatMap((env) =>
  localeThemeCounts.map((row) => ({
    ...row,
    env,
    count: env === 'test' ? row.count / 10 : row.count,
  }))
)

export const demoPayload: DashboardPayload = {
  generatedAt: new Date().toISOString(),
  portalViewTrends: { perDay, topPathsPerMonth, perLocaleAndTheme },
  mcpUsage: {
    web: {
      total: 94,
      perTool: [
        { name: 'docs_read', count: 38 },
        { name: 'component_props', count: 26 },
        { name: 'review_rules', count: 15 },
        { name: 'component_examples', count: 9 },
        { name: 'portal_content_workflow', count: 6 },
      ],
      perComponent: [
        { name: 'button', count: 18 },
        { name: 'input', count: 14 },
        { name: 'dropdown', count: 11 },
        { name: 'table', count: 8 },
        { name: 'card', count: 6 },
      ],
      perPath: [
        { name: '/uilib/components/button', count: 20 },
        { name: '/uilib/components/input', count: 16 },
        { name: '/uilib/components/dropdown', count: 12 },
        { name: '/uilib/patterns/forms', count: 7 },
        { name: '/uilib/getting-started', count: 4 },
      ],
      missedLookups: 7,
      perLikelyComponent: [
        { name: 'date-picker', count: 4 },
        { name: 'input-masked', count: 1 },
      ],
    },
    local: {
      total: 34,
      perTool: [
        { name: 'docs_read', count: 14 },
        { name: 'component_props', count: 8 },
        { name: 'review_rules', count: 6 },
        { name: 'component_examples', count: 4 },
        { name: 'portal_content_workflow', count: 2 },
      ],
      perComponent: [
        { name: 'button', count: 6 },
        { name: 'input', count: 4 },
        { name: 'dropdown', count: 4 },
        { name: 'date-picker', count: 3 },
      ],
      perPath: [
        { name: '/uilib/components/', count: 22 },
        { name: '/uilib/extensions/', count: 8 },
        { name: '/uilib/usage/', count: 4 },
      ],
      perVersion: [
        { name: '10.79.0', count: 20 },
        { name: '10.78.1', count: 10 },
        { name: '10.77.0', count: 4 },
      ],
    },
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
