/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { H2, P, Dl, Dt, Dd, Code, Anchor } from '@dnb/eufemia/src/elements'
import { copy as copyIcon } from '@dnb/eufemia/src/icons'
import {
  Button,
  Pagination,
  Checkbox,
  Input,
  Section,
} from '@dnb/eufemia/src/components'
import { useCopyWithNotice } from '@dnb/eufemia/src/components/number-format/NumberUtils'
import Table from '@dnb/eufemia/src/components/table/Table'
import Th from '@dnb/eufemia/src/components/table/TableTh'
import Td from '@dnb/eufemia/src/components/table/TableTd'
import Tr from '@dnb/eufemia/src/components/table/TableTr'
import TableContainer from '@dnb/eufemia/src/components/table/TableContainer'
import useHandleSortState from '@dnb/eufemia/src/components/table/useHandleSortState'

export const TableVariantBasic = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-default"
    scope={{ useHandleSortState }}
  >
    {() => {
      const BasicTable = () => {
        const { sortState, sortHandler } = useHandleSortState({
          column1: { direction: 'asc', active: true },
          column2: { direction: 'desc', modes: ['asc', 'desc'] },
        })

        // Handle your "column1" logic
        React.useEffect(() => {
          switch (sortState.column1.direction) {
            case 'asc':
              break

            case 'desc':
              break

            default:
            case 'off':
              break
          }
        }, [sortState.column1.direction])

        return (
          <Table.ScrollView>
            <Table>
              <caption className="dnb-sr-only">A Table Caption</caption>
              <thead>
                <Tr>
                  <Th>Column</Th>
                  <Th>
                    <Th.Horizontal>
                      Help Button
                      <Th.HelpButton>Help Content</Th.HelpButton>
                    </Th.Horizontal>
                  </Th>
                  <Th
                    sortable
                    active={sortState.column1.active}
                    reversed={sortState.column1.reversed}
                  >
                    <Th.SortButton
                      text="Sortable Active"
                      title="Sort table column"
                      on_click={sortHandler.column1}
                    />
                  </Th>
                  <Th
                    sortable
                    active={sortState.column2.active}
                    reversed={sortState.column2.reversed}
                    align="right"
                  >
                    <Th.SortButton
                      text="Sortable"
                      title="Sort table column"
                      on_click={sortHandler.column2}
                    />
                  </Th>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                  <Td align="right">Row 1</Td>
                </Tr>
                <Tr>
                  <Td>Row 2</Td>
                  <Td>Row 2</Td>
                  <Td>Row 2</Td>
                  <Td align="right">Row 2</Td>
                </Tr>
                <Tr>
                  <Td>
                    <P>Row 3 with paragraph</P>
                  </Td>
                  <Td>
                    Row 3 with <Code>code</Code>
                  </Td>
                  <Td>
                    <P>
                      Row 3 with <b>medium paragraph</b>
                    </P>
                  </Td>
                  <Td align="right">
                    Row 3 with <b>medium text</b>
                  </Td>
                </Tr>
              </tbody>
            </Table>
          </Table.ScrollView>
        )
      }

      return <BasicTable />
    }}
  </ComponentBox>
)

