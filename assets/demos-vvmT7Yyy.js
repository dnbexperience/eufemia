import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import{a as r,d as i,i as a,l as o,o as s,r as c,s as l,u}from"./Examples-C0-sBJhb.js";var d=e(t());function f(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Default and Medium-sized icons (Responsive)`}),`
`,(0,d.jsx)(r,{}),`
`,(0,d.jsx)(t.h3,{children:`Icons with border`}),`
`,(0,d.jsxs)(t.p,{children:[(0,d.jsx)(t.strong,{children:`NB:`}),` Use it with caution. It should not be used where it can confuse users with being a clickable button.`]}),`
`,(0,d.jsx)(c,{}),`
`,(0,d.jsx)(t.h3,{children:`Filled icons`}),`
`,(0,d.jsxs)(t.p,{children:[`Use the `,(0,d.jsx)(t.code,{children:`fill`}),` prop on a single icon to fill it.`]}),`
`,(0,d.jsx)(s,{}),`
`,(0,d.jsxs)(t.h3,{children:[`Responsive to its inherited `,(0,d.jsx)(t.code,{children:`font-size`})]}),`
`,(0,d.jsx)(l,{}),`
`,(0,d.jsx)(t.h3,{children:`Icon color variations`}),`
`,(0,d.jsx)(t.p,{children:`All of these methods will output the same color`}),`
`,(0,d.jsx)(a,{}),`
`,(0,d.jsx)(t.h3,{children:`Icon size variations`}),`
`,(0,d.jsxs)(t.p,{children:[`The official supported sizes are `,(0,d.jsx)(t.code,{children:`default`}),` and `,(0,d.jsx)(t.code,{children:`medium`}),`.`]}),`
`,(0,d.jsxs)(t.p,{children:[(0,d.jsx)(t.strong,{children:`NB:`}),` If you need to use the `,(0,d.jsx)(t.code,{children:`large`}),`, `,(0,d.jsx)(t.code,{children:`x-large`}),` or `,(0,d.jsx)(t.code,{children:`xx-large`}),` sizes, then you should use the `,(0,d.jsx)(t.code,{children:`*_medium`}),` version of the icon. Ensure you import the `,(0,d.jsx)(t.code,{children:`*_medium`}),` version of the icon.`]}),`
`,(0,d.jsx)(i,{}),`
`,(0,d.jsx)(t.h3,{children:`Icon transition`}),`
`,(0,d.jsxs)(t.p,{children:[`Use `,(0,d.jsx)(t.code,{children:`Icon.transition()`}),` to animate between SVG icon states. Define named states and use `,(0,d.jsx)(t.code,{children:`Icon.transition.activate(element, state)`}),` to switch between them.`]}),`
`,(0,d.jsxs)(t.p,{children:[`When icons have compatible path structures (same number and type of segments), the transition animates via CSS `,(0,d.jsx)(t.code,{children:`d`}),` property interpolation. This suits directional variants like `,(0,d.jsx)(t.code,{children:`arrow_down`}),` ↔ `,(0,d.jsx)(t.code,{children:`arrow_up`}),` or `,(0,d.jsx)(t.code,{children:`chevron_down`}),` ↔ `,(0,d.jsx)(t.code,{children:`chevron_up`}),`.`]}),`
`,(0,d.jsx)(o,{}),`
`,(0,d.jsx)(t.h3,{children:`Icon transition fallback`}),`
`,(0,d.jsxs)(t.p,{children:[`When icons have incompatible path structures (e.g. `,(0,d.jsx)(t.code,{children:`question`}),` ↔ `,(0,d.jsx)(t.code,{children:`close`}),`), `,(0,d.jsx)(t.code,{children:`Icon.transition()`}),` automatically falls back to a transform/opacity crossfade using stacked SVGs. The same `,(0,d.jsx)(t.code,{children:`Icon.transition.activate()`}),` API works for both modes.`]}),`
`,(0,d.jsx)(u,{})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(f,{...e})}):f(e)}export{p as default};