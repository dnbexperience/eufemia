"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[35173],{9598:function(n,e,t){t.r(e);var a=t(52322),l=t(45392),i=t(59654),r=t(69159),o=t(45239);function u(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,l.ah)(),n.components);return o||m("Examples",!1),o.InheritLabel||m("Examples.InheritLabel",!0),o.InheritVisibility||m("Examples.InheritVisibility",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Demos"}),"\n",(0,a.jsx)(e.h3,{children:"String with label and value"}),"\n",(0,a.jsx)(i.LabelAndValue,{}),"\n",(0,a.jsx)(e.h3,{children:"SummaryList"}),"\n",(0,a.jsx)(r.DefaultLayout,{}),"\n",(0,a.jsx)(e.h3,{children:"Inherit visibility from fields"}),"\n",(0,a.jsx)(o.InheritVisibility,{}),"\n",(0,a.jsx)(e.h3,{children:"Inherit label"}),"\n",(0,a.jsx)(o.InheritLabel,{})]})}function m(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,l.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(u,n)})):u(n)}},45239:function(n,e,t){t.r(e),t.d(e,{Composition:function(){return r},InheritLabel:function(){return o},InheritVisibility:function(){return u},SummaryList:function(){return i}});var a=t(41404),l=t(52322);const i=()=>(0,l.jsx)(a.Z,{children:'<Value.SummaryList>\n  <Value.String label="Foo" value="value" />\n  <Value.Number label="Bar" value={123} />\n</Value.SummaryList>\n'}),r=()=>(0,l.jsx)(a.Z,{children:'<Value.SummaryList>\n  <Value.String label="Foo" value="value" />\n  <Value.Composition label="Label">\n    <Value.String value="value" />\n    <Value.Number value={123} />\n  </Value.Composition>\n</Value.SummaryList>\n'}),o=()=>(0,l.jsx)(a.Z,{children:'<Form.Handler\n  data={{\n    myPath: \'My value\',\n  }}\n>\n  <Flex.Stack>\n    <Value.String path="/myPath" inheritLabel />\n    <Field.String path="/myPath" label="Inherited label" />\n  </Flex.Stack>\n</Form.Handler>\n'}),u=()=>(0,l.jsx)(a.Z,{children:'<Form.Handler>\n  <Flex.Stack>\n    <Field.Boolean\n      label="Show radio buttons"\n      variant="button"\n      path="/isVisible"\n      defaultValue={true}\n    />\n\n    <Form.Visibility pathTrue="/isVisible" animate>\n      <Field.Selection\n        label="Radio buttons"\n        variant="radio"\n        path="/myValue"\n        defaultValue="foo"\n      >\n        <Field.Option value="foo" title="Foo" />\n        <Field.Option value="bar" title="Bar" />\n      </Field.Selection>\n    </Form.Visibility>\n\n    <Value.Selection path="/myValue" inheritLabel inheritVisibility />\n  </Flex.Stack>\n</Form.Handler>\n'})},59654:function(n,e,t){t.r(e),t.d(e,{Empty:function(){return i},Inline:function(){return s},Label:function(){return u},LabelAndValue:function(){return m},Placeholder:function(){return r},WithHelp:function(){return d},WithValue:function(){return o}});var a=t(41404),l=t(52322);const i=()=>(0,l.jsx)(a.Z,{children:"<Value.String showEmpty />\n"}),r=()=>(0,l.jsx)(a.Z,{children:'<Value.String placeholder="The value was not filled in" />\n'}),o=()=>(0,l.jsx)(a.Z,{children:'<Value.String value="Text value" />\n'}),u=()=>(0,l.jsx)(a.Z,{children:'<Value.String label="Label text" showEmpty />\n'}),m=()=>(0,l.jsx)(a.Z,{children:'<Value.String label="Label text" value="Text value" />\n'}),s=()=>(0,l.jsx)(a.Z,{children:"<P>\n  This is before the component <Value.String value=\"Text value\" inline />{' '}\n  This is after the component\n</P>\n"}),d=()=>(0,l.jsx)(a.Z,{children:"<Value.String\n  label=\"Label text\"\n  value=\"Value text\"\n  help={{\n    title: 'Help title',\n    content: 'Help content.',\n  }}\n/>\n"})},69159:function(n,e,t){t.r(e),t.d(e,{AnimatedVisibility:function(){return b},CombinedLayout:function(){return d},DefaultLayout:function(){return i},DefaultLayoutWithHelp:function(){return u},GridLayout:function(){return r},GridLayoutWithHelp:function(){return m},HorizontalLayout:function(){return o},HorizontalLayoutWithHelp:function(){return s},HorizontalLayoutWithoutLabel:function(){return c},InheritLabel:function(){return p},InheritVisibility:function(){return h}});var a=t(41404),l=t(52322);const i=()=>(0,l.jsx)(a.Z,{"data-visual-test":"forms-value-summary-list-default",children:"<Form.Handler\n  data={{\n    firstName: 'John',\n    lastName: 'Doe',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList>\n      <Value.Name.First path=\"/firstName\" />\n      <Value.Name.Last path=\"/lastName\" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n"}),r=()=>(0,l.jsx)(a.Z,{"data-visual-test":"forms-value-summary-list-grid",children:'<Form.Handler\n  data={{\n    firstName: \'John\',\n    lastName: \'Doe\',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList layout="grid">\n      <Value.Name.First path="/firstName" />\n      <Value.Name.Last path="/lastName" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'}),o=()=>(0,l.jsx)(a.Z,{"data-visual-test":"forms-value-summary-list-horizontal",children:'<Form.Handler\n  data={{\n    firstName: \'John\',\n    lastName: \'Doe\',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList layout="horizontal">\n      <Value.Name.First path="/firstName" />\n      <Value.Name.Last path="/lastName" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'}),u=()=>(0,l.jsx)(a.Z,{"data-visual-test":"forms-value-summary-list-default-with-help",children:"<Form.Handler\n  data={{\n    firstName: 'John',\n    lastName: 'Doe',\n    nickName: 'JD',\n    streetName: 'Osloveien',\n    streetNr: 12,\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList>\n      <Value.Name.First\n        path=\"/firstName\"\n        help={{\n          open: true,\n          title: 'Help title',\n          content: 'Help content',\n        }}\n      />\n      <Value.Name.Last path=\"/lastName\" />\n      <Value.String\n        path=\"/nickName\"\n        label=\"kallenavn\"\n        help={{\n          open: true,\n          title: 'Help title',\n          content: 'Help content',\n        }}\n      />\n      <Value.Composition\n        label=\"Street\"\n        help={{\n          open: true,\n          title: 'Help title',\n          content: 'Help content',\n        }}\n      >\n        <Value.String path=\"/streetName\" />\n        <Value.Number\n          path=\"/streetNr\"\n          help={{\n            open: true,\n            title: 'Help title',\n            content: 'Help content',\n          }}\n        />\n      </Value.Composition>\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n"}),m=()=>(0,l.jsx)(a.Z,{"data-visual-test":"forms-value-summary-list-grid-with-help",children:"<Form.Handler\n  data={{\n    firstName: 'John',\n    lastName: 'Doe',\n    nickName: 'JD',\n    streetName: 'Osloveien',\n    streetNr: 12,\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList layout=\"grid\">\n      <Value.Name.First\n        path=\"/firstName\"\n        help={{\n          open: true,\n          title: 'Help title',\n          content: 'Help content',\n        }}\n      />\n      <Value.Name.Last path=\"/lastName\" />\n      <Value.String\n        path=\"/nickName\"\n        label=\"kallenavn\"\n        help={{\n          open: true,\n          title: 'Help title',\n          content: 'Help content',\n        }}\n      />\n      <Value.Composition\n        label=\"Street\"\n        help={{\n          open: true,\n          title: 'Help title',\n          content: 'Help content',\n        }}\n      >\n        <Value.String path=\"/streetName\" />\n        <Value.Number\n          path=\"/streetNr\"\n          help={{\n            open: true,\n            title: 'Help title',\n            content: 'Help content',\n          }}\n        />\n      </Value.Composition>\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n"}),s=()=>(0,l.jsx)(a.Z,{"data-visual-test":"forms-value-summary-list-horizontal-with-help",children:"<Form.Handler\n  data={{\n    firstName: 'John',\n    lastName: 'Doe',\n    nickName: 'JD',\n    streetName: 'Osloveien',\n    streetNr: 12,\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList layout=\"horizontal\">\n      <Value.Name.First\n        path=\"/firstName\"\n        help={{\n          open: true,\n          title: 'Help title',\n          content: 'Help content',\n        }}\n      />\n      <Value.Name.Last path=\"/lastName\" />\n      <Value.String\n        path=\"/nickName\"\n        label=\"kallenavn\"\n        help={{\n          open: true,\n          title: 'Help title',\n          content: 'Help content',\n        }}\n      />\n      <Value.Composition\n        label=\"Street\"\n        help={{\n          open: true,\n          title: 'Help title',\n          content: 'Help content',\n        }}\n      >\n        <Value.String path=\"/streetName\" />\n        <Value.Number\n          path=\"/streetNr\"\n          help={{\n            open: true,\n            title: 'Help title',\n            content: 'Help content',\n          }}\n        />\n      </Value.Composition>\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n"}),d=()=>(0,l.jsx)(a.Z,{"data-visual-test":"forms-value-summary-list-combined",children:'<Form.Handler\n  data={{\n    firstName: \'John\',\n    lastName: \'Doe\',\n    streetName: \'Osloveien\',\n    streetNr: 12,\n    postalCode: \'1234\',\n    city: \'Oslo\',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList>\n      <Value.Name.First path="/firstName" />\n      <Value.Name.Last path="/lastName" />\n\n      <Value.Composition label="Street">\n        <Value.String path="/streetName" />\n        <Value.Number path="/streetNr" />\n      </Value.Composition>\n\n      <Value.Composition label="City">\n        <Value.String path="/postalCode" />\n        <Value.String path="/city" />\n      </Value.Composition>\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'});function h(){return(0,l.jsx)(a.Z,{children:'<Form.Handler>\n  <Form.Card>\n    <Field.Boolean\n      variant="button"\n      path="/isVisible"\n      defaultValue={true}\n    />\n\n    <Form.Visibility pathTrue="/isVisible" animate>\n      <Field.Name.First path="/foo" defaultValue="foo" />\n      <Field.Name.Last path="/bar" defaultValue="bar" />\n    </Form.Visibility>\n\n    <Value.SummaryList inheritVisibility>\n      <Value.Name.First path="/foo" />\n      <Value.Name.First path="/bar" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'})}function p(){return(0,l.jsx)(a.Z,{children:'<Form.Handler>\n  <Form.Card>\n    <Field.String path="/foo" defaultValue="foo" label="foo label" />\n    <Field.String path="/bar" defaultValue="bar" label="bar label" />\n\n    <Value.SummaryList inheritLabel>\n      <Value.String path="/foo" />\n      <Value.String path="/bar" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'})}const c=()=>(0,l.jsx)(a.Z,{"data-visual-test":"forms-value-summary-empty-label",children:'<Value.SummaryList layout="horizontal">\n  <Value.String value="foo" label="Foo" />\n  <Value.String value="bar" />\n  <Value.String value="baz" label="Baz" />\n</Value.SummaryList>\n'});function b(){return(0,l.jsx)(a.Z,{children:'<Form.Handler>\n  <Flex.Stack>\n    <Field.Boolean\n      label="Make second field visible when toggled"\n      path="/toggleValue"\n      variant="checkbox"\n    />\n\n    <Form.Card>\n      <Value.SummaryList>\n        <Value.String label="Label" value="First field" />\n\n        <Form.Visibility pathTrue="/toggleValue" animate>\n          <Value.String label="Label" value="Second field" />\n        </Form.Visibility>\n      </Value.SummaryList>\n    </Form.Card>\n  </Flex.Stack>\n</Form.Handler>\n'})}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-value-demos-mdx-82927b5a3d1bba83f328.js.map