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
  countBy,
  dashboardView,
  dataErrorMessage,
  loadDashboardData,
  rank,
  snapshotMeta,
  type DashboardPayload,
  type McpTransportUsage,
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

      if (result.kind === 'rejected') {
        setState({
          status: 'error',
          message:
            'The data API rejected your access. Please try again later, or contact the dashboard owner if it persists.',
        })

        return
      }

      if (result.kind === 'error') {
        setState({
          status: 'error',
          message: dataErrorMessage(result.status),
        })

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
  const { allRows, rows, envs, kpis } = useMemo(
    () => dashboardView(payload, env),
    [payload, env]
  )

  const mcp = payload?.mcpUsage
  const mcpTotal = (mcp?.web?.total ?? 0) + (mcp?.local?.total ?? 0)
  const component = payload?.componentUsage
  const componentTotal = component?.total ?? 0
  const meta = snapshotMeta(
    payload,
    allRows.length + mcpTotal + componentTotal
  )

  return (
    <Flex.Stack className="dashboard" gap="large">
      <Flex.Horizontal justify="space-between" align="center" wrap>
        <H1 size="large">Eufemia Analytics</H1>
        <Flex.Horizontal align="center" gap="small">
          {envs.length > 0 && (
            <Dropdown
              label="Environment"
              labelDirection="horizontal"
              value={env}
              data={[
                { selectedKey: '', content: 'All' },
                ...envs.map((e) => ({ selectedKey: e, content: e })),
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
          <Flex.Stack gap="large">
            {rows.length > 0 ? (
              <>
                <P className="dashboard__meta">
                  Shows only the most recent page views, so older views may
                  be missing.
                </P>

                <Kpis items={kpis} />

                <Card stack>
                  <H2 size="medium">Views per day</H2>
                  <BarList
                    items={rank(countBy(rows, 'day'), { sort: 'key' })}
                  />
                </Card>

                <Card stack>
                  <H2 size="medium">Top pages</H2>
                  <RankedTable
                    caption="Top pages"
                    nameHeader="Page"
                    countHeader="Views"
                    items={rank(countBy(rows, 'label'), {
                      sort: 'desc',
                      limit: 15,
                    })}
                  />
                </Card>
              </>
            ) : (
              <P className="dashboard__meta">No page views yet.</P>
            )}
          </Flex.Stack>
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

const MCP_PANELS = {
  web: {
    label: 'Web MCP',
    intro: 'requests to the hosted web MCP server.',
    pathTitle: 'Doc paths',
    pathHeader: 'Path',
    pathNote: '',
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
          <H2 size="medium">Eufemia versions</H2>
          <RankedTable
            caption={`${label} Eufemia versions`}
            nameHeader="Version"
            countHeader="Requests"
            items={perVersion.slice(0, 15)}
          />
        </Card>
      )}
    </Flex.Stack>
  )
}
