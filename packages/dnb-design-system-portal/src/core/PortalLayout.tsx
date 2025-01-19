/* eslint-disable react/prop-types */
/**
 * MDX Template
 */

import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../shared/parts/Layout'
import TabBar from '../shared/tags/TabBar'
import { Link } from '../shared/tags/Anchor'
import tags from '../shared/tags'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import { setPortalHeadData, usePortalHead } from './PortalHead'
import { Breadcrumb } from '@dnb/eufemia/src'

const ContentWrapper = TabBar.ContentWrapper

type Frontmatter = {
  title: string
  fullscreen: boolean
}
type Fields = {
  slug: string
}
type PortalLayoutNode = {
  frontmatter: Frontmatter
  fields: Fields
}
export type PortalLayoutProps = {
  location: Location
  pageContext: { frontmatter: Frontmatter; fullscreen?: boolean }
  children: React.ReactNode
}

export default function PortalLayout(props: PortalLayoutProps) {
  const { pageContext, location, children } = props

  const data = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
              fullscreen
              showTabs
              breadcrumb {
                text
                href
              }
              hideTabs {
                title
              }
              tabs {
                title
                key
              }
            }
            siblings {
              fields {
                slug
              }
              frontmatter {
                menuTitle
                hideInMenu
                title
                description
                fullscreen
                showTabs
                breadcrumb {
                  text
                  href
                }
                hideTabs {
                  title
                }
                tabs {
                  title
                  key
                }
              }
            }
          }
        }
      }
    }
  `)

  const slug = location.pathname.replace(/^\/|\/$/g, '')
  const mdx =
    React.useMemo(() => {
      return data.allMdx.edges.find(({ node }) => {
        return slug === node.fields.slug
      })
    }, [data, slug])?.node || {}

  const { siblings } = mdx
  const category = siblings?.[0] as PortalLayoutNode
  const categoryFm = category?.frontmatter || {}
  const currentFm = mdx?.frontmatter || {}
  const fmData = Object.entries(categoryFm).reduce(
    (acc, [key, value]) => {
      if (!acc[key]) {
        acc[key] = value
      }
      return acc
    },
    { ...currentFm },
  )

  // Ensure heading levels are reset before each page renders
  resetLevels(1)

  usePortalHead(fmData)

  if (!mdx?.frontmatter) {
    return <>{children}</> // looks like it was not a MDX, so we just return children
  }

  // Share frontmatter in pageContext during SSR/SSG
  if (pageContext?.frontmatter) {
    setPortalHeadData(pageContext, fmData)
  }

  const makeUseOfCategory = Boolean(
    !mdx?.frontmatter?.title && mdx?.frontmatter?.showTabs,
  )
  const rootPath =
    '/' + (makeUseOfCategory ? category?.fields?.slug : mdx?.fields?.slug)
  const fullscreen = Boolean(fmData?.fullscreen) || pageContext?.fullscreen

  return (
    <Layout key="layout" location={location} fullscreen={fullscreen}>
      {fmData.breadcrumb && (
        <Breadcrumb key="breadcrumb" top="large">
          {fmData.breadcrumb.map((item, i, a) => {
            return (
              <Breadcrumb.Item
                key={item.text}
                variant={
                  (i == 0 && 'home') ||
                  (i == a.length - 1 && 'current') ||
                  null
                }
                element={Link}
                text={item.text}
                href={item.href}
              />
            )
          })}
        </Breadcrumb>
      )}

      {currentFm.showTabs && (
        <TabBar
          key="tab-bar"
          location={location}
          rootPath={rootPath}
          title={fmData.title}
          tabs={fmData.tabs}
          defaultTabs={fmData.defaultTabs}
          hideTabs={fmData.hideTabs}
        />
      )}

      <Content showTabs={currentFm.showTabs}>{children}</Content>
    </Layout>
  )
}

function Content({ showTabs, children }) {
  if (showTabs) {
    resetLevels(2)
  }

  return (
    <ContentWrapper>
      <MDXProvider components={tags}>{children}</MDXProvider>
    </ContentWrapper>
  )
}
