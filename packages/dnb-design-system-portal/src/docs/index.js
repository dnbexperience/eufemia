/* eslint-disable react/prop-types */
/**
 * Main App
 *
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MainMenu from 'dnb-design-system-portal/src/shared/menu/MainMenu'
import { MainMenuProvider } from 'dnb-design-system-portal/src/shared/menu/MainMenuContext'

// react component
export default class App extends React.PureComponent {
  render() {
    return (
      <main aria-label="Choose a menu section">
        <MainMenuProvider isActive>
          <MainMenu />
        </MainMenuProvider>
      </main>
    )
  }
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
