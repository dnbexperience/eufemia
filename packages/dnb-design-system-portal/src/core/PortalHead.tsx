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
        {...pageContext?.headData}
      />,
    )
  }

export function HeadComponents({ title = null, description = null }) {
  return (
    <>
      <title id="head-title">{title ? formatTitle(title) : ''}</title>
      <meta
        id="head-description"
        name="description"
        content={description}
      />
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
