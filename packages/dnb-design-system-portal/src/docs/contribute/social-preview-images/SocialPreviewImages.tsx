import { useEffect, useState } from 'react'
import {
  Anchor,
  Card,
  Flex,
  FormStatus,
  Grid,
  Skeleton,
} from '@dnb/eufemia/src'
import { H2, Img } from '@dnb/eufemia/src/elements'
import { getSocialImage } from '../../../shared/social-image.mjs'

type Preview = { title: string; url: string; alt: string; route?: string }
const origin = 'https://assets.eufemia.dnb.no'
const fallback: Preview = {
  title: 'Default image',
  url: '/dnb/og-image.png?v=2',
  alt: 'Eufemia Design System',
}
const placeholders = Array.from({ length: 12 }, (_, index) => ({
  ...fallback,
  title: 'Preview image',
  route: 'placeholder-' + index,
}))

export default function SocialPreviewImages() {
  const [images, setImages] = useState<Preview[]>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const response = await fetch(origin + '/og/manifest.json', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error('Could not load preview images')
        }
        const catalogue = await response.json()
        if (
          catalogue.version !== 1 ||
          !catalogue.entries ||
          typeof catalogue.entries !== 'object' ||
          Array.isArray(catalogue.entries)
        ) {
          throw new Error('Invalid preview catalogue')
        }
        const previews = Object.entries(catalogue.entries).map(
          ([route, value]) => {
            const entry = value as {
              file: string
              alt: string
              kind: string
            }
            if (
              !/^\/[a-zA-Z0-9._/-]*$/.test(route) ||
              route.includes('//') ||
              entry?.kind !== 'screenshot' ||
              !/^images\/[a-f0-9]{64}\.png$/.test(entry.file)
            ) {
              throw new Error('Invalid preview image')
            }
            const image = getSocialImage(route, { [route]: entry })
            return {
              route,
              title: image.alt.replace(/\. Component example\.$/, ''),
              ...image,
            }
          }
        )
        if (!controller.signal.aborted) {
          setImages(
            previews.sort((a, b) => a.title.localeCompare(b.title))
          )
        }
      } catch {
        if (!controller.signal.aborted) {
          setFailed(true)
        }
      }
    }
    load()
    return () => controller.abort()
  }, [])

  const loading = images === null && !failed
  const previews = loading ? placeholders : [fallback, ...(images || [])]

  return (
    <>
      {failed ? (
        <FormStatus state="error" bottom="medium">
          The published images could not be loaded. Reload the page to try
          again.
        </FormStatus>
      ) : null}
      <Skeleton show={loading} ariaBusy="Loading published images">
        <Grid.Container
          columns={{ small: 1, medium: 2, large: 2 }}
          columnGap="small"
          rowGap="small"
        >
          {previews.map(({ title, url, alt, route }) => (
            <Card.Info
              key={route || 'default'}
              innerSpace={0}
              gap={false}
              aria-label={loading ? undefined : title}
              aria-hidden={loading || undefined}
            >
              <Anchor
                href={loading ? undefined : url}
                disabled={loading}
                target="_blank"
                noStyle
                noLaunchIcon
                aria-label={'Open full-size preview: ' + title}
                style={{
                  display: 'block',
                  overflow: 'hidden',
                  borderRadius:
                    'var(--rounded-corner) var(--rounded-corner) 0 0',
                }}
              >
                <Img
                  src={url}
                  alt={alt}
                  loading="lazy"
                  width="1200"
                  height="630"
                  figureProps={{ style: { display: 'block' } }}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </Anchor>
              <Flex.Stack innerSpace="small">
                <H2 size="small" style={{ margin: 0 }}>
                  <Anchor
                    href={loading ? undefined : route || url}
                    disabled={loading}
                  >
                    {title}
                  </Anchor>
                </H2>
              </Flex.Stack>
            </Card.Info>
          ))}
        </Grid.Container>
      </Skeleton>
    </>
  )
}
