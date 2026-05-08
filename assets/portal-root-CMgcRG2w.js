import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Import`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { PortalRoot } from '@dnb/eufemia'
`})}),`
`,(0,n.jsx)(r.h2,{children:`Description`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`PortalRoot`}),` is a React component that helps you make React's `,(0,n.jsx)(r.a,{href:`https://react.dev/reference/react-dom/createPortal`,children:`createPortal`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:`It lets you render some children into a different part of the DOM.`}),`
`,(0,n.jsx)(r.h3,{children:`Good to know`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`It contains CSS styles and screen reader accessibility features needed for proper usage of portals.`}),`
`,(0,n.jsxs)(r.li,{children:[`It comes with support for `,(0,n.jsx)(r.a,{href:`/uilib/usage/customisation/styling/style-isolation/`,children:`style isolation`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Everything inside the `,(0,n.jsx)(r.code,{children:`PortalRoot`}),` can later be customized and stacked on top of each other using CSS `,(0,n.jsx)(r.code,{children:`z-index`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`It is used in other components, like `,(0,n.jsx)(r.a,{href:`/uilib/components/tooltip`,children:`Tooltip`}),`, `,(0,n.jsx)(r.a,{href:`/uilib/components/modal`,children:`Modal`}),`, `,(0,n.jsx)(r.a,{href:`/uilib/components/term-definition`,children:`TermDefinition`}),` and `,(0,n.jsx)(r.a,{href:`/uilib/components/date-picker`,children:`DatePicker's calendar`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`A wrapper is inserted automatically as a child node to the HTML `,(0,n.jsx)(r.code,{children:`<body>`}),` or the `,(0,n.jsx)(r.code,{children:`<IsolatedStyleScope scopeHash="your-scope" />`}),` element.`]}),`
`,(0,n.jsxs)(r.li,{children:[`It adds `,(0,n.jsx)(r.code,{children:`dnb-core-style`}),` class to the portal element, so you do not need to deal with that yourself.`]}),`
`,(0,n.jsxs)(r.li,{children:[`In order to remove it from the accessibility tree, it uses `,(0,n.jsx)(r.code,{children:`role="presentation"`}),`. That means, when your content is visible, you need to set focus to it, so screen readers can read it.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`PortalRoot`}),` props override values from `,(0,n.jsx)(r.code,{children:`PortalRoot.Provider`}),` if both are present.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`beforeSelector`}),` takes precedence over `,(0,n.jsx)(r.code,{children:`insideSelector`}),` when both are provided on the same level.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Relevant links`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/portal-root`,children:`Source code`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/portal-root`,children:`Docs code`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Usage`}),`
`,(0,n.jsxs)(r.p,{children:[`For basic usage, just wrap your content with the `,(0,n.jsx)(r.code,{children:`PortalRoot`}),` component:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { PortalRoot } from '@dnb/eufemia'

render(<PortalRoot>Your content</PortalRoot>)
`})}),`
`,(0,n.jsxs)(r.p,{children:[`It will create a wrapper div and insert it as a child node to the HTML `,(0,n.jsx)(r.code,{children:`<body>`}),` element:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-html`,children:`<body>
  <!-- The portal root will be inserted here -->
  <!-- Other content -->
</body>
`})}),`
`,(0,n.jsx)(r.h2,{children:`Define where the portal root should be rendered`}),`
`,(0,n.jsx)(r.p,{children:`Sometimes you might want to have more control over where the portal root element is placed in the HTML structure.`}),`
`,(0,n.jsxs)(r.p,{children:[`To achieve this, you can create an element in your HTML with the id `,(0,n.jsx)(r.code,{children:`eufemia-portal-root`}),`:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-html`,children:`<body>
  <div class="with-something-else">
    <div id="app" />
    <div id="eufemia-portal-root" />
  </div>
</body>
`})}),`
`,(0,n.jsx)(r.h3,{children:`Customize with id property`}),`
`,(0,n.jsxs)(r.p,{children:[`You can also customize the portal root element by passing a custom `,(0,n.jsx)(r.code,{children:`id`}),` property to the `,(0,n.jsx)(r.code,{children:`PortalRoot`}),` component:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { PortalRoot } from '@dnb/eufemia'

// This will use the existing element with id="my-custom-portal-root"
render(<PortalRoot id="my-custom-portal-root">Your content</PortalRoot>)
`})}),`
`,(0,n.jsx)(r.p,{children:`This will create or reuse an element with the specified id in the HTML structure:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-html`,children:`<body>
  <div class="with-something-else">
    <div id="app" />
    <div id="my-custom-portal-root" />
  </div>
</body>
`})}),`
`,(0,n.jsx)(r.h3,{children:`Without pre-existing element`}),`
`,(0,n.jsxs)(r.p,{children:[`If you are not able to modify the HTML structure, you can make use of the `,(0,n.jsx)(r.code,{children:`beforeSelector`}),` or `,(0,n.jsx)(r.code,{children:`insideSelector`}),` property to define where the portal root should be placed.`]}),`
`,(0,n.jsxs)(r.p,{children:[`You can pass these selectors directly to `,(0,n.jsx)(r.code,{children:`PortalRoot`}),`:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { PortalRoot } from '@dnb/eufemia'

// Insert the portal root before the element with id="my-custom-id"
render(
  <PortalRoot beforeSelector="#my-custom-id">Your content</PortalRoot>
)

// Insert the portal root as the first child inside the element with class="my-selector"
render(<PortalRoot insideSelector=".my-selector">Your content</PortalRoot>)
`})}),`
`,(0,n.jsx)(r.h3,{children:`Customize properties via provider (context)`}),`
`,(0,n.jsxs)(r.p,{children:[`You can also pass properties to each `,(0,n.jsx)(r.code,{children:`PortalRoot`}),` by using the `,(0,n.jsx)(r.code,{children:`PortalRoot.Provider`}),`.`]}),`
`,(0,n.jsxs)(r.p,{children:[`In this example, the `,(0,n.jsx)(r.code,{children:`DatePicker`}),` component renders its portal content before the element with the id `,(0,n.jsx)(r.code,{children:`my-custom-id`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { PortalRoot, DatePicker } from '@dnb/eufemia'

render(
  <PortalRoot.Provider beforeSelector="#my-custom-id">
    <DatePicker />
  </PortalRoot.Provider>
)
`})}),`
`,(0,n.jsxs)(r.p,{children:[`This makes the `,(0,n.jsx)(r.code,{children:`DatePicker`}),` render its portal content right before `,(0,n.jsx)(r.code,{children:`my-custom-id`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-html`,children:`<body>
  <div class="with-something-else">
    <!-- The portal root will be inserted here -->
    <div id="my-custom-id" />
  </div>
</body>
`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}function a(e){return(0,n.jsx)(i,{})}function o(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}export{o as default};