"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[54251],{71895:function(n,e,l){l.r(e),l.d(e,{default:function(){return W}});var o={};l.r(o),l.d(o,{ButtonDisabled:function(){return H},ButtonEmpty:function(){return y},ButtonError:function(){return R},ButtonHorizontalLayout:function(){return z},ButtonLabel:function(){return D},ButtonOptionSelected:function(){return Z},DropdownDisabled:function(){return b},DropdownEmpty:function(){return d},DropdownError:function(){return g},DropdownHighNumberOfOptions:function(){return O},DropdownLabel:function(){return s},DropdownLabelAndOptionSelected:function(){return h},DropdownOptionSelected:function(){return c},DropdownPlaceholder:function(){return u},DropdownValidationRequired:function(){return j},HorizontalLayout:function(){return F},RadioDisabled:function(){return B},RadioEmpty:function(){return f},RadioError:function(){return L},RadioHorizontalLayout:function(){return C},RadioHorizontalLayoutAndHorizontalOptionsLayout:function(){return w},RadioHorizontalOptionsLayout:function(){return E},RadioLabel:function(){return S},RadioOptionSelected:function(){return m},Widths:function(){return x},WithClearButton:function(){return p},WithHelp:function(){return v}});var t=l(52322),i=l(45392),a=(l(2784),l(35823)),r=l(27439);const d=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  onFocus={(value) => console.log(\'onFocus\', value)}\n  onBlur={(value) => console.log(\'onBlur\', value)}\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),u=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  placeholder="Select something...."\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),s=()=>(0,t.jsx)(a.Z,{children:"<Field.Selection\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),c=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),h=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),p=()=>(0,t.jsx)(a.Z,{noInline:!0,children:'const Example = () => {\n  const [value, setValue] = React.useState(\'bar\')\n  const handleChange = React.useCallback(\n    (value) => {\n      console.log(\'onChange\', value)\n      setValue(value)\n    },\n    [setValue],\n  )\n  return (\n    <>\n      <Field.Selection\n        value={value}\n        label="Label text"\n        onChange={handleChange}\n        clear\n      >\n        <Field.Option value="foo" title="Foo!" />\n        <Field.Option value="bar" title="Baar!" />\n      </Field.Selection>\n      <pre>VALUE: {value === undefined ? <em>undefined</em> : value}</pre>\n    </>\n  )\n}\nrender(<Example />)\n'}),v=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  help={{\n    title: \'Help is available\',\n    contents:\n      \'Somewhere along the way, we must learn that there is nothing greater than to do something for others.\',\n  }}\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),F=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),x=()=>(0,t.jsx)(a.Z,{children:'\n<Field.Selection\n  label="Default width (property omitted)"\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n<Field.Selection\n  label="Small"\n  value="bar"\n  width="small"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n<Field.Selection\n  label="Medium"\n  value="bar"\n  width="medium"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n<Field.Selection\n  label="Large"\n  value="bar"\n  width="large"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n<Field.Selection\n  label="Stretch"\n  value="bar"\n  width="stretch"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n\n'}),b=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),g=()=>(0,t.jsx)(a.Z,{scope:{FormError:r.Xq},children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  error={new FormError(\'This is what is wrong...\')}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),O=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="option-15"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="option-1" title="One" />\n  <Field.Option value="option-2" title="Two" />\n  <Field.Option value="option-3" title="Three" />\n  <Field.Option value="option-4" title="Four" />\n  <Field.Option value="option-5" title="Five" />\n  <Field.Option value="option-6" title="Six" />\n  <Field.Option value="option-7" title="Seven" />\n  <Field.Option value="option-8" title="Eight" />\n  <Field.Option value="option-9" title="Nine" />\n  <Field.Option value="option-10" title="Ten" />\n  <Field.Option value="option-11" title="Eleven" />\n  <Field.Option value="option-12" title="Twelve" />\n  <Field.Option value="option-13" title="Thirteen" />\n  <Field.Option value="option-14" title="Fourteen" />\n  <Field.Option value="option-15" title="Fifteen" />\n  <Field.Option value="option-16" title="Sixteen" />\n  <Field.Option value="option-17" title="Seventeen" />\n  <Field.Option value="option-18" title="Eighteen" />\n  <Field.Option value="option-19" title="Nineteen" />\n  <Field.Option value="option-20" title="Twenty" />\n  <Field.Option value="option-21" title="Twenty-one" />\n  <Field.Option value="option-22" title="Twenty-two" />\n  <Field.Option value="option-23" title="Twenty-three" />\n  <Field.Option value="option-24" title="Twenty-four" />\n  <Field.Option value="option-25" title="Twenty-five" />\n</Field.Selection>\n'}),j=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="foo"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  onFocus={(value) => console.log(\'onFocus\', value)}\n  onBlur={(value) => console.log(\'onBlur\', value)}\n  required\n  clear\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),f=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),S=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),m=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),C=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),E=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  optionsLayout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),w=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  layout="horizontal"\n  optionsLayout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),B=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),L=()=>(0,t.jsx)(a.Z,{scope:{FormError:r.Xq},children:'<Field.Selection\n  variant="radio"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  error={new FormError(\'This is what is wrong...\')}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),y=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="button"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),D=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="button"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),Z=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="button"\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),z=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="button"\n  label="Label text"\n  value="bar"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),H=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="button"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),R=()=>(0,t.jsx)(a.Z,{scope:{FormError:r.Xq},children:'<Field.Selection\n  variant="button"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  error={new FormError(\'This is what is wrong...\')}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'});function T(n){const e=Object.assign({h2:"h2",h3:"h3",h4:"h4",p:"p",code:"code",hr:"hr"},(0,i.ah)(),n.components);return o||k("Examples",!1),H||k("Examples.ButtonDisabled",!0),y||k("Examples.ButtonEmpty",!0),R||k("Examples.ButtonError",!0),z||k("Examples.ButtonHorizontalLayout",!0),D||k("Examples.ButtonLabel",!0),Z||k("Examples.ButtonOptionSelected",!0),b||k("Examples.DropdownDisabled",!0),d||k("Examples.DropdownEmpty",!0),g||k("Examples.DropdownError",!0),O||k("Examples.DropdownHighNumberOfOptions",!0),s||k("Examples.DropdownLabel",!0),h||k("Examples.DropdownLabelAndOptionSelected",!0),c||k("Examples.DropdownOptionSelected",!0),u||k("Examples.DropdownPlaceholder",!0),j||k("Examples.DropdownValidationRequired",!0),F||k("Examples.HorizontalLayout",!0),B||k("Examples.RadioDisabled",!0),f||k("Examples.RadioEmpty",!0),L||k("Examples.RadioError",!0),C||k("Examples.RadioHorizontalLayout",!0),w||k("Examples.RadioHorizontalLayoutAndHorizontalOptionsLayout",!0),E||k("Examples.RadioHorizontalOptionsLayout",!0),S||k("Examples.RadioLabel",!0),m||k("Examples.RadioOptionSelected",!0),x||k("Examples.Widths",!0),p||k("Examples.WithClearButton",!0),v||k("Examples.WithHelp",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Demos"}),"\n",(0,t.jsx)(e.h3,{children:"Dropdown variant (default)"}),"\n",(0,t.jsx)(e.h4,{children:"Empty"}),"\n",(0,t.jsx)(d,{}),"\n",(0,t.jsx)(e.h4,{children:"Placeholder"}),"\n",(0,t.jsx)(u,{}),"\n",(0,t.jsx)(e.h4,{children:"Label"}),"\n",(0,t.jsx)(s,{}),"\n",(0,t.jsx)(e.h4,{children:"Option selected"}),"\n",(0,t.jsx)(c,{}),"\n",(0,t.jsx)(e.h4,{children:"Label and option selected"}),"\n",(0,t.jsx)(h,{}),"\n",(0,t.jsx)(e.h4,{children:"With clear Button"}),"\n",(0,t.jsx)("em",{children:(0,t.jsxs)(e.p,{children:["Clear button might in the future be an icon like in ",(0,t.jsx)(e.code,{children:"<Input>"}),", but until that is available in ",(0,t.jsx)(e.code,{children:"<Dropdown>"}),", it is done using an empty option at the top of the selection list."]})}),"\n",(0,t.jsx)(p,{}),"\n",(0,t.jsx)(e.h4,{children:"With help"}),"\n",(0,t.jsx)(v,{}),"\n",(0,t.jsx)(e.h3,{children:"Horizontal layout"}),"\n",(0,t.jsx)(F,{}),"\n",(0,t.jsx)(e.h3,{children:"Widths"}),"\n",(0,t.jsx)(x,{}),"\n",(0,t.jsx)(e.h4,{children:"Disabled"}),"\n",(0,t.jsx)(b,{}),"\n",(0,t.jsx)(e.h4,{children:"Error"}),"\n",(0,t.jsx)(g,{}),"\n",(0,t.jsx)(e.h4,{children:"High number of options"}),"\n",(0,t.jsx)(O,{}),"\n",(0,t.jsx)(e.h4,{children:"Validation - Required"}),"\n",(0,t.jsx)(j,{}),"\n",(0,t.jsx)(e.hr,{}),"\n",(0,t.jsx)(e.h3,{children:"Radio variant"}),"\n",(0,t.jsx)(e.h4,{children:"Empty"}),"\n",(0,t.jsx)(f,{}),"\n",(0,t.jsx)(e.h4,{children:"Label"}),"\n",(0,t.jsx)(S,{}),"\n",(0,t.jsx)(e.h4,{children:"Option selected"}),"\n",(0,t.jsx)(m,{}),"\n",(0,t.jsx)(e.h4,{children:"Horizontal layout"}),"\n",(0,t.jsx)(C,{}),"\n",(0,t.jsx)(e.h4,{children:"Horizontal options-layout"}),"\n",(0,t.jsx)(E,{}),"\n",(0,t.jsx)(e.h4,{children:"Horizontal layout and horizontal options-layout"}),"\n",(0,t.jsx)(w,{}),"\n",(0,t.jsx)(e.h4,{children:"Disabled"}),"\n",(0,t.jsx)(B,{}),"\n",(0,t.jsx)(e.h4,{children:"Error"}),"\n",(0,t.jsx)(L,{}),"\n",(0,t.jsx)(e.h3,{children:"Buttons variant"}),"\n",(0,t.jsx)(e.h4,{children:"Empty"}),"\n",(0,t.jsx)(y,{}),"\n",(0,t.jsx)(e.h4,{children:"Label"}),"\n",(0,t.jsx)(D,{}),"\n",(0,t.jsx)(e.h4,{children:"Option selected"}),"\n",(0,t.jsx)(Z,{}),"\n",(0,t.jsx)(e.h4,{children:"Horizontal layout"}),"\n",(0,t.jsx)(z,{}),"\n",(0,t.jsx)(e.h4,{children:"Disabled"}),"\n",(0,t.jsx)(H,{}),"\n",(0,t.jsx)(e.h4,{children:"Error"}),"\n",(0,t.jsx)(R,{})]})}var W=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(T,n)})):T(n)};function k(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-base-fields-selection-demos-mdx-e6098156146b3637a97a.js.map