import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";var r=e(t());function i(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Bundles`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` also supports ready to use `,(0,r.jsx)(t.code,{children:`UMD`}),` and `,(0,r.jsx)(t.code,{children:`ESM`}),` bundles.`]}),`
`,(0,r.jsxs)(t.blockquote,{children:[`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`NB:`}),` As these bundles will keep on getting larger once new components arrive, I strongly recommend to only use UMD and ESM bundles as an easy drop-in for simple web pages.`]}),`
`,(0,r.jsxs)(t.p,{children:[`For `,(0,r.jsx)(t.strong,{children:`advanced applications`}),`, I recommend a holistic build step, handling all dependencies together, creating mono page bundles with code splitting in place. This ensures that only code which is used by the application, is sent to the user.`]}),`
`,(0,r.jsx)(t.p,{children:`The reason for that is the first page load (first paint) which is extremely important for good UX, as it has a whole bunch of negative side effects like page flicker and uncontrolled movements as well as load time.`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Tobias Høegh`}),`, april 2020`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`All the code examples are only quick demos, showing how to load the bundles. Keep in mind, there are many ways on how to consume them. The example code is in no way recommended for production usage, as it is highly imperative code and you will make code bases hard to read and maintain.`}),`
`,(0,r.jsx)(t.h2,{children:`UMD bundles`}),`
`,(0,r.jsx)(t.p,{children:`Requires React and ReactDOM to be loaded.`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-ui-lib.min.js`}),` - includes all `,(0,r.jsx)(t.a,{href:`/uilib/components`,children:`components`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/elements`,children:`elements`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-ui-components.min.js`}),` - includes all `,(0,r.jsx)(t.a,{href:`/uilib/components`,children:`components`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-ui-extensions.min.js`}),` - includes all `,(0,r.jsx)(t.a,{href:`/uilib/extensions`,children:`extensions`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-ui-icons.min.js`}),` - includes all `,(0,r.jsx)(t.a,{href:`/icons/primary`,children:`primary icons`}),` in default and medium size.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-ui-basis.min.js`}),` - includes just the core methods like: `,(0,r.jsx)(t.code,{children:`isTouchDevice`}),`, `,(0,r.jsx)(t.code,{children:`defineNavigator`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Usage of UMD bundles`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-html`,children:`<body>
  <div id="app"></div>

  <script src="https://unpkg.com/react/umd/react.production.min.js"><\/script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"><\/script>
  <script src="https://unpkg.com/@dnb/eufemia/umd/dnb-ui-icons.min.js"><\/script>
  <script src="https://unpkg.com/@dnb/eufemia/umd/dnb-ui-lib.min.js"><\/script>

  <script type="application/javascript">
    const MyButton = React.createElement(window.dnbLib.Button, {
      text: 'My Button',
      icon: 'chevron_right',
      onClick: (params) => {
        console.log('onClick', params)
      },
    })
    const root = createRoot(document.getElementById('app'))
    root.render(MyButton)
  <\/script>
</body>
`})}),`
`,(0,r.jsx)(t.h2,{children:`ESM bundles`}),`
`,(0,r.jsxs)(t.p,{children:[`Requires React and ReactDOM to be loaded as a module resolution (`,(0,r.jsx)(t.a,{href:`https://github.com/WICG/import-maps`,children:`importmap`}),`). Uses ES modules (`,(0,r.jsx)(t.strong,{children:`NB:`}),` That is the aim, right now it is also transpiled `,(0,r.jsx)(t.a,{href:`/uilib/usage/#supported-browsers-and-platforms`,children:`for broad browser compatibility`}),`).`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-ui-lib.min.mjs`}),` - includes all `,(0,r.jsx)(t.a,{href:`/uilib/components`,children:`components`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/elements`,children:`elements`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-theme-components.min.mjs`}),` - includes all `,(0,r.jsx)(t.a,{href:`/uilib/components`,children:`components`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-ui-extensions.min.mjs`}),` - includes all `,(0,r.jsx)(t.a,{href:`/uilib/extensions`,children:`extensions`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-ui-icons.min.mjs`}),` - includes all `,(0,r.jsx)(t.a,{href:`/icons/primary`,children:`primary icons`}),` in default and medium size.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`dnb-ui-basis.min.mjs`}),` - includes just the core methods like: `,(0,r.jsx)(t.code,{children:`isTouchDevice`}),`, `,(0,r.jsx)(t.code,{children:`defineNavigator`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Usage of ESM bundles`}),`
`,(0,r.jsxs)(t.p,{children:[`Because `,(0,r.jsx)(t.code,{children:`importmap`}),` is still not supported by the majority of browsers, we use a shim, which can be simply removed once the browser support is good enough.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-html`,children:`<body>
  <div id="app"></div>

  <script
    defer
    src="https://unpkg.com/es-module-shims/dist/es-module-shims.js"
  ><\/script>

  <script type="importmap-shim">
    {
      "imports": {
        "react": "...",
        "react-dom": "...",
        "../icons/dnb/primary_icons.js": "https://unpkg.com/@dnb/eufemia/esm/dnb-ui-icons.min.mjs",
        "../icons/dnb/primary_icons_medium.js": "https://unpkg.com/@dnb/eufemia/esm/dnb-ui-icons.min.mjs"
      }
    }
  <\/script>

  <script type="module-shim">
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { Button } from 'https://unpkg.com/@dnb/eufemia/esm/dnb-ui-lib.min.mjs'

    const MyButton = React.createElement(
      Button,
      {
        text: 'My Button',
        icon: 'chevron_right',
        onClick: (params) => {
          console.log('onClick', params)
        }
      }
    )

    const root = createRoot(document.getElementById('app'))
    root.render(MyButton)
  <\/script>
</body>
`})}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.em,{children:`Note:`}),` Because React does not deliver an ESM bundle right now, we have to create our own.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};