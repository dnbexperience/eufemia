import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-DSo_IO5g.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{Details:i,Summary:a}=n;return i||o(`Details`,!0),a||o(`Summary`,!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Table } from '@dnb/eufemia'

// Or with sub-components and hooks:
import Table, {
  Th,
  Td,
  Tr,
  useTableKeyboardNavigation,
} from '@dnb/eufemia/components/Table'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`The Table component is an all-inclusive and accessible table based on correct HTML semantics.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1499`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/table`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/table`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`Please use the properties instead of overwriting the styles. If you miss a feature, get in `,(0,r.jsx)(n.a,{href:`/contribute/contact/`,children:`touch with us`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` If you have more than three (3) columns, please consider using the `,(0,r.jsx)(n.code,{children:`border`}),` property to enhance accessibility.`]}),`
`,(0,r.jsx)(n.h3,{children:`Accessibility`}),`
`,(0,r.jsx)(n.p,{children:`Tables both serve as a way of navigation for screen readers and other assistive technologies, and help to give data an ordered structure.`}),`
`,(0,r.jsxs)(n.p,{children:[`Use the documentation from `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table`,children:`MDN – The Table element`}),` for more information on making semantic correct tables, including `,(0,r.jsx)(n.code,{children:`scope`}),`, `,(0,r.jsx)(n.code,{children:`align`}),`, `,(0,r.jsx)(n.code,{children:`colSpan`}),` and `,(0,r.jsx)(n.code,{children:`rowSpan`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`Here is a list of things you may follow along in order to ensure your coded tables still are accessible:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Keep a semantic correct structure.`}),`
`,(0,r.jsx)(n.li,{children:`Let tables align the column width, when possible.`}),`
`,(0,r.jsxs)(n.li,{children:[`Do not use CSS `,(0,r.jsx)(n.code,{children:`display`}),` property on any table element.`]}),`
`,(0,r.jsx)(n.li,{children:`Do not overwrite styles in general, but rather get in touch with DNB UX.`}),`
`,(0,r.jsx)(n.li,{children:`Never put a table inside a table.`}),`
`,(0,r.jsx)(n.li,{children:`Text inside tables do not need to be wrapped inside a paragraph as well. They give screen readers no additional useful information.`}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Table header components`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`<Th.SortButton />`}),` to be used for additional sorting functionality.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`<Th.HelpButton />`}),` to be used for help related content.`]}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Alignment`}),`
`,(0,r.jsxs)(n.p,{children:[`Use e.g. `,(0,r.jsx)(n.code,{children:`align="right"`}),` on a `,(0,r.jsx)(n.code,{children:`<Th>`}),`, `,(0,r.jsx)(n.code,{children:`<Td>`}),` or `,(0,r.jsx)(n.code,{children:`<Tr>`}),` to align a table header or a table data element.`]}),`
`,(0,r.jsx)(n.h3,{children:`Fixed layout`}),`
`,(0,r.jsxs)(n.p,{children:[`You may consider using `,(0,r.jsx)(n.code,{children:`table-layout: fixed;`}),`. You can use the modifier property `,(0,r.jsx)(n.code,{children:`fixed`}),` for doing so and combine it with CSS e.g. `,(0,r.jsx)(n.code,{children:`width: 40%`}),` on specific table headers.`]}),`
`,(0,r.jsx)(n.h3,{children:`Scrollable`}),`
`,(0,r.jsxs)(n.p,{children:[`Depending on your situation, you may want to wrap your Table within `,(0,r.jsx)(n.code,{children:`Table.ScrollView`}),`:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Table } from '@dnb/eufemia'

render(
  <Table.ScrollView>
    <Table />
  </Table.ScrollView>
)
`})}),`
`,(0,r.jsx)(n.h3,{children:`Sticky header`}),`
`,(0,r.jsx)(n.p,{children:`You have two options (both have their downsides):`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[`use `,(0,r.jsx)(n.code,{children:`sticky={true}`}),`. It works even when using a `,(0,r.jsx)(n.code,{children:`Table.ScrollView`}),` or when `,(0,r.jsx)(n.code,{children:`overflow: hidden;`}),` is used on any parent elements. It also works inside a `,(0,r.jsx)(n.a,{href:`/uilib/components/drawer`,children:`Drawer`}),`. The downside is that it uses JavaScript and the browser may drop some frames, which results in potential flickering during scrolling.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[`use `,(0,r.jsx)(n.code,{children:`sticky="css-position"`}),` for using the CSS `,(0,r.jsx)(n.code,{children:`position: sticky;`}),` method. It is super smooth. But then you cannot use a `,(0,r.jsx)(n.code,{children:`overflow: hidden;`}),` or `,(0,r.jsx)(n.code,{children:`overflow: auto;`}),` on any parent elements. This is a known issue happening on every modern browser.`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`Method no. 2 should be used when a `,(0,r.jsx)(n.code,{children:`max-height`}),` is set to the wrapping `,(0,r.jsx)(n.code,{children:`Table.ScrollView`}),` e.g.:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`<Table.ScrollView style={{ maxHeight: '20rem' }}>
  <Table sticky="css-position" />
</Table.ScrollView>
`})}),`
`,(0,r.jsxs)(n.p,{children:[`Have a `,(0,r.jsx)(n.a,{href:`/uilib/components/table/demos/#table-with-a-max-height`,children:`look at this example`}),`.`]}),`
`,(0,r.jsx)(n.h3,{children:`Sortable table`}),`
`,(0,r.jsxs)(n.p,{children:[`Optionally, make use of the following React Hook to handle the `,(0,r.jsx)(n.code,{children:`Th.SortButton`}),` directions.`]}),`
`,(0,r.jsx)(n.p,{children:`It can be used as a "controller" for your own sorting logic of your data.`}),`
`,(0,r.jsxs)(n.p,{children:[`By default, it will cycle through three stages `,(0,r.jsx)(n.code,{children:`['asc', 'desc', 'off']`}),`.`]}),`
`,(0,r.jsxs)(i,{children:[(0,r.jsx)(a,{children:`How to use the useHandleSortState React Hook.`}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'

// You can also provide a default that will be used as the fallback e.g.
const defaultOptions = { direction: 'asc', modes: ['asc', 'desc', 'off'] }

export const YourComponent = () => {
  const { sortState, sortHandler, activeSortName } = useHandleSortState(
    {
      // Define your column names with options (optional)
      column1: { active: true }, //
      column2: { direction: 'desc', modes: ['asc', 'desc'] }, // overwrite the defaultOptions
      column3: { modes: ['asc', 'off'] }, // will only allow one direction
      column4: {}, // etc.
    },
    defaultOptions
  )

  // Use these properties for your custom sorting logic
  console.log(sortState.column1.direction) // returns either "asc", "desc" or "off"
  console.log(activeSortName) // returns the current active one: "column1" (returns null when nothing is active)

  // Handle your logic
  useEffect(() => {
    switch (sortState.column1.direction) {
      default:
      case 'asc':
        setYourLocalState(mockData.sort(compareFunctionAsc))
        break

      case 'desc':
        setYourLocalState(mockData.sort(compareFunctionsDesc))
        break

      case 'off':
        setYourLocalState(mockData)
        break
    }
  }, [sortState.column1.direction])

  return (
    <Table>
      <thead>
        <Tr>
          <Th
            sortable
            active={sortState.column1.active}
            reversed={sortState.column1.reversed}
          >
            <Th.SortButton
              text="Column 1"
              title="Sort this column"
              onClick={sortHandler.column1}
            />
          </Th>
        </Tr>
      </thead>
    </Table>
  )
}
`})})]}),`
`,(0,r.jsx)(n.h3,{children:`Keyboard navigation`}),`
`,(0,r.jsxs)(n.p,{children:[`Use the `,(0,r.jsx)(n.code,{children:`useTableKeyboardNavigation`}),` hook to enable arrow-key navigation between table cells. When a cell contains a focusable element (such as an input, button, or link), that element receives focus. Otherwise, the cell itself is focused.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import Table, {
  useTableKeyboardNavigation,
} from '@dnb/eufemia/components/Table'

function MyTable() {
  const navRef = useTableKeyboardNavigation()

  return (
    <div ref={navRef}>
      <Table>
        <tbody>
          <tr>
            <Table.Td>
              <input />
            </Table.Td>
            <Table.Td>
              <input />
            </Table.Td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
`})}),`
`,(0,r.jsx)(n.p,{children:`The hook accepts an optional options object:`}),`
`,(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:`Option`}),(0,r.jsx)(n.th,{children:`Type`}),(0,r.jsx)(n.th,{children:`Default`}),(0,r.jsx)(n.th,{children:`Description`})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:`enabled`})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:`boolean`})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:`true`})}),(0,r.jsx)(n.td,{children:`Whether keyboard navigation is active`})]})})]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function s(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(s,{...e})}):s(e)}export{c as default};