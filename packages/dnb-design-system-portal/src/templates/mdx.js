/**
 * MDX Template
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'

import Layout from '../shared/parts/Layout'
import Head from 'react-helmet'
import tags from '../shared/tags'

const Tabbar = tags.Tabbar

export default class MdxTemplate extends PureComponent {
  render() {
    const {
      location,
      data: {
        mdx: {
          body,
          frontmatter: { title, description, fullscreen, showTabs },
          children
        },
        site: {
          siteMetadata: {
            title: fallbackTitle,
            description: fallbackDescription
          }
        }
      }
    } = this.props

    const child = children[1] || {}

    return (
      <MDXProvider components={tags}>
        <Head>
          <title>{title || fallbackTitle}</title>
          <meta
            name="description"
            content={
              description ||
              (child.frontmatter && child.frontmatter.description) ||
              fallbackDescription
            }
          />
        </Head>
        <Layout location={location} fullscreen={Boolean(fullscreen)}>
          {showTabs && (
            <Tabbar
              location={location}
              {...(child.frontmatter || {})}
              usePath={'/' + (child.fields && child.fields.slug)}
            />
          )}
          <MDXRenderer>{body}</MDXRenderer>
        </Layout>
      </MDXProvider>
    )
  }
}

MdxTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
      frontmatter: PropTypes.object.isRequired,
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
        description
      }
    }
    mdx(id: { eq: $id }) {
      # fields {
      #   slug
      # }
      frontmatter {
        title
        description
        fullscreen
        showTabs
      }
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
