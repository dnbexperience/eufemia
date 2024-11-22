"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[51492,32893,70254],{88663:function(n,e,r){r.r(e);var t=r(52322),i=r(45392),o=r(43464),a=r(22436);function s(n){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.default,{}),"\n",(0,t.jsx)(a.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(s,n)})):s()}},22436:function(n,e,r){r.r(e),r.d(e,{default:function(){return h}});var t={};r.r(t),r.d(t,{Default:function(){return d},ReachRouter:function(){return u}});var i=r(52322),o=r(45392),a=r(46832),s=r(45619);const d=()=>(0,i.jsx)(a.Z,{noInline:!0,children:'const Component = () => {\n  Wizard.useQueryLocator(\'unique-id\')\n  return (\n    <Form.Handler>\n      <Wizard.Container id="unique-id">\n        <MyStep title="Step 1" />\n        <MyStep title="Step 2" />\n        <MyStep title="Step 3" />\n      </Wizard.Container>\n    </Form.Handler>\n  )\n}\nconst MyStep = ({ title }) => {\n  return (\n    <Wizard.Step title={title}>\n      <Form.Card>\n        <P>Contents of {title}</P>\n      </Form.Card>\n      <Wizard.Buttons />\n    </Wizard.Step>\n  )\n}\nrender(<Component />)\n'}),u=()=>(0,i.jsx)(a.Z,{scope:{useLocation:s.useLocation,navigate:s.navigate},noInline:!0,children:'const Component = () => {\n  Wizard.useReachRouter(\'wizard-with-router\', {\n    useLocation,\n    navigate,\n  })\n  return (\n    <Form.Handler>\n      <Wizard.Container id="wizard-with-router">\n        <MyStep title="Step 1" />\n        <MyStep title="Step 2" />\n        <MyStep title="Step 3" />\n      </Wizard.Container>\n    </Form.Handler>\n  )\n}\nconst MyStep = ({ title }) => {\n  return (\n    <Wizard.Step title={title}>\n      <Form.Card>\n        <P>Contents of {title}</P>\n      </Form.Card>\n      <Wizard.Buttons />\n    </Wizard.Step>\n  )\n}\nrender(<Component />)\n'});function c(n){const e=Object.assign({h2:"h2"},(0,o.ah)(),n.components);return t||l("Examples",!1),d||l("Examples.Default",!0),u||l("Examples.ReachRouter",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Demos"}),"\n",(0,i.jsx)(d,{}),"\n",(0,i.jsx)(e.h2,{children:"Reach router"}),"\n",(0,i.jsx)(u,{})]})}var h=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(c,n)})):c(n)};function l(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},43464:function(n,e,r){r.r(e);var t=r(52322),i=r(45392);function o(n){const e=Object.assign({h2:"h2",p:"p",pre:"pre",code:"code",ul:"ul",li:"li",a:"a",h3:"h3",h4:"h4"},(0,i.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Description"}),"\n",(0,t.jsx)(e.p,{children:"In order to store the current step in the browser location;"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"https://www.dnb.no/path/?unique-id-step=1\n"})}),"\n",(0,t.jsx)(e.p,{children:"you may use one of the listed React Hooks to easily integrate your application router."}),"\n",(0,t.jsxs)(e.p,{children:["The ",(0,t.jsx)(e.code,{children:"id"})," parameter is used to identify the ",(0,t.jsx)(e.code,{children:"Wizard.Container"})," component. But it is not required when used inside a ",(0,t.jsx)(e.code,{children:"Wizard.Container"}),"."]}),"\n",(0,t.jsx)(e.h2,{children:"Supported routers"}),"\n",(0,t.jsx)(e.p,{children:"If you use a router, you may connect one of the supported hooks to it. This way your application will not import unnecessary and unused code."}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://reactrouter.com/",children:"react-router-dom"})," via ",(0,t.jsx)(e.a,{href:"#with-react-router-dom",children:"useReactRouter"})]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://reach.tech/router/",children:"@reach/router"})," via ",(0,t.jsx)(e.a,{href:"#with-reachrouter",children:"useReachRouter"})]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://nextjs.org/",children:"Next.js"})," via ",(0,t.jsx)(e.a,{href:"#with-nextnavigation",children:"useNextRouter"})]}),"\n"]}),"\n",(0,t.jsxs)(e.p,{children:["If you don't use a router, you can make use of the ",(0,t.jsx)(e.a,{href:"#without-a-router",children:"useQueryLocator"})," hook."]}),"\n",(0,t.jsxs)(e.h3,{children:["With ",(0,t.jsx)(e.code,{children:"react-router-dom"})]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import { Form, Wizard } from '@dnb/eufemia/extensions/forms'\nimport { useSearchParams } from 'react-router-dom'\n\nfunction MyForm() {\n  Wizard.useReactRouter('unique-id', { useSearchParams })\n\n  return (\n    <Form.Handler>\n      <Wizard.Container id=\"unique-id\">...</Wizard.Container>\n    </Form.Handler>\n  )\n}\n"})}),"\n",(0,t.jsxs)(e.h3,{children:["With ",(0,t.jsx)(e.code,{children:"@reach/router"})]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import { Form, Wizard } from '@dnb/eufemia/extensions/forms'\nimport { navigate, useLocation } from '@reach/router'\n\nfunction MyForm() {\n  Wizard.useReachRouter('unique-id', { useLocation, navigate })\n\n  return (\n    <Form.Handler>\n      <Wizard.Container id=\"unique-id\">...</Wizard.Container>\n    </Form.Handler>\n  )\n}\n"})}),"\n",(0,t.jsxs)(e.h3,{children:["With ",(0,t.jsx)(e.code,{children:"next/navigation"})]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import { Form, Wizard } from '@dnb/eufemia/extensions/forms'\nimport { useRouter, usePathname, useSearchParams } from 'next/navigation'\n\nfunction MyForm() {\n  Wizard.useNextRouter('unique-id', {\n    useRouter,\n    usePathname,\n    useSearchParams,\n  })\n\n  return (\n    <Form.Handler>\n      <Wizard.Container id=\"unique-id\">...</Wizard.Container>\n    </Form.Handler>\n  )\n}\n"})}),"\n",(0,t.jsx)(e.h4,{children:"SSR support"}),"\n",(0,t.jsxs)(e.p,{children:["Each hook has a ",(0,t.jsx)(e.code,{children:"getIndex"})," function to get the current step index. You can unitize it to set the initial step index."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import { Form, Wizard } from '@dnb/eufemia/extensions/forms'\nimport { useRouter, usePathname, useSearchParams } from 'next/navigation'\n\nfunction MyForm() {\n  const { getIndex } = Wizard.useNextRouter('unique-id', {\n    useRouter,\n    usePathname,\n    useSearchParams,\n  })\n\n  return (\n    <Form.Handler>\n      <Wizard.Container initialActiveIndex={getIndex()} id=\"unique-id\">\n        ...\n      </Wizard.Container>\n    </Form.Handler>\n  )\n}\n"})}),"\n",(0,t.jsx)(e.h2,{children:"Without a router"}),"\n",(0,t.jsxs)(e.p,{children:["You connect the hook with the ",(0,t.jsx)(e.code,{children:"Wizard.Container"})," component via an unique ",(0,t.jsx)(e.code,{children:"id"})," (string). The ",(0,t.jsx)(e.code,{children:"id"})," will be used in the URL query string: ",(0,t.jsx)(e.code,{children:"url?unique-id-step=1"}),"."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import { Form, Wizard } from '@dnb/eufemia/extensions/forms'\n\nfunction MyForm() {\n  Wizard.useQueryLocator('unique-id')\n\n  return (\n    <Form.Handler>\n      <Wizard.Container id=\"unique-id\">...</Wizard.Container>\n    </Form.Handler>\n  )\n}\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(o,n)})):o(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-wizard-location-hooks-mdx-5e85a0237dae9e343923.js.map