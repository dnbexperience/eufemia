import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{a as r,i,j as a,s as o,w as s}from"./forms-QYD2kahG.js";import{t as c}from"./Card-DXi3If40.js";import{t as l}from"./ComponentBox-B6YSImfw.js";var u=e({Address:()=>v,PostalCode:()=>_,mockFetch:()=>g,resetMockFetch:()=>h}),d=t(n()),f=new Map,p,m;function h(){f.clear(),p&&(globalThis.fetch=p),p=void 0,m=void 0}async function g(e,t){if(f.set(e,t),globalThis.fetch!==m){p=globalThis.fetch;let e=p;m=(t,n)=>{let r=typeof t==`string`?t:t instanceof URL?t.href:t.url;return f.has(r)?Promise.resolve(new Response(JSON.stringify(f.get(r)),{status:200,headers:{"Content-Type":`application/json`}})):e(t,n)},globalThis.fetch=m}await new Promise(e=>setTimeout(e,1e3))}var _=()=>(0,d.jsx)(l,{scope:{Connectors:i,getMockDataPostalCode:o,mockFetch:g},stableName:`PostalCode`,sourceImports:[`import { getMockData as getMockDataPostalCode } from '@dnb/eufemia/extensions/forms/Connectors/Bring/postalCode'`,`import { getMockData as getMockDataAddress } from '@dnb/eufemia/extensions/forms/Connectors/Bring/address'`,`import { Form, Field, Connectors } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Connectors:i,Form:s,Card:c,Field:a},noInline:!0,children:`const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: async (value, { countryCode }) => {
      const url = \`[YOUR-API-URL]/postal-code/\${value}\`
      await mockFetch(url, getMockDataPostalCode(countryCode))
      return url
    },
  },
})
const onChangeValidator = withConfig(Connectors.Bring.postalCode.validator)
const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
  cityPath: '/city',
})
render(
  <Form.Handler onSubmit={console.log}>
    <Form.Card>
      <Field.PostalCodeAndCity
        countryCode="/countryCode"
        postalCode={{
          path: '/postalCode',
          onChangeValidator,
          onChange,
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
`}),v=()=>(0,d.jsx)(l,{scope:{Connectors:i,getMockDataAddress:r,mockFetch:g},stableName:`Address`,sourceImports:[`import { getMockData as getMockDataPostalCode } from '@dnb/eufemia/extensions/forms/Connectors/Bring/postalCode'`,`import { getMockData as getMockDataAddress } from '@dnb/eufemia/extensions/forms/Connectors/Bring/address'`,`import { Form, Field, Connectors } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Connectors:i,Form:s,Card:c,Field:a},noInline:!0,children:`const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: async (value, { countryCode }) => {
      const url = \`[YOUR-API-URL]/address/\${value}\`
      await mockFetch(url, getMockDataAddress(countryCode))
      return url
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
`});export{u as n,_ as r,v as t};