/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { useMedia } from '@dnb/eufemia/src/shared'
import { useCopyWithNotice } from '@dnb/eufemia/src/components/number-format/NumberUtils'
import {
  H2,
  P,
  Dl,
  Dt,
  Dd,
  Code,
  Anchor,
  Card,
  Flex,
  Badge,
} from '@dnb/eufemia/src'
import {
  stop as stopIcon,
  compose as composeIcon,
  copy as copyIcon,
} from '@dnb/eufemia/src/icons'
import {
  Button,
  Pagination,
  Checkbox,
  Input,
  Section,
} from '@dnb/eufemia/src/components'
import Table from '@dnb/eufemia/src/components/table/Table'
import Th from '@dnb/eufemia/src/components/table/TableTh'
import Td from '@dnb/eufemia/src/components/table/TableTd'
import Tr from '@dnb/eufemia/src/components/table/TableTr'
import TableContainer from '@dnb/eufemia/src/components/table/TableContainer'
import useHandleSortState from '@dnb/eufemia/src/components/table/useHandleSortState'

export const VariantBasic = () => (
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

export const SizeMedium = () => (
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

export const SizeSmall = () => (
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

export const VariantComplex = () => (
  <ComponentBox hideCode data-visual-test="table-complex">
    <Table.ScrollView>
      <Table border outline>
        <caption>A Table Caption</caption>
        <thead>
          <Tr noWrap>
            <Th />
            <Th>
              Column 2<br />
              newline
            </Th>
            <Th colSpan={2}>Column 3 that spans</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr variant="even">
            <Th scope="rowgroup" rowSpan={2}>
              Row 1+2 Header
            </Th>
            <Td rowSpan={2}>Row 1 that spans</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
          </Tr>
          <Tr variant="even">
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

export const RowScopeOnly = () => (
  <ComponentBox hideCode data-visual-test="table-row-scope-only">
    <Table.ScrollView>
      <Table outline border>
        <caption>A Table Caption</caption>
        <tbody>
          <Tr>
            <Th scope="row">Header A</Th>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
          </Tr>
          <Tr>
            <Th>Header B</Th>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  </ComponentBox>
)

export const VariantFixed = () => (
  <ComponentBox hideCode data-visual-test="table-fixed">
    {() => {
      const FixedTable = styled(Table)`
        min-width: 70rem;

        /* Define the width of the THs so they are aligned across tables */
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

export const StackedContainer = () => {
  const isFullscreen = /data-visual-test|fullscreen/.test(
    globalThis?.location?.href,
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
            Define the width of the THs so they are aligned across tables.
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
            th:nth-of-type(1),
            td:nth-of-type(1) {
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
                    <Td rowSpan={2}>Row 1</Td>
                    <Td>Row 1</Td>
                    <Td>Row 1</Td>
                    <Td>Row 1</Td>
                  </Tr>
                  <Tr>
                    <Td rowSpan={2}>Row 2</Td>
                    <Td>Row 2</Td>
                    <Td>Row 2</Td>
                  </Tr>
                  <Tr>
                    <Td>Row 3</Td>
                    <Td>Row 3</Td>
                    <Td>Row 3</Td>
                  </Tr>
                </tbody>
              </Table>

              <Table fixed border>
                <tbody>
                  <Tr>
                    <Th scope="rowgroup" rowSpan={2}>
                      Row Header Group
                    </Th>
                    <Td>Row 1</Td>
                    <Td>Row 1</Td>
                  </Tr>
                  <Tr>
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

export const ContainerEmptyHeaderFooter = () => {
  return (
    <ComponentBox
      hideCode
      data-visual-test="table-container-empty"
      scope={{ TableContainer }}
    >
      {() => {
        return (
          <TableContainer bottom="large">
            <TableContainer.Body>
              <Table border>
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
                </tbody>
              </Table>
            </TableContainer.Body>
          </TableContainer>
        )
      }}
    </ComponentBox>
  )
}

export const ClassHelpers = () => (
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

export const WithoutClasses = () => (
  <ComponentBox hideCode data-visual-test="table-no-classes">
    <Table.ScrollView>
      <table className="dnb-table">
        <thead>
          <tr>
            <th>Header</th>
            <th className="dnb-table--sortable dnb-table--reversed">
              <Th.SortButton text="Sortable" />
            </th>
            <th className="dnb-table--sortable dnb-table--active">
              <Th.SortButton text="Active" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1</td>
            <td>Row 1</td>
            <td>Row 1</td>
          </tr>
          <tr>
            <td>Row 2</td>
            <td>Row 2</td>
            <td>Row 2</td>
          </tr>
          <tr>
            <td>Row 3</td>
            <td>Row 3</td>
            <td>Row 3</td>
          </tr>
        </tbody>
      </table>
    </Table.ScrollView>
  </ComponentBox>
)

export const LongHeader = () => (
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

export const Accordion = () => (
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
              <Button top icon="bell" variant="secondary">
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
            <AccordionTable id="table-2" border outline size="medium" />
          </Table.ScrollView>
        </>
      )
    }}
  </ComponentBox>
)

export const AccordionRow = () => {
  return (
    <ComponentBox hideCode data-visual-test="table-accordion-rows">
      {() => {
        const firstRowContent = [
          {
            label: 'Expanded 1.1',
          },
          {
            label: 'Expanded 1.2 with a lot of text',
          },
        ]
        return (
          <Table.ScrollView>
            <Table accordion accordionChevronPlacement="end" fixed>
              <thead>
                <Tr>
                  <Th width="25%" noWrap>
                    Column A
                  </Th>
                  <Th width="25%" noWrap>
                    Column B
                  </Th>
                  <Th width="25%" noWrap>
                    Column C
                  </Th>
                  <Th width="25%">Column D with long text</Th>
                </Tr>
              </thead>

              <tbody>
                <Tr>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>
                  <Td>Row 1</Td>

                  {firstRowContent.map(({ label }) => (
                    <Tr.AccordionContent key={label}>
                      <Td>{label}</Td>
                      <Td>{label}</Td>
                      <Td>{label}</Td>
                      <Td>{label}</Td>
                    </Tr.AccordionContent>
                  ))}
                </Tr>

                <Tr>
                  <Td>Row 2</Td>
                  <Td>Row 2</Td>
                  <Td>Row 2</Td>
                  <Td>Row 2</Td>

                  <Tr.AccordionContent>
                    <Td>Expanded 2.1 with a lot of text</Td>
                    <Td>Expanded 2.1</Td>
                    <Td>Expanded 2.1</Td>
                    <Td>Expanded 2.1</Td>
                  </Tr.AccordionContent>

                  <Tr.AccordionContent>
                    <Td>Expanded 2.2</Td>
                    <Td>Expanded 2.2 with a lot of text</Td>
                    <Td>Expanded 2.2</Td>
                    <Td>Expanded 2.2</Td>
                  </Tr.AccordionContent>

                  <Tr.AccordionContent>
                    <Td>Expanded 2.3</Td>
                    <Td>Expanded 2.3</Td>
                    <Td>Expanded 2.3 with a lot of text</Td>
                    <Td>Expanded 2.3</Td>
                  </Tr.AccordionContent>
                </Tr>
              </tbody>
            </Table>
          </Table.ScrollView>
        )
      }}
    </ComponentBox>
  )
}

export const Sticky = () => {
  const isFullscreen = /data-visual-test|fullscreen/.test(
    globalThis?.location?.href,
  )
  const isVisibleWhenVisualTest = globalThis.IS_TEST
  return (
    <ComponentBox
      hideCode
      scope={{ isFullscreen, isVisibleWhenVisualTest }}
    >
      <Table.ScrollView>
        <Table
          sticky={isVisibleWhenVisualTest ? 'css-position' : true}
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

export const StickyMaxHeight = () => {
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
              on_change={({ pageNumber }) => {
                setCurrentPage(pageNumber)
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

export const InOneContainer = () => (
  <ComponentBox hideToolbar hidePreview scope={{ TableContainer }}>
    <TableContainer>
      <TableContainer.Head>
        <H2>Heading</H2>
      </TableContainer.Head>

      <TableContainer.Body>
        <Table>Content</Table>
        <Table>Content</Table>
      </TableContainer.Body>

      <TableContainer.Foot>
        <P>Footer</P>
      </TableContainer.Foot>
    </TableContainer>
  </ComponentBox>
)

export const VariantCombinations = () => {
  const ContentVariants = () => (
    <>
      <div data-visual-test="table-combinations-default">
        <CaptionVariants title="Regular content: ">
          <ContentRegular />
        </CaptionVariants>
      </div>
      <div data-visual-test="table-combinations-no-header">
        <CaptionVariants title="No header: ">
          <ContentNoHeader />
        </CaptionVariants>
      </div>
      <div data-visual-test="table-combinations-row-header">
        <CaptionVariants title="Row headers: ">
          <ContentRowHeaders />
        </CaptionVariants>
      </div>
      <div data-visual-test="table-combinations-spanning">
        <CaptionVariants title="Spanning: ">
          <ContentSpanning />
        </CaptionVariants>
      </div>
      <div data-visual-test="table-combinations-row-header-spanning">
        <CaptionVariants title="Row headers spanning: ">
          <ContentRowHeadersSpanning />
        </CaptionVariants>
      </div>
    </>
  )

  const CaptionVariants = ({ title, children }) => (
    <>
      <TableVariants title={title + 'With caption: '}>
        <caption>Caption</caption>
        {children}
      </TableVariants>

      <TableVariants title={title + 'No caption: '}>
        {children}
      </TableVariants>
    </>
  )
  const TableVariants = ({ title, children }) => (
    <>
      {title + 'Basic'}
      <Table>{children}</Table>
      {title + 'Border'}
      <Table border>{children}</Table>
      {title + 'Outline'}
      <Table outline>{children}</Table>
      {title + 'Border and outline'}
      <Table border outline>
        {children}
      </Table>
    </>
  )

  const ContentRegular = () => (
    <>
      <thead>
        <Tr>
          <Th>Th A</Th>
          <Th>Th B</Th>
          <Th>Th C</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Td 1</Td>
          <Td>Td 1</Td>
          <Td>Td 1</Td>
        </Tr>
        <Tr>
          <Td>Td 2</Td>
          <Td>Td 2</Td>
          <Td>Td 2</Td>
        </Tr>
        <Tr>
          <Td>Td 3</Td>
          <Td>Td 3</Td>
          <Td>Td 3</Td>
        </Tr>
      </tbody>
    </>
  )

  const ContentNoHeader = () => (
    <>
      <tbody>
        <Tr>
          <Td>Td 1</Td>
          <Td>Td 1</Td>
          <Td>Td 1</Td>
        </Tr>
        <Tr>
          <Td>Td 2</Td>
          <Td>Td 2</Td>
          <Td>Td 2</Td>
        </Tr>
        <Tr>
          <Td>Td 3</Td>
          <Td>Td 3</Td>
          <Td>Td 3</Td>
        </Tr>
      </tbody>
    </>
  )

  const ContentRowHeaders = () => (
    <>
      <tbody>
        <Tr>
          <Th>Th 1</Th>
          <Td>Td 1</Td>
          <Td>Td 1</Td>
        </Tr>
        <Tr>
          <Th>Th 2</Th>
          <Td>Td 2</Td>
          <Td>Td 2</Td>
        </Tr>
        <Tr>
          <Th>Th 3</Th>
          <Td>Td 3</Td>
          <Td>Td 3</Td>
        </Tr>
      </tbody>
    </>
  )

  const ContentSpanning = () => (
    <>
      <thead>
        <Tr>
          <Th colSpan={2}>Th A</Th>
          <Th>Th B</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Td 1</Td>
          <Td>Td 1</Td>
          <Td rowSpan={2}>Td 1</Td>
        </Tr>
        <Tr>
          <Td rowSpan={2}>Td 2</Td>
          <Td>Td 2</Td>
        </Tr>
        <Tr>
          <Td>Td 3</Td>
          <Td>Td 3</Td>
        </Tr>
      </tbody>
    </>
  )

  const ContentRowHeadersSpanning = () => (
    <>
      <tbody>
        <Tr>
          <Th rowSpan={2}>Th 1</Th>
          <Td>Td 1</Td>
          <Td>Td 1</Td>
        </Tr>
        <Tr>
          <Td>Td 2</Td>
          <Td>Td 2</Td>
        </Tr>
        <Tr>
          <Th colSpan={2}>Th 3</Th>

          <Td>Td 3</Td>
        </Tr>
      </tbody>
    </>
  )

  return (
    <ComponentBox scope={{ ContentVariants }}>
      <ContentVariants />
    </ComponentBox>
  )
}

export const ResponsiveInCard = () => (
  <ComponentBox
    scope={{ useMedia, composeIcon, stopIcon }}
    hideCode
    data-visual-test="table-one-td"
  >
    {() => {
      const Example = () => {
        const { isSmall, isLarge } = useMedia()

        const header = {
          title: 'Tittel',
          description: 'Beskrivelse',
          status: 'Status',
          deadline: 'Frist',
        }

        const content = {
          title: 'Lorem ipsum',
          description: 'Lorem ipsum',
          status: <Badge content="Ikke pågeynt" />,
          deadline: '17.04.2025',
        }

        const align = isLarge
          ? 'flex-end'
          : isSmall
          ? 'center'
          : 'flex-start'

        const tableRow = (
          <>
            {isLarge ? (
              <Tr>
                <Td>{content.title}</Td>
                <Td>{content.description}</Td>
                <Td>{content.status}</Td>
                <Td>{content.deadline}</Td>
              </Tr>
            ) : (
              <>
                <Tr variant="odd">
                  <Th scope="row">{header.title}</Th>
                  <Td>{content.title}</Td>
                </Tr>
                <Tr>
                  <Th scope="row">{header.description}</Th>
                  <Td>{content.description}</Td>
                </Tr>
                <Tr>
                  <Th scope="row">{header.status}</Th>
                  <Td>{content.status}</Td>
                </Tr>
                <Tr>
                  <Th scope="row">{header.deadline}</Th>
                  <Td>{content.deadline}</Td>
                </Tr>
              </>
            )}

            <Tr variant="odd">
              <Td colSpan={isLarge ? 4 : 2} aria-label={header.title}>
                <Flex.Horizontal justify={align}>
                  <Button
                    variant="tertiary"
                    icon={stopIcon}
                    icon_position="left"
                  >
                    Avvis signering
                  </Button>
                  <Button variant="secondary" icon={composeIcon}>
                    Start signering
                  </Button>
                </Flex.Horizontal>
              </Td>
            </Tr>
          </>
        )

        const MyTable = () => (
          <Table.ScrollView>
            <Table border outline size="medium">
              {isLarge && (
                <thead>
                  <Tr noWrap>
                    <Th>{header.title}</Th>
                    <Th>{header.description}</Th>
                    <Th>{header.status}</Th>
                    <Th>{header.deadline}</Th>
                  </Tr>
                </thead>
              )}

              <tbody>
                {tableRow}
                {tableRow}
              </tbody>
            </Table>
          </Table.ScrollView>
        )

        return (
          <Card
            title="Card title"
            responsive={false}
            innerSpace={0}
            filled
          >
            <MyTable />
          </Card>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)
