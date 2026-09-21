import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../App'
import { loadDashboardData, type DashboardPayload } from '../data'

vi.mock('../auth', () => ({
  ensureSignedIn: vi.fn(async () => null),
  getApiBaseUrl: vi.fn(() => 'https://api.example'),
  clearSession: vi.fn(),
  signOut: vi.fn(),
}))

vi.mock('../data', async (importActual) => {
  const actual = await importActual<typeof import('../data')>()

  return { ...actual, loadDashboardData: vi.fn() }
})

const populated: DashboardPayload = {
  generatedAt: '2026-09-16T10:00:00Z',
  portalViews: [
    {
      path: '/uilib/button',
      env: 'prod',
      created_at: '2026-09-16T10:00:00Z',
    },
    {
      path: '/uilib/input',
      env: 'test',
      created_at: '2026-09-15T09:00:00Z',
    },
  ],
  mcpUsage: { total: 4, perTool: [{ name: 'docs_read', count: 4 }] },
  componentUsage: {
    total: 12,
    perComponent: [{ name: 'Button', count: 12 }],
  },
}

describe('App (smoke)', () => {
  beforeEach(() => {
    vi.mocked(loadDashboardData).mockReset()
  })

  // Guards against the whole app failing to mount (e.g. a duplicate React in
  // the bundle), which build/lint/type checks cannot catch.
  it('mounts and renders the dashboard heading, not a blank page', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({ kind: 'empty' })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Eufemia Analytics')
    )
    expect(container.textContent?.trim()).not.toBe('')
  })

  it('renders portal, MCP and component sections when data is present', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: populated,
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Top pages')
    )
    expect(container.textContent).toContain('docs_read')
    expect(container.textContent).toContain('Top components')
    expect(container.textContent).toContain('12 component usages')
    expect(container.querySelectorAll('table').length).toBeGreaterThan(0)
  })

  it('surfaces a deploy-aware message on a 503', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'error',
      status: 503,
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('being prepared')
    )
  })
})
