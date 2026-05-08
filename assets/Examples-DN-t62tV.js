import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Ji as r,bt as i,l as a,qi as o,z as s}from"./index-2AO2Cu5K.js";function c(e=null){return{withConfig(t,n){return t(e,n)}}}async function l(e,t){let{fetchConfig:n}=e,r=t?.abortControllerRef;r&&(r.current&&=(r.current.abort(),null),r.current||=new AbortController);let{signal:i}=r?.current||{},a={method:`GET`,headers:{Accept:`application/json`,...n.headers},signal:i};try{let e=await fetch(n.url,a);return r&&(r.current=null),{response:e,data:await e.json()}}catch(e){if(!(e instanceof DOMException&&e.name===`AbortError`))return e}}async function u(e,t){let{generalConfig:n,parameters:r}=t||{},i=t?.preResponseResolver?.({value:e});if(i!==void 0)return i;let a=n.fetchConfig.url,o=typeof a==`function`?await a(e,r):a,{data:s,response:c}=await l({...n,fetchConfig:{...n.fetchConfig,url:o}},t);if(!c)throw Error(`Please try again!`);if(!c.ok)throw Error(`${c.statusText} – Status: ${c.status}`);return{data:s,status:c.status}}function d({countryCode:e,additionalArgs:t}){let n=e||t.props?.[`data-country-code`]||`NO`;return{countryCode:t.getSourceValue(n)||e,countryCodeValue:n}}function f({value:e,countryCode:t,additionalArgs:n,handler:r}){let{countryCode:i,countryCodeValue:a}=d({countryCode:t||n.props?.[`data-country-code`],additionalArgs:n});return String(a).startsWith(`/`)&&n[r.name]!==r&&(n[r.name]=r,n.setFieldEventListener(a,`onPathChange`,()=>{r(e,n)})),{countryCode:i}}function p(e,t){return e?t.includes(String(e).toUpperCase()):!1}var m=e({autofill:()=>y,getMockData:()=>x,preResponseResolver:()=>_,responseResolver:()=>v,supportedCountryCodes:()=>h,unsupportedCountryCodeMessage:()=>g,validator:()=>b}),h=[`NO`,`DK`,`SE`,`FI`,`NL`,`DE`,`US`,`BE`,`FO`,`GL`,`IS`,`SJ`],g=`Postal code verification is not supported for {countryCode}.`,_=({value:e})=>{if(!e)return{postal_codes:[]}},v=(e,t)=>{let n=t?.responseResolver;if(typeof n==`function`)return n(e);let{postal_code:r,city:i}=e?.postal_codes?.[0]||{};return{matcher:e=>e===r,payload:{city:i}}};function y(e,t){let n={current:null};return async function i(a,s){if(!(typeof a==`string`&&a.length>=4))return;let{countryCode:c}=f({value:a,countryCode:t?.countryCode,additionalArgs:s,handler:i});if(p(c,h))try{let{data:i}=await u(a,{generalConfig:e,parameters:{countryCode:String(c).toLowerCase()},abortControllerRef:n,preResponseResolver:t?.preResponseResolver??_}),l=e=>{let{cityPath:n}=t||{};if(n){if(!s.dataContext)throw Error(`No data context found in the postalCode connector`);let{dataContext:t}=s,i=t.internalDataRef.current;r(i,n)&&o(i,n)||t.handlePathChangeUnvalidated(n,e.city)}},{matcher:d,payload:f}=v(i,t);if(d(a))return l(f)}catch(e){return e}}}function b(e,t){let n={current:null};return async function r(a,o){if(!(typeof a==`string`&&a.length>=4))return;let{countryCode:s}=f({value:a,countryCode:t?.countryCode,additionalArgs:o,handler:r});if(!p(s,h))return Error(g.replace(`{countryCode}`,s));try{let{data:r,status:o}=await u(a,{generalConfig:e,parameters:{countryCode:String(s).toLowerCase()},abortControllerRef:n,preResponseResolver:t?.preResponseResolver??_}),c=()=>new i(`PostalCodeAndCity.invalidCode`),{matcher:l}=v(r,t),d=l(a);if(o!==400&&!d)return c()}catch(e){return e}}}function x(e){switch(String(e).toUpperCase()){case`SE`:return{postal_codes:[{city:`Stockholm`,postal_code:`11432`}]};default:return{postal_codes:[{city:`Vollen`,postal_code:`1391`}]}}}var S=e({getMockData:()=>A,preResponseResolver:()=>E,responseResolver:()=>D,suggestions:()=>O,suggestionsElement:()=>k,supportedCountryCodes:()=>w,unsupportedCountryMessage:()=>T}),C=t(),w=[`NO`],T=`Postal code verification is not supported for {countryCode}.`,E=({value:e})=>{if(!e)return{addresses:[]}},D=(e,t)=>{let n=t?.responseResolver;return typeof n==`function`?n(e):{payload:e?.addresses.map(e=>{let t=[e.street_name,e.house_number].filter(Boolean).join(` `),n=[e.postal_code,e.city].filter(Boolean).join(` `);return{item:e,selectedValue:t,selectedKey:t||e.address_id,content:[t,n]}})}};function O(e,t){let n={current:null};return async function(e){return await r(e.value,e)};async function r(i,a){if(typeof i!=`string`)return;let{countryCode:o}=f({value:i,countryCode:t?.countryCode,additionalArgs:a,handler:r});if(p(o,w))try{a.showIndicator();let{data:r}=await u(i,{generalConfig:e,parameters:{countryCode:String(o).toLowerCase()},abortControllerRef:n,preResponseResolver:t?.preResponseResolver??E}),{payload:s}=D(r,t);a.updateData(s),a.hideIndicator()}catch{a.hideIndicator()}}}function k(e,t){let n=O(e,t),r=(e,n)=>{let{cityPath:r,postalCodePath:i}=t||{},a=n?.data;if(a){let e=n.dataContext;e.handlePathChangeUnvalidated(i,a.item.postal_code),e.handlePathChangeUnvalidated(r,a.item.city)}};return e=>{let{suggestionPlaceholder:t}=s().StreetAddress;return(0,C.jsx)(a,{variant:`autocomplete`,...e,autocompleteProps:{mode:`async`,disableFilter:!0,keepValue:!0,openOnFocus:!0,placeholder:t,onType:n,...e?.autocompleteProps},onChange:r})}}function A(e){switch(String(e).toUpperCase()){case`SE`:return{addresses:[]};default:return{addresses:[{address_id:`1398742`,street_name:`Gransvea`,house_number:37,postal_code:`1391`,city:`Vollen`,county:`Akershus`,municipality:`Asker`,type:`STREET`},{address_id:`3168496`,street_name:`Gransvegen`,house_number:1,postal_code:`2090`,city:`Hurdal`,county:`Akershus`,municipality:`Hurdal`,type:`STREET`},{address_id:`325829`,street_name:`Gransveien`,house_number:2,postal_code:`1900`,city:`Fetsund`,county:`Akershus`,municipality:`Lillestrøm`,type:`STREET`},{address_id:`325829`,street_name:`Somewhere else`,house_number:100,postal_code:`1234`,city:`City`,county:`County`,municipality:`Municipality`,type:`STREET`}]}}}var j=e({address:()=>S,postalCode:()=>m}),M=e({Bring:()=>j,createContext:()=>c,fetchData:()=>u,getCountryCodeValue:()=>d,handleCountryPath:()=>f,isSupportedCountryCode:()=>p}),N=e({Address:()=>L,PostalCode:()=>I}),P=null;async function F(e,t){let n=globalThis.fetch;globalThis.fetch=()=>Promise.resolve({ok:!0,json:()=>Promise.resolve(t)}),await new Promise(e=>setTimeout(e,1e3)),clearTimeout(P),P=setTimeout(()=>{globalThis.fetch=n},1100)}var I=()=>(0,C.jsx)(n,{scope:{Connectors:M,getMockDataPostalCode:x,mockFetch:F},noInline:!0,children:`const { withConfig } = Connectors.createContext({
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
`}),L=()=>(0,C.jsx)(n,{scope:{Connectors:M,getMockDataAddress:A,mockFetch:F},noInline:!0,children:`const { withConfig } = Connectors.createContext({
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
`});export{h as a,w as i,N as n,I as r,L as t};