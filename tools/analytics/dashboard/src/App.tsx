import { useEffect, useMemo, useState } from 'react'
import {
  Card,
  Dropdown,
  Flex,
  GlobalStatus,
  H1,
  H2,
  P,
  Tabs,
  ToggleButton,
} from '@dnb/eufemia/src'
import Theme, {
  getTheme,
  setTheme,
  type ThemeColorScheme,
} from '@dnb/eufemia/src/shared/Theme'

import {
  clearSession,
  ensureSignedIn,
  getApiBaseUrl,
  type Session,
} from './auth'
import {
  loadDashboardData,
  portalViewTrendsView,
  snapshotMeta,
  type DashboardPayload,
  type McpTransportUsage,
  type PortalViewTrendsView,
} from './data'
import Kpis from './components/Kpis'
import BarList from './components/BarList'
import RankedTable from './components/RankedTable'
import './App.scss'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; payload: DashboardPayload | null }

const COLOR_SCHEMES: ThemeColorScheme[] = ['auto', 'light', 'dark']

function readColorScheme(): ThemeColorScheme {
  const stored = getTheme().colorScheme

  return COLOR_SCHEMES.includes(stored) ? stored : 'auto'
}

export default function App() {
  const [colorScheme, setColorScheme] =
    useState<ThemeColorScheme>(readColorScheme)

  function changeColorScheme(next: ThemeColorScheme) {
    setColorScheme(next)
    setTheme({ colorScheme: next })
  }

  return (
    <Theme colorScheme={colorScheme}>
      <Content
        colorScheme={colorScheme}
        onColorSchemeChange={changeColorScheme}
      />
    </Theme>
  )
}

function Content({
  colorScheme,
  onColorSchemeChange,
}: {
  colorScheme: ThemeColorScheme
  onColorSchemeChange: (colorScheme: ThemeColorScheme) => void
}) {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [env, setEnv] = useState('')

  useEffect(() => {
    let active = true

    async function run() {
      let session: Session | null
      try {
        session = await ensureSignedIn()
      } catch (error) {
        if (active) {
          setState({
            status: 'error',
            message: `Sign-in failed: ${(error as Error).message}`,
          })
        }

        return
      }

      const apiBaseUrl = getApiBaseUrl()

      // Dev-only: with no API configured, show sample data so `yarn dev`
      // renders a populated dashboard. Dead-code-eliminated from the build.
      if (import.meta.env.DEV && !apiBaseUrl) {
        const { demoPayload } = await import('./demo')
        if (!active) {
          return
        }

        setState({ status: 'ready', payload: demoPayload })

        return
      }

      const result = await loadDashboardData(session, apiBaseUrl)
      if (!active) {
        return
      }

      if (result.kind === 'retry') {
        // Token rejected; retry sign-in once, then surface an error instead of
        // looping between clearing the session and reloading.
        clearSession()
        window.location.reload()

        return
      }

      if (result.kind === 'error') {
        setState({ status: 'error', message: result.message })

        return
      }

      const payload = result.kind === 'data' ? result.payload : null
      setState({ status: 'ready', payload })
    }

    run()

    return () => {
      active = false
    }
  }, [])

  if (state.status === 'loading') {
    return (
      <div className="dashboard">
        <P role="status">Checking sign-in…</P>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="dashboard">
        <GlobalStatus state="error" show text={state.message} />
      </div>
    )
  }

  return (
    <Dashboard
      payload={state.payload}
      env={env}
      onEnvChange={setEnv}
      colorScheme={colorScheme}
      onColorSchemeChange={onColorSchemeChange}
    />
  )
}

