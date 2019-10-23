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
          siteMetadata: {
            title: fallbackTitle,
            description: fallbackDescription
          }
        }
      }
    } = this.props

    return (
      <MDXProvider components={tags}>
        <Head>
          <title>{title || fallbackTitle}</title>
          <meta
            name="description"
            content={description || fallbackDescription}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={withPrefix('/apple-touch-icon.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={withPrefix('/favicon-32x32.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={withPrefix('/favicon-16x16.png')}
          />
          <link
            rel="mask-icon"
            href={withPrefix('/safari-pinned-tab.svg')}
            color="#007272"
          />
          <meta name="msapplication-TileColor" content="#007272" />
          <meta name="theme-color" content="#007272" />
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
      body: PropTypes.string.isRequired,
      frontmatter: PropTypes.object.isRequired
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
      frontmatter {
        title
        description
        fullscreen
      }
      body
    }
  }
`
