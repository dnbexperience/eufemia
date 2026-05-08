import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-Cw9QM-dI.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.SelectCountry />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.SelectCountry`}),` is a wrapper component for `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/Selection`,children:`Field.Selection`}),`, with options built in for selecting a country.
`,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry/properties/#list-of-available-countries`,children:`The list of available countries to select`}),` is carefully curated to meet the demands we know today.
When selecting a country, the value returned is the selected country's `,(0,r.jsx)(n.a,{href:`https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2`,children:`ISO 3166-1 alpha-2 code`}),` (country code) like `,(0,r.jsx)(n.code,{children:`NO`}),` for Norway.`]}),`
`,(0,r.jsxs)(n.p,{children:[`It supports the HTML `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute, and by default set it to `,(0,r.jsx)(n.code,{children:`country-name`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/SelectCountry`,children:`Value.SelectCountry`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/SelectCountry`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/SelectCountry`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.h2,{children:[`Support for locales like `,(0,r.jsx)(n.code,{children:`sv-SE`}),` and `,(0,r.jsx)(n.code,{children:`da-DK`})]}),`
`,(0,r.jsxs)(n.p,{children:[`In addition to the default support for `,(0,r.jsx)(n.code,{children:`nb-NO`}),` and `,(0,r.jsx)(n.code,{children:`en-GB`}),`, you can also use the `,(0,r.jsx)(n.code,{children:`sv-SE`}),` and `,(0,r.jsx)(n.code,{children:`da-DK`}),` locales to display country names in Swedish or Danish.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Learn more about `,(0,r.jsx)(n.a,{href:`/uilib/usage/customisation/localization/#eufemia-forms`,children:`importing additional locales`}),`.`]}),`
`,(0,r.jsx)(n.h3,{children:`Filter or prioritize country listing`}),`
`,(0,r.jsxs)(n.p,{children:[`You can filter countries with the `,(0,r.jsx)(n.code,{children:`countries`}),` property's values `,(0,r.jsx)(n.code,{children:`Scandinavia`}),`, `,(0,r.jsx)(n.code,{children:`Nordic`}),` or `,(0,r.jsx)(n.code,{children:`Europe`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`Countries are sorted in alphabetically order, with the following prioritized countries on top of the list:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Norway`}),`
`,(0,r.jsx)(n.li,{children:`Sweden`}),`
`,(0,r.jsx)(n.li,{children:`Denmark`}),`
`,(0,r.jsx)(n.li,{children:`Finland`}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PhoneNumber countries="Prioritized" />)
`})}),`
`,(0,r.jsx)(n.h3,{children:`TransformIn and TransformOut`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`transformIn`}),` and `,(0,r.jsx)(n.code,{children:`transformOut`}),` to transform the value before it gets displayed in the field and before it gets sent to the form context. The second parameter is the country object. You may have a look at the demo below to see how it works.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import type { CountryType } from '@dnb/eufemia/extensions/forms/Field/SelectCountry'

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
`,(0,r.jsx)(n.h3,{children:`onFocus, onBlur, onChange`}),`
`,(0,r.jsx)(n.p,{children:`These events have an additional parameter with the country object.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const onFocus = (value, country) => {}
`})}),`
`,(0,r.jsx)(n.h3,{children:`The country object`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`{
  cdc: '47',
  iso: 'NO',
  name: 'Norge',
  i18n: { en: 'Norway', nb: 'Norge' },
  regions: ['Scandinavia', 'Nordic'],
  continent: 'Europe',
}
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};