function Dashboard({
  payload,
  env,
  onEnvChange,
  colorScheme,
  onColorSchemeChange,
}: {
  payload: DashboardPayload | null
  env: string
  onEnvChange: (env: string) => void
  colorScheme: ThemeColorScheme
  onColorSchemeChange: (colorScheme: ThemeColorScheme) => void
}) {
  const trends = useMemo(
    () => portalViewTrendsView(payload, env),
    [payload, env]
  )

  const mcp = payload?.mcpUsage
  const mcpTotal = (mcp?.web?.total ?? 0) + (mcp?.local?.total ?? 0)
  const component = payload?.componentUsage
  const componentTotal = component?.total ?? 0
  const meta = snapshotMeta(
    payload,
    trends.total + mcpTotal + componentTotal
  )

  return (
    <Flex.Stack className="dashboard" gap="large">
      <Flex.Horizontal justify="space-between" align="center" wrap>
        <H1 size="large">Eufemia Analytics</H1>
        <Flex.Horizontal align="center" gap="small">
          {trends.envs.length > 0 && (
            <Dropdown
              label="Environment"
              labelDirection="horizontal"
              value={env}
              data={[
                { selectedKey: '', content: 'All' },
                ...trends.envs.map((e) => ({
                  selectedKey: e,
                  content: e,
                })),
              ]}
              onChange={({ data }) =>
                onEnvChange(String(data?.selectedKey ?? ''))
              }
            />
          )}
          <Dropdown
            label="Color scheme"
            labelDirection="horizontal"
            value={colorScheme}
            data={[
              { selectedKey: 'auto', content: 'Auto' },
              { selectedKey: 'light', content: 'Light' },
              { selectedKey: 'dark', content: 'Dark' },
            ]}
            onChange={({ data }) =>
              onColorSchemeChange(
                (data?.selectedKey ?? 'auto') as ThemeColorScheme
              )
            }
          />
        </Flex.Horizontal>
      </Flex.Horizontal>

      {meta && <P className="dashboard__meta">{meta}</P>}

      <Tabs>
        <Tabs.Content title="Page views" key="pages">
          <PortalViewTrendsPanel trends={trends} />
        </Tabs.Content>

        <Tabs.Content title="Web MCP" key="mcp-web">
          <McpUsagePanel transport="web" usage={mcp?.web} />
        </Tabs.Content>

        <Tabs.Content title="Local MCP" key="mcp-local">
          <McpUsagePanel transport="local" usage={mcp?.local} />
        </Tabs.Content>

        <Tabs.Content title="Component usage" key="components">
          <Flex.Stack gap="large">
            {componentTotal > 0 ? (
              <>
                <P className="dashboard__meta">
                  {`${componentTotal.toLocaleString()} component usages`}
                </P>

                <Card stack>
                  <H2 size="medium">Top components</H2>
                  <RankedTable
                    caption="Top components"
                    nameHeader="Component"
                    countHeader="Usages"
                    items={(component?.perComponent ?? []).slice(0, 15)}
                  />
                </Card>

                <Card stack>
                  <H2 size="medium">Components by app</H2>
                  <RankedTable
                    caption="Components by app"
                    nameHeader="App"
                    countHeader="Usages"
                    items={(component?.perApp ?? []).slice(0, 15)}
                  />
                </Card>

                <Card stack>
                  <H2 size="medium">Components by Eufemia version</H2>
                  <RankedTable
                    caption="Components by Eufemia version"
                    nameHeader="Version"
                    countHeader="Usages"
                    items={(component?.perVersion ?? []).slice(0, 15)}
                  />
                </Card>
              </>
            ) : (
              <P className="dashboard__meta">No component usage yet.</P>
            )}
          </Flex.Stack>
        </Tabs.Content>
      </Tabs>
    </Flex.Stack>
  )
}

function PortalViewTrendsPanel({
  trends,
}: {
  trends: PortalViewTrendsView
}) {
  const [period, setPeriod] = useState<'week' | 'month'>('month')
  const [month, setMonth] = useState('')

  if (trends.total === 0) {
    return <P className="dashboard__meta">No page views yet.</P>
  }

  const selectedMonth =
    trends.topPathsPerMonth.find((item) => item.month === month) ??
    trends.topPathsPerMonth[0]

  return (
    <Flex.Stack gap="large">
      <P className="dashboard__meta">
        {`From ${trends.firstDay} to ${trends.lastDay}. Weeks start on Monday; the first and last week or month can be partial.`}
      </P>

      <Kpis items={trends.kpis} />

      <Card stack>
        <H2 size="medium">Views per day, last 30 days</H2>
        <BarList items={trends.last30Days} />
      </Card>

      <Card stack>
        <H2 size="medium">Views over time</H2>
        <ToggleButton.Group
          label="Group by"
          value={period}
          onChange={({ value }) =>
            setPeriod(value === 'week' ? 'week' : 'month')
          }
        >
          <ToggleButton text="Month" value="month" />
          <ToggleButton text="Week" value="week" />
        </ToggleButton.Group>
        <BarList
          items={period === 'week' ? trends.perWeek : trends.perMonth}
        />
      </Card>

      <Card stack>
        <H2 size="medium">Top URLs per month</H2>
        {selectedMonth ? (
          <>
            <Dropdown
              label="Month"
              labelDirection="horizontal"
              value={selectedMonth.month}
              data={trends.topPathsPerMonth.map((item) => ({
                selectedKey: item.month,
                content: item.month,
              }))}
              onChange={({ data }) =>
                setMonth(String(data?.selectedKey ?? ''))
              }
            />
            <RankedTable
              caption={`Top URLs in ${selectedMonth.month}`}
              nameHeader="URL"
              countHeader="Views"
              items={selectedMonth.paths}
            />
          </>
        ) : (
          <P className="dashboard__meta">No data.</P>
        )}
      </Card>

      <Card stack>
        <H2 size="medium">Locales</H2>
        <RankedTable
          caption="Views per locale"
          nameHeader="Locale"
          countHeader="Views"
          items={trends.perLocale}
        />
      </Card>

      <Card stack>
        <H2 size="medium">Themes</H2>
        <RankedTable
          caption="Views per theme"
          nameHeader="Theme"
          countHeader="Views"
          items={trends.perTheme}
        />
      </Card>
    </Flex.Stack>
  )
}

