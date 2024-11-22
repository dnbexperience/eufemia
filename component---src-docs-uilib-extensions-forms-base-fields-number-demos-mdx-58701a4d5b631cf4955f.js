"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[42487],{86067:function(e,n,l){l.r(n),l.d(n,{default:function(){return W}});var a={};l.r(a),l.d(a,{Alignment:function(){return x},AllowNegative:function(){return v},Disabled:function(){return g},DisallowLeadingZeroes:function(){return w},ExclusiveMinMax:function(){return m},HorizontalLayout:function(){return h},LabelAndDescription:function(){return u},LabelAndValue:function(){return s},Percentage:function(){return C},Placeholder:function(){return o},PrefixAndSuffix:function(){return c},ValidateMaximumCustomError:function(){return F},ValidateMinimum:function(){return j},ValidateRequired:function(){return f},Widths:function(){return p},WithHelp:function(){return b},WithSlider:function(){return E},WithStatus:function(){return d},WithStepControls:function(){return V},WithStepControlsDisabled:function(){return S},WithStepControlsError:function(){return N}});var t=l(52322),i=l(45392),r=l(46832);l(2784);const o=()=>(0,t.jsx)(r.Z,{children:'<Field.Number\n  label="Label text"\n  placeholder="Enter a number..."\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),s=()=>(0,t.jsx)(r.Z,{children:"<Field.Number\n  label=\"Label text\"\n  defaultValue={420000.25}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),u=()=>(0,t.jsx)(r.Z,{"data-visual-test":"number-label-description",children:'<Form.Card>\n  <Field.Number\n    label="Label text"\n    labelDescription="Description text"\n    placeholder="Enter a text..."\n  />\n  <Field.Number\n    label="Label text"\n    labelDescription="\nDescription text with new line using \\n"\n    placeholder="Enter a text..."\n  />\n</Form.Card>\n'}),d=()=>(0,t.jsx)(r.Z,{"data-visual-test":"number-status",children:'<Form.Card>\n  <Field.Number\n    label="Label text"\n    placeholder="Enter a number..."\n    width="large"\n    warning="Short warning."\n    required\n  />\n  <Field.Number\n    label="Label text"\n    defaultValue={420000}\n    width="large"\n    info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."\n    required\n  />\n  <Field.Number\n    label="Label text"\n    value={1234}\n    width="small"\n    warning="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et. Velit incididunt exercitation est magna ex irure dolore nisi eiusmod ea exercitation."\n    required\n  />\n</Form.Card>\n'}),h=()=>(0,t.jsx)(r.Z,{"data-visual-test":"number-horizontal-layout",children:'<Form.Card>\n  <Field.Provider\n    layout="horizontal"\n    layoutOptions={{\n      width: \'medium\', // can be a rem value\n    }}\n    required\n  >\n    <Field.Number\n      label="Label text"\n      defaultValue={420000}\n      step={10000}\n      showStepControls\n    />\n    <Field.Number\n      label="Label with a long text that will wrap"\n      placeholder="Enter a number..."\n      info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."\n    />\n    <Field.Number\n      label="Label with a long text that will wrap"\n      placeholder="Enter a number..."\n      size="large"\n      width="stretch"\n    />\n  </Field.Provider>\n</Form.Card>\n'}),m=()=>(0,t.jsx)(r.Z,{children:'<Field.Number\n  defaultValue={1000}\n  label="Label text"\n  allowNegative={false}\n  required\n  exclusiveMinimum={900}\n  exclusiveMaximum={1000}\n  validateInitially\n/>\n'}),c=()=>(0,t.jsx)(r.Z,{children:"<Flex.Stack>\n  <Field.Number\n    defaultValue={1234}\n    label=\"With prefix\"\n    prefix=\"prefix \"\n    onChange={(value) => console.log('onChange', value)}\n  />\n  <Field.Number\n    defaultValue={1}\n    label=\"With suffix (function)\"\n    suffix={(value) => (value === 1 ? ' year' : ' years')}\n    onChange={(value) => console.log('onChange', value)}\n  />\n</Flex.Stack>\n"}),x=()=>(0,t.jsx)(r.Z,{children:'<Flex.Stack>\n  <Field.Number\n    align="center"\n    label="Center aligned (default)"\n    defaultValue={10}\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n  <Field.Number\n    align="left"\n    label="Left aligned"\n    defaultValue={10}\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n  <Field.Number\n    align="right"\n    label="Right aligned"\n    defaultValue={10}\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n</Flex.Stack>\n'}),b=()=>(0,t.jsx)(r.Z,{children:"<Field.Number\n  defaultValue={12345}\n  label=\"Label text\"\n  help={{\n    title: 'Help is available',\n    content:\n      'Here is what a team can do for you. . . . It allows you to help others do their best.',\n  }}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),p=()=>(0,t.jsx)(r.Z,{hideCode:!0,"data-visual-test":"number-widths",children:'<Flex.Stack>\n  <Form.SubHeading>Without step controls</Form.SubHeading>\n\n  <Field.Number\n    label="Default width (property omitted)"\n    defaultValue={1234}\n  />\n  <Field.Number label="Small" defaultValue={1234} width="small" />\n  <Field.Number\n    label="Medium (and medium size)"\n    defaultValue={1234}\n    width="medium"\n    size="medium"\n  />\n  <Field.Number\n    label="Large (and large size)"\n    defaultValue={1234}\n    width="large"\n    size="large"\n  />\n  <Field.Number label="Stretch" defaultValue={1234} width="stretch" />\n  <Form.SubHeading>With step controls</Form.SubHeading>\n  <Field.Number\n    showStepControls\n    label="Default width (property omitted)"\n    defaultValue={1234}\n  />\n  <Field.Number\n    showStepControls\n    label="Small"\n    defaultValue={1234}\n    width="small"\n  />\n  <Field.Number\n    showStepControls\n    label="Medium (and medium size)"\n    defaultValue={1234}\n    width="medium"\n    size="medium"\n  />\n  <Field.Number\n    showStepControls\n    label="Large (and large size)"\n    defaultValue={1234}\n    width="large"\n    size="large"\n  />\n  <Field.Number\n    showStepControls\n    label="Stretch"\n    defaultValue={1234}\n    width="stretch"\n  />\n</Flex.Stack>\n'}),g=()=>(0,t.jsx)(r.Z,{children:"<Field.Number\n  defaultValue={135}\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n  disabled\n/>\n"}),f=()=>(0,t.jsx)(r.Z,{children:"<Field.Number\n  defaultValue={123}\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n  required\n/>\n"}),j=()=>(0,t.jsx)(r.Z,{children:"<Field.Number\n  defaultValue={300}\n  label=\"Enter a number below 250 and blur to trigger error\"\n  onChange={(value) => console.log('onChange', value)}\n  minimum={250}\n/>\n"}),v=()=>(0,t.jsx)(r.Z,{children:"<Field.Number allowNegative={false} />\n"}),w=()=>(0,t.jsx)(r.Z,{children:"<Field.Number disallowLeadingZeroes />\n"}),C=()=>(0,t.jsx)(r.Z,{children:"<Field.Number\n  percent\n  defaultValue={80}\n  label=\"Percentage\"\n  onChange={(value) => console.log('onChange', value)}\n  minimum={90}\n/>\n"}),F=()=>(0,t.jsx)(r.Z,{children:'<Field.Number\n  label="Enter a number above 250 and blur to trigger error"\n  defaultValue={200}\n  maximum={250}\n  errorMessages={{\n    maximum: "You can\'t enter a number THAR large.. Max 250!",\n  }}\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),V=()=>(0,t.jsx)(r.Z,{"data-visual-test":"number-input-step-controls",children:'<Field.Number\n  label="Label text"\n  showStepControls\n  minimum={0}\n  maximum={100}\n  step={10}\n  defaultValue={50}\n/>\n'}),N=()=>(0,t.jsx)(r.Z,{"data-visual-test":"number-input-step-controls-error",children:"<Field.Number\n  label=\"Label text\"\n  showStepControls\n  maximum={100}\n  defaultValue={150}\n  error={new Error('You done messed up, A-a-ron!')}\n/>\n"}),S=()=>(0,t.jsx)(r.Z,{"data-visual-test":"number-input-step-controls-disabled",children:'<Field.Number label="Label text" showStepControls disabled />\n'}),E=()=>(0,t.jsx)(r.Z,{hideCode:!0,noInline:!0,children:'const Component = () => {\n  const [value, setValue] = React.useState(50000)\n  const settings = {\n    min: 0,\n    max: 100000,\n    step: 1000,\n  }\n  return (\n    <Grid.Container>\n      <Grid.Item\n        span={{\n          small: [1, 12],\n          medium: [1, 4],\n          large: [1, 3],\n        }}\n      >\n        <Field.Number\n          label="Label text"\n          showStepControls\n          minimum={settings.min}\n          maximum={settings.max}\n          step={settings.step}\n          value={value}\n          onChange={(value) => setValue(value)}\n          width="stretch"\n          bottom="small"\n        />\n        <Slider\n          min={settings.min}\n          max={settings.max}\n          step={settings.step}\n          value={value}\n          onChange={({ value }) => setValue(parseFloat(String(value)))}\n          hideButtons\n          tooltip\n        />\n      </Grid.Item>\n    </Grid.Container>\n  )\n}\nrender(<Component />)\n'});function L(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p",a:"a",code:"code",h4:"h4"},(0,i.ah)(),e.components),{VisibleWhenVisualTest:l}=n;return a||Z("Examples",!1),x||Z("Examples.Alignment",!0),v||Z("Examples.AllowNegative",!0),g||Z("Examples.Disabled",!0),w||Z("Examples.DisallowLeadingZeroes",!0),m||Z("Examples.ExclusiveMinMax",!0),h||Z("Examples.HorizontalLayout",!0),u||Z("Examples.LabelAndDescription",!0),s||Z("Examples.LabelAndValue",!0),C||Z("Examples.Percentage",!0),o||Z("Examples.Placeholder",!0),c||Z("Examples.PrefixAndSuffix",!0),F||Z("Examples.ValidateMaximumCustomError",!0),j||Z("Examples.ValidateMinimum",!0),f||Z("Examples.ValidateRequired",!0),p||Z("Examples.Widths",!0),b||Z("Examples.WithHelp",!0),E||Z("Examples.WithSlider",!0),d||Z("Examples.WithStatus",!0),V||Z("Examples.WithStepControls",!0),S||Z("Examples.WithStepControlsDisabled",!0),N||Z("Examples.WithStepControlsError",!0),l||Z("VisibleWhenVisualTest",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{children:"Demos"}),"\n",(0,t.jsx)(n.h3,{children:"Label and value"}),"\n",(0,t.jsx)(s,{}),"\n",(0,t.jsx)(n.h3,{children:"Label and description"}),"\n",(0,t.jsx)(u,{}),"\n",(0,t.jsx)(n.h3,{children:"With a horizontal layout"}),"\n",(0,t.jsxs)(n.p,{children:["This example uses ",(0,t.jsx)(n.a,{href:"/uilib/extensions/forms/feature-fields/Provider/",children:"Field.Provider"})," to set the ",(0,t.jsx)(n.code,{children:"layout"})," to ",(0,t.jsx)(n.code,{children:"horizontal"})," and ",(0,t.jsx)(n.code,{children:"layoutOptions"})," to ",(0,t.jsx)(n.code,{children:"{ width: 'medium' }"})," for all nested fields."]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"width"})," of the horizontal label can be set to ",(0,t.jsx)(n.code,{children:"small"}),", ",(0,t.jsx)(n.code,{children:"medium"}),", ",(0,t.jsx)(n.code,{children:"large"})," or a ",(0,t.jsx)(n.code,{children:"rem"})," value."]}),"\n",(0,t.jsx)(h,{}),"\n",(0,t.jsx)(n.h3,{children:"Placeholder"}),"\n",(0,t.jsx)(o,{}),"\n",(0,t.jsx)(n.h3,{children:"With a status"}),"\n",(0,t.jsx)(n.p,{children:"This example demonstrates how the status message width adjusts according to the field width."}),"\n",(0,t.jsx)(d,{}),"\n",(0,t.jsx)(n.h4,{children:"With help"}),"\n",(0,t.jsx)(b,{}),"\n",(0,t.jsx)(n.h3,{children:"Exclusive minimum and exclusive maximum"}),"\n",(0,t.jsx)(m,{}),"\n",(0,t.jsx)(n.h3,{children:"Prefix and suffix"}),"\n",(0,t.jsx)(n.p,{children:"You can also use a function as a prefix or suffix."}),"\n",(0,t.jsx)(c,{}),"\n",(0,t.jsx)(n.h3,{children:"Alignment"}),"\n",(0,t.jsx)(x,{}),"\n",(0,t.jsx)(n.h3,{children:"With help"}),"\n",(0,t.jsx)(b,{}),"\n",(0,t.jsx)(n.h3,{children:"With step controls"}),"\n",(0,t.jsx)(V,{}),"\n",(0,t.jsx)(n.h3,{children:"With step controls in conjunction with Slider"}),"\n",(0,t.jsx)(E,{}),"\n",(0,t.jsx)(n.h3,{children:"Disabled"}),"\n",(0,t.jsx)(g,{}),"\n",(0,t.jsx)(n.h3,{children:"Validation - Required"}),"\n",(0,t.jsx)(f,{}),"\n",(0,t.jsx)(n.h3,{children:"Validation - Minimum"}),"\n",(0,t.jsx)(j,{}),"\n",(0,t.jsx)(n.h3,{children:"Validation - Maximum and custom error message"}),"\n",(0,t.jsx)(F,{}),"\n",(0,t.jsx)(n.h3,{children:"Percentage"}),"\n",(0,t.jsx)(C,{}),"\n",(0,t.jsx)(n.h3,{children:"Allow Negative"}),"\n",(0,t.jsx)(v,{}),"\n",(0,t.jsx)(n.h3,{children:"Disallow Leading Zeroes"}),"\n",(0,t.jsx)(w,{}),"\n",(0,t.jsx)(n.h3,{children:"Widths"}),"\n",(0,t.jsx)(p,{}),"\n",(0,t.jsxs)(l,{children:[(0,t.jsx)(N,{}),(0,t.jsx)(S,{})]})]})}var W=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(L,e)})):L(e)};function Z(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-base-fields-number-demos-mdx-58701a4d5b631cf4955f.js.map