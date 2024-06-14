import React from 'react'
import { Global, css } from '@emotion/react'
import { useMedia } from '@dnb/eufemia/src/shared'
import { Button, Grid } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'

/**
 * NB: We want a total with of 272+24+1136=1432
 * Ideally all 15 columns should have 80px in max-width.
 * But that requires much more code to achieve.
 * This solution makes a compromise on that.
 *
 * The reason is that;
 * when we use a gap of 24 between the sidebar and the page content,
 * we can't distribute the widths evenly anymore.
 * The sidebar columns are a little bit smaller,
 * than the page content columns.
 */

export function PageLayoutExample() {
  return (
    <>
      <Global
        styles={css`
          /** Reset global styles */
          #dnb-app-content,
          .dnb-app-content.fullscreen-page {
            padding: 0;
          }
          .example-box {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        `}
      />

      <ComponentBox hideCode scope={{ useMedia }}>
        {() => {
          function PageLayout() {
            const { isSmall, isMedium, isLarge } = useMedia()

            const { minimizedSidebar, Toggle } = useMinimizeSidebar()
            const renderWideSidebar = !isMedium
            const sidebarColumns = isSmall ? 0 : minimizedSidebar ? 1 : 3
            const pageColumns = isSmall
              ? 4
              : isMedium
              ? 6
              : isLarge
              ? 12
              : 0

            return (
              <PageContainerWithStyles>
                {renderWideSidebar && (
                  <SidebarContent
                    columns={sidebarColumns}
                    Toggle={Toggle}
                  />
                )}

                <Grid.Container
                  className="pageContainer"
                  columns={pageColumns}
                  columnGap="medium"
                >
                  <Grid.Item span={[1, 'end']}>
                    <PageContent columns={pageColumns} />
                  </Grid.Item>
                </Grid.Container>
              </PageContainerWithStyles>
            )
          }

          function SidebarContent({ columns, Toggle }) {
            const content = useColumns({ columns, color: colors[1] })

            return (
              columns > 0 && (
                <Grid.Container
                  className="sidebarContent"
                  data-columns={columns}
                  columnGap
                  columns={columns}
                  element="aside"
                  aria-label="Main Menu"
                >
                  {content}

                  <Grid.Item
                    span="full"
                    style={{
                      display: 'grid',
                      placeContent: 'center',
                    }}
                  >
                    <Toggle />
                  </Grid.Item>
                </Grid.Container>
              )
            )
          }

          function PageContent({ columns }) {
            const content = useColumns({
              columns,
              color: colors[0],
            })
            return (
              <Grid.Container
                className="pageContent"
                columns={columns}
                columnGap
              >
                {content}
              </Grid.Container>
            )
          }

          function useColumns({ columns, color }) {
            const content = [...Array(columns)].map((_, i) => {
              const nr = i + 1
              return (
                <Grid.Item
                  className="columnItem"
                  key={i}
                  span={[nr, nr]}
                  style={color}
                >
                  {nr}
                </Grid.Item>
              )
            })

            return content
          }

          function useMinimizeSidebar() {
            const [minimizedSidebar, setMinimize] = React.useState(false)
            const clickHandler = () => {
              setMinimize((s) => !s)
            }

            return {
              minimizedSidebar,
              Toggle: () => (
                <Button
                  icon={minimizedSidebar ? 'arrow_right' : 'arrow_left'}
                  space="x-small"
                  variant="secondary"
                  on_click={clickHandler}
                />
              ),
            }
          }

          const PageContainerWithStyles = styled.div`
            --sidebar-width: 17rem;
            --page-container-gap: var(--spacing-medium);
            --page-width: var(--layout-large);

            // horizontal layout
            display: flex;

            // the gap between the sidebar and the page content
            column-gap: var(--page-container-gap);

            // center everything
            margin: auto;

            // max page width
            max-width: calc(
              var(--sidebar-width) + var(--page-container-gap) +
                var(--page-width)
            );

            .sidebarContent {
              --width: var(--sidebar-width);
              &[data-columns='1'] {
                --width: calc(var(--sidebar-width) / 3);
              }

              width: var(--width);
            }

            .pageContainer {
              flex-grow: 1;
            }

            .pageContent {
            }

            // for demo purposes
            background-color: var(--color-lavender);
            box-shadow: 0 0 0 1px black;

            .columnItem {
              display: grid;
              place-content: center;

              html:not([data-visual-test]) & {
                min-height: 70vh;
              }

              text-align: center;
            }

            .sidebarContent {
              transition: width 400ms var(--easing-default);
              background-color: var(--color-sand-yellow);
            }
          `

          const colors = [
            { background: 'var(--color-sea-green-30)' },
            { background: 'var(--color-mint-green-50)' },
          ]

          return <PageLayout />
        }}
      </ComponentBox>
    </>
  )
}
