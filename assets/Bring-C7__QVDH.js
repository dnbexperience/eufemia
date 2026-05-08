import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{a as t,i as n,n as r,r as i,t as a}from"./Examples-CU4YDZni.js";import{Lr as o}from"./index--zEB_f_m.js";import{t as s}from"./TranslationsTable-DR7hXILI.js";var c=e();function l(e){let l={a:`a`,code:`code`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...o(),...e.components};return r||d(`Examples`,!1),a||d(`Examples.Address`,!0),i||d(`Examples.PostalCode`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.h2,{children:`Description`}),`
`,(0,c.jsxs)(l.p,{children:[`The `,(0,c.jsx)(l.code,{children:`Bring`}),` connector allows you to use the `,(0,c.jsx)(l.a,{href:`https://developer.bring.com/api/`,children:`Bring API`}),` to:`]}),`
`,(0,c.jsxs)(l.ul,{children:[`
`,(0,c.jsxs)(l.li,{children:[`Verify a postal code: `,(0,c.jsx)(l.a,{href:`#postalcode-api`,children:`PostalCode API`})]}),`
`,(0,c.jsxs)(l.li,{children:[`Autofill a city name or street name: `,(0,c.jsx)(l.a,{href:`#postalcode-api`,children:`PostalCode API`})]}),`
`,(0,c.jsxs)(l.li,{children:[`Search for addresses with suggestions: `,(0,c.jsx)(l.a,{href:`#address-suggestions-api`,children:`Address Suggestions API`})]}),`
`]}),`
`,(0,c.jsx)(l.hr,{}),`
`,(0,c.jsx)(l.h2,{children:`PostalCode API`}),`
`,(0,c.jsxs)(l.p,{children:[`Here is an example of how to use the Bring `,(0,c.jsx)(l.a,{href:`https://developer.bring.com/api/postal-code/`,children:`Postal Code API`}),` to connect the `,(0,c.jsx)(l.a,{href:`/uilib/extensions/forms/feature-fields/PostalCodeAndCity/`,children:`PostalCodeAndCity`}),` field to a form.`]}),`
`,(0,c.jsx)(l.p,{children:`First, create a context with the config:`}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-tsx`,children:`import { Connectors, Field, Form } from '@dnb/eufemia/extensions/forms'

const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: (value, { countryCode }) => {
      return \`[YOUR-API-URL]/.../\${countryCode}/.../\${value}\`
      // Real-world example using Bring's Postal Code API's get postal code endpoint, directly without proxy:
      // return \`https://api.bring.com/address/api/{countryCode}/postal-codes/{value}\`
    },
  },
})
`})}),`
`,(0,c.jsxs)(l.p,{children:[(0,c.jsx)(l.code,{children:`[YOUR-API-URL]`}),` is the URL of your own API endpoint that proxies the Bring `,(0,c.jsx)(l.a,{href:`https://developer.bring.com/api/postal-code/`,children:`Postal Code API`}),` with a token.`]}),`
`,(0,c.jsx)(l.h3,{children:`Supported countries`}),`
`,(0,c.jsxs)(l.p,{children:[`The Bring API for PostalCode supports the `,(0,c.jsx)(l.a,{href:`https://developer.bring.com/api/postal-code/#supported-countries`,children:`following countries`}),`, by its country codes:`]}),`
`,t.join(`, `),`
`,(0,c.jsx)(l.h3,{children:`Endpoints and response format`}),`
`,(0,c.jsxs)(l.p,{children:[`Ensure you use one of the `,(0,c.jsx)(l.a,{href:`https://developer.bring.com/api/postal-code/#endpoints`,children:`following endpoints`}),` from Bring via your proxy API, returning a list of postal codes in the following format:`]}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-json`,children:`{
  "postal_codes": [
    {
      "postal_code": "1391",
      "city": "Vollen"
      ...
    }
  ]
}
`})}),`
`,(0,c.jsx)(l.h3,{children:`How to verify a postal code`}),`
`,(0,c.jsxs)(l.p,{children:[`Use the context to create a validator based on the `,(0,c.jsx)(l.code,{children:`validator`}),` connector.`]}),`
`,(0,c.jsxs)(l.p,{children:[`You can use it for an `,(0,c.jsx)(l.code,{children:`onChangeValidator`}),` or `,(0,c.jsx)(l.code,{children:`onBlurValidator`}),` (recommended), depending on your use case.`]}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-tsx`,children:`const onBlurValidator = withConfig(Connectors.Bring.postalCode.validator)

function MyForm() {
  return (
    <Form.Handler>
      <Field.PostalCodeAndCity
        postalCode={{
          path: '/postalCode',
          onBlurValidator,
        }}
      />
    </Form.Handler>
  )
}
`})}),`
`,(0,c.jsx)(l.h3,{children:`How to autofill a city name based on a postal code`}),`
`,(0,c.jsxs)(l.p,{children:[`Use the context to create the `,(0,c.jsx)(l.code,{children:`onChange`}),` event handler based on the `,(0,c.jsx)(l.code,{children:`autofill`}),` connector.`]}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-tsx`,children:`const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
  cityPath: '/city',
})

