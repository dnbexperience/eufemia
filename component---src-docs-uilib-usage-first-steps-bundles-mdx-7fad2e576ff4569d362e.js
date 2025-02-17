"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[86522],{57418:function(n,e,s){s.r(e);var i=s(52322),o=s(45392);function t(n){const e=Object.assign({h1:"h1",p:"p",code:"code",blockquote:"blockquote",strong:"strong",ul:"ul",li:"li",h2:"h2",a:"a",h3:"h3",pre:"pre",em:"em"},(0,o.ah)(),n.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{children:"Bundles"}),"\n",(0,i.jsxs)(e.p,{children:["The ",(0,i.jsx)(e.code,{children:"@dnb/eufemia"})," also supports ready to use ",(0,i.jsx)(e.code,{children:"UMD"})," and ",(0,i.jsx)(e.code,{children:"ESM"})," bundles."]}),"\n",(0,i.jsxs)(e.blockquote,{children:["\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:"NB:"})," As these bundles will keep on getting larger once new components arrive, I strongly recommend to only use UMD and ESM bundles as an easy drop-in for simple web pages."]}),"\n",(0,i.jsxs)(e.p,{children:["For ",(0,i.jsx)(e.strong,{children:"advanced applications"}),", I recommend a holistic build step, handling all dependencies together, creating mono page bundles with code splitting in place. This ensures that only code which is used by the application, is sent to the user."]}),"\n",(0,i.jsx)(e.p,{children:"The reason for that is the first page load (first paint) which is extremely important for good UX, as it has a whole bunch of negative side effects like page flicker and uncontrolled movements as well as load time."}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"Tobias Høegh"}),", april 2020"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"All the code examples are only quick demos, showing how to load the bundles. Keep in mind, there are many ways on how to consume them. The example code is in no way recommended for production usage, as it is highly imperative code and you will make code bases hard to read and maintain."}),"\n",(0,i.jsx)(e.h2,{children:"UMD bundles"}),"\n",(0,i.jsxs)(e.p,{children:["Requires React and ReactDOM to be loaded. Supports ",(0,i.jsx)(e.code,{children:"ES5"}),"."]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-ui-lib.min.js"})," - includes all ",(0,i.jsx)(e.a,{href:"/uilib/components",children:"components"})," and ",(0,i.jsx)(e.a,{href:"/uilib/elements",children:"elements"}),"."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-ui-components.min.js"})," - includes all ",(0,i.jsx)(e.a,{href:"/uilib/components",children:"components"}),"."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-ui-extensions.min.js"})," - includes all ",(0,i.jsx)(e.a,{href:"/uilib/extensions",children:"extensions"}),"."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-ui-icons.min.js"})," - includes all ",(0,i.jsx)(e.a,{href:"/icons/primary",children:"primary icons"})," in default and medium size."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-ui-basis.min.js"})," - includes just the core methods like: ",(0,i.jsx)(e.code,{children:"isTouchDevice"}),", ",(0,i.jsx)(e.code,{children:"defineNavigator"}),"."]}),"\n"]}),"\n",(0,i.jsx)(e.h3,{children:"Usage of UMD bundles"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'<body>\n  <div id="app"></div>\n\n  <script src="https://unpkg.com/react/umd/react.production.min.js"><\/script>\n  <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"><\/script>\n  <script src="https://unpkg.com/@dnb/eufemia/umd/dnb-ui-icons.min.js"><\/script>\n  <script src="https://unpkg.com/@dnb/eufemia/umd/dnb-ui-lib.min.js"><\/script>\n\n  <script type="application/javascript">\n    const MyButton = React.createElement(window.dnbLib.Button, {\n      text: \'My Button\',\n      icon: \'chevron_right\',\n      on_click: (params) => {\n        console.log(\'on_click\', params)\n      },\n    })\n    const root = createRoot(document.getElementById(\'app\'))\n    root.render(MyButton)\n  <\/script>\n</body>\n'})}),"\n",(0,i.jsx)(e.h2,{children:"ESM bundles"}),"\n",(0,i.jsxs)(e.p,{children:["Requires React and ReactDOM to be loaded as a module resolution (",(0,i.jsx)(e.a,{href:"https://github.com/WICG/import-maps",children:"importmap"}),"). Supports ",(0,i.jsx)(e.code,{children:"ES6"})," (",(0,i.jsx)(e.strong,{children:"NB:"})," That is the aim, right now it is also compiled down to ES5)."]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-ui-lib.min.mjs"})," - includes all ",(0,i.jsx)(e.a,{href:"/uilib/components",children:"components"})," and ",(0,i.jsx)(e.a,{href:"/uilib/elements",children:"elements"}),"."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-theme-components.min.mjs"})," - includes all ",(0,i.jsx)(e.a,{href:"/uilib/components",children:"components"}),"."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-ui-extensions.min.mjs"})," - includes all ",(0,i.jsx)(e.a,{href:"/uilib/extensions",children:"extensions"}),"."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-ui-icons.min.mjs"})," - includes all ",(0,i.jsx)(e.a,{href:"/icons/primary",children:"primary icons"})," in default and medium size."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"dnb-ui-basis.min.mjs"})," - includes just the core methods like: ",(0,i.jsx)(e.code,{children:"isTouchDevice"}),", ",(0,i.jsx)(e.code,{children:"defineNavigator"}),"."]}),"\n"]}),"\n",(0,i.jsx)(e.h3,{children:"Usage of ESM bundles"}),"\n",(0,i.jsxs)(e.p,{children:["Because ",(0,i.jsx)(e.code,{children:"importmap"})," is still not supported by the majority of browsers, we use a shim, which can be simply removed once the browser support is good enough."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'<body>\n  <div id="app"></div>\n\n  <script\n    defer\n    src="https://unpkg.com/es-module-shims/dist/es-module-shims.js"\n  ><\/script>\n\n  <script type="importmap-shim">\n    {\n      "imports": {\n        "react": "...",\n        "react-dom": "...",\n        "../icons/dnb/primary_icons.js": "https://unpkg.com/@dnb/eufemia/esm/dnb-ui-icons.min.mjs",\n        "../icons/dnb/primary_icons_medium.js": "https://unpkg.com/@dnb/eufemia/esm/dnb-ui-icons.min.mjs"\n      }\n    }\n  <\/script>\n\n  <script type="module-shim">\n    import React from \'react\'\n    import ReactDOM from \'react-dom\'\n    import { Button } from \'https://unpkg.com/@dnb/eufemia/esm/dnb-ui-lib.min.mjs\'\n\n    const MyButton = React.createElement(\n      Button,\n      {\n        text: \'My Button\',\n        icon: \'chevron_right\',\n        on_click: (params) => {\n          console.log(\'on_click\', params)\n        }\n      }\n    )\n\n    const root = createRoot(document.getElementById(\'app\'))\n    root.render(MyButton)\n  <\/script>\n</body>\n'})}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.em,{children:"Note:"})," Because React don't delivers an ESM bundle right now, we have to create our own."]})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(t,n)})):t(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-usage-first-steps-bundles-mdx-7fad2e576ff4569d362e.js.map