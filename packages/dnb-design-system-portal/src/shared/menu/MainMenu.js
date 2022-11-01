/**
 * Main Menu
 *
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Card from './Card'
import {
  UilibSvg,
  BrandSvg,
  IconsSvg,
  QuickguideDesignerSvg,
  DesignSystemSvg,
  DevelopmentSvg,
} from './MainMenuGraphics'
import { Logo, VisuallyHidden } from '@dnb/eufemia/src'
import packageJson from '../../../package.json'
import { SearchBarInput } from './SearchBar'
import {
  navStyle,
  listStyle,
  lastUpdatedStyle,
  contentWrapperStyle,
  logoFigureStyle,
} from './MainMenu.module.scss'

function MainMenu() {
  const data = useStaticQuery(graphql`
    query {
      categories: allMdx(
        filter: {
          slug: {
            in: [
              "uilib"
              "quickguide-designer"
              "icons"
              "design-system"
              "brand"
              "principles"
              "contribute"
            ]
          }
        }
      ) {
        edges {
          node {
            slug
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `)

  const {
    categories: { edges },
  } = data

  const items = edges.reduce((acc, { node: { slug, frontmatter } }) => {
    acc[slug] = {
      url: `/${slug}/`,
      slug,
      ...frontmatter,
    }
    return acc
  }, {})

  return (
    <nav className={navStyle}>
      <h1 id="welcome-heading" className="dnb-sr-only">
        Welcome to Eufemia
      </h1>
      <div aria-labelledby="welcome-heading">
        <>
          <div className={contentWrapperStyle}>
            <figure className={logoFigureStyle}>
              <Logo right size="48" color="white" />
              <figcaption>
                <VisuallyHidden>DNB</VisuallyHidden>
                Eufemia
              </figcaption>
            </figure>
            <SearchBarInput />
          </div>
          <ul className={listStyle}>
            <Card
              url={items['design-system']?.url}
              title={items['design-system']?.title}
              about={
                <>
                  {items['design-system']?.description}
                  <span
                    className={lastUpdatedStyle}
                    title="Last Change log update"
                  >
                    Updated: {packageJson.changelogVersion}
                  </span>
                </>
              }
              icon={DesignSystemSvg}
            />
            <Card
              url={items['uilib']?.url}
              title={items['uilib']?.title}
              about={items['uilib']?.description}
              icon={UilibSvg}
            />
            <Card
              url={items['quickguide-designer']?.url}
              title={items['quickguide-designer']?.title}
              about={items['quickguide-designer']?.description}
              icon={QuickguideDesignerSvg}
            />
            <Card
              url={items['icons']?.url}
              title={items['icons']?.title}
              about={items['icons']?.description}
              icon={IconsSvg}
            />
            <Card
              url={items['brand']?.url}
              title={items['brand']?.title}
              about={items['brand']?.description}
              icon={BrandSvg}
            />
            <Card
              url={items['contribute']?.url}
              title={items['contribute']?.title}
              about={items['contribute']?.description}
              icon={DevelopmentSvg}
            />
          </ul>
        </>
      </div>
    </nav>
  )
}

export default MainMenu
