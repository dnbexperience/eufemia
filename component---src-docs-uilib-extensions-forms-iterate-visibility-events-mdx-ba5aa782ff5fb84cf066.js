"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[13415],{47113:function(t,e,n){n.r(e);var o=n(52322),a=n(45392),s=n(85179),i=n(27049);function r(t){const e=Object.assign({h2:"h2"},(0,a.ah)(),t.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{children:"Events"}),"\n",(0,o.jsx)(s.ZP,{props:i._})]})}e.default=function(t){void 0===t&&(t={});const{wrapper:e}=Object.assign({},(0,a.ah)(),t.components);return e?(0,o.jsx)(e,Object.assign({},t,{children:(0,o.jsx)(r,t)})):r(t)}},85179:function(t,e,n){n.d(e,{Kw:function(){return m},ZP:function(){return y}});var o=n(70894),a=n(61185),s=n(55560),i=n(41676),r=n(6210),l=n(64223),c=n(37339),d=n(595),u=n(52322);const p={...d.L,p:t=>(0,u.jsx)("span",{...t})},h=(0,o.Z)(s.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f="var(--color-fire-red)",m=t=>{let{variant:e,strikethrough:n,children:o,style:a={},...s}=t;if(n&&(a.textDecoration="line-through"),"string"==typeof o)switch(e){case"prop":break;case"type":a.color=o.startsWith("'")?f:"var(--color-violet)";case"value":a.color=o.startsWith("'")?f:"undefined"===o||"null"===o?"var(--color-black-55)":"var(--color-success-green)";default:a.background="none",a.boxShadow="none"}return p.code({children:o,style:a,...s})};function y(t){let{props:e,valueType:n="string",camelCase:o,omit:d,showDefaultValue:f=!1}=t;const y=Object.keys(e||{}),v=Object.entries(e||{}).map((t=>{let[e,s]=t;if(!s)return null;const{type:l,defaultValue:h,doc:v,status:j}=s;return d&&d.includes(e)?null:(0,u.jsxs)(i.Z,{children:[(0,u.jsx)(r.Z,{children:(0,u.jsx)(m,{variant:"prop",strikethrough:"deprecated"===j,children:g(o?(0,c.zW)(e):e)})}),(0,u.jsx)(r.Z,{children:(Array.isArray(l)?l:[l]).map((t=>{if("string"==typeof t){if(String(t).includes("{valueType}")){if(Array.isArray(n))return n.map(((t,e)=>(0,u.jsx)(m,{variant:"type",children:t},t+e))).reduce(((t,e)=>(0,u.jsxs)(u.Fragment,{children:[t," ",(0,u.jsx)("br",{})," ",e]})));t=n}return(0,u.jsx)(m,{variant:"type",children:t},t)}})).reduce(((t,e)=>(0,u.jsxs)(u.Fragment,{children:[t," ",(0,u.jsx)("br",{})," ",e]})))}),f&&(0,u.jsx)(r.Z,{children:h?(0,u.jsx)(m,{variant:"value",children:h}):"required"===j&&"REQUIRED"}),(0,u.jsxs)(r.Z,{children:[(!f||"deprecated"===j)&&(0,u.jsxs)("em",{children:["(",j,") "]}),(0,u.jsx)(a.D,{components:p,children:o?b(v,y):v})]})]},e)}));return(0,u.jsx)(s.ZP.ScrollView,{children:(0,u.jsxs)(h,{children:[(0,u.jsx)("thead",{children:(0,u.jsxs)(i.Z,{children:[(0,u.jsx)(l.Z,{children:"Property"}),(0,u.jsx)(l.Z,{children:"Type"}),f&&(0,u.jsx)(l.Z,{children:"Default value"}),(0,u.jsx)(l.Z,{children:"Description"})]})}),(0,u.jsx)("tbody",{children:v})]})})}function b(t,e){return e.forEach((e=>{t=t.replace(new RegExp(e,"g"),(0,c.zW)(e))})),t}function g(t){return t.includes("[")?(0,u.jsx)(a.D,{components:p,children:t}):t}},95987:function(t,e,n){n.d(e,{G:function(){return a},j:function(){return o}});const o={open:{doc:"Set to `true` on second re-render when the view should animate from 0px to auto. Defaults to `true`.",type:"boolean",status:"optional"},animate:{doc:"Set to `false` to omit the animation. Defaults to `true`.",type:"boolean",status:"optional"},keepInDOM:{doc:"Set to `true` ensure the nested children content will be kept in the DOM. Defaults to `false`.",type:"boolean",status:"optional"},compensateForGap:{doc:"To compensate for CSS gap between the rows, so animation does not jump during the animation. Provide a CSS unit or `auto`. Defaults to `null`.",type:"string",status:"optional"},showOverflow:{doc:'Set to `true` to omit the usage of "overflow: hidden;". Defaults to `false`.',type:"boolean",status:"optional"},duration:{doc:"Custom duration of the animation in milliseconds. Defaults to `400ms`.",type:"number",status:"optional"},delay:{doc:"Custom delay of the animation in milliseconds. Defaults to `0ms`.",type:"number",status:"optional"},element:{doc:"Custom HTML element for the component. Defaults to `div` HTML Element.",type:"string",status:"optional"},innerRef:{doc:"Send along a custom React Ref.",type:"React.RefObject",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},a={onOpen:{doc:"Is called when fully opened or closed. Returns `true` or `false` depending on the state.",type:"function",status:"optional"},onAnimationStart:{doc:"Is called when animation has started. The first parameter is a string. Depending on the state, the value can be `opening`, `closing` or `adjusting`.",type:"function",status:"optional"},onAnimationEnd:{doc:"Is called when animation is done and the full height is reached. The first parameter is a string. Depending on the state, the value can be `opened`, `closed` or `adjusted`.",type:"function",status:"optional"},onInit:{doc:"Is called once before mounting the component (useLayoutEffect). Returns the instance of the internal animation class.",type:"function",status:"optional"}}},6210:function(t,e,n){var o=n(30600);e.Z=o.Z},64223:function(t,e,n){var o=n(91859);e.Z=o.Z},41676:function(t,e,n){var o=n(35610);e.Z=o.Z},27049:function(t,e,n){n.d(e,{_:function(){return s},n:function(){return a}});var o=n(95987);const a={visibleWhen:{doc:"Provide a `path` or `itemPath` and a `hasValue` method that returns a boolean or the excepted value in order to show children. The first parameter is the value of the path. You can also use `isValid` instead of `hasValue` to only show the children when the field has no errors and has lost focus (blurred). You can change that behavior by using the `validateContinuously` property.",type:"object",status:"optional"},visibleWhenNot:{doc:"Same as `visibleWhen`, but with inverted logic.",type:"object",status:"optional"},pathDefined:{doc:"Given data context path must be defined to show children.",type:"string",status:"optional"},pathUndefined:{doc:"Given data context path must be undefined to show children.",type:"string",status:"optional"},pathTruthy:{doc:"Given data context path must be truthy to show children.",type:"string",status:"optional"},pathFalsy:{doc:"Given data context path must be falsy to show children.",type:"string",status:"optional"},pathTrue:{doc:"Given data context path must be true to show children.",type:"string",status:"optional"},pathFalse:{doc:"Given data context path must be false to show children.",type:"string",status:"optional"},inferData:{doc:"Will be called to decide by external logic, and show/hide contents based on the return value.",type:"function",status:"optional"},visible:{doc:"Control visibility directly using the `visible` prop. When used alongside other conditions, the `visible` prop takes precedence.",type:"boolean",status:"optional"},animate:{doc:"Define if the content should animate during show/hide.",type:"boolean",status:"optional"},keepInDOM:{doc:"Keep the content in the DOM, even if it's not visible. Can be used to let fields run validation.",type:"boolean",status:"optional"},compensateForGap:{doc:"To compensate for CSS gap between the rows, so animation does not jump during the animation. Provide a CSS unit or `auto`. Defaults to `null`.",type:"string",status:"optional"},filterData:{doc:"Filter data based on provided criteria. More info about `filterData` can be found in the [Getting Started](/uilib/extensions/forms/getting-started/#filter-data) documentation.",type:["object","function"],status:"optional"},fieldPropsWhenHidden:{doc:"When visibility is hidden, and `keepInDOM` is true, pass these props to the children.",type:"various",status:"optional"},element:{doc:"Define the type of element. Defaults to `div`. Only for when `animate` is true.",type:"string or React.Element",status:"optional"},children:{doc:"Contents.",type:"React.Node",status:"required"}},s={onVisible:{doc:"Callback for when the content gets visible. Returns a boolean as the first parameter.",type:o.G.onOpen.type,status:"optional"},onAnimationEnd:o.G.onAnimationEnd}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-iterate-visibility-events-mdx-ba5aa782ff5fb84cf066.js.map