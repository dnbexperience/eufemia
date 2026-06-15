import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Import`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { PortalRoot } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Description`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`PortalRoot`}),` is a React component that helps you make React's `,(0,r.jsx)(t.a,{href:`https://react.dev/reference/react-dom/createPortal`,children:`createPortal`}),`.`]}),`
`,(0,r.jsx)(t.p,{children:`It lets you render some children into a different part of the DOM.`}),`
`,(0,r.jsx)(t.h3,{children:`Good to know`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`It contains CSS styles and screen reader accessibility features needed for proper usage of portals.`}),`
`,(0,r.jsxs)(t.li,{children:[`It comes with support for `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling/style-isolation/`,children:`style isolation`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Everything inside the `,(0,r.jsx)(t.code,{children:`PortalRoot`}),` can later be customized and stacked on top of each other using CSS `,(0,r.jsx)(t.code,{children:`z-index`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`It is used in other components, like `,(0,r.jsx)(t.a,{href:`/uilib/components/tooltip`,children:`Tooltip`}),`, `,(0,r.jsx)(t.a,{href:`/uilib/components/modal`,children:`Modal`}),`, `,(0,r.jsx)(t.a,{href:`/uilib/components/term-definition`,children:`TermDefinition`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/components/date-picker`,children:`DatePicker's calendar`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`A wrapper is inserted automatically as a child node to the HTML `,(0,r.jsx)(t.code,{children:`<body>`}),` or the `,(0,r.jsx)(t.code,{children:`<IsolatedStyleScope scopeHash="your-scope" />`}),` element.`]}),`
`,(0,r.jsxs)(t.li,{children:[`It adds `,(0,r.jsx)(t.code,{children:`dnb-core-style`}),` class to the portal element, so you do not need to deal with that yourself.`]}),`
`,(0,r.jsxs)(t.li,{children:[`In order to remove it from the accessibility tree, it uses `,(0,r.jsx)(t.code,{children:`role="presentation"`}),`. That means, when your content is visible, you need to set focus to it, so screen readers can read it.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`PortalRoot`}),` props override values from `,(0,r.jsx)(t.code,{children:`PortalRoot.Provider`}),` if both are present.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`beforeSelector`}),` takes precedence over `,(0,r.jsx)(t.code,{children:`insideSelector`}),` when both are provided on the same level.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/portal-root`,children:`Source code`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/portal-root`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Usage`}),`
`,(0,r.jsxs)(t.p,{children:[`For basic usage, just wrap your content with the `,(0,r.jsx)(t.code,{children:`PortalRoot`}),` component:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { PortalRoot } from '@dnb/eufemia'

render(<PortalRoot>Your content</PortalRoot>)
`})}),`
`,(0,r.jsxs)(t.p,{children:[`It will create a wrapper div and insert it as a child node to the HTML `,(0,r.jsx)(t.code,{children:`<body>`}),` element:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-html`,children:`<body>
  <!-- The portal root will be inserted here -->
  <!-- Other content -->
</body>
`})}),`
`,(0,r.jsx)(t.h2,{children:`Define where the portal root should be rendered`}),`
`,(0,r.jsx)(t.p,{children:`Sometimes you might want to have more control over where the portal root element is placed in the HTML structure.`}),`
`,(0,r.jsxs)(t.p,{children:[`To achieve this, you can create an element in your HTML with the id `,(0,r.jsx)(t.code,{children:`eufemia-portal-root`}),`:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-html`,children:`<body>
  <div class="with-something-else">
    <div id="app" />
    <div id="eufemia-portal-root" />
  </div>
</body>
`})}),`
`,(0,r.jsx)(t.h3,{children:`Customize with id property`}),`
`,(0,r.jsxs)(t.p,{children:[`You can also customize the portal root element by passing a custom `,(0,r.jsx)(t.code,{children:`id`}),` property to the `,(0,r.jsx)(t.code,{children:`PortalRoot`}),` component:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { PortalRoot } from '@dnb/eufemia'

// This will use the existing element with id="my-custom-portal-root"
render(<PortalRoot id="my-custom-portal-root">Your content</PortalRoot>)
`})}),`
`,(0,r.jsx)(t.p,{children:`This will create or reuse an element with the specified id in the HTML structure:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-html`,children:`<body>
  <div class="with-something-else">
    <div id="app" />
    <div id="my-custom-portal-root" />
  </div>
</body>
`})}),`
`,(0,r.jsx)(t.h3,{children:`Without pre-existing element`}),`
`,(0,r.jsxs)(t.p,{children:[`If you are not able to modify the HTML structure, you can make use of the `,(0,r.jsx)(t.code,{children:`beforeSelector`}),` or `,(0,r.jsx)(t.code,{children:`insideSelector`}),` property to define where the portal root should be placed.`]}),`
`,(0,r.jsxs)(t.p,{children:[`You can pass these selectors directly to `,(0,r.jsx)(t.code,{children:`PortalRoot`}),`:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { PortalRoot } from '@dnb/eufemia'

// Insert the portal root before the element with id="my-custom-id"
render(
  <PortalRoot beforeSelector="#my-custom-id">Your content</PortalRoot>
)

// Insert the portal root as the first child inside the element with class="my-selector"
render(<PortalRoot insideSelector=".my-selector">Your content</PortalRoot>)
`})}),`
`,(0,r.jsx)(t.h3,{children:`Customize properties via provider (context)`}),`
`,(0,r.jsxs)(t.p,{children:[`You can also pass properties to each `,(0,r.jsx)(t.code,{children:`PortalRoot`}),` by using the `,(0,r.jsx)(t.code,{children:`PortalRoot.Provider`}),`.`]}),`
`,(0,r.jsxs)(t.p,{children:[`In this example, the `,(0,r.jsx)(t.code,{children:`DatePicker`}),` component renders its portal content before the element with the id `,(0,r.jsx)(t.code,{children:`my-custom-id`}),`.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { PortalRoot, DatePicker } from '@dnb/eufemia'

render(
  <PortalRoot.Provider beforeSelector="#my-custom-id">
    <DatePicker />
  </PortalRoot.Provider>
)
`})}),`
`,(0,r.jsxs)(t.p,{children:[`This makes the `,(0,r.jsx)(t.code,{children:`DatePicker`}),` render its portal content right before `,(0,r.jsx)(t.code,{children:`my-custom-id`}),`.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-html`,children:`<body>
  <div class="with-something-else">
    <!-- The portal root will be inserted here -->
    <div id="my-custom-id" />
  </div>
</body>
`})}),`
`,(0,r.jsx)(t.h3,{children:`Forward HTML attributes to portal content`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`PortalRoot.Provider`}),` also forwards any extra HTML attributes to the portal DOM element. Any standard HTML attribute you pass will be applied to every portal element rendered by components inside the provider (such as Dropdown, Autocomplete, DatePicker, Dialog, Drawer, Popover, and Tooltip).`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { PortalRoot, Dropdown, Dialog } from '@dnb/eufemia'

render(
  <PortalRoot.Provider data-my-need="something">
    <Dropdown />
    <Dialog />
  </PortalRoot.Provider>
)
`})}),`
`,(0,r.jsxs)(t.p,{children:[`In this example, every portal element will receive `,(0,r.jsx)(t.code,{children:`data-my-need="something"`}),` for content rendered outside the main React tree.`]}),`
`,(0,r.jsx)(t.h3,{children:`BrowserTranslate helper (Google Translate)`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`BrowserTranslate`}),` helper component prevents browser translation tools (such as Google Translate) from modifying the content of form components. It works by combining the Eufemia Provider's `,(0,r.jsx)(t.code,{children:`formElement`}),` context with `,(0,r.jsx)(t.code,{children:`PortalRoot.Provider`}),`, so both the visible component (e.g. a button) and its portal-rendered content (e.g. a dropdown list) receive `,(0,r.jsx)(t.code,{children:`translate="no"`}),`.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { BrowserTranslate } from '@dnb/eufemia/shared'
import { Dropdown } from '@dnb/eufemia'

render(
  <BrowserTranslate off>
    <Dropdown data={['Brukskonto', 'Sparekonto', 'BSU']} />
  </BrowserTranslate>
)
`})}),`
`,(0,r.jsxs)(t.p,{children:[`When `,(0,r.jsx)(t.code,{children:`off`}),` is set, every form component inside the scope will have `,(0,r.jsx)(t.code,{children:`translate="no"`}),` on both its trigger element and its portal content. Without `,(0,r.jsx)(t.code,{children:`off`}),`, the component renders children as-is.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsx)(a,{})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};