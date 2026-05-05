import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";var n=e();function r(e){let r={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Import`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Connectors } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,n.jsx)(r.h2,{children:`Description`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`Connectors`}),` are an opt-in way to extend the functionality of a form. They can be used to add features like API calls for autofill, validation, and more.`]}),`
`,(0,n.jsx)(r.p,{children:`Available connectors:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Connectors/Bring/`,children:`Bring`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Relevant links`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Connectors`,children:`Source code`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Connectors`,children:`Docs code`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`How to create your own connector`}),`
`,(0,n.jsxs)(r.p,{children:[`Connectors are created by returning a function that takes the `,(0,n.jsx)(r.code,{children:`generalConfig`}),` and optionally a `,(0,n.jsx)(r.code,{children:`handlerConfig`}),` as an argument.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Here is an example of how to create a connector that can be used as a field's `,(0,n.jsx)(r.code,{children:`onChangeValidator`}),` or `,(0,n.jsx)(r.code,{children:`onBlurValidator`}),`:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`export function validator(generalConfig: GeneralConfig) {
  // - The handler to be used as the validator
  return async function validatorHandler(value) {
    try {
      const { data, status } = await fetchData(value, {
        generalConfig,
        parameters: {},
      })

      const onMatch = () => {
        return new FormError('PostalCodeAndCity.invalidCode')
      }

      const { matcher } = responseResolver(data, handlerConfig)
      const match = matcher(value)

      if (status !== 400 && !match) {
        return onMatch()
      }
    } catch (error) {
      return error
    }
  }
}
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Here is the `,(0,n.jsx)(r.code,{children:`GeneralConfig`}),` type simplified:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`type GeneralConfig = {
  fetchConfig?: {
    url: string | ((value: string) => string | Promise<string>)
    headers?: HeadersInit
  }
}
`})}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`responseResolver`}),` is used to take care of the response from the API and return the `,(0,n.jsx)(r.code,{children:`matcher`}),` and `,(0,n.jsx)(r.code,{children:`payload`}),` to be used by the connector.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`const responseResolver: ResponseResolver<
  PostalCodeResolverData,
  PostalCodeResolverPayload
> = (data, handlerConfig) => {
  // - Here we align the data from the API with the expected data structure
  const { postal_code, city } = data?.postal_codes?.[0] || {}

  return {
    /**
     * The matcher to be used to determine if and how the connector,
     * such as an validator for \`onChangeValidator\` or \`onBlurValidator\`,
     * should validate the field value.
     */
    matcher: (value) => value === postal_code,

    /**
     * The payload to be returned and used by the connector.
     */
    payload: { city },
  }
}
`})}),`
`,(0,n.jsxs)(r.p,{children:[`You can extend a response resolver to support a custom resolver, given via the `,(0,n.jsx)(r.code,{children:`handlerConfig`}),` argument.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`const responseResolver = (data, handlerConfig) => {
  const resolver = handlerConfig?.responseResolver
  if (typeof resolver === 'function') {
    return resolver(data)
  }

  // ... the rest of the response resolver.
}
`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}function a(e){return(0,n.jsx)(i,{})}function o(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}export{o as default};