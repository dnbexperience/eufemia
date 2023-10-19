"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[39950,42487,14032],{74634:function(n,e,l){l.r(e);var a=l(52322),o=l(45392),r=l(51361),i=l(86067);function s(n){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.default,{}),"\n",(0,a.jsx)(i.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(s,n)})):s()}},86067:function(n,e,l){l.r(e),l.d(e,{default:function(){return F}});var a={};l.r(a),l.d(a,{Disabled:function(){return g},Empty:function(){return t},Error:function(){return v},HorizontalLayout:function(){return m},Info:function(){return b},Label:function(){return h},LabelAndValue:function(){return c},Placeholder:function(){return u},ValidateMaximumCustomError:function(){return C},ValidateMinimum:function(){return f},ValidateRequired:function(){return p},Warning:function(){return j},Widths:function(){return x},WithHelp:function(){return d}});var o=l(52322),r=l(45392),i=l(35823),s=l(27439);const t=()=>(0,o.jsx)(i.Z,{children:"<Field.Number\n  onFocus={(value) => console.log('onFocus', value)}\n  onBlur={(value) => console.log('onBlur', value)}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),u=()=>(0,o.jsx)(i.Z,{children:"<Field.Number\n  placeholder=\"Enter a number\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),h=()=>(0,o.jsx)(i.Z,{children:"<Field.Number\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),c=()=>(0,o.jsx)(i.Z,{children:"<Field.Number\n  value={420000.25}\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),d=()=>(0,o.jsx)(i.Z,{children:"<Field.Number\n  value={12345}\n  label=\"Label text\"\n  help={{\n    title: 'Help is available',\n    contents:\n      'Here is what a team can do for you. . . . It allows you to help others do their best.',\n  }}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),m=()=>(0,o.jsx)(i.Z,{children:'<Field.Number\n  value={420000}\n  label="Label text"\n  layout="horizontal"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),x=()=>(0,o.jsx)(i.Z,{children:'\n<Field.Number\n  label="Default width (property omitted)"\n  value={123}\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n<Field.Number\n  label="Small"\n  value={123}\n  width="small"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n<Field.Number\n  label="Medium"\n  value={123}\n  width="medium"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n<Field.Number\n  label="Large"\n  value={123}\n  width="large"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n<Field.Number\n  label="Stretch"\n  value={123}\n  width="stretch"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n\n'}),g=()=>(0,o.jsx)(i.Z,{children:"<Field.Number\n  value={135}\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n  disabled\n/>\n"}),b=()=>(0,o.jsx)(i.Z,{children:'<Field.Number\n  value={135}\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  info="Useful information (?)"\n/>\n'}),j=()=>(0,o.jsx)(i.Z,{scope:{FormError:s.Xq},children:'<Field.Number\n  value={135}\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  warning={new FormError("I\'m warning you...")}\n/>\n'}),v=()=>(0,o.jsx)(i.Z,{scope:{FormError:s.Xq},children:"<Field.Number\n  value={135}\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n  error={new FormError('This is what is wrong...')}\n/>\n"}),p=()=>(0,o.jsx)(i.Z,{children:"<Field.Number\n  value={123}\n  label=\"Remove and blur field\"\n  onChange={(value) => console.log('onChange', value)}\n  required\n/>\n"}),f=()=>(0,o.jsx)(i.Z,{children:"<Field.Number\n  value={300}\n  label=\"Enter a number below 250 and blur to trigger error\"\n  onChange={(value) => console.log('onChange', value)}\n  minimum={250}\n/>\n"}),C=()=>(0,o.jsx)(i.Z,{children:'<Field.Number\n  value={200}\n  label="Enter a number above 250 and blur to trigger error"\n  onChange={(value) => console.log(\'onChange\', value)}\n  maximum={250}\n  errorMessages={{\n    maximum: "You can\'t enter a number THAR large.. Max 250!",\n  }}\n/>\n'});function E(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,r.ah)(),n.components);return a||w("Examples",!1),g||w("Examples.Disabled",!0),t||w("Examples.Empty",!0),v||w("Examples.Error",!0),m||w("Examples.HorizontalLayout",!0),b||w("Examples.Info",!0),h||w("Examples.Label",!0),c||w("Examples.LabelAndValue",!0),u||w("Examples.Placeholder",!0),C||w("Examples.ValidateMaximumCustomError",!0),f||w("Examples.ValidateMinimum",!0),p||w("Examples.ValidateRequired",!0),j||w("Examples.Warning",!0),x||w("Examples.Widths",!0),d||w("Examples.WithHelp",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{children:"Demos"}),"\n",(0,o.jsx)(e.h3,{children:"Empty"}),"\n",(0,o.jsx)(t,{}),"\n",(0,o.jsx)(e.h3,{children:"Placeholder"}),"\n",(0,o.jsx)(u,{}),"\n",(0,o.jsx)(e.h3,{children:"Label"}),"\n",(0,o.jsx)(h,{}),"\n",(0,o.jsx)(e.h3,{children:"Label and value"}),"\n",(0,o.jsx)(c,{}),"\n",(0,o.jsx)(e.h3,{children:"With help"}),"\n",(0,o.jsx)(d,{}),"\n",(0,o.jsx)(e.h3,{children:"Horizontal layout"}),"\n",(0,o.jsx)(m,{}),"\n",(0,o.jsx)(e.h3,{children:"Widths"}),"\n",(0,o.jsx)(x,{}),"\n",(0,o.jsx)(e.h3,{children:"Disabled"}),"\n",(0,o.jsx)(g,{}),"\n",(0,o.jsx)(e.h3,{children:"Info"}),"\n",(0,o.jsx)(b,{}),"\n",(0,o.jsx)(e.h3,{children:"Warning"}),"\n",(0,o.jsx)(j,{}),"\n",(0,o.jsx)(e.h3,{children:"Error"}),"\n",(0,o.jsx)(v,{}),"\n",(0,o.jsx)(e.h3,{children:"Validation - Required"}),"\n",(0,o.jsx)(p,{}),"\n",(0,o.jsx)(e.h3,{children:"Validation - Minimum"}),"\n",(0,o.jsx)(f,{}),"\n",(0,o.jsx)(e.h3,{children:"Validation - Maximum and custom error message"}),"\n",(0,o.jsx)(C,{})]})}var F=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(E,n)})):E(n)};function w(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},51361:function(n,e,l){l.r(e);var a=l(52322),o=l(45392);function r(n){const e=Object.assign({h2:"h2",p:"p",code:"code",a:"a"},(0,o.ah)(),n.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Description"}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"Field.Number"})," is the base component for receiving user input where the target data is of type ",(0,a.jsx)(e.code,{children:"number"}),"."]}),"\n",(0,a.jsxs)(e.p,{children:["There is a corresponding ",(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/Value/Number",children:"Value.Number"})," component."]})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(r,n)})):r(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-base-fields-number-mdx-c97895e03040569a79a4.js.map