import { strict as assert } from 'node:assert'
import {
  extractUrls,
  extractAnnouncementDocsLinks,
  formatMotivationComment,
  findAutomationComment,
  isGeneratedDependencyPullRequest,
  isReleaseTag,
  parsePreviousTag,
  parsePullNumber,
  parseReleaseVersion,
  validateCommentBody,
  validateAnnouncement,
  verifyAnnouncementDocsLinks,
} from '../../release-utils.mjs'

assert.equal(
  parseReleaseVersion('release of v11.11.0 - attempt 3 (#9103)'),
  'v11.11.0'
)
assert.equal(parseReleaseVersion('retry release of v11.11.0'), null)
assert.equal(parsePullNumber('feat(Button): add behavior (#123)'), 123)
assert.equal(isReleaseTag('v11.11.0'), true)
assert.equal(isReleaseTag('--upload-pack=malicious'), false)
assert.equal(
  parsePreviousTag(
    'https://github.com/dnbexperience/eufemia/compare/v11.10.1...v11.11.0',
    'v11.11.0'
  ),
  'v11.10.1'
)
assert.deepEqual(
  extractUrls(
    'See https://example.com/path. Keep https://example.com/other?view=1 but drop https://example.com/private?token=secret.'
  ),
  ['https://example.com/path', 'https://example.com/other?view=1']
)
assert.equal(
  isGeneratedDependencyPullRequest({
    title: 'chore(deps): update dependency',
    body: '',
    user: { type: 'User' },
  }),
  true
)
assert.equal(
  isGeneratedDependencyPullRequest({
    title: 'feat: generate a useful artifact',
    body: 'Motivation: https://example.com/decision',
    user: { login: 'release-helper[bot]', type: 'Bot' },
  }),
  false
)

const context = {
  version: 'v1.2.3',
  previousTag: 'v1.2.2',
  tag: 'v1.2.3',
  release: { url: 'https://github.com/example/repo/releases/tag/v1.2.3' },
  sourcePullRequests: [
    {
      number: 1,
      title: 'feat(Button): improve action',
      url: 'https://github.com/example/repo/pull/1',
      links: ['https://example.com/motivation'],
      order: 1,
    },
  ],
  directCommits: [
    {
      sha: 'abcdef123456',
      subject: 'document the decision',
      url: 'https://github.com/example/repo/commit/abcdef123456',
      links: ['https://example.com/direct'],
      order: 0,
    },
  ],
}
const motivationComment = formatMotivationComment(context)
assert.match(motivationComment, /eufemia-release-motivation-links:v1.2.3/)
assert.match(
  motivationComment,
  /### \[`abcdef1`: document the decision\]\([^)]+\)\n- <https:\/\/example\.com\/direct>/
)
assert.match(
  motivationComment,
  /### \[#1: feat\(Button\): improve action\]\([^)]+\)\n- <https:\/\/example\.com\/motivation>/
)

const announcement = [
  '🚀 **Eufemia v1.2.3 is out!**',
  '',
  '- **Button improvement:** Makes actions clearer ([docs](https://eufemia.dnb.no/uilib/components/button#button)).',
  '',
  '[See the full release notes →](https://github.com/example/repo/releases/tag/v1.2.3)',
].join('\n')

validateAnnouncement(announcement, context)
assert.deepEqual(extractAnnouncementDocsLinks(announcement), [
  'https://eufemia.dnb.no/uilib/components/button#button',
])
await verifyAnnouncementDocsLinks(announcement, {
  fetchImplementation: async (url) => {
    if (!String(url).endsWith('/')) {
      return new Response(null, {
        status: 301,
        headers: { location: `${url}/` },
      })
    }

    return new Response('<h1 id="button">Button</h1>', {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  },
})

assert.throws(() =>
  validateAnnouncement(
    [
      '🚀 **Eufemia v1.2.3 is out!**',
      '',
      '- **Button improvement:** Missing anchor ([docs](https://eufemia.dnb.no/uilib/components/button)).',
      '',
      '[See the full release notes →](https://github.com/example/repo/releases/tag/v1.2.3)',
    ].join('\n'),
    context
  )
)
assert.throws(() =>
  validateAnnouncement(
    announcement.replace(
      'https://eufemia.dnb.no/uilib/components/button#button',
      'https://eufemia.dnb.no.evil.example/uilib/components/button#button'
    ),
    context
  )
)
assert.throws(() =>
  validateAnnouncement(
    announcement.replace(
      'https://eufemia.dnb.no/uilib/components/button#button',
      'https://eufemia.dnb.no/uilib/components/button?token=secret#button'
    ),
    context
  )
)

await assert.rejects(() =>
  verifyAnnouncementDocsLinks(announcement, {
    fetchImplementation: async () =>
      new Response('<h1 id="another-anchor">Button</h1>', {
        headers: { 'content-type': 'text/html' },
      }),
  })
)

await assert.rejects(() =>
  verifyAnnouncementDocsLinks(announcement, {
    fetchImplementation: async () =>
      new Response(null, {
        status: 302,
        headers: { location: 'https://example.com/phishing' },
      }),
  })
)

assert.throws(() =>
  validateAnnouncement(
    announcement.replace(
      'Makes actions clearer',
      'Makes actions clearer at https://example.com'
    ),
    context
  )
)

assert.doesNotThrow(() => validateCommentBody('A short comment'))
assert.throws(() => validateCommentBody('x'.repeat(60 * 1024 + 1)))
assert.equal(
  findAutomationComment(
    [
      {
        id: 1,
        user: { login: 'github-actions[bot]' },
        body: 'quoted <!-- eufemia-release-announcement:v1.2.3 -->',
      },
      {
        id: 2,
        user: { login: 'github-actions[bot]' },
        body: '<!-- eufemia-release-announcement:v1.2.3 -->\nDraft',
      },
    ],
    'eufemia-release-announcement:v1.2.3'
  ).id,
  2
)
assert.throws(() => findAutomationComment([], 'untrusted-marker'))

console.log('release utility tests passed')
