export const parseReleaseVersion = (title) =>
  String(title).match(
    /^release of (v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)(?:\s|$)/i
  )?.[1] ?? null

export const parsePullNumber = (title) => {
  const match = String(title).match(/\(#(\d+)\)\s*$/)
  return match ? Number(match[1]) : null
}

export const isReleaseTag = (value) =>
  /^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(String(value))

export const parsePreviousTag = (releaseBody, currentTag) => {
  const match = String(releaseBody).match(
    /https:\/\/github\.com\/[^/]+\/[^/]+\/compare\/([^\s.][^\s]*?)\.\.\.([^\s)]+)/
  )

  if (!match || match[2] !== currentTag) {
    return null
  }

  return match[1]
}

export const extractUrls = (text) => {
  const matches = String(text ?? '').match(/https?:\/\/[^\s<>"']+/g) ?? []
  const urls = matches
    .map((url) => url.replace(/[`),.;!?]+$/g, ''))
    .filter((url) => {
      try {
        const parsed = new URL(url)
        if (
          (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') ||
          parsed.username ||
          parsed.password
        ) {
          return false
        }

        const sensitiveParameter = Array.from(
          parsed.searchParams.keys()
        ).some((name) =>
          /(?:^|[_-])(api[_-]?key|auth|code|credential|password|secret|sig|signature|token)(?:$|[_-])/i.test(
            name
          )
        )
        return !sensitiveParameter
      } catch {
        return false
      }
    })

  return [...new Set(urls)]
}

export const isGeneratedDependencyPullRequest = (pullRequest) =>
  /^(dependabot|renovate)(?:-preview)?\[bot\]$/i.test(
    String(pullRequest.user?.login ?? '')
  ) ||
  /^(deps|chore\(deps(?:-dev)?\)):/i.test(pullRequest.title) ||
  /^Bumps \[/i.test(String(pullRequest.body ?? '').trim())

export const maxGitHubCommentBytes = 60 * 1024

export const validateCommentBody = (body) => {
  const size = Buffer.byteLength(String(body), 'utf8')

  if (size === 0 || size > maxGitHubCommentBytes) {
    throw new Error(
      `GitHub comment must be 1-${maxGitHubCommentBytes} UTF-8 bytes`
    )
  }
}

const getCommentMarker = (marker) => {
  if (
    !/^eufemia-release-(announcement|motivation-links):v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(
      marker
    )
  ) {
    throw new Error('GitHub comment marker is invalid')
  }

  return `<!-- ${marker} -->`
}

export const findAutomationComment = (comments, marker) => {
  const commentMarker = getCommentMarker(marker)

  return comments.find(
    (comment) =>
      comment.user?.login === 'github-actions[bot]' &&
      String(comment.body).startsWith(`${commentMarker}\n`)
  )
}

const escapeMarkdown = (value) =>
  String(value)
    .replace(/\\/g, '\\\\')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/([\[\]_*`])/g, '\\$1')

export const formatMotivationComment = (context) => {
  const lines = [
    `<!-- eufemia-release-motivation-links:${context.version} -->`,
    '## Release motivation and source links',
    '',
    `Links collected from source pull requests and direct commits included between \`${context.previousTag}\` and \`${context.tag}\`.`,
    '',
    '_Generated dependency-update metadata is excluded._',
  ]
  let linkCount = 0
  const sourceItems = [
    ...context.sourcePullRequests.map((item) => ({
      type: 'pullRequest',
      ...item,
    })),
    ...context.directCommits.map((item) => ({
      type: 'commit',
      ...item,
    })),
  ].sort((left, right) => (left.order ?? 0) - (right.order ?? 0))

  for (const item of sourceItems) {
    if (item.links.length === 0) {
      continue
    }

    const heading =
      item.type === 'pullRequest'
        ? `### [#${item.number}: ${escapeMarkdown(item.title)}](${item.url})`
        : `### [\`${item.sha.slice(0, 7)}\`: ${escapeMarkdown(item.subject)}](${item.url})`
    lines.push('', heading)
    for (const link of item.links) {
      lines.push(`- <${link}>`)
      linkCount += 1
    }
  }

  if (linkCount === 0) {
    lines.push('', '_No motivation or source links were found._')
  }

  lines.push('', `Collected links: **${linkCount}**.`)

  return lines.join('\n')
}

export const announcementMarker = (version) =>
  `<!-- eufemia-release-announcement:${version} -->`

export const extractAnnouncementDocsLinks = (body) =>
  String(body)
    .split('\n')
    .filter((line) => line.startsWith('- '))
    .map((line, index) => {
      const value = line.match(
        /\(\[docs\]\((https:\/\/eufemia\.dnb\.no\/[^)]+)\)\)/
      )?.[1]

      if (!value) {
        throw new Error(
          `Release bullet ${index + 1} is missing an Eufemia docs link`
        )
      }

      const url = new URL(value)
      if (
        url.origin !== 'https://eufemia.dnb.no' ||
        !url.pathname.startsWith('/uilib/') ||
        url.search ||
        !url.hash
      ) {
        throw new Error(
          `Release bullet ${index + 1} has an invalid Eufemia docs link`
        )
      }

      return url.href
    })

const extractAllHttpUrls = (body) =>
  (String(body).match(/https?:\/\/[^\s<>"']+/g) ?? []).map((url) =>
    url.replace(/[`),.;!?]+$/g, '')
  )

const readBoundedResponse = async (response, maxBytes) => {
  const contentLength = Number(response.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new Error('Documentation response exceeds the size limit')
  }

  if (!response.body?.getReader) {
    const body = await response.text()
    if (Buffer.byteLength(body, 'utf8') > maxBytes) {
      throw new Error('Documentation response exceeds the size limit')
    }
    return body
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let body = ''
  let size = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }

    size += value.byteLength
    if (size > maxBytes) {
      await reader.cancel()
      throw new Error('Documentation response exceeds the size limit')
    }
    body += decoder.decode(value, { stream: true })
  }

  return body + decoder.decode()
}

const escapeRegularExpression = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const fetchDocumentationPage = async (
  pageUrl,
  fetchImplementation,
  timeoutMs
) => {
  let currentUrl = new URL(pageUrl)

  for (let redirects = 0; redirects <= 5; redirects += 1) {
    const response = await fetchImplementation(currentUrl, {
      headers: { accept: 'text/html' },
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs),
    })

    if (response.status < 300 || response.status >= 400) {
      return { response, finalUrl: currentUrl }
    }

    const location = response.headers.get('location')
    if (!location || redirects === 5) {
      throw new Error(
        `Cannot verify Eufemia documentation page: ${pageUrl}`
      )
    }

    const redirectUrl = new URL(location, currentUrl)
    if (
      redirectUrl.origin !== 'https://eufemia.dnb.no' ||
      !redirectUrl.pathname.startsWith('/uilib/')
    ) {
      throw new Error(
        `Eufemia documentation redirected outside the trusted site: ${pageUrl}`
      )
    }

    await response.body?.cancel()
    currentUrl = redirectUrl
  }
}

export const verifyAnnouncementDocsLinks = async (
  body,
  {
    fetchImplementation = globalThis.fetch,
    maxResponseBytes = 5 * 1024 * 1024,
    timeoutMs = 15000,
  } = {}
) => {
  const links = extractAnnouncementDocsLinks(body)
  const pages = new Map()

  for (const link of links) {
    const url = new URL(link)
    const pageUrl = new URL(url.pathname, url.origin).href
    const anchors = pages.get(pageUrl) ?? []
    anchors.push(decodeURIComponent(url.hash.slice(1)))
    pages.set(pageUrl, anchors)
  }

  await Promise.all(
    [...pages].map(async ([pageUrl, anchors]) => {
      const { response, finalUrl } = await fetchDocumentationPage(
        pageUrl,
        fetchImplementation,
        timeoutMs
      )
      const contentType = response.headers.get('content-type') ?? ''
      const requestedPath = new URL(pageUrl).pathname.replace(/\/+$/, '')
      const finalPath = finalUrl.pathname.replace(/\/+$/, '')

      if (
        !response.ok ||
        finalUrl.origin !== 'https://eufemia.dnb.no' ||
        finalPath !== requestedPath ||
        !contentType.toLowerCase().includes('text/html')
      ) {
        throw new Error(
          `Cannot verify Eufemia documentation page: ${pageUrl}`
        )
      }

      const page = await readBoundedResponse(response, maxResponseBytes)
      for (const anchor of anchors) {
        const escapedAnchor = escapeRegularExpression(anchor)
        const idPattern = new RegExp(`\\sid=["']${escapedAnchor}["']`, 'u')
        if (!idPattern.test(page)) {
          throw new Error(
            `Eufemia documentation anchor does not exist: ${pageUrl}#${encodeURIComponent(anchor)}`
          )
        }
      }
    })
  )
}

export const validateAnnouncement = (body, context) => {
  const value = String(body)
  const heading = `🚀 **Eufemia ${context.version} is out!**`
  const releaseNotesLink = `[See the full release notes →](${context.release.url})`

  if (value.length === 0 || value.length > 12000) {
    throw new Error('Release announcement has an invalid length')
  }

  if (value.split('\n')[0] !== heading) {
    throw new Error('Release announcement has an invalid heading')
  }

  if (!value.trimEnd().endsWith(releaseNotesLink)) {
    throw new Error(
      'Release announcement is missing the release-notes link'
    )
  }

  if (value.includes('<!--')) {
    throw new Error('Release announcement may not contain HTML comments')
  }
  if (value.includes('```')) {
    throw new Error(
      'Release announcement may not contain fenced code blocks'
    )
  }

  const bullets = value.split('\n').filter((line) => line.startsWith('- '))
  if (bullets.length === 0 || bullets.length > 12) {
    throw new Error(
      'Release announcement must contain 1-12 feature bullets'
    )
  }

  const docsLinks = extractAnnouncementDocsLinks(value)
  const allowedLinks = new Set([
    ...docsLinks,
    new URL(context.release.url).href,
  ])

  for (const link of extractAllHttpUrls(value)) {
    let canonicalLink
    try {
      canonicalLink = new URL(link).href
    } catch {
      throw new Error('Release announcement contains an invalid URL')
    }

    if (!allowedLinks.has(canonicalLink)) {
      throw new Error(
        `Release announcement contains an unapproved URL: ${link}`
      )
    }
  }
}
