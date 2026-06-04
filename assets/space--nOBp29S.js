import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import{t as r}from"./spacing-table-DBt--j2V.js";import{g as i,h as a,m as o,n as s,r as c,t as l}from"./Examples-BTIin1SC.js";import u from"./demos-BW8RZRvC.js";var d=e(t());function f(e){let t={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return s||m(`Examples`,!1),l||m(`Examples.Components`,!0),c||m(`Examples.FourDirections`,!0),o||m(`Examples.SameResult1`,!0),a||m(`Examples.SameResult2`,!0),i||m(`Examples.Shorthand`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Import`}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`import { Space } from '@dnb/eufemia'
`})}),`
`,(0,d.jsx)(t.h2,{children:`Description`}),`
`,(0,d.jsxs)(t.p,{children:[`The Space component provides `,(0,d.jsx)(t.code,{children:`margins`}),` and inner `,(0,d.jsx)(t.code,{children:`padding`}),` within the `,(0,d.jsx)(t.a,{href:`/uilib/layout/spacing#spacing-helpers`,children:`provided spacing patterns`}),`.`]}),`
`,(0,d.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,d.jsxs)(t.ul,{children:[`
`,(0,d.jsx)(t.li,{children:(0,d.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/space`,children:`Source code`})}),`
`,(0,d.jsx)(t.li,{children:(0,d.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/space`,children:`Docs code`})}),`
`]}),`
`,(0,d.jsx)(t.p,{children:`The reason this exists is to make your syntax as clean as possible. This way, you see directly in words what the spacing is for every affected component.`}),`
`,(0,d.jsx)(t.h3,{children:`Spacing Table`}),`
`,(0,d.jsx)(r,{}),`
`,(0,d.jsx)(t.h3,{children:`Value Format`}),`
`,(0,d.jsx)(t.p,{children:`There are a couple of different ways you can define the spacing types and values:`}),`
`,(0,d.jsxs)(t.ul,{children:[`
`,(0,d.jsxs)(t.li,{children:[(0,d.jsx)(t.strong,{children:`Types:`}),` `,(0,d.jsx)(t.code,{children:`small small x-small`}),` (combine types up to `,(0,d.jsx)(t.em,{children:`10rem`}),`)`]}),`
`,(0,d.jsxs)(t.li,{children:[(0,d.jsx)(t.strong,{children:`number:`}),` `,(0,d.jsx)(t.code,{children:`2.5`}),` (equivalent to `,(0,d.jsx)(t.code,{children:`rem`}),`)`]}),`
`,(0,d.jsxs)(t.li,{children:[(0,d.jsx)(t.strong,{children:`string(rem):`}),` `,(0,d.jsx)(t.code,{children:`2.5rem`})]}),`
`,(0,d.jsxs)(t.li,{children:[(0,d.jsx)(t.strong,{children:`string(px):`}),` `,(0,d.jsx)(t.code,{children:`40px`}),` (gets converted to `,(0,d.jsx)(t.code,{children:`rem`}),`)`]}),`
`,(0,d.jsxs)(t.li,{children:[(0,d.jsx)(t.strong,{children:`boolean:`}),` `,(0,d.jsx)(t.code,{children:`true`}),` (equivalent to `,(0,d.jsx)(t.code,{children:`small`}),`), `,(0,d.jsx)(t.code,{children:`false`}),` (equivalent to `,(0,d.jsx)(t.code,{children:`zero`}),`)`]}),`
`]}),`
`,(0,d.jsxs)(t.p,{children:[`To get a spacing of e.g. `,(0,d.jsx)(t.strong,{children:`2.5rem`}),` (40px), you may combine types `,(0,d.jsx)(t.code,{children:`large`}),` and `,(0,d.jsx)(t.code,{children:`x-small`}),`.`]}),`
`,(0,d.jsx)(o,{}),`
`,(0,d.jsx)(t.p,{children:`With React, you can also use an object with the different directions:`}),`
`,(0,d.jsx)(a,{}),`
`,(0,d.jsx)(t.h3,{children:`Components and Spacing`}),`
`,(0,d.jsxs)(t.p,{children:[`Every component supports the spacing patterns, so it's possible to send in the `,(0,d.jsx)(t.code,{children:`top`}),`, `,(0,d.jsx)(t.code,{children:`right`}),`, `,(0,d.jsx)(t.code,{children:`bottom`}),`, `,(0,d.jsx)(t.code,{children:`left`}),` and `,(0,d.jsx)(t.code,{children:`space`}),` properties directly, like:`]}),`
`,(0,d.jsx)(l,{}),`
`,(0,d.jsx)(t.h3,{children:`Spacing shorthands`}),`
`,(0,d.jsx)(t.p,{children:`A shorthand for getting 1rem (most used) is to simply send in a boolean set as true. No given value in JSX means true, so you only need the property key:`}),`
`,(0,d.jsx)(i,{}),`
`,(0,d.jsxs)(t.p,{children:[`In order to set all four directions at once, you can provide a string as the `,(0,d.jsx)(t.code,{children:`space`}),` value:`]}),`
`,(0,d.jsx)(c,{}),`
`,(0,d.jsx)(t.h3,{children:`Does it not work as expected?`}),`
`,(0,d.jsxs)(t.p,{children:[`Is `,(0,d.jsx)(t.code,{children:`margin`}),` not giving the expected spacing? That may be due to `,(0,d.jsx)(t.strong,{children:`Margin Collapsing`}),`. Margins collapse in the following situations:`]}),`
`,(0,d.jsxs)(t.ul,{children:[`
`,(0,d.jsx)(t.li,{children:`Adjacent siblings`}),`
`,(0,d.jsx)(t.li,{children:`Completely empty boxes`}),`
`,(0,d.jsx)(t.li,{children:`Parent and first or last child element`}),`
`]}),`
`,(0,d.jsxs)(t.p,{children:[`The best solution is to only use one direction of margins, e.g. `,(0,d.jsx)(t.code,{children:`bottom`}),`. Or you can set the `,(0,d.jsx)(t.a,{href:`/uilib/layout/space/properties`,children:`collapse property`}),` to `,(0,d.jsx)(t.code,{children:`false`}),`.`]}),`
`,(0,d.jsx)(t.h3,{children:`Margin collapsing`}),`
`,(0,d.jsxs)(t.p,{children:[`In order to help handle unwanted margin collapsing in typography elements, see `,(0,d.jsx)(t.a,{href:`/uilib/elements/heading#example-of-margin-collapsing`,children:`this example`}),`.`]}),`
`,(0,d.jsx)(t.h3,{children:`Conditional Reset`}),`
`,(0,d.jsxs)(t.p,{children:[`For resetting spacing (`,(0,d.jsx)(t.code,{children:`margin: 0`}),`) only when no spacing is defined, you can make use of `,(0,d.jsx)(t.code,{children:`dnb-space__reset`}),`.`]}),`
`,(0,d.jsx)(t.h3,{children:`Style and Spacing`}),`
`,(0,d.jsxs)(t.p,{children:[`Every Eufemia component that supports spacing props uses CSS custom properties (e.g. `,(0,d.jsx)(t.code,{children:`--margin-t-s`}),`) on the `,(0,d.jsx)(t.code,{children:`style`}),` attribute to drive responsive margins. When you pass a `,(0,d.jsx)(t.code,{children:`style`}),` prop to a component, your styles and the spacing styles are merged together — spacing properties take precedence.`]}),`
`,(0,d.jsx)(t.p,{children:`This means you can safely combine your own styles with spacing:`}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`<Space style={{ color: 'var(--color-sea-green)' }} top="medium">
  ...
</Space>
`})}),`
`,(0,d.jsxs)(t.p,{children:[`If you work with raw DOM elements and set styles via `,(0,d.jsx)(t.code,{children:`setAttribute('style', ...)`}),`, make sure you preserve any existing style values when adding new ones, so the spacing custom properties are not lost.`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-js`,children:`const existing = element.getAttribute('style')
const merged = existing
  ? \`\${existing.replace(/;?\\s*$/, '')}; \${style}\`
  : style
element.setAttribute('style', merged)
`})}),`
`,(0,d.jsx)(t.h3,{children:`Responsive spacing`}),`
`,(0,d.jsxs)(t.p,{children:[(0,d.jsx)(t.strong,{children:`NB`}),`: This feature is in beta and may be subject to change.`]}),`
`,(0,d.jsxs)(t.p,{children:[`Wrap a section of your UI in `,(0,d.jsx)(t.code,{children:`Space.ResponsiveContext`}),` to enable spacing that adapts automatically across breakpoints. Components inside the wrapper that use `,(0,d.jsx)(t.code,{children:`useSpacing`}),` will receive a `,(0,d.jsx)(t.code,{children:`dnb-space-responsive--<density>`}),` CSS class, which remaps static `,(0,d.jsx)(t.code,{children:`--spacing-*`}),` values to the responsive `,(0,d.jsx)(t.code,{children:`--responsive-spacing-*`}),` custom properties below.`]}),`
`,(0,d.jsx)(t.p,{children:`This is useful when you want consistent, viewport-aware gaps between elements without managing breakpoint-specific spacing props on every component.`}),`
`,(0,d.jsxs)(t.p,{children:[`See the `,(0,d.jsx)(t.a,{href:`/uilib/layout/space/demos/#responsive-layout-gap`,children:`Responsive layout gap demo`}),` for a live example.`]}),`
`,(0,d.jsxs)(t.table,{children:[(0,d.jsx)(t.thead,{children:(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.th,{children:`CSS Variable`}),(0,d.jsxs)(t.th,{children:[`Compact `,(0,d.jsx)(t.code,{children:`← small`})]}),(0,d.jsxs)(t.th,{children:[`Basis `,(0,d.jsx)(t.code,{children:`small → medium`})]}),(0,d.jsxs)(t.th,{children:[`Spacious `,(0,d.jsx)(t.code,{children:`medium →`})]})]})}),(0,d.jsxs)(t.tbody,{children:[(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`--responsive-spacing-xx-small`})}),(0,d.jsx)(t.td,{children:`0.25rem (4px)`}),(0,d.jsx)(t.td,{children:`0.5rem (8px)`}),(0,d.jsx)(t.td,{children:`1rem (16px)`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`--responsive-spacing-x-small`})}),(0,d.jsx)(t.td,{children:`0.5rem (8px)`}),(0,d.jsx)(t.td,{children:`1rem (16px)`}),(0,d.jsx)(t.td,{children:`1.5rem (24px)`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`--responsive-spacing-small`})}),(0,d.jsx)(t.td,{children:`1rem (16px)`}),(0,d.jsx)(t.td,{children:`1.5rem (24px)`}),(0,d.jsx)(t.td,{children:`2rem (32px)`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`--responsive-spacing-medium`})}),(0,d.jsx)(t.td,{children:`1.5rem (24px)`}),(0,d.jsx)(t.td,{children:`2rem (32px)`}),(0,d.jsx)(t.td,{children:`2.5rem (40px)`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`--responsive-spacing-large`})}),(0,d.jsx)(t.td,{children:`2rem (32px)`}),(0,d.jsx)(t.td,{children:`2.5rem (40px)`}),(0,d.jsx)(t.td,{children:`3rem (48px)`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`--responsive-spacing-x-large`})}),(0,d.jsx)(t.td,{children:`2.5rem (40px)`}),(0,d.jsx)(t.td,{children:`3rem (48px)`}),(0,d.jsx)(t.td,{children:`3.5rem (56px)`})]}),(0,d.jsxs)(t.tr,{children:[(0,d.jsx)(t.td,{children:(0,d.jsx)(t.code,{children:`--responsive-spacing-xx-large`})}),(0,d.jsx)(t.td,{children:`3rem (48px)`}),(0,d.jsx)(t.td,{children:`3.5rem (56px)`}),(0,d.jsx)(t.td,{children:`4rem (64px)`})]})]})]}),`
`,(0,d.jsxs)(t.p,{children:[`All `,(0,d.jsx)(t.code,{children:`--responsive-spacing-*`}),` CSS variables are scoped to the `,(0,d.jsx)(t.code,{children:`.dnb-space`}),` class as of now.`]})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function h(e){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(p,{}),`
`,(0,d.jsx)(u,{})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}export{g as default};