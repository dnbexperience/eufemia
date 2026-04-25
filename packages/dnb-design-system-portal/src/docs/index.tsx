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

  return (
    <main aria-label="Choose a menu section" className="home-background">
      <MainMenu />
    </main>
  )
}
