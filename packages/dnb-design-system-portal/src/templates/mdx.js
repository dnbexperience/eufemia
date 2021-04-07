/**
 * MDX Template
 */

import React from 'react'
import PropTypes from 'prop-types'

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
        mdx: {
          body,
          frontmatter: { title, description, fullscreen, showTabs },
          tableOfContents,
          children
        },
        site: {
          siteMetadata: { title: mainTitle, description: mainDescription }
        }
      }
    } = this.props

    if (location.href && location.href.includes('data-visual-test')) {
      global.IS_TEST = true
      if (typeof window !== 'undefined') {
        window.IS_TEST = true
      }
    }

    const child = children[1] || null
    let pageTitle = title
    let pageDescription =
      description || child?.frontmatter?.description || mainDescription

    // Extend the title with a sub tab title
    if (!pageTitle) {
      if (child && Array.isArray(tableOfContents?.items)) {
        pageTitle = `${child?.frontmatter?.title} – ${tableOfContents.items[0]?.title}`
      } else {
        pageTitle = child?.frontmatter?.title || mainTitle
      }
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
            Boolean(fullscreen) || this.props.pageContext.fullscreen
          }
        >
          {showTabs && (
            <Tabbar
              key="tabbar"
              location={location}
              {...(child?.frontmatter || {})}
              usePath={'/' + (child?.fields?.slug || '')}
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

MdxTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    fullscreen: PropTypes.bool
  }).isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
      frontmatter: PropTypes.object.isRequired,
      tableOfContents: PropTypes.object.isRequired,
      children: PropTypes.array.isRequired
    }).isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
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
      frontmatter {
        title
        description
        fullscreen
        showTabs
      }
      tableOfContents
      body
      children {
        ... on Mdx {
          fields {
            slug
          }
          frontmatter {
            title
            menuTitle
            showTabs
            tabs {
              title
              key
            }
            hideTabs {
              title
            }
          }
        }
      }
    }
  }
`
