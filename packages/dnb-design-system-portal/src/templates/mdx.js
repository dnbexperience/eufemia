/**
 * MDX Template
 */

import React from 'react'
import PropTypes from 'prop-types'

import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'

import Layout from '../shared/parts/Layout'
import Head from 'react-helmet'
import tags from '../shared/tags'

export default function MdxTemplate(props) {
  const {
    location,
    data: {
      mdx: {
        body,
        frontmatter: { title, description, fullscreen, showTabs },
        fields
      },
      site: {
        siteMetadata: {
          title: fallbackTitle,
          description: fallbackDescription
        }
      }
    }
  } = props

  const Tabbar = tags.Tabbar

  return (
    <MDXProvider components={tags}>
      <Head>
        <title>{title || fallbackTitle}</title>
        <meta
          name="description"
          content={
            description || fields.motherDescription || fallbackDescription
          }
        />
      </Head>
      <Layout location={location} fullscreen={Boolean(fullscreen)}>
        {showTabs && <Tabbar location={location} {...fields} />}
        <MDXRenderer {...fields}>{body}</MDXRenderer>
      </Layout>
    </MDXProvider>
  )
}
MdxTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
      frontmatter: PropTypes.object.isRequired,
      fields: PropTypes.object.isRequired
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
      fields {
        slug
        motherTitle
        motherDescription
        motherPath
        motherTabs {
          title
          key
        }
        motherTabsHide {
          title
        }
      }
      frontmatter {
        title
        description
        fullscreen
        showTabs
      }
      body
    }
  }
`
