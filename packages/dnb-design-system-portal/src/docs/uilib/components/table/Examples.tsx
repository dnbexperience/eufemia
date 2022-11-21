/**
 * UI lib Component Example
 *
 */

import React from 'react'
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { P, Code } from '@dnb/eufemia/src/elements'
import { Button } from '@dnb/eufemia/src/components'
import Table from '@dnb/eufemia/src/components/table/Table'
import Th from '@dnb/eufemia/src/components/table/TableTh'
import Td from '@dnb/eufemia/src/components/table/TableTd'
import Tr from '@dnb/eufemia/src/components/table/TableTr'

/**
 * Add a max width to all tables
 */
const MaxWidth = styled(Table.ScrollView)`
  width: 70vw;
  @media screen and (max-width: 60em) {
    width: 55vw;
  }
  @media screen and (max-width: 50em) {
    width: auto;
  }
`

export const TableVariantBasic = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-default"
    scope={{ MaxWidth }}
  >
    <MaxWidth>
      <Table>
        <caption className="dnb-sr-only">A Table Caption</caption>
        <thead>
          <Tr>
            <Th scope="col">Column</Th>
            <Th scope="col">
              <Th.Horizontal>
                Help Button
                <Th.HelpButton>Help Content</Th.HelpButton>
              </Th.Horizontal>
            </Th>
            <Th scope="col" sortable active>
              <Th.SortButton
                text="Sortable Active"
                title="Sort table column"
              />
            </Th>
            <Th scope="col" sortable reversed align="right">
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
      <Table>
        <caption>A Table Caption</caption>
        <thead>
          <Tr noWrap>
            <Th scope="col">
              Column 1<br />
              newline
            </Th>
            <Th scope="col">Column 2</Th>
            <Th scope="col" colSpan={2}>
              Column 3 that spans
            </Th>
          </Tr>
        </thead>
        <tbody>
          <Tr variant="even">
            <Td>Row 1</Td>
            <Td rowSpan={2}>Row 1 that spans</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
          </Tr>
          <Tr variant="even">
            <Td>Row 2</Td>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
          </Tr>
          <Tr>
            <Td>
              Row 3 <br />
              newline
            </Td>
            <Td>Row 3</Td>
            <Td noSpacing>
              <Button variant="secondary">Button</Button>
            </Td>
            <Td>Row 3</Td>
          </Tr>
          <Tr>
            <Td>Row 4</Td>
            <Td>Row 4</Td>
            <Td>Row 4</Td>
            <Td>Row 4</Td>
          </Tr>
        </tbody>
        <tfoot>
          <Tr variant="odd">
            <Td colSpan={4}>Footer</Td>
          </Tr>
        </tfoot>
      </Table>
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
          <Table.ScrollView bottom="large">
            <FixedTable fixed>
              <caption className="dnb-sr-only">A Table Caption</caption>
              <thead>
                <Tr noWrap>
                  <Th scope="col">Column 1</Th>
                  <Th scope="col">Column 2</Th>
                  <Th scope="col">Column 3</Th>
                  <Th scope="col">Column 4</Th>
                  <Th scope="col">Column 5</Th>
                  <Th scope="col">Column 6</Th>
                  <Th scope="col">Column 7</Th>
                  <Th scope="col" align="right">
                    Column 8
                  </Th>
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

export const TableClassHelpers = () => (
  <ComponentBox
    hideCode
    data-visual-test="table-classes"
    scope={{ MaxWidth }}
  >
    <MaxWidth>
      <table className="dnb-table">
        <thead>
          <tr className="dnb-table__tr">
            <th className="dnb-table__th">.dnb-table__th</th>
            <th
              scope="col"
              className="dnb-table__th dnb-table--sortable dnb-table--reversed"
            >
              <Th.SortButton
                text="dnb-table--reversed"
                title="dnb-table__th dnb-table--sortable dnb-table--reversed"
              />
            </th>
            <th
              scope="col"
              className="dnb-table__th dnb-table--sortable dnb-table--active"
            >
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
      <Table>
        <caption className="dnb-sr-only">A Table Caption</caption>
        <thead>
          <Tr>
            <Th scope="col" colSpan={2}>
              Static long header senectus ornare convallis ut at erat
              imperdiet commodo
            </Th>
            <Th scope="col" sortable reversed>
              <Th.SortButton
                text="Sortable long header ridiculus laoreet turpis netus at vitae"
                title="Sort table column"
              />
            </Th>
            <Th scope="col" align="right" sortable active>
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
    </MaxWidth>
  </ComponentBox>
)

export const TableSticky = () => (
  <>
    <Global
      styles={css`
        body {
          .dnb-app-content {
            /** Because of position: sticky; */
            overflow: visible;
          }

          .dnb-tabbar {
            /** Because the tabbar has an bottom border that will be whown on top of the side-menu */
            overflow: hidden;
          }

          [data-visual-test='table-sticky'] {
            /** We want the width limit, but no overflow: auto */
            .dnb-table__scroll-view {
              overflow: initial;
            }
          }
        }
      `}
    />
    <ComponentBox
      hideCode
      data-visual-test="table-sticky"
      scope={{ MaxWidth }}
    >
      <MaxWidth>
        <Table sticky={true} stickyOffset="4rem">
          <caption className="dnb-sr-only">A Table Caption</caption>
          <thead>
            <Tr>
              <Th scope="col" colSpan={2}>
                Header
              </Th>
              <Th scope="col" sortable reversed>
                <Th.SortButton text="Sortable" title="Sort table column" />
              </Th>
              <Th scope="col" sortable active>
                <Th.SortButton text="Active" title="Sort table column" />
              </Th>
            </Tr>
          </thead>
          <tbody>
            <Table.StickyHelper />
            <Tr>
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
            <Tr id="scroll-to-tr-id">
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
      </MaxWidth>
    </ComponentBox>
  </>
)
