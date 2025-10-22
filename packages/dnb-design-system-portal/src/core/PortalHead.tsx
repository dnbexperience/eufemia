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
      />,
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
  return (
    <>
      <title id="head-title">{title ? formatTitle(title) : ''}</title>
      <meta
        id="head-description"
        name="description"
        content={description}
      />
      {pathname === '/' ? (
        <>
          <link
            rel="alternate"
            type="text/plain"
            title="Eufemia LLM discovery manifest"
            href="/llms.txt"
          />
          <link
            rel="alternate"
            type="application/json"
            title="Eufemia LLM index"
            href="/llm/index.json"
          />
        </>
      ) : (
        pathname && (
          <link
            rel="alternate"
            type="application/json"
            title="Machine-readable metadata"
            href={`/llm${
              pathname.endsWith('/') ? pathname : pathname + '/'
            }metadata.json`}
          />
        )
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
