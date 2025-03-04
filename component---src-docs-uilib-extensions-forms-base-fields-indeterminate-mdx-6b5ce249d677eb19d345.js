"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[66327,72851,98493],{29836:function(e,n,t){t.r(n);var a=t(52322),l=t(45392),d=t(62891),c=t(48349);function o(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d.default,{}),"\n",(0,a.jsx)(c.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(o,e)})):o()}},48349:function(e,n,t){t.r(n),t.d(n,{default:function(){return s}});var a={};t.r(a),t.d(a,{MixedIndeterminateDependence:function(){return o},NestedIndeterminateDependence:function(){return i},PropagateIndeterminateDependence:function(){return r}});var l=t(52322),d=t(45392),c=t(41404);const o=()=>(0,l.jsx)(c.Z,{children:'<Form.Handler onChange={console.log}>\n  <Form.Card>\n    <Field.Indeterminate\n      label="Indeterminate"\n      dependencePaths={[\'/child1\', \'/child2\', \'/child3\']}\n    />\n\n    <Field.Toggle\n      label="Checkbox 1"\n      path="/child1"\n      valueOn="what-ever"\n      valueOff="you-name-it"\n      required\n    />\n\n    <Field.Boolean label="Checkbox 2" path="/child2" required />\n\n    <Field.Toggle\n      label="Checkbox 3"\n      path="/child3"\n      valueOn="on"\n      valueOff="off"\n    />\n  </Form.Card>\n\n  <Form.SubmitButton />\n</Form.Handler>\n'}),r=()=>(0,l.jsx)(c.Z,{noInline:!0,children:'const MyFormContent = () => {\n  const { data } = Form.useData()\n  return (\n    <>\n      <Form.Card>\n        <Field.Selection label="Propagate to" path="/propagate">\n          <Field.Option value="checked">Checked</Field.Option>\n          <Field.Option value="unchecked">Unchecked</Field.Option>\n          <Field.Option value="auto">Auto</Field.Option>\n        </Field.Selection>\n\n        <Field.Indeterminate\n          label="Indeterminate"\n          dependencePaths={[\'/child1\', \'/child2\', \'/child3\']}\n          propagateIndeterminateState={data[\'propagate\']}\n        />\n\n        <Field.Toggle\n          label="Checkbox 1"\n          path="/child1"\n          valueOn="what-ever"\n          valueOff="you-name-it"\n        />\n\n        <Field.Boolean label="Checkbox 2" path="/child2" />\n\n        <Field.Toggle\n          label="Checkbox 3"\n          path="/child3"\n          valueOn="on"\n          valueOff="off"\n        />\n      </Form.Card>\n    </>\n  )\n}\nconst MyForm = () => {\n  return (\n    <Form.Handler\n      id="propagate-demo"\n      defaultData={{\n        propagate: \'checked\',\n        child1: \'you-name-it\',\n        child2: true,\n        child3: \'on\',\n      }}\n      onChange={console.log}\n    >\n      <MyFormContent />\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),i=()=>(0,l.jsx)(c.Z,{children:'<Form.Handler onChange={console.log}>\n  <Form.Card>\n    <Field.Indeterminate\n      label="1"\n      path="/p1"\n      dependencePaths={[\'/c2.1\', \'/p2.2\', \'/c3.1\', \'/c3.2\']}\n    />\n\n    <Flex.Stack left="large">\n      <Field.Boolean label="2.1" path="/c2.1" />\n      <Field.Indeterminate\n        label="2.2"\n        valueOn="what-ever"\n        valueOff="you-name-it"\n        path="/p2.2"\n        dependencePaths={[\'/c3.1\', \'/c3.2\']}\n      />\n\n      <Flex.Stack left="large">\n        <Field.Boolean label="3.1" path="/c3.1" />\n        <Field.Toggle\n          label="3.2"\n          path="/c3.2"\n          valueOn="what-ever"\n          valueOff="you-name-it"\n        />\n      </Flex.Stack>\n    </Flex.Stack>\n  </Form.Card>\n</Form.Handler>\n'});function h(e){const n=Object.assign({h2:"h2",h3:"h3",code:"code"},(0,d.ah)(),e.components);return a||p("Examples",!1),o||p("Examples.MixedIndeterminateDependence",!0),i||p("Examples.NestedIndeterminateDependence",!0),r||p("Examples.PropagateIndeterminateDependence",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Demos"}),"\n",(0,l.jsx)(n.h3,{children:"Indeterminate state (partially checked)"}),"\n",(0,l.jsx)(o,{}),"\n",(0,l.jsx)(n.h3,{children:"Nested indeterminate state"}),"\n",(0,l.jsx)(i,{}),"\n",(0,l.jsxs)(n.h3,{children:["Propagate to ",(0,l.jsx)(n.code,{children:"auto"}),", ",(0,l.jsx)(n.code,{children:"checked"})," and ",(0,l.jsx)(n.code,{children:"unchecked"})]}),"\n",(0,l.jsx)(r,{})]})}var s=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,d.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(h,e)})):h(e)};function p(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},62891:function(e,n,t){t.r(n);var a=t(52322),l=t(45392);function d(e){const n=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre",a:"a",ul:"ul",li:"li"},(0,l.ah)(),e.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:"Description"}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"Field.Indeterminate"})," component is used to display and handle the indeterminate state of a checkbox. It is an uncontrolled component, meaning that the state is managed automatically."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-tsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\nrender(\n  <Field.Indeterminate\n    dependencePaths={['/checkbox1', '/checkbox2', '/checkbox3']}\n    path=\"/checkboxParent\"\n  />,\n)\n"})}),"\n",(0,a.jsx)(n.p,{children:"It should only be used in combination with checkbox looking variants."}),"\n",(0,a.jsxs)(n.p,{children:["Under the hood the ",(0,a.jsx)(n.a,{href:"/uilib/extensions/forms/base-fields/Toggle/",children:"Toggle"})," base field is used. That means you can use all the properties from the ",(0,a.jsx)(n.code,{children:"Toggle"})," component."]}),"\n",(0,a.jsx)(n.h2,{children:"Details about the state handling"}),"\n",(0,a.jsx)(n.p,{children:"The indeterminate state of a parent checkbox should be shown when some children checkboxes are checked, but not all. In detail:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["When all children are checked, the parent should get checked.","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"When the parent gets checked (clicked), all children should get checked."}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["When all children are unchecked, the parent should get unchecked.","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"When the parent gets unchecked (clicked), all children should get unchecked."}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["When some children are checked, the parent should be set in an indeterminate state.","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["When the parent gets clicked, all children should get checked. This behavior can be changed to the opposite or ",(0,a.jsx)(n.code,{children:"auto"})," by using the ",(0,a.jsx)(n.code,{children:"propagateIndeterminateState"})," property. Auto means that the parent will switch from its current state to be inverted."]}),"\n"]}),"\n"]}),"\n"]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(d,e)})):d(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-base-fields-indeterminate-mdx-6b5ce249d677eb19d345.js.map