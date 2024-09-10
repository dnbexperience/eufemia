"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[39950,42487,14032],{74634:function(e,n,l){l.r(n);var i=l(52322),r=l(45392),a=l(51361),t=l(86067);function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.default,{}),"\n",(0,i.jsx)(t.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(s,e)})):s()}},86067:function(e,n,l){l.r(n),l.d(n,{default:function(){return M}});var i={};l.r(i),l.d(i,{Alignment:function(){return m},AllowNegative:function(){return F},Disabled:function(){return p},DisallowLeadingZeroes:function(){return N},Empty:function(){return s},ExclusiveMinMax:function(){return h},HorizontalLayout:function(){return b},Info:function(){return j},Label:function(){return u},LabelAndValue:function(){return d},Percentage:function(){return E},Placeholder:function(){return o},PrefixAndSuffix:function(){return c},ValidateMaximumCustomError:function(){return S},ValidateMinimum:function(){return w},ValidateRequired:function(){return C},Warning:function(){return v},Widths:function(){return g},WithError:function(){return f},WithHelp:function(){return x},WithSlider:function(){return L},WithStepControls:function(){return y},WithStepControlsDisabled:function(){return Z},WithStepControlsError:function(){return W}});var r=l(52322),a=l(45392),t=l(19459);l(2784);const s=()=>(0,r.jsx)(t.Z,{"data-visual-test":"number-input",children:"<Field.Number\n  onFocus={(value) => console.log('onFocus', value)}\n  onBlur={(value) => console.log('onBlur', value)}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),o=()=>(0,r.jsx)(t.Z,{children:"<Field.Number\n  placeholder=\"Enter a number\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),u=()=>(0,r.jsx)(t.Z,{children:"<Field.Number\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),d=()=>(0,r.jsx)(t.Z,{children:"<Field.Number\n  value={420000.25}\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),h=()=>(0,r.jsx)(t.Z,{children:'<Field.Number\n  value={1000}\n  label="Label text"\n  allowNegative={false}\n  required\n  exclusiveMinimum={900}\n  exclusiveMaximum={1000}\n  validateInitially\n/>\n'}),c=()=>(0,r.jsx)(t.Z,{children:"<Flex.Stack>\n  <Field.Number\n    value={1234}\n    label=\"With prefix\"\n    prefix=\"prefix \"\n    onChange={(value) => console.log('onChange', value)}\n  />\n  <Field.Number\n    value={1}\n    label=\"With suffix (function)\"\n    suffix={(value) => (value === 1 ? ' year' : ' years')}\n    onChange={(value) => console.log('onChange', value)}\n  />\n</Flex.Stack>\n"}),m=()=>(0,r.jsx)(t.Z,{children:'\n<Field.Number\n  align="center"\n  label="Center aligned (default)"\n  value={10}\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n<Field.Number\n  align="left"\n  label="Left aligned"\n  value={10}\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n<Field.Number\n  align="right"\n  label="Right aligned"\n  value={10}\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n\n'}),x=()=>(0,r.jsx)(t.Z,{children:"<Field.Number\n  value={12345}\n  label=\"Label text\"\n  help={{\n    title: 'Help is available',\n    content:\n      'Here is what a team can do for you. . . . It allows you to help others do their best.',\n  }}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),b=()=>(0,r.jsx)(t.Z,{children:'<Field.Number\n  value={420000}\n  label="Label text"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),g=()=>(0,r.jsx)(t.Z,{hideCode:!0,"data-visual-test":"number-widths",children:'<Flex.Stack>\n  <Form.SubHeading>Without step controls</Form.SubHeading>\n\n  <Field.Number label="Default width (property omitted)" value={1234} />\n  <Field.Number label="Small" value={1234} width="small" />\n  <Field.Number\n    label="Medium (and medium size)"\n    value={1234}\n    width="medium"\n    size="medium"\n  />\n  <Field.Number\n    label="Large (and large size)"\n    value={1234}\n    width="large"\n    size="large"\n  />\n  <Field.Number label="Stretch" value={1234} width="stretch" />\n  <Form.SubHeading>With step controls</Form.SubHeading>\n  <Field.Number\n    showStepControls\n    label="Default width (property omitted)"\n    value={1234}\n  />\n  <Field.Number\n    showStepControls\n    label="Small"\n    value={1234}\n    width="small"\n  />\n  <Field.Number\n    showStepControls\n    label="Medium (and medium size)"\n    value={1234}\n    width="medium"\n    size="medium"\n  />\n  <Field.Number\n    showStepControls\n    label="Large (and large size)"\n    value={1234}\n    width="large"\n    size="large"\n  />\n  <Field.Number\n    showStepControls\n    label="Stretch"\n    value={1234}\n    width="stretch"\n  />\n</Flex.Stack>\n'}),p=()=>(0,r.jsx)(t.Z,{children:"<Field.Number\n  value={135}\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n  disabled\n/>\n"}),j=()=>(0,r.jsx)(t.Z,{children:'<Field.Number\n  value={135}\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  info="Useful information (?)"\n/>\n'}),v=()=>(0,r.jsx)(t.Z,{children:'<Field.Number\n  value={135}\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  warning="I\'m warning you..."\n/>\n'}),f=()=>(0,r.jsx)(t.Z,{children:"<Field.Number\n  value={135}\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n  error={new Error('This is what is wrong...')}\n/>\n"}),C=()=>(0,r.jsx)(t.Z,{children:"<Field.Number\n  value={123}\n  label=\"Remove and blur field\"\n  onChange={(value) => console.log('onChange', value)}\n  required\n/>\n"}),w=()=>(0,r.jsx)(t.Z,{children:"<Field.Number\n  value={300}\n  label=\"Enter a number below 250 and blur to trigger error\"\n  onChange={(value) => console.log('onChange', value)}\n  minimum={250}\n/>\n"}),F=()=>(0,r.jsx)(t.Z,{children:"<Field.Number allowNegative={false} />\n"}),N=()=>(0,r.jsx)(t.Z,{children:"<Field.Number disallowLeadingZeroes />\n"}),E=()=>(0,r.jsx)(t.Z,{children:"<Field.Number\n  percent\n  value={80}\n  label=\"Percentage\"\n  onChange={(value) => console.log('onChange', value)}\n  minimum={90}\n/>\n"}),S=()=>(0,r.jsx)(t.Z,{children:'<Field.Number\n  value={200}\n  label="Enter a number above 250 and blur to trigger error"\n  onChange={(value) => console.log(\'onChange\', value)}\n  maximum={250}\n  errorMessages={{\n    maximum: "You can\'t enter a number THAR large.. Max 250!",\n  }}\n/>\n'}),y=()=>(0,r.jsx)(t.Z,{"data-visual-test":"number-input-step-controls",children:"<Field.Number\n  showStepControls\n  minimum={0}\n  maximum={100}\n  step={10}\n  value={50}\n/>\n"}),W=()=>(0,r.jsx)(t.Z,{"data-visual-test":"number-input-step-controls-error",children:"<Field.Number\n  showStepControls\n  maximum={100}\n  value={150}\n  error={new Error('You done messed up, A-a-ron!')}\n/>\n"}),Z=()=>(0,r.jsx)(t.Z,{"data-visual-test":"number-input-step-controls-disabled",children:"<Field.Number showStepControls disabled />\n"}),L=()=>(0,r.jsx)(t.Z,{hideCode:!0,noInline:!0,children:'const Component = () => {\n  const [value, setValue] = React.useState(50000)\n  const settings = {\n    min: 0,\n    max: 100000,\n    step: 1000,\n  }\n  return (\n    <Grid.Container>\n      <Grid.Item\n        span={{\n          small: [1, 12],\n          medium: [1, 4],\n          large: [1, 3],\n        }}\n      >\n        <Field.Number\n          showStepControls\n          minimum={settings.min}\n          maximum={settings.max}\n          step={settings.step}\n          value={value}\n          onChange={(value) => setValue(value)}\n          width="stretch"\n          bottom="small"\n        />\n        <Slider\n          min={settings.min}\n          max={settings.max}\n          step={settings.step}\n          value={value}\n          onChange={({ value }) => setValue(parseFloat(String(value)))}\n          hideButtons\n          tooltip\n        />\n      </Grid.Item>\n    </Grid.Container>\n  )\n}\nrender(<Component />)\n'});function V(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p"},(0,a.ah)(),e.components),{VisibleWhenVisualTest:l}=n;return i||k("Examples",!1),m||k("Examples.Alignment",!0),F||k("Examples.AllowNegative",!0),p||k("Examples.Disabled",!0),N||k("Examples.DisallowLeadingZeroes",!0),s||k("Examples.Empty",!0),h||k("Examples.ExclusiveMinMax",!0),b||k("Examples.HorizontalLayout",!0),j||k("Examples.Info",!0),u||k("Examples.Label",!0),d||k("Examples.LabelAndValue",!0),E||k("Examples.Percentage",!0),o||k("Examples.Placeholder",!0),c||k("Examples.PrefixAndSuffix",!0),S||k("Examples.ValidateMaximumCustomError",!0),w||k("Examples.ValidateMinimum",!0),C||k("Examples.ValidateRequired",!0),v||k("Examples.Warning",!0),g||k("Examples.Widths",!0),f||k("Examples.WithError",!0),x||k("Examples.WithHelp",!0),L||k("Examples.WithSlider",!0),y||k("Examples.WithStepControls",!0),Z||k("Examples.WithStepControlsDisabled",!0),W||k("Examples.WithStepControlsError",!0),l||k("VisibleWhenVisualTest",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Demos"}),"\n",(0,r.jsx)(n.h3,{children:"Empty"}),"\n",(0,r.jsx)(s,{}),"\n",(0,r.jsx)(n.h3,{children:"Placeholder"}),"\n",(0,r.jsx)(o,{}),"\n",(0,r.jsx)(n.h3,{children:"Label"}),"\n",(0,r.jsx)(u,{}),"\n",(0,r.jsx)(n.h3,{children:"Label and value"}),"\n",(0,r.jsx)(d,{}),"\n",(0,r.jsx)(n.h3,{children:"Exclusive minimum and exclusive maximum"}),"\n",(0,r.jsx)(h,{}),"\n",(0,r.jsx)(n.h3,{children:"Prefix and suffix"}),"\n",(0,r.jsx)(n.p,{children:"You can also use a function as a prefix or suffix."}),"\n",(0,r.jsx)(c,{}),"\n",(0,r.jsx)(n.h3,{children:"Alignment"}),"\n",(0,r.jsx)(m,{}),"\n",(0,r.jsx)(n.h3,{children:"Horizontal layout"}),"\n",(0,r.jsx)(b,{}),"\n",(0,r.jsx)(n.h3,{children:"With help"}),"\n",(0,r.jsx)(x,{}),"\n",(0,r.jsx)(n.h3,{children:"With step controls"}),"\n",(0,r.jsx)(y,{}),"\n",(0,r.jsx)(n.h3,{children:"With step controls in conjunction with Slider"}),"\n",(0,r.jsx)(L,{}),"\n",(0,r.jsx)(n.h3,{children:"Disabled"}),"\n",(0,r.jsx)(p,{}),"\n",(0,r.jsx)(n.h3,{children:"Info"}),"\n",(0,r.jsx)(j,{}),"\n",(0,r.jsx)(n.h3,{children:"Warning"}),"\n",(0,r.jsx)(v,{}),"\n",(0,r.jsx)(n.h3,{children:"Error"}),"\n",(0,r.jsx)(f,{}),"\n",(0,r.jsx)(n.h3,{children:"Validation - Required"}),"\n",(0,r.jsx)(C,{}),"\n",(0,r.jsx)(n.h3,{children:"Validation - Minimum"}),"\n",(0,r.jsx)(w,{}),"\n",(0,r.jsx)(n.h3,{children:"Validation - Maximum and custom error message"}),"\n",(0,r.jsx)(S,{}),"\n",(0,r.jsx)(n.h3,{children:"Percentage"}),"\n",(0,r.jsx)(E,{}),"\n",(0,r.jsx)(n.h3,{children:"Allow Negative"}),"\n",(0,r.jsx)(F,{}),"\n",(0,r.jsx)(n.h3,{children:"Disallow Leading Zeroes"}),"\n",(0,r.jsx)(N,{}),"\n",(0,r.jsx)(n.h3,{children:"Widths"}),"\n",(0,r.jsx)(g,{}),"\n",(0,r.jsxs)(l,{children:[(0,r.jsx)(W,{}),(0,r.jsx)(Z,{})]})]})}var M=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(V,e)})):V(e)};function k(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},51361:function(e,n,l){l.r(n);var i=l(52322),r=l(45392);function a(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre",h3:"h3"},(0,r.ah)(),e.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{children:"Description"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Field.Number"})," is the base component for receiving user input where the target data is of type ",(0,i.jsx)(n.code,{children:"number"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["There is a corresponding ",(0,i.jsx)(n.a,{href:"/uilib/extensions/forms/Value/Number",children:"Value.Number"})," component."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\nrender(<Field.Number path=\"/myNumber\" />)\n"})}),"\n",(0,i.jsx)(n.h2,{children:"When to use and not to use"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Field.Number"})," only allows the user to enter numbers (negative and positive) and decimal numbers."]}),"\n",(0,i.jsx)(n.p,{children:"If a number has the type of number, and can not start with a zero, this field may be considered."}),"\n",(0,i.jsxs)(n.p,{children:["But for e.g. a customer number, you rather use ",(0,i.jsx)(n.a,{href:"/uilib/extensions/forms/base-fields/String/",children:"Field.String"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Internally, it is used by e.g. ",(0,i.jsx)(n.a,{href:"/uilib/extensions/forms/feature-fields/Currency/",children:"Field.Currency"}),"."]}),"\n",(0,i.jsx)(n.h2,{children:"Browser autofill"}),"\n",(0,i.jsxs)(n.p,{children:["Check out the ",(0,i.jsx)(n.a,{href:"/uilib/extensions/forms/base-fields/String/#autocomplete-and-autofill",children:"Field.String"})," docs about autocomplete."]}),"\n",(0,i.jsx)(n.h2,{children:"Step controls"}),"\n",(0,i.jsxs)(n.p,{children:["When using ",(0,i.jsx)(n.code,{children:"showStepControls"}),", the Number component provides buttons for decrementing and incrementing the input value, where the value of de/increment is determined by the ",(0,i.jsx)(n.code,{children:"step"})," property."]}),"\n",(0,i.jsxs)(n.p,{children:["It can also be used with ",(0,i.jsx)(n.a,{href:"/uilib/extensions/forms/feature-fields/Currency/",children:"Field.Currency"}),"."]}),"\n",(0,i.jsx)(n.h3,{children:"Accessibility"}),"\n",(0,i.jsxs)(n.p,{children:["The component does not include focusable buttons, aligning with accessibility considerations for keyboard-only users, who can utilize arrow keys for navigation, like the ",(0,i.jsx)(n.code,{children:"incrementable"})," ",(0,i.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number",children:"number input"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"One of the reasons to make the buttons as not focusable is to avoid the keyboard-only users to tab through all the extra buttons during navigation."}),"\n",(0,i.jsxs)(n.p,{children:["Due to technical constraint, the ",(0,i.jsx)(n.code,{children:"Field.Number"})," component will be announced as a ",(0,i.jsx)(n.code,{children:"stepper"})," field – but will get the same instructions read out by a screen reader like VoiceOver, on how to change the value."]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(a,e)})):a(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-base-fields-number-mdx-fa7a6678b37af809b42d.js.map