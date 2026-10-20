import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button, Hr, P } from '@dnb/eufemia/src'
import AutoLinkHeader from '../../../shared/tags/AutoLinkHeader'
import { basicComponents } from '../../../shared/tags'
import { getSlugFromReactHeading } from '../../../uilib/utils/slug.mjs'
import type { GitHubRelease } from '../../../../vite/client/plugins/github-releases'

const pageSize = 10

const headingLevels = [2, 3, 4, 5, 6] as const

// eslint-disable-next-line security/detect-unsafe-regex -- the repeated group always consumes a newline, so it cannot backtrack exponentially
const leadingHeading = /^##\s+.*(?:\r?\n)+/

export function prepareReleaseNotes(body: string) {
  return body
    .replace(leadingHeading, '')
    .replace(/^###\s+:[^:\n]+:\s*/gm, '### ')
}

export function getReleaseType(release: GitHubRelease) {
  if (release.prerelease) {
    return 'Pre-release'
  }

  const patch = Number(release.tagName.match(/\d+\.\d+\.(\d+)/)?.[1])
  return patch > 0 ? 'Patch release' : 'Feature release'
}

function componentsWithHeadingIdPrefix(tagName: string) {
  const scopedHeadings = Object.fromEntries(
    headingLevels.map((level) => {
      const Heading = basicComponents[`h${level}`]

      return [
        `h${level}`,
        (props) => (
          <Heading
            useSlug={`${tagName} ${getSlugFromReactHeading(props.children)}`}
            {...props}
          />
        ),
      ]
    })
  )

  return { ...basicComponents, ...scopedHeadings }
}

export default function GitHubChangelog({
  releases,
}: {
  releases: GitHubRelease[]
}) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const visibleReleases = releases.slice(0, visibleCount)

  const componentsByReleaseTag = useMemo(() => {
    return new Map(
      releases.map(({ tagName }) => [
        tagName,
        componentsWithHeadingIdPrefix(tagName),
      ])
    )
  }, [releases])

  return (
    <section aria-label="Eufemia release history">
      {visibleReleases.map((release, index) => (
        <article key={release.tagName}>
          {index > 0 && <Hr top="large" bottom="large" />}
          <AutoLinkHeader level={2} useSlug={release.tagName}>
            {release.name}
          </AutoLinkHeader>
          <P bottom="medium">
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'long',
              timeZone: 'UTC',
            }).format(new Date(release.publishedAt))}
            {' · '}
            {getReleaseType(release)}
          </P>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            // @ts-expect-error -- strictFunctionTypes
            components={componentsByReleaseTag.get(release.tagName)}
          >
            {prepareReleaseNotes(release.body)}
          </ReactMarkdown>
        </article>
      ))}

      {visibleCount < releases.length && (
        <Button
          top="large"
          variant="secondary"
          icon="arrow_down"
          text="Show more releases"
          onClick={() => setVisibleCount((count) => count + pageSize)}
        />
      )}
    </section>
  )
}
