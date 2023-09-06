"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[54048,46384,23807,71794,5451],{12602:function(e,n,l){l.r(n);var o=l(52322),t=l(45392),i=l(52531),a=l(12269),r=l(59501),d=l(44819);function s(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.default,{}),"\n",(0,o.jsx)(a.default,{}),"\n",(0,o.jsx)(r.default,{}),"\n",(0,o.jsx)(d.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(s,e)})):s()}},12269:function(e,n,l){l.r(n),l.d(n,{default:function(){return k}});var o={};l.r(o),l.d(o,{ButtonDisabled:function(){return R},ButtonEmpty:function(){return L},ButtonError:function(){return T},ButtonHorizontalLayout:function(){return H},ButtonLabel:function(){return D},ButtonOptionSelected:function(){return z},DropdownDisabled:function(){return g},DropdownEmpty:function(){return s},DropdownError:function(){return j},DropdownHighNumberOfOptions:function(){return O},DropdownLabel:function(){return c},DropdownLabelAndOptionSelected:function(){return p},DropdownOptionSelected:function(){return h},DropdownPlaceholder:function(){return u},DropdownValidationRequired:function(){return f},HorizontalLayout:function(){return x},RadioDisabled:function(){return y},RadioEmpty:function(){return m},RadioError:function(){return B},RadioHorizontalLayout:function(){return w},RadioHorizontalLayoutAndHorizontalOptionsLayout:function(){return Z},RadioHorizontalOptionsLayout:function(){return E},RadioLabel:function(){return S},RadioOptionSelected:function(){return C},Widths:function(){return b},WithClearButton:function(){return v},WithHelp:function(){return F}});var t=l(52322),i=l(45392),a=(l(2784),l(82058)),r=l(80658),d=l(27439);const s=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  onFocus={(value) => console.log(\'onFocus\', value)}\n  onBlur={(value) => console.log(\'onBlur\', value)}\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),u=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  placeholder="Select something...."\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),c=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:"<Field.Selection\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),h=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),p=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),v=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},noInline:!0,children:'const Example = () => {\n  const [value, setValue] = React.useState(\'bar\')\n  const handleChange = React.useCallback(\n    (value) => {\n      console.log(\'onChange\', value)\n      setValue(value)\n    },\n    [setValue],\n  )\n  return (\n    <>\n      <Field.Selection\n        value={value}\n        label="Label text"\n        onChange={handleChange}\n        clear\n      >\n        <Field.Option value="foo" title="Foo!" />\n        <Field.Option value="bar" title="Baar!" />\n      </Field.Selection>\n      <pre>VALUE: {value === undefined ? <em>undefined</em> : value}</pre>\n    </>\n  )\n}\nrender(<Example />)\n'}),F=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  help={{\n    title: \'Help is available\',\n    contents:\n      \'Somewhere along the way, we must learn that there is nothing greater than to do something for others.\',\n  }}\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),x=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),b=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'\n<Field.Selection\n  label="Default width (property omitted)"\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n<Field.Selection\n  label="Small"\n  value="bar"\n  width="small"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n<Field.Selection\n  label="Medium"\n  value="bar"\n  width="medium"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n<Field.Selection\n  label="Large"\n  value="bar"\n  width="large"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n<Field.Selection\n  label="Stretch"\n  value="bar"\n  width="stretch"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n\n'}),g=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),j=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z,FormError:d.X},children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  error={new FormError(\'This is what is wrong...\')}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),O=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  value="option-15"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="option-1" title="One" />\n  <Field.Option value="option-2" title="Two" />\n  <Field.Option value="option-3" title="Three" />\n  <Field.Option value="option-4" title="Four" />\n  <Field.Option value="option-5" title="Five" />\n  <Field.Option value="option-6" title="Six" />\n  <Field.Option value="option-7" title="Seven" />\n  <Field.Option value="option-8" title="Eight" />\n  <Field.Option value="option-9" title="Nine" />\n  <Field.Option value="option-10" title="Ten" />\n  <Field.Option value="option-11" title="Eleven" />\n  <Field.Option value="option-12" title="Twelve" />\n  <Field.Option value="option-13" title="Thirteen" />\n  <Field.Option value="option-14" title="Fourteen" />\n  <Field.Option value="option-15" title="Fifteen" />\n  <Field.Option value="option-16" title="Sixteen" />\n  <Field.Option value="option-17" title="Seventeen" />\n  <Field.Option value="option-18" title="Eighteen" />\n  <Field.Option value="option-19" title="Nineteen" />\n  <Field.Option value="option-20" title="Twenty" />\n  <Field.Option value="option-21" title="Twentyone" />\n  <Field.Option value="option-22" title="Twentytwo" />\n  <Field.Option value="option-23" title="Twentythree" />\n  <Field.Option value="option-24" title="Twentyfour" />\n  <Field.Option value="option-25" title="Twentyfive" />\n</Field.Selection>\n'}),f=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  value="foo"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  onFocus={(value) => console.log(\'onFocus\', value)}\n  onBlur={(value) => console.log(\'onBlur\', value)}\n  required\n  clear\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),m=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="radio"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),S=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),C=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="radio"\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),w=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),E=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  optionsLayout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),Z=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  layout="horizontal"\n  optionsLayout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),y=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="radio"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),B=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z,FormError:d.X},children:'<Field.Selection\n  variant="radio"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  error={new FormError(\'This is what is wrong...\')}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),L=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="button"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),D=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="button"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),z=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="button"\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),H=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="button"\n  label="Label text"\n  value="bar"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),R=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z},children:'<Field.Selection\n  variant="button"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),T=()=>(0,t.jsx)(a.Z,{scope:{Field:r.Z,FormError:d.X},children:'<Field.Selection\n  variant="button"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  error={new FormError(\'This is what is wrong...\')}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'});function W(e){const n=Object.assign({h2:"h2",h3:"h3",h4:"h4",p:"p",code:"code",hr:"hr"},(0,i.ah)(),e.components);return o||V("Examples",!1),R||V("Examples.ButtonDisabled",!0),L||V("Examples.ButtonEmpty",!0),T||V("Examples.ButtonError",!0),H||V("Examples.ButtonHorizontalLayout",!0),D||V("Examples.ButtonLabel",!0),z||V("Examples.ButtonOptionSelected",!0),g||V("Examples.DropdownDisabled",!0),s||V("Examples.DropdownEmpty",!0),j||V("Examples.DropdownError",!0),O||V("Examples.DropdownHighNumberOfOptions",!0),c||V("Examples.DropdownLabel",!0),p||V("Examples.DropdownLabelAndOptionSelected",!0),h||V("Examples.DropdownOptionSelected",!0),u||V("Examples.DropdownPlaceholder",!0),f||V("Examples.DropdownValidationRequired",!0),x||V("Examples.HorizontalLayout",!0),y||V("Examples.RadioDisabled",!0),m||V("Examples.RadioEmpty",!0),B||V("Examples.RadioError",!0),w||V("Examples.RadioHorizontalLayout",!0),Z||V("Examples.RadioHorizontalLayoutAndHorizontalOptionsLayout",!0),E||V("Examples.RadioHorizontalOptionsLayout",!0),S||V("Examples.RadioLabel",!0),C||V("Examples.RadioOptionSelected",!0),b||V("Examples.Widths",!0),v||V("Examples.WithClearButton",!0),F||V("Examples.WithHelp",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{children:"Demos"}),"\n",(0,t.jsx)(n.h3,{children:"Dropdown variant (default)"}),"\n",(0,t.jsx)(n.h4,{children:"Empty"}),"\n",(0,t.jsx)(s,{}),"\n",(0,t.jsx)(n.h4,{children:"Placeholder"}),"\n",(0,t.jsx)(u,{}),"\n",(0,t.jsx)(n.h4,{children:"Label"}),"\n",(0,t.jsx)(c,{}),"\n",(0,t.jsx)(n.h4,{children:"Option selected"}),"\n",(0,t.jsx)(h,{}),"\n",(0,t.jsx)(n.h4,{children:"Label and option selected"}),"\n",(0,t.jsx)(p,{}),"\n",(0,t.jsx)(n.h4,{children:"With clear Button"}),"\n",(0,t.jsx)("em",{children:(0,t.jsxs)(n.p,{children:["Clear button might in the future be an icon like in ",(0,t.jsx)(n.code,{children:"<Input>"}),", but until that is available in ",(0,t.jsx)(n.code,{children:"<Dropdown>"}),", it is done using an empty option at the top of the selection list."]})}),"\n",(0,t.jsx)(v,{}),"\n",(0,t.jsx)(n.h4,{children:"With help"}),"\n",(0,t.jsx)(F,{}),"\n",(0,t.jsx)(n.h3,{children:"Horizontal layout"}),"\n",(0,t.jsx)(x,{}),"\n",(0,t.jsx)(n.h3,{children:"Widths"}),"\n",(0,t.jsx)(b,{}),"\n",(0,t.jsx)(n.h4,{children:"Disabled"}),"\n",(0,t.jsx)(g,{}),"\n",(0,t.jsx)(n.h4,{children:"Error"}),"\n",(0,t.jsx)(j,{}),"\n",(0,t.jsx)(n.h4,{children:"High number of options"}),"\n",(0,t.jsx)(O,{}),"\n",(0,t.jsx)(n.h4,{children:"Validation - Required"}),"\n",(0,t.jsx)(f,{}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{children:"Radio variant"}),"\n",(0,t.jsx)(n.h4,{children:"Empty"}),"\n",(0,t.jsx)(m,{}),"\n",(0,t.jsx)(n.h4,{children:"Label"}),"\n",(0,t.jsx)(S,{}),"\n",(0,t.jsx)(n.h4,{children:"Option selected"}),"\n",(0,t.jsx)(C,{}),"\n",(0,t.jsx)(n.h4,{children:"Horizontal layout"}),"\n",(0,t.jsx)(w,{}),"\n",(0,t.jsx)(n.h4,{children:"Horizontal options-layout"}),"\n",(0,t.jsx)(E,{}),"\n",(0,t.jsx)(n.h4,{children:"Horizontal layout and horizontal options-layout"}),"\n",(0,t.jsx)(Z,{}),"\n",(0,t.jsx)(n.h4,{children:"Disabled"}),"\n",(0,t.jsx)(y,{}),"\n",(0,t.jsx)(n.h4,{children:"Error"}),"\n",(0,t.jsx)(B,{}),"\n",(0,t.jsx)(n.h3,{children:"Buttons variant"}),"\n",(0,t.jsx)(n.h4,{children:"Empty"}),"\n",(0,t.jsx)(L,{}),"\n",(0,t.jsx)(n.h4,{children:"Label"}),"\n",(0,t.jsx)(D,{}),"\n",(0,t.jsx)(n.h4,{children:"Option selected"}),"\n",(0,t.jsx)(z,{}),"\n",(0,t.jsx)(n.h4,{children:"Horizontal layout"}),"\n",(0,t.jsx)(H,{}),"\n",(0,t.jsx)(n.h4,{children:"Disabled"}),"\n",(0,t.jsx)(R,{}),"\n",(0,t.jsx)(n.h4,{children:"Error"}),"\n",(0,t.jsx)(T,{})]})}var k=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(W,e)})):W(e)};function V(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},44819:function(e,n,l){l.r(n);var o=l(52322),t=l(45392),i=l(80703);function a(e){const n=Object.assign({h2:"h2"},(0,t.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{children:"Events"}),"\n",(0,o.jsx)(i.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(a,e)})):a(e)}},52531:function(e,n,l){l.r(n);var o=l(52322),t=l(45392);function i(e){const n=Object.assign({h2:"h2",p:"p",code:"code"},(0,t.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{children:"Description"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"Field.Select"})," is a component for selecting between options using a dropdown or similar user experiences."]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(i,e)})):i(e)}},80703:function(e,n,l){l.r(n);var o=l(52322),t=l(45392);function i(e){const n=Object.assign({table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",em:"em"},(0,t.ah)(),e.components);return(0,o.jsxs)(n.table,{children:[(0,o.jsx)(n.thead,{children:(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.th,{children:"Event"}),(0,o.jsx)(n.th,{children:"Description"})]})}),(0,o.jsxs)(n.tbody,{children:[(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"onChange"})}),(0,o.jsxs)(n.td,{children:[(0,o.jsx)(n.em,{children:"(optional)"})," Will be called on value changes made by the user, with the new value as argument."]})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"onFocus"})}),(0,o.jsxs)(n.td,{children:[(0,o.jsx)(n.em,{children:"(optional)"})," Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument."]})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"onBlur"})}),(0,o.jsxs)(n.td,{children:[(0,o.jsx)(n.em,{children:"(optional)"})," Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument."]})]})]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(i,e)})):i(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-field-base-selection-components-selection-mdx-1e21a57e7e8e14cae1cb.js.map