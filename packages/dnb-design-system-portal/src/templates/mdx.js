/**
 * Mdx Template
 */

import React, { Component } from 'react'

import Head from 'react-helmet'
import Layout from '../shared/parts/Layout'
// import { MDXProvider } from '@mdx-js/tag'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { graphql, withPrefix } from 'gatsby'
import inlineTags from '../shared/inlineTags'

export default class MdxTemplate extends Component {
  render() {
    const {
      data: {
        mdx: {
          code,
          fields: { header, title }
        },
        site: {
          siteMetadata: {
            description
            // repoUrl
          }
        }
      }
    } = this.props

    return (
      // <MDXProvider components={inlineTags}>
      // </MDXProvider>
      <Layout {...this.props} header={header}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="shortcut icon" href={withPrefix('/favicon.ico')} />
        </Head>
        <MDXRenderer components={inlineTags}>{code.body}</MDXRenderer>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      # pathPrefix
      siteMetadata {
        # repoUrl
        description
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        # id
        title
        header
      }
      code {
        body
      }
      # tableOfContents(pathToSlugField: "frontmatter.path")
      # tableOfContents
      # parent {
      #   ... on File {
      #     relativePath
      #   }
      # }
    }
  }
`
