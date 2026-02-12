import React from 'react'

function formatTitle(title) {
  return `${title} | Eufemia`
}

export const renderBody =
  () =>
  ({ setHeadComponents, loadPageDataSync, pathname }) => {
    let pageContext = null

    if (typeof loadPageDataSync === 'function') {
      // SSG only
      pageContext = loadPageDataSync(pathname).result.pageContext
    }

    setHeadComponents(
      <HeadComponents
        key="portal-head-components"
        pathname={pathname}
        {...pageContext?.headData}
      />
    )
  }

export function HeadComponents({
  title = null,
  description = null,
  pathname,
}: {
  title?: string | null
  description?: string | null
  pathname?: string
}) {
  const formattedTitle = title ? formatTitle(title) : 'Eufemia'
  const siteUrl = 'https://eufemia.dnb.no'
  const fullUrl = pathname ? `${siteUrl}${pathname}` : siteUrl
  const ogImage = `${siteUrl}/dnb/android-chrome-512x512.png`
  const defaultDescription =
    'Eufemia Design System is the go-to place for all who has to design, develop and make digital WEB applications for DNB.'

  return (
    <>
      <title id="head-title">{formattedTitle}</title>
      <meta
        id="head-description"
        name="description"
        content={description || defaultDescription}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Eufemia" />
      <meta property="og:title" content={formattedTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="Eufemia Design System" />

      {pathname === '/' ? (
        <>
          <link
            rel="alternate"
            type="text/plain"
            title="Eufemia LLM discovery manifest"
            href="/llms.txt"
          />
        </>
      ) : null}
      {pathname && (
        <link
          rel="alternate"
          type="text/markdown"
          title="Markdown documentation"
          href={`${pathname.endsWith('/') ? pathname : pathname + '/'}.md`}
        />
      )}
    </>
  )
}

export function setPortalHeadData(pageContext, { title, description }) {
  // Mutate pageContext with headData
  pageContext.headData = { title, description }
}

export function usePortalHead({ title, description }) {
  React.useEffect(() => {
    // Update meta during hydration render
    if (typeof document !== 'undefined') {
      try {
        if (title) {
          document.getElementById('head-title').textContent =
            formatTitle(title)
        }
        if (description) {
          document.getElementById('head-description').textContent =
            description
        }
      } catch (e) {
        //
      }
    }
  }, [title, description])
}
