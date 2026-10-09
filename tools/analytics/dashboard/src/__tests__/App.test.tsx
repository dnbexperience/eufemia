import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../App'
import { loadDashboardData, type DashboardPayload } from '../data'

vi.mock('../auth', () => ({
  ensureSignedIn: vi.fn(async () => null),
  getApiBaseUrl: vi.fn(() => 'https://api.example'),
  clearSession: vi.fn(),
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
      timestamp: '2026-09-16T10:00:00Z',
    },
    {
      path: '/uilib/input',
      env: 'test',
      timestamp: '2026-09-15T09:00:00Z',
    },
  ],
  mcpUsage: {
    web: { total: 4, perTool: [{ name: 'docs_read', count: 4 }] },
    local: { total: 2, perTool: [{ name: 'component_props', count: 2 }] },
  },
  componentUsage: {
    total: 12,
    perComponent: [{ name: 'Button', count: 12 }],
  },
}

describe('App (smoke)', () => {
  beforeEach(() => {
    vi.mocked(loadDashboardData).mockReset()
    window.localStorage.clear()
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

  it('applies the persisted dark color scheme', async () => {
    window.localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ colorScheme: 'dark' })
    )
    vi.mocked(loadDashboardData).mockResolvedValue({ kind: 'empty' })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Eufemia Analytics')
    )
    expect(
      container.querySelector('.eufemia-theme__color-scheme--dark')
    ).not.toBeNull()
  })

  it('applies and persists the color scheme picked in the selector', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({ kind: 'empty' })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Eufemia Analytics')
    )
    fireEvent.click(screen.getByRole('combobox', { name: /Color scheme/ }))
    fireEvent.click(screen.getByRole('option', { name: 'Dark' }))

    await waitFor(() =>
      expect(
        container.querySelector('.eufemia-theme__color-scheme--dark')
      ).not.toBeNull()
    )
    expect(
      JSON.parse(window.localStorage.getItem('eufemia-theme') ?? '{}')
        .colorScheme
    ).toBe('dark')
  })

  it('ignores an unknown persisted color scheme', async () => {
    window.localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ colorScheme: 'sepia' })
    )
    vi.mocked(loadDashboardData).mockResolvedValue({ kind: 'empty' })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Eufemia Analytics')
    )
    expect(container.querySelector('.eufemia-theme')).not.toBeNull()
    expect(
      container.querySelector('.eufemia-theme__color-scheme--sepia')
    ).toBeNull()
  })

  it('shows an empty message in the Page views tab when there are no portal views', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: {
        generatedAt: '2026-09-16T10:00:00Z',
        portalViews: [],
        mcpUsage: populated.mcpUsage,
        componentUsage: { total: 0, perComponent: [] },
      },
    })

    const { container } = render(<App />)

    // "Page views" is still the default-selected tab, just empty.
    await waitFor(() =>
      expect(container.textContent).toContain('No page views yet.')
    )
    expect(container.textContent).not.toContain('Top URLs')
  })

  it('renders portal, MCP and component sections across tabs when data is present', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: populated,
    })

    const { container } = render(<App />)

    // "Page views" is the default-selected tab.
    await waitFor(() =>
      expect(container.textContent).toContain('Top URLs')
    )
    expect(container.querySelectorAll('table').length).toBeGreaterThan(0)
    expect(container.textContent).toContain('older views may be missing')

    fireEvent.click(screen.getByRole('tab', { name: 'Web MCP' }))
    expect(container.textContent).toContain('4 requests to the hosted')
    expect(container.textContent).toContain('docs_read')
    expect(container.textContent).not.toContain('component_props')
    expect(container.textContent).toContain('Doc paths')

    fireEvent.click(screen.getByRole('tab', { name: 'Local MCP' }))
    expect(container.textContent).toContain('2 requests from local')
    expect(container.textContent).toContain('component_props')
    expect(container.textContent).not.toContain('docs_read')
    expect(container.textContent).toContain('Doc areas')

    fireEvent.click(screen.getByRole('tab', { name: 'Component usage' }))
    expect(container.textContent).toContain('Top components')
    expect(container.textContent).toContain('12 component usages')
  })

  it('shows an empty message in an MCP tab with no usage for that transport', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: {
        ...populated,
        mcpUsage: { web: populated.mcpUsage?.web },
      },
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Top URLs')
    )
    fireEvent.click(screen.getByRole('tab', { name: 'Local MCP' }))

    expect(container.textContent).toContain('No Local MCP usage yet.')
  })

  it('renders the Eufemia versions section in the Local MCP tab when perVersion has data', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: {
        ...populated,
        mcpUsage: {
          ...populated.mcpUsage,
          local: {
            ...populated.mcpUsage?.local,
            perVersion: [{ name: '10.79.0', count: 5 }],
          },
        },
      },
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Top URLs')
    )
    fireEvent.click(screen.getByRole('tab', { name: 'Local MCP' }))

    expect(container.textContent).toContain(
      'Eufemia versions, last 90 days'
    )
    expect(container.textContent).toContain('10.79.0')
  })

  it('hides the Eufemia versions section when perVersion is empty', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: populated,
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Top URLs')
    )
    fireEvent.click(screen.getByRole('tab', { name: 'Local MCP' }))

    expect(container.textContent).not.toContain('Eufemia versions')
  })

  it('shows an empty message in the Component usage tab when there is no component data', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'data',
      payload: {
        ...populated,
        componentUsage: { total: 0, perComponent: [] },
      },
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain('Top URLs')
    )
    fireEvent.click(screen.getByRole('tab', { name: 'Component usage' }))

    expect(container.textContent).toContain('No component usage yet.')
    expect(container.textContent).not.toContain('Components by app')
    expect(container.textContent).not.toContain(
      'Components by Eufemia version'
    )
  })

  it('shows the error message from the data layer', async () => {
    vi.mocked(loadDashboardData).mockResolvedValue({
      kind: 'error',
      message: 'Could not reach the data API.',
    })

    const { container } = render(<App />)

    await waitFor(() =>
      expect(container.textContent).toContain(
        'Could not reach the data API.'
      )
    )
  })
})
