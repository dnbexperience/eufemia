/* eslint-disable react/prop-types */
/**
 * MDX Template
 */

import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'

import Layout from '../shared/parts/Layout'
import { Helmet as Head } from 'react-helmet'
import tags from '../shared/tags'

const Tabbar = tags.Tabbar
const ContentWrapper = Tabbar.ContentWrapper

export default class MdxTemplate extends React.PureComponent {
  render() {
    const {
      location,
      data: {
        mdx,
        site: {
          siteMetadata: { title: mainTitle, description: mainDescription },
        },
      },
    } = this.props

    const { body, tableOfContents, siblings } = mdx

    const makeUseOfCategory = Boolean(
      !mdx?.frontmatter?.title && mdx?.frontmatter?.showTabs
    )
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
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
        </Head>

        <Layout
          key="layout"
          location={location}
          fullscreen={
            Boolean(currentFm.fullscreen || categoryFm.fullscreen) ||
            this.props.pageContext.fullscreen
          }
        >
          {currentFm.showTabs && (
            <Tabbar
              key="tabbar"
              location={location}
              rootPath={
                '/' + (makeUseOfCategory ? category?.slug : mdx?.slug)
              }
              title={currentFm.title || categoryFm.title}
              tabs={currentFm.tabs || categoryFm.tabs}
              defaultTabs={currentFm.defaultTabs || categoryFm.defaultTabs}
              hideTabs={currentFm.hideTabs || categoryFm.hideTabs}
            />
          )}

          <ContentWrapper>
            <MDXProvider components={tags}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
          </ContentWrapper>
        </Layout>
      </>
    )
  }
}

export const pageQuery = graphql`
  query MDXQuery($id: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    mdx(id: { eq: $id }) {
      slug
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
      body
      siblings {
        slug
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
