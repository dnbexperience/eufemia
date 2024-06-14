"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[9252],{71266:function(e,t,n){n.r(t);var o=n(52322),s=n(45392),r=n(85179),a=n(19035);function i(e){const t=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code",pre:"pre"},(0,s.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:"Events"}),"\n",(0,o.jsx)(r.ZP,{props:a.uA}),"\n",(0,o.jsx)(t.h3,{children:"Prevent a change"}),"\n",(0,o.jsxs)(t.p,{children:["You can prevent a change from happening by returning false on the ",(0,o.jsx)(t.code,{children:"on_click"})," event handler:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-tsx",children:"<Tabs\n  on_click={() => {\n    if (condition === true) {\n      return false\n    }\n  }}\n  on_change={() => {\n    // Will not get emitted\n  }}\n/>\n"})})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?(0,o.jsx)(t,Object.assign({},e,{children:(0,o.jsx)(i,e)})):i(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return f},ZP:function(){return y}});var o=n(70894),s=n(61185),r=n(55560),a=n(41676),i=n(6210),l=n(64223),c=n(37339),d=n(595),u=n(52322);const h={...d.L,p:e=>(0,u.jsx)("span",{...e})},p=(0,o.Z)(r.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),b="var(--color-fire-red)",f=e=>{let{variant:t,strikethrough:n,children:o,style:s={},...r}=e;if(n&&(s.textDecoration="line-through"),"string"==typeof o)switch(t){case"prop":break;case"type":s.color=o.startsWith("'")?b:"var(--color-violet)";case"value":s.color=o.startsWith("'")?b:"undefined"===o||"null"===o?"var(--color-black-55)":"var(--color-success-green)";default:s.background="none",s.boxShadow="none"}return h.code({children:o,style:s,...r})};function y(e){let{props:t,valueType:n="string",camelCase:o,omit:d,showDefaultValue:b=!1}=e;const y=Object.keys(t),v=Object.entries(t).map((e=>{let[t,r]=e;if(!r)return null;const{type:l,defaultValue:p,doc:v,status:j}=r;return d&&d.includes(t)?null:(0,u.jsxs)(a.Z,{children:[(0,u.jsx)(i.Z,{children:(0,u.jsx)(f,{variant:"prop",strikethrough:"deprecated"===j,children:m(o?(0,c.zW)(t):t)})}),(0,u.jsx)(i.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,u.jsx)(f,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,u.jsxs)(u.Fragment,{children:[e," ",(0,u.jsx)("br",{})," ",t]})));e=n}return(0,u.jsx)(f,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,u.jsxs)(u.Fragment,{children:[e," ",(0,u.jsx)("br",{})," ",t]})))}),b&&(0,u.jsx)(i.Z,{children:p?(0,u.jsx)(f,{variant:"value",children:p}):"required"===j&&"REQUIRED"}),(0,u.jsxs)(i.Z,{children:[(!b||"deprecated"===j)&&(0,u.jsxs)("em",{children:["(",j,") "]}),(0,u.jsx)(s.D,{components:h,children:o?g(v,y):v})]})]},t)}));return(0,u.jsx)(r.ZP.ScrollView,{children:(0,u.jsxs)(p,{children:[(0,u.jsx)("thead",{children:(0,u.jsxs)(a.Z,{children:[(0,u.jsx)(l.Z,{children:"Property"}),(0,u.jsx)(l.Z,{children:"Type"}),b&&(0,u.jsx)(l.Z,{children:"Default value"}),(0,u.jsx)(l.Z,{children:"Description"})]})}),(0,u.jsx)("tbody",{children:v})]})})}function g(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function m(e){return e.includes("/")?(0,u.jsx)(s.D,{components:h,children:e}):e}},19035:function(e,t,n){n.d(t,{WH:function(){return o},uA:function(){return r},w:function(){return s}});const o={selected_key:{doc:"In case one of the tabs should be opened by a `key`.",type:["string","number"],status:"optional"},align:{doc:'To align the tab list on the right side `align="right"`. Defaults to `left`.',type:["left","center","right"],status:"optional"},content_style:{doc:"To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.",type:["divider","white","transparent"],status:"optional"},content_spacing:{doc:"To modify the `spacing` onto the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `large`.",type:["boolean","x-small","small","medium","large","x-large","xx-large"],status:"optional"},tabs_style:{doc:"To enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.",type:["divider","white","transparent"],status:"optional"},tabs_spacing:{doc:"To modify the `spacing` inside the tab list. Defaults to `null`.",type:"boolean",status:"optional"},tab_element:{doc:"Define what HTML element should be used. You can provide e.g. `tab_element={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: ';url';, ... }]}`). Defaults to `<button>`.",type:"React.ReactNode",status:"optional"},"[data](/uilib/components/tabs/properties/#data-object)":{doc:"defines the data structure to load as an object.",type:"object",status:"required"},children:{doc:"the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.",type:["React.ReactNode","object"],status:"required"},content:{doc:"the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.",type:["React.ReactNode","object"],status:"required"},prerender:{doc:"If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.",type:"boolean",status:"optional"},prevent_rerender:{doc:"If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.",type:"boolean",status:"optional"},scroll:{doc:"If set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.",type:"boolean",status:"optional"},no_border:{doc:"If set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.",type:"boolean",status:"optional"},nav_button_edge:{doc:"If set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.",type:"boolean",status:"optional"},skeleton:{doc:"If set to `true`, an overlaying skeleton with animation will be shown.",type:"boolean",status:"optional"},breakout:{doc:"If set to `false`, the default horizontal border line under the tablist remains inside the parent boundaries. Defaults to `true`.",type:"boolean",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},s={title:{doc:"The title of the tab.",type:["string","React.ReactNode"],status:"required"},key:{doc:"The unique key of the tab.",type:["string","number"],status:"required"},content:{doc:"The content of the tab.",type:"React.ReactNode",status:"optional"},selected:{doc:"If set to `true`, the tab will be selected.",type:"boolean",status:"optional"},disabled:{doc:"If set to `true`, the tab will be disabled.",type:"boolean",status:"optional"}},r={on_change:{doc:"(preferred) this event gets triggered once the tab changes its selected key. Returns `{ key, selected_key, focus_key, event }`.",type:"function",status:"optional"},on_click:{doc:"This event gets triggered once the tab gets clicked. Returns `{ key, selected_key, focus_key, event }`.",type:"function",status:"optional"},on_focus:{doc:"This event gets triggered once the tab changes its focus key. Returns `{ key, selected_key, focus_key, event }`.",type:"function",status:"optional"},on_mouse_enter:{doc:"This event gets triggered once the user';s mouse enters a tab (hover). Returns `{ key, selected_key, focus_key, event }`.",type:"function",status:"optional"}}},6210:function(e,t,n){var o=n(30600);t.Z=o.Z},64223:function(e,t,n){var o=n(91859);t.Z=o.Z},41676:function(e,t,n){var o=n(37381);t.Z=o.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-components-tabs-events-mdx-4cdf74adebcd6abe7a72.js.map