import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import{a as r,c as i,d as a,f as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./Examples-BVX0i3lC.js";var h=e(t());function g(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components},{VisibilityByTheme:g,VisibleWhenVisualTest:_}=t;return g||v(`VisibilityByTheme`,!0),_||v(`VisibleWhenVisualTest`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h2,{children:`Demos`}),`
`,(0,h.jsx)(t.h3,{children:`Single Accordion`}),`
`,(0,h.jsx)(d,{}),`
`,(0,h.jsx)(t.h3,{children:`Accordion with large title and content`}),`
`,(0,h.jsx)(c,{}),`
`,(0,h.jsx)(t.h3,{children:`Grouped Accordion`}),`
`,(0,h.jsxs)(t.p,{children:[(0,h.jsx)(t.strong,{children:`NB:`}),` Please have a read on the `,(0,h.jsx)(t.a,{href:`/uilib/components/accordion#unexpected-behavior`,children:`unexpected behavior`}),` thoughts.`]}),`
`,(0,h.jsx)(f,{}),`
`,(0,h.jsx)(t.h3,{children:`Customized Accordion`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(t.h3,{children:`In two columns`}),`
`,(0,h.jsxs)(t.p,{children:[`This is a demo of how to use a set of accordions in two `,(0,h.jsx)(t.a,{href:`/uilib/layout/grid/`,children:`Grid`}),` columns, including the correct tab order.
Tab order follows the order of the elements in the markup, just as a screen readers will read it.`]}),`
`,(0,h.jsx)(i,{}),`
`,(0,h.jsx)(t.h3,{children:`Nested Accordions`}),`
`,(0,h.jsx)(m,{}),`
`,(0,h.jsx)(_,{children:(0,h.jsx)(a,{})}),`
`,(0,h.jsx)(t.h3,{children:`Disabled`}),`
`,(0,h.jsx)(t.p,{children:`Accordion can be disabled, though is not exactly defined what the use case is.`}),`
`,(0,h.jsx)(r,{}),`
`,(0,h.jsxs)(t.h3,{children:[`Variant `,(0,h.jsx)(t.code,{children:`filled`})]}),`
`,(0,h.jsx)(g,{visible:`sbanken`,children:(0,h.jsx)(t.p,{children:`This variant does not have any different styling in the Sbanken theme.`})}),`
`,(0,h.jsx)(u,{}),`
`,(0,h.jsxs)(t.h3,{children:[`Variant `,(0,h.jsx)(t.code,{children:`tertiary`})]}),`
`,(0,h.jsxs)(t.p,{children:[`A lightweight variant that renders a tertiary button with a chevron icon. The button and content can be placed separately in the tree by sharing the same `,(0,h.jsx)(t.code,{children:`id`}),`. The button automatically sets `,(0,h.jsx)(t.code,{children:`aria-expanded`}),` and `,(0,h.jsx)(t.code,{children:`aria-controls`}),` to link it with the content panel. When activated by keyboard or screen reader style input, focus moves to the content region. Pointer clicks do not move focus.`]}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(_,{children:(0,h.jsx)(s,{})}),`
`,(0,h.jsx)(t.h3,{children:`Close All Accordions In A Group`}),`
`,(0,h.jsxs)(t.p,{children:[`You can collapse all expanded accordions by sending a ref to the `,(0,h.jsx)(t.code,{children:`collapseAllHandleRef`}),` property and calling the `,(0,h.jsx)(t.code,{children:`.current()`}),` function on your ref.`]}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-tsx`,children:`const myCollapseAllRef = React.useRef<(() => void) | undefined>(undefined)

return (
  <button onClick={() => myCloseAllRef.current?.()}>
    Close all accordions
  </button>

  <Accordion.Group collapseAllHandleRef={myCollapseAllRef}>
    {/* ... your accordions */}
  </Accordion.Group>
)
`})}),`
`,(0,h.jsx)(p,{})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};