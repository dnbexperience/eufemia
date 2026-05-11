import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{B as t,F as n,I as r,L as i,P as a,R as o,V as s,z as c}from"./ComponentBox-xW2kV1s2.js";import{Lr as l}from"./index-DVm0MbGb.js";import u from"./demos-v19-kmfE.js";var d=e();function f(e){let u={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...l(),...e.components};return a||m(`NumberFormat`,!1),i||m(`NumberFormat.BankAccountNumber`,!0),t||m(`NumberFormat.Currency`,!0),r||m(`NumberFormat.NationalIdentityNumber`,!0),s||m(`NumberFormat.Number`,!0),n||m(`NumberFormat.OrganizationNumber`,!0),c||m(`NumberFormat.Percent`,!0),o||m(`NumberFormat.PhoneNumber`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(u.h2,{children:`Import`}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-tsx`,children:`import { NumberFormat } from '@dnb/eufemia'
`})}),`
`,(0,d.jsx)(u.h2,{children:`Description`}),`
`,(0,d.jsx)(u.p,{children:`A ready-to-use DNB number formatter. Use it wherever you have to display a number, a currency value, a phone number, etc.`}),`
`,(0,d.jsxs)(u.p,{children:[`For a complete locale comparison, see `,(0,d.jsx)(u.a,{href:`/uilib/usage/best-practices/for-formatting/`,children:`Best Practices for number formatting`}),`.`]}),`
`,(0,d.jsx)(u.h2,{children:`Relevant links`}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=52173-680`,children:`Figma`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/number-format`,children:`Source code`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/number-format`,children:`Docs code`})}),`
`]}),`
`,(0,d.jsx)(u.p,{children:`Good reasons for why we have this:`}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsx)(u.li,{children:`To standardize the formatting of numbers for all DNB applications.`}),`
`,(0,d.jsx)(u.li,{children:`To make numbers accessible to screen readers.`}),`
`]}),`
`,(0,d.jsx)(u.h3,{children:`Supported formats`}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsxs)(u.li,{children:[`Numbers in general e.g. `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(s,{value:`12345678.90`})})]}),`
`,(0,d.jsxs)(u.li,{children:[`Currency e.g. `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(t,{value:`12345678.90`})})]}),`
`,(0,d.jsxs)(u.li,{children:[`Percentage e.g. `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(c,{value:`12.34`})})]}),`
`,(0,d.jsxs)(u.li,{children:[`Phone numbers e.g. `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(o,{value:`004799999999`})})]}),`
`,(0,d.jsxs)(u.li,{children:[`Bank account number e.g. `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(i,{value:`20001234567`})})]}),`
`,(0,d.jsxs)(u.li,{children:[`National identification number e.g. `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(r,{value:`18089212345`})})]}),`
`,(0,d.jsxs)(u.li,{children:[`Organization number e.g. `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(n,{value:`123456789`})})]}),`
`,(0,d.jsxs)(u.li,{children:[`Compact (short) numbers e.g. `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(s,{compact:!0,value:`12345678`,decimals:1})})]}),`
`,(0,d.jsxs)(u.li,{children:[`Compact (long) currency e.g. `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(t,{compact:`long`,currencyDisplay:`name`,value:`12345678`,decimals:1})})]}),`
`]}),`
`,(0,d.jsx)(u.h3,{children:`Defaults`}),`
`,(0,d.jsxs)(u.p,{children:[`It uses the browser APIs `,(0,d.jsx)(u.code,{children:`number.toLocaleString`}),` or `,(0,d.jsx)(u.code,{children:`Intl.NumberFormat.format`}),` under the hood. As well as some custom formatter. The locale defaults to:`]}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsxs)(u.li,{children:[`Locale: `,(0,d.jsx)(u.code,{children:`nb-NO`})]}),`
`,(0,d.jsxs)(u.li,{children:[`Currency: `,(0,d.jsx)(u.code,{children:`NOK`})]}),`
`]}),`
`,(0,d.jsx)(u.h4,{children:`Norwegian kroner`}),`
`,(0,d.jsxs)(u.p,{children:[`When the currency format is set to `,(0,d.jsx)(u.code,{children:`currencyDisplay="name"`}),`, the currency will be displayed as "kroner" instead of "Norwegian kroner".`]}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsxs)(u.li,{children:[`Norwegian currency: `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(t,{currencyDisplay:`name`,value:`1234.90`})})]}),`
`,(0,d.jsxs)(u.li,{children:[`Swedish currency: `,(0,d.jsx)(`code`,{className:`dnb-code`,children:(0,d.jsx)(t,{currency:`SEK`,currencyDisplay:`name`,value:`1234.90`})})]}),`
`]}),`
`,(0,d.jsx)(u.h4,{children:`Not available`}),`
`,(0,d.jsxs)(u.p,{children:[`When a number should be displayed but is not available to the frontend application, the NumberFormat component will display a single `,(0,d.jsx)(u.strong,{children:`em dash`}),` (–), and a screen reader will receive the text "Ikke tilgjengelig" / "Not available".`]}),`
`,(0,d.jsxs)(u.p,{children:[`Example: `,(0,d.jsx)(t,{value:`invalid`})]}),`
`,(0,d.jsx)(u.h2,{children:`Decimals`}),`
`,(0,d.jsxs)(u.p,{children:[`If the value has more decimal places than specified by the `,(0,d.jsx)(u.code,{children:`decimals={2}`}),` property, it will be rounded accordingly.`]}),`
`,(0,d.jsxs)(u.p,{children:[`Here are the available options for the `,(0,d.jsx)(u.code,{children:`rounding`}),` property:`]}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsxs)(u.li,{children:[(0,d.jsx)(u.code,{children:`omit`}),`: Truncate decimals without rounding.`]}),`
`,(0,d.jsxs)(u.li,{children:[(0,d.jsx)(u.code,{children:`half-even`}),`: Round to the nearest even number.`]}),`
`,(0,d.jsxs)(u.li,{children:[(0,d.jsx)(u.code,{children:`half-up`}),` (default): Round up if the fractional part is 0.5 or greater; otherwise, round down.`]}),`
`]}),`
`,(0,d.jsx)(u.h2,{children:`Value Components`}),`
`,(0,d.jsxs)(u.p,{children:[`The formatting helpers power several `,(0,d.jsx)(u.code,{children:`Value.*`}),` components:`]}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`/uilib/extensions/forms/Value/Number/`,children:`Value.Number`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`/uilib/extensions/forms/Value/Currency/`,children:`Value.Currency`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`/uilib/extensions/forms/Value/Date/`,children:`Value.Date`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`/uilib/extensions/forms/Value/DateOfBirth/`,children:`Value.DateOfBirth`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`/uilib/extensions/forms/Value/PhoneNumber/`,children:`Value.PhoneNumber`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`/uilib/extensions/forms/Value/BankAccountNumber/`,children:`Value.BankAccountNumber`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`/uilib/extensions/forms/Value/NationalIdentityNumber/`,children:`Value.NationalIdentityNumber`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`/uilib/extensions/forms/Value/OrganizationNumber/`,children:`Value.OrganizationNumber`})}),`
`]}),`
`,(0,d.jsx)(u.h2,{children:`Provider`}),`
`,(0,d.jsxs)(u.p,{children:[`You can send down the `,(0,d.jsx)(u.code,{children:`locale`}),` as an application-wide property (Context). More info about the `,(0,d.jsx)(u.a,{href:`/uilib/components/number-format/provider`,children:`provider and locale usage`}),`.`]}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-jsx`,children:`import Provider from '@dnb/eufemia/shared/Provider'

render(
  <Provider locale="en-GB" NumberFormat={{ currencyDisplay: 'code' }}>
    <MyApp>
      text <NumberFormat.Number>123</NumberFormat.Number> table etc.
    </MyApp>
  </Provider>
)
`})}),`
`,(0,d.jsx)(u.h2,{children:`Formatter utilities`}),`
`,(0,d.jsx)(u.p,{children:`Each variant has a matching formatter function you can use outside of React (e.g. in utilities, tests or server code). They are all available from the main import:`}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-tsx`,children:`import {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatPhoneNumber,
  formatBankAccountNumber,
  formatNationalIdentityNumber,
  formatOrganizationNumber,
} from '@dnb/eufemia/components/NumberFormat'
`})}),`
`,(0,d.jsxs)(u.table,{children:[(0,d.jsx)(u.thead,{children:(0,d.jsxs)(u.tr,{children:[(0,d.jsx)(u.th,{children:`Formatter`}),(0,d.jsx)(u.th,{children:`Component variant`})]})}),(0,d.jsxs)(u.tbody,{children:[(0,d.jsxs)(u.tr,{children:[(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`formatNumber`})}),(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`NumberFormat.Number`})})]}),(0,d.jsxs)(u.tr,{children:[(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`formatCurrency`})}),(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`NumberFormat.Currency`})})]}),(0,d.jsxs)(u.tr,{children:[(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`formatPercent`})}),(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`NumberFormat.Percent`})})]}),(0,d.jsxs)(u.tr,{children:[(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`formatPhoneNumber`})}),(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`NumberFormat.PhoneNumber`})})]}),(0,d.jsxs)(u.tr,{children:[(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`formatBankAccountNumber`})}),(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`NumberFormat.BankAccountNumber`})})]}),(0,d.jsxs)(u.tr,{children:[(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`formatNationalIdentityNumber`})}),(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`NumberFormat.NationalIdentityNumber`})})]}),(0,d.jsxs)(u.tr,{children:[(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`formatOrganizationNumber`})}),(0,d.jsx)(u.td,{children:(0,d.jsx)(u.code,{children:`NumberFormat.OrganizationNumber`})})]})]})]}),`
`,(0,d.jsxs)(u.p,{children:[`Each formatter accepts `,(0,d.jsx)(u.code,{children:`(value, options?)`}),` and returns a formatted string. Pass `,(0,d.jsx)(u.code,{children:`{ returnAria: true }`}),` to get the full object with `,(0,d.jsx)(u.code,{children:`number`}),`, `,(0,d.jsx)(u.code,{children:`aria`}),`, `,(0,d.jsx)(u.code,{children:`cleanedValue`}),` and `,(0,d.jsx)(u.code,{children:`locale`}),`.`]}),`
`,(0,d.jsx)(u.h2,{children:`NumberFormat Hook`}),`
`,(0,d.jsxs)(u.p,{children:[(0,d.jsx)(u.strong,{children:`Heads up:`}),` If you do so, keep in mind that you will have to ensure all the accessibility enhancements the component offers. For that, you can use the `,(0,d.jsx)(u.code,{children:`aria`}),` field:`]}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-jsx`,children:`import Provider from '@dnb/eufemia/shared/Provider'
import {
  useNumberFormat,
  formatCurrency,
} from '@dnb/eufemia/components/NumberFormat'

function Component() {
  // By using returnAria you get an object
  const { number, aria } = useNumberFormat(12345678.9, formatCurrency, {
    // Props are inherited from the Eufemia Provider and the NumberFormat object
    returnAria: true,
  })

  return (
    <span>
      <span aria-hidden>{number}</span>
      <span className="dnb-sr-only">{aria}</span>
    </span>
  )
}

render(
  <Provider locale="en-GB" NumberFormat={{ currency: 'EUR' }}>
    <Component />
  </Provider>
)
`})}),`
`,(0,d.jsx)(u.h3,{children:`NumberFormat Hook with parts`}),`
`,(0,d.jsxs)(u.p,{children:[`You can also use `,(0,d.jsx)(u.code,{children:`useNumberFormatWithParts`}),` when you need split output for custom layouts:`]}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-jsx`,children:`import Provider from '@dnb/eufemia/shared/Provider'
import {
  useNumberFormatWithParts,
  formatCurrency,
} from '@dnb/eufemia/components/NumberFormat'

function Component() {
  // useNumberFormatWithParts defaults to returnAria=true
  const { number, aria, parts } = useNumberFormatWithParts(
    12345678.9,
    formatCurrency
  )

  return (
    <span>
      <span aria-hidden>
        {parts.sign}
        {parts.number}
        {parts.currency ? \` \${parts.currency}\` : null}
      </span>
      <span className="dnb-sr-only">{aria}</span>
    </span>
  )
}

render(
  <Provider locale="en-GB" NumberFormat={{ currency: 'EUR' }}>
    <Component />
  </Provider>
)
`})}),`
`,(0,d.jsx)(u.h2,{children:`Related component`}),`
`,(0,d.jsxs)(u.p,{children:[`For prominent values with dedicated typography controls, use `,(0,d.jsx)(u.a,{href:`/uilib/components/stat/`,children:`Stat`}),`.`]}),`
`,(0,d.jsx)(u.h2,{children:`Formatting only (interceptor)`}),`
`,(0,d.jsx)(u.p,{children:`You can use the variant formatter functions without using a React Component or React Hook.`}),`
`,(0,d.jsxs)(u.p,{children:[(0,d.jsx)(u.strong,{children:`Heads up:`}),` If you do so, keep in mind that you will have to ensure all the accessibility enhancements the component offers. For that, you can use the `,(0,d.jsx)(u.code,{children:`aria`}),` field:`]}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-ts`,children:`import {
  formatCurrency,
  formatNumber,
} from '@dnb/eufemia/components/number-format/NumberUtils'

// By using returnAria you get an object
const { number, aria } = formatCurrency(12345678.9, {
  locale: 'nb-NO', // not inherited
  returnAria: true,
})

// Basic formatting
const number = formatNumber(1234)
`})}),`
`,(0,d.jsx)(u.p,{children:`Each variant formatter accepts the same options as the corresponding component variant.`}),`
`,(0,d.jsx)(u.h3,{children:`Interceptor helpers`}),`
`,(0,d.jsxs)(u.p,{children:[`Also, you may check out the related tests `,(0,d.jsx)(u.strong,{children:`NumberFormat > cleanNumber`}),` in the source code to find more examples.`]}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-ts`,children:`import { cleanNumber } from '@dnb/eufemia/components/number-format/NumberUtils'

const string = cleanNumber('prefix -12 345,678 suffix') // returns -12345.678
const string = cleanNumber('prefix -12.345,678 suffix') // returns -12345.678
`})}),`
`,(0,d.jsx)(u.h3,{children:`Format bank account numbers`}),`
`,(0,d.jsxs)(u.p,{children:[`Use `,(0,d.jsx)(u.code,{children:`formatBankAccountNumberByType`}),` to format bank account numbers with a specific type. It supports Norwegian BBAN, Swedish BBAN, Swedish Bankgiro, Swedish Plusgiro, and IBAN.`]}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-ts`,children:`import { formatBankAccountNumberByType } from '@dnb/eufemia/components/NumberFormat'

formatBankAccountNumberByType('20001234567') // { number: '2000 12 34567', aria: '20 00 12 34 56 7' }
formatBankAccountNumberByType('50001234567', 'swedishBban') // { number: '5000-1234567', aria: '50 00 12 34 56 7' }
formatBankAccountNumberByType('59140129', 'swedishBankgiro') // { number: '5914-0129', aria: '59 14 01 29' }
formatBankAccountNumberByType('1263664', 'swedishPlusgiro') // { number: '126366-4', aria: '12 63 66 4' }
formatBankAccountNumberByType('NO9386011117947', 'iban') // { number: 'NO93 8601 1117 947', aria: 'NO93 8601 1117 947' }
`})}),`
`,(0,d.jsx)(u.h3,{children:`Element and style`}),`
`,(0,d.jsxs)(u.p,{children:[`The number component is style-independent, so it has no visual styles. By default, a `,(0,d.jsx)(u.code,{children:`<span>`}),` is used (with `,(0,d.jsx)(u.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/speak-as`,children:`speak-as: numbers`}),`, even though the support is very low). However, you can easily change the element type by providing a different value to the `,(0,d.jsx)(u.code,{children:`element="div"`}),` property.`]}),`
`,(0,d.jsx)(u.h2,{children:`Accessibility`}),`
`,(0,d.jsxs)(u.p,{children:[(0,d.jsx)(u.strong,{children:`NVDA`}),` also has `,(0,d.jsx)(u.a,{href:`https://github.com/nvaccess/nvda/issues/8874`,children:`issues`}),` reconciling the `,(0,d.jsx)(u.code,{children:`lang`}),` attribute, which makes it hard to have a solid and good solution for reading numbers. VoiceOver on desktop does a perfect job with this.`]}),`
`,(0,d.jsxs)(u.p,{children:[(0,d.jsx)(u.strong,{children:`VoiceOver`}),` on mobile devices (iOS) only supports numbers read out properly to a maximum of `,(0,d.jsx)(u.code,{children:`99,999.00`}),`. On amounts above this value, VO reads numbers digit by digit.`]}),`
`,(0,d.jsxs)(u.p,{children:[`To enhance the `,(0,d.jsx)(u.strong,{children:`Copy & Paste`}),` experience of copying numbers into other applications (Excel), you may use the `,(0,d.jsx)(u.code,{children:`cleanCopyValue`}),` property. It will then provide a second number, without thousand separators and to have a comma/dot (depending on the locale) as the decimal separator. This number is not visible, but will be used when selecting & copying the whole number on the first click to the system clipboard.`]}),`
`,(0,d.jsxs)(u.p,{children:[`You can enable this feature on all your NumberFormat components by using the `,(0,d.jsx)(u.code,{children:`Provider`}),`:`]}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-jsx`,children:`import { Provider } from '@dnb/eufemia/shared'

render(
  <Provider value={{ NumberFormat: { cleanCopyValue: true } }}>
    <YourApp />
  </Provider>
)
`})}),`
`,(0,d.jsx)(u.h3,{children:`More details`}),`
`,(0,d.jsxs)(u.blockquote,{children:[`
`,(0,d.jsxs)(u.p,{children:[`Screen readers require numbers to be formatted properly in order to be read as numbers. The `,(0,d.jsx)(u.strong,{children:`NumberFormat`}),` component helps achieve this requirement.`]}),`
`]}),`
`,(0,d.jsxs)(u.p,{children:[`Numbers are formatted differently for screen readers than the visual number. Numbers also get assigned a `,(0,d.jsx)(u.code,{children:`lang`}),` attribute so the screen reader knows what language (locale) should be used for the particular number, even if the surrounding text does not correspond to the same language.`]}),`
`,(0,d.jsx)(u.h3,{children:`Sources`}),`
`,(0,d.jsxs)(u.p,{children:[`Eufemia bases its number formats on both the `,(0,d.jsx)(u.a,{href:`https://lovdata.no/forskrift/2004-02-16-426/%C2%A716`,children:`Norwegian authority`}),` and `,(0,d.jsx)(u.a,{href:`https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato`,children:`Språkradet`}),`, and currency is based on `,(0,d.jsx)(u.a,{href:`https://www.sprakradet.no/svardatabase/sporsmal-og-svar/kronebelop-rekkjefolgje-komma-og-strek/`,children:`guidelines`}),` from Språkrådet. Wikipedia has more info on worldwide `,(0,d.jsx)(u.a,{href:`https://en.wikipedia.org/wiki/Decimal_separator`,children:`decimal separator`}),` usage.`]}),`
`,(0,d.jsx)(u.p,{children:`For international number formatting we use these sources:`}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`https://service-manual.ons.gov.uk/content/numbers/writing-numbers`,children:`ONS – Writing numbers`})}),`
`,(0,d.jsx)(u.li,{children:(0,d.jsx)(u.a,{href:`https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#numbers`,children:`GOV.UK Style Guide`})}),`
`,(0,d.jsxs)(u.li,{children:[(0,d.jsx)(u.a,{href:`https://service-manual.nhs.uk/content/numbers-measurements-dates-time`,children:`NHS Service Manual`}),` all recommend using `,(0,d.jsx)(u.strong,{children:`commas`}),` as the thousands separator for `,(0,d.jsx)(u.code,{children:`en-GB`}),`.`]}),`
`,(0,d.jsxs)(u.li,{children:[(0,d.jsx)(u.a,{href:`https://data.europa.eu/apps/data-visualisation-guide/number-formatting`,children:`EU Data Visualisation Guide`}),` states the same for digital content.`]}),`
`,(0,d.jsxs)(u.li,{children:[(0,d.jsx)(u.a,{href:`https://commission.europa.eu/system/files/2023-11/styleguide_english_dgt_en.pdf`,children:`EU’s Handbook for authors and translators`}),` specifies non-breaking spaces as the main rule, `,(0,d.jsx)(u.strong,{children:`but explicitly allows commas when writing for the web`}),` – which is exactly our context.`]}),`
`,(0,d.jsxs)(u.li,{children:[(0,d.jsx)(u.a,{href:`https://www.iso.org/standard/76921.html`,children:`ISO 80000-1`}),` (formerly ISO 31-0) is a scientific/technical standard and `,(0,d.jsx)(u.strong,{children:`not a linguistic style guide`}),`, so we do not use it for how we present numbers to end users on the web.`]}),`
`]}),`
`,(0,d.jsx)(u.p,{children:(0,d.jsx)(u.strong,{children:`Difference between formats:`})}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsxs)(u.li,{children:[(0,d.jsx)(u.code,{children:`1 234.00`}),` – 🇬🇧 Current DNB practice for English`]}),`
`,(0,d.jsxs)(u.li,{children:[(0,d.jsx)(u.code,{children:`1,234.00`}),` – 🇬🇧 Recommended by official UK sources (ONS, GOV.UK, NHS)`]}),`
`]}),`
`,(0,d.jsxs)(u.p,{children:[(0,d.jsx)(u.strong,{children:`Accessibility:`}),` WCAG `,(0,d.jsx)(u.a,{href:`https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html`,children:`1.3.1 Info and Relationships`}),` and `,(0,d.jsx)(u.a,{href:`https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html`,children:`3.1.1 Language of Page`}),` require that content can be correctly interpreted by assistive technologies.`]}),`
`,(0,d.jsxs)(u.p,{children:[`When using spaces as thousand separators, screen readers misinterpret numbers in English. For example: `,(0,d.jsx)(u.code,{children:`45 804`}),` is read as "45" and "804" instead of "forty-five thousand eight hundred and four."`]}),`
`,(0,d.jsx)(u.h2,{children:`Node.js and SSR usage`}),`
`,(0,d.jsxs)(u.p,{children:[`If you run the component or `,(0,d.jsx)(u.code,{children:`format`}),` function in `,(0,d.jsx)(u.a,{href:`https://nodejs.org`,children:`Node.js`}),`, you have to include `,(0,d.jsx)(u.a,{href:`https://nodejs.org/api/intl.html`,children:`ICU`}),` data in order to display other locales than en-GB. You can do this by:`]}),`
`,(0,d.jsxs)(u.ul,{children:[`
`,(0,d.jsxs)(u.li,{children:[`installing `,(0,d.jsx)(u.code,{children:`npm i full-icu`})]}),`
`,(0,d.jsxs)(u.li,{children:[`and call node (or jest) with an environment variable pointing to the package: `,(0,d.jsx)(u.code,{children:`NODE_ICU_DATA=./node_modules/full-icu node ...`})]}),`
`,(0,d.jsxs)(u.li,{children:[`after a Node.js version upgrade you may have to run `,(0,d.jsx)(u.code,{children:`npm rebuild`})]}),`
`]}),`
`,(0,d.jsx)(u.h2,{children:`Known issues`}),`
`,(0,d.jsx)(u.p,{children:`Edge Browser on Windows 10 is converting numbers automatically to followable links. This makes the experience on NVDA bad, as it reads also the new, unformatted link number.`}),`
`,(0,d.jsxs)(u.p,{children:[`You can `,(0,d.jsx)(u.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/x-ms-format-detection`,children:`disable this behavior`}),`:`]}),`
`,(0,d.jsx)(u.pre,{children:(0,d.jsx)(u.code,{className:`language-html`,children:`<html x-ms-format-detection="none">
  ...
</html>
`})})]})}function p(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function h(e){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(p,{}),`
`,(0,d.jsx)(u,{})]})}function g(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}export{g as default};