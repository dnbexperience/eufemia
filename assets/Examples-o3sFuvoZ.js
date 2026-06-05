import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{d as r,u as i}from"./SpacingUtils-DG3qCKRf.js";import{t as a}from"./Card-ClZNWqpG.js";import{j as o,pt as s,t as c}from"./Selection-ZMzbWBRf.js";import{t as l}from"./Form-C8lTzZqR.js";import{t as u}from"./Field-neGd0eKd.js";import{t as d}from"./ComponentBox-CG7uqrFy.js";function f(e=null){return{withConfig(t,n){return t(e,n)}}}async function p(e,t){let{fetchConfig:n}=e,r=t?.abortControllerRef;r&&(r.current&&=(r.current.abort(),null),r.current||=new AbortController);let{signal:i}=r?.current||{},a={method:`GET`,headers:{Accept:`application/json`,...n.headers},signal:i};try{let e=await fetch(n.url,a);return r&&(r.current=null),{response:e,data:await e.json()}}catch(e){if(!(e instanceof DOMException&&e.name===`AbortError`))return e}}async function m(e,t){let{generalConfig:n,parameters:r}=t||{},i=t?.preResponseResolver?.({value:e});if(i!==void 0)return i;let a=n.fetchConfig.url,o=typeof a==`function`?await a(e,r):a,{data:s,response:c}=await p({...n,fetchConfig:{...n.fetchConfig,url:o}},t);if(!c)throw Error(`Please try again!`);if(!c.ok)throw Error(`${c.statusText} – Status: ${c.status}`);return{data:s,status:c.status}}function h({countryCode:e,additionalArgs:t}){let n=e||t.props?.[`data-country-code`]||`NO`;return{countryCode:t.getSourceValue(n)||e,countryCodeValue:n}}function g({value:e,countryCode:t,additionalArgs:n,handler:r}){let{countryCode:i,countryCodeValue:a}=h({countryCode:t||n.props?.[`data-country-code`],additionalArgs:n});return String(a).startsWith(`/`)&&n[r.name]!==r&&(n[r.name]=r,n.setFieldEventListener(a,`onPathChange`,()=>{r(e,n)})),{countryCode:i}}function _(e,t){return e?t.includes(String(e).toUpperCase()):!1}var v=e({autofill:()=>C,getMockData:()=>T,preResponseResolver:()=>x,responseResolver:()=>S,supportedCountryCodes:()=>y,unsupportedCountryCodeMessage:()=>b,validator:()=>w}),y=[`NO`,`DK`,`SE`,`FI`,`NL`,`DE`,`US`,`BE`,`FO`,`GL`,`IS`,`SJ`],b=`Postal code verification is not supported for {countryCode}.`,x=({value:e})=>{if(!e)return{postal_codes:[]}},S=(e,t)=>{let n=t?.responseResolver;if(typeof n==`function`)return n(e);let{postal_code:r,city:i}=e?.postal_codes?.[0]||{};return{matcher:e=>e===r,payload:{city:i}}};function C(e,t){let n={current:null};return async function a(o,s){if(!(typeof o==`string`&&o.length>=4))return;let{countryCode:c}=g({value:o,countryCode:t?.countryCode,additionalArgs:s,handler:a});if(_(c,y))try{let{data:a}=await m(o,{generalConfig:e,parameters:{countryCode:String(c).toLowerCase()},abortControllerRef:n,preResponseResolver:t?.preResponseResolver??x}),l=e=>{let{cityPath:n}=t||{};if(n){if(!s.dataContext)throw Error(`No data context found in the postalCode connector`);let{dataContext:t}=s,a=t.internalDataRef.current;r(a,n)&&i(a,n)||t.handlePathChangeUnvalidated(n,e.city)}},{matcher:u,payload:d}=S(a,t);if(u(o))return l(d)}catch(e){return e}}}function w(e,t){let n={current:null};return async function r(i,a){if(!(typeof i==`string`&&i.length>=4))return;let{countryCode:o}=g({value:i,countryCode:t?.countryCode,additionalArgs:a,handler:r});if(!_(o,y))return Error(b.replace(`{countryCode}`,o));try{let{data:r,status:a}=await m(i,{generalConfig:e,parameters:{countryCode:String(o).toLowerCase()},abortControllerRef:n,preResponseResolver:t?.preResponseResolver??x}),c=()=>new s(`PostalCodeAndCity.invalidCode`),{matcher:l}=S(r,t),u=l(i);if(a!==400&&!u)return c()}catch(e){return e}}}function T(e){switch(String(e).toUpperCase()){case`SE`:return{postal_codes:[{city:`Stockholm`,postal_code:`11432`}]};default:return{postal_codes:[{city:`Vollen`,postal_code:`1391`}]}}}var E=e({getMockData:()=>P,preResponseResolver:()=>A,responseResolver:()=>j,suggestions:()=>M,suggestionsElement:()=>N,supportedCountryCodes:()=>O,unsupportedCountryMessage:()=>k}),D=t(n()),O=[`NO`],k=`Postal code verification is not supported for {countryCode}.`,A=({value:e})=>{if(!e)return{addresses:[]}},j=(e,t)=>{let n=t?.responseResolver;return typeof n==`function`?n(e):{payload:e?.addresses.map(e=>{let t=[e.street_name,e.house_number].filter(Boolean).join(` `),n=[e.postal_code,e.city].filter(Boolean).join(` `);return{item:e,selectedValue:t,selectedKey:t||e.address_id,content:[t,n]}})}};function M(e,t){let n={current:null};return async function(e){return await r(e.value,e)};async function r(i,a){if(typeof i!=`string`)return;let{countryCode:o}=g({value:i,countryCode:t?.countryCode,additionalArgs:a,handler:r});if(_(o,O))try{a.showIndicator();let{data:r}=await m(i,{generalConfig:e,parameters:{countryCode:String(o).toLowerCase()},abortControllerRef:n,preResponseResolver:t?.preResponseResolver??A}),{payload:s}=j(r,t);a.updateData(s),a.hideIndicator()}catch{a.hideIndicator()}}}function N(e,t){let n=M(e,t),r=(e,n)=>{let{cityPath:r,postalCodePath:i}=t||{},a=n?.data;if(a){let e=n.dataContext;e.handlePathChangeUnvalidated(i,a.item.postal_code),e.handlePathChangeUnvalidated(r,a.item.city)}};return e=>{let{suggestionPlaceholder:t}=o().StreetAddress;return(0,D.jsx)(c,{variant:`autocomplete`,...e,autocompleteProps:{mode:`async`,disableFilter:!0,keepValue:!0,openOnFocus:!0,placeholder:t,onType:n,...e?.autocompleteProps},onChange:r})}}function P(e){switch(String(e).toUpperCase()){case`SE`:return{addresses:[]};default:return{addresses:[{address_id:`1398742`,street_name:`Gransvea`,house_number:37,postal_code:`1391`,city:`Vollen`,county:`Akershus`,municipality:`Asker`,type:`STREET`},{address_id:`3168496`,street_name:`Gransvegen`,house_number:1,postal_code:`2090`,city:`Hurdal`,county:`Akershus`,municipality:`Hurdal`,type:`STREET`},{address_id:`325829`,street_name:`Gransveien`,house_number:2,postal_code:`1900`,city:`Fetsund`,county:`Akershus`,municipality:`Lillestrøm`,type:`STREET`},{address_id:`325829`,street_name:`Somewhere else`,house_number:100,postal_code:`1234`,city:`City`,county:`County`,municipality:`Municipality`,type:`STREET`}]}}}var F=e({address:()=>E,postalCode:()=>v}),I=e({Bring:()=>F,createContext:()=>f,fetchData:()=>m,getCountryCodeValue:()=>h,handleCountryPath:()=>g,isSupportedCountryCode:()=>_}),L=e({Address:()=>V,PostalCode:()=>B}),R=null;async function z(e,t){let n=globalThis.fetch;globalThis.fetch=()=>Promise.resolve({ok:!0,json:()=>Promise.resolve(t)}),await new Promise(e=>setTimeout(e,1e3)),clearTimeout(R),R=setTimeout(()=>{globalThis.fetch=n},1100)}var B=()=>(0,D.jsx)(d,{scope:{Connectors:I,getMockDataPostalCode:T,mockFetch:z},stableName:`PostalCode`,sourceImports:[`import { getMockData as getMockDataPostalCode } from '@dnb/eufemia/extensions/forms/Connectors/Bring/postalCode'`,`import { getMockData as getMockDataAddress } from '@dnb/eufemia/extensions/forms/Connectors/Bring/address'`,`import { Form, Field, Connectors } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Connectors:I,Form:l,Card:a,Field:u},noInline:!0,children:`const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: async (value, { countryCode }) => {
      await mockFetch(countryCode, getMockDataPostalCode(countryCode))
      return \`[YOUR-API-URL]/\${value}\`
    },
  },
})
const onBlurValidator = withConfig(Connectors.Bring.postalCode.validator)
const onBlur = withConfig(Connectors.Bring.postalCode.autofill, {
  cityPath: '/city',
})
render(
  <Form.Handler onSubmit={console.log}>
    <Form.Card>
      <Field.PostalCodeAndCity
        countryCode="/countryCode"
        postalCode={{
          path: '/postalCode',
          onBlurValidator,
          // @ts-expect-error -- strictFunctionTypes
          onBlur,
          required: true,
        }}
        city={{
          path: '/city',
          required: true,
        }}
      />
      <Field.SelectCountry
        path="/countryCode"
        defaultValue="NO"
        filterCountries={({ iso }) => ['NO', 'SE'].includes(iso)}
      />
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
`}),V=()=>(0,D.jsx)(d,{scope:{Connectors:I,getMockDataAddress:P,mockFetch:z},stableName:`Address`,sourceImports:[`import { getMockData as getMockDataPostalCode } from '@dnb/eufemia/extensions/forms/Connectors/Bring/postalCode'`,`import { getMockData as getMockDataAddress } from '@dnb/eufemia/extensions/forms/Connectors/Bring/address'`,`import { Form, Field, Connectors } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Connectors:I,Form:l,Card:a,Field:u},noInline:!0,children:`const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: async (value, { countryCode }) => {
      await mockFetch(countryCode, getMockDataAddress(countryCode))
      return \`[YOUR-API-URL]/\${value}\`
    },
  },
})
const addressSuggestionsElement = withConfig(
  Connectors.Bring.address.suggestionsElement,
  {
    countryCode: '/countryCode',
    cityPath: '/city',
    postalCodePath: '/postalCode',
  }
)
render(
  <Form.Handler onSubmit={console.log}>
    <Form.Card>
      <Field.Address.Street
        path="/streetAddress"
        // @ts-expect-error -- strictFunctionTypes
        element={addressSuggestionsElement}
      />
      <Field.PostalCodeAndCity
        countryCode="/countryCode"
        postalCode={{
          path: '/postalCode',
          required: true,
        }}
        city={{
          path: '/city',
          required: true,
        }}
      />
      <Field.SelectCountry
        path="/countryCode"
        defaultValue="NO"
        filterCountries={({ iso }) => ['NO', 'SE'].includes(iso)}
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
`});export{y as a,O as i,L as n,B as r,V as t};