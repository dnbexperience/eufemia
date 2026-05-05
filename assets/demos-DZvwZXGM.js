import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import{a as n,c as r,d as i,i as a,l as o,n as s,o as c,r as l,s as u,t as d,u as f}from"./Examples-Dl0BGlGc.js";var p=e();function m(e){let m={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components},{VisibilityByTheme:h,VisibleWhenVisualTest:_}=m;return h||g(`VisibilityByTheme`,!0),_||g(`VisibleWhenVisualTest`,!0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m.h2,{children:`Demos`}),`
`,(0,p.jsx)(m.h3,{children:`Single Accordion`}),`
`,(0,p.jsx)(l,{}),`
`,(0,p.jsx)(m.h3,{children:`Accordion with large title and content`}),`
`,(0,p.jsx)(o,{}),`
`,(0,p.jsx)(m.h3,{children:`Grouped Accordion`}),`
`,(0,p.jsxs)(m.p,{children:[(0,p.jsx)(m.strong,{children:`NB:`}),` Please have a read on the `,(0,p.jsx)(m.a,{href:`/uilib/components/accordion#unexpected-behavior`,children:`unexpected behavior`}),` thoughts.`]}),`
`,(0,p.jsx)(u,{}),`
`,(0,p.jsx)(m.h3,{children:`Customized Accordion`}),`
`,(0,p.jsx)(s,{}),`
`,(0,p.jsx)(m.h3,{children:`In two columns`}),`
`,(0,p.jsxs)(m.p,{children:[`This is a demo of how to use a set of accordions in two `,(0,p.jsx)(m.a,{href:`/uilib/layout/grid/`,children:`Grid`}),` columns, including the correct tab order.
Tab order follows the order of the elements in the markup, just as a screen readers will read it.`]}),`
`,(0,p.jsx)(r,{}),`
`,(0,p.jsx)(m.h3,{children:`Nested Accordions`}),`
`,(0,p.jsx)(f,{}),`
`,(0,p.jsx)(_,{children:(0,p.jsx)(i,{})}),`
`,(0,p.jsx)(m.h3,{children:`Disabled`}),`
`,(0,p.jsx)(m.p,{children:`Accordion can be disabled, though is not exactly defined what the use case is.`}),`
`,(0,p.jsx)(n,{}),`
`,(0,p.jsxs)(m.h3,{children:[`Variant `,(0,p.jsx)(m.code,{children:`filled`})]}),`
`,(0,p.jsx)(h,{visible:`sbanken`,children:(0,p.jsx)(m.p,{children:`This variant does not have any different styling in the Sbanken theme.`})}),`
`,(0,p.jsx)(c,{}),`
`,(0,p.jsx)(_,{children:(0,p.jsx)(a,{})}),`
`,(0,p.jsx)(m.h3,{children:`Close All Accordions In A Group`}),`
`,(0,p.jsxs)(m.p,{children:[`You can collapse all expanded accordions by sending a ref to the `,(0,p.jsx)(m.code,{children:`collapseAllHandleRef`}),` property and calling the `,(0,p.jsx)(m.code,{children:`.current()`}),` function on your ref.`]}),`
`,(0,p.jsx)(m.pre,{children:(0,p.jsx)(m.code,{className:`language-tsx`,children:`const myCollapseAllRef = React.useRef<(() => void) | undefined>(undefined)

return (
  <button onClick={() => myCloseAllRef.current?.()}>
    Close all accordions
  </button>

  <Accordion.Group collapseAllHandleRef={myCollapseAllRef}>
    {/* ... your accordions */}
  </Accordion.Group>
)
`})}),`
`,(0,p.jsx)(d,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};