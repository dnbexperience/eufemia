/* eslint-disable react/prop-types */
/**
 * Main App
 *
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MainMenu from 'dnb-design-system-portal/src/shared/menu/MainMenu'

export default function App() {
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

export const Head = () => {
  const {
    site: {
      siteMetadata: { title: mainTitle, description: mainDescription },
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

  return (
    <>
      <title>{mainTitle}</title>
      <meta name="description" content={mainDescription} />
    </>
  )
}
