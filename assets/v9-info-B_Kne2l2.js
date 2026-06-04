import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`v9`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#migration`,children:`Migration`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#changes`,children:`Changes`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#features`,children:`Feature`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Migration`}),`
`,(0,r.jsxs)(t.p,{children:[`v9 of @dnb/eufemia contains `,(0,r.jsx)(t.em,{children:`breaking changes`}),`. As a migration process, you can simply search and replace:`]}),`
`,(0,r.jsx)(t.h3,{children:`General`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Uninstall `,(0,r.jsx)(t.code,{children:`dnb-ui-lib`}),` and install `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Rename with Regex `,(0,r.jsx)(t.code,{children:`("|')dnb-ui-lib`}),` and replace with `,(0,r.jsx)(t.code,{children:`$1@dnb/eufemia`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Rename `,(0,r.jsx)(t.code,{children:`node_modules/dnb-ui-lib/`}),` and replace with `,(0,r.jsx)(t.code,{children:`node_modules/dnb/eufemia/`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`formRow`}),` inside a (e.g. <Provider formRow= ...) and replace it with `,(0,r.jsx)(t.code,{children:`FormRow`}),` (PascalCase).`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Number to NumberFormat`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Find the `,(0,r.jsx)(t.code,{children:`Number`}),` component and rename it with `,(0,r.jsx)(t.code,{children:`NumberFormat`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Find the `,(0,r.jsx)(t.code,{children:`dnb-number`}),` and replace it with `,(0,r.jsx)(t.code,{children:`dnb-number-format`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`In case you import it from `,(0,r.jsx)(t.code,{children:`components/number/Number`}),`, it has to be `,(0,r.jsx)(t.code,{children:`components/number-format/NumberFormat`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`In case you use `,(0,r.jsx)(t.code,{children:`format`}),` or `,(0,r.jsx)(t.code,{children:`cleanNumber`}),` from either `,(0,r.jsx)(t.code,{children:`/components/Number`}),` or `,(0,r.jsx)(t.code,{children:`/components/number/Number`}),`, replace the import path to be `,(0,r.jsx)(t.code,{children:`/components/number-format/NumberUtils`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`You can also use Regex: Find `,(0,r.jsx)(t.code,{children:`Number([^F)]|$)`}),` and replace it with `,(0,r.jsx)(t.code,{children:`NumberFormat$1`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Tabs properties`}),`
`,(0,r.jsx)(t.p,{children:`Tabs has changed two property names.`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`section_style`}),` in `,(0,r.jsx)(t.code,{children:`<Tabs section_style="..." />`}),` and replace with `,(0,r.jsx)(t.code,{children:`tabs_style`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`section_spacing`}),` in `,(0,r.jsx)(t.code,{children:`<Tabs section_spacing="..." />`}),` and replace with `,(0,r.jsx)(t.code,{children:`tabs_spacing`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Helper classes`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Removed `,(0,r.jsx)(t.code,{children:`dnb-nudge`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Removed `,(0,r.jsx)(t.code,{children:`dnb-belt`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Removed `,(0,r.jsx)(t.code,{children:`dnb-hide-on-mobile`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Removed `,(0,r.jsx)(t.code,{children:`dnb-mobile-exclusive`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Removed `,(0,r.jsx)(t.code,{children:`dnb-width-limit`})]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Patterns to Extensions`}),`
`,(0,r.jsxs)(t.p,{children:[`Most of the Eufemia "patterns" got removed in favor of calling this part as `,(0,r.jsx)(t.strong,{children:`extensions`}),`.`]}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`dnb-ui-lib/patterns`}),` or `,(0,r.jsx)(t.code,{children:`@dnb/eufemia/patterns`}),` and replace with `,(0,r.jsx)(t.code,{children:`@dnb/eufemia/extensions`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`dnb-ui-patterns`}),` and replace with `,(0,r.jsx)(t.code,{children:`dnb-ui-extensions`})]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`The following patterns/extensions/components are removed:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`ActionNav`}),`
`,(0,r.jsx)(t.li,{children:`DescriptionList`}),`
`,(0,r.jsx)(t.li,{children:`Footer`}),`
`,(0,r.jsx)(t.li,{children:`Form`}),`
`,(0,r.jsx)(t.li,{children:`Grid`}),`
`,(0,r.jsx)(t.li,{children:`MainMenu`}),`
`,(0,r.jsx)(t.li,{children:`SummaryTable`}),`
`,(0,r.jsx)(t.li,{children:`FieldsetDescription`}),`
`,(0,r.jsx)(t.li,{children:`FormSummaryPage`}),`
`,(0,r.jsx)(t.li,{children:`RangeSlider`}),`
`,(0,r.jsx)(t.li,{children:`ViewTitle`}),`
`,(0,r.jsx)(t.li,{children:`LineTitle`}),`
`,(0,r.jsx)(t.li,{children:`Notification`}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Properties`}),`
`,(0,r.jsx)(t.p,{children:`Removed already deprecated CSS properties (vars):`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`--color-sea-green-alt-30`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`--color-signal-yellow-30`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`--color-black-30`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`--color-sea-green-alt`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`--color-signal-yellow`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`--font-weight-book`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`--font-weight-demi`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`--font-family-book`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`--font-family-demi`})}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Textarea`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Removed support of style only for `,(0,r.jsx)(t.a,{href:`/uilib/components/textarea`,children:`Textarea`}),`. You have to use the component now.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`StepIndicator`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Has now a deprecation warning when properties like `,(0,r.jsx)(t.code,{children:`use_navigation`}),`, `,(0,r.jsx)(t.code,{children:`active_item`}),`, `,(0,r.jsx)(t.code,{children:`active_url`}),`, `,(0,r.jsx)(t.code,{children:`url`}),`, `,(0,r.jsx)(t.code,{children:`url_future`}),` and `,(0,r.jsx)(t.code,{children:`url_passed`}),` are used.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Changes`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`The visual appearance of a couple of components has been changed (e.g. border-radius).`}),`
`,(0,r.jsxs)(t.li,{children:[`The color `,(0,r.jsx)(t.code,{children:`success-green`}),` has changed its HEX value`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Updates to the language files`}),`
`,(0,r.jsxs)(t.p,{children:[`Strings were changed/removed and added to the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/localization`,children:`language files`}),` `,(0,r.jsx)(t.code,{children:`nb-NO.js`}),` and `,(0,r.jsx)(t.code,{children:`en-GB.js`}),`:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`NumberFormat (added)`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Features`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[`New useful properties added to `,(0,r.jsx)(t.code,{children:`<Tabs content_style="..." />`}),` to define a section style.`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[`Added `,(0,r.jsx)(t.code,{children:`stretch`}),` support for `,(0,r.jsx)(t.a,{href:`/uilib/components/autocomplete`,children:`Autocomplete`}),`, `,(0,r.jsx)(t.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/components/date-picker`,children:`DatePicker`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsx)(t.p,{children:`Enhance Webpack v5 compatibility`}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsx)(t.p,{children:`Enhance React v17 compatibility`}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[`Linear `,(0,r.jsx)(t.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`})]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[`Release of `,(0,r.jsx)(t.a,{href:`/uilib/components/tooltip`,children:`Tooltip`}),` inclusive integration into Button, Anchor and NumberFormat`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[`Tertiary `,(0,r.jsx)(t.a,{href:`/uilib/components/button#tertiary-button`,children:`Button`}),` with top placed icon`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsx)(t.p,{children:`The Eufemia Provider can send along global component properties:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-jsx`,children:`<Provider
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
`,(0,r.jsx)(t.h2,{children:`Install`}),`
`,(0,r.jsx)(t.p,{children:`To upgrade to @dnb/eufemia v9 with NPM, use:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`$ npm i @dnb/eufemia@9
# or
$ yarn add @dnb/eufemia@9
`})}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.em,{children:`March, 3. 2021`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};