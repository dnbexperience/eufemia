import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import"./Examples-CiIRVvEp.js";import n from"./demos-C4UNxMN7.js";var r=e();function i(e){let n={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`To make it easier to build application layout and `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms`,children:`form`}),`-views in line with defined design sketches, there are a number of components for layout.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components`,children:`Source code`})}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.a,{href:`/uilib/layout/spacing`,children:`Spacing`})}),` table and information.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.a,{href:`/uilib/layout/media-queries`,children:`Media Queries`})}),` and breakpoints table and information.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.a,{href:`/uilib/layout/flex`,children:`Flex`})}),` is a building block for CSS flexbox based layout of contents, components and `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms`,children:`forms`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.a,{href:`/uilib/layout/grid`,children:`Grid`})}),` is a layout system for CSS grid based layout of contents.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.a,{href:`/uilib/layout/space`,children:`Space`})}),` is a component that provides `,(0,r.jsx)(n.code,{children:`margins`}),` within the `,(0,r.jsx)(n.a,{href:`/uilib/usage/layout/spacing#spacing-helpers`,children:`provided spacing patterns`}),`.`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Units and responsiveness`}),`
`,(0,r.jsxs)(n.p,{children:[`Please – use `,(0,r.jsx)(n.code,{children:`rem`}),` instead of `,(0,r.jsx)(n.code,{children:`px`}),` for all of your custom CSS, and make sure;`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`you always use the nearest half `,(0,r.jsx)(n.code,{children:`rem`}),` value, like `,(0,r.jsx)(n.em,{children:`0.5rem`}),`, `,(0,r.jsx)(n.em,{children:`1rem`}),` or `,(0,r.jsx)(n.em,{children:`1.5rem`}),` and so forth.`]}),`
`,(0,r.jsxs)(n.li,{children:[`you always get a `,(0,r.jsx)(n.strong,{children:`total computed height`}),` within the grid.`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`This results in maintaining the integrity of the `,(0,r.jsx)(n.strong,{children:`8px`}),` base grid.`]}),`
`,(0,r.jsx)(n.h3,{children:`Exceptions`}),`
`,(0,r.jsxs)(n.p,{children:[`There are exceptions for when you define a "minimum" of an area, such as `,(0,r.jsx)(n.code,{children:`min-width`}),`. Because it will increase in size when a larger browser font-size is used. In that case, user `,(0,r.jsx)(n.code,{children:`px`}),` as your sizing unit.`]}),`
`,(0,r.jsx)(n.h3,{children:`Smaller Units`}),`
`,(0,r.jsxs)(n.p,{children:[`Sometimes you may need a compensation of only a few pixels. Heres how to calculate the correct `,(0,r.jsx)(n.em,{children:`rem`}),` values:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`1px = `,(0,r.jsx)(n.code,{children:`1/16x1`}),` = `,(0,r.jsx)(n.strong,{children:`0.0625rem`})]}),`
`,(0,r.jsxs)(n.li,{children:[`2px = `,(0,r.jsx)(n.code,{children:`1/16x2`}),` = `,(0,r.jsx)(n.strong,{children:`0.125rem`})]}),`
`,(0,r.jsx)(n.li,{children:`And so on ...`}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Columns`}),`
`,(0,r.jsx)(n.p,{children:`UX designers are using a 12 column system, along with a 4 and 6 column system, during their design processes.`}),`
`,(0,r.jsx)(n.h3,{children:`What are the differences between Flex and Grid?`}),`
`,(0,r.jsx)(n.p,{children:`Both to support different sizing of items on different media breakpoints.`}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:`Flex`})}),`
`,(0,r.jsxs)(n.p,{children:[`Uses CSS `,(0,r.jsx)(n.code,{children:`flexbox`}),`.`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Best suited for Forms layout.`}),`
`,(0,r.jsx)(n.li,{children:`Can either stack vertically or horizontally.`}),`
`,(0,r.jsx)(n.li,{children:`Can be used with any kind of children.`}),`
`,(0,r.jsx)(n.li,{children:`Even distribution of space.`}),`
`,(0,r.jsx)(n.li,{children:`Keeps order of items like they were given in the DOM structure.`}),`
`,(0,r.jsx)(n.li,{children:`Items can be sized in percentage.`}),`
`,(0,r.jsx)(n.li,{children:`When a size (percentage) is given, they stack horizontally.`}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Flex } from '@dnb/eufemia'
render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
    <OtherComponent>content</OtherComponent>
  </Flex.Container>
)
`})}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:`Grid`})}),`
`,(0,r.jsxs)(n.p,{children:[`Uses CSS `,(0,r.jsx)(n.code,{children:`grid`}),`.`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Best suited for applications with a column based layout.`}),`
`,(0,r.jsx)(n.li,{children:`Columns do change between 4, 6 and 12 on the given size (media query) of the browser or screen size.`}),`
`,(0,r.jsx)(n.li,{children:`The Grid.Container depends on Grid.Item.`}),`
`,(0,r.jsx)(n.li,{children:`Items do span from column "a" to "b".`}),`
`,(0,r.jsx)(n.li,{children:`Items can have different order in opposition from what's given in the DOM structure.`}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Grid } from '@dnb/eufemia'

render(
  <Grid.Container>
    <Grid.Item>content</Grid.Item>
    <Grid.Item>content</Grid.Item>
  </Grid.Container>
)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};