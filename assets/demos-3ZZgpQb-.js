import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{a as r,et as i,t as a}from"./Anchor-BPx9fjvj.js";import{P as ee,a as te,s as o}from"./SpacingUtils-Bo00Pdpx.js";import{t as s}from"./withComponentMarkers-ClZmq6eb.js";import{t as ne}from"./Icon-C5IFEhlK.js";import{c as re}from"./Space-Dj8ZZAch.js";import{t as ie}from"./compose-DuKyYhRr.js";import{f as c,o as l,p as ae,s as u}from"./ToggleButton-DfKpi57X.js";import{t as oe}from"./stop-BVULijT-.js";import{Ft as d,H as f,It as p,Pt as m,j as se}from"./forms-D54jfDKN.js";import{t as h}from"./Button-kSqfAUVR.js";import{F as g}from"./Autocomplete-eAFtuLbJ.js";import{t as _}from"./P-CVKBz4XO.js";import{_ as v,a as y,i as ce,n as le,o as b,r as ue,s as de,u as x}from"./Table-DeLWJx8P.js";import{t as fe}from"./H2-DASO3mku.js";import{t as pe}from"./Card-BvVSLAbs.js";import{t as me}from"./Section-_oyssAWe.js";import{t as he}from"./ListExport-BvrqCQ3d.js";import{t as ge}from"./Heading-OwOHsD1e.js";import{t as _e}from"./MenuExport-DclpT-dI.js";import{t as ve}from"./StatExport-DQ1ko5MP.js";import{t as ye}from"./Pagination-CWJUXLJU.js";import{H as be,U as xe}from"./index-BsJ3GLEw.js";import{t as S}from"./ComponentBox-sLMgHvLi.js";import{t as Se}from"./useHandleSortState-D8T6j6Sf.js";var C=t(n());function w(e){let{children:t,className:n,...r}=e;ee(e,r);let i=te(e,{className:o(`dnb-table__container`,n),...r}),a=ce,s=Array.isArray(t)?t:[t];return s[0]?.type!==w.Head&&s.unshift((0,C.jsx)(w.Head,{},`head`)),s[2]?.type!==w.Foot&&s.push((0,C.jsx)(w.Foot,{},`foot`)),(0,C.jsx)(`section`,{...i,children:(0,C.jsx)(a,{children:s})})}function Ce(e){let{children:t,className:n,...r}=e;return(0,C.jsx)(`div`,{className:o(`dnb-table__container__body`,n),...r,children:t})}function we(e){let{children:t,className:n,...r}=e;return(0,C.jsx)(`div`,{className:o(`dnb-table__container__head`,!t&&`dnb-table__container__head--empty`,n),...r,children:t})}function Te(e){let{children:t,className:n,...r}=e;return(0,C.jsx)(`div`,{className:o(`dnb-table__container__foot`,!t&&`dnb-table__container__foot--empty`,n),...r,children:t})}w.Body=Ce,w.Head=we,w.Foot=Te,s(w,{_supportsSpacingProps:!0});var Ee=e({Accordion:()=>I,AccordionMixed:()=>L,AccordionRow:()=>R,ClassHelpers:()=>P,ClickableCells:()=>H,ClickableRows:()=>B,ColumnHighlight:()=>Z,ContainerEmptyHeaderFooter:()=>N,InCard:()=>Y,InOneContainer:()=>K,KeyboardNavigation:()=>z,LongHeader:()=>F,MultipleTbody:()=>Q,NavigationMixed:()=>V,NoStriped:()=>A,PaginationTable:()=>G,ResponsiveInCard:()=>J,RowScopeOnly:()=>k,SizeMedium:()=>E,SizeSmall:()=>D,StackedContainer:()=>M,Sticky:()=>U,StickyMaxHeight:()=>W,TableInAccordionTable:()=>X,VariantBasic:()=>T,VariantCombinations:()=>q,VariantComplex:()=>O,VariantFixed:()=>j}),T=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-default`,scope:{useHandleSortState:Se},stableName:`VariantBasic`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Button:h,HelpButton:de,Td:v,P:_,Code:i},noInline:!0,children:`const BasicTable = () => {
  const { sortState, sortHandler } = useHandleSortState({
    column1: {
      direction: 'asc',
      active: true,
    },
    column2: {
      direction: 'desc',
      modes: ['asc', 'desc'],
    },
  })

  // Handle your "column1" logic
  useEffect(() => {
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
                onClick={sortHandler.column1}
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
                onClick={sortHandler.column2}
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
render(<BasicTable />)
`}),E=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-size-medium`,stableName:`SizeMedium`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v,P:_},children:`<Table.ScrollView>
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
`}),D=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-size-small`,stableName:`SizeSmall`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v,P:_},children:`<Table.ScrollView>
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
          <P size="small">Row 2 with paragraph</P>
        </Td>
        <Td>
          <P size="small">
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
`}),O=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-complex`,stableName:`VariantComplex`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v,Button:h,Code:i},children:`<Table.ScrollView>
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
`}),k=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-row-scope-only`,stableName:`RowScopeOnly`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v},children:`<Table.ScrollView>
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
`}),A=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-no-striped`,stableName:`NoStriped`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v},children:`<Table.ScrollView>
  <Table striped={false}>
    <caption className="dnb-sr-only">A Table Caption</caption>
    <thead>
      <Tr>
        <Th>Column A</Th>
        <Th>Column B</Th>
        <Th>Column C</Th>
      </Tr>
    </thead>
    <tbody>
      <Tr>
        <Td>Row 1</Td>
        <Td>Row 1</Td>
        <Td>Row 1</Td>
      </Tr>
      <Tr>
        <Td>Row 2</Td>
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
</Table.ScrollView>
`}),j=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-fixed`,stableName:`VariantFixed`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v},noInline:!0,children:`const FixedTable = styled(Table)\`
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
\`
render(
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
`}),M=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-container`,scope:{TableContainer:w,isFullscreen:/data-visual-test|fullscreen/.test(globalThis?.location?.href)},stableName:`StackedContainer`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{H2:fe,P:_,Table:f,Tr:y,Th:b,Anchor:a,Td:v},noInline:!0,children:`const StyledContainer = styled(TableContainer)\`
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
\`
render(
  <StyledContainer aria-label="I contain two tables" bottom="large">
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
`}),N=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-container-empty`,scope:{TableContainer:w},stableName:`ContainerEmptyHeaderFooter`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,Tr:y,Th:b,Td:v},noInline:!0,children:`render(
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
`}),P=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-classes`,stableName:`ClassHelpers`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Th:b},children:`<Table.ScrollView>
  <table className="dnb-table">
    <thead>
      <tr className="dnb-table__tr">
        <th className="dnb-table__th">.dnb-table__th</th>
        <Th sortable reversed>
          <Th.SortButton
            text="dnb-table--reversed"
            title="dnb-table__th dnb-table--sortable dnb-table--reversed"
          />
        </Th>
        <Th sortable active>
          <Th.SortButton
            text="dnb-table--active"
            title="dnb-table__th dnb-table--sortable dnb-table--active"
          />
        </Th>
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
`}),F=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-header`,stableName:`LongHeader`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v,P:_},children:`<Table.ScrollView>
  <Table>
    <caption className="dnb-sr-only">A Table Caption</caption>
    <thead>
      <Tr>
        <Th colSpan={2}>
          Static long header senectus ornare convallis ut at erat imperdiet
          commodo
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
`}),I=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-accordion`,stableName:`Accordion`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Checkbox:l,Input:g,Tr:y,Td:v,Section:me,Dl:d,Dt:m,Dd:p,Table:f,Th:b,ScrollView:x},noInline:!0,children:`const AccordionTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" labelSrOnly />
  }
  const TdInput = () => {
    return <Input label="Label" labelSrOnly size={4} />
  }
  const Row = ({ nr, ...rest }) => {
    return (
      <Tr id={id + '-' + nr} {...rest}>
        <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + nr}</Td>
        <Td>Row {nr}</Td>
        <Td spacing="horizontal">
          <TdInput />
        </Td>
        <Td align="right">Row {nr}</Td>

        <Td.AccordionContent>
          <Section
            innerSpace={{
              block: 'small',
            }}
          >
            <Dl>
              <Dt>Favorittfarge</Dt>
              <Dd>Grønn</Dd>
            </Dl>
          </Section>
        </Td.AccordionContent>
      </Tr>
    )
  }
  return (
    <Table mode="accordion" id={id} {...props}>
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
        <Row nr="3" expanded />
      </tbody>
    </Table>
  )
}
render(
  <>
    <Table.ScrollView>
      <AccordionTable
        id="accordion-table-1"
        showCheckbox
        accordionChevronPlacement="right"
      />
    </Table.ScrollView>

    <Table.ScrollView top>
      <AccordionTable
        id="accordion-table-2"
        border
        outline
        size="medium"
      />
    </Table.ScrollView>
  </>
)
`}),L=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-accordion-mixed`,stableName:`AccordionMixed`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Checkbox:l,Input:g,Table:f,Tr:y,Th:b,Td:v,Section:me,Dl:d,Dt:m,Dd:p,ScrollView:x},noInline:!0,children:`const AccordionTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" labelSrOnly />
  }
  const TdInput = () => {
    return <Input label="Label" labelSrOnly size={4} />
  }
  return (
    <Table mode="accordion" id={id} {...props}>
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
        <Tr id={id + '-' + 1}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 1}</Td>
          <Td>Row {1}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {1}</Td>

          <Td.AccordionContent>
            <Section
              innerSpace={{
                block: 'small',
              }}
            >
              <Dl>
                <Dt>Favorittfarge</Dt>
                <Dd>Grønn</Dd>
              </Dl>
            </Section>
          </Td.AccordionContent>
        </Tr>
        <Tr id={id + '-' + 2}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 2}</Td>
          <Td>Row {2}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {2}</Td>
        </Tr>
        <Tr id={id + '-' + 3}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 3}</Td>
          <Td>Row {3}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {3}</Td>

          <Td.AccordionContent>
            <Section
              innerSpace={{
                block: 'small',
              }}
            >
              <Dl>
                <Dt>Favorittfarge</Dt>
                <Dd>Grønn</Dd>
              </Dl>
            </Section>
          </Td.AccordionContent>
        </Tr>
      </tbody>
    </Table>
  )
}
render(
  <>
    <Table.ScrollView>
      <AccordionTable
        id="accordion-table-mixed-1"
        showCheckbox
        accordionChevronPlacement="right"
      />
    </Table.ScrollView>

    <Table.ScrollView top>
      <AccordionTable
        id="accordion-table-mixed-2"
        border
        outline
        size="medium"
      />
    </Table.ScrollView>
  </>
)
`}),R=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-accordion-rows`,stableName:`AccordionRow`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v},noInline:!0,children:`const firstRowContent = [
  {
    label: 'Expanded 1.1',
  },
  {
    label: 'Expanded 1.2 with a lot of text',
  },
]
render(
  <Table.ScrollView>
    <Table mode="accordion" accordionChevronPlacement="right">
      <thead>
        <Tr>
          <Th
            noWrap
            style={{
              width: '25%',
            }}
          >
            Column A
          </Th>
          <Th
            noWrap
            style={{
              width: '25%',
            }}
          >
            Column B
          </Th>
          <Th
            noWrap
            style={{
              width: '25%',
            }}
          >
            Column C
          </Th>
          <Th
            noWrap
            style={{
              width: '25%',
            }}
          >
            Column D
          </Th>
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
            <Td>Expanded 2.2 with a lot of text</Td>
            <Td>Expanded 2.2</Td>
            <Td>Expanded 2.2</Td>
            <Td>Expanded 2.2</Td>
          </Tr.AccordionContent>

          <Tr.AccordionContent>
            <Td>Expanded 2.3 with a lot of text</Td>
            <Td>Expanded 2.3</Td>
            <Td>Expanded 2.3</Td>
            <Td>Expanded 2.3</Td>
          </Tr.AccordionContent>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>
)
`}),z=()=>(0,C.jsx)(S,{scope:{useTableKeyboardNavigation:ue,trashIcon:ae,Field:se},stableName:`KeyboardNavigation`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,Th:b,Td:v,Field:se,Button:h},noInline:!0,children:`const KeyboardNavigationTable = () => {
  const navRef = useTableKeyboardNavigation()
  return (
    <Table border outline ref={navRef}>
      <caption className="dnb-sr-only">Keyboard navigable table</caption>

      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Action</Th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <Td>
            <Field.Name labelSrOnly value="Ola" />
          </Td>
          <Td>
            <Field.Email labelSrOnly value="ola@example.no" />
          </Td>
          <Td verticalAlign="middle">
            <Button
              variant="tertiary"
              icon={trashIcon}
              tooltip="Delete row"
            />
          </Td>
        </tr>
        <tr>
          <Td>
            <Field.Name labelSrOnly value="Kari" multiline />
          </Td>
          <Td>
            <Field.Email labelSrOnly value="kari@example.no" multiline />
          </Td>
          <Td verticalAlign="middle">
            <Button
              variant="tertiary"
              icon={trashIcon}
              tooltip="Delete row"
            />
          </Td>
        </tr>
        <tr>
          <Td>
            <Field.Number
              label="Quantity"
              labelSrOnly
              showStepControls
              width="small"
              value={1}
            />
          </Td>
          <Td>
            <Field.Number
              label="Quantity"
              labelSrOnly
              showStepControls
              width="small"
              value={2}
            />
          </Td>
          <Td verticalAlign="middle">
            <Button
              variant="tertiary"
              icon={trashIcon}
              tooltip="Delete row"
            />
          </Td>
        </tr>
        <tr>
          <Td>Kari</Td>
          <Td>kari@example.no</Td>
          <Td>
            <Button
              variant="tertiary"
              icon={trashIcon}
              tooltip="Delete row"
            />
          </Td>
        </tr>
      </tbody>
    </Table>
  )
}
render(<KeyboardNavigationTable />)
`}),B=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-navigation`,stableName:`ClickableRows`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Checkbox:l,Input:g,Tr:y,Td:v,Table:f,Th:b,ScrollView:x},noInline:!0,children:`const NavigationTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" labelSrOnly />
  }
  const TdInput = () => {
    return <Input label="Label" labelSrOnly size={4} />
  }
  const Row = ({ nr }) => {
    const shareId = id + '-' + nr
    const handleClick = useCallback((_event, { trElement }) => {
      console.log('Clicked row', trElement.dataset.rowId)
    }, [])
    return (
      <Tr id={shareId} data-row-id={nr} onClick={handleClick}>
        <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + nr}</Td>
        <Td>Row {nr}</Td>
        <Td spacing="horizontal">
          <TdInput />
        </Td>
        <Td align="right">Row {nr}</Td>
      </Tr>
    )
  }
  return (
    <Table mode="navigation" id={id} {...props}>
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
render(
  <>
    <Table.ScrollView>
      <NavigationTable id="navigation-table-1" showCheckbox />
    </Table.ScrollView>

    <Table.ScrollView top>
      <NavigationTable
        id="navigation-table-2"
        border
        outline
        size="medium"
      />
    </Table.ScrollView>
  </>
)
`}),V=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-navigation-mixed`,stableName:`NavigationMixed`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Checkbox:l,Input:g,Table:f,Tr:y,Th:b,Td:v,ScrollView:x},noInline:!0,children:`const NavigationTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" labelSrOnly />
  }
  const TdInput = () => {
    return <Input label="Label" labelSrOnly size={4} />
  }
  const handleClick = useCallback((_event, { trElement }) => {
    console.log('Clicked row', trElement.dataset.rowId)
  }, [])
  return (
    <Table mode="navigation" id={id} {...props}>
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
        <Tr id={id + '-' + 1} data-row-id={1} onClick={handleClick}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 1}</Td>
          <Td>Row {1}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {1}</Td>
        </Tr>
        <Tr id={id + '-' + 2}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 2}</Td>
          <Td>Row {2}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {2}</Td>
        </Tr>
        <Tr id={id + '-' + 3} data-row-id={3} onClick={handleClick}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 3}</Td>
          <Td>Row {3}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {3}</Td>
        </Tr>
      </tbody>
    </Table>
  )
}
render(
  <>
    <Table.ScrollView>
      <NavigationTable
        id="navigation-table-mixed-1"
        showCheckbox
        accordionChevronPlacement="right"
      />
    </Table.ScrollView>

    <Table.ScrollView top>
      <NavigationTable
        id="navigation-table-mixed-2"
        border
        outline
        size="medium"
      />
    </Table.ScrollView>
  </>
)
`}),H=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-navigation-cell`,scope:{eyeIcon:c,launchIcon:r},stableName:`ClickableCells`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v},noInline:!0,children:`const handleClick = (event, { trElement, thElement }) => {
  console.log(
    \`Clicked row \${trElement.dataset.rowId}, column "\${thElement?.dataset.columnId}"\`
  )
}
const handleSelectedClick = (
  event,
  { trElement, thElement, isSelected, setSelected }
) => {
  const selected = setSelected(!isSelected)
  console.log(
    \`Selected: "\${selected}" on row \${trElement.dataset.rowId}, column "\${thElement?.dataset.columnId}"\`
  )
}
render(
  <Table.ScrollView>
    <Table border outline>
      <caption className="dnb-sr-only">A Table Caption</caption>

      <thead>
        <Tr>
          <Th
            style={{
              width: '50%',
            }}
            data-column-id="account"
          >
            Account
          </Th>
          <Th
            style={{
              width: '35%',
            }}
            data-column-id="balance"
          >
            Balance
          </Th>
          <Th
            style={{
              width: '15%',
            }}
            data-column-id="type"
          >
            Details
          </Th>
        </Tr>
      </thead>

      <tbody>
        <Tr data-row-id="1" verticalAlign="middle">
          <Td onClick={handleClick}>Savings Account</Td>
          <Td onClick={handleClick}>1 234,56 kr</Td>
          <Td onClick={handleClick}>Default</Td>
        </Tr>
        <Tr data-row-id="2" verticalAlign="middle">
          <Td icon={launchIcon} onClick={handleClick}>
            Checking Account
          </Td>
          <Td icon={launchIcon} onClick={handleClick}>
            5 678,90 kr
          </Td>
          <Td icon={launchIcon} onClick={handleClick}>
            Custom icon
          </Td>
        </Tr>
        <Tr data-row-id="3" verticalAlign="middle">
          <Td
            icon={eyeIcon}
            selected={false}
            onClick={handleSelectedClick}
          >
            Press me to select with a lot of text
          </Td>
          <Td
            icon={eyeIcon}
            selected={false}
            onClick={handleSelectedClick}
          >
            12 345,00 kr
          </Td>
          <Td
            icon={eyeIcon}
            selected={false}
            onClick={handleSelectedClick}
          >
            Selectable
          </Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>
)
`}),U=()=>{let e=/data-visual-test|fullscreen/.test(globalThis?.location?.href),t=globalThis.IS_TEST;return(0,C.jsx)(S,{hideCode:!0,scope:{isFullscreen:e,isVisibleWhenVisualTest:t},stableName:`Sticky`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v,P:_,Code:i},children:`<Table.ScrollView>
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
`})},W=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-sticky`,stableName:`StickyMaxHeight`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v},children:`<Table.ScrollView
  style={{
    maxHeight: '18rem',
  }}
