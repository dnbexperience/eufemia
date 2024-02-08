"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[12264],{98890:function(n,t,e){e.r(t),e.d(t,{default:function(){return u}});var a={};e.r(a),e.d(a,{IteratePath:function(){return d},Path:function(){return h}});var r=e(52322),o=e(45392),l=e(44464),i=e(16620),s=e(85221);const h=()=>(0,r.jsx)(l.Z,{scope:{DataContext:i},children:'<Form.Handler\n  data={{\n    foo: {\n      one: 1,\n      two: 2,\n    },\n    bar: \'Bar\',\n  }}\n>\n  <DataContext.At path="/foo">\n    <Field.Number path="/one" label="One" />\n    <Field.Number path="/two" label="Two" />\n  </DataContext.At>\n</Form.Handler>\n'}),d=()=>(0,r.jsx)(l.Z,{scope:{Value:s,DataContext:i},children:"<Form.Handler\n  data={{\n    list: [\n      {\n        title: 'Object 1',\n      },\n      {\n        title: 'Object 2',\n      },\n    ],\n    bar: 'Bar',\n  }}\n  onChange={(data) => console.log('onChange', data)}\n  onPathChange={(path, value) => console.log('onPathChange', path, value)}\n>\n  <DataContext.At path=\"/list\" iterate>\n    <Value.String path=\"/title\" label=\"Title\" />\n    <Field.String path=\"/title\" label=\"Title\" />\n  </DataContext.At>\n</Form.Handler>\n"});function c(n){const t=Object.assign({h2:"h2",h3:"h3"},(0,o.ah)(),n.components);return a||p("Examples",!1),d||p("Examples.IteratePath",!0),h||p("Examples.Path",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:"Demos"}),"\n",(0,r.jsx)(t.h3,{children:"At path"}),"\n",(0,r.jsx)(h,{}),"\n",(0,r.jsx)(t.h3,{children:"Iterate path"}),"\n",(0,r.jsx)(d,{})]})}var u=function(n){void 0===n&&(n={});const{wrapper:t}=Object.assign({},(0,o.ah)(),n.components);return t?(0,r.jsx)(t,Object.assign({},n,{children:(0,r.jsx)(c,n)})):c(n)};function p(n,t){throw new Error("Expected "+(t?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},16620:function(n,t,e){e.r(t),e.d(t,{At:function(){return d},Context:function(){return a.Z},Provider:function(){return r.Z},defaultContextState:function(){return a.E}});var a=e(21068),r=e(80370),o=e(2784),l=e(95955),i=e.n(l),s=e(52322);function h(n){const{path:t="/",iterate:e,children:r}=n,l=(0,o.useContext)(a.Z),{data:h,handlePathChange:d}=l,c=h&&i().has(h,t)?i().get(h,t):void 0,u=(0,o.useMemo)((()=>d?(n,e)=>{d(`${t}${n}`,e)}:void 0),[d,t]);return e?Array.isArray(c)?(0,s.jsx)(s.Fragment,{children:c.map(((n,e)=>{const o=d?(n,a)=>{d(`${t}/${e}${n}`,a)}:void 0;return(0,s.jsx)(a.Z.Provider,{value:{...l,data:n,handlePathChange:o},children:r},`element${e}`)}))}):null:(0,s.jsx)(a.Z.Provider,{value:{...l,data:c,handlePathChange:u},children:r})}h._supportsSpacingProps=!0;var d=h}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-data-context-at-demos-mdx-709eb0c8c155b1bc35bc.js.map