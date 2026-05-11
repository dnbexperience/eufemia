import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-DIFdqYTZ.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PhoneNumber />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.PhoneNumber`}),` is a wrapper component for `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for phone number values.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/PhoneNumber`,children:`Value.PhoneNumber`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/PhoneNumber`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/PhoneNumber`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Value`}),`
`,(0,r.jsx)(n.p,{children:`This component behaves as "one single component". It combines the country code and the number into a single string during an event callback.`}),`
`,(0,r.jsxs)(n.p,{children:[`The component returns the `,(0,r.jsx)(n.code,{children:`emptyValue`}),` when no number is set, which defaults to `,(0,r.jsx)(n.code,{children:`undefined`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`It uses the HTML `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute (`,(0,r.jsx)(n.code,{children:`tel-country-code`}),` and `,(0,r.jsx)(n.code,{children:`tel-national`}),`) in their respective fields (country code and phone number) to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.`]}),`
`,(0,r.jsx)(n.h3,{children:`Default country code`}),`
`,(0,r.jsxs)(n.p,{children:[`The default country code is set to `,(0,r.jsx)(n.code,{children:`+47`}),`.`]}),`
`,(0,r.jsx)(n.h3,{children:`E.164 value format`}),`
`,(0,r.jsxs)(n.p,{children:[`The component accepts and emits values in E.164 format (e.g. `,(0,r.jsx)(n.code,{children:`+4712345678`}),`). The country code is auto-detected using a longest-prefix-match against all known E.164 codes. The `,(0,r.jsx)(n.code,{children:`additionalArgs`}),` second argument of `,(0,r.jsx)(n.code,{children:`onChange`}),` provides the structured `,(0,r.jsx)(n.code,{children:`countryCode`}),` and `,(0,r.jsx)(n.code,{children:`phoneNumber`}),` separately if needed.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Values with a `,(0,r.jsx)(n.code,{children:`00`}),` prefix (e.g. `,(0,r.jsx)(n.code,{children:`004712345678`}),`) are also accepted — the `,(0,r.jsx)(n.code,{children:`00`}),` is interpreted as `,(0,r.jsx)(n.code,{children:`+`}),`. If your backend expects `,(0,r.jsx)(n.code,{children:`00`}),` prefix on output, use `,(0,r.jsx)(n.code,{children:`transformOut`}),` to convert back:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Field.PhoneNumber
  value="004712345678"
  transformOut={(value) =>
    typeof value === 'string' ? value.replace(/^\\+/, '00') : value
  }
  onChange={(value) => console.log('onChange', value)}
/>
// onChange "004712345678"
`})}),`
`,(0,r.jsx)(n.h2,{children:`Structure and format of phone numbers`}),`
`,(0,r.jsx)(n.p,{children:`Creating a list of all possible phone numbers would be impractical due to the vast number of combinations, especially considering the various country codes, area codes, and local numbers. Additionally, new numbers are constantly being allocated, and existing numbers may be reassigned over time.`}),`
`,(0,r.jsxs)(n.p,{children:[`Therefore, the structure and format are only used when `,(0,r.jsx)(n.code,{children:`+47`}),` is selected.`]}),`
`,(0,r.jsxs)(n.h2,{children:[`Support for locales like `,(0,r.jsx)(n.code,{children:`sv-SE`}),` and `,(0,r.jsx)(n.code,{children:`da-DK`})]}),`
`,(0,r.jsxs)(n.p,{children:[`In addition to the default support for `,(0,r.jsx)(n.code,{children:`nb-NO`}),` and `,(0,r.jsx)(n.code,{children:`en-GB`}),`, you can also use `,(0,r.jsx)(n.code,{children:`sv-SE`}),` and `,(0,r.jsx)(n.code,{children:`da-DK`}),` locales to display country names in Swedish or Danish.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Learn more about `,(0,r.jsx)(n.a,{href:`/uilib/usage/customisation/localization/#eufemia-forms`,children:`importing additional locales`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Filter or prioritize country listing`}),`
`,(0,r.jsxs)(n.p,{children:[`You can filter countries with the `,(0,r.jsx)(n.code,{children:`countries`}),` property's values `,(0,r.jsx)(n.code,{children:`Scandinavia`}),`, `,(0,r.jsx)(n.code,{children:`Nordic`}),` or `,(0,r.jsx)(n.code,{children:`Europe`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`Countries are sorted in alphabetical order, with the following prioritized countries on top of the list:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Norway`}),`
`,(0,r.jsx)(n.li,{children:`Sweden`}),`
`,(0,r.jsx)(n.li,{children:`Denmark`}),`
`,(0,r.jsx)(n.li,{children:`Finland`}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Validation`}),`
`,(0,r.jsxs)(n.p,{children:[`By default, it has no validation. However, you can enable it by providing a `,(0,r.jsx)(n.code,{children:`required`}),`, `,(0,r.jsx)(n.code,{children:`pattern`}),`, `,(0,r.jsx)(n.code,{children:`schema`}),`, `,(0,r.jsx)(n.code,{children:`onChangeValidator`}),`, or `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` property with the needed validation. More about validation in the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/getting-started/#validation-and-error-handling`,children:`Getting Started`}),` section.`]}),`
`,(0,r.jsx)(n.h3,{children:`Norwegian mobile numbers`}),`
`,(0,r.jsx)(n.p,{children:`E.g. the following pattern will strictly match Norwegian mobile numbers, which are defined as having a "+47" country code, followed by a number starting with 4 or 9, and exactly 7 more digits. If the country code is set to any other code (1–3 digits), the pattern will match any remaining digits.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`<Field.PhoneNumber pattern="((?=\\+47)^\\+47[49]\\d{7}$)|((?!\\+47)^\\+\\d{1,3}\\d{5,}$)" />
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};