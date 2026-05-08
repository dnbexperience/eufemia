import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";var n=e();function r(e){let r={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`v9`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#migration`,children:`Migration`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#changes`,children:`Changes`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#features`,children:`Feature`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Migration`}),`
`,(0,n.jsxs)(r.p,{children:[`v9 of @dnb/eufemia contains `,(0,n.jsx)(r.em,{children:`breaking changes`}),`. As a migration process, you can simply search and replace:`]}),`
`,(0,n.jsx)(r.h3,{children:`General`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Uninstall `,(0,n.jsx)(r.code,{children:`dnb-ui-lib`}),` and install `,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Rename with Regex `,(0,n.jsx)(r.code,{children:`("|')dnb-ui-lib`}),` and replace with `,(0,n.jsx)(r.code,{children:`$1@dnb/eufemia`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Rename `,(0,n.jsx)(r.code,{children:`node_modules/dnb-ui-lib/`}),` and replace with `,(0,n.jsx)(r.code,{children:`node_modules/dnb/eufemia/`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Find `,(0,n.jsx)(r.code,{children:`formRow`}),` inside a (e.g. <Provider formRow= ...) and replace it with `,(0,n.jsx)(r.code,{children:`FormRow`}),` (PascalCase).`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Number to NumberFormat`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Find the `,(0,n.jsx)(r.code,{children:`Number`}),` component and rename it with `,(0,n.jsx)(r.code,{children:`NumberFormat`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Find the `,(0,n.jsx)(r.code,{children:`dnb-number`}),` and replace it with `,(0,n.jsx)(r.code,{children:`dnb-number-format`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`In case you import it from `,(0,n.jsx)(r.code,{children:`components/number/Number`}),`, it has to be `,(0,n.jsx)(r.code,{children:`components/number-format/NumberFormat`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`In case you use `,(0,n.jsx)(r.code,{children:`format`}),` or `,(0,n.jsx)(r.code,{children:`cleanNumber`}),` from either `,(0,n.jsx)(r.code,{children:`/components/Number`}),` or `,(0,n.jsx)(r.code,{children:`/components/number/Number`}),`, replace the import path to be `,(0,n.jsx)(r.code,{children:`/components/number-format/NumberUtils`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`You can also use Regex: Find `,(0,n.jsx)(r.code,{children:`Number([^F)]|$)`}),` and replace it with `,(0,n.jsx)(r.code,{children:`NumberFormat$1`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Tabs properties`}),`
`,(0,n.jsx)(r.p,{children:`Tabs has changed two property names.`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Find `,(0,n.jsx)(r.code,{children:`section_style`}),` in `,(0,n.jsx)(r.code,{children:`<Tabs section_style="..." />`}),` and replace with `,(0,n.jsx)(r.code,{children:`tabs_style`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Find `,(0,n.jsx)(r.code,{children:`section_spacing`}),` in `,(0,n.jsx)(r.code,{children:`<Tabs section_spacing="..." />`}),` and replace with `,(0,n.jsx)(r.code,{children:`tabs_spacing`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Helper classes`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Removed `,(0,n.jsx)(r.code,{children:`dnb-nudge`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Removed `,(0,n.jsx)(r.code,{children:`dnb-belt`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Removed `,(0,n.jsx)(r.code,{children:`dnb-hide-on-mobile`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Removed `,(0,n.jsx)(r.code,{children:`dnb-mobile-exclusive`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Removed `,(0,n.jsx)(r.code,{children:`dnb-width-limit`})]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Patterns to Extensions`}),`
`,(0,n.jsxs)(r.p,{children:[`Most of the Eufemia "patterns" got removed in favor of calling this part as `,(0,n.jsx)(r.strong,{children:`extensions`}),`.`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Find `,(0,n.jsx)(r.code,{children:`dnb-ui-lib/patterns`}),` or `,(0,n.jsx)(r.code,{children:`@dnb/eufemia/patterns`}),` and replace with `,(0,n.jsx)(r.code,{children:`@dnb/eufemia/extensions`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Find `,(0,n.jsx)(r.code,{children:`dnb-ui-patterns`}),` and replace with `,(0,n.jsx)(r.code,{children:`dnb-ui-extensions`})]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`The following patterns/extensions/components are removed:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`ActionNav`}),`
`,(0,n.jsx)(r.li,{children:`DescriptionList`}),`
`,(0,n.jsx)(r.li,{children:`Footer`}),`
`,(0,n.jsx)(r.li,{children:`Form`}),`
`,(0,n.jsx)(r.li,{children:`Grid`}),`
`,(0,n.jsx)(r.li,{children:`MainMenu`}),`
`,(0,n.jsx)(r.li,{children:`SummaryTable`}),`
`,(0,n.jsx)(r.li,{children:`FieldsetDescription`}),`
`,(0,n.jsx)(r.li,{children:`FormSummaryPage`}),`
`,(0,n.jsx)(r.li,{children:`RangeSlider`}),`
`,(0,n.jsx)(r.li,{children:`ViewTitle`}),`
`,(0,n.jsx)(r.li,{children:`LineTitle`}),`
`,(0,n.jsx)(r.li,{children:`Notification`}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Properties`}),`
`,(0,n.jsx)(r.p,{children:`Removed already deprecated CSS properties (vars):`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`--color-sea-green-alt-30`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`--color-signal-yellow-30`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`--color-black-30`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`--color-sea-green-alt`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`--color-signal-yellow`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`--font-weight-book`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`--font-weight-demi`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`--font-family-book`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`--font-family-demi`})}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Textarea`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Removed support of style only for `,(0,n.jsx)(r.a,{href:`/uilib/components/textarea`,children:`Textarea`}),`. You have to use the component now.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`StepIndicator`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Has now a deprecation warning when properties like `,(0,n.jsx)(r.code,{children:`use_navigation`}),`, `,(0,n.jsx)(r.code,{children:`active_item`}),`, `,(0,n.jsx)(r.code,{children:`active_url`}),`, `,(0,n.jsx)(r.code,{children:`url`}),`, `,(0,n.jsx)(r.code,{children:`url_future`}),` and `,(0,n.jsx)(r.code,{children:`url_passed`}),` are used.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Changes`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The visual appearance of a couple of components has been changed (e.g. border-radius).`}),`
`,(0,n.jsxs)(r.li,{children:[`The color `,(0,n.jsx)(r.code,{children:`success-green`}),` has changed its HEX value`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Updates to the language files`}),`
`,(0,n.jsxs)(r.p,{children:[`Strings were changed/removed and added to the `,(0,n.jsx)(r.a,{href:`/uilib/usage/customisation/localization`,children:`language files`}),` `,(0,n.jsx)(r.code,{children:`nb-NO.js`}),` and `,(0,n.jsx)(r.code,{children:`en-GB.js`}),`:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`NumberFormat (added)`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Features`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`New useful properties added to `,(0,n.jsx)(r.code,{children:`<Tabs content_style="..." />`}),` to define a section style.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Added `,(0,n.jsx)(r.code,{children:`stretch`}),` support for `,(0,n.jsx)(r.a,{href:`/uilib/components/autocomplete`,children:`Autocomplete`}),`, `,(0,n.jsx)(r.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),` and `,(0,n.jsx)(r.a,{href:`/uilib/components/date-picker`,children:`DatePicker`}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Enhance Webpack v5 compatibility`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Enhance React v17 compatibility`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Linear `,(0,n.jsx)(r.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Release of `,(0,n.jsx)(r.a,{href:`/uilib/components/tooltip`,children:`Tooltip`}),` inclusive integration into Button, Anchor and NumberFormat`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Tertiary `,(0,n.jsx)(r.a,{href:`/uilib/components/button#tertiary-button`,children:`Button`}),` with top placed icon`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`The Eufemia Provider can send along global component properties:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Provider
  value={{
    Button: { size: 'large' },
  }}
>
  ...
  <Button text="Large button" />
</Provider>
`})}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Install`}),`
`,(0,n.jsx)(r.p,{children:`To upgrade to @dnb/eufemia v9 with NPM, use:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`$ npm i @dnb/eufemia@9
# or
$ yarn add @dnb/eufemia@9
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.em,{children:`March, 3. 2021`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};