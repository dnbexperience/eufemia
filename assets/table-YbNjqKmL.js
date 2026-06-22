import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-BTKuQMC3.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components},{Details:r,Summary:a}=t;return r||s(`Details`,!0),a||s(`Summary`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Table } from '@dnb/eufemia'

// Or with sub-components and hooks:
import Table, {
  Th,
  Td,
  Tr,
  useTableKeyboardNavigation,
} from '@dnb/eufemia/components/Table'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`The Table component is an all-inclusive and accessible table based on correct HTML semantics.`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1499`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/table`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/table`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`Please use the properties instead of overwriting the styles. If you miss a feature, get in `,(0,i.jsx)(t.a,{href:`/contribute/contact/`,children:`touch with us`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` If you have more than three (3) columns, please consider using the `,(0,i.jsx)(t.code,{children:`border`}),` property to enhance accessibility.`]}),`
`,(0,i.jsx)(t.h3,{children:`Accessibility`}),`
`,(0,i.jsx)(t.p,{children:`Tables both serve as a way of navigation for screen readers and other assistive technologies, and help to give data an ordered structure.`}),`
`,(0,i.jsxs)(t.p,{children:[`Use the documentation from `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table`,children:`MDN – The Table element`}),` for more information on making semantic correct tables, including `,(0,i.jsx)(t.code,{children:`scope`}),`, `,(0,i.jsx)(t.code,{children:`align`}),`, `,(0,i.jsx)(t.code,{children:`colSpan`}),` and `,(0,i.jsx)(t.code,{children:`rowSpan`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`Here is a list of things you may follow along in order to ensure your coded tables still are accessible:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Keep a semantic correct structure.`}),`
`,(0,i.jsx)(t.li,{children:`Let tables align the column width, when possible.`}),`
`,(0,i.jsxs)(t.li,{children:[`Do not use CSS `,(0,i.jsx)(t.code,{children:`display`}),` property on any table element.`]}),`
`,(0,i.jsx)(t.li,{children:`Do not overwrite styles in general, but rather get in touch with DNB UX.`}),`
`,(0,i.jsx)(t.li,{children:`Never put a table inside a table.`}),`
`,(0,i.jsx)(t.li,{children:`Text inside tables do not need to be wrapped inside a paragraph as well. They give screen readers no additional useful information.`}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Table header components`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`<Th.SortButton />`}),` to be used for additional sorting functionality.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`<Th.HelpButton />`}),` to be used for help related content.`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Alignment`}),`
`,(0,i.jsxs)(t.p,{children:[`Use e.g. `,(0,i.jsx)(t.code,{children:`align="right"`}),` on a `,(0,i.jsx)(t.code,{children:`<Th>`}),`, `,(0,i.jsx)(t.code,{children:`<Td>`}),` or `,(0,i.jsx)(t.code,{children:`<Tr>`}),` to align a table header or a table data element.`]}),`
`,(0,i.jsx)(t.h3,{children:`Fixed layout`}),`
`,(0,i.jsxs)(t.p,{children:[`You may consider using `,(0,i.jsx)(t.code,{children:`table-layout: fixed;`}),`. You can use the modifier property `,(0,i.jsx)(t.code,{children:`fixed`}),` for doing so and combine it with CSS e.g. `,(0,i.jsx)(t.code,{children:`width: 40%`}),` on specific table headers.`]}),`
`,(0,i.jsx)(t.h3,{children:`Scrollable`}),`
`,(0,i.jsxs)(t.p,{children:[`Depending on your situation, you may want to wrap your Table within `,(0,i.jsx)(t.code,{children:`Table.ScrollView`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Table } from '@dnb/eufemia'

render(
  <Table.ScrollView>
    <Table />
  </Table.ScrollView>
)
`})}),`
`,(0,i.jsx)(t.h3,{children:`Sticky header`}),`
`,(0,i.jsx)(t.p,{children:`You have two options (both have their downsides):`}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[`use `,(0,i.jsx)(t.code,{children:`sticky={true}`}),`. It works even when using a `,(0,i.jsx)(t.code,{children:`Table.ScrollView`}),` or when `,(0,i.jsx)(t.code,{children:`overflow: hidden;`}),` is used on any parent elements. It also works inside a `,(0,i.jsx)(t.a,{href:`/uilib/components/drawer`,children:`Drawer`}),`. The downside is that it uses JavaScript and the browser may drop some frames, which results in potential flickering during scrolling.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[`use `,(0,i.jsx)(t.code,{children:`sticky="css-position"`}),` for using the CSS `,(0,i.jsx)(t.code,{children:`position: sticky;`}),` method. It is super smooth. But then you cannot use a `,(0,i.jsx)(t.code,{children:`overflow: hidden;`}),` or `,(0,i.jsx)(t.code,{children:`overflow: auto;`}),` on any parent elements. This is a known issue happening on every modern browser.`]}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`Method no. 2 should be used when a `,(0,i.jsx)(t.code,{children:`max-height`}),` is set to the wrapping `,(0,i.jsx)(t.code,{children:`Table.ScrollView`}),` e.g.:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Table.ScrollView style={{ maxHeight: '20rem' }}>
  <Table sticky="css-position" />
</Table.ScrollView>
`})}),`
`,(0,i.jsxs)(t.p,{children:[`Have a `,(0,i.jsx)(t.a,{href:`/uilib/components/table/demos/#table-with-a-max-height`,children:`look at this example`}),`.`]}),`
`,(0,i.jsx)(t.h3,{children:`Sortable table`}),`
`,(0,i.jsxs)(t.p,{children:[`Optionally, make use of the following React Hook to handle the `,(0,i.jsx)(t.code,{children:`Th.SortButton`}),` directions.`]}),`
`,(0,i.jsx)(t.p,{children:`It can be used as a "controller" for your own sorting logic of your data.`}),`
`,(0,i.jsxs)(t.p,{children:[`By default, it will cycle through three stages `,(0,i.jsx)(t.code,{children:`['asc', 'desc', 'off']`}),`.`]}),`
`,(0,i.jsxs)(r,{children:[(0,i.jsx)(a,{children:`How to use the useHandleSortState React Hook.`}),(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'

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
`,(0,i.jsx)(t.h3,{children:`Keyboard navigation`}),`
`,(0,i.jsxs)(t.p,{children:[`Use the `,(0,i.jsx)(t.code,{children:`useTableKeyboardNavigation`}),` hook to enable arrow-key navigation between table cells. When a cell contains a focusable element (such as an input, button, or link), that element receives focus. Otherwise, the cell itself is focused.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import Table, {
  useTableKeyboardNavigation,
} from '@dnb/eufemia/components/Table'

function MyTable() {
  const navRef = useTableKeyboardNavigation()

  return (
    <Table ref={navRef}>
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
  )
}
`})}),`
`,(0,i.jsx)(t.p,{children:`The hook accepts an optional options object:`}),`
`,(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:`Option`}),(0,i.jsx)(t.th,{children:`Type`}),(0,i.jsx)(t.th,{children:`Default`}),(0,i.jsx)(t.th,{children:`Description`})]})}),(0,i.jsx)(t.tbody,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`enabled`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`boolean`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`true`})}),(0,i.jsx)(t.td,{children:`Whether keyboard navigation is active`})]})})]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};