"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[75871,9068,60197,50927],{79841:function(n,e,r){r.r(e);var t=r(52322),i=r(45392),a=r(45327),s=r(13450);function o(n){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.default,{}),"\n",(0,t.jsx)(s.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(o,n)})):o()}},13450:function(n,e,r){r.r(e);var t=r(52322),i=r(45392),a=r(40781);function s(n){const e=Object.assign({h2:"h2"},(0,i.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Components"}),"\n",(0,t.jsx)(a.default,{size:"small"})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(s,n)})):s(n)}},45327:function(n,e,r){r.r(e),r.d(e,{default:function(){return c}});var t={};r.r(t),r.d(t,{IntroExample:function(){return o}});var i=r(52322),a=r(45392),s=r(58469);const o=()=>(0,i.jsx)(s.Z,{hideCode:!0,noInline:!0,children:'const MyForm = () => {\n  // Routers like "react-router" are supported as well\n  Wizard.useQueryLocator(\'my-wizard\')\n  return (\n    <Form.Handler>\n      <Wizard.Container\n        id="my-wizard"\n        variant="drawer"\n        omitScrollManagement\n      >\n        <Wizard.Step title="Step 1">\n          <Form.MainHeading>Heading</Form.MainHeading>\n          <Card stack>\n            <P>Step 1</P>\n          </Card>\n          <Wizard.Buttons />\n        </Wizard.Step>\n        <Wizard.Step title="Step 2">\n          <Form.MainHeading>Heading</Form.MainHeading>\n          <Card stack>\n            <P>Step 2</P>\n          </Card>\n          <Wizard.Buttons />\n        </Wizard.Step>\n      </Wizard.Container>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'});function d(n){const e=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,a.ah)(),n.components);return t||l("Examples",!1),o||l("Examples.IntroExample",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Description"}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"Wizard"})," is a set of components for showing forms with a ",(0,i.jsx)(e.a,{href:"/uilib/components/step-indicator/",children:"StepIndicator"})," for navigation between several wizard. It also includes components for navigating between wizard."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-tsx",children:'import { Wizard } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Wizard.Container>\n    <Wizard.Step title="Step 1">...</Wizard.Step>\n    <Wizard.Step title="Step 2">...</Wizard.Step>\n  </Wizard.Container>,\n)\n'})}),"\n",(0,i.jsx)(e.h2,{children:"Intro example"}),"\n",(0,i.jsx)(o,{}),"\n",(0,i.jsx)(e.h2,{children:"Dynamic steps support"}),"\n",(0,i.jsxs)(e.p,{children:["You can use the ",(0,i.jsx)(e.code,{children:"Wizard.Step"})," component to create dynamic steps. The ",(0,i.jsx)(e.code,{children:"active"})," and ",(0,i.jsx)(e.code,{children:"activeWhen"})," props can be used to enable or disable a step based on the current data. Here is a ",(0,i.jsx)(e.a,{href:"/uilib/extensions/forms/Wizard/Step/",children:"demo of a dynamic step"}),"."]}),"\n",(0,i.jsx)(e.h2,{children:"Summary step"}),"\n",(0,i.jsxs)(e.p,{children:["A Wizard needs a summary step at the end. You can use the ",(0,i.jsx)(e.code,{children:"Wizard.Step"})," component for that, including the ",(0,i.jsx)(e.a,{href:"/uilib/extensions/forms/Value/SummaryList/",children:"Value.SummaryList"})," component:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-tsx",children:'import { Form, Wizard, Value } from \'@dnb/eufemia/extensions/forms\'\n\nconst MyForm = () => {\n  const { summaryTitle } = Form.useLocale().Step\n\n  return (\n    <Form.Handler>\n      <Wizard.Container>\n        <Wizard.Step title="Step 1">...</Wizard.Step>\n        <Wizard.Step title="Step 2">...</Wizard.Step>\n        <Wizard.Step title={summaryTitle}>\n          <Value.SummaryList layout="grid">\n            <Value.String label="Label" path="/myValue" />\n          </Value.SummaryList>\n        </Wizard.Step>\n      </Wizard.Container>\n    </Form.Handler>\n  )\n}\n'})})]})}var c=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(d,n)})):d(n)};function l(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},40781:function(n,e,r){r.r(e),r.d(e,{default:function(){return s}});var t=r(68270),i=r(77491),a=r(52322);function s(n){const{allMdx:{edges:e}}=(0,t.useStaticQuery)("2553442064");return(0,a.jsx)(i.Z,{edges:e,...n})}},77491:function(n,e,r){r.d(e,{Z:function(){return p}});var t=r(2784),i=r(42351),a=r(65359),s=r(43095),o=r(79254),d=r(68514),c=r(61185),l=r(595),u=r(52322);function p(n){let{edges:e,level:r,size:p,description:m=null,returnListItems:h=!1,...x}=n;const j=h?i.Z:t.Fragment;(0,d.TW)(r||2);const f=e.map(((n,e)=>{let{node:{frontmatter:{title:t,description:i},fields:{slug:d}}}=n;return(0,u.jsx)(j,{children:(0,u.jsx)(f,{})},e);function f(){return h?(0,u.jsxs)(a.Z,{children:[(0,u.jsx)(o.Z,{href:"/"+d,children:t}),(0,u.jsx)("br",{})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.Z,{level:r||2,size:p,useSlug:"/"+d,title:t,...x,children:(0,u.jsx)(o.Z,{href:"/"+d,children:t})}),(null!==m?m:i)&&(0,u.jsx)(c.D,{components:l.L,children:null!==m?m:i})]})}}));return(0,u.jsx)(u.Fragment,{children:f})}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-wizard-mdx-2202c5c30015f5ba267b.js.map