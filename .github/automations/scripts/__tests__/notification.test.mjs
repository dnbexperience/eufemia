import { strict as assert } from 'node:assert'
import {
  findAutomationComment,
  findAutomationIssue,
  renderNotification,
  validateNotificationMarker,
} from '../notification-utils.mjs'

const marker = 'eufemia-automation:ci-failure-triage:pr-123'
const body = renderNotification({
  marker,
  repository: 'dnbexperience/eufemia',
  runUrl: 'https://github.com/dnbexperience/eufemia/actions/runs/123',
  title: 'CI failure triage',
  report: {
    status: 'attention',
    summary: 'Inspect <script> and https://untrusted.example/path.',
    findings: Array.from({ length: 6 }, (_, index) => ({
      severity: 'P2',
      title: `Finding ${index + 1}`,
      evidence: 'Evidence',
      recommendation: 'Review [the failure].',
    })),
    metrics: [],
  },
})

assert.match(body, /^<!-- eufemia-automation:ci-failure-triage:pr-123 -->/)
assert.match(body, /&lt;script&gt;/)
assert.match(body, /\\\[external link omitted\\\]/)
assert.doesNotMatch(body, /untrusted\.example/)
assert.match(body, /Showing 5 of 6 findings/)
assert.doesNotMatch(body, /Finding 6/)
assert.throws(() =>
  renderNotification({
    marker,
    repository: 'dnbexperience/eufemia',
    runUrl: 'https://example.com/actions/runs/123',
    title: 'Invalid',
    report: { status: 'ok', summary: '', findings: [], metrics: [] },
  })
)
assert.doesNotThrow(() => validateNotificationMarker(marker))
assert.throws(() => validateNotificationMarker('invalid --> marker'))
assert.equal(
  findAutomationComment(
    [
      {
        id: 1,
        user: { login: 'github-actions[bot]' },
        body: `quoted <!-- ${marker} -->`,
      },
      { id: 2, user: { login: 'github-actions[bot]' }, body },
    ],
    marker
  ).id,
  2
)
assert.equal(
  findAutomationIssue(
    [
      {
        number: 4,
        title: 'Documentation drift',
        user: { login: 'github-actions[bot]' },
        body: '<!-- eufemia-automation:documentation-drift -->\nReport',
      },
    ],
    'eufemia-automation:documentation-drift',
    'Documentation drift'
  ).number,
  4
)

console.log('notification tests passed')
