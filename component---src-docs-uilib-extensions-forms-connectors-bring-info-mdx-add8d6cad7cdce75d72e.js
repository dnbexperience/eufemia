"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[80636],{18078:function(n,e,o){o.r(e);var t=o(52322),r=o(45392),s=o(88568);function a(n){const e=Object.assign({h2:"h2",p:"p",code:"code",a:"a",ul:"ul",li:"li",pre:"pre",h3:"h3"},(0,r.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Description"}),"\n",(0,t.jsxs)(e.p,{children:["The ",(0,t.jsx)(e.code,{children:"Bring"})," connector allows you to use the ",(0,t.jsx)(e.a,{href:"https://developer.bring.com/api/",children:"Bring API"})," to:"]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Verify a postal code"}),"\n",(0,t.jsx)(e.li,{children:"Autofill a city name or street name"}),"\n"]}),"\n",(0,t.jsx)(e.h2,{children:"PostalCode API"}),"\n",(0,t.jsxs)(e.p,{children:["Here is an example of how to use the Bring ",(0,t.jsx)(e.a,{href:"https://developer.bring.com/api/postal-code/",children:"Postal Code API"})," to connect the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/feature-fields/PostalCodeAndCity/",children:"PostalCodeAndCity"})," field to a form."]}),"\n",(0,t.jsx)(e.p,{children:"First, create a context with the config:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"import { Connectors, Field, Form } from '@dnb/eufemia/extensions/forms'\n\nconst { withConfig } = Connectors.createContext({\n  fetchConfig: {\n    url: (value, { countryCode }) => {\n      return `[YOUR-API-URL]/.../${countryCode}/.../${value}`\n      // Real-world example using Bring's Postal Code API's get postal code endpoint, directly without proxy:\n      // return `https://api.bring.com/address/api/{countryCode}/postal-codes/{value}`\n    },\n  },\n})\n"})}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"[YOUR-API-URL]"})," is the URL of your own API endpoint that proxies the Bring ",(0,t.jsx)(e.a,{href:"https://developer.bring.com/api/postal-code/",children:"Postal Code API"})," with a token."]}),"\n",(0,t.jsx)(e.h3,{children:"Supported countries"}),"\n",(0,t.jsxs)(e.p,{children:["The Bring API for PostalCode supports the ",(0,t.jsx)(e.a,{href:"https://developer.bring.com/api/postal-code/#supported-countries",children:"following countries"}),", by its country codes:"]}),"\n",s.supportedCountryCodes.join(", "),"\n",(0,t.jsx)(e.h3,{children:"Endpoints and response format"}),"\n",(0,t.jsxs)(e.p,{children:["Ensure you use one of the ",(0,t.jsx)(e.a,{href:"https://developer.bring.com/api/postal-code/#endpoints",children:"following endpoints"})," from Bring via your proxy API, returning a list of postal codes in the following format:"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-json",children:'{\n  "postal_codes": [\n    {\n      "postal_code": "1391",\n      "city": "Vollen"\n      ...\n    }\n  ]\n}\n'})}),"\n",(0,t.jsx)(e.h3,{children:"To verify a postal code"}),"\n",(0,t.jsxs)(e.p,{children:["Use the context to create a validator based on the ",(0,t.jsx)(e.code,{children:"validator"})," connector."]}),"\n",(0,t.jsxs)(e.p,{children:["You can use it for an ",(0,t.jsx)(e.code,{children:"onChangeValidator"})," or ",(0,t.jsx)(e.code,{children:"onBlurValidator"})," (recommended), depending on your use case."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"const onBlurValidator = withConfig(Connectors.Bring.postalCode.validator)\n\nfunction MyForm() {\n  return (\n    <Form.Handler>\n      <Field.PostalCodeAndCity\n        postalCode={{\n          path: '/postalCode',\n          onBlurValidator,\n        }}\n      />\n    </Form.Handler>\n  )\n}\n"})}),"\n",(0,t.jsx)(e.h3,{children:"To autofill a city name based on a postal code"}),"\n",(0,t.jsxs)(e.p,{children:["Use the context to create the ",(0,t.jsx)(e.code,{children:"onChange"})," event handler based on the ",(0,t.jsx)(e.code,{children:"autofill"})," connector."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-tsx",children:"const onChange = withConfig(Connectors.Bring.postalCode.autofill, {\n  cityPath: '/city',\n})\n\nfunction MyForm() {\n  return (\n    <Form.Handler>\n      <Field.PostalCodeAndCity\n        postalCode={{\n          path: '/postalCode',\n          onChange,\n        }}\n        city={{\n          path: '/city',\n        }}\n      />\n      <Form.SubmitButton />\n    </Form.Handler>\n  )\n}\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(a,n)})):a(n)}},88568:function(n,e,o){o.r(e),o.d(e,{autofill:function(){return l},getMockData:function(){return u},preResponseResolver:function(){return i},responseResolver:function(){return c},supportedCountryCodes:function(){return s},unsupportedCountryCodeMessage:function(){return a},validator:function(){return d}});var t=o(11328),r=o(16784);const s=["NO","DK","SE","FI","NL","DE","US","BE","FO","GL","IS","SJ"],a="Postal code verification is not supported for {countryCode}.",i=n=>{let{value:e}=n;if(!e)return{postal_codes:[]}},c=(n,e)=>{var o;const t=null==e?void 0:e.responseResolver;if("function"==typeof t)return t(n);const{postal_code:r,city:s}=(null==n||null===(o=n.postal_codes)||void 0===o?void 0:o[0])||{};return{matcher:n=>n===r,payload:{city:s}}};function l(n,e){const o={current:null};return async function t(a,l){if(!("string"==typeof a&&a.length>=4))return;const{countryCode:d}=(0,r.S_)({value:a,additionalArgs:l,handler:t});if(!d||s.includes(d))try{var u;const t={countryCode:String(d).toLowerCase()},{data:s}=await(0,r.rQ)(a,{generalConfig:n,parameters:t,abortControllerRef:o,preResponseResolver:null!==(u=null==e?void 0:e.preResponseResolver)&&void 0!==u?u:i}),h=n=>{const{cityPath:o}=e||{};if(o){if(!l.dataContext)throw new Error("No data context found in the postalCode connector");l.dataContext.handlePathChangeUnvalidated(o,n.city)}},{matcher:p,payload:f}=c(s,e);if(p(a))return h(f)}catch(h){return h}}}function d(n,e){const o={current:null};return async function(l,d){if(!("string"==typeof l&&l.length>=4))return;const{countryCode:u}=(0,r.hE)({additionalArgs:d});if(u&&!s.includes(u))return new Error(a.replace("{countryCode}",u));try{var h;const s={countryCode:String(u).toLowerCase()},{data:a,status:d}=await(0,r.rQ)(l,{generalConfig:n,parameters:s,abortControllerRef:o,preResponseResolver:null!==(h=null==e?void 0:e.preResponseResolver)&&void 0!==h?h:i}),p=()=>new t.X("PostalCodeAndCity.invalidCode"),{matcher:f}=c(a,e),C=f(l);if(400!==d&&!C)return p()}catch(p){return p}}}function u(n){return"SE"===String(n).toUpperCase()?{postal_codes:[{city:"Stockholm",postal_code:"11432"}]}:{postal_codes:[{city:"Vollen",postal_code:"1391"}]}}},16784:function(n,e,o){o.d(e,{S_:function(){return i},hE:function(){return a},kr:function(){return r},rQ:function(){return s}});var t=o(98942);function r(n){return void 0===n&&(n=null),{withConfig(e,o){return e(n,o)}}}async function s(n,e){var o;const{generalConfig:t,parameters:r}=e||{},s=null==e||null===(o=e.preResponseResolver)||void 0===o?void 0:o.call(e,{value:n});if(void 0!==s)return s;try{const o=t.fetchConfig.url,s="function"==typeof o?await o(n,r):o,{data:a,response:i}=await async function(n,e){const{fetchConfig:o}=n,t=null==e?void 0:e.abortControllerRef;t&&(t.current&&(t.current.abort(),t.current=null),t.current||(t.current=new AbortController));const{signal:r}=(null==t?void 0:t.current)||{},s={method:"GET",headers:{Accept:"application/json",...o.headers},signal:r};try{const n=await fetch(o.url,s);return t&&(t.current=null),{response:n,data:await n.json()}}catch(a){if("AbortError"!==a.name)return a}}({...t,fetchConfig:{...t.fetchConfig,url:s}},e);if(!i.ok)throw new Error(`${i.statusText} – Status: ${i.status}`);return{data:a,status:i.status}}catch(a){return a}}function a(n){let{additionalArgs:e}=n;const o=e.props["data-country-code"]||t.si;return{countryCode:e.getSourceValue(o),countryCodeValue:o}}function i(n){let{value:e,additionalArgs:o,handler:t}=n;const{countryCode:r,countryCodeValue:s}=a({additionalArgs:o});return String(s).startsWith("/")&&o[t.name]!==t&&(o[t.name]=t,o.setFieldEventListener(s,"onPathChange",(()=>{t(e,o)}))),{countryCode:r}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-connectors-bring-info-mdx-add8d6cad7cdce75d72e.js.map