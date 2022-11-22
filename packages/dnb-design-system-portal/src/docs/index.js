/* eslint-disable react/prop-types */
/**
 * Main App
 *
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MainMenu from 'dnb-design-system-portal/src/shared/menu/MainMenu'

// react component
export default function App() {
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
