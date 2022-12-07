/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { H2, P, Code, Anchor } from '@dnb/eufemia/src/elements'
import { Button, Pagination } from '@dnb/eufemia/src/components'
import Table from '@dnb/eufemia/src/components/table/Table'
import Th from '@dnb/eufemia/src/components/table/TableTh'
import Td from '@dnb/eufemia/src/components/table/TableTd'
import Tr from '@dnb/eufemia/src/components/table/TableTr'
import TableContainer from '@dnb/eufemia/src/components/table/TableContainer'

export const TableVariantBasic = () => (
  <ComponentBox hideCode data-visual-test="table-default">
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
            <Th sortable active>
              <Th.SortButton
                text="Sortable Active"
                title="Sort table column"
              />
            </Th>
            <Th sortable reversed align="right">
              <Th.SortButton text="Sortable" title="Sort table column" />
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
          .dnb-table__container__body {
            min-width: 800px;
            max-width: 70rem;
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
