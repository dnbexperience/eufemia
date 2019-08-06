/**
 * MDX Template
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Head from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql, withPrefix } from 'gatsby'

import Layout from '../shared/parts/Layout'
import tags from '../shared/tags'

export default class MdxTemplate extends PureComponent {
  render() {
    const {
      location,
      data: {
        mdx: {
          body,
          frontmatter: { title, description, fullscreen }
        },
        site: {
          siteMetadata: { description: descriptionFallback }
        }
      }
    } = this.props

    return (
      <MDXProvider components={tags}>
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content={description || descriptionFallback}
          />
          <link rel="shortcut icon" href={withPrefix('/favicon.ico')} />
        </Head>
        <Layout location={location} fullscreen={Boolean(fullscreen)}>
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
      body: PropTypes.string.isRequired
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
      frontmatter {
        title
        description
        fullscreen
      }
      body
    }
  }
`
