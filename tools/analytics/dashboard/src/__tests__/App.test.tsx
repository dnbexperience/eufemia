import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

  it('renders portal, MCP and component sections across tabs when data is present', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: populated,
    })

    const { container } = render(<App />)

    // "Page views" is the default-selected tab.
    await waitFor(() =>
      expect(container.textContent).toContain('Top pages')
    )
    expect(container.querySelectorAll('table').length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('tab', { name: 'MCP usage' }))
    expect(container.textContent).toContain('docs_read')

    fireEvent.click(screen.getByRole('tab', { name: 'Component usage' }))
    expect(container.textContent).toContain('Top components')
    expect(container.textContent).toContain('12 component usages')
  })

  it('renders the local MCP by-version section when perVersion has data', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: {
        ...populated,
        mcpUsage: {
          ...populated.mcpUsage,
          perVersion: [{ name: '10.79.0', count: 5 }],
        },
      },
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Top pages')
    )
    fireEvent.click(screen.getByRole('tab', { name: 'MCP usage' }))

    expect(container.textContent).toContain(
      'Local MCP — by Eufemia version'
    )
    expect(container.textContent).toContain('10.79.0')
  })

  it('hides the local MCP by-version section when perVersion is empty', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: populated,
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Top pages')
    )
    fireEvent.click(screen.getByRole('tab', { name: 'MCP usage' }))

    expect(container.textContent).not.toContain(
      'Local MCP — by Eufemia version'
    )
  })

  it('hides the component-usage tab when there is no component data', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: {
        ...populated,
        componentUsage: { total: 0, perComponent: [] },
      },
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Top pages')
    )
    expect(
      screen.queryByRole('tab', { name: 'Component usage' })
    ).toBeNull()
    expect(container.textContent).not.toContain('Components by app')
    expect(container.textContent).not.toContain(
      'Components by Eufemia version'
    )
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
