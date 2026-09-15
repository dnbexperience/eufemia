import { useEffect } from 'react'

function formatTitle(title) {
  return `${title} | Eufemia`
}

export function setPortalHeadData(pageContext, { title, description }) {
  // Mutate pageContext with headData
  pageContext.headData = { title, description }
}

export function usePortalHead({ title, description }) {
  useEffect(() => {
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
