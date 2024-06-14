"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[40858],{67471:function(n,t,e){e.r(t);var a=e(52322),i=e(45392),r=e(77464);function o(n){const t=Object.assign({h2:"h2",p:"p",a:"a",h3:"h3"},(0,i.ah)(),n.components);return r||s("Examples",!1),r.DynamicSteps||s("Examples.DynamicSteps",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:"Demos"}),"\n",(0,a.jsxs)(t.p,{children:["See ",(0,a.jsx)(t.a,{href:"/uilib/extensions/forms/Wizard/Container/demos",children:"WizardContainer demo section"})," for more examples."]}),"\n",(0,a.jsx)(t.h3,{children:"Dynamic steps"}),"\n",(0,a.jsx)(r.DynamicSteps,{})]})}function s(n,t){throw new Error("Expected "+(t?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(n){void 0===n&&(n={});const{wrapper:t}=Object.assign({},(0,i.ah)(),n.components);return t?(0,a.jsx)(t,Object.assign({},n,{children:(0,a.jsx)(o,n)})):o(n)}},77464:function(n,t,e){e.r(t),e.d(t,{DynamicSteps:function(){return r},EditButton:function(){return o}});var a=e(58469),i=e(52322);const r=()=>(0,i.jsx)(a.Z,{children:'<Form.Handler\n  defaultData={{\n    activeSteps: \'group-1\',\n  }}\n>\n  <Wizard.Container id="my-wizard">\n    <Wizard.Step\n      title="Step 1"\n      activeWhen={{\n        path: \'/activeSteps\',\n        hasValue: \'group-1\',\n      }}\n    >\n      <Form.MainHeading>Step 1</Form.MainHeading>\n      <Wizard.Buttons />\n    </Wizard.Step>\n\n    <Wizard.Step\n      title="Step 2"\n      activeWhen={{\n        path: \'/activeSteps\',\n        hasValue: \'group-1\',\n      }}\n    >\n      <Form.MainHeading>Step 2</Form.MainHeading>\n      <Wizard.Buttons />\n    </Wizard.Step>\n\n    <Wizard.Step\n      title="Step 3"\n      activeWhen={{\n        path: \'/activeSteps\',\n        withValue: (value: string) =>\n          [\'group-1\', \'group-2\'].includes(value),\n      }}\n    >\n      <Form.MainHeading>Step 3</Form.MainHeading>\n      <Wizard.Buttons />\n    </Wizard.Step>\n\n    <Wizard.Step\n      title="Step 4"\n      activeWhen={{\n        path: \'/activeSteps\',\n        hasValue: \'group-2\',\n      }}\n    >\n      <Form.MainHeading>Step 4</Form.MainHeading>\n      <Wizard.Buttons />\n    </Wizard.Step>\n  </Wizard.Container>\n\n  <Field.Selection\n    path="/activeSteps"\n    variant="button"\n    optionsLayout="horizontal"\n    top\n  >\n    <Field.Option value="group-1" title="Group 1" />\n    <Field.Option value="group-2" title="Group 2" />\n  </Field.Selection>\n</Form.Handler>\n'}),o=()=>(0,i.jsx)(a.Z,{"data-visual-test":"wizard-edit-button",noInline:!0,children:'const Step = ({ title }) => {\n  return (\n    <Wizard.Step title={title}>\n      <Card stack>\n        <P>Contents</P>\n      </Card>\n\n      <Wizard.Buttons />\n    </Wizard.Step>\n  )\n}\nconst Summary = () => {\n  const { summaryTitle } = Form.useLocale().Step\n  return (\n    <Wizard.Step title={summaryTitle}>\n      <Card stack>\n        <Value.SummaryList>\n          <Value.Name.First path="/firstName" />\n        </Value.SummaryList>\n\n        <Wizard.EditButton toStep={0} />\n      </Card>\n    </Wizard.Step>\n  )\n}\nrender(\n  <Form.Handler\n    data={{\n      firstName: \'John\',\n    }}\n  >\n    <Wizard.Container initialActiveIndex={1}>\n      <Step title="Step" />\n      <Summary />\n    </Wizard.Container>\n  </Form.Handler>,\n)\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-wizard-step-demos-mdx-672ecf013220d7ce0fea.js.map