>
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
`});function G(){return(0,C.jsx)(S,{hideCode:!0,stableName:`PaginationTable`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Pagination:ye,Tr:y,Td:v,Table:f,ScrollView:x,Th:b},noInline:!0,children:`const TablePagination = () => {
  const amountPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [data] = useState(() => getDataFromAPI(0, 100))
  return (
    <Pagination
      pageCount={data.length / amountPerPage}
      currentPage={currentPage}
      onChange={({ pageNumber }) => {
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
render(<TablePagination />)
`})}var K=()=>(0,C.jsx)(S,{hideToolbar:!0,hidePreview:!0,scope:{TableContainer:w},stableName:`InOneContainer`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{H2:fe,Heading:ge,Table:f,P:_},children:`<TableContainer>
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
`}),q=()=>{let e=()=>(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`div`,{"data-visual-test":`table-combinations-default`,children:(0,C.jsx)(t,{title:`Regular content: `,children:(0,C.jsx)(r,{})})}),(0,C.jsx)(`div`,{"data-visual-test":`table-combinations-no-header`,children:(0,C.jsx)(t,{title:`No header: `,children:(0,C.jsx)(i,{})})}),(0,C.jsx)(`div`,{"data-visual-test":`table-combinations-row-header`,children:(0,C.jsx)(t,{title:`Row headers: `,children:(0,C.jsx)(a,{})})}),(0,C.jsx)(`div`,{"data-visual-test":`table-combinations-spanning`,children:(0,C.jsx)(t,{title:`Spanning: `,children:(0,C.jsx)(ee,{})})}),(0,C.jsx)(`div`,{"data-visual-test":`table-combinations-row-header-spanning`,children:(0,C.jsx)(t,{title:`Row headers spanning: `,children:(0,C.jsx)(te,{})})})]}),t=({title:e,children:t})=>(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(n,{title:e+`With caption: `,children:[(0,C.jsx)(`caption`,{children:`Caption`}),t]}),(0,C.jsx)(n,{title:e+`No caption: `,children:t})]}),n=({title:e,children:t})=>(0,C.jsxs)(C.Fragment,{children:[e+`Basic`,(0,C.jsx)(f,{children:t}),e+`Border`,(0,C.jsx)(f,{border:!0,children:t}),e+`Outline`,(0,C.jsx)(f,{outline:!0,children:t}),e+`Border and outline`,(0,C.jsx)(f,{border:!0,outline:!0,children:t})]}),r=()=>(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`thead`,{children:(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{children:`Th A`}),(0,C.jsx)(b,{children:`Th B`}),(0,C.jsx)(b,{children:`Th C`})]})}),(0,C.jsxs)(`tbody`,{children:[(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{children:`Td 1`}),(0,C.jsx)(v,{children:`Td 1`}),(0,C.jsx)(v,{children:`Td 1`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{children:`Td 2`}),(0,C.jsx)(v,{children:`Td 2`}),(0,C.jsx)(v,{children:`Td 2`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{children:`Td 3`}),(0,C.jsx)(v,{children:`Td 3`}),(0,C.jsx)(v,{children:`Td 3`})]})]})]}),i=()=>(0,C.jsx)(C.Fragment,{children:(0,C.jsxs)(`tbody`,{children:[(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{children:`Td 1`}),(0,C.jsx)(v,{children:`Td 1`}),(0,C.jsx)(v,{children:`Td 1`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{children:`Td 2`}),(0,C.jsx)(v,{children:`Td 2`}),(0,C.jsx)(v,{children:`Td 2`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{children:`Td 3`}),(0,C.jsx)(v,{children:`Td 3`}),(0,C.jsx)(v,{children:`Td 3`})]})]})}),a=()=>(0,C.jsx)(C.Fragment,{children:(0,C.jsxs)(`tbody`,{children:[(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{children:`Th 1`}),(0,C.jsx)(v,{children:`Td 1`}),(0,C.jsx)(v,{children:`Td 1`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{children:`Th 2`}),(0,C.jsx)(v,{children:`Td 2`}),(0,C.jsx)(v,{children:`Td 2`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{children:`Th 3`}),(0,C.jsx)(v,{children:`Td 3`}),(0,C.jsx)(v,{children:`Td 3`})]})]})}),ee=()=>(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`thead`,{children:(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{colSpan:2,children:`Th A`}),(0,C.jsx)(b,{children:`Th B`})]})}),(0,C.jsxs)(`tbody`,{children:[(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{children:`Td 1`}),(0,C.jsx)(v,{children:`Td 1`}),(0,C.jsx)(v,{rowSpan:2,children:`Td 1`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{rowSpan:2,children:`Td 2`}),(0,C.jsx)(v,{children:`Td 2`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{children:`Td 3`}),(0,C.jsx)(v,{children:`Td 3`})]})]})]}),te=()=>(0,C.jsx)(C.Fragment,{children:(0,C.jsxs)(`tbody`,{children:[(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{rowSpan:2,children:`Th 1`}),(0,C.jsx)(v,{children:`Td 1`}),(0,C.jsx)(v,{children:`Td 1`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(v,{children:`Td 2`}),(0,C.jsx)(v,{children:`Td 2`})]}),(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{colSpan:2,children:`Th 3`}),(0,C.jsx)(v,{children:`Td 3`})]})]})});return(0,C.jsx)(S,{scope:{ContentVariants:e},stableName:`VariantCombinations`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],children:`<ContentVariants />
`})},J=()=>(0,C.jsx)(S,{scope:{useMedia:re,composeIcon:ie,stopIcon:oe},hideCode:!0,"data-visual-test":`table-one-td`,stableName:`ResponsiveInCard`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Badge:be,Tr:y,Td:v,Th:b,Flex:u,Button:h,Table:f,ScrollView:x,Card:pe},noInline:!0,children:`const Example = () => {
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
    status: <Badge content="Ikke påbegynt" />,
    deadline: '17.04.2025',
  }
  const align = isLarge ? 'flex-end' : isSmall ? 'center' : 'flex-start'
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
            <Button variant="tertiary" icon={stopIcon} iconPosition="left">
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
    <Card title="Card title" responsive={false} innerSpace={0} filled>
      <MyTable />
    </Card>
  )
}
render(<Example />)
`}),Y=()=>(0,C.jsx)(S,{scope:{composeIcon:ie,stopIcon:oe,eyeIcon:c,trashIcon:ae},hideCode:!0,"data-visual-test":`table-in-card`,stableName:`InCard`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v,Stat:ve,Button:h,Card:pe,Flex:u,Icon:ne,Heading:ge,Menu:_e,List:he},noInline:!0,children:`const MyTable = () => {
  const rows = [
    {
      name: 'Acme Corporation',
      price: '142.50',
      change: 3.24,
    },
    {
      name: 'Globex Industries',
      price: '87.30',
      change: -1.08,
    },
    {
      name: 'Initech Solutions',
      price: '215.00',
      change: 0.75,
    },
    {
      name: 'Umbrella Corp',
      price: '63.80',
      change: -5.12,
    },
  ]
  return (
    <Table.ScrollView>
      <Table outline border>
        <thead>
          <Tr noWrap variant="even">
            <Th variant="subtle">Stock</Th>
            <Th variant="subtle" align="right">
              Price
            </Th>
            <Th variant="subtle" align="right">
              Change
            </Th>
            <Th aria-label="Actions" />
          </Tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <Tr key={row.name}>
              <Td>{row.name}</Td>
              <Td align="right">{row.price}</Td>
              <Td align="right">
                <Stat.Trend>
                  <Stat.Percent
                    value={row.change}
                    signDisplay="always"
                    decimals={2}
                  />
                </Stat.Trend>
              </Td>
              <Td align="right">
                <Button
                  icon={trashIcon}
                  tooltip="Remove from list"
                  variant="tertiary"
                  bounding
                />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Table.ScrollView>
  )
}
render(
  <Card responsive={false} innerSpace={0} aria-labelledby="my-header">
    <Flex.Horizontal
      stretch
      gap={false}
      justify="space-between"
      align="center"
      innerSpace={{
        top: 'medium',
        inline: 'small',
      }}
    >
      <Flex.Horizontal gap="x-small">
        <Icon icon={eyeIcon} />
        <Heading id="my-header" size="medium" top={false} bottom={false}>
          Watchlist
        </Heading>
      </Flex.Horizontal>

      <Menu.Root>
        <Menu.Button />
        <Menu.List>
          <Menu.Action text="My list" />
          <Menu.Action text="All" />
        </Menu.List>
      </Menu.Root>
    </Flex.Horizontal>
    <MyTable />
  </Card>
)
`}),X=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-inside-of-accordion-table`,stableName:`TableInAccordionTable`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Checkbox:l,Input:g,Tr:y,Td:v,Table:f,Th:b,ScrollView:x},noInline:!0,children:`const AccordionTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" labelSrOnly />
  }
  const TdInput = () => {
    return <Input label="Label" labelSrOnly size={4} />
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
          <Table>
            <thead>
              <Tr>
                <Th>Column A</Th>
                <Th>Column B</Th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <td>test</td>
                <td>test</td>
              </Tr>
              <Tr>
                <td>test</td>
                <td>test</td>
              </Tr>
            </tbody>
          </Table>
        </Td.AccordionContent>
      </Tr>
    )
  }
  return (
    <Table mode="accordion" id={id} {...props}>
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
      </tbody>
    </Table>
  )
}
render(
  <Table.ScrollView>
    <AccordionTable
      id="accordion-table-in-table"
      accordionChevronPlacement="right"
    />
  </Table.ScrollView>
)
`}),Z=()=>(0,C.jsx)(S,{hideCode:!0,"data-visual-test":`table-column-highlight`,scope:{useTableHighlight:le},stableName:`ColumnHighlight`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v},noInline:!0,children:`const ColumnHighlightTable = () => {
  const highlightRef = useTableHighlight()
  const label = 'Table with highlighted column'
  return (
    <Table.ScrollView>
      <Table outline border ref={highlightRef}>
        <caption className="dnb-sr-only">
          Table with highlighted column
        </caption>

        <thead>
          <Tr>
            <Th />
            <Th highlight aria-label={label}>
              Column A
            </Th>
            <Th highlight aria-label={label}>
              Column B
            </Th>
            <Th>Column C</Th>
            <Th>Column D</Th>
          </Tr>
        </thead>

        <tbody>
          <Tr highlight aria-label={label}>
            <Th>Row 1 Header</Th>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
          </Tr>
          <Tr>
            <Th>Row 2 Header</Th>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
          </Tr>
          <Tr>
            <Th>Row 3 Header</Th>
            <Td>Row 3</Td>
            <Td>Row 3</Td>
            <Td highlight aria-label={label}>
              Row 3
            </Td>
            <Td>Row 3</Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  )
}
render(<ColumnHighlightTable />)
`}),Q=()=>(0,C.jsx)(S,{"data-visual-test":`table-multiple-tbody`,stableName:`MultipleTbody`,sourceImports:[`import { useCallback, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { useMedia } from '@dnb/eufemia/shared'`,`import { H2, P, Dl, Dt, Dd, Code, Anchor, Card, Flex, Badge, Heading, Icon, Menu } from '@dnb/eufemia'`,`import { stop as stopIcon, compose as composeIcon, view as eyeIcon, launch as launchIcon, trash as trashIcon } from '@dnb/eufemia/icons'`,`import { Button, Pagination, Checkbox, Input, Section, Stat } from '@dnb/eufemia/components'`,`import TableContainer from '@dnb/eufemia/components/table/TableContainer'`,`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'`,`import Table, { Th, Td, Tr, useTableKeyboardNavigation, useTableHighlight } from '@dnb/eufemia/components/Table'`,`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:f,ScrollView:x,Tr:y,Th:b,Td:v,Badge:be},children:`<Table.ScrollView>
  <Table outline border="horizontal" striped={false}>
    <caption className="dnb-sr-only">
      Market data with delay and opening hours
    </caption>

    <thead>
      <Tr>
        <Th scope="col">Marked</Th>
        <Th scope="col">Forsinkelse (min)</Th>
        <Th scope="col">Åpningstid</Th>
      </Tr>
    </thead>

    <tbody>
      <Tr>
        <Th scope="rowgroup" colSpan={3}>
          Norge
        </Th>
      </Tr>

      <Tr variant="even">
        <Td>Oslo Børs</Td>
        <Td>
          <Badge content="Sanntid" />
        </Td>
        <Td>09:00-16:30 (UTC+1)</Td>
      </Tr>
      <Tr>
        <Td>NOTC (NFMF)</Td>
        <Td>
          <Badge content="15 minutter" />
        </Td>
        <Td>09:00-16:30 (UTC+1)</Td>
      </Tr>
    </tbody>

    <tbody>
      <Tr>
        <Th scope="rowgroup" colSpan={3}>
          Norden
        </Th>
      </Tr>

      <Tr variant="even">
        <Td>København</Td>
        <Td>
          <Badge content="15 minutter" />
        </Td>
        <Td>09:00-16:30 (UTC+1)</Td>
      </Tr>
      <Tr>
        <Td>Helsinki</Td>
        <Td>15 / Sanntid**</Td>
        <Td>09:00-16:30 (UTC+1)</Td>
      </Tr>
      <Tr>
        <Td>Stockholm</Td>
        <Td>15 / Sanntid**</Td>
        <Td>09:00-16:30 (UTC+1)</Td>
      </Tr>
    </tbody>
  </Table>
</Table.ScrollView>
`});function De(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,h5:`h5`,p:`p`,pre:`pre`,strong:`strong`,...xe(),...e.components},{Details:n,Summary:r,VisibilityByTheme:i,VisibleWhenVisualTest:a}=t;return n||$(`Details`,!0),Ee||$(`Examples`,!1),I||$(`Examples.Accordion`,!0),L||$(`Examples.AccordionMixed`,!0),R||$(`Examples.AccordionRow`,!0),P||$(`Examples.ClassHelpers`,!0),H||$(`Examples.ClickableCells`,!0),B||$(`Examples.ClickableRows`,!0),Z||$(`Examples.ColumnHighlight`,!0),N||$(`Examples.ContainerEmptyHeaderFooter`,!0),Y||$(`Examples.InCard`,!0),K||$(`Examples.InOneContainer`,!0),z||$(`Examples.KeyboardNavigation`,!0),F||$(`Examples.LongHeader`,!0),Q||$(`Examples.MultipleTbody`,!0),V||$(`Examples.NavigationMixed`,!0),A||$(`Examples.NoStriped`,!0),G||$(`Examples.PaginationTable`,!0),J||$(`Examples.ResponsiveInCard`,!0),k||$(`Examples.RowScopeOnly`,!0),E||$(`Examples.SizeMedium`,!0),D||$(`Examples.SizeSmall`,!0),M||$(`Examples.StackedContainer`,!0),U||$(`Examples.Sticky`,!0),W||$(`Examples.StickyMaxHeight`,!0),X||$(`Examples.TableInAccordionTable`,!0),T||$(`Examples.VariantBasic`,!0),q||$(`Examples.VariantCombinations`,!0),O||$(`Examples.VariantComplex`,!0),j||$(`Examples.VariantFixed`,!0),r||$(`Summary`,!0),i||$(`VisibilityByTheme`,!0),a||$(`VisibleWhenVisualTest`,!0),(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(t.h2,{children:`Demos`}),`
`,(0,C.jsx)(t.h3,{children:`Basic table`}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`NB:`}),` In this example, the sort buttons do react on your input. But will not change the table data.`]}),`
`,(0,C.jsx)(T,{}),`
`,(0,C.jsx)(t.h3,{children:`Complex table`}),`
`,(0,C.jsxs)(t.p,{children:[`You can force a row to overwrite the automated odd/even counting by providing e.g. `,(0,C.jsx)(t.code,{children:`variant="even"`}),` to a `,(0,C.jsx)(t.code,{children:`<Tr />`}),`. You can use this in combination with `,(0,C.jsx)(t.code,{children:`rowSpan`}),`.`]}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`NB:`}),` The table header in the first column needs to have `,(0,C.jsx)(t.code,{children:`scope="row"`}),`!`]}),`
`,(0,C.jsx)(O,{}),`
`,(0,C.jsx)(t.h3,{children:`Row scope headers only`}),`
`,(0,C.jsxs)(t.p,{children:[`This table has only `,(0,C.jsx)(t.code,{children:`scope="row"`}),` and `,(0,C.jsx)(t.code,{children:`scope="rowgroup"`}),` headers – without the default `,(0,C.jsx)(t.code,{children:`scope="col"`}),`.`]}),`
`,(0,C.jsx)(k,{}),`
`,(0,C.jsx)(t.h3,{children:`Disable striped rows`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`striped={false}`}),` to disable alternating row background colors.`]}),`
`,(0,C.jsx)(A,{}),`
`,(0,C.jsx)(t.h3,{children:`Fixed table`}),`
`,(0,C.jsx)(j,{}),`
`,(0,C.jsx)(t.h3,{children:`Medium and small sized`}),`
`,(0,C.jsx)(E,{}),`
`,(0,C.jsxs)(t.p,{children:[`A `,(0,C.jsx)(t.code,{children:`small`}),` sized table is only for special circumstances, where a lot of data needs to be shown on the screen at the same time.`]}),`
`,(0,C.jsx)(D,{}),`
`,(0,C.jsx)(t.h3,{children:`Table with accordion`}),`
`,(0,C.jsx)(t.h4,{children:`Expand a single container`}),`
`,(0,C.jsxs)(t.p,{children:[`The second table uses both a `,(0,C.jsx)(t.code,{children:`border`}),` and an `,(0,C.jsx)(t.code,{children:`outline`}),`.`]}),`
`,(0,C.jsx)(I,{}),`
`,(0,C.jsx)(t.h4,{children:`Expand additional rows`}),`
`,(0,C.jsx)(t.p,{children:`It's also possible to use accordion to expand the table with more rows.`}),`
`,(0,C.jsx)(R,{}),`
`,(0,C.jsx)(t.h5,{children:`Collapse all rows at once`}),`
`,(0,C.jsxs)(t.p,{children:[`You can collapse all expanded rows by sending a ref to the `,(0,C.jsx)(t.code,{children:`collapseAllHandleRef`}),` property and calling the `,(0,C.jsx)(t.code,{children:`.current()`}),` function on your ref.`]}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-jsx`,children:`const myTableCollapseAll = React.useRef<(() => void) | undefined>(undefined)

return (
  <button onClick={() => myTableCollapseAll.current?.()}>
    Close all rows
  </button>

  <Table mode="accordion" collapseAllHandleRef={myTableCollapseAll}>
    {/* ... your table code */}
  </Table>
)
`})}),`
`,(0,C.jsx)(t.h3,{children:`Table with clickable rows (navigation mode)`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`mode="navigation"`}),` on the `,(0,C.jsx)(t.code,{children:`<Table>`}),` and `,(0,C.jsx)(t.code,{children:`onClick`}),` on individual `,(0,C.jsx)(t.code,{children:`<Tr>`}),` rows to make them clickable. A chevron icon is rendered in an additional cell at the end of each clickable row for screen reader and keyboard accessibility. Rows respond to click as well as keyboard interaction with Space and Enter. Hover and focus indicators are sufficient to indicate interactivity per WCAG 1.4.1.`]}),`
`,(0,C.jsx)(B,{}),`
`,(0,C.jsx)(t.h3,{children:`Table with clickable cells`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`onClick`}),` on individual `,(0,C.jsx)(t.code,{children:`<Td>`}),` cells to make them clickable. A native `,(0,C.jsx)(t.code,{children:`<button>`}),` is rendered inside the cell for screen reader and keyboard accessibility. The chevron icon is included by default, but is only shown on hover, active, and keyboard focus. Use `,(0,C.jsx)(t.code,{children:`icon={false}`}),` to hide it entirely, or pass a custom icon. Hover and focus indicators are sufficient to indicate interactivity per WCAG 1.4.1.`]}),`
`,(0,C.jsxs)(t.p,{children:[`When the `,(0,C.jsx)(t.code,{children:`selected`}),` prop is provided (either `,(0,C.jsx)(t.code,{children:`true`}),` or `,(0,C.jsx)(t.code,{children:`false`}),`) together with `,(0,C.jsx)(t.code,{children:`onClick`}),`, the cell button is announced as a toggle button by screen readers, conveying its pressed state. The `,(0,C.jsx)(t.code,{children:`selected`}),` prop requires `,(0,C.jsx)(t.code,{children:`onClick`}),` to take effect, since the selected styling targets the cell button.`]}),`
`,(0,C.jsx)(H,{}),`
`,(0,C.jsx)(t.h3,{children:`Table with keyboard navigation`}),`
`,(0,C.jsxs)(t.p,{children:[`Use the `,(0,C.jsx)(t.code,{children:`useTableKeyboardNavigation`}),` hook to navigate between cells with arrow keys. Focusable elements inside cells (inputs, buttons) receive focus automatically.`]}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-jsx`,children:`import Table, {
  useTableKeyboardNavigation,
} from '@dnb/eufemia/components/Table'
`})}),`
`,(0,C.jsx)(z,{}),`
`,(0,C.jsx)(t.h3,{children:`Table with sticky header`}),`
`,(0,C.jsx)(U,{}),`
`,(0,C.jsx)(t.h3,{children:`Table with a max height`}),`
`,(0,C.jsxs)(t.p,{children:[`A sticky table header with `,(0,C.jsx)(t.code,{children:`sticky="css-position"`}),` and `,(0,C.jsx)(t.code,{children:`max-height`}),` on the `,(0,C.jsx)(t.code,{children:`Table.ScrollView`}),`.`]}),`
`,(0,C.jsx)(W,{}),`
`,(0,C.jsx)(t.h3,{children:`Several tables in one container`}),`
`,(0,C.jsxs)(n,{children:[(0,C.jsx)(r,{children:`How the import and syntax is structured.`}),(0,C.jsx)(K,{})]}),`
`,(0,C.jsx)(M,{}),`
`,(0,C.jsxs)(t.p,{children:[`With no (empty) `,(0,C.jsx)(t.code,{children:`head`}),` and `,(0,C.jsx)(t.code,{children:`foot`}),` content.`]}),`
`,(0,C.jsx)(N,{}),`
`,(0,C.jsx)(t.h3,{children:`Table with long header text (wrapping)`}),`
`,(0,C.jsx)(F,{}),`
`,(0,C.jsx)(t.h3,{children:`Table with pagination`}),`
`,(0,C.jsx)(i,{visible:`sbanken`,children:(0,C.jsx)(t.p,{children:`This example is not yet fully supported using the Sbanken theme.`})}),`
`,(0,C.jsx)(G,{}),`
`,(0,C.jsx)(t.h2,{children:`Table in Card`}),`
`,(0,C.jsxs)(t.p,{children:[`Using the `,(0,C.jsx)(t.strong,{children:`subtle`}),` `,(0,C.jsx)(t.code,{children:`variant`}),` on the `,(0,C.jsx)(t.code,{children:`<Th>`}),`.
The first `,(0,C.jsx)(t.code,{children:`<Tr>`}),` has the property `,(0,C.jsx)(t.code,{children:`variant="even"`}),` which will ensure a border below it to visually separate it from the body rows.`]}),`
`,(0,C.jsx)(Y,{}),`
`,(0,C.jsx)(t.h3,{children:`Responsive table in a Card`}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`NB:`}),` For tables with lots of content, it's best to avoid repeating the header for each row. This can be overwhelming for users who rely on screen readers.`]}),`
`,(0,C.jsxs)(t.p,{children:[`Also, it is important that the `,(0,C.jsx)(t.code,{children:`<td>`}),` without a `,(0,C.jsx)(t.code,{children:`<th>`}),` has a `,(0,C.jsx)(t.code,{children:`aria-label={header.title}`}),` to let users with screen readers know where "these tools" belong to.`]}),`
`,(0,C.jsxs)(t.p,{children:[`This example uses `,(0,C.jsx)(t.code,{children:`scope="row"`}),` with a table header (`,(0,C.jsx)(t.code,{children:`<th>`}),`) in each row.`]}),`
`,(0,C.jsx)(J,{}),`
`,(0,C.jsx)(t.h3,{children:`Cell highlighting`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`highlight`}),` on `,(0,C.jsx)(t.code,{children:`<Th>`}),`, `,(0,C.jsx)(t.code,{children:`<Tr>`}),`, or `,(0,C.jsx)(t.code,{children:`<Td>`}),` to apply a subtle background and border. When set on a `,(0,C.jsx)(t.code,{children:`<Tr>`}),`, all cells in that row are highlighted. You can also set it on individual `,(0,C.jsx)(t.code,{children:`<Td>`}),` cells.`]}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`NB:`}),` Highlighted cells should include an `,(0,C.jsx)(t.code,{children:`aria-label`}),` that conveys both the highlight state and the reason for it. Screen reader users cannot perceive the visual highlight, so this label is their only way to understand that a cell stands out and why.`]}),`
`,(0,C.jsxs)(t.p,{children:[`To adjust the border colors accordingly, use the `,(0,C.jsx)(t.code,{children:`useTableHighlight`}),` hook and pass the returned ref to `,(0,C.jsx)(t.code,{children:`<Table>`}),`.`]}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-tsx`,children:`import Table, { useTableHighlight } from '@dnb/eufemia/components/Table'

const highlightRef = useTableHighlight()
render(<Table ref={highlightRef}>...</Table>)
`})}),`
`,(0,C.jsx)(Z,{}),`
`,(0,C.jsx)(t.h3,{children:`Multiple table body sections`}),`
`,(0,C.jsx)(Q,{}),`
`,(0,C.jsx)(t.h3,{children:`Example usage with classes`}),`
`,(0,C.jsx)(P,{}),`
`,(0,C.jsx)(a,{children:(0,C.jsx)(q,{})}),`
`,(0,C.jsxs)(a,{children:[(0,C.jsx)(L,{}),(0,C.jsx)(V,{}),(0,C.jsx)(X,{})]})]})}function Oe(e={}){let{wrapper:t}={...xe(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(De,{...e})}):De(e)}function $(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{Oe as default};