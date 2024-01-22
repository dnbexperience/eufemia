"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[30244],{71895:function(n,e,o){o.r(e),o.d(e,{default:function(){return q}});var l={};o.r(l),o.d(l,{ButtonDisabled:function(){return T},ButtonEmpty:function(){return D},ButtonError:function(){return H},ButtonHorizontalOptionsLayout:function(){return z},ButtonLabel:function(){return R},ButtonOptionSelected:function(){return Z},DropdownDisabled:function(){return b},DropdownDynamicOptions:function(){return O},DropdownEmpty:function(){return d},DropdownError:function(){return g},DropdownHighNumberOfOptions:function(){return j},DropdownLabel:function(){return s},DropdownLabelAndOptionSelected:function(){return p},DropdownOptionSelected:function(){return c},DropdownPlaceholder:function(){return u},DropdownValidationRequired:function(){return m},HorizontalLayout:function(){return F},RadioDisabled:function(){return E},RadioEmpty:function(){return f},RadioError:function(){return L},RadioHorizontalLayout:function(){return C},RadioHorizontalLayoutAndHorizontalOptionsLayout:function(){return B},RadioHorizontalOptionsLayout:function(){return y},RadioLabel:function(){return S},RadioOptionSelected:function(){return w},Widths:function(){return x},WithClearButton:function(){return h},WithHelp:function(){return v}});var t=o(52322),i=o(45392),a=(o(2784),o(50716)),r=o(27439);const d=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  onFocus={(value) => console.log(\'onFocus\', value)}\n  onBlur={(value) => console.log(\'onBlur\', value)}\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),u=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  placeholder="Select something..."\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),s=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),c=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),p=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-dropdown-default",children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),h=()=>(0,t.jsx)(a.Z,{noInline:!0,children:'const Example = () => {\n  const [value, setValue] = React.useState(\'bar\')\n  const handleChange = React.useCallback(\n    (value) => {\n      console.log(\'onChange\', value)\n      setValue(value)\n    },\n    [setValue],\n  )\n  return (\n    <>\n      <Field.Selection\n        value={value}\n        label="Label text"\n        onChange={handleChange}\n        clear\n      >\n        <Field.Option value="foo" title="Foo!" />\n        <Field.Option value="bar" title="Baar!" />\n      </Field.Selection>\n      <pre>VALUE: {value === undefined ? <em>undefined</em> : value}</pre>\n    </>\n  )\n}\nrender(<Example />)\n'}),v=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-dropdown-help",children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  help={{\n    title: \'Help is available\',\n    content:\n      \'Somewhere along the way, we must learn that there is nothing greater than to do something for others.\',\n  }}\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),F=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-dropdown-horizontal",children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),x=()=>(0,t.jsx)(a.Z,{hideCode:!0,"data-visual-test":"selection-dropdown-widths",children:'<Flex.Stack>\n  <Field.Selection label="Default width (property omitted)" value="bar">\n    <Field.Option value="foo" title="Foo!" />\n    <Field.Option value="bar" title="Baar!" />\n  </Field.Selection>\n  <Field.Selection label="Small" value="bar" width="small">\n    <Field.Option value="foo" title="Foo!" />\n    <Field.Option value="bar" title="Baar!" />\n  </Field.Selection>\n  <Field.Selection label="Medium" value="bar" width="medium">\n    <Field.Option value="foo" title="Foo!" />\n    <Field.Option value="bar" title="Baar!" />\n  </Field.Selection>\n  <Field.Selection label="Large" value="bar" width="large">\n    <Field.Option value="foo" title="Foo!" />\n    <Field.Option value="bar" title="Baar!" />\n  </Field.Selection>\n  <Field.Selection label="Stretch" value="bar" width="stretch">\n    <Field.Option value="foo" title="Foo!" />\n    <Field.Option value="bar" title="Baar!" />\n  </Field.Selection>\n</Flex.Stack>\n'}),b=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),g=()=>(0,t.jsx)(a.Z,{scope:{FormError:r.Xq},children:'<Field.Selection\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  error={new FormError(\'This is what is wrong...\')}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),O=()=>(0,t.jsx)(a.Z,{noInline:!0,children:"const Example = () => {\n  const [numOptions, setNumOptions] = React.useState(3)\n  return (\n    <>\n      <Field.Selection\n        value=\"option-15\"\n        label=\"Label text\"\n        onChange={(value) => console.log('onChange', value)}\n      >\n        {Array.from(Array(numOptions).keys()).map((key) => (\n          <Field.Option\n            key={key}\n            value={key}\n            title={'Option ' + (key + 1)}\n          />\n        ))}\n      </Field.Selection>\n\n      <p>\n        {[3, 4, 5].map((num, i) => (\n          <Button\n            key={i}\n            size=\"medium\"\n            right=\"x-small\"\n            variant={numOptions === num ? 'primary' : 'secondary'}\n            on_click={() => setNumOptions(num)}\n          >\n            {num} options\n          </Button>\n        ))}\n      </p>\n    </>\n  )\n}\nrender(<Example />)\n"}),j=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="option-15"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="option-1" title="One" />\n  <Field.Option value="option-2" title="Two" />\n  <Field.Option value="option-3" title="Three" />\n  <Field.Option value="option-4" title="Four" />\n  <Field.Option value="option-5" title="Five" />\n  <Field.Option value="option-6" title="Six" />\n  <Field.Option value="option-7" title="Seven" />\n  <Field.Option value="option-8" title="Eight" />\n  <Field.Option value="option-9" title="Nine" />\n  <Field.Option value="option-10" title="Ten" />\n  <Field.Option value="option-11" title="Eleven" />\n  <Field.Option value="option-12" title="Twelve" />\n  <Field.Option value="option-13" title="Thirteen" />\n  <Field.Option value="option-14" title="Fourteen" />\n  <Field.Option value="option-15" title="Fifteen" />\n  <Field.Option value="option-16" title="Sixteen" />\n  <Field.Option value="option-17" title="Seventeen" />\n  <Field.Option value="option-18" title="Eighteen" />\n  <Field.Option value="option-19" title="Nineteen" />\n  <Field.Option value="option-20" title="Twenty" />\n  <Field.Option value="option-21" title="Twenty-one" />\n  <Field.Option value="option-22" title="Twenty-two" />\n  <Field.Option value="option-23" title="Twenty-three" />\n  <Field.Option value="option-24" title="Twenty-four" />\n  <Field.Option value="option-25" title="Twenty-five" />\n</Field.Selection>\n'}),m=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  value="foo"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  onFocus={(value) => console.log(\'onFocus\', value)}\n  onBlur={(value) => console.log(\'onBlur\', value)}\n  required\n  clear\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),f=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),S=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-radio-options-vertical",children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),w=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-radio-vertical",children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),C=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-radio-horizontal",children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),y=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-radio-options-horizontal",children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  optionsLayout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),B=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  label="Label text"\n  value="bar"\n  layout="horizontal"\n  optionsLayout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),E=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="radio"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),L=()=>(0,t.jsx)(a.Z,{scope:{FormError:r.Xq},children:'<Field.Selection\n  variant="radio"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  error={new FormError(\'This is what is wrong...\')}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),D=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="button"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),R=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-button-options-vertical",children:'<Field.Selection\n  variant="button"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),z=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-button-options-horizontal",children:'<Field.Selection\n  variant="button"\n  label="Label text"\n  optionsLayout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),Z=()=>(0,t.jsx)(a.Z,{"data-visual-test":"selection-button-vertical",children:'<Field.Selection\n  variant="button"\n  label="Label text"\n  value="bar"\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),T=()=>(0,t.jsx)(a.Z,{children:'<Field.Selection\n  variant="button"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'}),H=()=>(0,t.jsx)(a.Z,{scope:{FormError:r.Xq},children:'<Field.Selection\n  variant="button"\n  value="bar"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  error={new FormError(\'This is what is wrong...\')}\n>\n  <Field.Option value="foo" title="Foo!" />\n  <Field.Option value="bar" title="Baar!" />\n</Field.Selection>\n'});function k(n){const e=Object.assign({h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",code:"code"},(0,i.ah)(),n.components);return l||A("Examples",!1),T||A("Examples.ButtonDisabled",!0),D||A("Examples.ButtonEmpty",!0),H||A("Examples.ButtonError",!0),z||A("Examples.ButtonHorizontalOptionsLayout",!0),R||A("Examples.ButtonLabel",!0),Z||A("Examples.ButtonOptionSelected",!0),b||A("Examples.DropdownDisabled",!0),O||A("Examples.DropdownDynamicOptions",!0),d||A("Examples.DropdownEmpty",!0),g||A("Examples.DropdownError",!0),j||A("Examples.DropdownHighNumberOfOptions",!0),s||A("Examples.DropdownLabel",!0),p||A("Examples.DropdownLabelAndOptionSelected",!0),c||A("Examples.DropdownOptionSelected",!0),u||A("Examples.DropdownPlaceholder",!0),m||A("Examples.DropdownValidationRequired",!0),F||A("Examples.HorizontalLayout",!0),E||A("Examples.RadioDisabled",!0),f||A("Examples.RadioEmpty",!0),L||A("Examples.RadioError",!0),C||A("Examples.RadioHorizontalLayout",!0),B||A("Examples.RadioHorizontalLayoutAndHorizontalOptionsLayout",!0),y||A("Examples.RadioHorizontalOptionsLayout",!0),S||A("Examples.RadioLabel",!0),w||A("Examples.RadioOptionSelected",!0),x||A("Examples.Widths",!0),h||A("Examples.WithClearButton",!0),v||A("Examples.WithHelp",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Demos"}),"\n",(0,t.jsx)(e.h3,{children:"Variants"}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown"}),"\n",(0,t.jsx)(s,{}),"\n",(0,t.jsx)(e.h4,{children:"Radio buttons"}),"\n",(0,t.jsx)(S,{}),"\n",(0,t.jsx)(e.h4,{children:"Toggle buttons"}),"\n",(0,t.jsx)(R,{}),"\n",(0,t.jsx)(e.hr,{}),"\n",(0,t.jsx)(e.h3,{children:"Dropdown variant (default)"}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown empty"}),"\n",(0,t.jsx)(d,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown placeholder"}),"\n",(0,t.jsx)(u,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown option selected"}),"\n",(0,t.jsx)(c,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown label and option selected"}),"\n",(0,t.jsx)(p,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown with clear Button"}),"\n",(0,t.jsx)("em",{children:(0,t.jsxs)(e.p,{children:["Clear button might in the future be an icon like in ",(0,t.jsx)(e.code,{children:"<Input>"}),", but until that is available in ",(0,t.jsx)(e.code,{children:"<Dropdown>"}),", it is done using an empty option at the top of the selection list."]})}),"\n",(0,t.jsx)(h,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown with help"}),"\n",(0,t.jsx)(v,{}),"\n",(0,t.jsx)(e.h3,{children:"Horizontal layout"}),"\n",(0,t.jsx)(F,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown disabled"}),"\n",(0,t.jsx)(b,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown error"}),"\n",(0,t.jsx)(g,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown dynamic options"}),"\n",(0,t.jsx)(O,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown high number of options"}),"\n",(0,t.jsx)(j,{}),"\n",(0,t.jsx)(e.h4,{children:"Dropdown validation - Required"}),"\n",(0,t.jsx)(m,{}),"\n",(0,t.jsx)(e.hr,{}),"\n",(0,t.jsx)(e.h3,{children:"Radio variant"}),"\n",(0,t.jsx)(e.h4,{children:"Radio empty"}),"\n",(0,t.jsx)(f,{}),"\n",(0,t.jsx)(e.h4,{children:"Radio option selected"}),"\n",(0,t.jsx)(w,{}),"\n",(0,t.jsx)(e.h4,{children:"Radio horizontal layout"}),"\n",(0,t.jsx)(C,{}),"\n",(0,t.jsx)(e.h4,{children:"Radio horizontal options-layout"}),"\n",(0,t.jsx)(y,{}),"\n",(0,t.jsx)(e.h4,{children:"Radio horizontal layout and horizontal options-layout"}),"\n",(0,t.jsx)(B,{}),"\n",(0,t.jsx)(e.h4,{children:"Radio disabled"}),"\n",(0,t.jsx)(E,{}),"\n",(0,t.jsx)(e.h4,{children:"Radio error"}),"\n",(0,t.jsx)(L,{}),"\n",(0,t.jsx)(e.hr,{}),"\n",(0,t.jsx)(e.h3,{children:"Buttons variant"}),"\n",(0,t.jsx)(e.h4,{children:"ToggleButton empty"}),"\n",(0,t.jsx)(D,{}),"\n",(0,t.jsx)(e.h4,{children:"ToggleButton option selected"}),"\n",(0,t.jsx)(Z,{}),"\n",(0,t.jsx)(e.h4,{children:"ToggleButton horizontal options-layout"}),"\n",(0,t.jsx)(z,{}),"\n",(0,t.jsx)(e.h4,{children:"ToggleButton disabled"}),"\n",(0,t.jsx)(T,{}),"\n",(0,t.jsx)(e.h4,{children:"ToggleButton error"}),"\n",(0,t.jsx)(H,{}),"\n",(0,t.jsx)(e.h3,{children:"Dropdown widths"}),"\n",(0,t.jsx)(x,{})]})}var q=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(k,n)})):k(n)};function A(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=56b616d8361c362c4cfc5ef7099b18734959be80-30d985bfdab2dc09c738.js.map