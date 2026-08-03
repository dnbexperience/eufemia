/**
 * MDX Template
 */

import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { useFocusModeCode } from './FocusModeCodeContext'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'portal-query'
import Layout from '../shared/parts/Layout'
import TabBar from '../shared/tags/TabBar'
import { defaultTabsValue } from '../shared/tags/defaultValues'
import { Link } from '../shared/tags/Anchor'
import tags from '../shared/tags'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import { setPortalHeadData, usePortalHead } from './PortalHead'
import { Breadcrumb, Button } from '@dnb/eufemia/src'
import GithubLogo from '../docs/contribute/assets/github-logo'
import { resolveEditSourcePath } from './editSourcePath'

const ContentWrapper = TabBar.ContentWrapper

type Frontmatter = {
  title?: string
  showTabs?: boolean
  fullscreen?: boolean
}
type Fields = {
  slug: string
  sourcePath: string
}
type PortalLayoutNode = {
  frontmatter: Frontmatter
  fields: Fields
}
export type PortalLayoutProps = {
  location: Location
  pageContext: { frontmatter: Frontmatter; fullscreen?: boolean }
  children: ReactNode
}

export default function PortalLayout(props: PortalLayoutProps) {
  const { pageContext, location, children } = props

  const data = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
              sourcePath
            }
            frontmatter {
              title
              description
              fullscreen
              showTabs
              breadcrumb {
                text
                href
              }
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
                hideInMenu
                title
                description
                fullscreen
                showTabs
                breadcrumb {
                  text
                  href
                }
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
  const mdxEdges = data.allMdx.edges
  const mdx =
    useMemo(() => {
      return mdxEdges.find(({ node }) => {
        return slug === node.fields.slug
      })
    }, [mdxEdges, slug])?.node || {}

  const { siblings } = mdx
  const category = siblings?.[0] as PortalLayoutNode
  const categoryFm = category?.frontmatter || {}
  const currentFm = mdx?.frontmatter || {}
  const fmData = Object.entries(categoryFm).reduce(
    (acc, [key, value]) => {
      if (!acc[key]) {
        acc[key] = value
      }
      return acc
    },
    { ...currentFm }
  )

  // For tab pages without their own title, construct a title like "ComponentName → TabName"
  const headData = { ...fmData }
  if (!currentFm.title && currentFm.showTabs && categoryFm.title) {
    const tabs = fmData.tabs || defaultTabsValue
    const currentTabKey = '/' + slug.split('/').pop()
    const currentTab = tabs.find(({ key }) => key === currentTabKey)
    if (currentTab?.title) {
      headData.title = `${categoryFm.title} → ${currentTab.title}`
    }
  }

  // Ensure heading levels are reset before each page renders
  resetLevels(1)

  usePortalHead(headData)

  const makeUseOfCategory = Boolean(
    !mdx?.frontmatter?.title && mdx?.frontmatter?.showTabs
  )
  const rootPath =
    '/' + (makeUseOfCategory ? category?.fields?.slug : mdx?.fields?.slug)
  const fullscreen = Boolean(fmData?.fullscreen) || pageContext?.fullscreen

  const { focusModeCodeId } = useFocusModeCode()
  const codeFocusMode = focusModeCodeId !== null

  if (!mdx?.frontmatter) {
    return <>{children}</> // looks like it was not a MDX, so we just return children
  }

  const editSourcePath = resolveEditSourcePath(
    mdx,
    mdxEdges.map(({ node }) => node)
  )

  // Share frontmatter in pageContext during SSR/SSG
  if (pageContext?.frontmatter) {
    setPortalHeadData(pageContext, headData)
  }

  return (
    <Layout key="layout" location={location} fullscreen={fullscreen}>
      {!codeFocusMode && fmData.breadcrumb && (
        <Breadcrumb key="breadcrumb" top="large">
          {fmData.breadcrumb.map((item, i, a) => {
            return (
              <Breadcrumb.Item
                key={item.text}
                variant={
                  (i === 0 && 'home') ||
                  (i === a.length - 1 && 'current') ||
                  null
                }
                // @ts-expect-error -- strictFunctionTypes
                element={Link}
                text={item.text}
                href={item.href}
              />
            )
          })}
        </Breadcrumb>
      )}

      {!codeFocusMode && currentFm.showTabs && (
        <TabBar
          key="tab-bar"
          location={location}
          rootPath={rootPath}
          title={fmData.title}
          tabs={fmData.tabs}
          defaultTabs={fmData.defaultTabs}
          hideTabs={fmData.hideTabs}
        />
      )}

      <Content
        showTabs={currentFm.showTabs}
        sourcePath={editSourcePath}
        showEditLink={!codeFocusMode}
      >
        {children}
      </Content>
    </Layout>
  )
}

function Content({ showTabs, sourcePath, showEditLink, children }) {
  if (showTabs) {
    resetLevels(2)
  }

  return (
    <ContentWrapper>
      <MDXProvider components={tags}>{children}</MDXProvider>

      {showEditLink && (
        <Button
          variant="secondary"
          text="Edit on GitHub"
          icon={GithubLogo}
          iconPosition="left"
          href={`https://github.com/dnbexperience/eufemia/edit/main/${sourcePath}`}
          target="_blank"
          rel="noopener noreferrer"
          top="large"
          bottom="large"
        />
      )}
    </ContentWrapper>
  )
}
