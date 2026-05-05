import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{Et as i,G as a,Ji as o,Yi as s,h as c}from"./index-CMgyXmp3.js";function l(e=null){return{withConfig(t,n){return t(e,n)}}}async function u(e,t){let{fetchConfig:n}=e,r=t?.abortControllerRef;r&&(r.current&&=(r.current.abort(),null),r.current||=new AbortController);let{signal:i}=r?.current||{},a={method:`GET`,headers:{Accept:`application/json`,...n.headers},signal:i};try{let e=await fetch(n.url,a);return r&&(r.current=null),{response:e,data:await e.json()}}catch(e){if(!(e instanceof DOMException&&e.name===`AbortError`))return e}}async function d(e,t){let{generalConfig:n,parameters:r}=t||{},i=t?.preResponseResolver?.({value:e});if(i!==void 0)return i;let a=n.fetchConfig.url,o=typeof a==`function`?await a(e,r):a,{data:s,response:c}=await u({...n,fetchConfig:{...n.fetchConfig,url:o}},t);if(!c)throw Error(`Please try again!`);if(!c.ok)throw Error(`${c.statusText} – Status: ${c.status}`);return{data:s,status:c.status}}function f({countryCode:e,additionalArgs:t}){let n=e||t.props?.[`data-country-code`]||`NO`;return{countryCode:t.getSourceValue(n)||e,countryCodeValue:n}}function p({value:e,countryCode:t,additionalArgs:n,handler:r}){let{countryCode:i,countryCodeValue:a}=f({countryCode:t||n.props?.[`data-country-code`],additionalArgs:n});return String(a).startsWith(`/`)&&n[r.name]!==r&&(n[r.name]=r,n.setFieldEventListener(a,`onPathChange`,()=>{r(e,n)})),{countryCode:i}}function m(e,t){return e?t.includes(String(e).toUpperCase()):!1}var h=e({autofill:()=>b,getMockData:()=>S,preResponseResolver:()=>v,responseResolver:()=>y,supportedCountryCodes:()=>g,unsupportedCountryCodeMessage:()=>_,validator:()=>x}),g=[`NO`,`DK`,`SE`,`FI`,`NL`,`DE`,`US`,`BE`,`FO`,`GL`,`IS`,`SJ`],_=`Postal code verification is not supported for {countryCode}.`,v=({value:e})=>{if(!e)return{postal_codes:[]}},y=(e,t)=>{let n=t?.responseResolver;if(typeof n==`function`)return n(e);let{postal_code:r,city:i}=e?.postal_codes?.[0]||{};return{matcher:e=>e===r,payload:{city:i}}};function b(e,t){let n={current:null};return async function r(i,a){if(!(typeof i==`string`&&i.length>=4))return;let{countryCode:c}=p({value:i,countryCode:t?.countryCode,additionalArgs:a,handler:r});if(m(c,g))try{let{data:r}=await d(i,{generalConfig:e,parameters:{countryCode:String(c).toLowerCase()},abortControllerRef:n,preResponseResolver:t?.preResponseResolver??v}),l=e=>{let{cityPath:n}=t||{};if(n){if(!a.dataContext)throw Error(`No data context found in the postalCode connector`);let{dataContext:t}=a,r=t.internalDataRef.current;s(r,n)&&o(r,n)||t.handlePathChangeUnvalidated(n,e.city)}},{matcher:u,payload:f}=y(r,t);if(u(i))return l(f)}catch(e){return e}}}function x(e,t){let n={current:null};return async function r(a,o){if(!(typeof a==`string`&&a.length>=4))return;let{countryCode:s}=p({value:a,countryCode:t?.countryCode,additionalArgs:o,handler:r});if(!m(s,g))return Error(_.replace(`{countryCode}`,s));try{let{data:r,status:o}=await d(a,{generalConfig:e,parameters:{countryCode:String(s).toLowerCase()},abortControllerRef:n,preResponseResolver:t?.preResponseResolver??v}),c=()=>new i(`PostalCodeAndCity.invalidCode`),{matcher:l}=y(r,t),u=l(a);if(o!==400&&!u)return c()}catch(e){return e}}}function S(e){switch(String(e).toUpperCase()){case`SE`:return{postal_codes:[{city:`Stockholm`,postal_code:`11432`}]};default:return{postal_codes:[{city:`Vollen`,postal_code:`1391`}]}}}var C=e({getMockData:()=>j,preResponseResolver:()=>D,responseResolver:()=>O,suggestions:()=>k,suggestionsElement:()=>A,supportedCountryCodes:()=>T,unsupportedCountryMessage:()=>E});t();var w=n(),T=[`NO`],E=`Postal code verification is not supported for {countryCode}.`,D=({value:e})=>{if(!e)return{addresses:[]}},O=(e,t)=>{let n=t?.responseResolver;return typeof n==`function`?n(e):{payload:e?.addresses.map(e=>{let t=[e.street_name,e.house_number].filter(Boolean).join(` `),n=[e.postal_code,e.city].filter(Boolean).join(` `);return{item:e,selectedValue:t,selectedKey:t||e.address_id,content:[t,n]}})}};function k(e,t){let n={current:null};return async function(e){return await r(e.value,e)};async function r(i,a){if(typeof i!=`string`)return;let{countryCode:o}=p({value:i,countryCode:t?.countryCode,additionalArgs:a,handler:r});if(m(o,T))try{a.showIndicator();let{data:r}=await d(i,{generalConfig:e,parameters:{countryCode:String(o).toLowerCase()},abortControllerRef:n,preResponseResolver:t?.preResponseResolver??D}),{payload:s}=O(r,t);a.updateData(s),a.hideIndicator()}catch{a.hideIndicator()}}}function A(e,t){let n=k(e,t),r=(e,n)=>{let{cityPath:r,postalCodePath:i}=t||{},a=n?.data;if(a){let e=n.dataContext;e.handlePathChangeUnvalidated(i,a.item.postal_code),e.handlePathChangeUnvalidated(r,a.item.city)}};return e=>{let{suggestionPlaceholder:t}=a().StreetAddress;return(0,w.jsx)(c,{variant:`autocomplete`,...e,autocompleteProps:{mode:`async`,disableFilter:!0,keepValue:!0,openOnFocus:!0,placeholder:t,onType:n,...e?.autocompleteProps},onChange:r})}}function j(e){switch(String(e).toUpperCase()){case`SE`:return{addresses:[]};default:return{addresses:[{address_id:`1398742`,street_name:`Gransvea`,house_number:37,postal_code:`1391`,city:`Vollen`,county:`Akershus`,municipality:`Asker`,type:`STREET`},{address_id:`3168496`,street_name:`Gransvegen`,house_number:1,postal_code:`2090`,city:`Hurdal`,county:`Akershus`,municipality:`Hurdal`,type:`STREET`},{address_id:`325829`,street_name:`Gransveien`,house_number:2,postal_code:`1900`,city:`Fetsund`,county:`Akershus`,municipality:`Lillestrøm`,type:`STREET`},{address_id:`325829`,street_name:`Somewhere else`,house_number:100,postal_code:`1234`,city:`City`,county:`County`,municipality:`Municipality`,type:`STREET`}]}}}var M=e({address:()=>C,postalCode:()=>h}),N=e({Bring:()=>M,createContext:()=>l,fetchData:()=>d,getCountryCodeValue:()=>f,handleCountryPath:()=>p,isSupportedCountryCode:()=>m}),P=e({Address:()=>R,PostalCode:()=>L}),F=null;async function I(e,t){let n=globalThis.fetch;globalThis.fetch=()=>Promise.resolve({ok:!0,json:()=>Promise.resolve(t)}),await new Promise(e=>setTimeout(e,1e3)),clearTimeout(F),F=setTimeout(()=>{globalThis.fetch=n},1100)}var L=()=>(0,w.jsx)(r,{scope:{Connectors:N,getMockDataPostalCode:S,mockFetch:I},noInline:!0,children:`const { withConfig } = Connectors.createContext({
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
`}),R=()=>(0,w.jsx)(r,{scope:{Connectors:N,getMockDataAddress:j,mockFetch:I},noInline:!0,children:`const { withConfig } = Connectors.createContext({
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
`});export{g as a,T as i,P as n,L as r,R as t};