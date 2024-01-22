"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[68715,58925,4086,41602,61460,37787],{4125:function(e,n,t){t.r(n);var r=t(52322),s=t(45392);function o(e){const n=Object.assign({table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",em:"em"},(0,s.ah)(),e.components);return(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Event"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"onChange"})}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.em,{children:"(optional)"})," Will be called on value changes made by the user, with the new value e.g. ",(0,r.jsx)(n.code,{children:"+47 99999999"}),". The second parameter is an object: ",(0,r.jsx)(n.code,{children:"{ countryCode, phoneNumber }"}),"."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"onFocus"})}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.em,{children:"(optional)"})," Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"onBlur"})}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.em,{children:"(optional)"})," Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument."]})]})]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(o,e)})):o(e)}},55682:function(e,n,t){t.r(n);var r=t(52322),s=t(45392),o=t(70064),a=t(38233),c=t(93833),l=t(66758);function i(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.default,{}),"\n",(0,r.jsx)(a.default,{}),"\n",(0,r.jsx)(c.default,{}),"\n",(0,r.jsx)(l.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(i,e)})):i()}},38233:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var r={};t.r(r),t.d(r,{ObjectElements:function(){return i},PrimitiveElements:function(){return l}});var s=t(52322),o=t(45392),a=t(50716),c=t(10535);const l=()=>(0,s.jsx)(a.Z,{scope:{Iterate:c},children:"<Iterate.ArrayPushButton\n  text=\"Add another element\"\n  value={['foo', 'bar']}\n  pushValue=\"new\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),i=()=>(0,s.jsx)(a.Z,{scope:{Iterate:c},children:'<Form.Handler\n  data={[\n    {\n      name: \'Iron Man\',\n    },\n    {\n      name: \'Captain America\',\n    },\n    {\n      name: \'Thor\',\n    },\n  ]}\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Iterate.Array path="/">\n    <Field.String itemPath="/name" />\n  </Iterate.Array>\n\n  <Iterate.ArrayPushButton\n    top="small"\n    text="Add another element"\n    path="/"\n    pushValue={{}}\n  />\n</Form.Handler>\n'});function d(e){const n=Object.assign({h2:"h2",h3:"h3"},(0,o.ah)(),e.components);return r||u("Examples",!1),i||u("Examples.ObjectElements",!0),l||u("Examples.PrimitiveElements",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{children:"Demos"}),"\n",(0,s.jsx)(n.h3,{children:"Primitive elements"}),"\n",(0,s.jsx)(l,{}),"\n",(0,s.jsx)(n.h3,{children:"Object elements"}),"\n",(0,s.jsx)(i,{})]})}var h=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(d,e)})):d(e)};function u(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},66758:function(e,n,t){t.r(n);var r=t(52322),s=t(45392),o=t(4125);function a(e){const n=Object.assign({h2:"h2"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Events"}),"\n",(0,r.jsx)(o.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(a,e)})):a(e)}},70064:function(e,n,t){t.r(n);var r=t(52322),s=t(45392);function o(e){const n=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Description"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Iterate.ArrayPushButton"})," connects to the array of a surrounding ",(0,r.jsx)(n.code,{children:"Iterate.Array"})," or an array from the source pointed at through ",(0,r.jsx)(n.code,{children:"path"})," and adds a new element to the array when clicked."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'import { Iterate, Field } from \'@dnb/eufemia/extensions/forms\'\nrender(\n  <>\n    <Iterate.Array path="/">\n      <Field.String itemPath="/name" />\n    </Iterate.Array>\n\n    <Iterate.ArrayPushButton\n      text="Add another element"\n      path="/"\n      pushValue={{}}\n    />\n  </>,\n)\n'})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(o,e)})):o(e)}},93833:function(e,n,t){t.r(n);var r=t(52322),s=t(45392);function o(e){const n=Object.assign({h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",em:"em",a:"a"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Properties"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Property"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"text"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"string"})}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.em,{children:"(optional)"})," Button text."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"pushValue"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"unknown"})}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.em,{children:"(optional)"})," The element to add to the array when the button is clicked."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"children"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ReactNode"})}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.em,{children:"(optional)"})," Alternative to ",(0,r.jsx)(n.code,{children:"text"})," for button contents."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"/uilib/components/button/properties",children:"Button"})}),(0,r.jsx)(n.td,{children:"Various"}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.em,{children:"(optional)"})," all button properties."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.a,{href:"/uilib/layout/space/properties",children:"Space"})}),(0,r.jsx)(n.td,{children:"Various"}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.em,{children:"(optional)"})," spacing properties like ",(0,r.jsx)(n.code,{children:"top"})," or ",(0,r.jsx)(n.code,{children:"bottom"})," are supported."]})]})]})]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(o,e)})):o(e)}},10535:function(e,n,t){t.r(n),t.d(n,{Array:function(){return m},ArrayPushButton:function(){return v},ArrayRemoveElementButton:function(){return w},IterateElementContext:function(){return i.Z}});var r=t(84616),s=t(2784),o=t(72779),a=t.n(o),c=t(95955),l=t.n(c),i=t(38875),d=t(96781),h=t(34424),u=t(55590),j=t(30392),x=t(52322);function p(e){const{className:n,layout:t="vertical",placeholder:o,label:c,labelDescription:p,path:m,value:f,info:b,warning:g,error:v,emptyValue:y,width:w,handleChange:A,children:C}=(0,h.Z)(e),E=(0,s.useMemo)((()=>(null!=f?f:[]).map(((e,n)=>({elementValue:e,handleElementChange:(e,n)=>{const t=structuredClone(f);l().set(t,e,n),null==A||A(t)},handleRemoveElement:()=>{const e=structuredClone(f);e.splice(n,1),null==A||A(e)}})))),[f,A]),O=(0,s.useCallback)((e=>{A([].concat((0,r.Z)(null!=f?f:[]),[e]))}),[f,A]);return(0,x.jsx)(d.Z,{className:a()("dnb-forms-field-number",n),layout:t,label:c,labelDescription:p,info:b,warning:g,error:v,width:w,contentWidth:!1!==w?w:void 0,...(0,u.SR)(e),children:(0,x.jsx)(j.Z,{...(0,j.W)(e,{spacing:"small"}),children:f===y?(0,x.jsx)("em",{children:o}):E.map(((e,n)=>{let{elementValue:t,handleElementChange:r,handleRemoveElement:s}=e;return(0,x.jsx)(i.Z.Provider,{value:{index:n,value:t,path:m,handleChange:r,handleRemove:s,handlePush:O},children:Array.isArray(C)?C.map((e=>"function"==typeof e?e(t,n):e)):"function"==typeof C?C(t,n):C},`element-${n}`)}))})})}p._supportsSpacingProps=!0;var m=p,f=t(96844),b=t(27439);function g(e){const n=(0,s.useContext)(i.Z),{handlePush:t}=null!=n?n:{},{pushValue:o,...c}=e,l=(0,b.wH)(c),{value:d,handleChange:u,children:j}=(0,h.Z)(c);if(void 0!==d&&!Array.isArray(d))throw new Error("ArrayPushButton received a non-array value.");const p=(0,s.useCallback)((()=>{t?t(o):u([].concat((0,r.Z)(null!=d?d:[]),[o]))}),[d,o,t,u]);return(0,x.jsx)(f.Z,{className:a()("dnb-forms-array-push-button",e.className),on_click:p,...l,children:j})}g._supportsSpacingProps=!0;var v=g;function y(e){const n=(0,s.useContext)(i.Z),{handleRemove:t}=null!=n?n:{};if(!n)throw new Error("ArrayRemoveElementButton must be inside an Iterate.Array component.");const r=(0,b.wH)(e),{children:o}=(0,h.Z)(e),c=(0,s.useCallback)((()=>{t()}),[t]);return(0,x.jsx)(f.Z,{className:a()("dnb-forms-array-remove-element-button",e.className),on_click:c,...r,children:o})}y._supportsSpacingProps=!0;var w=y}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-iterate-array-push-button-mdx-f98eec07194d3307ae1c.js.map