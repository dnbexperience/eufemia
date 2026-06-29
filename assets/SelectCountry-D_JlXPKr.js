import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import r from"./demos-fDtivzE4.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.SelectCountry />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.SelectCountry`}),` is a wrapper component for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection`,children:`Field.Selection`}),`, with options built in for selecting a country.
`,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry/properties/#list-of-available-countries`,children:`The list of available countries to select`}),` is carefully curated to meet the demands we know today.
When selecting a country, the value returned is the selected country's `,(0,i.jsx)(t.a,{href:`https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2`,children:`ISO 3166-1 alpha-2 code`}),` (country code) like `,(0,i.jsx)(t.code,{children:`NO`}),` for Norway.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It supports the HTML `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute, and by default set it to `,(0,i.jsx)(t.code,{children:`country-name`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SelectCountry`,children:`Value.SelectCountry`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/SelectCountry`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/SelectCountry`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.h2,{children:[`Support for locales like `,(0,i.jsx)(t.code,{children:`sv-SE`}),` and `,(0,i.jsx)(t.code,{children:`da-DK`})]}),`
`,(0,i.jsxs)(t.p,{children:[`In addition to the default support for `,(0,i.jsx)(t.code,{children:`nb-NO`}),` and `,(0,i.jsx)(t.code,{children:`en-GB`}),`, you can also use the `,(0,i.jsx)(t.code,{children:`sv-SE`}),` and `,(0,i.jsx)(t.code,{children:`da-DK`}),` locales to display country names in Swedish or Danish.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Learn more about `,(0,i.jsx)(t.a,{href:`/uilib/usage/customisation/localization/#eufemia-forms`,children:`importing additional locales`}),`.`]}),`
`,(0,i.jsx)(t.h3,{children:`Filter or prioritize country listing`}),`
`,(0,i.jsxs)(t.p,{children:[`You can filter countries with the `,(0,i.jsx)(t.code,{children:`countries`}),` property's values `,(0,i.jsx)(t.code,{children:`Scandinavia`}),`, `,(0,i.jsx)(t.code,{children:`Nordic`}),` or `,(0,i.jsx)(t.code,{children:`Europe`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`Countries are sorted in alphabetically order, with the following prioritized countries on top of the list:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Norway`}),`
`,(0,i.jsx)(t.li,{children:`Sweden`}),`
`,(0,i.jsx)(t.li,{children:`Denmark`}),`
`,(0,i.jsx)(t.li,{children:`Finland`}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PhoneNumber countries="Prioritized" />)
`})}),`
`,(0,i.jsx)(t.h3,{children:`TransformIn and TransformOut`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`transformIn`}),` and `,(0,i.jsx)(t.code,{children:`transformOut`}),` to transform the value before it gets displayed in the field and before it gets sent to the form context. The second parameter is the country object. You may have a look at the demo below to see how it works.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import type { CountryType } from '@dnb/eufemia/extensions/forms/Field/SelectCountry'

// From the Field (internal value) to the data context or event parameter
const transformOut = (internal: string, country: CountryType) => {
  if (internal) {
    return \`\${country.name} (\${internal})\`
  }
}

// To the Field (from e.g. defaultValue)
const transformIn = (external: unknown) => {
  return String(external).match(/\\((.*)\\)/)?.[1] || 'NO'
}
`})}),`
`,(0,i.jsx)(t.h3,{children:`onFocus, onBlur, onChange`}),`
`,(0,i.jsx)(t.p,{children:`These events have an additional parameter with the country object.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const onFocus = (value, country) => {}
`})}),`
`,(0,i.jsx)(t.h3,{children:`The country object`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-ts`,children:`{
  cdc: '47',
  iso: 'NO',
  name: 'Norge',
  i18n: { en: 'Norway', nb: 'Norge' },
  regions: ['Scandinavia', 'Nordic'],
  continent: 'Europe',
}
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};