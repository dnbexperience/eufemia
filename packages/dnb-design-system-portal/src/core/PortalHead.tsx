import { useEffect } from 'react'
import { graphql, useStaticQuery } from 'portal-query'

function formatTitle(title) {
  return `${title} | Eufemia`
}

export function setPortalHeadData(pageContext, { title, description }) {
  // Mutate pageContext with headData
  pageContext.headData = { title, description }
}

export function usePortalHead({ title, description }) {
  const {
    site: {
      siteMetadata: { description: defaultDescription },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  useEffect(() => {
    // Update meta during hydration render
    if (typeof document !== 'undefined') {
      const titleElement = document.getElementById('head-title')
      if (title && titleElement) {
        titleElement.textContent = formatTitle(title)
      }

      // Without the fallback, a page declaring no description of its own
      // would keep the description of the page navigated away from.
      const descriptionElement =
        document.getElementById('head-description')
      if (descriptionElement) {
        descriptionElement.setAttribute(
          'content',
          description || defaultDescription
        )
      }
    }
  }, [title, description, defaultDescription])
}
