import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import r from"./demos-Dy-i_N3K.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`To make it easier to build application layout and `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms`,children:`form`}),`-views in line with defined design sketches, there are a number of components for layout.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components`,children:`Source code`})}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.a,{href:`/uilib/layout/spacing`,children:`Spacing`})}),` table and information.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.a,{href:`/uilib/layout/media-queries`,children:`Media Queries`})}),` and breakpoints table and information.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.a,{href:`/uilib/layout/flex`,children:`Flex`})}),` is a building block for CSS flexbox based layout of contents, components and `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms`,children:`forms`}),`.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.a,{href:`/uilib/layout/grid`,children:`Grid`})}),` is a layout system for CSS grid based layout of contents.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.a,{href:`/uilib/layout/space`,children:`Space`})}),` is a component that provides `,(0,i.jsx)(t.code,{children:`margins`}),` within the `,(0,i.jsx)(t.a,{href:`/uilib/layout/spacing#spacing-helpers`,children:`provided spacing patterns`}),`.`]}),`
`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Units and responsiveness`}),`
`,(0,i.jsxs)(t.p,{children:[`Please – use `,(0,i.jsx)(t.code,{children:`rem`}),` instead of `,(0,i.jsx)(t.code,{children:`px`}),` for all of your custom CSS, and make sure;`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`you always use the nearest half `,(0,i.jsx)(t.code,{children:`rem`}),` value, like `,(0,i.jsx)(t.em,{children:`0.5rem`}),`, `,(0,i.jsx)(t.em,{children:`1rem`}),` or `,(0,i.jsx)(t.em,{children:`1.5rem`}),` and so forth.`]}),`
`,(0,i.jsxs)(t.li,{children:[`you always get a `,(0,i.jsx)(t.strong,{children:`total computed height`}),` within the grid.`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`This results in maintaining the integrity of the `,(0,i.jsx)(t.strong,{children:`8px`}),` base grid.`]}),`
`,(0,i.jsx)(t.h3,{children:`Exceptions`}),`
`,(0,i.jsxs)(t.p,{children:[`There are exceptions for when you define a "minimum" of an area, such as `,(0,i.jsx)(t.code,{children:`min-width`}),`. Because it will increase in size when a larger browser font-size is used. In that case, user `,(0,i.jsx)(t.code,{children:`px`}),` as your sizing unit.`]}),`
`,(0,i.jsx)(t.h3,{children:`Smaller Units`}),`
`,(0,i.jsxs)(t.p,{children:[`Sometimes you may need a compensation of only a few pixels. Heres how to calculate the correct `,(0,i.jsx)(t.em,{children:`rem`}),` values:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`1px = `,(0,i.jsx)(t.code,{children:`1/16x1`}),` = `,(0,i.jsx)(t.strong,{children:`0.0625rem`})]}),`
`,(0,i.jsxs)(t.li,{children:[`2px = `,(0,i.jsx)(t.code,{children:`1/16x2`}),` = `,(0,i.jsx)(t.strong,{children:`0.125rem`})]}),`
`,(0,i.jsx)(t.li,{children:`And so on ...`}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Columns`}),`
`,(0,i.jsx)(t.p,{children:`UX designers are using a 12 column system, along with a 4 and 6 column system, during their design processes.`}),`
`,(0,i.jsx)(t.h3,{children:`What are the differences between Flex and Grid?`}),`
`,(0,i.jsx)(t.p,{children:`Both to support different sizing of items on different media breakpoints.`}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Flex`})}),`
`,(0,i.jsxs)(t.p,{children:[`Uses CSS `,(0,i.jsx)(t.code,{children:`flexbox`}),`.`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Best suited for Forms layout.`}),`
`,(0,i.jsx)(t.li,{children:`Can either stack vertically or horizontally.`}),`
`,(0,i.jsx)(t.li,{children:`Can be used with any kind of children.`}),`
`,(0,i.jsx)(t.li,{children:`Even distribution of space.`}),`
`,(0,i.jsx)(t.li,{children:`Keeps order of items like they were given in the DOM structure.`}),`
`,(0,i.jsx)(t.li,{children:`Items can be sized in percentage.`}),`
`,(0,i.jsx)(t.li,{children:`When a size (percentage) is given, they stack horizontally.`}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Flex } from '@dnb/eufemia'
render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
    <OtherComponent>content</OtherComponent>
  </Flex.Container>
)
`})}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Grid`})}),`
`,(0,i.jsxs)(t.p,{children:[`Uses CSS `,(0,i.jsx)(t.code,{children:`grid`}),`.`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Best suited for applications with a column based layout.`}),`
`,(0,i.jsx)(t.li,{children:`Columns do change between 4, 6 and 12 on the given size (media query) of the browser or screen size.`}),`
`,(0,i.jsx)(t.li,{children:`The Grid.Container depends on Grid.Item.`}),`
`,(0,i.jsx)(t.li,{children:`Items do span from column "a" to "b".`}),`
`,(0,i.jsx)(t.li,{children:`Items can have different order in opposition from what's given in the DOM structure.`}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Grid } from '@dnb/eufemia'

render(
  <Grid.Container>
    <Grid.Item>content</Grid.Item>
    <Grid.Item>content</Grid.Item>
  </Grid.Container>
)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};