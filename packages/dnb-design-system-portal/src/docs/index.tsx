/**
 * Main App
 *
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MainMenu from '../shared/menu/MainMenu'
import { usePortalHead } from '../core/PortalHead'

export default function App() {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  usePortalHead({ title, description })

  React.useEffect(() => {
    /**
     * Add "home-background" to body, so we get the same color on "overscroll"
     */
    const { classList } = document.querySelector('body')
    classList.add('home-background')
    return () => classList.remove('home-background')
  }, [])

  return (
    <main aria-label="Choose a menu section" className="home-background">
      <MainMenu />
    </main>
  )
}
