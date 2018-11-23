/**
 * Mdx Template
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Head from 'react-helmet'
import Layout from '../shared/parts/Layout'
import { MDXProvider } from '@mdx-js/tag'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { graphql, withPrefix } from 'gatsby'
import inlineTags from '../shared/inlineTags'

export default class MdxTemplate extends PureComponent {
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
      <MDXProvider components={inlineTags}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="shortcut icon" href={withPrefix('/favicon.ico')} />
        </Head>
        <Layout {...this.props} header={header}>
          <MDXRenderer>{code.body}</MDXRenderer>
        </Layout>
      </MDXProvider>
    )
  }
}
MdxTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      code: PropTypes.shape({
        body: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        description
        # repoUrl
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        title
        header
      }
      code {
        body
      }
    }
  }
`
