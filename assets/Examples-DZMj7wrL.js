import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{a as r,i,j as a,s as o,w as s}from"./forms-CFi5-4x5.js";import{t as c}from"./Card-Db-Q1D3Y.js";import{t as l}from"./ComponentBox-qLaLt9T0.js";var u=e({Address:()=>h,PostalCode:()=>m}),d=t(n()),f=null;async function p(e,t){let n=globalThis.fetch;globalThis.fetch=()=>Promise.resolve({ok:!0,json:()=>Promise.resolve(t)}),await new Promise(e=>setTimeout(e,1e3)),clearTimeout(f),f=setTimeout(()=>{globalThis.fetch=n},1100)}var m=()=>(0,d.jsx)(l,{scope:{Connectors:i,getMockDataPostalCode:o,mockFetch:p},stableName:`PostalCode`,sourceImports:[`import { getMockData as getMockDataPostalCode } from '@dnb/eufemia/extensions/forms/Connectors/Bring/postalCode'`,`import { getMockData as getMockDataAddress } from '@dnb/eufemia/extensions/forms/Connectors/Bring/address'`,`import { Form, Field, Connectors } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Connectors:i,Form:s,Card:c,Field:a},noInline:!0,children:`const { withConfig } = Connectors.createContext({
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
`}),h=()=>(0,d.jsx)(l,{scope:{Connectors:i,getMockDataAddress:r,mockFetch:p},stableName:`Address`,sourceImports:[`import { getMockData as getMockDataPostalCode } from '@dnb/eufemia/extensions/forms/Connectors/Bring/postalCode'`,`import { getMockData as getMockDataAddress } from '@dnb/eufemia/extensions/forms/Connectors/Bring/address'`,`import { Form, Field, Connectors } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Connectors:i,Form:s,Card:c,Field:a},noInline:!0,children:`const { withConfig } = Connectors.createContext({
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
`});export{u as n,m as r,h as t};