"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[23630,65802,68905],{17457:function(n,t,e){e.r(t);var a=e(52322),r=e(45392),i=e(80766),o=e(90797);function s(n){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.default,{}),"\n",(0,a.jsx)(o.default,{})]})}t.default=function(n){void 0===n&&(n={});const{wrapper:t}=Object.assign({},(0,r.ah)(),n.components);return t?(0,a.jsx)(t,Object.assign({},n,{children:(0,a.jsx)(s,n)})):s()}},90797:function(n,t,e){e.r(t);var a=e(52322),r=e(45392),i=e(77464);function o(n){const t=Object.assign({h2:"h2"},(0,r.ah)(),n.components);return i||s("Examples",!1),i.EditButton||s("Examples.EditButton",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:"Demo"}),"\n",(0,a.jsx)(i.EditButton,{})]})}function s(n,t){throw new Error("Expected "+(t?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(n){void 0===n&&(n={});const{wrapper:t}=Object.assign({},(0,r.ah)(),n.components);return t?(0,a.jsx)(t,Object.assign({},n,{children:(0,a.jsx)(o,n)})):o(n)}},80766:function(n,t,e){e.r(t);var a=e(52322),r=e(45392);function i(n){const t=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre"},(0,r.ah)(),n.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:"Description"}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:"Wizard.EditButton"})," is a button to be placed in a summary step."]}),"\n",(0,a.jsxs)(t.p,{children:["It provides a ",(0,a.jsx)(t.code,{children:"toStep"})," property that lets you navigate to a specific step."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-jsx",children:"import { Hr } from '@dnb/eufemia'\nimport { Form, Wizard, Value } from '@dnb/eufemia/extensions/forms'\n\nrender(\n  <Form.Handler>\n    <Wizard.Layout>\n      <Wizard.Step title=\"Summary\">\n        <Form.Card>\n          <Value.Name.First path=\"/firstName\" />\n          <Hr />\n          <Wizard.EditButton toStep={2} />\n        </Form.Card>\n      </Wizard.Step>\n    </Wizard.Layout>\n  </Form.Handler>,\n)\n"})})]})}t.default=function(n){void 0===n&&(n={});const{wrapper:t}=Object.assign({},(0,r.ah)(),n.components);return t?(0,a.jsx)(t,Object.assign({},n,{children:(0,a.jsx)(i,n)})):i(n)}},77464:function(n,t,e){e.r(t),e.d(t,{DynamicSteps:function(){return i},EditButton:function(){return o}});var a=e(46832),r=e(52322);const i=()=>(0,r.jsx)(a.Z,{children:'<Form.Handler\n  defaultData={{\n    activeSteps: \'group-1\',\n  }}\n>\n  <Wizard.Container\n    onStepChange={(index, mode, args) => {\n      console.log(\'onStepChange\', index, mode, args.id)\n    }}\n  >\n    <Wizard.Step\n      title="Step A"\n      id="step-a"\n      activeWhen={{\n        path: \'/activeSteps\',\n        hasValue: \'group-1\',\n      }}\n    >\n      <Form.MainHeading>Step A</Form.MainHeading>\n      <Wizard.Buttons />\n    </Wizard.Step>\n\n    <Wizard.Step\n      title="Step B"\n      id="step-b"\n      activeWhen={{\n        path: \'/activeSteps\',\n        hasValue: \'group-1\',\n      }}\n    >\n      <Form.MainHeading>Step B</Form.MainHeading>\n      <Wizard.Buttons />\n    </Wizard.Step>\n\n    <Wizard.Step\n      title="Step C"\n      id="step-c"\n      activeWhen={{\n        path: \'/activeSteps\',\n        hasValue: (value: string) =>\n          [\'group-1\', \'group-2\'].includes(value),\n      }}\n    >\n      <Form.MainHeading>Step C</Form.MainHeading>\n      <Wizard.Buttons />\n    </Wizard.Step>\n\n    <Wizard.Step\n      title="Step D"\n      id="step-d"\n      activeWhen={{\n        path: \'/activeSteps\',\n        hasValue: \'group-2\',\n      }}\n    >\n      <Form.MainHeading>Step D</Form.MainHeading>\n      <Wizard.Buttons />\n    </Wizard.Step>\n  </Wizard.Container>\n\n  <Field.Selection\n    path="/activeSteps"\n    variant="button"\n    optionsLayout="horizontal"\n    top\n  >\n    <Field.Option value="group-1" title="Group 1" />\n    <Field.Option value="group-2" title="Group 2" />\n  </Field.Selection>\n</Form.Handler>\n'}),o=()=>(0,r.jsx)(a.Z,{"data-visual-test":"wizard-edit-button",noInline:!0,children:'const Step = ({ title }) => {\n  return (\n    <Wizard.Step title={title}>\n      <Form.Card>\n        <P>Contents</P>\n      </Form.Card>\n\n      <Wizard.Buttons />\n    </Wizard.Step>\n  )\n}\nconst Summary = () => {\n  const { summaryTitle } = Form.useLocale().Step\n  return (\n    <Wizard.Step title={summaryTitle}>\n      <Form.Card>\n        <Value.SummaryList>\n          <Value.Name.First path="/firstName" />\n        </Value.SummaryList>\n\n        <Wizard.EditButton toStep={0} />\n      </Form.Card>\n    </Wizard.Step>\n  )\n}\nrender(\n  <Form.Handler\n    data={{\n      firstName: \'John\',\n    }}\n  >\n    <Wizard.Container initialActiveIndex={1}>\n      <Step title="Step" />\n      <Summary />\n    </Wizard.Container>\n  </Form.Handler>,\n)\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-wizard-edit-button-mdx-8aa9fff4e168d29ae508.js.map