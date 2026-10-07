import { useEffect, useMemo, useState } from 'react'
import {
  Button,
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
  signOut,
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
} from './data'
import Kpis from './components/Kpis'
import BarList from './components/BarList'
import RankedTable from './components/RankedTable'
import './App.scss'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'ready'
      session: Session | null
      payload: DashboardPayload | null
    }

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

        setState({ status: 'ready', session, payload: demoPayload })

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
      setState({ status: 'ready', session, payload })
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
      session={state.session}
      payload={state.payload}
      env={env}
      onEnvChange={setEnv}
      colorScheme={colorScheme}
      onColorSchemeChange={onColorSchemeChange}
    />
  )
}

function Dashboard({
  session,
  payload,
  env,
  onEnvChange,
  colorScheme,
  onColorSchemeChange,
}: {
  session: Session | null
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
  const mcpTotal = mcp?.total ?? 0
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
          {session && (
            <>
              <P>{session.name}</P>
              <Button variant="secondary" onClick={signOut}>
                Sign out
              </Button>
            </>
          )}
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

        <Tabs.Content title="MCP usage" key="mcp">
          <Flex.Stack gap="large">
            {mcpTotal > 0 ? (
              <>
                <P className="dashboard__meta">
                  {`${mcpTotal.toLocaleString()} MCP requests`}
                </P>

                <Card stack>
                  <H2 size="medium">MCP tools</H2>
                  <RankedTable
                    caption="MCP tools"
                    nameHeader="Tool"
                    countHeader="Requests"
                    items={mcp?.perTool ?? []}
                  />
                </Card>

                <Card stack>
                  <H2 size="medium">MCP components</H2>
                  <RankedTable
                    caption="MCP components"
                    nameHeader="Component"
                    countHeader="Requests"
                    items={(mcp?.perComponent ?? []).slice(0, 15)}
                  />
                </Card>

                <Card stack>
                  <H2 size="medium">MCP doc paths and areas</H2>
                  <P className="dashboard__meta">
                    Web requests count full doc paths. Local requests count
                    only the leading area, such as /uilib/components/.
                  </P>
                  <RankedTable
                    caption="MCP doc paths and areas"
                    nameHeader="Path or area"
                    countHeader="Requests"
                    items={(mcp?.perPath ?? []).slice(0, 15)}
                  />
                </Card>

                {(mcp?.perVersion ?? []).length > 0 && (
                  <Card stack>
                    <H2 size="medium">Local MCP — by Eufemia version</H2>
                    <RankedTable
                      caption="Local MCP by Eufemia version"
                      nameHeader="Version"
                      countHeader="Requests"
                      items={(mcp?.perVersion ?? []).slice(0, 15)}
                    />
                  </Card>
                )}
              </>
            ) : (
              <P className="dashboard__meta">No MCP usage yet.</P>
            )}
          </Flex.Stack>
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
