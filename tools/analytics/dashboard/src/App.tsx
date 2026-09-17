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
} from '@dnb/eufemia/src'

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

export default function App() {
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
    />
  )
}

function Dashboard({
  session,
  payload,
  env,
  onEnvChange,
}: {
  session: Session | null
  payload: DashboardPayload | null
  env: string
  onEnvChange: (env: string) => void
}) {
  const { allRows, rows, envs, kpis } = useMemo(
    () => dashboardView(payload, env),
    [payload, env]
  )

  const mcp = payload?.mcpUsage
  const mcpTotal = mcp?.total ?? 0
  const meta = snapshotMeta(payload, allRows.length + mcpTotal)

  return (
    <Flex.Stack className="dashboard" space="large">
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

      {rows.length > 0 && (
        <>
          <Kpis items={kpis} />

          <Card stack>
            <H2 size="medium">Records per day</H2>
            <BarList items={rank(countBy(rows, 'day'), { sort: 'key' })} />
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
      )}

      <P className="dashboard__meta">
        {mcpTotal > 0
          ? `${mcpTotal.toLocaleString()} MCP requests`
          : 'No MCP usage yet.'}
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
        <H2 size="medium">MCP doc paths</H2>
        <RankedTable
          caption="MCP doc paths"
          nameHeader="Path"
          countHeader="Requests"
          items={(mcp?.perPath ?? []).slice(0, 15)}
        />
      </Card>
    </Flex.Stack>
  )
}