export const TableSizeMedium = () => (
  <ComponentBox hideCode data-visual-test="table-size-medium">
    <Table.ScrollView>
      <Table size="medium">
        <caption className="dnb-sr-only">A Table Caption</caption>
        <thead>
          <Tr>
            <Th>Column</Th>
            <Th sortable>
              <Th.SortButton text="Sortable" title="Sort table column" />
            </Th>
            <Th align="right">Column</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td align="right">Row 1</Td>
          </Tr>
          <Tr>
            <Td>
              <P>Row 2 with paragraph</P>
            </Td>
            <Td>
              <P>
                Row 2 with <b>medium paragraph</b>
              </P>
            </Td>
            <Td align="right">
              Row 2 with <b>medium text</b>
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const TableSizeSmall = () => (
  <ComponentBox hideCode data-visual-test="table-size-small">
    <Table.ScrollView>
      <Table size="small">
        <caption className="dnb-sr-only">A Table Caption</caption>
        <thead>
          <Tr>
            <Th>Column</Th>
            <Th sortable>
              <Th.SortButton text="Sortable" title="Sort table column" />
            </Th>
            <Th align="right">Column</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td align="right">Row 1</Td>
          </Tr>
          <Tr>
            <Td>
              <P>Row 2 with paragraph</P>
            </Td>
            <Td>
              <P>
                Row 2 with <b>medium paragraph</b>
              </P>
            </Td>
            <Td align="right">
              Row 2 with <b>medium text</b>
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const TableVariantComplex = () => (
  <ComponentBox hideCode data-visual-test="table-complex">
    <Table.ScrollView>
      <Table border outline>
        <caption>A Table Caption</caption>
        <thead>
          <Tr noWrap>
            <Th></Th>
            <Th>
              Column 2<br />
              newline
            </Th>
            <Th colSpan={2}>Column 3 that spans</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr variant="even">
            <Th scope="row">Row 1 Header</Th>
            <Td rowSpan={2}>Row 1 that spans</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
          </Tr>
          <Tr variant="even">
            <Th scope="row">Row 2 Header</Th>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
          </Tr>
          <Tr>
            <Th scope="row">
              Row 3 Header <br />
              newline
            </Th>
            <Td>Row 3</Td>
            <Td spacing="horizontal">
              <Button variant="secondary">Button</Button>
            </Td>
            <Td noSpacing align="right">
              <Code>noSpacing + align="right"</Code>
            </Td>
          </Tr>
          <Tr>
            <Th scope="row">Row 4 Header</Th>
            <Td>Row 4</Td>
            <Td colSpan={2}>Row 4</Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const TableVariantFixed = () => (
  <ComponentBox hideCode data-visual-test="table-fixed">
    {() => {
      const FixedTable = styled(Table)`
        min-width: 70rem;

        /* Define the width of the THs so they are aligned accross tables */
        thead {
          th:nth-of-type(1) {
            width: 30%;
          }
          th:nth-of-type(2) {
            width: 20%;
          }
          th:nth-of-type(3) {
            width: 10%;
          }
          th:nth-of-type(4) {
            width: 10%;
          }
          th:nth-of-type(5) {
            width: 5%;
          }
          th:nth-of-type(6) {
            width: 5%;
          }
          th:nth-of-type(7) {
            width: 5%;
          }
          th:nth-of-type(8) {
            width: 5%;
          }
        }
      `
      return (
        <Table.ScrollView>
          <FixedTable fixed>
            <caption className="dnb-sr-only">A Table Caption</caption>
            <thead>
              <Tr noWrap>
                <Th>Column 1</Th>
                <Th>Column 2</Th>
                <Th>Column 3</Th>
                <Th>Column 4</Th>
                <Th>Column 5</Th>
                <Th>Column 6</Th>
                <Th>Column 7</Th>
                <Th align="right">Column 8</Th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td align="right">Row 1</Td>
              </Tr>
              <Tr>
                <Td>Row 2</Td>
                <Td>Row 2</Td>
                <Td>Row 2</Td>
                <Td>Row 2</Td>
                <Td>Row 2</Td>
                <Td>Row 2</Td>
                <Td>Row 2</Td>
                <Td align="right">Row 2</Td>
              </Tr>
              <Tr>
                <Td>Row 3</Td>
                <Td>Row 3</Td>
                <Td>Row 3</Td>
                <Td>Row 3</Td>
                <Td>Row 3</Td>
                <Td>Row 3</Td>
                <Td>Row 3</Td>
                <Td align="right">Row 3</Td>
              </Tr>
              <Tr>
                <Td>Row 4</Td>
                <Td>Row 4</Td>
                <Td>Row 4</Td>
                <Td>Row 4</Td>
                <Td>Row 4</Td>
                <Td>Row 4</Td>
                <Td>Row 4</Td>
                <Td align="right">Row 4</Td>
              </Tr>
            </tbody>
          </FixedTable>
        </Table.ScrollView>
      )
    }}
  </ComponentBox>
)

export const TableStackedContainer = () => {
  const isFullscreen = /data-visual-test|fullscreen/.test(
    globalThis?.location?.href
  )
  return (
    <ComponentBox
      hideCode
      data-visual-test="table-container"
      scope={{ TableContainer, isFullscreen }}
    >
      {() => {
        const StyledContainer = styled(TableContainer)`
          /* 
            Define the width of the THs so they are aligned accross tables.
            A "fixed" table width is needed in order to align all tables to act with the same column widths.
          */
          &,
          .dnb-table__scroll-view {
            max-width: 70rem;
          }
          .dnb-table__container__body {
            min-width: 800px;
          }
          table {
            thead {
              th:nth-of-type(1) {
                width: 30%;
              }
              th:nth-of-type(2) {
                width: 30%;
              }
              th:nth-of-type(3) {
                width: 20%;
              }
              th:nth-of-type(4) {
                width: 20%;
              }
            }
          }
        `
        return (
          <StyledContainer
            aria-label="I contain two tables"
            bottom="large"
          >
            <TableContainer.Head>
              <H2>Header</H2>
              <P top>Text</P>
            </TableContainer.Head>

            <TableContainer.Body>
              <Table
                fixed
                border
                sticky
                stickyOffset={isFullscreen ? 0 : '3.5rem'}
              >
                <caption className="dnb-sr-only">Table One</caption>
                <thead>
                  <Tr noWrap>
                    <Th>
                      I have a superscript{' '}
                      <sup>
                        <Anchor href="#unique-ref-id">1</Anchor>
                      </sup>
                    </Th>
                    <Th>Column 2</Th>
                    <Th>Column 3</Th>
                    <Th>Column 4</Th>
                  </Tr>
                </thead>
                <tbody>
                  <Tr>
                    <Td>Row 1</Td>
                    <Td>Row 1</Td>
                    <Td>Row 1</Td>
                    <Td>Row 1</Td>
                  </Tr>
                  <Tr>
                    <Td>Row 2</Td>
                    <Td>Row 2</Td>
                    <Td>Row 2</Td>
                    <Td>Row 2</Td>
                  </Tr>
                </tbody>
              </Table>

              <Table
                fixed
                border
                sticky
                stickyOffset={isFullscreen ? 0 : '3.5rem'}
              >
                <caption className="dnb-sr-only">Table Two</caption>
                <thead>
                  <Tr noWrap>
                    <Th>Column 1</Th>
                    <Th>Column 2</Th>
                    <Th>Column 3</Th>
                    <Th>Column 4</Th>
                  </Tr>
                </thead>
                <tbody>
                  <Tr>
                    <Td>Row 1</Td>
                    <Td>Row 1</Td>
                    <Td>Row 1</Td>
                    <Td>Row 1</Td>
                  </Tr>
                  <Tr>
                    <Td>Row 2</Td>
                    <Td>Row 2</Td>
                    <Td>Row 2</Td>
                    <Td>Row 2</Td>
                  </Tr>
                </tbody>
              </Table>
            </TableContainer.Body>

            <TableContainer.Foot>
              <P id="unique-ref-id">Footer</P>
            </TableContainer.Foot>
          </StyledContainer>
        )
      }}
    </ComponentBox>
  )
}

export const TableClassHelpers = () => (
  <ComponentBox hideCode data-visual-test="table-classes">
    <Table.ScrollView>
      <table className="dnb-table">
        <thead>
          <tr className="dnb-table__tr">
            <th className="dnb-table__th">.dnb-table__th</th>
            <th className="dnb-table__th dnb-table--sortable dnb-table--reversed">
              <Th.SortButton
                text="dnb-table--reversed"
                title="dnb-table__th dnb-table--sortable dnb-table--reversed"
              />
            </th>
            <th className="dnb-table__th dnb-table--sortable dnb-table--active">
              <Th.SortButton
                text="dnb-table--active"
                title="dnb-table__th dnb-table--sortable dnb-table--active"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="dnb-table__tr dnb-table__tr--even">
            <td colSpan={3} className="dnb-table__td">
              .dnb-table__tr--even{' > '}.dnb-table__td
            </td>
          </tr>
          <tr className="dnb-table__tr dnb-table__tr--odd">
            <td colSpan={3} className="dnb-table__td">
              .dnb-table__tr--odd{' > '}.dnb-table__td
            </td>
          </tr>
        </tbody>
      </table>
    </Table.ScrollView>
  </ComponentBox>
)

export const TableLongHeader = () => (
  <ComponentBox hideCode data-visual-test="table-header">
    <Table.ScrollView>
      <Table>
        <caption className="dnb-sr-only">A Table Caption</caption>
        <thead>
          <Tr>
            <Th colSpan={2}>
              Static long header senectus ornare convallis ut at erat
              imperdiet commodo
            </Th>
            <Th sortable reversed>
              <Th.SortButton
                text="Sortable long header ridiculus laoreet turpis netus at vitae"
                title="Sort table column"
              />
            </Th>
            <Th align="right" sortable active>
              <Th.SortButton
                text="Active and right aligned long header ridiculus laoreet turpis netus at vitae"
                title="Sort table column"
              />
            </Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td colSpan={4}>
              <P>col span of 4</P>
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const TableAccordion = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-accordion"
    scope={{ copyIcon, useCopyWithNotice }}
  >
    {() => {
      const AccordionTable = ({ id, showCheckbox = false, ...props }) => {
        const TdCheckbox = () => {
          return <Checkbox label="Select row" label_sr_only />
        }
        const TdInput = () => {
          return <Input label="Label" label_sr_only size={4} />
        }
        const Content = ({ shareId }) => {
          const ref = React.useRef()
          const { copy } = useCopyWithNotice()

          const shareHandler = () => {
            const url = new URL(location.href)
            url.hash = '#' + shareId
            copy(url.toString(), ref.current)
          }

          return (
            <>
              <Button icon="bell" variant="secondary">
                Ring the bell
              </Button>

              <Section top spacing>
                <Dl>
                  <Dt>Favorittfarge</Dt>
                  <Dd>Grønn</Dd>
                  <Dt>Favorittmat</Dt>
                  <Dd>Taco</Dd>
                </Dl>
              </Section>

              <Button
                top
                variant="tertiary"
                icon={copyIcon}
                icon_position="left"
                on_click={shareHandler}
                inner_ref={ref}
              >
                Copy link to this row
              </Button>
            </>
          )
        }

        const Row = ({ nr }) => {
          const shareId = id + '-' + nr
          return (
            <Tr id={shareId}>
              <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + nr}</Td>
              <Td>Row {nr}</Td>
              <Td spacing="horizontal">
                <TdInput />
              </Td>
              <Td align="right">Row {nr}</Td>

              <Td.AccordionContent>
                <Content shareId={shareId} />
              </Td.AccordionContent>
            </Tr>
          )
        }

        return (
          <Table accordion id={id} {...props}>
            <caption className="dnb-sr-only">A Table Caption</caption>

            <thead>
              <Tr>
                <Th>Column A</Th>
                <Th>Column B</Th>
                <Th>Column C</Th>
                <Th align="right">Column D</Th>
              </Tr>
            </thead>

            <tbody>
              <Row nr="1" />
              <Row nr="2" />
              <Row nr="3" />
            </tbody>
          </Table>
        )
      }

      return (
        <>
          <Table.ScrollView>
            <AccordionTable
              id="table-1"
              showCheckbox
              accordionChevronPlacement="end"
            />
          </Table.ScrollView>

          <Table.ScrollView top>
            <AccordionTable id="table-2" border outline />
          </Table.ScrollView>
        </>
      )
    }}
  </ComponentBox>
)

export const TableSticky = () => {
  const isFullscreen = /data-visual-test|fullscreen/.test(
    globalThis?.location?.href
  )
  const isVisualTest = globalThis.IS_TEST
  return (
    <ComponentBox hideCode scope={{ isFullscreen, isVisualTest }}>
      <Table.ScrollView>
        <Table
          sticky={isVisualTest ? 'css-position' : true}
          stickyOffset={isFullscreen ? 0 : '3.5rem'}
        >
          <caption className="dnb-sr-only">A Table Caption</caption>
          <thead>
            <Tr>
              <Th colSpan={2}>Header</Th>
              <Th sortable reversed>
                <Th.SortButton text="Sortable" title="Sort table column" />
              </Th>
              <Th sortable active>
                <Th.SortButton text="Active" title="Sort table column" />
              </Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>
                <P>
                  Row 1 <b>with p</b>
                </P>
              </Td>
              <Td>
                <Code>Row 1 with code</Code>
              </Td>
              <Td>
                <span>Row 1 with span</span>
              </Td>
              <Td>Row 1</Td>
            </Tr>
            <Tr>
              <Td colSpan={2}>Column which spans over two columns</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 3</Td>
              <Td>Row 3</Td>
              <Td>Row 3</Td>
              <Td>Row 3</Td>
            </Tr>
          </tbody>
          <tfoot>
            <Tr>
              <Td colSpan={3}>Footer</Td>
              <Td>Sum</Td>
            </Tr>
          </tfoot>
        </Table>
      </Table.ScrollView>
    </ComponentBox>
  )
}

export const TableStickyMaxHeight = () => {
  return (
    <ComponentBox hideCode data-visual-test="table-sticky">
      <Table.ScrollView style={{ maxHeight: '18rem' }}>
        <Table sticky="css-position">
          <thead>
            <Tr>
              <Th>Column 1</Th>
              <Th>Column 2</Th>
              <Th>Column 3</Th>
              <Th>Column 4</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>Row 1</Td>
              <Td>Row 1</Td>
              <Td>Row 1</Td>
              <Td>Row 1</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 3</Td>
              <Td>Row 3</Td>
              <Td>Row 3</Td>
              <Td>Row 3</Td>
            </Tr>
            <Tr>
              <Td>Row 4</Td>
              <Td>Row 4</Td>
              <Td>Row 4</Td>
              <Td>Row 4</Td>
            </Tr>
            <Tr>
              <Td>Row 5</Td>
              <Td>Row 5</Td>
              <Td>Row 5</Td>
              <Td>Row 5</Td>
            </Tr>
            <Tr>
              <Td>Row 6</Td>
              <Td>Row 6</Td>
              <Td>Row 6</Td>
              <Td>Row 6</Td>
            </Tr>
            <Tr>
              <Td>Row 7</Td>
              <Td>Row 7</Td>
              <Td>Row 7</Td>
              <Td>Row 7</Td>
            </Tr>
            <Tr>
              <Td>Row 8</Td>
              <Td>Row 8</Td>
              <Td>Row 8</Td>
              <Td>Row 8</Td>
            </Tr>
            <Tr>
              <Td>Row 9</Td>
              <Td>Row 9</Td>
              <Td>Row 9</Td>
              <Td>Row 9</Td>
            </Tr>
            <Tr>
              <Td>Row 10</Td>
              <Td>Row 10</Td>
              <Td>Row 10</Td>
              <Td>Row 10</Td>
            </Tr>
            <Tr>
              <Td>Row 11</Td>
              <Td>Row 11</Td>
              <Td>Row 11</Td>
              <Td>Row 11</Td>
            </Tr>
            <Tr>
              <Td>Row 12</Td>
              <Td>Row 12</Td>
              <Td>Row 12</Td>
              <Td>Row 12</Td>
            </Tr>
          </tbody>
        </Table>
      </Table.ScrollView>
    </ComponentBox>
  )
}

export function PaginationTable() {
  return (
    <ComponentBox hideCode>
      {() => {
        const TablePagination = () => {
          const amountPerPage = 5
          const [currentPage, setCurrentPage] = React.useState(1)
          const [data] = React.useState(() => getDataFromAPI(0, 100))

          return (
            <Pagination
              page_count={data.length / amountPerPage}
              current_page={currentPage}
              on_change={({ page }) => {
                setCurrentPage(page)
              }}
            >
              <MakeTable
                currentPage={currentPage}
                amountPerPage={amountPerPage}
                data={data}
              />
            </Pagination>
          )

          function getDataFromAPI(offset, max) {
            const list = []

            for (let i = offset + 1, l = offset + max; i <= l; i++) {
              list.push({
                name: 'Row ' + i,
              })
            }

            return list
          }

          function MakeTable({ currentPage, amountPerPage, data }) {
            const offset = currentPage * amountPerPage - amountPerPage
            const tableBody = data
              .slice(offset, offset + amountPerPage)
              .map(({ name }, i) => {
                return (
                  <Tr key={i}>
                    <Td>{name}</Td>
                  </Tr>
                )
              })

            return (
              <Table.ScrollView>
                <Table>
                  <thead>
                    <Tr>
                      <Th>Column</Th>
                    </Tr>
                  </thead>
                  <tbody>{tableBody}</tbody>
                </Table>
              </Table.ScrollView>
            )
          }
        }

        return <TablePagination />
      }}
    </ComponentBox>
  )
}
