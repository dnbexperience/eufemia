import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Currency-3FJcZILU.js";import{a as r,i,n as a,o,r as s,s as c,t as l}from"./NumberFormatExport-VkMzyyld.js";import{K as u}from"./index-ppRu2ktv.js";import d from"./demos-Dm05vqs7.js";var f=e(t());function p(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...u(),...e.components};return l||h(`NumberFormat`,!1),i||h(`NumberFormat.BankAccountNumber`,!0),n||h(`NumberFormat.Currency`,!0),s||h(`NumberFormat.NationalIdentityNumber`,!0),c||h(`NumberFormat.Number`,!0),a||h(`NumberFormat.OrganizationNumber`,!0),o||h(`NumberFormat.Percent`,!0),r||h(`NumberFormat.PhoneNumber`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Import`}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-tsx`,children:`import { NumberFormat } from '@dnb/eufemia'
`})}),`
`,(0,f.jsx)(t.h2,{children:`Description`}),`
`,(0,f.jsx)(t.p,{children:`A ready-to-use DNB number formatter. Use it wherever you have to display a number, a currency value, a phone number, etc.`}),`
`,(0,f.jsxs)(t.p,{children:[`For a complete locale comparison, see `,(0,f.jsx)(t.a,{href:`/uilib/usage/best-practices/for-formatting/`,children:`Best Practices for number formatting`}),`.`]}),`
`,(0,f.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=52173-680`,children:`Figma`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/number-format`,children:`Source code`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/number-format`,children:`Docs code`})}),`
`]}),`
`,(0,f.jsx)(t.p,{children:`Good reasons for why we have this:`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsx)(t.li,{children:`To standardize the formatting of numbers for all DNB applications.`}),`
`,(0,f.jsx)(t.li,{children:`To make numbers accessible to screen readers.`}),`
`]}),`
`,(0,f.jsx)(t.h3,{children:`Supported formats`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[`Numbers in general e.g. `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(c,{value:`12345678.90`})})]}),`
`,(0,f.jsxs)(t.li,{children:[`Currency e.g. `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(n,{value:`12345678.90`})})]}),`
`,(0,f.jsxs)(t.li,{children:[`Percentage e.g. `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(o,{value:`12.34`})})]}),`
`,(0,f.jsxs)(t.li,{children:[`Phone numbers e.g. `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(r,{value:`004799999999`})})]}),`
`,(0,f.jsxs)(t.li,{children:[`Bank account number e.g. `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(i,{value:`20001234567`})})]}),`
`,(0,f.jsxs)(t.li,{children:[`National identification number e.g. `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(s,{value:`18089212345`})})]}),`
`,(0,f.jsxs)(t.li,{children:[`Organization number e.g. `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(a,{value:`123456789`})})]}),`
`,(0,f.jsxs)(t.li,{children:[`Compact (short) numbers e.g. `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(c,{compact:!0,value:`12345678`,decimals:1})})]}),`
`,(0,f.jsxs)(t.li,{children:[`Compact (long) currency e.g. `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(n,{compact:`long`,currencyDisplay:`name`,value:`12345678`,decimals:1})})]}),`
`]}),`
`,(0,f.jsx)(t.h3,{children:`Defaults`}),`
`,(0,f.jsxs)(t.p,{children:[`It uses the browser APIs `,(0,f.jsx)(t.code,{children:`number.toLocaleString`}),` or `,(0,f.jsx)(t.code,{children:`Intl.NumberFormat.format`}),` under the hood. As well as some custom formatter. The locale defaults to:`]}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[`Locale: `,(0,f.jsx)(t.code,{children:`nb-NO`})]}),`
`,(0,f.jsxs)(t.li,{children:[`Currency: `,(0,f.jsx)(t.code,{children:`NOK`})]}),`
`]}),`
`,(0,f.jsx)(t.h4,{children:`Norwegian kroner`}),`
`,(0,f.jsxs)(t.p,{children:[`When the currency format is set to `,(0,f.jsx)(t.code,{children:`currencyDisplay="name"`}),`, the currency will be displayed as "kroner" instead of "Norwegian kroner".`]}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[`Norwegian currency: `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(n,{currencyDisplay:`name`,value:`1234.90`})})]}),`
`,(0,f.jsxs)(t.li,{children:[`Swedish currency: `,(0,f.jsx)(`code`,{className:`dnb-code`,children:(0,f.jsx)(n,{currency:`SEK`,currencyDisplay:`name`,value:`1234.90`})})]}),`
`]}),`
`,(0,f.jsx)(t.h4,{children:`Not available`}),`
`,(0,f.jsxs)(t.p,{children:[`When a number should be displayed but is not available to the frontend application, the NumberFormat component will display a single `,(0,f.jsx)(t.strong,{children:`em dash`}),` (–), and a screen reader will receive the text "Ikke tilgjengelig" / "Not available".`]}),`
`,(0,f.jsxs)(t.p,{children:[`Example: `,(0,f.jsx)(n,{value:`invalid`})]}),`
`,(0,f.jsx)(t.h2,{children:`Decimals`}),`
`,(0,f.jsxs)(t.p,{children:[`If the value has more decimal places than specified by the `,(0,f.jsx)(t.code,{children:`decimals={2}`}),` property, it will be rounded accordingly.`]}),`
`,(0,f.jsxs)(t.p,{children:[`Here are the available options for the `,(0,f.jsx)(t.code,{children:`rounding`}),` property:`]}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`omit`}),`: Truncate decimals without rounding.`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`half-even`}),`: Round to the nearest even number.`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`half-up`}),` (default): Round up if the fractional part is 0.5 or greater; otherwise, round down.`]}),`
`]}),`
`,(0,f.jsx)(t.h2,{children:`Value Components`}),`
`,(0,f.jsxs)(t.p,{children:[`The formatting helpers power several `,(0,f.jsx)(t.code,{children:`Value.*`}),` components:`]}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Number/`,children:`Value.Number`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Currency/`,children:`Value.Currency`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Date/`,children:`Value.Date`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Value/DateOfBirth/`,children:`Value.DateOfBirth`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Value/PhoneNumber/`,children:`Value.PhoneNumber`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Value/BankAccountNumber/`,children:`Value.BankAccountNumber`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Value/NationalIdentityNumber/`,children:`Value.NationalIdentityNumber`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Value/OrganizationNumber/`,children:`Value.OrganizationNumber`})}),`
`]}),`
`,(0,f.jsx)(t.h2,{children:`Provider`}),`
`,(0,f.jsxs)(t.p,{children:[`You can send down the `,(0,f.jsx)(t.code,{children:`locale`}),` as an application-wide property (Context). More info about the `,(0,f.jsx)(t.a,{href:`/uilib/components/number-format/provider`,children:`provider and locale usage`}),`.`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-jsx`,children:`import Provider from '@dnb/eufemia/shared/Provider'

render(
  <Provider locale="en-GB" NumberFormat={{ currencyDisplay: 'code' }}>
    <MyApp>
      text <NumberFormat.Number>123</NumberFormat.Number> table etc.
    </MyApp>
  </Provider>
)
`})}),`
`,(0,f.jsx)(t.h2,{children:`Formatter utilities`}),`
`,(0,f.jsx)(t.p,{children:`Each variant has a matching formatter function you can use outside of React (e.g. in utilities, tests or server code). They are all available from the main import:`}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-tsx`,children:`import {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatPhoneNumber,
  formatBankAccountNumber,
  formatNationalIdentityNumber,
  formatOrganizationNumber,
} from '@dnb/eufemia/components/NumberFormat'
`})}),`
`,(0,f.jsxs)(t.table,{children:[(0,f.jsx)(t.thead,{children:(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.th,{children:`Formatter`}),(0,f.jsx)(t.th,{children:`Component variant`})]})}),(0,f.jsxs)(t.tbody,{children:[(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`formatNumber`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`NumberFormat.Number`})})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`formatCurrency`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`NumberFormat.Currency`})})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`formatPercent`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`NumberFormat.Percent`})})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`formatPhoneNumber`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`NumberFormat.PhoneNumber`})})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`formatBankAccountNumber`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`NumberFormat.BankAccountNumber`})})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`formatNationalIdentityNumber`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`NumberFormat.NationalIdentityNumber`})})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`formatOrganizationNumber`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`NumberFormat.OrganizationNumber`})})]})]})]}),`
`,(0,f.jsxs)(t.p,{children:[`Each formatter accepts `,(0,f.jsx)(t.code,{children:`(value, options?)`}),` and returns a formatted string. Pass `,(0,f.jsx)(t.code,{children:`{ returnAria: true }`}),` to get the full object with `,(0,f.jsx)(t.code,{children:`number`}),`, `,(0,f.jsx)(t.code,{children:`aria`}),`, `,(0,f.jsx)(t.code,{children:`cleanedValue`}),` and `,(0,f.jsx)(t.code,{children:`locale`}),`.`]}),`
`,(0,f.jsx)(t.h2,{children:`NumberFormat Hook`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`Heads up:`}),` If you do so, keep in mind that you will have to ensure all the accessibility enhancements the component offers. For that, you can use the `,(0,f.jsx)(t.code,{children:`aria`}),` field:`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-jsx`,children:`import Provider from '@dnb/eufemia/shared/Provider'
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
`,(0,f.jsx)(t.h3,{children:`NumberFormat Hook with parts`}),`
`,(0,f.jsxs)(t.p,{children:[`You can also use `,(0,f.jsx)(t.code,{children:`useNumberFormatWithParts`}),` when you need split output for custom layouts:`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-jsx`,children:`import Provider from '@dnb/eufemia/shared/Provider'
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
`,(0,f.jsx)(t.h2,{children:`Related component`}),`
`,(0,f.jsxs)(t.p,{children:[`For prominent values with dedicated typography controls, use `,(0,f.jsx)(t.a,{href:`/uilib/components/stat/`,children:`Stat`}),`.`]}),`
`,(0,f.jsx)(t.h2,{children:`Formatting only (interceptor)`}),`
`,(0,f.jsx)(t.p,{children:`You can use the variant formatter functions without using a React Component or React Hook.`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`Heads up:`}),` If you do so, keep in mind that you will have to ensure all the accessibility enhancements the component offers. For that, you can use the `,(0,f.jsx)(t.code,{children:`aria`}),` field:`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-ts`,children:`import {
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
`,(0,f.jsx)(t.p,{children:`Each variant formatter accepts the same options as the corresponding component variant.`}),`
`,(0,f.jsx)(t.h3,{children:`Interceptor helpers`}),`
`,(0,f.jsxs)(t.p,{children:[`Also, you may check out the related tests `,(0,f.jsx)(t.strong,{children:`NumberFormat > cleanNumber`}),` in the source code to find more examples.`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-ts`,children:`import { cleanNumber } from '@dnb/eufemia/components/number-format/NumberUtils'

const string = cleanNumber('prefix -12 345,678 suffix') // returns -12345.678
const string = cleanNumber('prefix -12.345,678 suffix') // returns -12345.678
`})}),`
`,(0,f.jsx)(t.h3,{children:`Format bank account numbers`}),`
`,(0,f.jsxs)(t.p,{children:[`Use `,(0,f.jsx)(t.code,{children:`formatBankAccountNumberByType`}),` to format bank account numbers with a specific type. It supports Norwegian BBAN, Swedish BBAN, Swedish Bankgiro, Swedish Plusgiro, and IBAN.`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-ts`,children:`import { formatBankAccountNumberByType } from '@dnb/eufemia/components/NumberFormat'

formatBankAccountNumberByType('20001234567') // { number: '2000 12 34567', aria: '20 00 12 34 56 7' }
formatBankAccountNumberByType('50001234567', 'swedishBban') // { number: '5000-1234567', aria: '50 00 12 34 56 7' }
formatBankAccountNumberByType('59140129', 'swedishBankgiro') // { number: '5914-0129', aria: '59 14 01 29' }
formatBankAccountNumberByType('1263664', 'swedishPlusgiro') // { number: '126366-4', aria: '12 63 66 4' }
formatBankAccountNumberByType('NO9386011117947', 'iban') // { number: 'NO93 8601 1117 947', aria: 'NO93 8601 1117 947' }
`})}),`
`,(0,f.jsx)(t.h3,{children:`Element and style`}),`
`,(0,f.jsxs)(t.p,{children:[`The number component is style-independent, so it has no visual styles. By default, a `,(0,f.jsx)(t.code,{children:`<span>`}),` is used (with `,(0,f.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/speak-as`,children:`speak-as: numbers`}),`, even though the support is very low). However, you can easily change the element type by providing a different value to the `,(0,f.jsx)(t.code,{children:`element="div"`}),` property.`]}),`
`,(0,f.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`NVDA`}),` also has `,(0,f.jsx)(t.a,{href:`https://github.com/nvaccess/nvda/issues/8874`,children:`issues`}),` reconciling the `,(0,f.jsx)(t.code,{children:`lang`}),` attribute, which makes it hard to have a solid and good solution for reading numbers. VoiceOver on desktop does a perfect job with this.`]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`VoiceOver`}),` on mobile devices (iOS) only supports numbers read out properly to a maximum of `,(0,f.jsx)(t.code,{children:`99,999.00`}),`. On amounts above this value, VO reads numbers digit by digit.`]}),`
`,(0,f.jsxs)(t.p,{children:[`To enhance the `,(0,f.jsx)(t.strong,{children:`Copy & Paste`}),` experience of copying numbers into other applications (Excel), you may use the `,(0,f.jsx)(t.code,{children:`cleanCopyValue`}),` property. It will then provide a second number, without thousand separators and to have a comma/dot (depending on the locale) as the decimal separator. This number is not visible, but will be used when selecting & copying the whole number on the first click to the system clipboard.`]}),`
`,(0,f.jsxs)(t.p,{children:[`You can enable this feature on all your NumberFormat components by using the `,(0,f.jsx)(t.code,{children:`Provider`}),`:`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-jsx`,children:`import { Provider } from '@dnb/eufemia/shared'

render(
  <Provider value={{ NumberFormat: { cleanCopyValue: true } }}>
    <YourApp />
  </Provider>
)
`})}),`
`,(0,f.jsx)(t.h3,{children:`More details`}),`
`,(0,f.jsxs)(t.blockquote,{children:[`
`,(0,f.jsxs)(t.p,{children:[`Screen readers require numbers to be formatted properly in order to be read as numbers. The `,(0,f.jsx)(t.strong,{children:`NumberFormat`}),` component helps achieve this requirement.`]}),`
`]}),`
`,(0,f.jsxs)(t.p,{children:[`Numbers are formatted differently for screen readers than the visual number. Numbers also get assigned a `,(0,f.jsx)(t.code,{children:`lang`}),` attribute so the screen reader knows what language (locale) should be used for the particular number, even if the surrounding text does not correspond to the same language.`]}),`
`,(0,f.jsx)(t.h3,{children:`Sources`}),`
`,(0,f.jsxs)(t.p,{children:[`Eufemia bases its number formats on both the `,(0,f.jsx)(t.a,{href:`https://lovdata.no/forskrift/2004-02-16-426/%C2%A716`,children:`Norwegian authority`}),` and `,(0,f.jsx)(t.a,{href:`https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato`,children:`Språkradet`}),`, and currency is based on `,(0,f.jsx)(t.a,{href:`https://www.sprakradet.no/svardatabase/sporsmal-og-svar/kronebelop-rekkjefolgje-komma-og-strek/`,children:`guidelines`}),` from Språkrådet. Wikipedia has more info on worldwide `,(0,f.jsx)(t.a,{href:`https://en.wikipedia.org/wiki/Decimal_separator`,children:`decimal separator`}),` usage.`]}),`
`,(0,f.jsx)(t.p,{children:`For international number formatting we use these sources:`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`https://service-manual.ons.gov.uk/content/numbers/writing-numbers`,children:`ONS – Writing numbers`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#numbers`,children:`GOV.UK Style Guide`})}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.a,{href:`https://service-manual.nhs.uk/content/numbers-measurements-dates-time`,children:`NHS Service Manual`}),` all recommend using `,(0,f.jsx)(t.strong,{children:`commas`}),` as the thousands separator for `,(0,f.jsx)(t.code,{children:`en-GB`}),`.`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.a,{href:`https://data.europa.eu/apps/data-visualisation-guide/number-formatting`,children:`EU Data Visualisation Guide`}),` states the same for digital content.`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.a,{href:`https://commission.europa.eu/system/files/2023-11/styleguide_english_dgt_en.pdf`,children:`EU’s Handbook for authors and translators`}),` specifies non-breaking spaces as the main rule, `,(0,f.jsx)(t.strong,{children:`but explicitly allows commas when writing for the web`}),` – which is exactly our context.`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.a,{href:`https://www.iso.org/standard/76921.html`,children:`ISO 80000-1`}),` (formerly ISO 31-0) is a scientific/technical standard and `,(0,f.jsx)(t.strong,{children:`not a linguistic style guide`}),`, so we do not use it for how we present numbers to end users on the web.`]}),`
`]}),`
`,(0,f.jsx)(t.p,{children:(0,f.jsx)(t.strong,{children:`Difference between formats:`})}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`1 234.00`}),` – 🇬🇧 Current DNB practice for English`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`1,234.00`}),` – 🇬🇧 Recommended by official UK sources (ONS, GOV.UK, NHS)`]}),`
`]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`Accessibility:`}),` WCAG `,(0,f.jsx)(t.a,{href:`https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html`,children:`1.3.1 Info and Relationships`}),` and `,(0,f.jsx)(t.a,{href:`https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html`,children:`3.1.1 Language of Page`}),` require that content can be correctly interpreted by assistive technologies.`]}),`
`,(0,f.jsxs)(t.p,{children:[`When using spaces as thousand separators, screen readers misinterpret numbers in English. For example: `,(0,f.jsx)(t.code,{children:`45 804`}),` is read as "45" and "804" instead of "forty-five thousand eight hundred and four."`]}),`
`,(0,f.jsx)(t.h2,{children:`Node.js and SSR usage`}),`
`,(0,f.jsxs)(t.p,{children:[`If you run the component or `,(0,f.jsx)(t.code,{children:`format`}),` function in `,(0,f.jsx)(t.a,{href:`https://nodejs.org`,children:`Node.js`}),`, you have to include `,(0,f.jsx)(t.a,{href:`https://nodejs.org/api/intl.html`,children:`ICU`}),` data in order to display other locales than en-GB. You can do this by:`]}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[`installing `,(0,f.jsx)(t.code,{children:`npm i full-icu`})]}),`
`,(0,f.jsxs)(t.li,{children:[`and call node with an environment variable pointing to the package: `,(0,f.jsx)(t.code,{children:`NODE_ICU_DATA=./node_modules/full-icu node ...`})]}),`
`,(0,f.jsxs)(t.li,{children:[`after a Node.js version upgrade you may have to run `,(0,f.jsx)(t.code,{children:`npm rebuild`})]}),`
`]}),`
`,(0,f.jsx)(t.h2,{children:`Known issues`}),`
`,(0,f.jsx)(t.p,{children:`Edge Browser on Windows 10 is converting numbers automatically to followable links. This makes the experience on NVDA bad, as it reads also the new, unformatted link number.`}),`
`,(0,f.jsxs)(t.p,{children:[`You can `,(0,f.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/x-ms-format-detection`,children:`disable this behavior`}),`:`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-html`,children:`<html x-ms-format-detection="none">
  ...
</html>
`})})]})}function m(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function g(e){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(m,{}),`
`,(0,f.jsx)(d,{})]})}function _(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(g,{...e})}):g(e)}export{_ as default};