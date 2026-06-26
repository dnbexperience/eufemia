import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Import`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Connectors } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Description`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`Connectors`}),` are an opt-in way to extend the functionality of a form. They can be used to add features like API calls for autofill, validation, and more.`]}),`
`,(0,r.jsx)(t.p,{children:`Available connectors:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Connectors/Bring/`,children:`Bring`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Connectors`,children:`Source code`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Connectors`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`How to create your own connector`}),`
`,(0,r.jsxs)(t.p,{children:[`Connectors are created by returning a function that takes the `,(0,r.jsx)(t.code,{children:`generalConfig`}),` and optionally a `,(0,r.jsx)(t.code,{children:`handlerConfig`}),` as an argument.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Here is an example of how to create a connector that can be used as a field's `,(0,r.jsx)(t.code,{children:`onChangeValidator`}),` or `,(0,r.jsx)(t.code,{children:`onBlurValidator`}),`:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-ts`,children:`export function validator(generalConfig: GeneralConfig) {
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
`,(0,r.jsxs)(t.p,{children:[`Here is the `,(0,r.jsx)(t.code,{children:`GeneralConfig`}),` type simplified:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-ts`,children:`type GeneralConfig = {
  fetchConfig?: {
    url: string | ((value: string) => string | Promise<string>)
    headers?: HeadersInit
  }
}
`})}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`responseResolver`}),` is used to take care of the response from the API and return the `,(0,r.jsx)(t.code,{children:`matcher`}),` and `,(0,r.jsx)(t.code,{children:`payload`}),` to be used by the connector.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-ts`,children:`const responseResolver: ResponseResolver<
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
`,(0,r.jsxs)(t.p,{children:[`You can extend a response resolver to support a custom resolver, given via the `,(0,r.jsx)(t.code,{children:`handlerConfig`}),` argument.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-ts`,children:`const responseResolver = (data, handlerConfig) => {
  const resolver = handlerConfig?.responseResolver
  if (typeof resolver === 'function') {
    return resolver(data)
  }

  // ... the rest of the response resolver.
}
`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsx)(a,{})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};