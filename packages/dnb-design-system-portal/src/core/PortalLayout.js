/* eslint-disable react/prop-types */
/**
 * MDX Template
 */

import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../shared/parts/Layout'
import Tabbar from '../shared/tags/Tabbar'
import tags from '../shared/tags'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'

const ContentWrapper = Tabbar.ContentWrapper

export default function PortalLayout(props) {
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
                title
                description
                fullscreen
                showTabs
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

  const makeUseOfCategory = Boolean(
    !mdx?.frontmatter?.title && mdx?.frontmatter?.showTabs
  )
  const category = siblings?.[0]
  const categoryFm = category?.frontmatter || {}
  const currentFm = mdx?.frontmatter || {}

  // Ensure heading levels are reset before each page SSR starts
  resetLevels(1)

  if (!mdx?.frontmatter) {
    return children
  }

  // Share frontmatter in pageContext during SSG
  if (pageContext?.frontmatter) {
    const { title, description } = currentFm.title ? currentFm : categoryFm
    pageContext.frontmatter.meta = { title, description }

    // Update meta during hydration render
    if (typeof document !== 'undefined') {
      const existingElem = document.head.getElementsByTagName('title')
      existingElem[0]?.parentNode?.removeChild(existingElem[0])

      const newElem = document.createElement('title')
      newElem.textContent = title
      document.head.appendChild(newElem)
    }
  }

  const Content = () => {
    if (currentFm.showTabs) {
      resetLevels(2)
    }

    return (
      <ContentWrapper>
        <MDXProvider components={tags}>{children}</MDXProvider>
      </ContentWrapper>
    )
  }

  return (
    <Layout
      key="layout"
      location={location}
      fullscreen={
        Boolean(currentFm?.fullscreen || categoryFm?.fullscreen) ||
        pageContext?.fullscreen
      }
    >
      {currentFm.showTabs && (
        <Tabbar
          key="tabbar"
          location={location}
          rootPath={
            '/' +
            (makeUseOfCategory
              ? category?.fields?.slug
              : mdx?.fields?.slug)
          }
          title={currentFm.title || categoryFm.title}
          tabs={currentFm.tabs || categoryFm.tabs}
          defaultTabs={currentFm.defaultTabs || categoryFm.defaultTabs}
          hideTabs={currentFm.hideTabs || categoryFm.hideTabs}
        />
      )}

      <Content />
    </Layout>
  )
}

export function HeadComponents({ pageContext }) {
  const { title, description } = pageContext?.frontmatter?.meta || {}
  return (
    <>
      {title && <title>{title} | Eufemia</title>}
      {description && <meta name="description" content={description} />}
    </>
  )
}
