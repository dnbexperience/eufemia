import type { Report } from '../../monitoring/report-incident.ts'

export type Service = 'CDN' | 'MCP'
export type State = { report?: Report; pendingObservation?: Report }
type Dependencies = {
  load: () => Promise<State>
  check: () => Promise<Report>
  save: (state: State) => Promise<void>
  publish: (report: Report) => Promise<void>
  completed: (report: Report) => void
}

export async function runMonitor(
  notifications: boolean,
  dependencies: Dependencies
) {
  const state = await dependencies.load()
  async function publishPending() {
    if (notifications && state.pendingObservation) {
      await dependencies.publish(state.pendingObservation)
      delete state.pendingObservation
      await dependencies.save(state)
    }
  }
  await publishPending()
  const report = await dependencies.check()
  state.report = report
  if (notifications) {
    state.pendingObservation = report
  }
  await dependencies.save(state)
  await publishPending()
  dependencies.completed(report)
  return report
}
