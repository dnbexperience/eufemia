"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[57109],{85400:function(e,n,t){t.r(n);var l=t(52322),r=t(45392),a=t(93727),i=t(52160);function o(e){const n=Object.assign({h2:"h2",pre:"pre",code:"code",p:"p",h3:"h3",a:"a"},(0,r.ah)(),e.components);return a||u("Examples",!1),a.CurrencyField||u("Examples.CurrencyField",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Import"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:"import { Input } from '@dnb/eufemia'\n"})}),"\n",(0,l.jsx)(n.h2,{children:"Description"}),"\n",(0,l.jsxs)(n.p,{children:["The input component is an umbrella component for all inputs which share the same style as the classic ",(0,l.jsx)(n.code,{children:"text"})," input field."]}),"\n",(0,l.jsx)(n.h3,{children:"Formatted input fields (masked values)"}),"\n",(0,l.jsxs)(n.p,{children:["You may consider to use ",(0,l.jsx)(n.a,{href:"/uilib/components/input-masked/",children:"InputMasked"})," for formatted strings and ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms/",children:"Eufemia Forms"})," fields like ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms/base-fields/Number/",children:"Number"})," and ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms/feature-fields/Currency/",children:"Currency"})," for formatted numbers:"]}),"\n",(0,l.jsx)(a.CurrencyField,{}),"\n",(0,l.jsx)(n.h3,{children:"Accessibility"}),"\n",(0,l.jsxs)(n.p,{children:["Please avoid using the ",(0,l.jsx)(n.code,{children:"maxlength"})," attribute when possible, as it may lower good accessibility. You can instead, use the ",(0,l.jsx)(n.a,{href:"/uilib/components/fragments/text-counter/",children:"TextCounter"})," component."]}),"\n",(0,l.jsxs)(n.p,{children:["But you may also consider to use a multiline input with a ",(0,l.jsx)(n.code,{children:"characterCounter"}),":"]}),"\n",(0,l.jsx)(i.MultipleOneRow,{})]})}function u(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(o,e)})):o(e)}},52160:function(e,n,t){t.r(n),t.d(n,{AsynchronousExternalBlurValidator:function(){return w},AsynchronousExternalChangeValidator:function(){return S},Capitalize:function(){return h},Clear:function(){return m},Disabled:function(){return p},HorizontalLayout:function(){return d},Icons:function(){return g},LabelAndDescription:function(){return u},LabelAndValue:function(){return o},MultipleEmpty:function(){return y},MultipleLabelAndValue:function(){return E},MultipleOneRow:function(){return L},MultiplePlaceholder:function(){return Z},MultipleWithHelp:function(){return O},Placeholder:function(){return i},SynchronousExternalBlurValidator:function(){return V},SynchronousExternalChangeValidator:function(){return j},TransformInAndOut:function(){return q},ValidateMaximumLengthCustomError:function(){return C},ValidateMinimumLength:function(){return v},ValidatePattern:function(){return F},ValidateRequired:function(){return x},Widths:function(){return f},WithHelp:function(){return c},WithMultipleError:function(){return b},WithStatus:function(){return s}});var l=t(46832),r=t(4902),a=t(52322);const i=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  label="Label text"\n  placeholder="Enter a text..."\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),o=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  label="Label text"\n  defaultValue="foo"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),u=()=>(0,a.jsx)(l.Z,{"data-visual-test":"string-label-description",children:'<Form.Card>\n  <Field.String\n    label="Label text"\n    labelDescription="Description text"\n    placeholder="Enter a text..."\n  />\n  <Field.String\n    label="Label text"\n    labelDescription="\nDescription text with new line using \\n"\n    placeholder="Enter a text..."\n  />\n</Form.Card>\n'}),s=()=>(0,a.jsx)(l.Z,{"data-visual-test":"string-status",children:'<Form.Card>\n  <Field.String\n    label="Label text"\n    defaultValue="foo"\n    warning="Short warning."\n    required\n  />\n  <Field.String\n    label="Label text"\n    placeholder="Enter a text..."\n    info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."\n    required\n  />\n  <Field.String\n    label="Label text"\n    defaultValue="foo"\n    width="small"\n    warning="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et. Velit incididunt exercitation est magna ex irure dolore nisi eiusmod ea exercitation."\n  />\n  <Field.String\n    label="Label text"\n    error={[new Error(\'Error message A\'), new Error(\'Error message B\')]}\n    warning={[\'Warning message A\', \'Warning message B\']}\n    info={[\'Info message A\', \'Info message B\']}\n  />\n</Form.Card>\n'}),d=()=>(0,a.jsx)(l.Z,{"data-visual-test":"string-horizontal-layout",children:'<Form.Card>\n  <Field.Provider\n    layout="horizontal"\n    layoutOptions={{\n      width: \'medium\', // can be a rem value\n    }}\n    placeholder="Enter a text..."\n    required\n  >\n    <Field.String label="Label text" warning="Short warning." />\n    <Field.String\n      label="Label with a long text that will wrap"\n      placeholder="Enter a text..."\n      size="medium"\n      info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."\n    />\n    <Field.String\n      label="Label with a long text that will wrap"\n      placeholder="Enter a text..."\n      size="large"\n      width="stretch"\n    />\n  </Field.Provider>\n</Form.Card>\n'}),c=()=>(0,a.jsx)(l.Z,{children:"<Field.String\n  label=\"Label text\"\n  defaultValue=\"foo\"\n  help={{\n    title: 'Help is available',\n    content:\n      'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',\n  }}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),h=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  label="Label text"\n  defaultValue="foo bar"\n  capitalize\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),f=()=>(0,a.jsx)(l.Z,{hideCode:!0,"data-visual-test":"string-widths",children:'<Flex.Stack>\n  <Field.String\n    label="Default width (property omitted)"\n    defaultValue="foo"\n  />\n  <Field.String label="Small" defaultValue="foo" width="small" />\n  <Field.String label="Medium" defaultValue="foo" width="medium" />\n  <Field.String label="Large" defaultValue="foo" width="large" />\n  <Field.String label="Custom" defaultValue="foo" width="8rem" />\n  <Field.String label="Stretch" defaultValue="foo" width="stretch" />\n\n  <Field.String\n    label="Default width (property omitted)"\n    defaultValue="foo"\n    multiline\n  />\n  <Field.String label="Small" defaultValue="foo" width="small" multiline />\n  <Field.String\n    label="Medium"\n    defaultValue="foo"\n    width="medium"\n    multiline\n  />\n  <Field.String label="Large" defaultValue="foo" width="large" multiline />\n  <Field.String label="Custom" defaultValue="foo" width="8rem" multiline />\n  <Field.String\n    label="Stretch"\n    defaultValue="foo"\n    width="stretch"\n    multiline\n  />\n</Flex.Stack>\n'}),g=()=>(0,a.jsx)(l.Z,{children:'<Form.Card>\n  <Field.String\n    label="Icon left"\n    defaultValue="foo"\n    leftIcon="check"\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n  <Field.String\n    label="Icon right"\n    defaultValue="foo"\n    rightIcon="loupe"\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n</Form.Card>\n'}),m=()=>(0,a.jsx)(l.Z,{children:"<Field.String\n  defaultValue=\"foo\"\n  onChange={(value) => console.log('onChange', value)}\n  clear\n/>\n"}),p=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  defaultValue="foo"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n/>\n'}),b=()=>(0,a.jsx)(l.Z,{"data-visual-test":"multiple-errors",children:'<Field.String\n  label="Multiple errors"\n  defaultValue="foo"\n  pattern="bar"\n  minLength={4}\n  validateInitially\n/>\n'}),x=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  defaultValue="foo"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  required\n/>\n'}),v=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  defaultValue="foo"\n  label="Label text (minimum 8 characters)"\n  onChange={(value) => console.log(\'onChange\', value)}\n  minLength={8}\n/>\n'}),C=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  defaultValue="foo"\n  label="Label text (maximum 8 characters)"\n  onChange={(value) => console.log(\'onChange\', value)}\n  maxLength={8}\n  errorMessages={{\n    maxLength: "You can\'t write THAT long.. Max 8 chars!",\n  }}\n/>\n'}),F=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  defaultValue="foo"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  pattern="^foo123"\n/>\n'}),j=()=>(0,a.jsx)(l.Z,{children:"<Field.String\n  defaultValue=\"foo\"\n  label=\"Label text (minimum 4 characters)\"\n  onChangeValidator={(value) =>\n    value.length < 4 ? Error('At least 4 characters') : undefined\n  }\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),S=()=>(0,a.jsx)(l.Z,{children:"<Field.String\n  defaultValue=\"foo\"\n  label=\"Label text (minimum 4 characters)\"\n  onChangeValidator={(value) =>\n    new Promise((resolve) =>\n      setTimeout(\n        () =>\n          resolve(\n            value.length < 5 ? Error('At least 5 characters') : undefined,\n          ),\n        1500,\n      ),\n    )\n  }\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),V=()=>(0,a.jsx)(l.Z,{children:"<Field.String\n  defaultValue=\"foo\"\n  label=\"Label text (minimum 4 characters)\"\n  onBlurValidator={(value) =>\n    value.length < 4 ? Error('At least 4 characters') : undefined\n  }\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),w=()=>(0,a.jsx)(l.Z,{children:"<Field.String\n  defaultValue=\"foo\"\n  label=\"Label text (minimum 4 characters)\"\n  onBlurValidator={(value) =>\n    new Promise((resolve) =>\n      setTimeout(\n        () =>\n          resolve(\n            value.length < 5 ? Error('At least 5 characters') : undefined,\n          ),\n        1500,\n      ),\n    )\n  }\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),y=()=>(0,a.jsx)(l.Z,{children:"<Field.String\n  onChange={(value) => console.log('onChange', value)}\n  multiline\n/>\n"}),L=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  label="Label text"\n  placeholder="Enter your text"\n  multiline\n  rows={1}\n  characterCounter={40}\n/>\n'}),Z=()=>(0,a.jsx)(l.Z,{children:"<Field.String\n  placeholder=\"Enter text here\"\n  onChange={(value) => console.log('onChange', value)}\n  multiline\n/>\n"}),E=()=>(0,a.jsx)(l.Z,{children:'<Field.String\n  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in tempus odio, nec interdum orci. Integer vehicula ipsum et risus finibus, vitae commodo ex luctus. Nam viverra sollicitudin dictum. Vivamus maximus dignissim lorem, vitae viverra erat dapibus a."\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  multiline\n/>\n'}),O=()=>(0,a.jsx)(l.Z,{children:"<Field.String\n  label=\"Label text\"\n  help={{\n    title: 'Help is available',\n    content: 'There is more happiness in giving than in receiving.',\n  }}\n  multiline\n  onChange={(value) => console.log('onChange', value)}\n/>\n"});function q(){return(0,a.jsx)(l.Z,{scope:{Tools:r},noInline:!0,children:'const transformOut = (value) => {\n  return {\n    value,\n    foo: \'bar\',\n  }\n}\nconst transformIn = (data) => {\n  return data?.value\n}\nconst MyForm = () => {\n  return (\n    <Form.Handler onSubmit={console.log}>\n      <Form.Card>\n        <Field.String\n          label="String field"\n          path="/myValue"\n          transformIn={transformIn}\n          transformOut={transformOut}\n          defaultValue="Default value"\n        />\n\n        <Value.String\n          label="String value"\n          path="/myValue"\n          transformIn={transformIn}\n          placeholder="(placeholder)"\n          showEmpty\n        />\n\n        <Form.SubHeading>Data Context</Form.SubHeading>\n        <Tools.Log />\n      </Form.Card>\n      <Form.SubmitButton />\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'})}},38734:function(e,n,t){t.d(n,{Z:function(){return u}});var l=t(84616),r=t(2784),a=t(2394),i=t(21068);const o=["minLength","maxLength","pattern","description","min","max","multipleOf","exclusiveMinimum","exclusiveMaximum"];function u(e){const{generateRef:n,filterData:t,log:u,children:s}=e||{},{fieldPropsRef:d,valuePropsRef:c,data:h,hasContext:f}=(0,r.useContext)(i.Z),g=(0,r.useRef)({});g.current=h;const m=(0,r.useCallback)((()=>{const e=Object.entries((null==d?void 0:d.current)||{}).reduce(((e,n)=>{let[r,i]=n;if(r.startsWith("/")){const n=r.substring(1),u=n.split("/"),s=u.length,d={type:i.valueType||"string"};for(const e of o)i[e]&&(d[e]=i[e]);if(s>1){const n=[""];for(const r of u){n.push(r);const o=n.join("/properties/"),s=n.length-1===u.length,c=a.e$(e,o)?a.U2(e,o):null,h=s?d:c;if(s)!1!==(null==t?void 0:t[o])&&a.t8(e,o,h);else{const n={type:"object",...c},r=[];i.required&&r.push(u.at(-1)),null!=c&&c.required&&r.push.apply(r,(0,l.Z)(c.required)),r.length>0&&(n.required=r),!1!==(null==t?void 0:t[o])&&a.t8(e,o,n)}}}else!1!==(null==t?void 0:t[r])&&a.t8(e.properties,r,d),i.required&&e.required.push(n)}return e}),{type:"object",properties:{},required:[]}),n=Object.entries((null==d?void 0:d.current)||{}).reduce(((e,n)=>{let[t,l]=n;if(t.startsWith("/")){const n={};for(const e in l)void 0!==l[e]&&"function"!=typeof l[e]&&(n[e]=l[e]);a.t8(e,t,n)}return e}),{}),r=Object.entries((null==c?void 0:c.current)||{}).reduce(((e,n)=>{let[t,l]=n;if(t.startsWith("/")){const n={};for(const e in l)void 0!==l[e]&&"function"!=typeof l[e]&&(n[e]=l[e]);a.t8(e,t,n)}return e}),{});return 0===e.required.length&&delete e.required,{schema:e,data:g.current,propsOfFields:n,propsOfValues:r}}),[d,t,c]);return f&&(u&&console.log(m().schema),n&&(n.current=m)),s}},10454:function(e,n,t){t.d(n,{Z:function(){return i}});var l=t(2784),r=t(2394),a=t(21068);function i(e){const{log:n,generateRef:t,filterData:i,children:o}=e||{},{fieldPropsRef:u,valuePropsRef:s,data:d,hasContext:c}=(0,l.useContext)(a.Z);(0,l.useRef)({}).current=d;const h=(0,l.useCallback)((()=>{const e=Object.entries((null==u?void 0:u.current)||{}).reduce(((e,n)=>{let[t,a]=n;if(t.startsWith("/")){const n={};for(const e in a)void 0===a[e]||"function"==typeof a[e]||(0,l.isValidElement)(a[e])||(n[e]=a[e]);!1!==(null==i?void 0:i[t])&&r.t8(e,t,n)}return e}),{}),n=Object.entries((null==s?void 0:s.current)||{}).reduce(((e,n)=>{let[t,a]=n;if(t.startsWith("/")){const n={};for(const e in a)void 0===a[e]||"function"==typeof a[e]||(0,l.isValidElement)(a[e])||(n[e]=a[e]);!1!==(null==i?void 0:i[t])&&r.t8(e,t,n)}return e}),{});return{propsOfFields:e,propsOfValues:n}}),[u,i,s]);return c&&(n&&console.log(h()),t&&(t.current=h)),o}},90584:function(e,n,t){var l=t(2784),r=t(21068),a=t(4408),i=t(9149),o=t(52322);function u(e){let{placeholder:n,label:t,data:u,...d}=e;const{data:c}=(0,l.useContext)(r.Z);return(0,o.jsxs)(a.Z,{element:"output",backgroundColor:"sand-yellow",style:{maxWidth:"80vw"},innerSpace:!0,...d,children:[t&&(0,o.jsx)(i.Z,{bottom:!0,children:(0,o.jsx)("b",{children:t})}),(0,o.jsxs)("pre",{children:[n&&0===Object.keys((null!=u?u:c)||{}).length?n:JSON.stringify(s(null!=u?u:c),null,2)," "]})]})}function s(e,n){return void 0===n&&(n="undefined"),void 0===e?n:e&&"object"==typeof e&&e!==n?{...e,...Object.fromEntries(Object.entries(e).map((e=>{let[n,t]=e;return[n,s(t)]})))}:e}u._supportsSpacingProps=!0,n.Z=u},4902:function(e,n,t){t.r(n),t.d(n,{GenerateSchema:function(){return l.Z},ListAllProps:function(){return r.Z},Log:function(){return a.Z}});var l=t(38734),r=t(10454),a=t(90584)}}]);
//# sourceMappingURL=1cf9d19327e96c4a8c43ecd5b36949da7af127c0-32033da3863da2644234.js.map