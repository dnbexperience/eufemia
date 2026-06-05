import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import r from"./demos-DfBLDbAI.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PhoneNumber />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.PhoneNumber`}),` is a wrapper component for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for phone number values.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/PhoneNumber`,children:`Value.PhoneNumber`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/PhoneNumber`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/PhoneNumber`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Value`}),`
`,(0,i.jsx)(t.p,{children:`This component behaves as "one single component". It combines the country code and the number into a single string during an event callback.`}),`
`,(0,i.jsxs)(t.p,{children:[`The component returns the `,(0,i.jsx)(t.code,{children:`emptyValue`}),` when no number is set, which defaults to `,(0,i.jsx)(t.code,{children:`undefined`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It uses the HTML `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute (`,(0,i.jsx)(t.code,{children:`tel-country-code`}),` and `,(0,i.jsx)(t.code,{children:`tel-national`}),`) in their respective fields (country code and phone number) to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.`]}),`
`,(0,i.jsx)(t.h3,{children:`Default country code`}),`
`,(0,i.jsxs)(t.p,{children:[`The default country code is set to `,(0,i.jsx)(t.code,{children:`+47`}),`.`]}),`
`,(0,i.jsx)(t.h3,{children:`E.164 value format`}),`
`,(0,i.jsxs)(t.p,{children:[`The component accepts and emits values in E.164 format (e.g. `,(0,i.jsx)(t.code,{children:`+4712345678`}),`). The country code is auto-detected using a longest-prefix-match against all known E.164 codes. The `,(0,i.jsx)(t.code,{children:`additionalArgs`}),` second argument of `,(0,i.jsx)(t.code,{children:`onChange`}),` provides the structured `,(0,i.jsx)(t.code,{children:`countryCode`}),` and `,(0,i.jsx)(t.code,{children:`phoneNumber`}),` separately if needed.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Values with a `,(0,i.jsx)(t.code,{children:`00`}),` prefix (e.g. `,(0,i.jsx)(t.code,{children:`004712345678`}),`) are also accepted — the `,(0,i.jsx)(t.code,{children:`00`}),` is interpreted as `,(0,i.jsx)(t.code,{children:`+`}),`. If your backend expects `,(0,i.jsx)(t.code,{children:`00`}),` prefix on output, use `,(0,i.jsx)(t.code,{children:`transformOut`}),` to convert back:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Field.PhoneNumber
  value="004712345678"
  transformOut={(value) =>
    typeof value === 'string' ? value.replace(/^\\+/, '00') : value
  }
  onChange={(value) => console.log('onChange', value)}
/>
// onChange "004712345678"
`})}),`
`,(0,i.jsx)(t.h2,{children:`Structure and format of phone numbers`}),`
`,(0,i.jsx)(t.p,{children:`Creating a list of all possible phone numbers would be impractical due to the vast number of combinations, especially considering the various country codes, area codes, and local numbers. Additionally, new numbers are constantly being allocated, and existing numbers may be reassigned over time.`}),`
`,(0,i.jsxs)(t.p,{children:[`Therefore, the structure and format are only used when `,(0,i.jsx)(t.code,{children:`+47`}),` is selected.`]}),`
`,(0,i.jsxs)(t.h2,{children:[`Support for locales like `,(0,i.jsx)(t.code,{children:`sv-SE`}),` and `,(0,i.jsx)(t.code,{children:`da-DK`})]}),`
`,(0,i.jsxs)(t.p,{children:[`In addition to the default support for `,(0,i.jsx)(t.code,{children:`nb-NO`}),` and `,(0,i.jsx)(t.code,{children:`en-GB`}),`, you can also use `,(0,i.jsx)(t.code,{children:`sv-SE`}),` and `,(0,i.jsx)(t.code,{children:`da-DK`}),` locales to display country names in Swedish or Danish.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Learn more about `,(0,i.jsx)(t.a,{href:`/uilib/usage/customisation/localization/#eufemia-forms`,children:`importing additional locales`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Filter or prioritize country listing`}),`
`,(0,i.jsxs)(t.p,{children:[`You can filter countries with the `,(0,i.jsx)(t.code,{children:`countries`}),` property's values `,(0,i.jsx)(t.code,{children:`Scandinavia`}),`, `,(0,i.jsx)(t.code,{children:`Nordic`}),` or `,(0,i.jsx)(t.code,{children:`Europe`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`Countries are sorted in alphabetical order, with the following prioritized countries on top of the list:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Norway`}),`
`,(0,i.jsx)(t.li,{children:`Sweden`}),`
`,(0,i.jsx)(t.li,{children:`Denmark`}),`
`,(0,i.jsx)(t.li,{children:`Finland`}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Validation`}),`
`,(0,i.jsxs)(t.p,{children:[`By default, it has no validation. However, you can enable it by providing a `,(0,i.jsx)(t.code,{children:`required`}),`, `,(0,i.jsx)(t.code,{children:`pattern`}),`, `,(0,i.jsx)(t.code,{children:`schema`}),`, `,(0,i.jsx)(t.code,{children:`onChangeValidator`}),`, or `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` property with the needed validation. More about validation in the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#validation-and-error-handling`,children:`Getting Started`}),` section.`]}),`
`,(0,i.jsx)(t.h3,{children:`Norwegian mobile numbers`}),`
`,(0,i.jsx)(t.p,{children:`E.g. the following pattern will strictly match Norwegian mobile numbers, which are defined as having a "+47" country code, followed by a number starting with 4 or 9, and exactly 7 more digits. If the country code is set to any other code (1–3 digits), the pattern will match any remaining digits.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Field.PhoneNumber pattern="((?=\\+47)^\\+47[49]\\d{7}$)|((?!\\+47)^\\+\\d{1,3}\\d{5,}$)" />
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};