/* eslint-disable react/prop-types */
/**
 * MDX Template
 */

import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx' // deprecated, remove in MDX v2
import { graphql } from 'gatsby'
import Tabbar from '../shared/tags/Tabbar'
import Layout from '../shared/parts/Layout'
import tags from '../shared/tags'

const ContentWrapper = Tabbar.ContentWrapper

export default function MdxTemplate(props) {
  const {
    pageContext,
    location,
    data: { mdx },
    // children, // used in MDX v2 instead of body
  } = props

  const { body, siblings } = mdx

  const makeUseOfCategory = Boolean(
    !mdx?.frontmatter?.title && mdx?.frontmatter?.showTabs
  )
  const category = siblings?.[0]
  const categoryFm = category?.frontmatter || {}
  const currentFm = mdx?.frontmatter || {}

  return (
    <Layout
      key="layout"
      location={location}
      fullscreen={
        Boolean(currentFm.fullscreen || categoryFm.fullscreen) ||
        pageContext.fullscreen
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

      <ContentWrapper>
        {/* (deprecated) MDX v1 */}
        <MDXProvider components={tags}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>

        {/* MDX V2 */}
        {/* <MDXProvider components={tags}>{children}</MDXProvider> */}
      </ContentWrapper>
    </Layout>
  )
}

export const Head = ({
  data: {
    site: {
      siteMetadata: { title: mainTitle, description: mainDescription },
    },
    mdx,
  },
}) => {
  const { tableOfContents, siblings } = mdx

  const category = siblings?.[0]
  const categoryFm = category?.frontmatter || {}
  const currentFm = mdx?.frontmatter || {}

  const pageDescription = currentFm?.description || mainDescription
  let pageTitle

  // Extend the title with a sub tab title
  if (currentFm?.title && Array.isArray(tableOfContents?.items?.[0])) {
    pageTitle = `${currentFm.title || categoryFm?.title} – ${
      tableOfContents.items[0]?.title
    }`
  } else {
    pageTitle = currentFm?.title || categoryFm?.title || mainTitle
  }

  return (
    <>
      <title>{pageTitle} | Eufemia</title>
      <meta name="description" content={pageDescription} />
    </>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    mdx(id: { eq: $id }) {
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
      tableOfContents
      body # deprecated (remove in MDX v2)
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
`