function MyForm() {
  return (
    <Form.Handler>
      <Field.PostalCodeAndCity
        postalCode={{
          path: '/postalCode',
          onChange,
        }}
        city={{
          path: '/city',
        }}
      />
      <Form.SubmitButton />
    </Form.Handler>
  )
}
`})}),`
`,(0,c.jsx)(l.h3,{children:`Verify a postal code`}),`
`,(0,c.jsxs)(l.p,{children:[`This demo contains only a mocked API call, so only a postal code of `,(0,c.jsx)(l.code,{children:`1391`}),` for Norway and `,(0,c.jsx)(l.code,{children:`11432`}),` for Sweden is valid.`]}),`
`,(0,c.jsx)(i,{}),`
`,(0,c.jsx)(l.hr,{}),`
`,(0,c.jsx)(l.h2,{children:`Address Suggestions API`}),`
`,(0,c.jsxs)(l.p,{children:[`Here is an example of how to use the Bring `,(0,c.jsx)(l.a,{href:`https://developer.bring.com/api/address/#get-street-or-place-suggestions-get`,children:`Address API`}),` to connect the `,(0,c.jsx)(l.a,{href:`/uilib/extensions/forms/feature-fields/Address/`,children:`Address`}),` field to a form.`]}),`
`,(0,c.jsx)(l.p,{children:`First, create a context with the config:`}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-tsx`,children:`import { Connectors, Field, Form } from '@dnb/eufemia/extensions/forms'

const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: (value, { countryCode }) => {
      return \`[YOUR-API-URL]/.../\${countryCode}/.../\${value}\`
      // Real-world example using Bring's Address API's get address endpoint, directly without proxy:
      // return \`https://api.bring.com/address/api/{countryCode}/addresses/suggestions?q=\${value}\`
    },
  },
})
`})}),`
`,(0,c.jsx)(l.p,{children:`Then create an element that will be used to render the autocomplete component to show the suggestions.`}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-tsx`,children:`const addressSuggestionsElement = withConfig(
  Connectors.Bring.address.suggestionsElement,
  {
    countryCode: '/countryCode', // Can be "NO" or a path
    cityPath: '/city',
    postalCodePath: '/postalCode',
  }
)
`})}),`
`,(0,c.jsx)(l.p,{children:`And use the element in the Address field:`}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-tsx`,children:`function MyForm() {
  return (
    <Form.Handler>
      <Field.Address.Street
        path="/streetAddress"
        element={addressSuggestionsElement}
      />
    </Form.Handler>
  )
}
`})}),`
`,(0,c.jsx)(l.h3,{children:`Populate data to PostalCodeAndCity`}),`
`,(0,c.jsx)(l.p,{children:`You can auto fill the address fields based on the selected address.`}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-tsx`,children:`function MyForm() {
  return (
    <Form.Handler>
      <Field.Address.Street
        path="/streetAddress"
        element={addressSuggestionsElement}
      />

      <Field.PostalCodeAndCity
        postalCode={{ path: '/postalCode' }}
        city={{ path: '/city' }}
      />
    </Form.Handler>
  )
}
`})}),`
`,(0,c.jsx)(l.h3,{children:`Supported countries`}),`
`,(0,c.jsxs)(l.p,{children:[`The Bring API for Address supports the `,(0,c.jsx)(l.a,{href:`https://developer.bring.com/api/address/`,children:`following countries`}),`, by its country codes:`]}),`
`,n.join(`, `),`
`,(0,c.jsx)(l.h3,{children:`Endpoints and response format`}),`
`,(0,c.jsxs)(l.p,{children:[`Ensure you use one of the `,(0,c.jsx)(l.a,{href:`https://developer.bring.com/api/address/#endpoints`,children:`following endpoints`}),` from Bring via your proxy API, returning a list of addresses in the following format:`]}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-json`,children:`{
  "addresses": [
    {
      "address_id": "1398742",
      "street_name": "Gransvea",
      "house_number": 37,
      "postal_code": "1391",
      "city": "Vollen",
      "county": "Akershus",
      "municipality": "Asker",
      "type": "STREET"
    }
  ]
}
`})}),`
`,(0,c.jsx)(l.h3,{children:`Translations`}),`
`,(0,c.jsx)(s,{localeKey:[`StreetAddress.suggestionPlaceholder`]}),`
`,(0,c.jsx)(l.h3,{children:`Address suggestion demos`}),`
`,(0,c.jsx)(l.p,{children:`This demo contains only a mocked API call, so you can enter anything in the Street field.`}),`
`,(0,c.jsx)(a,{})]})}function u(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function f(e){return(0,c.jsx)(u,{})}function p(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(f,{...e})}):f(e)}export{p as default};