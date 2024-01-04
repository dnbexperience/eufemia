"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[4086],{38233:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var r={};t.r(r),t.d(r,{ObjectElements:function(){return u},PrimitiveElements:function(){return c}});var a=t(52322),l=t(45392),o=t(50716),s=t(10535);const c=()=>(0,a.jsx)(o.Z,{scope:{Iterate:s},children:"<Iterate.ArrayPushButton\n  text=\"Add another element\"\n  value={['foo', 'bar']}\n  pushValue=\"new\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),u=()=>(0,a.jsx)(o.Z,{scope:{Iterate:s},children:'<Form.Handler\n  data={[\n    {\n      name: \'Iron Man\',\n    },\n    {\n      name: \'Captain America\',\n    },\n    {\n      name: \'Thor\',\n    },\n  ]}\n  onChange={(value) => console.log(\'onChange\', value)}\n>\n  <Iterate.Array path="/">\n    <Field.String itemPath="/name" />\n  </Iterate.Array>\n\n  <Iterate.ArrayPushButton\n    top="small"\n    text="Add another element"\n    path="/"\n    pushValue={{}}\n  />\n</Form.Handler>\n'});function i(e){const n=Object.assign({h2:"h2",h3:"h3"},(0,l.ah)(),e.components);return r||m("Examples",!1),u||m("Examples.ObjectElements",!0),c||m("Examples.PrimitiveElements",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:"Demos"}),"\n",(0,a.jsx)(n.h3,{children:"Primitive elements"}),"\n",(0,a.jsx)(c,{}),"\n",(0,a.jsx)(n.h3,{children:"Object elements"}),"\n",(0,a.jsx)(u,{})]})}var h=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(i,e)})):i(e)};function m(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},10535:function(e,n,t){t.r(n),t.d(n,{Array:function(){return f},ArrayPushButton:function(){return g},ArrayRemoveElementButton:function(){return C},IterateElementContext:function(){return u.Z}});var r=t(84616),a=t(2784),l=t(72779),o=t.n(l),s=t(95955),c=t.n(s),u=t(38875),i=t(96781),h=t(35533),m=t(55590),d=t(30392),p=t(52322);function v(e){const{className:n,layout:t="vertical",placeholder:l,label:s,labelDescription:v,labelSecondary:f,path:b,value:y,info:x,warning:g,error:j,emptyValue:C,width:E,handleChange:A,children:w}=(0,h.Z)(e),Z=(0,a.useMemo)((()=>(null!=y?y:[]).map(((e,n)=>({elementValue:e,handleElementChange:(e,n)=>{const t=structuredClone(y);c().set(t,e,n),null==A||A(t)},handleRemoveElement:()=>{const e=structuredClone(y);e.splice(n,1),null==A||A(e)}})))),[y,A]),P=(0,a.useCallback)((e=>{A([].concat((0,r.Z)(null!=y?y:[]),[e]))}),[y,A]);return(0,p.jsx)(i.Z,{className:o()("dnb-forms-field-number",n),layout:t,label:s,labelDescription:v,labelSecondary:f,info:x,warning:g,error:j,width:E,contentsWidth:!1!==E?E:void 0,...(0,m.SR)(e),children:(0,p.jsx)(d.Z,{...(0,d.W)(e,{spacing:"small"}),children:y===C?(0,p.jsx)("em",{children:l}):Z.map(((e,n)=>{let{elementValue:t,handleElementChange:r,handleRemoveElement:a}=e;return(0,p.jsx)(u.Z.Provider,{value:{index:n,value:t,path:b,handleChange:r,handleRemove:a,handlePush:P},children:Array.isArray(w)?w.map((e=>"function"==typeof e?e(t,n):e)):"function"==typeof w?w(t,n):w},`element-${n}`)}))})})}v._supportsSpacingProps=!0;var f=v,b=t(96844),y=t(27439);function x(e){const n=(0,a.useContext)(u.Z),{handlePush:t}=null!=n?n:{},{pushValue:l,...s}=e,c=(0,y.wH)(s),{value:i,handleChange:m,children:d}=(0,h.Z)(s);if(void 0!==i&&!Array.isArray(i))throw new Error("ArrayPushButton received a non-array value.");const v=(0,a.useCallback)((()=>{t?t(l):m([].concat((0,r.Z)(null!=i?i:[]),[l]))}),[i,l,t,m]);return(0,p.jsx)(b.Z,{className:o()("dnb-forms-array-push-button",e.className),on_click:v,...c,children:d})}x._supportsSpacingProps=!0;var g=x;function j(e){const n=(0,a.useContext)(u.Z),{handleRemove:t}=null!=n?n:{};if(!n)throw new Error("ArrayRemoveElementButton must be inside an Iterate.Array component.");const r=(0,y.wH)(e),{children:l}=(0,h.Z)(e),s=(0,a.useCallback)((()=>{t()}),[t]);return(0,p.jsx)(b.Z,{className:o()("dnb-forms-array-remove-element-button",e.className),on_click:s,...r,children:l})}j._supportsSpacingProps=!0;var C=j}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-iterate-array-push-button-demos-mdx-e7cb4268a634d7829ce5.js.map