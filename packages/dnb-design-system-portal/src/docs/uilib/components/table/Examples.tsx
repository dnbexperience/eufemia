/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { H2, P, Code, Anchor } from '@dnb/eufemia/src/elements'
import { Button } from '@dnb/eufemia/src/components'
import Table from '@dnb/eufemia/src/components/table/Table'
import Th from '@dnb/eufemia/src/components/table/TableTh'
import Td from '@dnb/eufemia/src/components/table/TableTd'
import Tr from '@dnb/eufemia/src/components/table/TableTr'
import TableContainer from '@dnb/eufemia/src/components/table/TableContainer'

/**
 * Add a max width to all tables
 */
const MaxWidth = styled.div`
  margin-bottom: 2rem;
  & .dnb-table__scroll-view {
    width: 70vw;
    @media screen and (max-width: 60em) {
      width: 55vw;
    }
    @media screen and (max-width: 50em) {
      width: auto;
    }
  }

  [data-visual-test-wrapper] {
    margin: 0;
  }
`

export const TableVariantBasic = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-default"
    scope={{ MaxWidth }}
  >
    <MaxWidth>
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
    </MaxWidth>
  </ComponentBox>
)

export const TableSizeMedium = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-size-medium"
    scope={{ MaxWidth }}
  >
    <MaxWidth>
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
    </MaxWidth>
  </ComponentBox>
)

export const TableSizeSmall = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-size-small"
    scope={{ MaxWidth }}
  >
    <MaxWidth>
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
    </MaxWidth>
  </ComponentBox>
)

export const TableVariantComplex = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-complex"
    scope={{ MaxWidth }}
  >
    <MaxWidth>
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
                <Code>Row 3</Code>
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
    </MaxWidth>
  </ComponentBox>
)

export const TableVariantFixed = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-fixed"
    scope={{ MaxWidth }}
  >
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
        <MaxWidth>
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
        </MaxWidth>
      )
    }}
  </ComponentBox>
)

export const TableStackedContainer = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-container"
    scope={{ TableContainer }}
  >
    {() => {
      const StyledContainer = styled(TableContainer)`
        /* Define the width of the THs so they are aligned accross tables */
        table {
          min-width: 50rem;
          thead {
            th:nth-of-type(1) {
              width: 40%;
            }
            th:nth-of-type(2) {
              width: 30%;
            }
            th:nth-of-type(3) {
              width: 20%;
            }
            th:nth-of-type(4) {
              width: 10%;
            }
          }
        }

        /* Documentation specific widths */
        width: 70vw;
        @media screen and (max-width: 60em) {
          width: 55vw;
        }
        @media screen and (max-width: 50em) {
          width: auto;
        }
      `
      return (
        <StyledContainer aria-label="I contain two tables" bottom="large">
          <TableContainer.Head>
            <H2>Header</H2>
            <P top>Text</P>
          </TableContainer.Head>

          <TableContainer.Body>
            <Table fixed border>
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

            <Table fixed border>
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

export const TableClassHelpers = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-classes"
    scope={{ MaxWidth }}
  >
    <MaxWidth>
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
    </MaxWidth>
  </ComponentBox>
)

export const TableLongHeader = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-header"
    scope={{ MaxWidth }}
  >
    <MaxWidth>
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
    </MaxWidth>
  </ComponentBox>
)

export const TableSticky = () => (
  <>
    <ComponentBox
      hideCode
      data-visual-test="table-sticky"
      scope={{ MaxWidth }}
    >
      <MaxWidth>
        <Table.ScrollView>
          <Table
            sticky={globalThis.IS_TEST ? true : 'body-scroll'}
            stickyOffset={
              globalThis?.location?.href?.includes('fullscreen')
                ? null
                : '3.5rem'
            }
          >
            <caption className="dnb-sr-only">A Table Caption</caption>
            <thead>
              <Tr>
                <Th colSpan={2}>Header</Th>
                <Th sortable reversed>
                  <Th.SortButton
                    text="Sortable"
                    title="Sort table column"
                  />
                </Th>
                <Th sortable active>
                  <Th.SortButton text="Active" title="Sort table column" />
                </Th>
              </Tr>
            </thead>
            <tbody>
              <Tr id="scroll-to-tr-id">
                <Td>
                  <P>
                    Column 1 <b>with p</b>
                  </P>
                </Td>
                <Td>
                  <Code>Column 2 with code</Code>
                </Td>
                <Td>
                  <span>Column 3 with span</span>
                </Td>
                <Td>Row 4</Td>
              </Tr>
              <Tr>
                <Td colSpan={2}>Column which spans over two columns</Td>
                <Td>Row 3</Td>
                <Td>Row 4</Td>
              </Tr>
              <Tr>
                <Td>Row 1</Td>
                <Td>Row 2</Td>
                <Td>Row 3</Td>
                <Td>Row 4</Td>
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
      </MaxWidth>
    </ComponentBox>
  </>
)