type McpPanelText = {
  label: string
  intro: string
  pathTitle: string
  pathHeader: string
  pathNote?: string
}

const MCP_PANELS: Record<'web' | 'local', McpPanelText> = {
  web: {
    label: 'Web MCP',
    intro: 'requests to the hosted web MCP server.',
    pathTitle: 'Doc paths',
    pathHeader: 'Path',
  },
  local: {
    label: 'Local MCP',
    intro:
      'requests from local MCP servers (the @dnb/eufemia package) with telemetry on.',
    pathTitle: 'Doc areas',
    pathHeader: 'Area',
    pathNote:
      'Counts only the leading area of a doc path, such as /uilib/components/.',
  },
}

function McpUsagePanel({
  transport,
  usage,
}: {
  transport: keyof typeof MCP_PANELS
  usage: McpTransportUsage | undefined
}) {
  const { label, intro, pathTitle, pathHeader, pathNote } =
    MCP_PANELS[transport]
  const total = usage?.total ?? 0
  const missedLookups = usage?.missedLookups ?? 0
  const perVersion = usage?.perVersion ?? []

  if (total === 0) {
    return <P className="dashboard__meta">{`No ${label} usage yet.`}</P>
  }

  return (
    <Flex.Stack gap="large">
      <P className="dashboard__meta">
        {`${total.toLocaleString()} ${intro}`}
      </P>

      <Card stack>
        <H2 size="medium">Tools</H2>
        <RankedTable
          caption={`${label} tools`}
          nameHeader="Tool"
          countHeader="Requests"
          items={usage?.perTool ?? []}
        />
      </Card>

      <Card stack>
        <H2 size="medium">Components</H2>
        <RankedTable
          caption={`${label} components`}
          nameHeader="Component"
          countHeader="Requests"
          items={(usage?.perComponent ?? []).slice(0, 15)}
        />
      </Card>

      {missedLookups > 0 && (
        <Card stack>
          <H2 size="medium">Missed component lookups</H2>
          <P className="dashboard__meta">
            {`${missedLookups.toLocaleString()} lookups named a component the docs don't have. Names are matched ignoring case and hyphens, e.g. DatePicker → date-picker.`}
          </P>
          <RankedTable
            caption={`${label} missed component lookups`}
            nameHeader="Likely component"
            countHeader="Misses"
            emptyText="No missed name matched a real component."
            items={(usage?.perLikelyComponent ?? []).slice(0, 15)}
          />
        </Card>
      )}

      <Card stack>
        <H2 size="medium">{pathTitle}</H2>
        {pathNote && <P className="dashboard__meta">{pathNote}</P>}
        <RankedTable
          caption={`${label} ${pathTitle.toLowerCase()}`}
          nameHeader={pathHeader}
          countHeader="Requests"
          items={(usage?.perPath ?? []).slice(0, 15)}
        />
      </Card>

      {perVersion.length > 0 && (
        <Card stack>
          <H2 size="medium">Eufemia versions, last 90 days</H2>
          <RankedTable
            caption={`${label} Eufemia versions, last 90 days`}
            nameHeader="Version"
            countHeader="Requests"
            items={perVersion.slice(0, 15)}
          />
        </Card>
      )}
    </Flex.Stack>
  )
}
