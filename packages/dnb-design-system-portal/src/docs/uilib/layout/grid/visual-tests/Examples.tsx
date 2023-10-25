import React from 'react'
import { Global, css } from '@emotion/react'
import { useMedia } from '@dnb/eufemia/src/shared'
import { Button, Grid } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'

/**
 * NB: We want a total with of 272+24+1136=1432
 * Ideally all 15 columns should have 80px in max-width.
 * But that requres much more code to achieve.
 * This solution makes a compormize on that.
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
          const Wrapper = styled.div`
            .pageContainer {
              --sidebar-width: 17rem;
              --page-container-gap: 1.5rem;
              --page-width: var(--layout-large);

              max-width: calc(
                var(--sidebar-width) + var(--page-container-gap) +
                  var(--page-width)
              );

              margin: auto;

              background-color: var(--color-lavender);
              box-shadow: 0 0 0 1px black;
            }

            .sidebarContent {
              background-color: var(--color-sand-yellow);
            }

            .pageContent {
            }

            .columnItem {
              display: grid;
              place-content: center;

              html:not([data-visual-test]) & {
                min-height: 70vh;
              }

              text-align: center;
            }
          `

          function PageLayout() {
            const { isSmall, isMedium, isLarge } = useMedia()

            const { minimizedSidebar, Toggle } = useMinimizeSidebar()
            const showSidebar = !isMedium
            const sidebarColumns = isSmall ? 0 : minimizedSidebar ? 1 : 3
            const pageColumns = isSmall
              ? 4
              : isMedium
              ? 6
              : isLarge
              ? 12
              : 0

            return (
              <Wrapper>
                <Grid.Container
                  className="pageContainer"
                  columns={pageColumns + sidebarColumns}
                  columnGap="medium"
                >
                  {showSidebar && (
                    <Grid.Item span={[1, sidebarColumns]}>
                      <SidebarContent
                        columns={sidebarColumns}
                        Toggle={Toggle}
                      />
                    </Grid.Item>
                  )}

                  <Grid.Item
                    span={[showSidebar ? sidebarColumns + 1 : 1, 'end']}
                  >
                    <PageContent columns={pageColumns} />
                  </Grid.Item>
                </Grid.Container>
              </Wrapper>
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

          function SidebarContent({ columns, Toggle }) {
            const content = useColumns({ columns, color: colors[1] })

            return (
              columns > 0 && (
                <Grid.Container
                  className="sidebarContent"
                  columnGap
                  columns={columns}
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
