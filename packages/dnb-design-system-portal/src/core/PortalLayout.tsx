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
import AutoLinkHeader from '../shared/tags/AutoLinkHeader'
import PortalToc, { PortalTocProvider } from '../shared/parts/PortalToc'
import pageLayoutStyles from './PortalLayout.module.scss'
import { defaultTabsValue } from '../shared/tags/defaultValues'
import { Link } from '../shared/tags/Anchor'
import tags from '../shared/tags'
import Heading, { resetLevels } from '@dnb/eufemia/src/components/Heading'
import { setPortalHeadData, usePortalHead } from './PortalHead'
import { Breadcrumb, Button } from '@dnb/eufemia/src'
import GithubLogo from '../docs/contribute/assets/github-logo'
import { resolveEditSourcePath } from './editSourcePath'
import { getGitHubEditTitle, getGitHubEditUrl } from './githubSource'

const ContentWrapper = TabBar.ContentWrapper

type Frontmatter = {
  title?: string
  /** Overrides `title` for the rendered page heading in the content area. */
  contentTitle?: string
  showTabs?: boolean
  fullscreen?: boolean
  /** Hides the table of contents for the page. */
  hideToc?: boolean
  /** How many heading levels the table of contents should include, counting from the highest level on the page (excluding h1). Default is `2`. */
  tocDepth?: number
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
              contentTitle
              description
              fullscreen
              hideToc
              tocDepth
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
                hideToc
                tocDepth
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
  const pageMdx =
    useMemo(() => {
      return mdxEdges.find(({ node }) => {
        return slug === node.fields.slug
      })
    }, [mdxEdges, slug])?.node || {}

  const { siblings: mdxParents } = pageMdx
  const parentMdx = mdxParents?.[0] as PortalLayoutNode
  const parentFm = parentMdx?.frontmatter || {}
  const pageFm = pageMdx?.frontmatter || {}
  const fmData = Object.entries(parentFm).reduce(
    (acc, [key, value]) => {
      if (acc[key] === undefined) {
        acc[key] = value
      }
      return acc
    },
    { ...pageFm }
  )

  // For tab pages without their own title, construct a title like "ComponentName → TabName"
  const headData = { ...fmData }
  if (!pageFm.title && pageFm.showTabs && parentFm.title) {
    const tabs = fmData.tabs || defaultTabsValue
    const currentTabKey = '/' + slug.split('/').pop()
    const currentTab = tabs.find(({ key }) => key === currentTabKey)
    if (currentTab?.title) {
      headData.title = `${parentFm.title} → ${currentTab.title}`
    }
  }

  // Ensure heading levels are reset before each page renders
  resetLevels(1)

  usePortalHead(headData)

  const tabsFromParent = Boolean(!pageFm.title && pageFm.showTabs)
  const hideToc =
    pageFm.hideToc ?? (tabsFromParent ? parentFm.hideToc : undefined)
  const tocDepth =
    pageFm.tocDepth ?? (tabsFromParent ? parentFm.tocDepth : undefined)

  const rootPath =
    '/' +
    (tabsFromParent ? parentMdx?.fields?.slug : pageMdx?.fields?.slug)
  const fullscreen = Boolean(fmData?.fullscreen) || pageContext?.fullscreen

  const { focusModeCodeId } = useFocusModeCode()
  const codeFocusMode = focusModeCodeId !== null

  const renderTitle = pageFm.contentTitle ?? fmData.title
  const titleNode = renderTitle ? (
    <AutoLinkHeader className="dnb-no-focus" level={1}>
      {renderTitle}
    </AutoLinkHeader>
  ) : undefined

  if (!pageMdx?.frontmatter) {
    return <>{children}</> // looks like it was not a MDX, so we just return children
  }

  const editSourcePath = resolveEditSourcePath(
    pageMdx,
    mdxEdges.map(({ node }) => node)
  )

  // Share frontmatter in pageContext during SSR/SSG
  if (pageContext?.frontmatter) {
    setPortalHeadData(pageContext, headData)
  }

  return (
    <Layout key="layout" location={location} fullscreen={fullscreen}>
      {codeFocusMode ? (
        <Content>{children}</Content>
      ) : (
        <PortalTocProvider>
          <div
            className={`${pageLayoutStyles['content-grid']} ${
              hideToc ? pageLayoutStyles['content-grid--without-toc'] : ''
            }`}
          >
            <div className={pageLayoutStyles['content-grid__header']}>
              {fmData.breadcrumb && (
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

              {pageFm.showTabs ? (
                <TabBar
                  key="tab-bar"
                  location={location}
                  rootPath={rootPath}
                  title={titleNode}
                  tabs={fmData.tabs}
                  defaultTabs={fmData.defaultTabs}
                  hideTabs={fmData.hideTabs}
                />
              ) : (
                titleNode
              )}
            </div>

            {!hideToc && (
              <div className={pageLayoutStyles['content-grid__sidebar']}>
                <PortalToc maxDepth={tocDepth} />
              </div>
            )}

            <div className={pageLayoutStyles['content-grid__content']}>
              <Heading.Level reset={2}>
                <Content sourcePath={editSourcePath} showEditLink>
                  {children}
                </Content>
              </Heading.Level>
            </div>
          </div>
        </PortalTocProvider>
      )}
    </Layout>
  )
}

function Content({ sourcePath = null, showEditLink = false, children }) {
  return (
    <ContentWrapper>
      <MDXProvider components={tags}>{children}</MDXProvider>

      {showEditLink && (
        <Button
          variant="secondary"
          text="Edit on GitHub"
          title={getGitHubEditTitle()}
          icon={GithubLogo}
          iconPosition="left"
          href={getGitHubEditUrl(sourcePath)}
          target="_blank"
          rel="noopener noreferrer"
          top="large"
          bottom="large"
        />
      )}
    </ContentWrapper>
  )
}
